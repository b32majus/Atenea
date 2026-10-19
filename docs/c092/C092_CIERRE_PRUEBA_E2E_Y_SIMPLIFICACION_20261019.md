# C-092 · Cierre práctico de pruebas · 19-10-2026

## Decisión de alcance
Por instrucción expresa de la usuaria, C-092 vuelve al objetivo original: **ejecución autónoma de tickets en un entorno personal de desarrollo confiable**, dentro de una carpeta Git normal y con el OpenCode ya instalado. Los experimentos M4-B sobre Landlock/seccomp, nuevos usuarios, systemd y gateway permanecen documentados únicamente como investigación opcional y **NO son requisitos para probar y utilizar Atenea en ese contexto**. Nada de crear usuarios ni servicios.

## Prueba integrada real con OpenCode (sin estados preparados)
Directorio de prueba: `/srv/kairos-lab/qualification/c092-simple-e2e-20261019`; código del runner: `tools/c092/run-smoke.mjs`.

- Unidad `simple-e2e-20261019`; proyecto Git nuevo con WO cerrada, preflight y SHA base `486e736cd9db59e161a347f5c3aa6e7f4e3d6ffa`.
- Host OpenCode v2 existente iniciado con config privada de la prueba; sin intervención sobre servicios ni configuración global.
- **Writer real Build**, sesión `ses_eaa701ef0ffeRMXwPrWVaHvghA`: commit `b0e3fb80958adcea866d8507b39ad2081a07e924`, padre exacto base, solo `src/tally.mjs`, árbol limpio.
- Testigo `node --test test/tally.test.mjs` sobre checkout separado: PASS; repetido al finalizar 1/1 PASS.
- **Standards plan** `ses_eaa6fb072ffel6WTm5Me23trIO` y **Spec plan** `ses_eaa6f4774ffetYCZ3qOUmKMJHU`: PASS estructurado, mismo SHA, cero hallazgos; host `idle_outcome=succeeded`, cero sesiones hijas cada uno.
- Auditor `auditUnitM4` inmediatamente posterior: `LOCAL_HISTORY_AND_RECEIPTS_CONSISTENT`; hashes y estados coinciden.
- Resultado del runner `COMPLETE / READY_FOR_HUMAN`, código de salida 0. No se solicitó merge, push, publicación ni despliegue. No se necesitó corrector porque hubo PASS a la primera.
- Ejecución principal: aproximadamente **73 segundos** según registro local de inicio/cierre. Telemetría OpenCode por rol: writer 23,21s, 8.136 tokens frescos; Standards 24,08s, 7.228; Spec 15,95s, 2.988. Total fresco registrado **18.352**, cache-read por separado; no usar como predicción para tickets reales.
- Repetida batería de regresión del árbol C092 anterior al commit de cierre: `node --test tools/c092/*.test.mjs` **100/100 PASS**, y `node tools/check-vnext-authority.mjs` PASS.

## Lo que esto acredita y lo que no
**Demostrado:** flujo autónomo end-to-end desde init sin siembra de eventos, writer/commit/testigos/reviews/Git/auditoría, con OpenCode real y sin LLM coordinador. No se requiere infraestructura nueva para *esta prueba*.

**Todavía no demostrado:** generalidad para tickets de proyectos LAB/PSURE; el adaptador actual está intencionadamente fijado a un fixture sintético `src/tally.mjs` y test Node. También queda sin prueba integrada una corrección disparada por findings espontáneos (aunque la corrección real y revisión focal sí se probaron en M3 en un ensayo separado). Para interfaces visuales se mantiene revisión humana; no fingir PASS automático.

## Siguiente paso útil (sin otra arquitectura ni campaña)
Una única adaptación pequeña para aceptar **WO y testigos de un ticket real acotado** en vez del fixture fijo, más un piloto de código de riesgo bajo en checkout separado, sin auto-merge. No introducir rediseños, nuevas identidades OS o gateways. C-090 sigue congelado y Atenea main intacta.

**Resultado:** `C092_E2E_NATIVE_SYNTHETIC_PASS; READY_FOR_REAL_TICKET_ADAPTER; NO_AUTO_MERGE`.
