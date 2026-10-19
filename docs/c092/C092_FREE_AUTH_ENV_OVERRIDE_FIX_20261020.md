# C-092 · Autenticación Free: variable heredada que invalida la conexión normal

**Fecha:** 2026-10-20 (Madrid). **Origen:** M1-C PROMueve Sure, R2 STOP:WRITER. **Estado:** causa confirmada, corrección preventiva integrada en el motor experimental; no se modifican credenciales ni el producto.

## Evidencia: contraste A/B real

El proveedor devolvió `provider.auth`, HTTP 401 `api_key_expired` al writer R2 `opencode/glm-5.3-flash-free`. El mensaje **NO demostraba** que la usuaria necesitase emitir una nueva clave. La sesión fallida se creó en el host normalmente, pero no pudo inferir.

Se examinó el entorno de ejecución **sin leer ni imprimir valores secretos**:
- En el VPS existe `OPENCODE_API_KEY` heredada de la sesión. En OpenCode convive con conexiones almacenadas en el gestor de autenticación; `opencode auth list` registra OpenCode Go, NaN, Copilot y OpenAI según su mecanismo.
- **Prueba sintética A:** OpenCode v2.0.32 normal, con `OPENCODE_API_KEY` heredada, modelo `opencode/glm-5.3-flash-free` => **401 / API key expired**.
- **Prueba sintética B:** mismo OpenCode/modelo, `OPENCODE_API_KEY` omitida del subproceso (sin borrar ni alterar el secreto) => **PONG / PASS**.
- **Prueba sintética C:** configuración temporal aislada (`OPENCODE_CONFIG`) y misma omisión => **PONG / PASS**. Esto descarta que `OPENCODE_CONFIG` aislada impida por sí misma la autenticación.
- **Prueba sintética D:** los otros tres modelos Free requeridos por M1-C, en configuraciones aisladas sin la variable heredada, completaron inferencia PONG: `opencode/deepseek-v4.1-flash-free`, `opencode/minimax-m3.1-flash-free` y `opencode/nemotron-3.5-super-vl-free`.

Conclusión: **el lanzador heredaba una credencial caducada con prioridad sobre la autenticación OpenCode funcional que usa normalmente el VPS**. No se requiere crear una clave nueva. No se realizó login/logout, exportación de secretos, sustitución de credenciales ni uso de modelos de pago.

## Corrección permanente del motor C-092

1. `tools/c092/free-env.mjs`: helper que omite `OPENCODE_API_KEY` de una copia del entorno para `free_only`, preserva todas las demás variables y nunca altera `process.env` global.
2. `tools/c092/run-ticket.mjs`: guard **PRELAUNCH_STOP** `FREE_STALE_API_KEY_OVERRIDE_PRESENT_USE_STORED_AUTH` si el caller Free llega aún con esa variable heredada. Antes de reservar escritor/ledger y sin repetir llamadas ambiguas.
3. `tools/c092/launch-ticket.py`: lanzador genérico **único** con servidor privado separado por rol, `OPENCODE_CONFIG` específico, `OPENCODE_PASSWORD` aleatorio para acceso loopback; Free pasa a cada host y al CLI el entorno clonado **sin la variable heredada**. Antes de escribir ledger llama a cada modelo Free distinto con un PONG sintético y exige éxito. Estado y logs fuera del producto; sin push, PR, merge ni deploy; proceso ejecutado una vez, sin reintentos automáticos.
4. Regresiones `free-env.test.mjs`: variable Free omitida, otras configuraciones preservadas y Standard/Go no alterados.

## Límite de cualificación y continuidad

El resultado histórico R2 `STOP:WRITER`, así como R1 y C-088, **permanecen intactos y terminales**. La corrección elimina el falso diagnóstico y el mal aislamiento, no los convierte en éxitos. Este expediente **no autoriza automáticamente un R3**. Antes de lanzar M1-C de nuevo, crear otra rama/worktree y unitId/storeDir; confirmar el mismo contrato y HEAD congelado; recibir GO para R3. No es necesario cambiar ninguna credencial de OpenCode.

Para una unidad nueva, tras `compile-ticket.mjs`:

```bash
python3 tools/c092/launch-ticket.py /ruta/externa/run-config.json --preflight-only
python3 tools/c092/launch-ticket.py /ruta/externa/run-config.json
```

La primera llamada hace smoke Free con datos sintéticos, **sin reservar ledger del producto**. La segunda repite el preflight y lanza una única ejecución real. Las rutas deben corresponder a la versión congelada exacta del motor, que también está asociada al `harnessRef` del ticket.

**Nota de control:** No reutilizar el script `launch_once.py` de R1/R2; heredaba la variable problemática y permanece como evidencia de la incidencia.
