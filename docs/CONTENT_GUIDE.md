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
- **Material superior sin confirmar (actualizado en Fase 8.4):** nunca
  escribir "cuero", "cuerina", "sintético", "piel" ni "PVC" en ninguna
  ficha de producto hasta que el negocio confirme el material real de ese
  modelo — ver `COMMERCIAL_TRUST_MATRIX.md` y `REAL_CATALOG_INPUT.md`. La
  suela sí está confirmada ("goma") y puede describirse igual en cualquier
  modelo.
- **Tallas (Fase 8.4):** la fabricación es flexible según pedido — nunca
  escribir un rango fijo ("tallas 35 a 40", "disponible del 34 al 41") ni
  prometer "cualquier talla" como garantía absoluta. Usar "Talla según
  pedido" o "Consulta tu talla por WhatsApp" según el contexto.
- **Descuentos (Fase 8.2):** nunca "¡OFERTA!", badges rojos, countdown ni
  "últimas unidades" para comunicar un precio con descuento. El precio
  anterior tachado + el precio actual, con más peso visual para el precio
  actual, es suficiente — la caída de precio ya comunica el descuento sin
  necesidad de urgencia artificial. Si se muestra un porcentaje, siempre se
  calcula desde los dos precios reales, nunca se escribe a mano.

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

## Ayuda visible — tono y palabras (Fase 8.3)

Nueva capa de ayuda pensada para personas mayores o con poca familiaridad
digital (ver `UX_RULES.md` § Ayuda). El registro es el mismo de siempre
(cercano, honesto, sin urgencia) pero con una regla extra: **preferir
palabras humanas sobre palabras de soporte técnico.**

**Usar:** "¿Necesitas ayuda?", "Te guiamos paso a paso", "Si no sabes cuál
elegir, escríbenos", "Podemos ayudarte con talla, color y pedido".

**Evitar:** "soporte", "ticket", "asistencia", "requerimiento", o cualquier
palabra que suene a mesa de ayuda corporativa — Maygel resuelve dudas
conversando, no atendiendo tickets.

**Regla de cambios (Fase 8.3, confirmada por el negocio):** siempre que se
mencione el cambio de talla/detalle/defecto, decir explícitamente que el
domicilio/envío se cobra de nuevo — nunca dejarlo implícito ni usar
"gratis" cuando no lo es.

## Términos aprobados (Fase 7)

Para que ninguna sección parezca escrita por una persona distinta. Usar
siempre la columna "usar", nunca la de "evitar", salvo que el contexto
gramatical de la frase lo pida de otro modo.

| Concepto | Usar | Evitar | Nota |
|---|---|---|---|
| El objeto que se vende | "sandalia", "par", "modelo" (según contexto) | "producto" en copy de cara al público (sí vale en código/docs) | "producto" es correcto en `db/config.ts`, `ProductoRegistro`, etc. — es jerga de dominio interna, no copy |
| Acción de comprar | "pedir", "encargar", "consultar" | "comprar ahora", "adquirir" | Maygel vende por conversación, no por checkout — "comprar ahora" implica un flujo que no existe (ver `UX_RULES.md` § 13) |
| Proceso de fabricación | "hecho a mano", "artesanal", "fabricado bajo pedido" | "confeccionado industrialmente" (obviamente, nunca se usaría, pero tampoco "producción en serie" ni nada que sugiera volumen) | — |
| Calidad | describir el hecho real (material, acabado) | "premium", "de alta calidad", "los mejores materiales" | Ver § "Qué evitar siempre" arriba — se demuestra con datos reales, no se declara |
| Llamado a la acción | nombra la acción exacta ("Ver colección", "Pedir este par", "Consultar por WhatsApp") | "Comprar ahora", "Añadir al carrito", "Enviar", "Ver más" sin contexto | Ver `UX_RULES.md` § 4 |
| Disponibilidad temporal | "no disponible", "ya no está disponible" | "agotado", "sin stock" | Maygel no maneja inventario — "agotado"/"sin stock" implican un concepto de stock que no existe (ver `ARCHITECTURE.md` § 4.2) |

## Reglas para contenido nuevo (categorías, producto real)

- `CATEGORIAS_VALIDAS` es provisional (ver `ARCHITECTURE.md` § 9.3) — no
  escribir copy de marketing alrededor de una categoría hasta que el negocio
  confirme la taxonomía real.
- Ningún precio, talla, color o material se muestra si no viene de la base de
  datos o ha sido confirmado explícitamente por el negocio — nunca placeholder
  numérico "de ejemplo" en una vista que un usuario real pueda ver en
  producción.
