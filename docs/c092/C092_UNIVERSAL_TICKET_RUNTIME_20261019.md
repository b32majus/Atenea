# C-092 — Ejecución de tickets habituales (evolución experimental)

**19–20 de octubre de 2026 · Rama aislada.** Continúa vigente C-087 en los productos. Esta evolución no autoriza integrar o desplegar código. La batería original B1–B5 y C-091 no se han repetido ni alterado.

## Cambio efectivo

1. **Preparación determinista:** `tools/c092/compile-ticket.mjs` transforma un ticket JSON aprobado y **repo-local** en `run-config.json`: comprobación BASE==HEAD, Git limpio, digest exacto del Markdown de autoridad, allow/doNotTouch, consumidores declarados, ejes, testigos y binding por perfil. No llama a modelos ni inventa requisitos. `consumerSymbols: []` es posible, con estado explícito `G03_NOT_EVALUATED` (no afirma cobertura).
2. **Testigos nativos sin shell:** `m3-native-witness.mjs` admite comandos preaprobados de Node, Vitest, pnpm/npm, tsc, Playwright, Python/pytest/uv, Go, Cargo, shell **solo con script .sh aprobado**, y otros ejecutables habituales de desarrollo. Sigue vigente el adaptador histórico de `.mjs` sin cambio. No se aceptan `-e`, `-c` ni comandos de shell interpolados. Cada testigo corre en **checkout Git detached de SHA exacto**, con timeout, resultado, hash de stdout/stderr y verificación de código versionado inmutable. Los resultados no versionados de tests se eliminan al retirar el checkout. PNG declarados se extraen al directorio externo de evidencias con hash y dimensiones.
3. **Dependencias declaradas:** `witnessRuntime.dependencyPaths: ["node_modules"]` o `[".venv"]` reutiliza explícitamente dependencias ya instaladas del proyecto mediante vínculo en el checkout temporal. Los lockfiles del SHA y del worktree origen deben coincidir. Se recomienda ejecutar binarios nativos `vitest`, `tsc`, etc., en vez de invocar gestores de paquetes que intenten reinstalar dependencias. **No es un sandbox OS** ni se garantiza aislamiento de las dependencias compartidas; uso trusted-local personal exclusivamente.
4. **Visual:** `VISUAL` deja de provocar STOP incondicional. Para `quality|fidelity` se exige al menos una referencia de autoridad repo-local con SHA256, pantalla/estado/viewport declarados, testigo PNG realizado en checkout real, hash y dimensiones de la captura, y `visualMediaAuthorized:true` como autorización de envío al proveedor. Se adjuntan **ambos archivos reales** al prompt del revisor OpenCode V2. Los recibos, archivos y su digesto quedan ligados al SHA; M4 detecta una captura manipulada después de revisar. Los dictámenes visuales siguen siendo independientes de Standards/Spec y no sustituyen el checkpoint humano de producto.
5. **Perfiles existentes sin coordinador LLM:** `m3-profile.mjs` selecciona por `costPolicy=standard|free_only|go` y `riskClass=volume|complex`, sin fallback. Cada sesión OpenCode V2 se crea con un `Model.Ref` explícito: writer, Standards, Spec, corrector y Visual si procede; se coteja después con la identidad real del modelo. `#high` solicitado no se declara atestiguado si el host no registra la variante. La ruta Free usa **MiniMax M3.1 Flash Free** en writer Volume y Spec Complex, conserva los demás modelos Free aprobados. `go+VISUAL` continúa sin binding autorizado en C-087: `PROFILE_VISUAL_MODEL_UNAVAILABLE`, sin escalar a pago.

## Ejemplo de preparación (campos ilustrativos, NO un ticket real)

La Cora del producto fija decisiones de alcance, riesgo, costes, testigos y visuales. No necesita escribir un manifest manual:

