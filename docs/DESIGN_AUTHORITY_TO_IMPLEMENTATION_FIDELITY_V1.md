# Autoridad de diseño aprobada → implementación verificable · V1

**Fecha:** 2026-10-14. **Estado:** práctica de trabajo aceptada por la responsable humana; esta propuesta documental **no modifica C-087, perfiles, routing, revisores ni permisos de publicación**. Adoptar en cada repositorio solo tras incorporar sus referencias locales. **Ámbito:** trabajos materiales de UI/UX; no imponer ceremonial a tickets técnicos o cambios visuales triviales.

## 1. Problema y regla principal

Una conversación o un HTML aprobado que un implementador no recibe como autoridad **no protege la experiencia aprobada**. Un código que pasa lint, Standards, Spec, tests funcionales y CI puede seguir componiendo una interfaz diferente del diseño aceptado.

**La cadena obligatoria para cambios materiales de interfaz es:**

\`\`\`
decisión humana explícita
→ artefacto aprobado, versionado, referenciable e inmutable
→ contrato acotado de pantalla/interacción
→ handoff del ticket con paths + versión/commit + criterios observables
→ implementación que reutiliza el sistema de diseño
→ testigos visuales comparables + revisión de composición
→ aceptación humana y registro de discrepancias
\`\`\`

Responsabilidades: **Cora + humana** deciden producto, jerarquía y distribución. El **repositorio de cada producto** conserva la referencia ejecutiva. El **coordinador Atenea** entrega las referencias exactas a sus implementadores y a la única revisión canónica del candidato. El **implementador** ejecuta el contrato sin rediseñar. **Standards/Spec/CI** prueban su alcance específico, pero no equivalen por sí solos a aprobación visual. La **humana** acepta desviaciones materiales y publica cuando corresponde.

## 2. Única fuente de verdad y procedencia

- El repositorio de producto y su rama canónica contienen los originales aprobados, las decisiones y sus vínculos con tickets/evidencias. El VPS es checkout de trabajo, no una segunda autoridad paralela. El chat no sustituye a Git.
- Conservar el **archivo maestro exacto** (HTML/CSS/JS, en el formato realmente aprobado), una referencia a commit y, cuando ayude, SHA-256 y capturas con tamaño/fecha. **No duplicar el maestro** en otras carpetas con variaciones silenciosas.
- Junto al original, mantener un **registro vigente de aprobación**: fecha, quién acepta, qué pantallas/estados quedan congelados, qué NO aprueba, versión posterior que prevalece y contradicciones/supersesiones explícitas. Documentos originales que aún digan «borrador» pueden quedar como procedencia histórica; el registro posterior decide su estatus sin reescribirlos.
- El prototipo **no es código de producción ni autoridad de dominio**. Comportamientos de muestra, datos sintéticos, navegación del prototipo y estado simulado nunca conceden permiso de persistencia, red, IA, exportación o acciones sensibles.
- No convertir cada chat en un nuevo archivo: integrar nuevas decisiones en el contrato/registro existente; abrir un documento nuevo solo si no existe ubicación razonable.

## 3. Cuatro capas que no deben confundirse

| Capa | Contenido | Qué se reutiliza / qué se comprueba |
| --- | --- | --- |
| **Identidad + tokens** | marca, color, tipografía, escalas, radios, espaciado, sombras, estados | variables de referencia → tokens de producción con contrastes/accesibilidad verificados |
| **Componentes** | botones, campos, selectores, disclosures, listas, filas, alertas, paneles, inspectores | variantes y estados conocidos; reutilizar componentes existentes antes de crear nuevos |
| **Composición** | primera pantalla útil, distribución, proporciones, área primaria, jerarquía, densidad, contexto simultáneo y responsive | comparación renderizada con el maestro y cambios explícitamente aprobados |
| **Interacción + semántica** | estados, foco, selección, navegación, acciones primarias/secundarias, error/espera, permisos | contrato funcional real del producto; nunca inferir seguridad desde una demo |

**Una coincidencia de tokens/componentes NO demuestra coincidencia de composición.** Tampoco «tres columnas» basta si se cambia cuál domina, dónde están los hallazgos o cuánto texto cabe.

La extracción de un HTML aprobado a tokens/React/CSS es **trabajo de implementación derivado**, no autorización para reinterpretar la pantalla ni copia de JS demostrativo. Mapear componentes y propiedades al inventario real antes de implementar. Cuando una limitación de dominio/responsive/accesibilidad impide una traducción literal, elevar una **adaptación material** a Cora + humana, indicando alternativa exacta y consecuencias; no cambiar el maestro congelado.

## 4. Unidad mínima de handoff de UI

Para una pantalla/cambio material, un ticket entregará —por referencia, no pegando el corpus—:

1. **Fuente visual:** ruta del maestro y versión/commit/SHA; preview o estado concreto; anchuras comparables.
2. **Fuente funcional:** contrato de producto, invariantes de privacidad, estados reales y decisiones superiores que hacen falta.
3. **Resultado observable:** zona principal, orden/ubicación, controles presentes, primer viewport, respuesta al cambio de estado, responsive; acciones que deben ser inmediatas y las que son deliberadamente secundarias.
4. **Reutilización técnica:** tokens y componentes existentes; superficies afectadas/consumidores directos; no-go de reestructuración adicional.
5. **Delta autorizado:** diferencias exactas respecto a la maqueta por función, accesibilidad o evidencia, con aprobador y motivo; **sin delta registrado, no se inventa una composición distinta**.
6. **Testigos de aceptación:** capturas reproducibles de maqueta y aplicación con **mismo viewport, mismo estado y contenido sintético comparable**, más recorrido humano corto (abrir → orientarse → actuar → corregir → completar); registrar PASS, divergencia o evidencia insuficiente.
7. **STOP y publicación:** ningún merge o cierre visual por lint, tokens correctos o tests automáticos solamente; checkpoint humano material y autoridad explícita de publicación.

No imponer ratios pixel-perfect universales ni nuevos screenshots a cambios mínimos. Para composición material, la **comparación visual es requisito de aceptación**; medidas y oráculos se eligen según riesgo y superficie.

## 5. Registro de fidelidad y cambios

Mantener junto al maestro una matriz pequeña, viva y verificable:

| Superficie/estado | Ref. aprobada | Criterio de composición | Implementación candidata | Evidencia comparable | Estado / delta |
| --- | --- | --- | --- | --- | --- |
| Ejemplo | ruta+SHA | información primaria y acción visibles | commit+path | capturas 1440/375 + recorrido | \`MATCH\` / \`ADAPT_APPROVED\` / \`DRIFT_OPEN\` / \`NOT_CHECKED\` |

- \`MATCH\`: evidencia suficiente para la composición evaluada, no garantía universal.
- \`ADAPT_APPROVED\`: excepción autorizada, evidencia y razón registradas.
- \`DRIFT_OPEN\`: diferencia detectada y pendiente; no maquillar como \`MATCH\`.
- \`NOT_CHECKED\`: sin contraste; nunca equivale a PASS.
- Separar **observación humana de captura** de **defecto reproducido en código**; no inventar causa ni fix.
- Registrar nuevos acuerdos posteriores **como nuevas decisiones fechadas**, no reinterpretar retroactivamente qué decía el mockup antiguo.

## 6. Prioridad funcional y seguridad

- Es legítimo probar primero la funcionalidad con datos ficticios/sintéticos y diferir la reorganización estética. Conservar mientras tanto la deuda visual y su autoridad de diseño.
- **No diferir** una fricción de interfaz que impida comprender, verificar o usar una capacidad con seguridad: eso ya es funcional.
- No permitir datos clínicos reales ni automatización sensible por el simple hecho de que el prototipo se vea terminado. Prevalecen los gates de privacidad, dominio y publicación de cada proyecto.
- El sistema no solicita reviews añadidas por ritual; **los testigos visuales son una dimensión del checkpoint de producto ya existente**, especialmente cuando una pantalla material cambia.

## 7. Entrada ligera para agentes

**Preparación Cora:** comprobar que el mockup aprobado y registro están en el repo, entregar una ruta/commit exactos y criterios de fidelidad en el handoff. **Ejecución Atenea:** consumir ese handoff; si falta, \`INCOMPLETE_AUTHORITY\` o \`HUMAN STOP\`, nunca extrapolar desde el chat. **Review:** comprobar el alcance técnico y reportar desvíos observables conocidos; **Cora + humana:** comparar el resultado compuesto con el maestro y aceptar/rechazar las adaptaciones. 

**Compatibilidad:** complemento documental de \`HUMAN_PRODUCT_DESIGN_AUTHORITY_V1.md\`, \`PRODUCT_FIDELITY_GATES_V1.md\` y \`CHILD_AUTHORITY_CAPSULE_V1.md\`; **no sustituye** sus límites ni crea roles, rondas de revisión o Trains estratégicos.

## 8. Caso que motivó esta regla

Laboratorio Sophilux B V1: existía el HTML aprobado, las capturas, el contrato de aprobación y la reconciliación funcional; la implementación adoptó identidad/tokens, pero la composición observable de Entrada y Revisión presenta diferencias materiales referidas por la usuaria. Esto **no demuestra pérdida del archivo**, sino un fallo de transporte/consumo o de aceptación de la autoridad de composición; la causa organizativa exacta exige evidencia de handoffs y comparaciones, no suposición. El producto seguirá su verificación funcional #92 antes de rediseñar; las divergencias visuales quedan como deuda separada.

PROMueve Sure: ya existe \`docs/design/UX_APPROVED_IMPLEMENTATION_TRACEABILITY_V1_20261014.md\` con freezes y HTML integrales. Reutilizar ese índice; no generar otra autoridad paralela ni presuponer código conforme a los prototipos.
