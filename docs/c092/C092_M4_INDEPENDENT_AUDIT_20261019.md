# Atenea C-092 / M4 — auditoría de fiabilidad e aislamiento (19-10-2026)

**Veredicto:** `M4A_LOCAL_RELIABILITY_PASS / M4B_OS_ISOLATION_BLOCKED / NO_REAL_TICKETS`.

Esta decisión es deliberadamente más estricta que la batería verde: **89 pruebas correctas NO sustituyen una frontera efectiva de privilegios del sistema operativo.** No se ha modificado el VPS global, C-087, C-090 ni Atenea main. No hay merge, push ni despliegue.

## Base y alcance
- Base M3 `c092-m3-nonvisual-synthetic-pass-20261019` → `2b4ee97a97547f06f61f09b697f132868ca9fa12`.
- Rama aislada `/srv/kairos-lab/qualification/atenea-c092-engine-20261019`, `experiment/c092-deterministic-engine`.
- Nuevo código M4 en `tools/c092/m4-integrity.mjs`, `m4-recovery.mjs`, `m4-environment.mjs`, `m4-lease.mjs`, `m4.test.mjs`.
- Cambios acotados en M2: reclamar worktree lease antes de reserva de writer. Cambio en CLI M1: `advance` deshabilitado por defecto; solo tests pueden activarlo con `C092_UNSAFE_LAB_ONLY=1`. **Eso es un guard de laboratorio, no control de privilegios para un atacante del mismo UID.**

## Lo efectivamente probado (M4-A)
- Se reconstruye el estado desde INIT aplicando de nuevo cada transición; verifica continuidad de versión, tipo, from/to, máquina final, reserva writer única y correcciones.
- Se recorren los candidatos Git, padres exactos, allowlist y árbol limpio. En READY_FOR_HUMAN se contrastan archivos de testigos/revisores, sha256 guardados, ejes, sesiones distintas y SHA. **El resultado de esta auditoría es `LOCAL_HISTORY_AND_RECEIPTS_CONSISTENT`, nunca sello de procedencia externa**.
- Reconciliador read-only: consulta lista/GET/activity de host, título de correlación, agente, directorio y projectID. No usa POST ni crea/retoma writer. Duplicado, ausencia o identidad falsificada → UNPROVEN; terminales nunca se reabren.
- Carreras: CAS y bloqueo por unidad de M1 se mantienen; nuevo `worktree lease` bloquea un segundo ticket sobre el mismo repo cuando comparten almacén. Se mantienen leases muertos después de `SIGKILL`: no hay auto-steal ni retry. Leases diferentes pueden ocupar repos distintos.
- `cli.mjs advance` ahora requiere bandera deliberada de laboratorio y falla por defecto.
- Suite independiente Node `node --test tools/c092/*.test.mjs`: **89/89 PASS, 0 fallos**; `ATENEA_VNEXT_AUTHORITY_CHECK=PASS` y diff/check de sintaxis correctos. Nuevos tests no llaman a modelos.
- Reaplicación a evidencias reales previas de M3: la unidad focal `c092-m3-correction-native-20261019` supera el audit local; la unidad `c092-m3-native-r2-20261019` queda `ACCEPTANCE_RECEIPT_DIGEST_MISMATCH`, porque su evento REVIEW_CLEAN histórico no registró `witnessSha256`. Este defecto histórico se CONSERVA, no se reescribe para convertirlo en PASS. El código M3 posterior ya registra ese digest.

## Bloqueo de M4-B verificado en VPS
Cuenta operadora `hermes`: `uid=1001`. El almacén y el checkout usados en el piloto pertenecen a la MISMA cuenta, directorios con permisos `775`. Por tanto, un agente con ejecución de shell bajo ese usuario puede tocar ambos y sus evidencias.
- `unshare -Ur true`: falla con `Operation not permitted` (código 1).
- `unshare -m true`: falla con `Operation not permitted` (código 1).
- API Docker: `permission denied` en `/var/run/docker.sock`.
- `m4-environment.mjs` devuelve `NO_PRODUCTION_ISOLATION` con `CONTROLLER_AND_AGENT_SHARE_STORE_UID`, `STORE_GROUP_OR_WORLD_WRITABLE`, `CURRENT_UID_CAN_MUTATE_STORE` y `OS_ISOLATION_UNQUALIFIED`.
- `assessProductionGateM4` devuelve siempre `PRODUCTION_NOT_QUALIFIED_M4`, `mayRunRealTicket=false`, `mayMerge=false`, `mayDeploy=false`.

**No es seguro intentar solucionar eso solo con una instrucción 'read only', un token de env o con chmod de archivos que el writer pueda volver a cambiar.**

## Bloqueos todavía no resueltos
1. Aislamiento REAL: ejecutar controller/estado/credenciales bajo identidad OS distinta de writer/reviewer, con política de mounts y de secretos. El writer nunca debe poder leer o modificar store ni host control token; revisar cómo ejecuta OpenCode shell con el sandbox antes de conectar.
2. Worktree lease es exclusivo **dentro del mismo store**, no global entre múltiples stores/hosts. La coordinación de despliegue real debe fijar store central y evitar unidades de control competidoras.
3. La evidencia `state.json` y recibos no son una cadena autenticada contra un proceso malicioso con permisos de escritura; verifican errores y modificaciones accidentales, no identidad.
4. Reviews de M3 reservan sesión en host pero **no tienen una reserva durable por eje antes del POST**, por lo que se necesita reconciliación read-only específica para review en caso de crash. El resultado actual se detiene por testigo duplicado si se reentra, no crea un PASS, pero queda INCOMPLETE.
5. Un crash de red entre `POST /prompt` y la respuesta no demuestra entrega exacta ni reanudación; solo STOP seguro. No se ha probado una partición de red real con agentes escribiendo.
6. El runner Node --test ejecuta código del checkout con UID del operador; carece de sandbox. No autorizable para producción hasta aislamiento.
7. Faltan caso full end-to-end sin estados sembrados, causalidad externa de Git, review contradictorio real, dos correctores nativos consecutivos, identidad de aprobación humana y oráculo visual.
8. El esquema G03 cubre símbolos DECLARADOS, no inferencia universal de consumidores.

## Contrato de M4-B sin mutaciones globales automáticas
Aprobación de infraestructura requerida antes de usar proyectos reales:
- Unidad controller como servicio con UID propio, almacenamiento fuera del repo, API tipada y log auditado, sin exponer token de control.
- Writer/revisores en entorno sandbox separado con permisos mínimos, clone efímero, montajes estrictos y egress permitido únicamente a las dependencias de los modelos / host bajo proxy controlado. Ni store, ni credenciales de proyecto, ni Docker socket dentro.
- Credenciales efímeras y secreto de modelo fuera de shell de la herramienta. Validar acceso a repos y fugas de secretos con pruebas adversariales.
- Gate de entorno automático que rechace cualquier ejecución al detectar el mismo UID o falta de sandbox; leases sobre repos y host global.
- En una **única** prueba nativa aislada, inyectar crash/rollback/race y revisar cobertura de sesiones, PR y evidencias. Evitar nueva competición sintética.

Si no hay capacidad de aprovisionar este aislamiento en el VPS compartido, preferir contenedor/worker en host autorizado distinto antes que relajar el contrato.

**Decisión operativa:** congelar M4-A como incremento útil, mantener M4-B bloqueado y NO iniciar M5 con repos reales. No añadir nueva campaña de modelos para resolver un problema de aislamiento OS.
