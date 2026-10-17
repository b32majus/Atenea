# Auditoría de precisión y responsabilidades — Preparación Atenea C-087

**18 octubre 2026 · Estado: propuesta, no activada.**
Base Atenea: main@355681fc1d8a12d33702e875f571b9daca91c731 (PR #156).
Rama aislada: review/c087-prep-authority-audit-20261018.
No push, PR, merge, Train o modificación de otros proyectos.

## Dictamen

**El error no es la ultraprescripción; es el reparto incompleto de responsabilidades.** La prescripción concreta de cada ticket o reparación debe seguir intacta. El prompt de Cora debe exigirla, pero no reescribir también el funcionamiento general de Matt, OpenCode y los agentes. La calidad se mide por incertidumbre eliminada antes de lanzar, no por extensión del handoff.

El prompt de 17 octubre tiene 195 líneas/15,5 KB, con reglas repetidas sobre Visual/UX, recuperación de writer, concurrencia y correcciones. Esos mecanismos ya están definidos en contratos ejecutivos, y el prompt no debe crear una segunda autoridad editable.

## Evolución comprobada en Git

- Commit b401f04, 6 octubre: nace PRE_EXECUTION_HARDENING_V1 con WHAT, WHERE, REUSE, CLOSED DECISIONS, DO NOT TOUCH, PROOF y STOP. Propósito: el implementador no vuelve a investigar decisiones ya cerradas.
- Commits c5bf161, 61eaf42, ab18a3b, c5a81c6, 11–13 octubre: precisión de evidencia falsable, proporcionalidad y correcciones.
- Commit 1a152fb, 17 octubre: incorporación al repositorio del prompt completo de Cora (191 líneas), con Free/Standard/OpenAI Visual y activación humana.
- Commit fb2fb2c, 17 octubre: ampliación hasta 195 líneas por recuperación de sesión y ventana de revisión.
- La exigencia de worktree Git/HEAD limpio ya estaba presente el 6 octubre: **no equivale a crear un VPS, fixture, servidor o puerto independiente cada vez**.

## Conservación de garantías, original → candidato

| Garantía | Candidato / autoridad | Estado |
| --- | --- | --- |
| Selección aprobada sin repetición ni auditorías generales | Sección 1 + PRE_EXECUTION_HARDENING | Preservada |
| Resultado/aceptación sin perder casos límite y excepciones | Sección 2, WHAT | Preservada |
| Costuras y consumidores directos conocidos, no arqueología | Sección 2, WHERE | Preservada |
| REUSE, modelos, funciones, estados aceptados | Sección 2 | Preservada |
| CLOSED DECISIONS: no rediagnosticar | Sección 2 | Preservada |
| DO NOT TOUCH, superficies permitidas y no-goals | Sección 2 | Preservada |
| Cuatro elementos de prueba falsable por riesgo material | Sección 2, PROOF | Preservada |
| Tests focales y testigo integrado condicional una vez | Sección 2 + PRE_EXECUTION_HARDENING | Preservada |
| Comandos reales, fase, responsable, no inventar test | Sección 2 + EXECUTION_REQUEST_AND_PREFLIGHT | Preservada |
| Visual: None/Quality/Fidelity, autoridad aprobada, hash | Sección 2 + contratos Visual | Preservada |
| PNG real recibido, viewport/state, privacidad y HUMAN STOP | Sección 2 + contratos Visual | Preservada |
| Sprint/Frontier activación humana, Go sin Visual | Secciones 2–3 | Preservada |
| Risk class independiente del foco visual y del coste | Sección 2 + ROUTING | Preservada |
| Corrección: causa, archivo, ancla, insertar/borrar/sustituir literal | Sección 2 + CHILD_AUTHORITY_CAPSULE + PROMOTION_REVIEW | Preservada |
| Conservar semántica, límites y prueba focal de la reparación | Sección 2 Correcciones | Preservada |
| Diagnóstico no cerrado → solo diagnóstico acotado, sin inventar parche | Sección 2 Correcciones | Preservada |
| QA read-only no da permiso de edición | Secciones 2–3 | Preservada |
| C-087 Standards+Spec, Visual condicional, mismo SHA/sesiones | Sección 3 + runtime canónico | Preservada |
| Fronteras de revisión compuesta e incompletas | Sección 3 + lifecycle | Preservada |
| Presupuesto compartido 2 por unidad, no reiniciable | Sección 3 | Preservada |
| Observación material negativa prevalece frente a checks verdes | Secciones 2–3 | Preservada |
| Autoridad Cora/humana, publicación y HUMAN STOP | Secciones 3–4 | Preservada |
| Writer mismo child, retorno vacío y recuperación fail-closed | Sección 3 + THIN_WRITER | Preservada por remisión |
| READY_TO_LAUNCH, bash/agente y pointer-first | Sección 4 + EXECUTION_REQUEST | Preservada |
| No ejecución anticipada, no tests ajenos, no nuevos tickets | Secciones 2–4 | Preservada |

Las garantías propias del runtime no se eliminan: se citan desde su fuente de autoridad. **No se ha reducido ningún límite obligatorio de revisión o reparación.**

## Hallazgo que sí exige una mejora concreta

**Pallet Sure M1-B.2 / 17 octubre, Free** (handoff TRAIN_PALLET_M1B_B2_UI_EDIT_C087_FREE_VISUAL_20261017.md):

- Handoff de unos 19,8 KB, además de un prompt inicial que volvió a enumerar agentes, alcance, tests y capturas.
- El Visual witness exigía un navegador con autenticación simulada, pero su handoff admitía que no existía aún una receta autenticada reproducible verificada.
- El writer terminó creando capture-company-edit.mjs (296 líneas), company-edit-fixture.tsx (305 líneas) y company-edit.html (12 líneas). Esto no prueba que todo el fixture fuera innecesario: prueba que no era un comando existente, listo para reutilizar.
- Los estados dirty/pending/navegación/selección constaban como riesgos. Su clasificación Volume merece revisar si implicaban semántica temporal difícil; no prueba por sí sola que Complex hubiera sido mejor.

**Regla propuesta:** para cada evidencia indispensable, Cora distingue mecanismo ya ejecutable, construcción mínima del testigo explícitamente incluida y autorizada en la unidad, o dependencia material pendiente con HUMAN STOP. No se exige construir el fixture durante la preparación: se exige **no transmitir la decisión sobre su alcance como una suposición**. El worktree Git sigue aislado; infraestructura reutilizable no debe reconstruirse por defecto.

## Casos positivos para preservar

**Laboratorio #92 / R2:** handoff test-only que nombra causa, único archivo writable e inserción literal precisa en el test E2E de ambos PDF, preservando todas las aserciones previas. Es ejemplo de ultraprescripción valiosa; no debe acortarse a “corrige la prueba”.

**Laboratorio Entrada U1 / Sprint:** handoff con falsadores concretos, UI aceptada y recetas de Playwright presentes. Gran parte de la especificación detallada es necesaria, pero su sección de modelos y reglas internas de recovery/review puede convertirse en referencia canónica, sin suprimir ninguna restricción de producto.

## Responsabilidades: única autoridad por función

| Elemento | Función |
| --- | --- |
| Prompt de preparación Cora | Exigir información específica suficiente, distinguir conocido/mecánica/bloqueo y delimitar alcance |
| PRE_EXECUTION_HARDENING_V1 | WHAT/WHERE/REUSE/CLOSED/DO NOT TOUCH/PROOF/STOP, proporcionalidad de prueba y dudas materialmente abiertas |
| EXECUTION_REQUEST_AND_PREFLIGHT_V1 | Git worktree/base, HEAD, preflight y bash/agente/prompt pointer-first |
| CHILD_AUTHORITY_CAPSULE_V1 + PROMOTION_REVIEW_V1 | Transporte a child de autoridad accesible y reparación ya diagnosticada **ultraprescriptiva** |
| Contratos Visual Free/Standard/OpenAI | Cuándo revisar, master, PNG/píxeles, permisos y viewport |
| C087_THIN_WRITER_REVIEW_AND_EVIDENCE_RECOVERY_20261017 + agentes | Recuperación de child, writer único, review window, corrección y evidencias focales |
| Handoff repo-local | Toda la autoridad concreta del ticket, aunque resulte largo |
| Prompt de lanzamiento | Ruta del handoff, unidad aprobada y STOP, sin recontar políticas ni producto |

## Propuesta material preparada en rama aislada

Solo se propone modificar CORA_TICKET_TRAIN_PREPARATION_PROMPT_C087.md, conservando sus cuatro secciones y sus garantías. El candidato añade una exigencia concreta para testigos visuales y distingue lo sabido, la mecánica ordinaria del writer y el bloqueo material. El resto de documentos permanecen **sin cambios**; no nuevos modelos, roles, permisos, presupuestos o contratos.

Comparación: antiguo 195 líneas/15.475 bytes; candidato 102 líneas/13.596 bytes. **La reducción de líneas no es el criterio de aceptación** y se debe principalmente a agrupar párrafos y dejar el detalle del lifecycle en su contrato; el handoff de producto puede conservar toda la extensión que necesite.

## Comprobaciones y límite de esta evidencia

En rama aislada, tras resolver dos anclas literales de tests estáticos:
- check-vnext-authority: PASS.
- test-c087-thin-execution-recovery: PASS.
- test-free-visual-handoff: PASS.
- test-standard-visual-handoff: PASS.
- test-experimental-openai-visual-handoff: PASS.
- git diff --check: PASS.

Las comprobaciones son estructurales: **no demuestran mayor rendimiento del writer**. Para evaluarlo después de una eventual integración, comparar Trains materialmente equivalentes por: tiempo perdido antes de la primera edición, cuestiones conocidas que OpenCode rediagnosticó, testigos/fixtures inesperados, resultado del primer candidato, tiempo y número de correcciones, y presupuesto de autoridad respetado. No realizar una batería artificial de modelos.

**Estado:** revisión lista para decisión humana; no fusionada en Atenea ni aplicada a proyectos/Trains activos.
