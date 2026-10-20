# Atenea C-092 · M3 — auditoría independiente y cierre experimental
**Fecha:** 19-10-2026. **Resultado:** `M3_NONVISUAL_SYNTHETIC_PASS / VISUAL_UNQUALIFIED / NO_REAL_TICKETS`.

## Repositorios y autoridad
- Proyecto canónico Atenea `main`, C-087 y C-090 sin modificaciones. C-090 sigue congelada en `c090-frozen-c092-reference-20261019` → `4ce1757d41eca41e1310209e71ecb8c30846a0a3`.
- C-092 rama aislada `experiment/c092-deterministic-engine`, M2 auditado `d8e32908986c036549e20766a75e15304ec09076`.
- Código M3 `6d89e799459f588f3b331f44b535cfdb1e6c459d`, guardia Visual `9ee4d7bb6afbe5d7b956d39a8f802d8fdb45baac`.
- Sin push, PR, merge ni deploy. Cambios `tools/c092/`, `docs/c092/` y evolución acotada del `state.mjs` de M1; no segundo coordinador.

## Qué está implementado
1. **Testigos:** `m3-witness.mjs` crea worktree detached sobre SHA, ejecuta comando tipado permitido con `spawnSync` sin shell, conserva argv/exit/sha256 stdout-stderr/duración y borra worktree; bloquea ausencia, mutación, SHA sucio y argv no permitido. **Solo Node --test en fixture sintético**. No afirmar aún soporte real de npm build/Playwright o sandbox OS.
2. **Reviews:** `m3-review.mjs` crea dos sesiones **`plan`** frescas, una Standards y otra Spec, comprobando identidad del host, projectID, directorio, título y SHA; exige JSON estructurado que coincida exactamente con eje y SHA, no acepta PASS con findings ni finding sin prescripción/ruta/evidencia. Rechaza contradicciones y clasifica conflictos `HUMAN_STOP`.
3. **Fin de sesión:** formato real OpenCode 2.0.32 verificado. El endpoint de mensajes devuelve **nuevo → antiguo**. Solo se acepta el texto del **último mensaje assistant** cuando `finish='stop'`; no se reutiliza un PASS antiguo ante un turno nuevo incompleto.
4. **Correcciones:** `m3-correct.mjs` registra `RESERVE_CORRECTION` durable antes de crear host; verifica sesión real Build y emite `CORRECTION_HOST_CONFIRMED` en state; no reintenta respuesta ambigua; exige SHA nuevo con parent exacto, solo rutas permitidas y árbol limpio. Máximo dos intentos por estado; el tercero es rechazado.
5. **Cierre focal:** vuelve a ejecutar testigos en checkout separado y revisa el **SHA corregido** con sesiones frescas. Los hallazgos pendientes llevan `FOCAL_UNRESOLVED` con nuevas prescripciones; no se heredan hallazgos obsoletos. Para el prototipo, se revisan los dos ejes por seguridad; economizar rechecks por eje requiere evidencia de no-regresión futura.
6. **Visual:** si `uiImpact=quality|fidelity`, falta oráculo de píxeles reproducible; M3 da **`HUMAN_STOP: VISUAL_PIXEL_WITNESS_NOT_QUALIFIED`**, sin llamar a revisores ni fabricar PASS.

## Pruebas independientes del modelo
- `node --test tools/c092/*.test.mjs`: **72/72 PASS**, sin skipped/fail.
- Incluye falsadores de completitud y eje de review, dictámenes ambiguos, falsos PASS, texto de modelo no JSON, session identity, pérdida de respuesta en corrector, out-of-scope, maxCorrectors 0/2, commit hijo único, focal review y guardia Visual.
- `node tools/check-vnext-authority.mjs`: PASS. `node --check` de M3 y `git diff --check`: PASS. Git limpio después del commit.

## Ensayo OpenCode nativo A — bug detectado, no ocultar
- Directorio `/srv/kairos-lab/qualification/atenea-c092-m3-native-review-20261019`.
- Standards plan produjo el JSON PASS correcto sobre SHA, pero el adapter tomó texto de una respuesta anterior por interpretar mal el orden de mensajes.
- Resultado real de esa unidad: **HUMAN_STOP / REVIEW_NOT_STRICT_JSON**, aunque el modelo hubiera producido dictamen correcto.
- Se corrigió exclusivamente el lector. Esa unidad no se reanudó ni se atribuyó PASS.

