# Atenea C-092 — cualificación sobre candidato real M1-C (2026-10-20)

**Resultado provisional definitivo de esta campaña:** `C092_REVIEW_CYCLE_FAIL_CANDIDATE_NOT_APPROVED`. La campaña fue read-only: no hay integración, push, PR, merge ni deploy, y no se reescribe evidencia de intentos anteriores.

## Identidad de la unidad externa

- Producto: PROMueve Sure. Candidato **manual externo a los ledgers C-092** `6012518836ba082a218a863ddf2607cabc9bb528`, parent exacto `fadcc1182127b60dad8d20ac76b7e4409ee73545`, 25/25 paths, worktree original limpio. `main@cc66ea63287628a67581a8e487f3edc37498e72b` sin cambios.
- Tres clones de revisión independientes, Git detached del mismo SHA exacto; modelos Free específicos y sin permiso de edición. Los registros están fuera del producto: `/srv/kairos-lab/qualification/c092-m1c-manual-candidate-review-20261020/`.
- Testigos comunicados por implementador: 2116/2116 Vitest, 91 archivos, typecheck rc0, browser 19/19, tres PNG React reales. Integridad, parent, alcance, hashes/dimensiones de PNG y limpieza verificados por Cora Atenea. TypeScript verificado adicionalmente con rc0; intento independiente de Vitest fue cortado por límite de 120 s de Hermes, **no es PASS independiente**.
- Nota: la campaña NO es un Train C-092 reglamentario. No existía un `CANDIDATE_CREATED` de C-092 para ese SHA; fingirlo implicaría falsear procedencia. Se realizó una evaluación independiente externa, sin registrar certificados en el store del motor.

## Resultados de tres revisores reales

| Eje | Modelo | Sesión | Resultado |
|---|---|---|---|
| Standards | `opencode/deepseek-v4.1-flash-free` | `ses_ea7a3fe94ffeRHY8mo7teBnEqy` | exit 0; hallazgos semánticos 4, pero la respuesta incluye prosa antes del objeto JSON => recibo estricto NO VÁLIDO |
| Spec | `opencode/minimax-m3.1-flash-free` | `ses_ea7a3ffeeffe6p38cNlZSkOa84` | exit 1 tras `provider.transport` / `ECONNRESET`, texto final con 4 hallazgos; uno no cumple longitud máxima de `location` => recibo NO VÁLIDO |
| Visual | `opencode/nemotron-3.5-super-vl-free` | `ses_ea7a3ff39ffeYehkzYwwBYjgvZ` | seis PNG adjuntos, `provider.transport` / `ECONNRESET` durante el flujo y timeout a 720 s; NO HAY reporte final ni PASS pixel |

Ningún eje permite afirmar `C092_REVIEW_PASS`. Los JSON de hallazgos recuperados desde el texto de Standards y Spec (**`standards.parsed-advisory.json`** y **`spec.parsed-advisory.json`**) son **evidencia consultiva externa**, no tickets de aprobación de C-092. Mantener los flujos `*.events.jsonl` inalterados.

### Qué prueban los hallazgos (producto, sin corregirlo aquí)

Standards reporta concurrencia de duplicados por read/insert fuera de la misma unidad, lectura inicial sin error 503 acotado, CTA habilitado pero bloqueado durante otro pending, y error antiguo que reaparece al abrir formulario nuevo. Spec reporta respuesta tardía A→B que NO actualiza fila A aunque exista 201 (aunque mantiene B seleccionada), test que fija ese comportamiento incorrecto, ausencia de recuperación canónica GET tras 503 ambiguo y falta de prueba No contactar activa. Cora Atenea detectó en captura desktop la diferencia entre margen/composición del master y `mx-auto max-w-[900px]` del formulario real; no consta decisión humana de aceptar esa desviación.

La salida Prescriptiva única al proyecto bajo **C-087** (separado de esta conversación Atenea) está disponible en: `/srv/kairos-lab/qualification/c092-m1c-manual-candidate-review-20261020/HANDOFF_M1C_CORRECCION_C087_20261020.md`. **Ningún hallazgo implica permiso para modificar el producto o publicar.**

