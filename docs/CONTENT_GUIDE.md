# Maygel — Guía de contenido y lenguaje

## Cómo debe sonar Maygel

Elegante, humano, cercano, seguro, sencillo, artesanal. Como una persona de
confianza que conoce su oficio explicando algo con calma — nunca como un
anuncio.

## Qué evitar siempre

- Exageraciones ("el mejor cuero del mundo", "líder del mercado").
- Lenguaje de dropshipping ("¡OFERTA POR TIEMPO LIMITADO!", "ENVÍO GRATIS HOY").
- La palabra "premium" repetida como muletilla — se demuestra con composición
  y contenido real, no se declara.
- Emojis en exceso — el sitio público actual no usa ninguno; mantenerlo así.
  El admin puede usar como máximo un símbolo de estado (`✓`) ya implementado,
  nunca emoji decorativo.
- Urgencia artificial ("solo quedan 2", countdown, "última oportunidad") —
  Maygel fabrica bajo pedido, no gestiona inventario limitado, así que ese
  tipo de urgencia sería directamente falso.
- Claims no comprobables: cualquier afirmación sobre materiales, procesos,
  tiempos o calidad debe poder respaldarse. Si el negocio no lo ha
  confirmado, no se escribe.

## Reglas de idioma

- Todo el contenido de cara al público y el código de dominio están en
  español (nombres de funciones incluidos: `listarDisponibles`,
  `tallasComoLista`) — mantener esa convención en cualquier código nuevo.
- Tono de "tú" cercano, no "usted" formal ni "vos".

## Ejemplos ya vigentes en el código (usar como referencia de registro)

### Títulos / titulares

- ✅ "Hechas para acompañarte." (hero)
- ✅ "Hechas a mano, bajo pedido" (catálogo)
- ✅ "No producimos en masa." (manifiesto de marca)

### Producto

- ✅ "Sandalia plana trenzada a mano en cuero natural, suela de caucho
  antideslizante." — específico, verificable, sin adjetivos vacíos.
- ❌ "Sandalia de altísima calidad, la favorita de nuestras clientas" — no
  verificable, tono de venta genérica.

### Materiales

- Describir el material real y su tratamiento cuando se conozca ("cuero
  curtido al tanino"), nunca inventar un proceso para sonar más artesanal.

### WhatsApp

- ✅ "Hola, quiero encargar la sandalia {nombre} en color {color}. Entiendo
  que es un producto fabricado bajo pedido." — la frase de expectativa de
  tiempo es obligatoria, no cosmética (ver `UX_RULES.md` § 5).
- ✅ "¿No sabes qué talla pedir? Escríbenos y te ayudamos." — invita sin
  presionar.

### Mayoristas

- ✅ "Te dejamos el mensaje listo para que solo completes tu nombre, ciudad,
  negocio y qué te interesa. Así te respondemos con la información justa que
  necesitas." — explica el porqué del formato, genera confianza.
- ❌ Cualquier mención de descuentos o mínimos de compra no confirmados por
  el negocio.

### Historia

- El texto actual de "Sobre Maygel" es **provisional** (marcado `TODO` en el
  código) — no debe tratarse como copy final ni citarse como verdad de marca
  hasta que el negocio confirme la historia real (preguntas pendientes ya
  listadas en `CONTEXTO-PROYECTO.md` § 14). Cualquier nueva sección que
  necesite historia de marca debe usar el mismo texto provisional marcado
  como tal, nunca inventar una historia distinta "para que suene mejor".

### CTAs

- ✅ "Ver colección", "Consultar por WhatsApp", "Escríbenos por WhatsApp",
  "Consultar un modelo" — nombran la acción exacta.
- ❌ "Comprar ahora", "Enviar" (genéricos, y "Comprar ahora" implica un
  checkout que no existe).

## Reglas para contenido nuevo (categorías, producto real)

- `CATEGORIAS_VALIDAS` es provisional (ver `ARCHITECTURE.md` § 9.3) — no
  escribir copy de marketing alrededor de una categoría hasta que el negocio
  confirme la taxonomía real.
- Ningún precio, talla, color o material se muestra si no viene de la base de
  datos o ha sido confirmado explícitamente por el negocio — nunca placeholder
  numérico "de ejemplo" en una vista que un usuario real pueda ver en
  producción.
