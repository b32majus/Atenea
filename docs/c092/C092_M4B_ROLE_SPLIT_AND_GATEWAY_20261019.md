# C-092 · M4-B continuación: separación de identidades y gateway sintético
**Fecha:** 19-10-2026. **Resultado:** `M4B_SYNTHETIC_CREDENTIAL_GATEWAY_PASS / ROLE_SPLIT_NOT_INSTALLED / NO_REAL_TICKETS`.

## Problema material
El VPS solo concede a `hermes` acceso administrativo sin contraseña para `systemctl restart hermes-gateway.service`; **no** permite crear usuarios o servicios con privilegios ni gestionar permisos. Las identidades `atenea-controller` y `atenea-worker` no existen todavía. Nadie ha ejecutado cambios sudo, Docker, firewall, grupos o systemd para Atenea. **No es correcto promocionar el resultado de un fixture offline a producción.**

## Arquitectura mínima elegida
```
                  Autoridad humana (fuera de worker)
                          │
            ┌─────────────▼────────────────┐
            │ Controller UID dedicado       │
            │ manifest, store 0700, ledger  │
            │ transiciones, sesiones, logs  │
            └───────┬────────────────┬──────┘
                    │ despacho       │ emisión de grants limitados
                    ▼                ▼
            ┌─────────────┐  ┌───────────────────────────┐
            │ Worker UID  │  │ Gateway UID privilegiado   │
            │ OpenCode V2 │──│ provider real keys SOLO   │
            │ shell/tool  │  │ en este servicio           │
            │ checkout    │  │ modelos/cupos/expiración   │
            └─────────────┘  └──────────────┬────────────┘
                                            ▼
                                    proveedor autorizado
```
OpenCode V2 soporta proveedor personalizado con `package: "@opencode/ai/providers/openai-compatible"` y `settings.baseURL`, según documentación actual. **No se ha conectado todavía al gateway C092 con un modelo real**: hay que validar streaming, formato de mensajes y autenticación con el host antes de autorizarlo.

### Qué se ha implementado sin efectos externos
- `tools/c092/m4b-synthetic-gateway.mjs`: servicio HTTP **SOLO fixture**, upstream restringido a `http://127.0.0.1:PORT/v1/chat/completions`, clave sintética obligatoria, modelo fijo, token HMAC con identidad de unidad/rol/modelo/expiración, contador de solicitudes debitadas antes de la operación, límites de salida y tamaño de entrada. Rechaza URL arbitrarias, otras rutas/modelos, streaming y parámetros extra. No expone clave simulada en grants ni errores. **Nunca usar con claves reales**.
- `tools/c092/m4b-role-posture.mjs`: comprobador read-only de existencia de las identidades, separación de UID, almacén `0700`, titularidad de los directorios, rechazo de symlinks y raíces solapadas. Devuelve `productionQualified=false` incluso si la estructura está configurada: falta comprobar acceso real desde ambos usuarios, systemd/egress y host.
- Sus suites son offline, con proveedor HTTP sintético en loopback, sin solicitudes a proveedores externos, sin llamadas LLM y sin secretos reales.
- Sigue disponible el sandbox offline Landlock+seccomp congelado en `e71b683` (**92/92 PASS previos**). No se ha abierto tráfico de red en dicho sandbox.

