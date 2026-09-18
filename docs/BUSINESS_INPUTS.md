# Maygel — Información pendiente del negocio

> Lista única y consolidada (Fase 8, actualizada en Fase 8.2 y Fase 8.3 con
> información real confirmada) de todo lo que el equipo de desarrollo
> **no puede decidir por su cuenta** — respuestas de negocio, no decisiones
> técnicas. Nada de esto se rellena inventando una respuesta plausible;
> mientras no haya respuesta, el sitio se queda con su estado honesto actual
> (ver `COMMERCIAL_TRUST_MATRIX.md` para lo que ya está confirmado). Las
> preguntas de historia, tallas y fotografía tienen su propio documento
> detallado — aquí solo se referencian, para no duplicarlas:
> `BRAND_STORY_INPUT.md`, `SIZE_GUIDE_REQUIREMENTS.md`,
> `PHOTOGRAPHY_BRIEF.md`, `REAL_CATALOG_INPUT.md`. Ver también
> `OWNER_CONTENT_CHECKLIST.md` para la versión accionable y no técnica de
> esta misma lista.

## Ya confirmado por el negocio (Fase 8.2 y Fase 8.3 — no repetir estas preguntas)

- **Precio retail base: $60.000 COP por par.** Se aplicará a los productos
  reales cuando se carguen — no se tocaron los fixtures de `db/seed.ts`.
- **Fabricación bajo pedido**, confirmado explícitamente (ya se comunicaba
  así desde antes, ahora reconfirmado).
- **Colores que Maygel puede trabajar:** Negro, Blanco, Miel, Beige, Café,
  Plateado — ya añadidos a `COLORES_VALIDOS`/`COLORES_METADATA`.
- **Mayoristas: el canal de contacto es WhatsApp.** No existe otro canal ni
  proceso — confirmado, no queda pregunta pendiente sobre *cómo* contactar,
  solo sobre las condiciones (ver más abajo).
- **Cambios (Fase 8.3): se aceptan por talla, pequeños detalles y defectos.**
  El domicilio/envío del cambio se cobra nuevamente (no es gratis ni una
  sola vez) — regla confirmada explícitamente.
- **Envíos por ciudad (Fase 8.3):** Soledad tiene contraentrega; Barranquilla
  tiene domicilio pagado por la clienta (normalmente $10.000–$15.000 COP);
  Cartagena solo se atiende al por mayor, no retail individual.
- **Medios de pago reconfirmados (Fase 8.3): Nequi, Bancolombia, Llave,
  efectivo, contraentrega.** Esta lista reemplaza la anterior (ya no se
  afirma Daviplata ni "transferencia bancaria" genérica).
- **Debe existir una capa de ayuda visible y accesible en el sitio**,
  pensada para personas mayores o con poca familiaridad digital — decisión
  de experiencia confirmada, no una pregunta pendiente.

## CRITICAL — bloquea experiencia o venta

- **Catálogo real (nombres, fotos, disponibilidad por modelo).** El sitio
  sigue mostrando los 3 productos de fixture de `db/seed.ts`. Sin catálogo
  real cargado desde el admin, ninguna venta real puede pasar por el sitio.
  Ver `GUIA-PANEL.md` para el procedimiento — no requiere ningún cambio de
  código. El precio ya está confirmado ($60.000, ver arriba); lo que falta
  es la lista de modelos reales, no el precio.
- **Historia real de "Sobre Maygel".** El texto actual está marcado `TODO`
  y es reconocidamente provisional (`About.astro`, `CONTENT_GUIDE.md`). Las
  12 preguntas exactas viven en `BRAND_STORY_INPUT.md` (no se repiten aquí).
- **Guía de tallas — rango y medidas.** El negocio confirmó que fabrica
  varias tallas, pero **todavía no hay un rango formal ni medidas en
  centímetros** — ver `SIZE_GUIDE_REQUIREMENTS.md` completo. No publicar un
  rango inventado ("tallas 35-42") mientras esto siga pendiente.
- **Materiales por modelo.** Confirmado que **no están confirmados
  técnicamente todavía** — no publicar "cuero", "cuero genuino",
  "sintético", "caucho" ni "materiales premium" hasta tener el dato real.
  Plantilla exacta en `REAL_CATALOG_INPUT.md`.
- **Nombres definitivos de los modelos.** Sin esto no se puede completar la
  ficha de `REAL_CATALOG_INPUT.md` ni cargar el catálogo real.
- **Fotos reales del catálogo.** Ver `PHOTOGRAPHY_BRIEF.md` (sesión
  fotográfica completa).

## IMPORTANT — mejora la confianza, no bloquea la venta

