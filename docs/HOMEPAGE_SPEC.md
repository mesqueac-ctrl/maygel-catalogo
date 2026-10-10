# Maygel — Homepage (Caribe cálido)

Estado real de `src/pages/index.astro`.

## Orden

1. Header
2. Hero — titular, subtítulo, Ver la colección + Pedir por WhatsApp, foto (Luna)
3. Colección — subtítulo “Elige tu modelo y tu color favorito.” + “Consulta tu talla”.
   Grid 2 columnas en móvil, 3 desde 768px, 4 desde 1200px.
4. Cómo comprar — 3 pasos de una línea, CTA WhatsApp (`MENSAJE_CONTACTO_GENERAL`),
   3 etiquetas (contraentrega Soledad, cambios por talla, atención directa).
   Políticas de envío/pago/cambio y “Consulta tu talla” van en
   `<details>` “Ver envíos, pagos y cambios”; el copy no cambia.
5. Nuestra historia
6. Mayoristas (fondo espresso, CTA `MENSAJE_MAYORISTA`)
7. Diseño personalizado
8. Footer Hablemos — Instagram `@maygelcr` solo aquí, con icono + handle

No hay barra de confianza bajo el hero, ni marquee, ni franja de Instagram
antes del footer.

## Catálogo

La web pública no lista productos con `archivado` verdadero (NULL o 0 = no
archivado). Precio siempre `formatearPrecio(precioEfectivo())`. Pedir abre WhatsApp con
`enlaceProducto` (modelo, color si es único, precio, URL). Si hay varios
colores, el color se omite hasta la ficha.

## Fotografía pendiente

Hero/historia/cierre siguen usando fotos de producto reales (Luna, Deriva,
Nudo) hasta una sesión de taller, lifestyle y clientas.
