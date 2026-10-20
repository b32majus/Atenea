# C-092 — Atenea Engine · contrato arquitectónico y plan de construcción
**Estado:** propuesta de arquitectura aprobada como línea experimental por encargo humano (19-10-2026). NO es la política canónica ni una sustitución desplegada. Rama `experiment/c092-deterministic-engine`, base Atenea `main@54248e51bee8f354654dd53a621e6ada09d585d5`.

## Decisión principal
Atenea deberá ser un **motor persistente de ejecución determinista**, no un LLM que interpreta continuamente qué hacer después. OpenCode sigue como host de sesiones y modelos; las skills de Matt se conservan **solo** en shaping/TDD/revisión cuando aporten metodología. Un único propietario de cada transición; el coordinator LLM deja de ser el conductor del flujo normal.

**C-090 queda congelada** en el repositorio de cualificación independiente: tag `c090-frozen-c092-reference-20261019` → `4ce1757d41eca41e1310209e71ecb8c30846a0a3`. 62/62 pruebas locales; G15 real incompleto. NO reetiquetar como producción ni modificar su rama.

## Fronteras de responsabilidad
- **Persona + Cora:** objetivo, dominio, alcance, aceptación, riesgo, permisos, recursos y autorización de integración/publicación; decisiones materiales siempre humanas.
- **Compilador de trabajo (Node, sin IA):** manifiesto de unidad tipado, exactamente un repo/product base, HEAD limpio, allowlist, consumidores conocidos explícitamente clasificados, comandos de testigos existentes, referencias de diseño y checks. Devolver `BLOCKED_PREP` cuando falten requisitos; no inventarlos.
- **Motor único persistente:** solo él decide transiciones; almacenamiento durable fuera del árbol de producto (Git common-dir o directorio de operación), locks/fencing, reserva ANTES del despacho, correlación de evento OpenCode y recuperación segura. No segunda fuente mutable de estado de vida de la misma unidad.
- **OpenCode adapter:** invoca escritor, revisores y correctores de forma directa con agente/modelo fijado. Identidad y estado real de sesión **solo** del host, nunca del texto del agente. No se supone API de reanudación/idempotencia que no haya sido verificada con OpenCode 2.0.32; si el resultado del despacho es incierto, `HUMAN_STOP` sin segunda sesión.
- **Writer IA:** única sesión autorizada, implementación/TDD focal, commit de candidato. No decide nuevos requisitos, no abre revisores y no publica.
- **Verificación automatizada:** scope/Git, testigos en checkout limpio, build, evidencias y snapshots autorizados; reutilizar lo ya ejecutado sin repetir por ritual.
- **Revisores independientes:** Standards + Spec y Visual si UI lo requiere. Mismo SHA. Dictamen estructurado con findings `id/axis/sha/path/location/severity/prescription/evidence`; rechazar reportes incompletos, contradictorios o no verificables en vez de fingir PASS.
- **Corrector:** máximo dos intentos reservados DURABLES; cada intento una nueva sesión y un sobre concreto de hallazgos, solo revalidación focal; tercera corrección prohibida.
- **Integración:** `READY_FOR_HUMAN` no implica merge. Push/PR/merge/deploy por política del proyecto y permiso humano explícito.

## Ciclo
```text
DRAFT (fuera del runtime) --[firma humana + preflight]--> READY
READY --[reserva duradera + despacho único]--> DISPATCH_PENDING
DISPATCH_PENDING --[host confirma identidad]--> IMPLEMENTING
IMPLEMENTING --[SHA + scope + evidencia]--> CANDIDATE
CANDIDATE --[testigos requeridos]--> VERIFYING
VERIFYING --[tests PASS]--> REVIEWING
REVIEWING --[todos los ejes utilizables, 0 hallazgos]--> READY_FOR_HUMAN
REVIEWING --[hallazgos concretos]--> CORRECTION_PENDING
CORRECTION_PENDING --[intento reservado <=2, identidad real]--> CORRECTING
CORRECTING --[nuevo SHA y pruebas focales]--> FOCAL_REVIEW
FOCAL_REVIEW --[resueltos]--> READY_FOR_HUMAN
FOCAL_REVIEW --[mismos hallazgos, cupo restante]--> CORRECTION_PENDING
Cualquier fase --[requisito material no decidido / despacho ambiguo / incumplimiento]--> HUMAN_STOP
Violación acreditada de seguridad --> FAILED
```
`READY_FOR_HUMAN`, `HUMAN_STOP`, `FAILED` son terminales para la unidad autónoma. El motor NO reabre fases tras terminal. Acto humano posterior crea nueva unidad/autorización independiente.

