#!/usr/bin/env python3
"""Single-use C-092 launcher. Uses the SAME stored OpenCode auth as the normal CLI.
No shell wrappers or login/logout, no deployment. Outputs stop/receipt, never credentials."""
import argparse
import datetime as dt
import json
import os
import pathlib
import re
import secrets
import signal
import subprocess
import sys
import tempfile
import time

ENGINE = pathlib.Path(__file__).resolve().parents[2]
EXE = pathlib.Path("/home/hermes/.npm-global/lib/node_modules/@opencode/cli/bin/opencode.exe")
HOST_RE = re.compile(r"http://127\.0\.0\.1:\d+")
ROLES = (("writer", "build"), ("standards", "plan"), ("spec", "plan"),
         ("visual", "plan"), ("corrector", "build"))

def git(repo, *args):
    return subprocess.check_output(["git", "-C", str(repo), *args], text=True, timeout=15).strip()

def auth_env(parent, cost_policy):
    # Stored login is authoritative for OpenCode Free on the target VPS.
    # A stale inherited OPENCODE_API_KEY shadows it and causes a false 401.
    env = dict(parent)
    if cost_policy == "free_only":
        env.pop("OPENCODE_API_KEY", None)
    return env

def timestamp():
    return dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds")

def status(root, stage, **values):
    target = root / "LAUNCH_STATUS.json"
    target.write_text(json.dumps({"stage": stage, "updatedAt": timestamp(), **values}, indent=2)+"\n")

def get_models(config):
    axes = config["manifest"]["reviewAxes"]
    result = {"writer": config["models"]["writer"], "corrector": config["models"]["corrector"]}
    for axis, name in zip(axes, config["models"]["reviewers"]):
        result[axis.lower()] = name
    if len(result) != len(axes) + 2:
        raise RuntimeError("MODEL_ROLE_COUNT_MISMATCH")
    return result

def ensure_clean(config, root):
    product = pathlib.Path(config["repo"]).resolve()
    head = git(product, "rev-parse", "HEAD")
    expected_ref = str(ENGINE) + "@" + git(ENGINE, "rev-parse", "HEAD")
    if git(ENGINE, "status", "--porcelain") or config["harnessRef"] != expected_ref:
        raise RuntimeError("ENGINE_NOT_FROZEN")
    if head != config["manifest"]["baseSha"] or git(product, "status", "--porcelain"):
        raise RuntimeError("PRODUCT_NOT_CLEAN_AT_BASE")
    if git(product, "symbolic-ref", "--short", "HEAD") != config["expectedBranch"]:
        raise RuntimeError("PRODUCT_WRONG_BRANCH")
    if pathlib.Path(config["storeDir"]).exists() or (root / "LAUNCH_STATUS.json").exists() or (root / "RESULT.json").exists():
        raise RuntimeError("UNIT_ALREADY_USED_NO_REPLAY")
    if config["profile"]["costPolicy"] == "free_only":
        if any(not str(m).startswith("opencode/") or not str(m).endswith("-free") for m in get_models(config).values()):
            raise RuntimeError("FREE_POLICY_VIOLATION")
    return product

