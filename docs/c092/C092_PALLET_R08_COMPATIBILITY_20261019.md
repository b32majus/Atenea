# C-092 — Dictamen del candidato real PROMueve Sure R08
**19 octubre 2026 · PREPARED / R08_LAUNCH_BLOCKED / C087_REMAINS_CANONICAL.**

## Fuente verificada
Ficha de PROMueve Sure: `/srv/kairos-lab/outbox/pallet-r08-cuenta-c088-preflight-20261018/docs/handoffs/QUALIFICATION_PALLET_SURE_R08_ATENEA_C092_20261019.md`, commit documental de producto `721aeb50f08b935b72761ce65bf2025f59e7dd61`. Producto `main@cc66ea63287628a67581a8e487f3edc37498e72b` y preparación separada; **no se ha lanzado ni modificado R08**.

## Decisión
**R08 no es el primer piloto adecuado para C-092 con el motor actual.** El contrato del ticket exige `uiImpact:fidelity`, `reviewAxes:[STANDARDS,SPEC,VISUAL]`, pruebas React/Vitest/Chromium, comparación de capturas reales desktop y móvil con artefactos maestros, y casos negativos de autenticación. El motor actual detiene expresamente `uiImpact !== none` con `VISUAL_PIXEL_WITNESS_NOT_QUALIFIED`; `m3-witness.mjs` valida un subconjunto acotado de comandos Node `.mjs`, sin ejecución declarativa de Vitest, TypeScript, Chromium, nodemodules ni captura/identidad de píxeles. **No falsear** `uiImpact:none`, no eliminar VISUAL, no ejecutar tests no equivalentes y no convertir un STOP en PASS.

No añadir para este primer piloto infraestructura o rutas de atestación visual incompletas. La futura capacidad visual debe tener garantía de captura React real, correspondencia SHA, aceptación de los viewports/estados correctos, diffs y criterios visuales, pruebas negativas y control de cambios en evidencias. Eso es trabajo separado y explícitamente autorizado.

## Solución transversal acotada incorporada a C-092
El antiguo chequeo de `run-ticket.mjs` dependiente de `docs/metis/` se sustituye por validación de autoridad Markdown dentro del repositorio, referida explícitamente en el prompt y con `No push`. El nuevo helper `run-ticket-preflight.mjs` y sus pruebas evitan rutas externas/parent traversal, entradas `.git`, autoridad inexistente en el prompt o que no sea Markdown. Persisten el hash de autoridad, exact BASE/HEAD y los preflights del motor. Suite completa: **107/107 PASS**. No se ha repetido Battery 1 ni se ha ejecutado un nuevo Train de producto.

## Instrucción a la Cora de PROMueve Sure
- **Mantener C-087** como protocolo operativo del producto. M1-C sigue bloqueado en su expediente independiente; no alterar la secuencia, no reiniciar ledger ni usar R08 como atajo para integración.
- R08 queda `READY_FOR_LATER_C092_VISUAL_QUALIFICATION`, no `READY_TO_LAUNCH`. Si se quiere avanzar R08 ya, requerirá handoff C-087 y GO humano individual con su secuencia autorizada.
- Proponer para piloto C-092 **otro ticket real NO visual** solo si su autoridad ya está cerrada, su coste/perfil aprobado y sus testigos son compatibles, sin fabricar un microticket para conseguir un PASS.
- No sincronizar agentes C-092 al producto. No push/PR/merge/deploy sin autorización, ni cambio de perfil Free a paid.

## Pendientes separados
1. R08: soporte real de testigos Vitest/TSX, typecheck y Chromium sobre checkout congelado.
2. R08: eje VISUAL real y fiel a maestro aprobado, con identidad de captura y recibo contra SHA.
3. Versión congelada y ejecución de un piloto no visual nuevo cuando exista GO humano.
4. C-092 Free/Go/Complex: routing específico de agentes y modelos **aún no equivalente** al catálogo C-087. No utilizar modelos pagados llamando `free_only`.

**No se ha cualificado C-092 para R08.** Este dictamen no propone sustituir silenciosamente C-087 ni reciclar candidatos históricos de Battery 1.
