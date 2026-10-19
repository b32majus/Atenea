# Atenea C-092 — M1-C R2: bloqueo externo de autenticación Free

**Fecha local:** 2026-10-20. **Estado irreversible de la unidad R2:** `STOP:WRITER`. Sin candidato, sin mutación del producto.

## Preparación e intento real autorizados
- Producto **PROMueve Sure** `main@cc66ea63287628a67581a8e487f3edc37498e72b`, limpio; rama de ensayo `atenea/m1c-recovery-c092/r2`, BASE `6c0d1a3bf3b966e44c3840d8f34cf1d1a20829ef`, limpia. No push, PR, merge, despliegue ni modificaciones a credenciales o ledgers antiguos.
- Directorio de evidencia y ledger R2: `/srv/kairos-lab/qualification/pallet-m1c-c092-recovery-r2-20261020-run/`. No sobrescribir `RESULT.json`, `COMPARISON.json`, `LAUNCH_STATUS.json` ni `store/` de esa unidad.
- Motor real ejecutado: `d950f732a2f8841f515e3a26f3996a69e85cab9b`; C-092 Free Complex con modelo writer `opencode/glm-5.3-flash-free`. Standards, Spec, Visual y corrector fueron preparados en servidores loopback privados pero **no ejecutaron revisiones**.
- Resultado original registrado por el motor: `STOP:WRITER` — `NO_CANDIDATE_COMMIT`. No realizar reintento de writer en el mismo UNIT.

## Hallazgo causal independiente
Consulta de la base de sesiones de OpenCode en lectura (sesión writer exacta `ses_ea9ad2fddffeF5XPdOrwDIcUb8`): respuesta de asistente con `finish=error`, `error.type=provider.auth`, `status=401`. Mensaje del proveedor: **`This API key has expired. Create a new API key in OpenCode Console and replace it in your client or secret store. Signing in again will not renew this key.`**

Por lo tanto, la petición de creación de sesión sí funcionó tras corregir `model.id` del motor; el modelo nunca completó inferencia de implementación. El `NO_CANDIDATE_COMMIT` era una clasificación secundaria imprecisa, no una deficiencia del código de M1-C.

## Corrección de Atenea separada, sin alterar el histórico
El código `tools/c092/m2-run.mjs` ahora detecta el error terminal del proveedor **ANTES** de comprobar el commit y clasifica `PROVIDER_API_KEY_EXPIRED`, `PROVIDER_AUTH_FAILED` o `MODEL_EXECUTION_ERROR`, sin registrar secretos. Añadida una regresión en `m2.test.mjs`. Esta corrección **no reclasifica los registros R2 antiguos** ni pretende que el fallo de clave esté resuelto.

## Próximo gate
1. Titular de la cuenta: crear **nueva API key** en OpenCode Console y actualizarla en el almacén de credenciales del usuario/VPS. **No enviar la clave por chat**. No basta con repetir `login`.
2. Verificar con una inferencia sintética de mínimo coste que el proveedor Free `opencode/glm-5.3-flash-free` responde con éxito; que los otros roles necesarios sigan disponibles y respeten `free_only`.
3. **Nueva autorización humana** para lanzar R3, con identificador/store/worktree nuevos y contrato del ticket reconfirmado. R1 y R2 quedan cerrados como evidencia; no mover ni rehabilitar ledgers previos.
4. Si la nueva clave no está disponible, el producto continúa con C-087 sin alterarse; **no** usar modelos Go/Standard de pago bajo etiqueta Free.

Nada de este documento cambia los criterios de implementación, las decisiones visuales, el permiso de publicación ni la clasificación de revisión del producto.