```json
{
  "schema": "atenea.c092.ticket/v1",
  "repo": "/srv/proyecto/worktrees/ticket-real",
  "baseSha": "<SHA40_CONFIRMADO>",
  "unitId": "ticket-real-01",
  "authorityPath": "docs/handoffs/ticket-real.md",
  "allowPaths": ["src/App.tsx", "src/shell/account-workspace.tsx"],
  "doNotTouch": ["docs/design", "src/client/auth-session.ts"],
  "consumerSymbols": ["App", "AuthenticatedShell"],
  "uiImpact": "fidelity",
  "maxCorrections": 2,
  "riskClass": "volume",
  "costPolicy": "free_only",
  "witnesses": [
    {
      "kind": "native",
      "id": "REACT",
      "argv": ["vitest", "run", "src/App.shell.test.tsx"],
      "timeoutMs": 90000
    },
    {
      "kind": "native",
      "id": "SCREEN",
      "argv": ["node", "tools/browser-fixtures/capture-screen.mjs"],
      "timeoutMs": 90000,
      "artifactPaths": ["artifacts/account.png"]
    }
  ],
  "witnessRuntime": {"dependencyPaths": ["node_modules"]},
  "visualRefs": [
    {
      "id": "ACCOUNT",
      "referencePath": "docs/design/approved-account.png",
      "referenceSha256": "<SHA256_REAL_APROBADO>",
      "artifactWitnessId": "SCREEN",
      "artifactPath": "artifacts/account.png",
      "viewport": {"width": 1440, "height": 900},
      "state": "authenticated"
    }
  ],
  "visualMediaAuthorized": true,
  "storeDir": "/srv/kairos-lab/qualification/ticket-real/store",
  "evidenceDir": "/srv/kairos-lab/qualification/ticket-real/evidence"
}
```

El compilador exige que los archivos y SHA aportados **existan y coincidan**; no resuelve placeholders ni decide por el usuario qué modelos se pueden usar con datos privados. Para `uiImpact:none`, omitir `visualRefs` y `visualMediaAuthorized`.

```bash
node tools/c092/compile-ticket.mjs /ruta/approved-ticket.json /ruta-externa/run-config.json
node tools/c092/run-ticket.mjs /ruta-externa/run-config.json http://127.0.0.1:<puerto>/
```

El servidor OpenCode V2 debe existir y estar autorizado para los modelos declarados. Todos los modelos quedan fijados por sesión mediante la API V2; se conserva la verificación del host y el STOP ante mismatch/ambigüedad. **No usar** el driver temporal de Battery 1.

## Pruebas reales y criterios

- **Prueba real no destructiva de toolchain:** sobre checkout del producto PROMueve Sure `cc66ea63287628a67581a8e487f3edc37498e72b`, `vitest run src/App.shell.test.tsx`: 16/16 PASS, duración del testigo ≈9,8 s, sin mutación del checkout principal ni del código versionado. Evidencia: `/srv/kairos-lab/qualification/atenea-c092-native-direct-20261019`. Una prueba previa con `pnpm exec` terminó con exit 0 y 16/16, pero también un intento fallido de instalación de dependencias: por eso se prefiere el binario de tests directo y se detecta esa firma de fallo del gestor.
- Las pruebas del motor verifican: pericia básica de Node nativo, preparación, perfiles Free/Go/Standard, binding de modelo, captura PNG y hash, transporte de `files` al host simulado, STOP si faltan imágenes/permiso, auditoría que detecta manipulación de captura, preservación de los antiguos contratos anti-writer doble, límites de corrección y ledgers.
- **Pendiente antes de declararlo candidato para sustitución de C-087:** un Train integrado **real** de C-092 con OpenCode V2 (confirmación del binding por rol y de la entrega multimodal real de PNG al modelo), más evaluación humana de la interfaz y del producto. Los tests offline y la aceptación Vitest no demuestran que un modelo haya visto realmente los píxeles en una sesión de producción.
- Esta evolución es universal respecto al tipo habitual de ticket (no impone `docs/metis/`, JS exclusivo ni `uiImpact:none`), pero no promete soporte automático para cada ejecutable de terceros, cada política de datos ni todas las modalidades de coste. Las reglas de aceptación y publicación siguen siendo del proyecto.

**Límite de permisos:** nada en este documento aprueba trabajar con datos reales de pacientes, escribir a bases de datos clínicas, hacer push/PR/merge o desplegar. Los proyectos continúan con C-087 hasta autorización específica.
