# Maygel — Especificación de la ficha de producto

> Fase 5 implementó esta página como una PDP dedicada (`src/pages/productos/[slug].astro`),
> ya no comparte markup con la tarjeta de catálogo. Este documento describe el
> estado real construido.

## Galería

El modelo de datos soporta una foto principal + opcionalmente una foto
distinta por color (`imagenesColores`) — no una galería de N fotos por
producto. La ficha usa ese slot como su única imagen, con recorte de color
real (nunca inventado: solo cambia la foto si existe una entrada para ese
color en `imagenesColores`). Una galería de varias fotos por producto es una
capacidad futura — ver `HOMEPAGE_SPEC.md` § Photography Production Needs.

## Producto (nombre, presentación)

`<h1>` visible con el nombre real, seguido del precio. Breadcrumbs reales
(Inicio → Colección → nombre del producto) con `BreadcrumbList` JSON-LD.

## Precio

`formatearPrecio()` centralizado, sin variación por talla/color todavía.

**Descuento opcional (Fase 8.2):** cada producto puede tener un
`precioOferta` opcional. El precio que realmente se muestra y se usa en
todo el sitio (PDP, `ProductCard`, WhatsApp, JSON-LD) es siempre el
**precio efectivo** (`precioEfectivo()` en `productos.ts`) —
`precioOferta` si es válido (mayor que 0 y menor que `precio`), si no,
`precio` normal. Ninguna vista calcula esto por su cuenta.

- **Sin descuento:** solo se muestra el precio (`$60.000`).
- **Con descuento:** el precio anterior tachado (menor jerarquía visual) +
  el precio actual (mayor jerarquía visual). Un porcentaje de descuento,
  si se muestra, siempre se calcula desde los dos precios reales — nunca se
  almacena ni se escribe a mano (ver `CONTENT_GUIDE.md`).
- **Nunca:** badges rojos agresivos, countdown, "¡OFERTA!", "últimas
  unidades" — el precio tachado ya comunica el descuento sin urgencia
  artificial.
- El CTA de WhatsApp y el JSON-LD `Offer.price` usan siempre el precio
  efectivo, nunca el precio normal si hay una oferta activa.

## Color

Selector real (no puntos decorativos): botones con swatch + nombre visible,
estado seleccionado (`aria-pressed`, borde), funcional por teclado, con foco
visible. Si el producto tiene un único color, no se muestra ningún selector
— ya está implícitamente elegido.

## Talla (rediseñado en Fase 8.4 — fabricación flexible confirmada)

**El negocio confirmó que la fabricación es de talla flexible según pedido —
no existe ni existirá un rango fijo que publicar.** La arquitectura soporta
dos modos, decididos por el contenido real de `producto.tallas`
(`esTallaFlexible()` en `productos.ts`), sin ningún cambio de schema:

- **Modo flexible (por defecto, recomendado para todo el catálogo real):**
  si `tallas` no es una lista de números puros (ej. `"Según pedido"`), la
  PDP no muestra botones de una lista fija. Muestra el texto real del campo
  (o "Talla según pedido" si está vacío) + un campo de texto libre opcional
  para que la clienta escriba su talla exacta + un enlace a WhatsApp para
  quien no sepa cuál pedir. **Nunca bloquea el CTA** — la talla es
  información opcional, igual que el color cuando el producto tiene uno
  solo.
- **Modo lista fija (compatibilidad, no el caso esperado hoy):** si `tallas`
  es una lista de números separados por coma (ej. `"35, 36, 37"`), se
  mantiene el selector de botones ya existente desde Fase 5 — por si algún
  modelo puntual llega a tener de verdad un rango cerrado confirmado.

**Sin estados "agotado"** en ningún modo — no existe concepto de inventario
por talla en el modelo de datos, así que no se inventa uno. **No prometer
"cualquier talla" como garantía absoluta** — el copy siempre es "según
pedido"/"consulta por WhatsApp", nunca una promesa sin límite.

## Guía de tallas