## Ensayo OpenCode nativo B — revisión de candidato
- Fixture independiente `/srv/kairos-lab/qualification/atenea-c092-m3-native-r2-20261019`.
- Candidato SHA `e8f8815a23bc2acc8e15d34c7f4ff63f2d2c1569`; testigo 1/1 PASS en detached worktree.
- Standards `ses_eaaa90717ffePsbzaubRlxP0i2` PASS; Spec `ses_eaaa8b93dffedniS0Z6oiAb64R` PASS. Ambos **plan, host idle succeeded, 0 hijos**.
- Resultado final `READY_FOR_HUMAN`. Se utilizó estado `CANDIDATE` **sembrado por operador exclusivamente para fixture** a partir del commit real M2 previo; esto NO demuestra una corrida integral única desde INIT hasta revisión.

## Ensayo OpenCode nativo C — corrector y revisión focal
- Fixture aislado `/srv/kairos-lab/qualification/atenea-c092-m3-native-correction-20261019`.
- Base sintética `aae7e4a79cbc71d042af1da57e97c4ba20bdb8f5`; candidato con defecto preparado `672f8688356b461c71d7c449b941c5907b025c8e`.
- **Findings SPEC-1 preparados por operadora para simular la entrada del corrector**, NO generados por un revisor de esta misma corrida. Estado `CORRECTION_PENDING` sembrado bajo contrato de fixture.
- Corrector Build `ses_eaaa54f50ffe5aB2uAadgBa1EP` entrega `8fa3713a5a6e1d72c28c24df7c0b36ec3a03bfc0`, parent exacto candidato anterior, único cambio `src/tally.mjs`, árbol limpio. Usa **1/2** correcciones.
- Testigo nuevo 1/1 PASS; focal Standards `ses_eaaa49b1afferVFWdUX6MIZsbn` PASS y Spec `ses_eaaa447c1ffekFnSKEEMngMGwv` PASS; todas las sesiones plan terminaron `succeeded` y **sin subagentes**.
- Final: `READY_FOR_HUMAN`. Es prueba nativa de corrección/cierre, pero NO demostración de detección de ese fallo por revisión previa en la misma corrida.

## Coste observado (solo fixtures)
El bloque de 2 revisiones iniciales + 1 corrector + 2 revisiones focales consumió `38.888` tokens de campos frescos de la telemetría OpenCode. Por sesión: Standards inicial 11.430 / Spec inicial 6.098 / corrector 12.918 / focal Standards 6.146 / focal Spec 2.296. Incluyen 5 sesiones IA, sin contar caché como coste fresco; no extrapolar a tickets reales ni afirmar ahorro de costes frente a C-087 sin pares comparables.

## Riesgos abiertos que bloquean uso real desatendido
- **M4 imprescindible:** sandbox OS de testigos y agentes; aislamiento de credenciales; permisos de filesystem/worktree, symlinks, procesos y no-publicación; endurecimiento del store frente a otros escritores; prueba real de crash/recovery/lock y fallos de red; correlación causal commit ↔ writer.
- Auditoría de ciclo integral único sin estados preparados por operador; conflictos de revisores sobre defectos reales; dos correcciones reales consecutivas no demostradas aún.
- **Visual calidad/fidelidad NO cualificado** hasta capturas de browser y oráculo visual (viewport/estado/fixture/autorización) verificable.
- `HOST_CONFIRM`, `WITNESSES_PASSED`, `REVIEW_CLEAN`, `FOCAL_RESOLVED` siguen siendo eventos escribibles por la CLI de prueba M1 con acceso al store. Bloquear uso de esa CLI por agentes y probar política de accesos en M4.
- G03 aún limitado a símbolos declarados; aprobación WO digest no constituye firma humana verificada; testimonios LLM validan estructura, no perfección semántica.
- `READY_FOR_HUMAN` significa candidato listo para decisión humana en el fixture, NO autorización de push/merge/despliegue ni garantía de perfección.

**Decisión:** M3 no visual sintético aprobado como prototipo. No repetir bakeoffs. Fijar tag experimental e iniciar M4 de defensa y recuperación; mantener C090/C087 operativos sin modificación hasta una cualificación completa.
