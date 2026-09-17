# Maygel — Especificación de la homepage

> Fase 3 implementó esta estructura en `src/pages/index.astro`. Este
> documento describe el estado real construido — no una aspiración futura —
> salvo la sección final (Photography Production Needs), que sí es
> prospectiva.

## Orden de secciones (implementado)

1. **Header** — sticky, translúcido en scroll, nav ligera + CTA WhatsApp de texto.
2. **Hero editorial** (`Hero.astro`) — composición apilada de ancho completo:
   bloque visual (marcador de posición textil hasta que exista fotografía
   real) seguido de un titular corto ("Hecho despacio."), subtítulo de una
   línea y una única acción ("Descubrir la colección"). Se retiró el segundo
   CTA de WhatsApp del hero — WhatsApp sigue accesible desde el header.
3. **Declaración de marca** (`BrandManifesto.astro`) — bloque editorial
   oscuro, pausa de ritmo inmediatamente después del hero, antes de mostrar
   más producto.
4. **Colección** (`ProductGrid.astro` + `ProductCard.astro`) — catálogo con
   chips de categoría (visuales, filtrado funcional pendiente de otra fase).
   Cada tarjeta es un único enlace ("stretched link"): ya no hay enlaces
   duplicados en imagen y nombre.
5. **Editorial / artesanía** (`CraftMoment.astro`, nuevo) — imagen ancha
   asimétrica + una frase corta ("Cada par pasa por nuestras manos."). Rompe
   el ritmo del catálogo antes del producto destacado. Sin iconos de
   herramienta, sin infografía del proceso.
6. **Producto destacado** (`FeaturedProducts.astro`, reescrito) — ya no es un
   grid de tarjetas: muestra **un único producto**, determinado siempre por
   el primero marcado `destacado` según el orden real del catálogo (nunca
   aleatorio, nunca "el más nuevo"). Se oculta por completo si no hay ningún
   producto destacado — ver regla de datos en `ARCHITECTURE.md` § 4.1.
7. **Confianza** (`ComoComprar.astro`, retitulado "Así trabajamos") — 3 pasos
   del proceso + 3 afirmaciones de confianza reales (hecho bajo pedido,
   cambio de talla, atención directa), sin iconos ni badges. Información de
   entregas/pago se mantiene como texto de cierre, no como grid de
   especificaciones.
8. **Historia** (`About.astro`) — imagen + texto editorial de la historia
   familiar (contenido todavía provisional, marcado `TODO` en el código —
   ver `CONTENT_GUIDE.md`).
9. **Mayoristas** (`VentaMayor.astro`) — banda propia en superficie clara,
   beneficios reales + CTA de WhatsApp mayorista. Se retiró el acento de
   borde repetido por ítem (patrón de "badges") por una única línea divisoria
   sobre el grupo completo.
10. **Cierre editorial** (`CustomModelCTA.astro`, reposicionado) — última
    sección antes del footer, ahora en tratamiento oscuro (`section--dark`)
    para no repetir el hero y dejar una impresión final distinta. Invita a
    consultar un modelo propio — cierre personal, no transaccional.
11. **Footer** (`ContactFooter.astro`) — wordmark, contacto, navegación
    breve, Instagram, copyright.

**No implementado, con justificación:**
- *Social proof*: no existe contenido real (reseñas, menciones) — no se
  rellena con testimonios inventados.
- *Instagram/editorial embed*: solo enlazado en el footer; un embed real
  requeriría contenido real de la cuenta, no mockups.

## Objetivos de la homepage

- Que una visitante entienda en el primer scroll qué es Maygel y qué puede
  hacer (ver colección, escribir por WhatsApp).
- Que el catálogo se sienta como una colección editorial, no como una grilla
  de ecommerce genérica.
- Que la confianza se transmita por composición y contenido verificable, no
  por urgencia ni badges.
- Que el ritmo venga de escala, espacio, composición y densidad — no de
  alternar mecánicamente fondos claros y oscuros sección por sección.

## Comportamiento responsive (implementado)

- Hero: misma composición apilada (imagen arriba, texto abajo) en todos los
  anchos — se eliminó la versión "lado a lado" de escritorio para tener una
  sola composición consistente en vez de dos diseños distintos que mantener.
