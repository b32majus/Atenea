# Atenea C-092 / M2 — auditoría independiente y cierre experimental
**Fecha:** 19-oct-2026. **Veredicto:** `M2_NATIVE_SYNTHETIC_PASS / NO_PRODUCTION / NO_UNATTENDED_TICKETS`.

## Integridad
- C090 congelada en `c090-frozen-c092-reference-20261019` → `4ce1757d41eca41e1310209e71ecb8c30846a0a3`; no alterada.
- C092 M1 auditado `01716d8b06dcff2c25f2fdc4761b2d4acb93ba99`; M2 código `06821296781f9c230ccaf61cf592de5d15855c6c`.
- Rama aislada `experiment/c092-deterministic-engine`, Atenea main, C087 y proyectos no alterados.
- No push/merge/PR/deploy. Solo cambios en `tools/c092/` y `docs/c092/`.

## Verificación externa
- **Suite M1+M2: 55/55 PASS**, incluyendo 10 pruebas nuevas de host simulado/falsadores, con código de salida 0.
- `node tools/check-vnext-authority.mjs` PASS. `git diff --check`, `node --check` PASS.
- M2 preflight lee bytes exactos de WO, recalcula `authorityDigest`, comprueba Git HEAD limpio y G03 sobre símbolos **declarados**, rutas escribibles y solo lectura. No equiparar G03 declarada con descubrimiento universal.
- Host `opencode v2.0.32`: APIs reales comprobadas `POST/GET /api/session`, listado, active y message; identidad validada con título aleatorio, agent, projectID (SHA base) y directorio real. El listado host es global; siempre filtrar.
- Reserva atómica en store M1 ANTES de crear sesión. `HOST_CONFIRM` se emite solo tras GET coincidente. Una llamada `POST /prompt` por ejecución, no se reintenta ante incertidumbre. Git candidate comprueba parent único igual a BASE, árbol limpio y diff acotado.

## Prueba nativa 1 — evidencia de fallo conservada
Repositorio sintético aislado `/srv/kairos-lab/qualification/atenea-c092-m2-native-fixture-20261019`.
- Sesión **única** `ses_eaab8208affeX5CYFOsUWjO01R`; sin subagentes. El writer produjo `0f286e01a5cf745b067aecc7b6038a8d44285e8b`, limpio, parent exacto.
- Fallo: adapter esperaba `message.info.role`, pero OpenCode 2.0.32 devuelve mensajes con `type: "assistant"`. La unidad expiró legítimamente en `HUMAN_STOP`. **No contar como PASS** ni reabrir la unidad para reutilizar writer.
- Corrección M2: soporte de la forma de mensaje realmente observada. No se alteró ni relanzó la sesión fallida.

## Prueba nativa 2 — PASS verificable
Repositorio independiente `/srv/kairos-lab/qualification/atenea-c092-m2-native-fixture-r2-20261019`.
- BASE `25992cadeb8d681e005307c3000e9640ae1a5eb1`.
- Sesión real única Build `ses_eaab48cc6ffe3tFkrv50Rkv9Mv`, modelo `nan/deepseek-v4-flash`. Host final `idle_outcome=succeeded`, **0 sesiones hijas**.
- Almacén versión 4: INIT → RESERVE_WRITER (fence=1, correlación durable) → HOST_CONFIRM (sesión verificada) → **CANDIDATE_CREATED**.
- Commit producto sintético `e8f8815a23bc2acc8e15d34c7f4ff63f2d2c1569`; **parent exacto BASE**, un único archivo `src/tally.mjs`, árbol limpio. Fixture `node --test fixture/test/tally.test.mjs` **1/1 PASS**.
- El preflight G03 localizó `bump` en `src/tally.mjs`, `test/tally.test.mjs`, `docs/WORK_ORDER.md`, todos clasificados; `authorityDigest` coincidió con bytes exactos.
- Runtime entre aceptación de prompt y estado CANDIDATE: `elapsedMs=30143`. Telemetría host de writer: `28.91 s`, 1 sesión, `input=8866`, `output=1155`, `reasoning=153`, `cache_read=73984`, campos frescos sumados `10174`. Son datos de **fixture trivial**, no equivalen a rendimiento de tickets reales ni a facturación comparable.

## Límites de seguridad aún NO cualificados
1. **No sandbox OS demostrable**: sentinel sintético y permisos del host limitan el experimento, pero no constituyen aislamiento fuerte de escrituras, procesos, comandos o credenciales. No dirigir a productos reales.
2. **No exactly-once** entre host y store. Solo reserva única con correlación y ausencia de reenvío automático; una caída en la ventana del POST puede dejar writer activo, y se debe investigar manualmente. Pruebas de pérdidas de respuesta fueron **simulaciones del adapter**, no particiones reales de red con un writer adversarial.
3. **Identidad host vs causalidad Git**: sessionRef está verificado por host y Git por parent/scope, pero no existe todavía una prueba criptográfica de que todo cambio proceda de esa sesión y ningún otro proceso tocara el repo.
4. **Estado M1 no blindado ante un operador/programa malicioso** con acceso de escritura al store. `cli.mjs advance` es un dispositivo de pruebas y podría registrar eventos ficticios si se usara como autoridad en ejecución real: **no habilitar a writer ni publicar la CLI para uso general**.
5. **Autoridad SHA no es firma humana**: vincula bytes, no identidad de quien aprobó. La autorización del experimento proviene de la persona; crear control de procedencia para tickets reales.
6. **Concurrencia entre unidades, recuperación de lock tras caída, journal append-only, fsync de directorio, symlink race y NFS** siguen pendientes de M4.
7. **Los hechos semánticos y revisiones** `WITNESSES_PASSED`, `REVIEW_CLEAN` y `FOCAL_RESOLVED` siguen sin validadores M3. El estado `CANDIDATE` NO significa `READY_FOR_HUMAN` ni aceptación.

## Decisión
`M2_NATIVE_SYNTHETIC_PASS`: conservar M1+M2, no rediseñar ni lanzar otro bakeoff. M3 integrará ejecución de testigos deterministas y revisiones independientes sobre el SHA exacto, con dictámenes estructurados y correcciones prescriptivas, sin auto-integrar. M4 será gate obligatorio de crash/recovery/isolation antes del primer Train desatendido real.