def smoke_free_auth(models, root, env):
    # Data-less request in a disposable workspace BEFORE reserving a ledger.
    with tempfile.TemporaryDirectory(prefix="atenea-c092-auth-") as d:
        work = pathlib.Path(d)
        subprocess.run(["git", "init", "-q", str(work)], check=True, timeout=10)
        for name in sorted(set(models.values())):
            role = "plan"
            cfg = work / "config.json"
            cfg.write_text(json.dumps({"$schema": "https://opencode.ai/config.json",
                 "model": name, "agent": {role: {"model": name}}}))
            test_env = dict(env)
            test_env["OPENCODE_CONFIG"] = str(cfg)
            test_env["PWD"] = str(work)
            proc = subprocess.run([str(EXE), "run", "--standalone", "-m", name,
                "--agent", role, "--format", "json",
                "Responde solo PONG. No uses herramientas ni accedas a archivos."],
                cwd=work, env=test_env, text=True, capture_output=True, timeout=80)
            good = False
            for line in proc.stdout.splitlines():
                try:
                    event = json.loads(line)
                    if event.get("type") == "text":
                        good = True
                except (ValueError, TypeError, AttributeError):
                    pass
            if proc.returncode or not good:
                raise RuntimeError("FREE_MODEL_AUTH_PREFLIGHT_FAILED_"+name.replace("/", "_"))
            print(timestamp(), "FREE_MODEL_AUTH_OK", name, flush=True)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("config", type=pathlib.Path)
    parser.add_argument("--preflight-only", action="store_true",
        help="Check models with synthetic prompts, no ledger / sessions for product")
    args = parser.parse_args()
    file = args.config.resolve()
    root = file.parent
    conf = json.loads(file.read_text())
    models = get_models(conf)
    product = ensure_clean(conf, root)
    base_env = auth_env(os.environ, conf["profile"]["costPolicy"])
    print(timestamp(), "CONFIG_VERIFIED", conf["ticket"],
        "free_override_removed", bool(os.environ.get("OPENCODE_API_KEY") and
                                     "OPENCODE_API_KEY" not in base_env), flush=True)
    if conf["profile"]["costPolicy"] == "free_only":
        smoke_free_auth(models, root, base_env)
    if args.preflight_only:
        print(timestamp(), "PRELAUNCH_OK_NO_PRODUCT_LEDGER", flush=True)
        return 0
    password = secrets.token_urlsafe(32)
    children = []
    try:
        urls = {}
        for role, agent in ROLES:
            if role not in models:
                continue
            model = models[role]
            cfg = root / ("host-"+role+".json")
            cfg.write_text(json.dumps({"$schema":"https://opencode.ai/config.json",
                "model":model,"default_agent":agent,"agent":{agent:{"model":model}}},indent=2)+"\n")
            cfg.chmod(0o600)
            log = (root / ("host-"+role+".log")).open("w")
            env = dict(base_env, OPENCODE_CONFIG=str(cfg), OPENCODE_PASSWORD=password, PWD=str(product))
            proc = subprocess.Popen([str(EXE), "serve", "--hostname", "127.0.0.1", "--port", "0"],
                cwd=product, env=env, stdin=subprocess.DEVNULL, stdout=log,
                stderr=subprocess.STDOUT, start_new_session=True)
            children.append((proc, log))
            url = None
            for _ in range(100):
                time.sleep(.25)
                if proc.poll() is not None:
                    break
                match = HOST_RE.search((root / ("host-"+role+".log")).read_text())
                if match:
                    url = match.group(0)+"/"
                    break
            if not url:
                raise RuntimeError("FREE_HOST_START_FAILED_"+role)
            urls[role] = url
            print(timestamp(), "HOST_READY", role, model, flush=True)
        conf["reviewUrls"] = {axis: urls[axis.lower()] for axis in conf["manifest"]["reviewAxes"]}
        conf["correctorUrl"] = urls["corrector"]
        conf["launchCommand"] = "node tools/c092/run-ticket.mjs <run-config> <private-hosts>"
        conf["startedAt"] = timestamp()
        file.write_text(json.dumps(conf, indent=2)+"\n")
        status(root, "RUNNING", engine=git(ENGINE,"rev-parse","HEAD"), base=conf["manifest"]["baseSha"])
        call = ["/usr/bin/node", str(ENGINE / "tools/c092/run-ticket.mjs"),
            str(file), urls["writer"], urls["standards"]]
        runner_env = dict(base_env, OPENCODE_PASSWORD=password,
            OPENCODE_CONFIG=str(root / "host-writer.json"))
        with (root / "runner.log").open("w") as output:
            try:
                proc = subprocess.run(call, cwd=product, env=runner_env,
                    stdin=subprocess.DEVNULL, stdout=output, stderr=subprocess.STDOUT,
                    timeout=4300)
                rc = proc.returncode
            except subprocess.TimeoutExpired:
                rc = 124
        comparison_file = root / "COMPARISON.json"
        outcome = json.loads(comparison_file.read_text()).get("outcome") if comparison_file.exists() else "STOP:RUNNER"
        status(root, "COMPLETE" if rc == 0 else "STOP", outcome=outcome, exitCode=rc)
        print(timestamp(), "EXECUTION_FINISHED", outcome, "exitCode", rc, flush=True)
        return rc
    except Exception as exc:
        # Never log environment or secrets.
        status(root, "INFRA_STOP", reason=str(exc)[:180])
        print(timestamp(), "INFRA_STOP", type(exc).__name__, str(exc)[:180], flush=True)
        return 2
    finally:
        for proc, log in children:
            if proc.poll() is None:
                try: os.killpg(proc.pid, signal.SIGTERM)
                except ProcessLookupError: pass
                try: proc.wait(timeout=6)
                except subprocess.TimeoutExpired:
                    try: os.killpg(proc.pid, signal.SIGKILL)
                    except ProcessLookupError: pass
            log.close()

if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as exc:
        print(timestamp(),"PRELAUNCH_STOP",type(exc).__name__,str(exc)[:180],flush=True)
        sys.exit(2)