## Seguridad y limitaciones de la propuesta
1. El token de gateway sería una **capacidad de uso** accesible a quien ejecute herramientas bajo el UID worker, aunque limitado por cuota y caducidad. Un atacante que capture el token puede gastar la cuota. No confundirlo con invisibilidad del token para el agente.
2. Los límites de solicitudes/bytes/`max_tokens` **no** son contabilidad exacta de tokens facturados; una API puede rechazar, cambiar semántica o reintentar. En la versión real se debe medir uso confirmado del proveedor, limitar concurrencia y tener presupuestos monetarios externos verificables.
3. El ledger del gateway sintético solo vive en memoria; tras crash NO es duradero. Un gateway real necesita reservas durables con semántica fail-closed y cambio de secreto/sesión en reinicio, además de control de reintentos upstream.
4. Sin namespaces ni firewall del worker, Landlock ABI4 y seccomp **no demuestran por sí solos** que un proceso pueda comunicarse exclusivamente con un puerto/servicio elegido. Un host real requerirá servicio worker separado con políticas efectivas de egress, o canal Unix autenticado y control de red.
5. La autenticación de host OpenCode y el secreto que usa el controlador deben almacenarse exclusivamente bajo la identidad controladora. El worker no tendrá derechos sobre store, socket Docker, rutas privadas, credenciales de host ni credenciales raíz del modelo.
6. Revisores Standards/Spec deben ser read-only **a nivel de permisos del OS**; el prompt `plan` no es sandbox. El checkout de revisión puede ser readonly mientras el controller gestione el acceso y los SHA.
7. M4 exige todavía crashes reales con una sesión OpenCode en marcha, reconciliación de POST ambiguo, doble writer, presupuesto de corrector, falsificación de recibos y un ciclo end-to-end sin estado sembrado.

## Aprovisionamiento requerido — manual, NO ejecutado
**Requiere intervención autorizada del administrador del VPS.** Antes de cualquier comando, confirmar que los nombres propuestos no existen, que no hay colisión con servicios/usuarios y que `/var/lib/atenea-c092` y `/srv/atenea-c092/workspaces` están libres.

Comandos orientativos para una sesión administrativa autenticada, después de revisión humana de rutas y nombres (NO ejecutar como parte de este Train):

```bash
# Comprobaciones de solo lectura:
getent passwd atenea-controller atenea-worker
ls -ld /var/lib/atenea-c092 /srv/atenea-c092/workspaces 2>/dev/null || true

# Plan de aprovisionamiento; solo administrador, y solo tras autorización:
sudo useradd --system --no-create-home --home-dir /var/lib/atenea-c092 \
  --shell /usr/sbin/nologin --user-group atenea-controller
sudo useradd --system --no-create-home --home-dir /srv/atenea-c092/workspaces \
  --shell /usr/sbin/nologin --user-group atenea-worker
sudo install -d -m 0700 -o atenea-controller -g atenea-controller /var/lib/atenea-c092
sudo install -d -m 0700 -o atenea-worker -g atenea-worker /srv/atenea-c092/workspaces

# Después, comprobar owner y permisos desde administrador:
sudo stat -c '%U:%G %a %n' /var/lib/atenea-c092 /srv/atenea-c092/workspaces
```

**No configurar servicios todavía:** primero debemos cerrar el contrato de gateway, comprobar la forma en que OpenCode V2 lanza herramientas/host, crear un `systemd` unit revisable y verificar que los procesos hijos no comparten el token principal. No habilitar servicios persistentes con rutas o comandos improvisados.

## Criterios de promoción pendientes
- Dos identidades OS reales y separación de directorios comprobada con `runuser` por administrador, con acceso denegado de worker al store y secretos.
- Gateway compatible con OpenCode V2 real (incluido streaming) con credencial upstream custodiada fuera de worker y cuotas persistentes.
- Egress del worker verificablemente restringido; firewall/namespace/sistema de red instalado solo con autorización.
- Tests adversariales: procesos hijos, symlinks, secretos, red, crash, reintento de respuesta ambigua, credenciales, source git y testigos.
- `assessProductionGateM4` permanece en NO_PRODUCTION; `M5` y tickets reales desatendidos NO se activan.

## Decisión
**Conservar el gateway y el inspector como prototipos sintéticos útiles.** No introducir un tercer framework ni relajar el gate por más suites verdes. Siguiente intervención: obtener ventana administrativa explícita y montar dos identidades separadas, con servicio controlador y proveedor acotado. Elige integración minimalista antes de optimización cosmética.
