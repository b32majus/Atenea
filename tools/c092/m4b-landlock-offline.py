#!/usr/bin/env python3
"""C092 M4-B: offline synthetic Landlock proof. NOT a production sandbox.

Linux x86_64, Landlock ABI >=4. Deny all covered filesystem actions by default;
grant toolchain read/execute, fixture read/write, and private scratch write.
Block TCP connect/bind by default. Landlock ABI4 does NOT confine UDP,
signals, process environment, secret exposure or all syscalls. M5 blocked.
"""
import argparse
import ctypes
import ctypes.util
import json
import os
import pathlib
import resource
import shutil
import sys

# Linux x86_64 only; a different architecture MUST fail closed.
SYS_CREATE, SYS_ADD, SYS_RESTRICT = 444, 445, 446
FS_EXEC = 1 << 0
FS_WRITE = 1 << 1
FS_READ_FILE = 1 << 2
FS_READ_DIR = 1 << 3
FS_RIGHTS = sum(1 << n for n in range(15))
NET_RIGHTS = (1 << 0) | (1 << 1)
O_PATH = getattr(os, "O_PATH", 0o10000000)
READ_EXEC = FS_EXEC | FS_READ_FILE | FS_READ_DIR
WRITE_RIGHTS = FS_WRITE | sum(1 << n for n in range(4, 15))
ALL_RIGHTS = READ_EXEC | WRITE_RIGHTS

class Ruleset(ctypes.Structure):
    _fields_ = [("handled_access_fs", ctypes.c_uint64),
                ("handled_access_net", ctypes.c_uint64)]

class PathRule(ctypes.Structure):
    _pack_ = 1
    _layout_ = "ms"
    _fields_ = [("allowed_access", ctypes.c_uint64),
                ("parent_fd", ctypes.c_int32)]

libc = ctypes.CDLL(None, use_errno=True)
libc.syscall.restype = ctypes.c_long
libc.prctl.restype = ctypes.c_int

def check(rc, operation):
    if rc < 0:
        err = ctypes.get_errno()
        raise RuntimeError(f"{operation}: errno={err} {os.strerror(err)}")
    return rc

def real_no_symlink(value):
    p = pathlib.Path(value).absolute()
    current = pathlib.Path(p.anchor)
    for part in p.parts[1:]:
        current = current / part
        if current.is_symlink():
            raise RuntimeError(f"SYMLINK_PATH_NOT_ALLOWED {p}")
    return p.resolve(strict=True)

def inside(child, parent):
    return child == parent or parent in child.parents

