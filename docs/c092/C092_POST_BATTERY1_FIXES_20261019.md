# C-092 — correcciones después de Battery 1 (Atenea solamente)

## Contexto y autoridad

- Baseline del arnés **sin modificar**: `5258e5ec09a6901af5eff204880de524b6f44042`.
- En el primer intento de Battery 1: B1, B5 obtuvieron `STOP:REVIEW` porque los revisores devolvieron `severity=high|medium` y el validador cerrado admite únicamente `BLOCKER|MAJOR|MINOR`. Sus respectivos commits pasaron los testigos y aceptación neutral, pero los STOPs oficiales históricos se conservan. No corregirlos retrospectivamente.
- Esta rama experimental no modifica Metis, LAB, los candidatos de Battery 1 ni los resultados históricos. No autoriza push, PR, merge ni despliegue.

## Cambios delimitados

1. El prompt de cada revisión independiente especifica explícitamente el conjunto exacto de severidades y su significado (`BLOCKER|MAJOR|MINOR`). El validador estricto **no** se relaja; entradas no conformes continúan produciendo un STOP comprobable.
2. El corrector permite un worktree normal en modo `trustedLocal=true` sin exigir el marcador `.atenea-c092-synthetic.json`. El modo sintético sin autorización sigue requiriendo marcador válido. Así, una revisión con hallazgos conformes puede llegar a la corrección real autorizada.
3. Cada revisión retorna IDs de sesiones realmente creadas aun cuando termine con `HUMAN_STOP` antes de validar el recibo, para que `rootSessionIds` y `reviewSessions` no cuenten artificialmente cero. No elimina ni oculta STOPs.
4. Para ejecuciones reales con modelos esperados configurados, comprueba `providerID/modelID` directamente en las respuestas del asistente de OpenCode. Una discrepancia o ausencia de esa evidencia detiene el ciclo. Reporta por sesión `actualModels` y separa claramente la variante solicitada de una variante verificable. **Si OpenCode no expone un campo explícito de variante, `#high` se reporta `UNATTESTED`, no `ATTESTED`.** No puede garantizarse ese nivel de razonamiento con la telemetría hoy disponible.

## Pruebas y límites

- Suite de pruebas C-092 completa: **105/105 PASS** (`node --test tools/c092/*.test.mjs`).
- Cobertura añadida: enunciado del enum exacto; STOP y contabilidad de identidad por severidad inválida; rechazo ante modelo incorrecto; variante pedida pero no atestiguada; corrección real sin marcador; compatibilidad del modo sintético.
- No se repitieron B1–B5, no se ejecutó aceptación neutral, no hay reclasificación `5/5` de la batería previa.
- La revisión visual y el aislamiento fuerte siguen fuera de la cualificación de producción según las limitaciones existentes de C-092.

**Pendiente si se exige paridad estricta de `#high`:** conseguir evidencia host/proveedor explícita de la variante efectivamente usada. La coincidencia del nombre del modelo o su configuración no demuestra la variante.