`<details>/<summary>` nativo. Contenido honesto: hoy no existe una guía real
de equivalencias en centímetros publicada, así que el disclosure lo dice
explícitamente y ofrece WhatsApp como vía — nunca se inventó una tabla de
centímetros ni un rango de tallas.

## CTA

Un único CTA ("Pedir este par"). Si el producto necesita color y/o talla sin
seleccionar, el CTA no navega: muestra un mensaje inline accesible
(`role="alert"`) y mueve el foco al primer control del grupo que falta —
nunca un `alert()` de navegador.

## Mensaje de WhatsApp

`mensajeProducto()` (`src/lib/whatsapp.ts`) incluye nombre, color y talla
**solo si fueron seleccionados/escritos** (nunca un valor no confirmado —
en modo flexible, la talla es lo que la clienta escribió en el campo de
texto libre, tal cual, nunca "cualquier talla" ni un valor inventado), el
**precio efectivo** formateado (con descuento aplicado si existe, ver §
Precio — añadido en Fase 7, actualizado en Fase 8.2 para usar el precio
efectivo en vez del precio normal) y la URL de la ficha como referencia,
para que Maygel confirme exactamente qué vio, qué talla pidió y a qué
precio antes de responder.

## Fabricación

Etiqueta fija "Hecho a mano, bajo pedido — se fabrica después de tu pedido."
— sin tiempos inventados.

## Materiales

Material superior sigue dentro de `descripcion` (texto libre por producto,
ya real) — no se añadió un campo estructurado, no hay variación suficiente
en el catálogo actual para justificarlo. **El material superior todavía no
está confirmado por el negocio** — ninguna ficha real debe describir
"cuero", "cuerina", "sintético", "piel" ni "PVC" hasta tener el dato
verdadero por modelo (ver `COMMERCIAL_TRUST_MATRIX.md`,
`REAL_CATALOG_INPUT.md`).

**Suela — confirmado en Fase 8.4: goma, para todos los modelos.** Se
muestra como una línea fija junto al tag de fabricación ("Suela de goma."),
igual para todo el catálogo — no depende de `descripcion` porque es un
hecho de marca, no una variación por producto.

## Envíos / cambios

`<details>` con las mismas políticas reales que la home (entregas por
ciudad, cambios por talla/detalles/defectos con envío del cambio a cargo de
la clienta) — un solo texto de verdad, no una segunda versión distinta. Ver
`ayuda.astro` para el detalle completo (Fase 8.3).

## Productos relacionados

"También puede gustarte" — hasta 3 productos disponibles, excluyendo el
actual, mismo orden que el catálogo (sin "recomendación inteligente").
Sección omitida por completo si no hay ningún otro producto.

## Producto no encontrado

Slug sin match en `Producto.slug` → `Astro.rewrite("/404")`, respuesta HTTP
404 real (verificado).

## Producto no disponible

`disponible = false` **no** es un 404. La página se conserva (foto, nombre,
precio, para no romper un enlace externo o compartido), pero: `robots:
noindex, follow` (Fase 5.1 — sigue siguiendo sus propios enlaces internos,
migas y relacionados; solo deja de ofrecerse como resultado de búsqueda, ver
`SEO_RULES.md` § 4), sin JSON-LD `Product` (no se afirma una oferta que no
existe), sin selector de color/talla ni CTA de pedido — en su lugar, un
mensaje claro ("Este modelo ya no está disponible") + WhatsApp de contacto
general + enlace de vuelta al catálogo.

## Desktop y móvil

Desktop: dos columnas desde `700px` (galería | info). Móvil: apilado en el
orden galería → nombre → precio → color → talla → CTA → información
secundaria (fabricación, envíos/cambios) — el CTA nunca queda a media
página de distancia de los selectores.

## Slug persistente

Ver `ARCHITECTURE.md` § slug y `SEO_RULES.md` § 8 — implementado en Fase 5,
cerrado con contrato de inmutabilidad en Fase 5.1 (el campo se muestra de
solo lectura al editar), no se repite aquí.
