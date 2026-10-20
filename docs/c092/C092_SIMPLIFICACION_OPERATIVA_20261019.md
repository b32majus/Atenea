# C-092 — Simplificación operativa para un Atenea útil
**Fecha:** 19-10-2026 · Decisión de producto: cancelar sobreingeniería de M4-B.

## Cambio de dirección aprobado
Atenea C-092 debe trabajar **en una carpeta Git normal** con OpenCode tal como está instalado y utilizado. No se crearán cuentas OS nuevas, gateway de modelos, Docker, servicios systemd ni políticas de red. La usuaria ha indicado expresamente que no desea ese proyecto de infraestructura.

**Arquitectura de uso:** una unidad aprobada (WO), preflight determinista y HEAD limpio → OpenCode Build único → commit acotado → tests → Standards y Spec frescos sobre SHA → a lo sumo dos correcciones concretas con test y re-review → READY_FOR_HUMAN o STOP. Integración y despliegue solo con decisión humana. Para UI: revisión visual humana, no PASS automático sobre una imagen inexistente.

## Qué conservar
- Manifest mínimo y revisión de consumidores declarados.
- Reserva anti-writer doble y control de Git parent/allowlist.
- Evidencias vinculadas a SHA.
- Testigos Node/OpenCode, Standards/Spec independientes.
- STOP si el modelo no devuelve prueba, resultado o identidad de sesión comprobable.
- Auditoría ligera y métricas de sesiones/tokens. Sin barreras nuevas.

## Qué deja de ser requisito
- Dos identidades OS `atenea-controller`/`atenea-worker`.
- Landlock, seccomp, contenedores, proxies/gateways de credenciales.
- Instalación de daemon/control service y firewall.
- Certificación hostil/multi-tenant: el entorno es **desarrollo personal de confianza** sobre un VPS bajo control de la usuaria, como C-087, no una plataforma pública que procese código de terceros desconocidos.

Los artefactos M4-B se conservan en Git como investigación opcional, **fuera del camino habitual y sin añadir dependencias**. No eliminar retroactivamente sus pruebas/hallazgos. El rechazo de un comportamiento claramente ambiguo, el aislamiento normal de directorios Git y la revisión humana siguen vigentes.

## Prueba de cierre y calidad
1. Suite automatizada M1–M4, sin nuevas fases.
2. **Una prueba real integrada de punta a punta**, desde HEAD base sin estados sembrados, en directorio normal de fixture, con Build, tests, Standards y Spec sobre un solo SHA. Corrección solo si aparecen defectos reales; nada de inyectar falsos findings para fabricar una ruta positiva.
3. Registrar SHA y resultado, disponibilidad de host, sesiones, tokens y estado terminal.
4. Comparar resultado con flujo previo; no declarar READY si los testigos o dictámenes no acreditan PASS.
5. Si es positivo: **READY_FOR_SMALL_REAL_PILOT** (riesgo bajo, checkout de trabajo, PR/merge manual, con autorización de proyecto). Esto no significa despliegue desatendido ni atención a terceros.
6. Si falla: ajustar exclusivamente el componente y caso que falla, una sola corrección acotada, sin reabrir otro protocolo.

## Lo que NO estamos haciendo
- No ejecutar implementación de producto real ni tocar bases de datos clínicas en esta prueba.
- No promover C-092 sobre C-087 sin piloto real exitoso.
- No desplegar servicios ni alterar C-090 congelado.
- No convertir un árbol de pruebas sintéticas en requisito empresarial de infraestructura.

**El siguiente trabajo con valor son Trains reales de alcance acotado, no más escenarios de seguridad artificial.**
