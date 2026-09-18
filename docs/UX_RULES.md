# Maygel — Reglas de UX

> Regla fundamental: **si una decisión visual reduce claridad, accesibilidad o
> confianza, no se aprueba** — sin importar cuánto mejore la estética.

## 1. Mobile-first

- Todo componente se diseña primero para el ancho móvil (`360`–`430px`) y se
  expande hacia escritorio, nunca al revés. Ya verificado sin overflow
  horizontal en `360/375/390/430/768/1024/1440` en la implementación actual.
- El hero apila imagen arriba / contenido abajo en móvil, nunca comprime la
  composición de escritorio a una columna estrecha sin rediseñar la jerarquía.

## 2. Navegación

- Nav de escritorio: máximo 4 enlaces principales (hoy: Colección, Historia,
  Cómo comprar, Mayoristas) + CTA de WhatsApp. No añadir un quinto enlace sin
  quitar uno — la navegación debe poder leerse de un vistazo.
- Nav móvil: menú hamburguesa con panel a pantalla completa del ancho del
  header, mismos enlaces, sin reducir ni resumir.
- El wordmark siempre enlaza a `#inicio` (ancla superior del home), nunca a
  una ruta distinta.

## 3. Jerarquía

- Cada sección de home tiene un único mensaje central (ver `HOMEPAGE_SPEC.md`
  para el orden). Nunca combinar dos mensajes de negocio distintos en una
  misma sección "para ahorrar espacio".
- El precio de un producto siempre es visualmente secundario a la fotografía
  y al nombre en el catálogo (nunca el elemento más grande de la tarjeta).

## 4. CTA

- Un único CTA primario por vista (o dos como máximo cuando uno es la acción
  principal y el otro es WhatsApp como alternativa) — nunca tres o más
  botones compitiendo en la misma composición.
- El texto del CTA siempre nombra la acción real ("Ver colección",
  "Consultar por WhatsApp"), nunca genérico ("Click aquí", "Enviar").
- Ningún CTA se deshabilita sin explicar por qué (ver § selección de
  variantes).

## 5. WhatsApp como canal de conversión

- Todo mensaje predefinido de WhatsApp se construye desde `src/consts.ts` /
  `src/lib/whatsapp.ts` — nunca se escribe un mensaje ad-hoc en un componente
  nuevo.
- El mensaje de encargo de producto siempre incluye: nombre del producto,
  color y talla elegidos (si aplica), el precio formateado (añadido en Fase
  7 — antes faltaba, y Maygel no podía confirmar de entrada a qué precio
  exacto se refería la clienta) y la frase "Entiendo que es un producto
  fabricado bajo pedido" — esta frase existe para gestionar expectativas de
  tiempo de entrega y no debe eliminarse sin decisión de negocio explícita.
- Nunca prometer confirmación o disponibilidad inmediata en el copy de un
  botón de WhatsApp — es un canal de conversación, no de checkout instantáneo.

## 6. Confianza

- Toda afirmación de fabricación/materiales/envíos debe ser verificable con
  el negocio antes de publicarse (ver `CONTENT_GUIDE.md`). Ninguna cifra o
  proceso se inventa para sonar más profesional.
- La sección "Cómo comprar" existe específicamente para reducir la
  incertidumbre de comprar un producto que no existe físicamente todavía —
  no se abrevia ni se oculta en pantallas pequeñas.

## 6.1 Ayuda visible, para personas mayores o poco familiarizadas con ecommerce (Fase 8.3)

Decisión de experiencia confirmada por el negocio: debe existir una opción
de ayuda **muy visible y muy fácil de entender**, con salida directa a
WhatsApp, en homepage, PDP y footer como mínimo (ver `ARCHITECTURE.md` §
rutas para la página `/ayuda`).

- **Texto grande y claro**, nunca al tamaño mínimo del sistema — la ayuda
  usa el mismo peso tipográfico que un titular de sección, no una nota al
  pie.
- **Mucho contraste**, sin texto secundario apagado para la parte que
  importa (el enlace/botón de WhatsApp nunca en `--color-muted`).
- **Jerarquía obvia**: un titular corto ("¿Necesitas ayuda?"), una frase de
  apoyo, un botón — nunca un párrafo largo antes de la acción.
- **Lenguaje cotidiano**, nunca "soporte"/"ticket"/"asistencia" (ver
  `CONTENT_GUIDE.md` § Ayuda visible).
- **Botones/enlaces fáciles de tocar**: mismo mínimo de `44px` que el resto
  del sitio (`DESIGN_SYSTEM.md` § 15), sin excepción por ser un bloque
  "secundario".
- **Nunca**: párrafos largos, FAQ abarrotada con muchas preguntas, iconos
  ambiguos sin texto, enlaces escondidos dentro de otro párrafo, o más de
  una acción compitiendo en el mismo bloque de ayuda.
- La página `/ayuda` en sí sigue esta misma regla: secciones cortas,
  numeradas donde ayude (como "cómo pedir"), sin acordeones anidados ni
  tecnicismos — pensada para alguien que nunca ha comprado por WhatsApp.

## 7. Guía de tallas

- **No implementada todavía.** Hoy el campo `tallas` es una lista simple
  (`"35, 36, 37"`) sin equivalencias ni guía de medición. Ver
  `PRODUCT_PAGE_SPEC.md` para el diseño futuro. Regla para cuando se
  implemente: la guía debe ser accesible desde la ficha sin salir de la
  página (no un PDF externo, no un link que abandona el flujo de compra).

## 8. Selección de variantes (color)

- Un producto con un único color posible lo preselecciona automáticamente
  (ya implementado) — nunca obligar a "elegir" cuando no hay elección real.