## Hallazgo de motor ya reparado en C-092 (este commit)

**M3 / colisión de IDs de hallazgos entre ejes.** En la prueba real Standards y Spec usaron ambos `F1`...`F4`. El agregador `combineReviewReceipts` actual trataba el ID del revisor como global; dos defectos distintos `F1` disparaban un `REVIEW_CONFLICT_REQUIRES_HUMAN` falso, o una coincidencia accidental podía deduplicar hallazgos independientes. Ahora el agregador conserva la identidad del recibo original y califica el ID del hallazgo agregado con su eje (`STANDARDS:F1`, `SPEC:F1`). Una regresión inyecta la misma etiqueta local F1 con evidencia diferente y exige ambos hallazgos sin conflicto; la batería C-092 pasa **125/125**. El corrector recibe IDs estables y no ambiguos.

## Defectos operativos C-092 aún abiertos (NO resueltos por este commit)

1. **Entrada de candidato externo verificado:** soporte de review-only con proveniencia explícita `manual/external`, validación de SHA/parent/authority/scope y ledger independiente. NO sintetizar `RESERVE_WRITER` ni `HOST_CONFIRM` ficticios para un commit manual.
2. **Testigo nativo browser:** `m3-native-witness.mjs` no puede arrancar/cerrar/atestiguar un servidor Vite aprobado antes de ejecutar captura Playwright. Tampoco pasa `NODE_PATH` necesario para Playwright global. Hasta disponer de `service` declarativo y su test sintético de startup/readiness/shutdown, **no probar integridad Visual real con ese testigo**.
3. **Sesiones Free de revisión completas:** asegurar outputs estrictos (solo JSON, fields tipados y prescriptivos); detectar transporte `ECONNRESET`, actividad/timeout, reportar STOP sin reciclar sesión ni falsificar PASS; considerar menor amplitud de revisión, evidencia de red y oráculos más acotados. Mantener por eje sesiones distintas, SHA inmóvil y trazabilidad real de modelo.
4. **Visual real con seis imágenes:** cualificar transporte legible por píxeles, correlación de tres parejas master/React, fallback de evidencia INCOMPLETE ante pérdida de media y presupuesto temporal medido. No inferir `PASS` desde file paths ni métricas MAE. La tentativa Nemotron no demostró el requisito.
5. **Runtime persistente por herdr:** los primeros R4/R5 lanzados desde Hermes fueron terminados por el foreground cap de 120 s pese al ajuste de timeout del motor; herdr 0.9.3 server funcional. El lanzamiento de producción del motor debe estar dentro de una terminal herdr realmente gestionada por él, y no depender del proceso de llamada Hermes. No se autoriza control de panes desde entornos ajenos sin `HERDR_ENV=1`.
6. **Coste/fragmentación de writer:** R3 consumió 780 s y produjo solo backend parcial; la unidad de 25 archivos exigía backend+UI+testigos, incompatible con límite práctico/operativo de writer. Deben medirse límites, tamaño de unidad y estrategia de continuidad sin duplicar envíos, antes de validar sustitución de C-087.

## Condición de salida y responsabilidades

- `C-087`: sigue canónica para el desarrollo de PROMueve Sure y demás Coras. La Cora de Atenea no ejecutará más tickets de producto ajenos ni C-089.
- `C-092`: experimental; QUALIFICATION **FAIL**, no instalar como coordinador general, no declarar reemplazo C-087.
- El cierre funcional M1-C debe esperar candidato corregido, testigos completos, revisiones C-087 independientes, pruebas sintéticas contra SQL real + F5 si están requeridas, y GO humano para push/PR/merge/deploy.
- Próxima cualificación C-092 debe demostrar inicio→writer→testigos→revisores→corrector (si necesario)→revisión focal→resultado auditable sobre ticket real representativo, con herdr persistente y sin STOP de infraestructura, hasta entonces **NO GO integral**.