- **Descuentos reales, si el negocio decide aplicar alguno.** La
  arquitectura ya soporta un precio de oferta opcional por producto
  (`precioOferta`, ver `ARCHITECTURE.md` § precios) — pero **no existe
  ningún descuento confirmado todavía**. No se activa ninguno sin que el
  negocio confirme monto/porcentaje real y por cuánto tiempo.
- **Redes sociales adicionales** (más allá de Instagram, si existen) —
  ¿Facebook, TikTok? Si no existen, no se inventan ni se añaden enlaces
  vacíos.

### Cambios y garantía (lo que falta, tras confirmar motivos en Fase 8.3)

- ¿Hay un plazo máximo para pedir el cambio? (¿días desde la entrega?) —
  **sigue sin confirmar**, es la única pregunta abierta de esta sección.
- ¿Qué pasa si la sandalia ya se usó (afuera, no solo probada en casa)?
- ¿Existe alguna devolución de dinero (no cambio), en algún caso? Si sí,
  ¿cuál?
- ¿Hay alguna garantía formal más allá del cambio inmediato por defecto ya
  confirmado (reparación, reposición, plazo largo)?
- ¿Los pedidos personalizados (modelo/color fuera de catálogo, ver
  `CustomModelCTA.astro`) tienen la misma política de cambio?

Estos son conceptos distintos entre sí (cambio ≠ devolución de dinero ≠
garantía extendida, ver `COMMERCIAL_TRUST_MATRIX.md`) — necesitan una
respuesta cada uno, nunca una política genérica de "devoluciones" que los
mezcle.

### Envíos (lo que falta, tras confirmar cobertura por ciudad en Fase 8.3)

- El costo de Barranquilla ($10.000–$15.000 COP) — ¿es siempre ese rango o
  varía según la zona/pedido?
- ¿Barranquilla también tiene contraentrega, o solo pago anticipado? (hoy
  solo Soledad tiene contraentrega confirmada)
- ¿Existe algún caso real de envío individual fuera de Soledad/Barranquilla/
  Cartagena que hoy no se comunica?
- En un cambio, ¿el costo de envío que "se cobra nuevamente" es el mismo
  monto que el envío original, o puede variar?

### Pagos — confirmados en Fase 8.3, sin preguntas abiertas

Nequi, Bancolombia, Llave, efectivo y contraentrega ya están confirmados
(reemplazan la lista anterior). Única pregunta que sigue abierta:

- [ ] ¿Se requiere algún anticipo/abono antes de empezar a fabricar, o el
      pago completo es solo al recibir?

No se cambia nada más en el sitio hasta confirmar esa casilla.

### Mayoristas (preguntas concretas — el canal ya está confirmado: WhatsApp)

- ¿Existe un pedido mínimo (unidades o valor)? ¿Cuál?
- ¿Hay descuento por volumen? ¿Escalas (ej. 10-20, 21-50, 50+)?
- ¿Los colores/tallas disponibles para mayoristas son los mismos que
  retail, o hay restricciones?
- ¿Tiempos de producción para pedidos grandes (distintos del tiempo de un
  pedido individual)?
- ¿Envío incluido o aparte para pedidos mayoristas?
- ¿Se acepta personalización (color/diseño especial) en pedidos mayoristas?
- ¿Hay alguna condición de exclusividad (ej. no vender a negocios de la
  misma zona)?

Ninguna de estas respuestas se publica en el sitio hasta que el negocio
decida explícitamente que quiere mostrarlas — hoy `VentaMayor.astro` resuelve
todo esto por WhatsApp a propósito, y puede seguir siendo así indefinidamente
si el negocio prefiere no publicar cifras.

## OPTIONAL — puede esperar

- **Horario de atención real**, si el negocio quiere publicarlo (se retiró
  un bloque ficticio anteriormente por no existir un dato real, ver
  `CONTEXTO-PROYECTO.md` § 11).
- **Dirección física**, solo si el negocio decide explícitamente que quiere
  publicarla — hoy la decisión es no publicarla.
- **Políticas legales más formales.** Desde Fase 8.3 existe una página básica
  de términos (`terminos.astro`) con solo lo confirmado — no es asesoría
  jurídica. Si el negocio necesita algo más formal (privacidad, cookies,
  términos revisados por un abogado), sigue pendiente de decisión y de
  revisión legal real.
- **Social proof real** (reseñas, con nombre/inicial autorizada, ciudad si
  la persona lo autoriza, foto con autorización) — no se implementa ninguna
  UI vacía mientras no exista contenido real que mostrar.
- **Ampliar la paleta de colores** más allá de los 6 confirmados en Fase 8.2
  (Negro, Blanco, Miel, Beige, Café, Plateado), si el negocio empieza a
  fabricar en otros colores (sigue siendo una lista cerrada en código,
  cambiarla es una decisión de negocio + un cambio de código pequeño).