- Catálogo: 2 columnas en móvil, 3 en escritorio desde `1000px`.
- Producto destacado: apilado en móvil, imagen 60% / info 40% desde `900px`.
- Declaración de marca, cierre editorial y footer: siempre a ancho completo
  de fondo, con el texto acotado a una medida de lectura cómoda (`max-width`
  del bloque de texto, no del contenedor).
- Ninguna sección requiere scroll horizontal en ningún breakpoint
  (`375`–`1440px` verificado; `320` con salvedad de herramienta, ver entrega
  de Fase 3).

## Notas de gobierno

- **Ninguna sección puede diseñarse asumiendo un número fijo de productos.**
  Los 3 productos actuales son fixtures de desarrollo (ver `ARCHITECTURE.md`
  § 4.1) — catálogo y destacado deben probarse con 0, 1, 2–4 y muchos
  productos.
- Cualquier sección nueva debe justificar en una frase por qué se inserta ahí
  y no en otro punto — el orden comunica prioridad de negocio, no es
  arbitrario.
- Una sección sin contenido real que mostrar se omite, nunca se rellena con
  contenido de ejemplo permanente (ver `UX_RULES.md` § 10).

---

## Photography Production Needs

Especificación para una futura sesión fotográfica real. Hasta que estas fotos
existan, cada sección listada abajo sigue usando su marcador de posición
textil documentado en el código — nunca se reemplaza por stock, imágenes
generadas o mockups.

### HERO

- **Propósito:** primera impresión — producto como protagonista, atmósfera de
  taller/marca.
- **Encuadre:** plano abierto con espacio negativo generoso arriba o a un
  lado para que el titular respire si en el futuro se superpone texto.
- **Orientación:** horizontal ancha (el bloque actual usa alturas de
  `360px`–`760px` a ancho completo) — evitar retrato estrecho.
- **Luz:** natural, cálida, coherente con la paleta espresso/camel del
  sistema.
- **Desktop/mobile:** misma foto, recorte más alto en mobile si hace falta
  (la composición ya es apilada en ambos).

### PRODUCT (Clean Product)

- **Frontal:** sandalia completa, ángulo de 3/4 ligeramente elevado.
- **Lateral:** perfil completo, para mostrar la suela y el grosor de la tira.
- **Superior:** vista cenital, útil para mostrar el trenzado/patrón del cuero.
- **Detalle:** hebilla, costura o textura de cerca.
- **Ratio:** `4:5` vertical, fondo neutro o de contexto real del taller
  (nunca ciclorama de estudio genérico).
- **Propósito:** catálogo, ficha de producto, producto destacado.

### LIFESTYLE

- **Caminando:** sandalia en movimiento real, sin pose de stock.
- **De pie:** plano medio, sandalia visible con contexto de vestuario real.
- **Sentada:** plano relajado, coherente con el tono "calma" de marca.
- **Outfit completo:** plano completo mostrando cómo se usa la sandalia en un
  atuendo real.
- **Ratio:** `4:5` o `16:10` según composición.
- **Propósito:** secciones editoriales futuras, posible ampliación de
  "Cierre editorial" o "Editorial/artesanía".
- **No inventar** personas ni escenarios específicos — esta sesión requiere
  modelos/clientas reales confirmadas por el negocio.

### CRAFT

- **Manos:** proceso de fabricación, sin pose forzada.
- **Materiales:** cuero, hilo, suela — antes de convertirse en producto
  terminado.
- **Costuras:** detalle macro de la unión de piezas.
- **Proceso:** secuencia de un paso real de fabricación.
- **Ratio:** `21:9`/`32:9` (ancho, para la sección "Editorial/artesanía") o
  `4:5` si se usa en "Historia".
- **Propósito:** `CraftMoment.astro`, `About.astro`.

### STORY

- **Taller:** el espacio real de trabajo, no un estudio genérico.
- **Familia/equipo:** solo si el negocio confirma que quiere mostrar rostros
  reales — nunca modelos genéricos haciendo de "familia artesana".
- **Espacios reales:** el lugar donde se fabrica y se guarda el producto.
- **Ratio:** `4:3` (mobile) / `4:5` (desktop).
- **Propósito:** `About.astro` (Historia).

**Regla transversal:** ninguna de estas fotos se produce inventando un
escenario, un producto o una persona que no exista — esta lista describe qué
fotografiar de la realidad actual de Maygel, no qué crear de cero.
