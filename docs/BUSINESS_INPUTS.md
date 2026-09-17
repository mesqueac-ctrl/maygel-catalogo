# Maygel — Información pendiente del negocio

> Lista únicamente preguntas que el equipo de desarrollo **no puede decidir
> por su cuenta** — respuestas de negocio, no decisiones técnicas. Nada de
> esto se rellena inventando una respuesta plausible; mientras no haya
> respuesta, el sitio se queda con su estado honesto actual (ver
> `COMMERCIAL_TRUST_MATRIX.md` para lo que ya está confirmado).

## CRITICAL — bloquea experiencia o venta

- **Catálogo real.** El sitio sigue mostrando los 3 productos de fixture de
  `db/seed.ts` (nombres, precios, fotos SVG de ejemplo). Sin catálogo real
  cargado desde el admin, ninguna venta real puede pasar por el sitio. Ver
  `GUIA-PANEL.md` para el procedimiento — no requiere ningún cambio de
  código.
- **Historia real de "Sobre Maygel".** El texto actual está marcado `TODO`
  y es reconocidamente provisional (`About.astro`, `CONTENT_GUIDE.md`).
  Preguntas exactas (heredadas de `CONTEXTO-PROYECTO.md` § 14, siguen sin
  responder):
  - ¿Cómo nació Maygel realmente?
  - ¿Quién fundó Maygel?
  - ¿Dónde fabrican?
  - ¿Qué significa el nombre "Maygel"?
  - ¿Qué inspira sus diseños?
  - ¿Cómo quieren describir la fabricación artesanal?
  - ¿Qué quieren transmitir como marca?
- **Guía de tallas.** Ver `SIZE_GUIDE_REQUIREMENTS.md` completo — sin estos
  datos, la PDP sigue sin poder resolver la duda de talla sin WhatsApp.

## IMPORTANT — mejora la confianza, no bloquea la venta

- **Política de cambio de talla — detalle exacto.** Hoy se sabe que existe
  el cambio y que el domicilio corre por cuenta de la clienta. Falta:
  - ¿Hay un plazo máximo para pedir el cambio?
  - ¿Aplica a cualquier motivo, o solo a talla?
  - ¿Qué pasa si la sandalia ya se usó?
- **Devoluciones (dinero de vuelta) y garantía por defecto de fabricación.**
  No existe hoy ninguna afirmación — no se sabe si Maygel las ofrece. Son
  conceptos distintos entre sí y distintos del cambio de talla (ver
  `COMMERCIAL_TRUST_MATRIX.md`) — necesitan una respuesta cada uno, no una
  política genérica de "devoluciones" que los mezcle.
- **Materiales reales por producto del catálogo real.** El campo ya existe
  (descripción libre por producto) — falta que, al cargar el catálogo real,
  cada descripción use el material verdadero de cada modelo (no "cuero" ni
  "cuero genuino" si no es exactamente ese material).
- **Envíos fuera de Soledad/Barranquilla para pedidos individuales (no
  mayoristas).** Hoy el copy dice que los envíos nacionales son solo para
  mayoristas. ¿Es así de verdad, o existe algún caso de envío individual
  fuera de esas 2 ciudades que hoy no se comunica?
- **Condiciones mayoristas** (mínimo de pedido, descuentos por volumen,
  tiempos de producción de lotes grandes) — hoy se resuelven 100% por
  WhatsApp a propósito (`VentaMayor.astro`). Publicarlas en el sitio es
  opcional, no obligatorio; solo si el negocio decide que quiere mostrarlas.
- **Fotografía real** (producto, hero, historia, artesanía) — ver
  `HOMEPAGE_SPEC.md` § Photography Production Needs para el detalle exacto
  de qué fotografiar. Sin esto, el sitio sigue usando bloques textiles como
  marcador de posición.
- **Redes sociales adicionales** (más allá de Instagram, si existen) —
  ¿Facebook, TikTok? Si no existen, no se inventan ni se añaden enlaces
  vacíos.

## OPTIONAL — puede esperar

- **Horario de atención real**, si el negocio quiere publicarlo (se retiró
  un bloque ficticio anteriormente por no existir un dato real, ver
  `CONTEXTO-PROYECTO.md` § 11).
- **Dirección física**, solo si el negocio decide explícitamente que quiere
  publicarla — hoy la decisión es no publicarla.
- **Políticas legales** (privacidad, términos y condiciones, cookies) — no
  existen hoy. No son necesarias para operar por WhatsApp sin checkout ni
  recolección de datos vía formulario, pero conviene evaluarlas si el
  negocio empieza a recolectar datos de otra forma (ver auditoría de
  confianza, § 20, en el reporte de Fase 7).
- **Social proof real** (reseñas, con nombre/inicial autorizada, ciudad si
  la persona lo autoriza, foto con autorización) — no se implementa ninguna
  UI vacía mientras no exista contenido real que mostrar.
- **Ampliar la paleta de colores** más allá de Negro/Blanco/Miel/Beige, si
  el negocio empieza a fabricar en otros colores (hoy es una lista cerrada
  en código, cambiarla es una decisión de negocio + un cambio de código
  pequeño).
