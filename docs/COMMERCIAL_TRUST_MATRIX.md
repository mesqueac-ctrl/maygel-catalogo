# Maygel — Matriz de verdad comercial

> Fuente única de verdad para todo copy comercial (homepage, PDP, footer,
> WhatsApp, admin). Ningún texto nuevo puede afirmar algo que contradiga esta
> tabla. Auditado en Fase 7 contra el código real (no contra intención o
> memoria de fases anteriores) — cada fila cita el archivo donde vive la
> afirmación hoy.

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
| Materiales | Descripción libre por producto (`producto.descripcion`, ej. "cuero natural, suela de caucho antideslizante") — **dato por producto, ya soportado**, no una afirmación genérica de marca | `db/seed.ts` (fixtures), `ProductoForm.astro` (campo descripción) | Sí, siempre que la admin escriba el material real de cada producto — los 3 productos actuales son fixtures con materiales de ejemplo, no catálogo real | Materiales reales de cada producto del catálogo real, cuando se cargue |
| Colores disponibles | Negro, Blanco, Miel, Beige — lista cerrada validada en código | `productos.ts` (`COLORES_VALIDOS`) | Sí | Si el negocio amplía la paleta, requiere cambio de código (lista controlada a propósito) |
| Tallas disponibles | Lista libre por producto (texto, sin validación de rango) | `db/config.ts`, `ProductoForm.astro` | Sí | — |
| Guía de tallas (equivalencias/medidas) | No existe — la PDP lo dice explícitamente y ofrece WhatsApp | `[slug].astro` | Sí (honesto tal como está) | Ver `SIZE_GUIDE_REQUIREMENTS.md` — todos los datos para construirla |
| Precio | Siempre el campo real de la base de datos, formateado en COP | `productos.ts` (`formatearPrecio`) | Sí | — |
| WhatsApp — número | `+57 324 351 3189` | `consts.ts` | Sí | — |
| WhatsApp — mensaje de producto | Ahora incluye nombre, color, talla, **precio** (corregido en esta fase) y URL | `whatsapp.ts`, `[slug].astro` | Sí | — |
| Historia de marca ("nació en la mesa de nuestra casa...") | **Provisional, marcada `TODO`** — no es la historia real confirmada | `About.astro` | No (ya marcado como no-final) | Ver preguntas en `BUSINESS_INPUTS.md` § historia |
| Mayoristas — condiciones/mínimos/descuentos | No existen cifras en el código — todo se resuelve por WhatsApp a propósito | `VentaMayor.astro`, `consts.ts` | Sí (correcto: sin inventar cifras) | Mínimos de pedido, descuentos por volumen, tiempos — si el negocio quiere publicarlos alguna vez en vez de resolverlos 100% por WhatsApp |
| Horario de atención | No existe ninguna afirmación — se retiró un bloque ficticio en una fase anterior (`CONTEXTO-PROYECTO.md` § 11) | — | No existe, correcto | Si el negocio quiere publicar un horario real |
| Dirección física | No se publica ninguna | — | No existe, correcto (decisión ya tomada, no se publica salvo que el negocio lo pida explícitamente) | — |
| Instagram | `@maygelcr`, enlace real en footer | `consts.ts`, `ContactFooter.astro` | Sí | — |
| Producto no disponible (copy) | "Este modelo ya no está disponible. Escríbenos por WhatsApp..." | `[slug].astro` | Sí | — |
| Catálogo vacío (copy) | Corregido en esta fase — antes implicaba una "próxima colección" sin plan confirmado; ahora dice solo que no hay modelos publicados | `ProductGrid.astro` | Sí (tras el fix de esta fase) | — |
| Políticas legales (privacidad, términos) | No existen | — | No existen, correcto por ahora (ver § 20 de la auditoría) | Si el negocio necesita publicarlas antes de escalar (ver `BUSINESS_INPUTS.md`) |
