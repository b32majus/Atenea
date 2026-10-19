# C-092 / M1 · Work Order cerrada para OpenCode Build
**Autoridad:** `docs/c092/C092_ARCHITECTURE_AND_PLAN_20261019.md`. Persona responsable autorizó crear C-092 (2026-10-19). Esta WO solo implementa M1; no M2+, no integración, no publicación.

## Objetivo
Crear en `tools/c092/` una librería y CLI de **núcleo determinista sin LLM**, que valide un contrato de trabajo explícito y persista transiciones de estados con semántica fail-closed. En M1 NO se invoca OpenCode, no se crean writers ni se ejecutan tests de producto.

## WHAT / comportamiento aceptado
1. `manifest.mjs`: `validateManifest(raw)` (y si procede `preflightRepo(root,manifest)`) valida objeto cerrado `atenea.c092.unit/v1`: `unitId` ASCII restringido, `baseSha` SHA40, `allowPaths` lista no vacía de rutas relativas seguras, `doNotTouch` lista sin solapes, `consumerSymbols` lista explícita (puede ser [] solo cuando la unidad no afecta símbolos declarables, nunca afirmar G03 verificado), `reviewAxes` conjunto de `STANDARDS`, `SPEC`, `VISUAL` según UI declarada, `maxCorrections` 0–2 y `authorityDigest` SHA256. Para riesgo de interfaz `uiImpact=none|quality|fidelity`: `VISUAL` requerido en quality/fidelity y prohibido en none, excepto perfil con exención explícita en contrato futuro, NO implementar exenciones ahora. No inventar política semántica de usuarios. `preflightRepo` comprueba BASE=HEAD limpio Git si se implementa, sin mutaciones. No ejecutar comandos configurables proporcionados por manifest.
2. `state.mjs`: motor de transiciones **puramente determinista** con estados `READY`, `DISPATCH_PENDING`, `IMPLEMENTING`, `CANDIDATE`, `VERIFYING`, `REVIEWING`, `CORRECTION_PENDING`, `CORRECTING`, `FOCAL_REVIEW`, `READY_FOR_HUMAN`, `HUMAN_STOP`, `FAILED`. Transiciones tipadas, sin salto ni vuelta de terminal. `DISPATCH_PENDING` requiere reserva de writer *antes* de cualquier despacho; un reintento de reserva/acción nunca concede un segundo writer; no asumir que reservar creó una sesión.
3. `store.mjs`: estado durable en un **directorio de operación explícito**, distinto del repo de producto (no escribir jamás en producto). Inicialización exclusiva por `unitId`, rechazo de unitId duplicado, manifest sellado por SHA, `version` monotónica y operación compare-and-swap. Uso de `mkdir` de lock por unidad o equivalente OS para serializar procesos; lock ambiguo/stale = `HUMAN_STOP` o error de contención, **no robar ni borrar automáticamente**. Cada evento persiste estado y evidencia mínima, atomización con archivo temporal+rename y sync según soporte Node. Para M1 no prometer exactly-once frente a pérdida de energía o filesystem remoto.
4. `cli.mjs`: solo operaciones deterministas `init --manifest <archivo> --store <dir>`, `status --unit <id> --store <dir>`, y para pruebas si necesario `advance --event <eventoJSON> --unit <id> --store <dir> --expected-version N`. **No** añadir un comando `run` o `dispatch` hasta M2. No ejecutar modelo, shell arbitrario ni procesos de producto.
5. `*.test.mjs`: Node test sin dependencias nuevas que cubra 1 writer reservado, doble intento/race, pérdida de respuesta, terminal inmutable, correction max2, conflicto de version, manifest malformado, traversal/symlink, contradicción Visual, lock, historial de errores, y que ninguna transición genere un segundo writer en resultados ambiguos.

## WHERE
Solo `tools/c092/**` y esta documentación C092 (no modificar otras rutas, `AGENTS.md`, `opencode.json`, modelos, dependencia, main, skills de Matt o repos de producto).

## REUSE
Node.js estándar (se verificó 26.7.0 en VPS). Reutilizar semántica y falsadores C090 G03/G06/G13/G15 pero NO copiar el plugin completo ni agregar otro coordinator. El runtime nuevo tendrá una sola fuente mutable de verdad. No usar SQLite nativo si complica innecesariamente M1; una store local append-only + CAS es suficiente para probar estados, pero la reentrancia real se debe falsear con procesos concurrentes.

## STOP / no inferir
- No inventar APIs de OpenCode para despacho/continuación en M1; quedan en M2.
- Si una garantía de persistencia atomicamente concurrente no puede demostrarse, devolverla explícitamente `INCOMPLETE` y restringir operaciones, nunca declarar safe-run.
- No permitir un evento genérico `forceAdvance`, `reset`, `retryWriter`, `override`, `skipReview`.
- No tocar secretos, tokens ni ficheros ajenos; no push/merge/deploy.

## PROOF / entrega
`node --test tools/c092/*.test.mjs` -> PASS; `node tools/check-vnext-authority.mjs` (si no está disponible/compatible, reportar razón sin modificar chequeos históricos); `git diff --check`; `git status --short`. Hacer UN commit de código de M1 después de las pruebas. Entregar SHA + paths + decisión explícita sobre las garantías aún NO cubiertas (M2+). NO proponer otra campaña de modelos ni rediseñar M1.
