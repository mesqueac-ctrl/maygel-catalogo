# Maygel — Información pendiente del negocio

> Lista única y consolidada (Fase 8, actualizada en Fase 8.2 con la primera
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

## Ya confirmado por el negocio (Fase 8.2 — no repetir estas preguntas)

- **Precio retail base: $60.000 COP por par.** Se aplicará a los productos
  reales cuando se carguen — no se tocaron los fixtures de `db/seed.ts`.
- **Fabricación bajo pedido**, confirmado explícitamente (ya se comunicaba
  así desde antes, ahora reconfirmado).
- **Colores que Maygel puede trabajar:** Negro, Blanco, Miel, Beige, Café,
  Plateado — ya añadidos a `COLORES_VALIDOS`/`COLORES_METADATA`.
- **Mayoristas: el canal de contacto es WhatsApp.** No existe otro canal ni
  proceso — confirmado, no queda pregunta pendiente sobre *cómo* contactar,
  solo sobre las condiciones (ver más abajo).

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

### Cambios y garantía (preguntas concretas)

- ¿Hay un plazo máximo para pedir el cambio de talla? (¿días desde la
  entrega?)
- ¿El cambio aplica a cualquier motivo, o solo a talla?
- ¿Qué pasa si la sandalia ya se usó (afuera, no solo probada en casa)?
- ¿Existe alguna devolución de dinero (no cambio de talla), en algún caso?
  Si sí, ¿cuál?
- ¿Qué pasa si una sandalia llega con un defecto real de fabricación —
  Maygel la repara, la reemplaza, devuelve el dinero?
- ¿Los pedidos personalizados (modelo/color fuera de catálogo, ver
  `CustomModelCTA.astro`) tienen la misma política de cambio, o son "sin
  cambio" por ser hechos a medida?

Estos son conceptos distintos entre sí (cambio de talla ≠ devolución de
dinero ≠ garantía por defecto, ver `COMMERCIAL_TRUST_MATRIX.md`) — necesitan
una respuesta cada uno, nunca una política genérica de "devoluciones" que
los mezcle.

### Envíos (preguntas concretas)

- Cobertura retail (pedido individual, no mayorista): ¿de verdad es solo
  Soledad y Barranquilla, o existe algún caso real de envío individual a
  otra ciudad que hoy no se comunica?
- Dentro de Soledad/Barranquilla: ¿costo del envío (fijo, variable, gratis)?
- Resto de Colombia (hoy solo confirmado para mayoristas): ¿tiempos?
  ¿costos? ¿qué transportadora?
- ¿La opción de pago contraentrega aplica solo dentro de Soledad/Barranquilla
  o también en envíos nacionales?
- En un cambio de talla, ¿quién asume el costo del envío de vuelta y el de
  la sandalia nueva? (hoy el copy dice "el domicilio corre por cuenta de la
  clienta" — confirmar si eso cubre ambos trayectos o solo uno)

### Pagos (checklist de confirmación)

- [ ] Contraentrega local — ¿confirmado, sigue vigente?
- [ ] Nequi — ¿confirmado, sigue vigente?
- [ ] Daviplata — ¿confirmado, sigue vigente?
- [ ] Transferencia bancaria — ¿confirmado, sigue vigente?
- [ ] ¿Existe algún medio de pago nuevo no listado hoy (tarjeta, PSE, otro)?
- [ ] ¿Se requiere algún anticipo/abono antes de empezar a fabricar, o el
      pago completo es solo al recibir?

No se cambia nada en el sitio hasta confirmar cada casilla — hoy el código
ya solo muestra los 4 métodos de la lista, sin logos, y así se mantiene.

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
- **Políticas legales** (privacidad, términos y condiciones, cookies) — no
  existen hoy. No son necesarias para operar por WhatsApp sin checkout ni
  recolección de datos vía formulario, pero conviene evaluarlas si el
  negocio empieza a recolectar datos de otra forma (ver auditoría de
  confianza, § 20, en el reporte de Fase 7).
- **Social proof real** (reseñas, con nombre/inicial autorizada, ciudad si
  la persona lo autoriza, foto con autorización) — no se implementa ninguna
  UI vacía mientras no exista contenido real que mostrar.
- **Ampliar la paleta de colores** más allá de los 6 confirmados en Fase 8.2
  (Negro, Blanco, Miel, Beige, Café, Plateado), si el negocio empieza a
  fabricar en otros colores (sigue siendo una lista cerrada en código,
  cambiarla es una decisión de negocio + un cambio de código pequeño).
