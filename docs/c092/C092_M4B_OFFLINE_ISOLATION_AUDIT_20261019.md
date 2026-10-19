# C-092 · M4-B / prueba de sandbox offline y condiciones para completar el aislamiento
**Fecha:** 19-10-2026. **Estado:** `M4B_OFFLINE_SANDBOX_PASS / M4B_LIVE_HOST_AND_CREDENTIALS_UNQUALIFIED / NO_REAL_TICKETS`.
Base `c092-m4a-local-reliability-pass-m4b-blocked-20261019` → `1e9f84f4c40d95b41502a8ec7bc331b8141d59e1`.

## Lo verificado en el VPS, sin privilegios ni cambios globales
- Ubuntu 24.04.4, Linux `6.8.0-147`, x86_64. Landlock presente, ABI **4** comprobado por syscall 444. `libseccomp.so.2` disponible.
- Cuenta `hermes` uid=1001 sin `sudo -n`, sin acceso Docker y con `unshare` de user/mount namespace bloqueado (`Operation not permitted`). No se ha intentado modificar esta configuración.
- Se ha creado `tools/c092/m4b-landlock-offline.py` y `m4b-landlock.test.mjs`: **sandbox offline exclusivamente sintético**. Comprueba sentinel del fixture, rutas canónicas sin symlinks, repo/store/scratch disjuntos y ABI Landlock >=4. Restricción deny-by-default de lectura, escritura y ejecución con allowances mínimas del toolchain, checkout y scratch. seccomp complementa bloqueando sockets, señales/proc-introspection y metadatos chmod/chown/xattr/utime. Ambiente heredado sustituido por allowlist; se cierran file descriptors >=3 antes de exec; CPU/core limits.
- Prueba host real (sin IA): Node y Git funcionan en el checkout, scratch es escribible. Al intentar leer/escribir store, archivos exteriores, BD OpenCode, `/proc/self/environ`, symlink hacia store, señales propias, chmod/utime de store o lectura por un subproceso Python, el kernel responde `EACCES`; creación de sockets por subproceso rechazada (errno 13). No se pasan `OPENAI_API_KEY` ni `OPENCODE_PASSWORD` al hijo aunque existan en el padre.
- **3/3 pruebas del sandbox PASS**; tests de rutas no autorizadas y raíces solapadas terminan con error 86, sin ejecutar el worker. No dependencias instaladas ni cambios de servicios.
- Estas pruebas son sobre **un proceso Node sintético offline**, no el host OpenCode, no el modelo ni una sesión con permisos de producción.

## Por qué NO se certifica M4-B live
1. Landlock + seccomp **no sustituyen un UID diferente** para controlador y writer. Hay syscalls/espacios no cubiertos y el proceso sometido a Landlock puede seguir siendo dueño OS de ficheros que no puede abrir. El wrapper seccomp mitiga chmod/chown, pero no acredita aislamiento frente a todos los comportamientos hostiles del mismo UID.
2. El filtro **bloquea sockets de red**. Es correcto para el fixture offline pero impediría que OpenCode llame al proveedor de modelos. No autorizar reglas TCP genéricas a internet sin un gateway de credenciales y salida.
3. La contraseña del host y los tokens de modelo no pueden heredarse por el shell del writer. OpenCode actualmente no tiene un límite de privilegios host/herramienta verificado para este diseño. Una configuración que entregase el secreto al agente no sería aceptable.
4. Falta aislar CPU, memoria, número de procesos y espacio temporal mediante cgroups/servicio autorizado, así como los contratos de sesión/revisión y el ciclo integrado completo sin estado sembrado.
5. M4-A detectó un testigo histórico de M3 sin hash ligado al último evento; se conserva como `ACCEPTANCE_RECEIPT_DIGEST_MISMATCH`, sin corregir datos históricos.
6. El gate existente `assessProductionGateM4` **no ha sido relajado**: devuelve `PRODUCTION_NOT_QUALIFIED_M4`, `mayRunRealTicket=false`, `mayMerge=false`, `mayDeploy=false`.

## Contrato mínimo para cerrar M4-B sin otro bakeoff
**Siguiente implementación, con acceso y aprobación administrativa explícitos:**
- Dos identidades OS distintas: `atenea-controller` (solo servicio de control, autoridad, store 0700, logs y credenciales, sin herramientas de código) y `atenea-worker` (worktrees sintéticos/efímeros y herramientas, sin pertenecer al grupo del controlador). Un servicio con API tipada autoriza las transiciones y conserva los tokens/recibos; nunca expone `cli.mjs advance`.
- Host OpenCode con entorno de worker mínimamente privilegiado y *tool execution* comprobada; el worker no puede leer el store, token controlador, socket Docker ni archivos ajenos. Los revisores corren sin write permissions al candidato. Probarlo con herramientas nativas de OpenCode, no solo subprocess artificial.
- **Salida a modelos por un gateway de credenciales** con identificador de unidad, modelo permitido, presupuesto, timeout y auditoría. El gateway conserva las claves reales; el worker solo recibe credencial efímera acotada, si es estrictamente necesaria. Egress del worker debe quedar cerrado excepto el canal autorizado. La regla de red se verifica en el host real.
- Supervisor systemd autorizado con `NoNewPrivileges`, límites de CPU/memoria/procesos, almacenamiento aislado y políticas de filesystem/red verificadas. Revisar `DynamicUser` vs UID estable y propiedad del Git common dir antes de escribir unidades. No cambiar grupos, firewall ni Docker global sin aprobación.
- Falsadores mínimos de una única unidad sintética: lectura de store, escritura fuera de checkout, symlinks, `/proc`, secreto API, escape por procesos hijo, red no autorizada, SIGKILL y reinicio, doble worker concurrente, envío POST ambiguo, doble corrector, recibos falsos y final sin evidencia. Resultado `NO_PRODUCTION` en cualquier fallo.

**Decisión:** conservar M4-B offline como prueba positiva local, **no activar M5 ni ningún Train real**. El próximo paso es una intervención puntual de infraestructura/credenciales sobre un ambiente autorizado, no más prompts de coordinación ni una campaña de modelos.
