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

## Talla

Selector de tallas reales (`tallasComoLista`), mismo patrón que color: sin
selector si solo hay una talla. **Sin estados "agotado"** — no existe
concepto de inventario por talla en el modelo de datos, así que no se
inventa uno.

## Guía de tallas

`<details>/<summary>` nativo. Contenido honesto: hoy no existe una guía real
publicada, así que el disclosure lo dice explícitamente y ofrece WhatsApp
como vía — nunca se inventó una tabla de centímetros.

## CTA

Un único CTA ("Pedir este par"). Si el producto necesita color y/o talla sin
seleccionar, el CTA no navega: muestra un mensaje inline accesible
(`role="alert"`) y mueve el foco al primer control del grupo que falta —
nunca un `alert()` de navegador.

## Mensaje de WhatsApp

`mensajeProducto()` (`src/lib/whatsapp.ts`) incluye nombre, color y talla
**solo si fueron seleccionados** (nunca un valor no confirmado), el **precio
efectivo** formateado (con descuento aplicado si existe, ver § Precio —
añadido en Fase 7, actualizado en Fase 8.2 para usar el precio efectivo en
vez del precio normal) y la URL de la ficha como referencia, para que Maygel
confirme exactamente qué vio y a qué precio la clienta antes de responder.

## Fabricación

Etiqueta fija "Hecho a mano, bajo pedido — se fabrica después de tu pedido."
— sin tiempos inventados.

## Materiales

Siguen dentro de `descripcion` (texto libre por producto, ya real). No se
añadió un campo estructurado de materiales — no hay variación suficiente en
el catálogo actual para justificarlo. **Confirmado en Fase 8.2: los
materiales reales todavía no están confirmados por el negocio** — ninguna
ficha real debe describir "cuero", "cuero genuino", "sintético", "caucho"
ni "materiales premium" hasta tener el dato verdadero por modelo (ver
`COMMERCIAL_TRUST_MATRIX.md`, `REAL_CATALOG_INPUT.md`).

## Envíos / cambios

`<details>` con las mismas políticas reales que ya existían en "Así
trabajamos" de la home (entregas Soledad/Barranquilla, cambio de talla a
cuenta de la clienta) — un solo texto de verdad, no una segunda versión
distinta.

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
