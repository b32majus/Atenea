# C-092 — primer arranque M1-C PROMueve Sure, incidencia de contrato OpenCode
**Fecha:** 2026-10-20 (Madrid) · experimental · sin publicación.

## Unidad histórica no reutilizable
- Producto: `/srv/kairos-lab/qualification/pallet-m1c-c092-recovery-20261020`; rama aislada `atenea/m1c-recovery-c092/r1`, HEAD/base `b410a386bea098dd4325a3d44842e52c300758ef`, árbol limpio.
- Ticket/autoridad: `docs/handoffs/M1C_RECOVERY_C092_20261020.md`, Free Complex, VISUAL fidelity, 25 rutas, 4 testigos y 3 maestros PNG.
- Motor inicial: `9b843c58af2f140a623b846b77e8678e18a4a8ea` (121 pruebas internas PASS).
- Unidad `psure-m1c-c092-recovery-20261020`; evidencia de ejecución y ledger en `/srv/kairos-lab/qualification/pallet-m1c-c092-recovery-20261020-run/`.
- OpenCode: 5 servidores loopback de roles Free arrancaron satisfactoriamente (writer GLM 5.3 Flash Free; Standards DeepSeek V4.1 Flash Free; Spec MiniMax M3.1 Flash Free; Visual Nemotron 3.5 Super VL Free; corrector DeepSeek V4.1 Flash Free).
- **Resultado registrado e inmutable:** `STOP:WRITER` / `AMBIGUOUS_CREATE_HOST_MATCH_NOT_PROVEN`. API respondió `HTTP 400 Bad Request` al intentar crear sesión. No hubo writer, candidate SHA, testigos, revisiones ni correcciones, y producto/main no cambió. No alterar ni reiniciar el ledger detenido; no reclamar PR_READY.
- **Causa reproducida:** `HostAPI.create` construía `model:{providerID,modelID}`, pero el SessionCreate de OpenCode V2 exige `model:{providerID,id}`. Una prueba sintética aislada con el formato anterior devolvió HTTP 400 / `Missing key at ["model"]["id"]`; la prueba con el formato corregido respondió HTTP 200 y devolvió una sesión real con el modelo esperado, **sin enviar prompt ni ejecutar inferencia**.
- **Corrección de motor acotada:** `m2-host.mjs::modelRef` devuelve `{providerID,id,variant?}`, y `m3-profile.test.mjs` fija el contrato; 121/121 pruebas correctas. Branch experimental nueva, sin tocar el motor histórico.
- **Siguiente ejecución:** cualquier intento posterior necesita **nuevo unitId, nuevo storeDir y nuevo worktree limpio** desde una BASE autorizada. Nunca ejecutar de nuevo el launcher de esta unidad, ni editar `RESULT.json`, `COMPARISON.json` o JSONL para encubrir el STOP. Realizar el GO específico para esa unidad. No arrastrar el candidato C-088 no registrado `4133698` como aprobado. No push/PR/merge/deploy.
