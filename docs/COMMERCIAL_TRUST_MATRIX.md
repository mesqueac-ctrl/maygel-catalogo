# Maygel — Matriz de verdad comercial

> Fuente única de verdad para todo copy comercial (homepage, PDP, footer,
> WhatsApp, admin). Ningún texto nuevo puede afirmar algo que contradiga esta
> tabla. Auditado en Fase 7 contra el código real (no contra intención o
> memoria de fases anteriores) — cada fila cita el archivo donde vive la
> afirmación hoy. Actualizado en Fase 8.2 con la primera información
> comercial real confirmada por el negocio (precio retail, colores, canal
> mayorista) y con la nueva arquitectura de descuentos. Actualizado en
> Fase 8.3 con información real de envíos por ciudad, medios de pago
> reconfirmados y la política real de cambios — y con la nueva capa de
> ayuda visible en el sitio público. Actualizado en Fase 8.4 con la
> confirmación de suela de goma y la fabricación de talla flexible según
> pedido (sin rango fijo publicable) — material superior sigue sin
> confirmar.

## Cómo leer esta tabla

- **Se puede publicar**: sí / no — si hoy ya se puede mostrar tal cual, o si
  necesita confirmación del negocio primero.
- **Falta confirmar**: vacío si la fila está resuelta; si no, qué pregunta
  exacta necesita respuesta (ver también `BUSINESS_INPUTS.md`).