- Un producto con varios colores sin elegir deshabilita el CTA de encargo con
  el texto explícito "Selecciona un color" (ya implementado) — nunca dejar un
  CTA activo que lleve a un mensaje de WhatsApp ambiguo sobre qué color se
  pidió.
- En el catálogo (tarjeta compacta), los puntos de color son decorativos —
  la elección real sucede en la ficha. No confundir ambos comportamientos al
  extender el componente.

## 9. Errores

- Los mensajes de error del admin (dirigidos a una usuaria no técnica) nunca
  usan jerga técnica ("falló la validación", "error 500"). Ejemplo ya
  implementado: `"Categoría no válida."`, `"Faltan datos por llenar."` — mantener
  ese registro en cualquier mensaje nuevo.
- Los errores públicos (404) explican qué pudo pasar y ofrecen una salida
  clara (volver al catálogo, escribir por WhatsApp) — nunca un mensaje técnico
  desnudo.

## 10. Estados vacíos

> Ver también `ARCHITECTURE.md` § 4.1 — regla dura sobre no asumir un número
> fijo de productos (los fixtures actuales son 3, el catálogo real puede ser
> 0, 1, pocos o muchos).

- Una sección sin contenido que mostrar **se oculta por completo** (ya
  implementado en "Selección Maygel" cuando no hay productos destacados) —
  nunca se muestra una sección con un mensaje "No hay nada aquí todavía 😢".
- Excepción: el catálogo principal sí muestra un mensaje cuando no hay
  productos disponibles, porque esa sección es estructuralmente obligatoria
  (ancla de navegación `#catalogo`) — el mensaje invita a escribir por
  WhatsApp en vez de mostrar un grid vacío.
- **Corregido en Fase 7:** el mensaje de catálogo vacío decía "La próxima
  colección está tomando forma" — una promesa de trabajo futuro sin fecha ni
  plan confirmado por el negocio (la razón real de que esté vacío es que
  todavía no se cargó el catálogo, no que exista una colección en curso).
  Reemplazado por "Por ahora no tenemos modelos publicados aquí", que no
  afirma nada que no se pueda verificar. Cualquier copy de estado vacío
  nuevo debe pasar la misma prueba: si implica una promesa o un plan futuro,
  no se publica sin confirmación real del negocio (ver
  `COMMERCIAL_TRUST_MATRIX.md`).

## 11. Feedback

- Toda acción del admin que modifica datos redirige con `?ok=` o `?error=` y
  muestra un aviso visible inmediatamente después de la redirección (patrón
  ya consistente en `guardar.ts`, `eliminar.ts`, `reordenar.ts`).
- El reordenamiento de catálogo muestra el estado "Tienes cambios sin
  guardar." mientras hay cambios locales no persistidos, y advierte con el
  diálogo nativo del navegador (`beforeunload`) si se intenta salir sin
  guardar — no implementar un modal personalizado para esto.

## 12. Accesibilidad

- Todo control interactivo: mínimo `44px` de área táctil (ya verificado y
  aplicado consistentemente).
- Todo elemento puramente decorativo (bloques de textura, iconos de flecha en
  botones) lleva `aria-hidden="true"` o vive dentro de un `role="img"` con
  `aria-label` cuando representa contenido ausente — nunca un `<img>` sin
  `alt` ni rol.
- Un único `<h1>` por página (ver `SEO_RULES.md` § 6).
- `prefers-reduced-motion: reduce` deshabilita el único sistema de motion
  existente (fade de revelado) — cualquier animación nueva debe respetar la
  misma media query, no añadir una animación "siempre activa".

## 13. Compra sin confusión

- El flujo completo (ver catálogo → elegir color → ficha → WhatsApp) nunca
  requiere crear una cuenta, ni un carrito, ni un checkout — es intencional:
  Maygel vende por conversación, no por transacción automatizada. No
  introducir un carrito de compras sin que sea una decisión de negocio
  explícita y documentada en `ROADMAP.md`.
- El precio siempre se muestra formateado en COP con el símbolo de moneda
  (`formatearPrecio()`, ya centralizado) — nunca un número plano sin formato
  en ningún punto nuevo de la interfaz.

## 14. Mayoristas

- El flujo mayorista es un mensaje de WhatsApp pre-rellenado con campos para
  completar (nombre, ciudad, negocio, cantidad, productos de interés) — nunca
  un formulario web que obligue a llenar campos antes de poder escribir.
- No se muestran descuentos ni condiciones de precio mayorista en la interfaz
  a menos que el negocio los confirme explícitamente (ver
  `CONTENT_GUIDE.md`).

## 15. Touch targets

Ya cubierto en `DESIGN_SYSTEM.md` § 15 — `44px` mínimo sin excepción, incluidos
los puntos de color decorativos en catálogo (el botón invisible alrededor del
punto visual, no el punto en sí, debe cumplir el mínimo).

## 16. Formularios (admin)

- Cada campo tiene una etiqueta visible (nunca solo un placeholder como
  etiqueta).
- Los campos obligatorios usan `required` nativo del navegador; el mensaje de
  error del servidor es la segunda línea de defensa, no la única.
- Confirmación explícita antes de cualquier acción irreversible (`eliminar`)
  con el nombre del elemento en el mensaje — ya implementado
  (`window.confirm` con el nombre de la sandalia).

## 17. Consistencia

- El mismo componente de tarjeta de producto (`ProductCard`, con su prop
  `variante`) se usa en catálogo, destacados y ficha — nunca se crea una
  tercera variante visual de tarjeta de producto sin extender el componente
  existente.
- El mismo sistema de botones (texto + flecha) se usa en toda la interfaz
  pública sin excepción local — un botón sólido nuevo en una sección nueva es
  una regresión de marca, no una variante válida.