def run():
    if os.uname().machine != "x86_64" or sys.platform != "linux":
        raise RuntimeError("UNSUPPORTED_ARCH_OR_OS")
    arg = argparse.ArgumentParser()
    arg.add_argument("--repo", required=True)
    arg.add_argument("--store", required=True)
    arg.add_argument("--scratch", required=True)
    arg.add_argument("--script", required=True)
    a = arg.parse_args()
    repo, store, scratch = map(real_no_symlink, [a.repo, a.store, a.scratch])
    script = real_no_symlink(a.script)
    if not inside(script, repo) or not script.is_file():
        raise RuntimeError("SCRIPT_OUTSIDE_FIXTURE")
    if any(inside(x, y) or inside(y, x) for x, y in [
        (repo, store), (scratch, store), (scratch, repo)]):
        raise RuntimeError("SANDBOX_ROOTS_OVERLAP")
    if repo == pathlib.Path("/") or not repo.name.startswith("fixture"):
        raise RuntimeError("SYNTHETIC_FIXTURE_ROOT_REQUIRED")
    sentinel = repo / ".atenea-c092-synthetic.json"
    marker = json.loads(sentinel.read_text())
    if (marker.get("schema") != "atenea.c092.synthetic-fixture/v1"
            or marker.get("noRealProduct") is not True):
        raise RuntimeError("UNAPPROVED_FIXTURE")
    if store.stat().st_uid != os.getuid():
        raise RuntimeError("EXPERIMENT_STORE_OWNERSHIP_MISMATCH")
    # Explicit gate: a real ticket MUST NOT be allowed through this launcher.
    abi = check(libc.syscall(SYS_CREATE, ctypes.c_void_p(), 0, 1),
                "LANDLOCK_ABI_PROBE")
    if abi < 4:
        raise RuntimeError(f"LANDLOCK_ABI_INSUFFICIENT {abi}")
    attrs = Ruleset(FS_RIGHTS, NET_RIGHTS)
    ruleset = check(libc.syscall(SYS_CREATE, ctypes.byref(attrs),
                                ctypes.sizeof(attrs), 0),
                    "LANDLOCK_CREATE_RULESET")
    node_bin = shutil.which("node")
    if not node_bin:
        raise RuntimeError("NODE_BINARY_NOT_FOUND")
    node = real_no_symlink(node_bin)
    # No /home, /srv, /tmp, /proc or /dev blanket read rules.
    read_roots = ["/usr", "/bin", "/lib", "/lib64", "/sbin",
                  "/etc/ld.so.cache", "/etc/ssl", str(node)]
    device_roots = ["/dev/null", "/dev/urandom"]
    allowed = [(pathlib.Path(p), READ_EXEC if pathlib.Path(p).is_dir()
                else FS_READ_FILE | FS_EXEC) for p in read_roots]
    allowed += [(pathlib.Path(p), FS_READ_FILE | FS_WRITE) for p in device_roots]
    allowed += [(repo, ALL_RIGHTS), (scratch, ALL_RIGHTS)]
    try:
        for p, rights in allowed:
            if not p.exists():
                continue
            f = os.open(str(p), O_PATH | os.O_CLOEXEC)
            try:
                rule = PathRule(rights, f)
                check(libc.syscall(SYS_ADD, ruleset, 1, ctypes.byref(rule), 0),
                      f"LANDLOCK_ADD_RULE {p}")
            finally:
                os.close(f)
        # Unprivileged application; this attribute is inherited by child.
        check(libc.prctl(38, 1, 0, 0, 0), "PR_SET_NO_NEW_PRIVS")
        check(libc.syscall(SYS_RESTRICT, ruleset, 0), "LANDLOCK_RESTRICT_SELF")
    finally:
        os.close(ruleset)
    # No control password, model credentials or server URL in the child env.
    # Offline fixture only: a second unprivileged seccomp layer blocks
    # network socket creation and cross-process signalling/introspection.
    # Production OpenCode model egress must be designed separately.
    seccomp_lib = ctypes.util.find_library("seccomp")
    if not seccomp_lib:
        raise RuntimeError("SECCOMP_LIBRARY_MISSING")
    sec = ctypes.CDLL(seccomp_lib, use_errno=True)
    sec.seccomp_init.argtypes = (ctypes.c_uint32,)
    sec.seccomp_init.restype = ctypes.c_void_p
    sec.seccomp_syscall_resolve_name.argtypes = (ctypes.c_char_p,)
    sec.seccomp_syscall_resolve_name.restype = ctypes.c_int
    sec.seccomp_rule_add.argtypes = (ctypes.c_void_p, ctypes.c_uint32,
                                   ctypes.c_int, ctypes.c_uint32)
    sec.seccomp_rule_add.restype = ctypes.c_int
    sec.seccomp_load.argtypes = (ctypes.c_void_p,)
    sec.seccomp_load.restype = ctypes.c_int
    sec.seccomp_release.argtypes = (ctypes.c_void_p,)
    sec.seccomp_release.restype = None
    ctx = sec.seccomp_init(0x7FFF0000) # SCMP_ACT_ALLOW
    if not ctx:
        raise RuntimeError("SECCOMP_INIT_FAILED")
    try:
        denied = ["socket", "connect", "bind", "listen",
                  "accept", "accept4", "kill", "tkill", "tgkill",
                  "ptrace", "process_vm_readv", "process_vm_writev",
                  "pidfd_open", "pidfd_send_signal",
                  # Landlock ABI4 cannot block chmod/chown/xattr/utime; never
                  # allow a same-UID fixture to sabotage controller files.
                  "chmod", "fchmod", "fchmodat", "fchmodat2",
                  "chown", "fchown", "fchownat", "lchown",
                  "setxattr", "lsetxattr", "fsetxattr",
                  "removexattr", "lremovexattr", "fremovexattr",
                  "utime", "utimes", "futimesat", "utimensat"]
        for name in denied:
            num = sec.seccomp_syscall_resolve_name(name.encode("ascii"))
            if num < 0:
                raise RuntimeError("SECCOMP_SYSCALL_NOT_FOUND " + name)
            rc = sec.seccomp_rule_add(ctx, 0x00050000 | 13, num, 0)
            if rc != 0:
                raise RuntimeError(f"SECCOMP_RULE_FAILED {name}: {rc}")
        rc = sec.seccomp_load(ctx)
        if rc != 0:
            raise RuntimeError(f"SECCOMP_LOAD_FAILED {rc}")
    finally:
        sec.seccomp_release(ctx)
    env = {"PATH": "/usr/bin:/bin", "HOME": str(scratch), "TMPDIR": str(scratch),
           "LANG": "C.UTF-8", "CI": "1", "NODE_ENV": "test"}
    # Do not inherit unexpected descriptors, core dumps or unlimited CPU.
    resource.setrlimit(resource.RLIMIT_CORE, (0, 0))
    soft_cpu, hard_cpu = resource.getrlimit(resource.RLIMIT_CPU)
    resource.setrlimit(resource.RLIMIT_CPU, (min(30, hard_cpu) if hard_cpu > 0 else 30,
                                                   hard_cpu))
    max_fd = min(resource.getrlimit(resource.RLIMIT_NOFILE)[0], 65536)
    os.closerange(3, max_fd)
    os.chdir(str(repo))
    os.execve(str(node), [str(node), str(script), str(store), str(scratch)], env)

if __name__ == "__main__":
    try:
        run()
    except Exception as exc:
        print(json.dumps({"ok": False, "code": "M4B_SANDBOX_DENIED",
                          "reason": str(exc)}), file=sys.stderr)
        sys.exit(86)