| Tema | Información confirmada | Fuente actual | Se publica | Falta confirmar |
|---|---|---|---|---|
| Fabricación bajo pedido | Cada sandalia se fabrica después de confirmarse el pedido, no hay inventario previo | `[slug].astro` (copy + `availability` omitido a propósito), `ComoComprar.astro`, `whatsapp.ts` | Sí | — |
| Ciudades de entrega — detalle real por ciudad (Fase 8.3) | **Soledad:** contraentrega disponible. **Barranquilla:** domicilio pagado por la clienta, normalmente entre $10.000 y $15.000 COP (no se confirmó contraentrega ahí — no se afirma). **Cartagena:** solo se atienden pedidos al por mayor, no retail individual | `ComoComprar.astro`, `[slug].astro`, `ayuda.astro` (nuevo), `Layout.astro` (`areaServed`) | Sí | Costo exacto (¿siempre en ese rango o varía?); si Barranquilla también tiene contraentrega o solo pago anticipado |
| Envíos fuera de Soledad/Barranquilla/Cartagena | Sin confirmar cobertura nacional para pedidos individuales — solo mayoristas tienen envíos nacionales confirmados | `ComoComprar.astro`, `[slug].astro`, `ayuda.astro` | No se afirma envío nacional individual | Si existe algún caso real de envío individual fuera de esas 3 ciudades |
| Medios de pago (reconfirmados en Fase 8.3 — reemplaza la lista anterior) | **Nequi, Bancolombia, Llave, efectivo, contraentrega** (Daviplata y "transferencia bancaria" genérica ya no se afirman — reemplazados por esta lista más precisa) | `ComoComprar.astro`, `ayuda.astro` | Sí | — |
| Logos de pago | No se muestran logos de bancos/apps — solo texto | Todo el código público | Sí (correcto: sin logos decorativos) | — |
| Cambios — motivos confirmados (Fase 8.3) | **Se aceptan cambios por: talla, pequeños detalles, defectos.** El domicilio/envío del cambio se cobra nuevamente (regla confirmada, reemplaza la redacción anterior "el domicilio corre por cuenta de la clienta" — ahora explícito: se cobra de nuevo, no es gratis ni una sola vez) | `ComoComprar.astro`, `[slug].astro`, `ayuda.astro`, `terminos.astro` (nuevos) | Sí | Plazo máximo en días para pedir el cambio — sigue sin confirmar |
| Devolución (dinero de vuelta, no cambio de talla) | No existe ninguna afirmación en el código — nunca se prometió | — | No existe hoy, no se inventa | ¿Existe alguna política de devolución de dinero, o Maygel solo ofrece cambio? |
| Garantía formal por defecto (más allá del cambio ya confirmado) | El cambio por defecto ya está confirmado (ver fila de arriba) — lo que no está confirmado es una garantía más amplia (plazo largo, reparación, reposición total) | — | Solo el cambio por defecto, no una garantía extendida | Alcance de garantía más allá del cambio inmediato |
| Suela | **Confirmado por el negocio (Fase 8.4): goma.** Es el único material confirmado hasta ahora — se puede publicar como "Suela de goma", igual para todos los modelos | `[slug].astro` (línea fija junto al tag de fabricación) | Sí | — |
| Material superior | **Sigue sin confirmar.** No publicar "cuero", "cuerina", "sintético", "piel", "PVC" ni ningún otro material superior hasta que el negocio lo confirme por modelo | `db/seed.ts` (fixtures, con materiales de ejemplo — nunca catálogo real), `ProductoForm.astro` (campo descripción, arquitectura ya soportada) | No, hasta confirmación real por modelo | Ver `REAL_CATALOG_INPUT.md` § plantilla y `OWNER_INTERVIEW.md`/`OWNER_INTERVIEW_QUICK.md` bloque de materiales |
| Colores disponibles | **Reconfirmado por el negocio (Fase 8.4), sin cambios respecto a Fase 8.2:** Negro, Blanco, Miel, Beige, Café, Plateado — lista cerrada validada en código | `productos.ts` (`COLORES_VALIDOS`/`COLORES_METADATA`) | Sí | Si el negocio amplía la paleta de nuevo, requiere otro cambio de código (lista controlada a propósito) |
| Tallas — fabricación flexible (Fase 8.4, reemplaza la fila anterior) | **Confirmado: la fabricación es flexible según pedido — no existe un rango fijo que publicar, y no se debe inventar uno** ("35-40" sería falso). Copy aprobado: "Talla según pedido" / "Consulta tu talla por WhatsApp". No prometer "cualquier talla" como garantía absoluta — es "según lo que se pueda fabricar", no ilimitado | `[slug].astro` (modo flexible: campo de texto libre en vez de botones de una lista fija), `ProductoForm.astro` | Sí, con el copy exacto de arriba | Si en el futuro un modelo específico sí tiene un rango fijo real, se puede seguir usando el modo de botones ya existente (la arquitectura soporta ambos casos según lo que escriba la admin) |
| Guía de tallas (equivalencias/medidas) | No existe — la PDP lo dice explícitamente y ofrece WhatsApp | `[slug].astro` | Sí (honesto tal como está) | Ver `SIZE_GUIDE_REQUIREMENTS.md` — todos los datos para construirla |
| Precio retail base | **Reconfirmado por el negocio (Fase 8.4): $60.000 COP por par**, para cuando se cargue el catálogo real — no se aplicó retroactivamente a los fixtures de `db/seed.ts` (siguen siendo datos de ejemplo, documentados como tales) | `db/seed.ts` (fixtures, sin cambiar), este documento | Sí, se aplicará a los productos reales al cargarlos | — |
| Descuento por producto (`precioOferta`) | Arquitectura soportada desde esta fase (campo opcional, nunca mayor o igual al precio normal) — **no existe ningún descuento concreto confirmado todavía**, no inventar uno para probar la función | `db/config.ts`, `productos.ts` (`precioEfectivo()`), `admin/api/guardar.ts` | La función sí (código), pero ningún descuento real hasta que el negocio confirme uno | Montos/porcentajes de descuentos reales, si el negocio decide aplicar alguno |
| Precio efectivo mostrado y usado en WhatsApp/JSON-LD | Siempre `producto.precioOferta ?? producto.precio`, calculado por una única función (`precioEfectivo()`), nunca duplicado a mano por componente | `productos.ts` | Sí | — |
| WhatsApp — número | `+57 324 351 3189` | `consts.ts` | Sí | — |
| WhatsApp — mensaje de producto | Incluye nombre, color, talla, **precio efectivo** (con descuento si aplica) y URL | `whatsapp.ts`, `[slug].astro` | Sí | — |
| Historia de marca ("nació en la mesa de nuestra casa...") | **Provisional, marcada `TODO`** — no es la historia real confirmada | `About.astro` | No (ya marcado como no-final) | Ver preguntas en `BRAND_STORY_INPUT.md`/`OWNER_INTERVIEW.md` |
| Mayoristas — canal de contacto | **Confirmado por el negocio: los interesados deben escribir por WhatsApp** — no existe todavía ningún canal ni proceso distinto | `VentaMayor.astro`, `consts.ts` | Sí | — |
| Mayoristas — condiciones/mínimos/descuentos/escalas de precio | No existen cifras en el código — todo se resuelve por WhatsApp a propósito, **confirmado explícitamente que aún no se deben publicar** | `VentaMayor.astro`, `consts.ts` | No, hasta confirmación real | Mínimo de pedido, escalas de descuento, tiempos de producción de lotes — ver `BUSINESS_INPUTS.md` § mayoristas |
| Horario de atención | No existe ninguna afirmación — se retiró un bloque ficticio en una fase anterior (`CONTEXTO-PROYECTO.md` § 11) | — | No existe, correcto | Si el negocio quiere publicar un horario real |
| Dirección física | No se publica ninguna | — | No existe, correcto (decisión ya tomada, no se publica salvo que el negocio lo pida explícitamente) | — |
| Instagram | `@maygelcr`, enlace real en footer | `consts.ts`, `ContactFooter.astro` | Sí | — |
| Producto no disponible (copy) | "Este modelo ya no está disponible. Escríbenos por WhatsApp..." | `[slug].astro` | Sí | — |
| Catálogo vacío (copy) | Corregido en esta fase — antes implicaba una "próxima colección" sin plan confirmado; ahora dice solo que no hay modelos publicados | `ProductGrid.astro` | Sí (tras el fix de esta fase) | — |
| Ayuda visible en el sitio (Fase 8.3) | **Decisión de experiencia confirmada:** debe existir una opción de ayuda muy visible, pensada para personas mayores o con poca familiaridad digital, con salida fácil a WhatsApp | `ayuda.astro`, bloques en homepage/PDP/footer (nuevos) | Sí | — |
| Términos y condiciones | Página nueva con solo lo confirmado (fabricación bajo pedido, contacto, pagos, envíos por ciudad, cambios) — **no es asesoría jurídica ni una política legal completa** | `terminos.astro` (nuevo) | Sí, en su alcance básico | Elementos legales más formales (si hacen falta) quedan pendientes de revisión legal futura |
