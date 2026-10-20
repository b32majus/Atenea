# C-092 / M1 — auditoría independiente de construcción (2026-10-19)

**Dictamen:** `M1_CORE_PASS_EXPERIMENTAL / NO_LIVE_DISPATCH`. Desarrollo aislado y limpio, sin cambios en Atenea main ni C090. No autorizado utilizar esta CLI para controlar agentes reales, revisión, publicación o cambios de producto.

## Integridad
- C090 congelada: `c090-frozen-c092-reference-20261019` → `4ce1757d41eca41e1310209e71ecb8c30846a0a3` (62 tests previos; G15 nativo incompleto).
- C092 rama: `experiment/c092-deterministic-engine`, origen de Atenea main `54248e51bee8f354654dd53a621e6ada09d585d5`. Documentación/decisión en `be20064dd32a0b15359deb30288aab87001462b4`.
- Writer: OpenCode Build nativo, GLM 5.3 Flash High, sesión `ses_eaad5f039ffe7C0oYUcERc1CTD`; commit de código `7f34f517e3fa8ee71dff345372e3668ee8fa18c1`. Cambios exclusivamente en `tools/c092/`.
- Salida posterior del agente detenida expresamente tras commit y auditoría para evitar consumo adicional; no afecta la identidad del candidato ni la evidencia de pruebas.

## Verificación independiente, fuera de Build
- `node --test tools/c092/*.test.mjs`: **45/45 PASS**, 0 FAIL, repetido en tres ejecuciones; incluye concurrencia real entre procesos en fixture local.
- `node tools/check-vnext-authority.mjs`: `ATENEA_VNEXT_AUTHORITY_CHECK=PASS`.
- `git diff --check`, `git status --porcelain`: PASS, árbol limpio.
- No hubo despliegue, merge, push ni cambios en los repositorios de LAB/PSURE/C089/C090.

## Hallazgos de calidad y límites abiertos, no ocultar como PASSED
1. **`HOST_CONFIRM` no autentica la sesión real.** El estado acepta una cadena `sessionRef`; únicamente el adapter M2 con datos fiables del host puede emitir ese evento. La CLI `advance` de M1 es una herramienta de prueba, no una autorización de producto.
2. **Authority digest solo valida formato.** `authorityDigest` es SHA256 sintáctico; no comprueba todavía los bytes de una WO aceptada ni una firma humana vinculada a esa unidad. Antes de LIVE, enlazar y comparar digest/referencia en el preflight.
3. **G03 real no está migrado.** `consumerSymbols` se valida formalmente; `preflightRepo` todavía no resuelve/enumera lectores del símbolo en BASE como la versión C090. No se afirma prevención completa de consumidores, incluso si se declaran símbolos.
4. **Store: persistencia local, no prueba de integridad frente a actor hostil o fallo energético.** `state.json` integra historial y estado mutable, no es un journal append-only independiente/tamper-evident. El SHA del manifest es recalculable por un proceso con permiso de escritura al store; el lock `mkdir` no constituye un sandbox ni demuestra token propietario frente a un actor que elimine un lock existente. No afirmar exactly-once, anti-manipulación, NFS o crash-safe recovery.
5. **Aislamiento del store:** `--store` es ruta seleccionada por operadora; el módulo no demuestra que se encuentre fuera del repo de producto. Antes de LIVE comprobar root realpath, permisos y no-intersección con el worktree.
6. **Revisión de calidad/seguridad:** los eventos `WITNESSES_PASSED`, `REVIEW_CLEAN` y `FOCAL_RESOLVED` no verifican en M1 origen, resultados, conjunto de ejes, SHA o nombres de revisores; solo una máquina de estados los acepta. M3 deberá consumir hechos autenticados, no strings.
7. **Carrera/stop seguro:** M1 implementa reserva duradera y rechazo de reentradas, pero no demuestra idempotencia nativa de OpenCode en la ventana entre envío y confirmación. M2 exigirá reconciliación del host y bloqueo `HUMAN_STOP` en ambigüedad, sin segundo writer.
8. **Visual/fidelity:** M1 comprueba exigencia/prohibición de eje Visual, pero no verifica píxeles, autenticación sintética, viewport/estado ni preservación de fixtures. Es M3–M4.

**Resultado:** M1 cumple su WO como prototipo local seguro para probar estados; **NO cumple aún el objetivo final unattended**, y es correcto que no lo haga: las barreras precedentes son condiciones de entrada para M2/M3.

## Coste de construcción (NO coste de runtime)
Telemetría read-only de OpenCode:
- Duración sesión de Build `1043.23 s`.
- Turnos `45`, herramientas `52` (8 read, 18 shell, 10 write, 15 edit, 1 execute).
- Campos reportados: input `86.369`, output `24.365`, reasoning `12.987`, cache-read `2.000.960`. Suma de campos frescos `123.721`. No convertir cache-read en token facturado ni coste monetario.
- La duración incluye diseño/codificación/tests/depuración de M1, **no** la latencia de decisión de Atenea v2. Evitar cambiar modelos basado solo en ese dato.

## Decisión arquitectónica tras auditar
**Conservar el núcleo y no reabrir M1 por mejoras cosméticas.** Antes de una sola invocación real en M2, preparar el adapter con fuente autenticada de sesión, vínculo de autoridad, preflight G03 y reserva. Probar un único fixture aislado; no desplegarlo en tickets reales hasta review y pruebas de crash. El motor único será dueño del estado; los agentes no podrán producir eventos de control arbitrarios.

**Próximo contrato: M2 — transporte OpenCode 2.0.32, identidad host y despacho preventivo**, manteniendo M1 como dependencia fijada por SHA. No añadir otro coordinator, skills nuevas ni segundo ledger para resolver esos puntos.
