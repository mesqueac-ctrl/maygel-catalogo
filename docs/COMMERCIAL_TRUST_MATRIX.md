# Maygel — Matriz de verdad comercial

> Fuente única de verdad para todo copy comercial (homepage, PDP, footer,
> WhatsApp, admin). Ningún texto nuevo puede afirmar algo que contradiga esta
> tabla. Auditado en Fase 7 contra el código real (no contra intención o
> memoria de fases anteriores) — cada fila cita el archivo donde vive la
> afirmación hoy. Actualizado en Fase 8.2 con la primera información
> comercial real confirmada por el negocio (precio retail, colores, canal
> mayorista) y con la nueva arquitectura de descuentos.

## Cómo leer esta tabla

- **Se puede publicar**: sí / no — si hoy ya se puede mostrar tal cual, o si
  necesita confirmación del negocio primero.
- **Falta confirmar**: vacío si la fila está resuelta; si no, qué pregunta
  exacta necesita respuesta (ver también `BUSINESS_INPUTS.md`).

| Tema | Información confirmada | Fuente actual | Se publica | Falta confirmar |
|---|---|---|---|---|
| Fabricación bajo pedido | Cada sandalia se fabrica después de confirmarse el pedido, no hay inventario previo | `[slug].astro` (copy + `availability` omitido a propósito), `ComoComprar.astro`, `whatsapp.ts` | Sí | — |
| Ciudades de entrega directa | Soledad y Barranquilla | `ComoComprar.astro`, `[slug].astro`, `Layout.astro` (`areaServed`) | Sí | — |
| Envíos fuera de esas ciudades | Solo para pedidos al por mayor ("envíos nacionales para pedidos al por mayor") — **no** para pedidos individuales fuera de Soledad/Barranquilla | `ComoComprar.astro`, `[slug].astro` | Sí (tal como está escrito hoy) | Confirmar si de verdad no hay ningún envío individual fuera de esas 2 ciudades, o si existe pero no se comunica |
| Medios de pago | Contraentrega local, Nequi, Daviplata, transferencia bancaria | `ComoComprar.astro` | Sí | — |
| Logos de pago | No se muestran logos de Visa/Mastercard/PSE/Nequi/Daviplata — solo texto | Todo el código público | Sí (correcto: sin logos no confirmados) | — |
| Cambio de talla | Se hace el cambio si la talla no queda bien; el domicilio del cambio corre por cuenta de la clienta | `ComoComprar.astro`, `[slug].astro` | Sí | Plazo máximo para pedir el cambio (¿días? ¿sin límite?); si aplica solo a la primera unidad o también a reemplazos posteriores |
| Devolución (dinero de vuelta, no cambio de talla) | No existe ninguna afirmación en el código — nunca se prometió | — | No existe hoy, no se inventa | ¿Existe alguna política de devolución de dinero, o Maygel solo ofrece cambio de talla? |
| Garantía por defecto de fabricación | No existe ninguna afirmación en el código | — | No existe hoy, no se inventa | ¿Qué pasa si una sandalia llega con un defecto de fabricación real? |
| Materiales | **No confirmados técnicamente (actualizado — información real del negocio, no fixture).** No publicar "cuero", "cuero genuino", "sintético", "caucho" ni "materiales premium" hasta que el negocio los confirme por modelo | `db/seed.ts` (fixtures, con materiales de ejemplo — nunca catálogo real), `ProductoForm.astro` (campo descripción, arquitectura ya soportada) | No, hasta confirmación real por modelo | Ver `REAL_CATALOG_INPUT.md` § plantilla de materiales y `OWNER_INTERVIEW.md`/`OWNER_INTERVIEW_QUICK.md` bloque de materiales |
| Colores disponibles | **Confirmado por el negocio:** Negro, Blanco, Miel, Beige, Café, Plateado — lista cerrada validada en código | `productos.ts` (`COLORES_VALIDOS`/`COLORES_METADATA`) | Sí | Si el negocio amplía la paleta de nuevo, requiere otro cambio de código (lista controlada a propósito) |
| Tallas disponibles | Lista libre por producto (texto, sin validación de rango) — **el negocio confirmó que fabrica varias tallas, pero sin rango formal ni medidas en cm todavía** | `db/config.ts`, `ProductoForm.astro` | Sí (el campo libre), pero **no publicar un rango genérico inventado** ("tallas 35-42") mientras no exista uno confirmado | Ver `SIZE_GUIDE_REQUIREMENTS.md` — rango exacto y medidas |
| Guía de tallas (equivalencias/medidas) | No existe — la PDP lo dice explícitamente y ofrece WhatsApp | `[slug].astro` | Sí (honesto tal como está) | Ver `SIZE_GUIDE_REQUIREMENTS.md` — todos los datos para construirla |
| Precio retail base | **Confirmado por el negocio: $60.000 COP por par**, para cuando se cargue el catálogo real — no se aplicó retroactivamente a los fixtures de `db/seed.ts` (siguen siendo datos de ejemplo, documentados como tales) | `db/seed.ts` (fixtures, sin cambiar), este documento | Sí, se aplicará a los productos reales al cargarlos | — |
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
| Políticas legales (privacidad, términos) | No existen | — | No existen, correcto por ahora (ver § 20 de la auditoría) | Si el negocio necesita publicarlas antes de escalar (ver `BUSINESS_INPUTS.md`) |