## Regla de eficiencia
- **Cero llamadas LLM de preparación o decisión de estados.** Preflight no ejecuta modelos.
- Un único despacho writer con una referencia de autoridad compacta, sin duplicar el corpus.
- Revisor únicamente si existe candidato limpio. Review por ejes una vez, paralela cuando runtime lo soporte; sin duplicado Standards/Spec.
- Reutilizar testigos y material compilado; no construir servidores por cada revisor.
- Tipar condiciones y medir `preflight_ms`, `time_to_writer_dispatch`, `time_to_first_valid_commit`, `tokens_by_role`, `tokens_cache_read`, `review_ms`, `correction_ms`, `cost_per_accepted_ticket`, `human_stop_rate`. Separar instalación/build neutral de coste IA.
- No normalizar consumos de proveedores incompatibles. Calidad y seguridad priman sobre el ahorro.
- No introducir clasificación probabilista de riesgo o rutas; riesgo y política de coste pre-aprobados.

## Riesgos técnicos que hay que resolver ANTES de live unattended
1. **At-most-once**: persistir reserva antes de invocar OpenCode. No afirmar exactly-once si el host no ofrece claves de idempotencia. Una caída entre envío y confirmación bloquea nueva invocación hasta reconciliación positiva. Token de fencing e identidad de sesión para evitar writer doble.
2. **Concurrencia**: bloqueo exclusivo por unidad y por worktree; repos independientes pueden correr paralelos. Atomicidad en filesystem común probada para múltiples procesos; nunca locks basados en mera lectura de JSON.
3. **Aislamiento**: el control de allowlist tras el commit no es un sandbox OS. Ensayar permisos reales de OpenCode/herramientas, variables de entorno sin secretos, rutas simbólicas, subprocesos y worktree. No permitir prod DB/credenciales; el escritor no publica.
4. **Evidencia**: hash SHA+log+comando+versión de testigo. Distinción explícita `PASS`, `FAIL`, `INCOMPLETE`, `INFRA_STOP` y qué condición activa cada una.
5. **Review**: recibo de sesión no significa veredicto semántico. Completar control de findings y falsadores; conflictos reales requieren intervención.
6. **Visual**: calidad vs fidelidad, fixture sintético autenticado, píxeles reales, estado/viewport y privacidad. No inferir PASS de una ruta PNG.
7. **Recuperación**: proceso muerto, host desconectado, sesión aún corriendo, candidato creado sin respuesta, mitad de testigos, corrector bloqueado. Ningún reinicio crea sesión nueva automáticamente por incertidumbre.
8. **Persistencia**: FS/SHA durable, logs append-only y recuperación; no depender exclusivamente de pantalla Herdr.

## Trenes de construcción (NO campañas competitivas)
| Entrega | Alcance | Gate falsable |
|---|---|---|
| **M0** (ahora) | freeze C090, ADR C092, contratos, milestones | fuentes SHA verificables, rama aislada; ninguna política global tocada |
| **M1** | core puro: validar manifiesto, estado durable, transición y presupuesto sin IA | unit tests multiestado, crash/replay, error de autoridad, compatibilidad Node 26; 0 llamadas modelo en runtime |
| **M2** | adapter real OpenCode 2.0.32 + sesión Build writer único, reconciliación del host | unidad sintética aislada, 1 sola sesión, candidato limpio, abort sin doble writer |
| **M3** | testigos/review Standards+Spec y Visual condicional + corrector único por defecto, máximo 2 | revisar SHA exacto y rechazo de reportes inválidos; pruebas tests/build |
| **M4** | recuperación durable, paralelismo interproyecto y defensa adversarial | crash/restart y race con dos procesos, permisos, fallos host, replays, revisión independiente |
| **M5** | 2–3 tickets REALES preparados (no duplicados) y medidas comparables | first-pass, tokens/tiempo/costo, retroceso automático ante defecto, informe Cora |
| **M6** | propuesta de promoción a Atenea main con revisión humana | no merge por simple suite verde; reconciliación de política C087 al adoptarlo |

**M1 NO despacha agentes, no ejecuta testigos del producto, no promete unattended**. M2 prueba identidad; M3-M4 cierran garantías antes de permitir autonomía sin supervisión activa.

## Posicionamiento respecto de C087/C090 y Matt
C090 aporta referencias de Git/host/slots/reviews, pero se extraerán únicamente invariantes con pruebas; no se copiará su coordinator markdown ni se encadenarán dos máquinas de estados. Esta arquitectura revisa deliberadamente la frontera de `AGENTS.md` y `ATENEA_HARNESS_CONTRACT_V1` C087 **solo como propuesta experimental**; ambas permanecen vigentes en main hasta acuerdo humano de migración. Matt conserva shaping/tickets/TDD y rubricas Standards+Spec, no conducción del estado. Un reemplazo gradual mantiene C087 para producción y evita contaminar pilotos actuales.

## Objetivos, NO resultados
- Preflight IA = 0 tokens.
- Preflight local en repo preparado: objetivo <10 s; despacho desde READY: objetivo <30 s (excluye disponibilidad de proveedor).
- Sin reducir assurance requerida por riesgo.
- Al menos misma tasa de cierre correcto y cero regresiones de seguridad conocidas respecto a la base antes de adoptar.
- Medir coste por ticket válido, no coste por palabra del prompt.

**No atribuir resultados futuros, ni abrir nueva competición sintética.**
