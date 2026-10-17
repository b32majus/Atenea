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
## 8. Revisión integral de autoridad canónica (18 octubre, ampliación sobre PR #157)

**Cobertura y jerarquía:** inspeccionados directamente AGENTS.md, README, START_HERE, CURRENT_EXECUTION_DECISION_C087, PRE_EXECUTION_HARDENING, EXECUTION_REQUEST_AND_PREFLIGHT, CHILD_AUTHORITY_CAPSULE, PROMOTION_REVIEW, WORK_UNIT_COMPOSITION, ATENEA_EXECUTION_ROUTING, ATENEA_HARNESS_CONTRACT, C087_THIN_WRITER_RECOVERY, los tres contratos Visual/UX, HUMAN_PRODUCT_DESIGN_AUTHORITY, PRODUCT_FIDELITY_GATES, PREPUBLICATION_ARTIFACT_VALIDATION y WORKTREE_AND_QUALIFICATION_HYGIENE; revisado el inventario de 274 Markdown y las 28 superficies marcadas CURRENT/Accepted o de entrada. Los documentos Gentle/Pi antiguos, EXECUTION_PROFILE_SELECTION_POLICY_V1 y HANDOFF_CONTRACT contienen una declaración de histórico/superseded y **no se han elevado a autoridad actual**.

**Integridad de referencias:** comprobados por script los caminos concretos citados por esas 28 superficies activas: 33 rutas de archivo únicas; los únicos tres usos que no corresponden a archivos reales apuntan al marcador ilustrativo `docs/handoffs/TRAIN_X.md`, claramente un placeholder. Ninguna referencia documental vigente rota demostrada con ese barrido. Este es un barrido de rutas literales, no una afirmación de que todo enlace externo o ejemplo dinámico se haya probado.

### Contradicciones / duplicación detectadas y resueltas en el candidato

1. **Entrada/preflight con tres versiones de la política Visual:** EXECUTION_REQUEST_AND_PREFLIGHT desarrollaba por triplicado Free, Standard, OpenAI y sus modelos/testigos. Ahora remite en una tabla breve a **una autoridad Visual por perfil**, conservando los siete campos y cada validador. START_HERE retiene una sola mención a los tres perfiles y remite a los contratos sin otra especificación ejecutiva.
2. **Routing OpenAI mal etiquetado como experimental en el paquete visible:** cambiado a «human-activated», conservando intactos el **identificador máquina histórico** y las rutas físicas exigidas por compatibilidad.
3. **Consumos conocidos de una UX cambiada (Entrada):** PROOF de PRE_EXECUTION_HARDENING ahora cita de forma expresa tests/helpers directos conocidos y asigna si la adaptación pertenece al writer o queda como deuda de integración identificada con dueño y evidencia. No se pide ejecutar antes suites generales ni rastrear dependencias hipotéticas.
4. **Estados temporales difíciles (Laboratorio R1 y Pallet Sure):** los casos falsadores ahora pueden identificar estado/autoridad inicial, secuencia/intercalación y propiedad invariantes, solo si ya se conoce riesgo material. Risk class sigue anclada en routing; ningún cambio de modelos.
5. **Receta visual aspiracional (Pallet Sure):** PRE_EXEC distingue testigo existente/captura con permiso, construcción mínima explícitamente autorizada y bloqueo HUMAN STOP. No ordena crear infraestructura en preparación.
6. **Resultado parcial del writer:** C087_THIN aclara que «no he terminado» no equivale a `INCOMPLETE_VISUAL_EVIDENCE`. Solo bloqueo material demostrable tras intentar el plan acotado.
7. **Corrector Volume en Entrada F2:** sesión `ses_eb44796d6ffeCzkNQ47mwCn4HO`, mensaje usuario en registro de OpenCode `seq 465` dice literalmente «a pesar que en el prompt pone sprint vamos a usar atenea volume, yo lo autorizo el cambio». Fue **una autorización humana explícita**, no una sustitución espontánea del coordinador. Pero el trabajo seguía etiquetado como la **misma unidad Sprint** y el routing de C087 fija el perfil por unidad. Se aclara que una solicitud humana no suprime por implicación la frontera fija: reconciliar una excepción humana específica y documentada o una nueva frontera limpia **antes de despachar**. Nunca cambiar el perfil silenciosamente, ni reiniciar dos correcciones.
8. **Amend prohibido en Entrada F2:** traza child `ses_eb3f87641ffeKYDbI96oZpOHGj`, `seq 665` ejecuta `git commit --amend --no-edit -q` aunque el encargo explicitaba no-amend. C087_THIN exige reconciliar identidad SHA/parent/allowlist y reportar el desvío, sin afirmar falsamente que una prueba de SHA final puede revelar *todos* los amends intermedios. No se introduce daemon ni hook nuevo.
9. **Integración ≠ GO técnico/visual:** PREPUBLICATION_ARTIFACT_VALIDATION puntualiza que tests de consumidores conocidos rojos bloquean preparación para integración/publicación; no fuerza a ejecutar CI completo en cada writer.

### Límite de autoridad respetado

- El root AGENTS.md es el orden de autoridad, NO otro manual de cada operación. Se mantiene sin modificaciones.
- No se modifican Matt ni skills-lock.json, opencode.json, .opencode/agents, modelo/routing de perfiles, permisos o presupuesto. Los dos correctores por unidad, Standards+Spec, Visual condicional y autoridad Cora/humana permanecen intactos.
- No se añade script lanzador, séptimo paso, nueva fase, revisor, comparación de modelos, web/captura extra o matriz de QA. El único instrumento de prevención añadido son siete anclas de texto mínimas en check-vnext-authority.mjs.
- El mensaje de lanzamiento canónico sigue **pointer-first** (leer handoff y ejecutar unidad, STOP en checkpoint de handoff) según AGENTS.md y EXECUTION_REQUEST; no se reescribe su contenido específico ni se duplican contratos.
- El prompt revisado **no limita la longitud del handoff**: un parche seguro conocido sigue exigiendo archivo, ancla, fragmento literal/diff, comportamientos a preservar y test focal. Error no diagnosticado → pregunta acotada.
- Una excepción humana de perfil a mitad de unidad requiere reconciliación expresa: la simple preferencia por otra ruta no cambia automáticamente un contrato ya fijado.

### Aceptación

La consolidación afecta a documentación vigente y al *checker* estructural existente. Las pruebas automatizadas de autoridad/routing/Visual/UX/lifecycle se han ejecutado sobre la rama aislada antes de publicación; no son garantía de desempeño empírico. Los próximos Trains aportarán first-pass correctness, corrective effectiveness, transporte/recovery y tiempo activo separados de la espera humana.

**Despliegue:** solo a nuevas unidades limpias tras merge y sincronización proyecto-local. Trains existentes, otros worktrees, bases de datos y aplicaciones no deben tocarse.
