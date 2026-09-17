# Maygel — Brief de fotografía y video (Quiet Colombian Craft)

> Documento operativo para encargar/planificar la sesión fotográfica real de
> Maygel. Complementa (no repite) `docs/HOMEPAGE_SPEC.md` § Photography
> Production Needs y `docs/BRAND_SYSTEM.md` § 5 — este documento es el brief
> que se le entrega a quien fotografíe, con shot lists, plan de día y
> estándar técnico concretos. Nada de esto se produce todavía; es la
> especificación para cuando se agende la sesión.

## Dirección general

Quiet Colombian Craft: **calma, artesanía, moda, calidez, calidad,
autenticidad.** Cada foto debe poder sostenerse sola como imagen editorial —
nunca sentirse como catálogo de inventario ni como contenido genérico de
redes.

**Evitar siempre:**
- Fondos chillones o saturados.
- Estética tropical cliché (palmeras, colores bandera, patrones "étnicos"
  genéricos — ver `BRAND_SYSTEM.md` § 11).
- Props excesivos o escenografía "montada".
- Composiciones sobrecargadas (más de 1-2 elementos de contexto por foto).
- Filtros fuertes, viñetas, look "vintage" de post-producción.
- Flash directo/duro — solo luz suave, natural o difusa.
- Look de marketplace (fondo blanco puro de estudio genérico, producto
  centrado sin contexto, iluminación plana).
- Stock genérico o modelos que no sean reales/autorizados.

## Las 4 familias (qué fotografiar)

### A. Clean Product — mostrar claramente la sandalia

**Objetivo:** que se entienda el modelo completo sin ambigüedad — es la base
funcional del catálogo y la PDP.

**Por cada modelo real, necesitamos:**
- Frontal
- Lateral (perfil completo, para ver grosor de tira/suela)
- Superior (cenital, para ver el patrón/trenzado)
- 3/4 (ángulo elevado, la vista "hero" del modelo)
- Suela (solo si aporta valor real — ej. si el negocio quiere mostrar
  antideslizante confirmado, ver `COMMERCIAL_TRUST_MATRIX.md` antes de
  afirmarlo en copy)
- Detalle de textura (cuero/material de cerca)
- Detalle de costura/unión
- Detalle de acabados (hebilla, remate, tinte)

**Ratios:** `4:5` principal (vertical, coincide con el `aspect-ratio` real
usado hoy en `ProductCard`/PDP — ver `DESIGN_SYSTEM.md`), `1:1` opcional
para redes, horizontal solo si una sección web lo pide explícitamente (no
producir de más "por si acaso").

**Fondos:** marfil, piedra, arena, neutros cálidos — nunca blanco de estudio
puro ni color saturado.

**Luz:** suave, natural o difusa, sombras delicadas (nunca sombra dura de
flash directo).

### B. Lifestyle — mostrar cómo se ve puesta

**Objetivo:** que una clienta se imagine usándola, sin que la foto compita
visualmente con el producto.

**Necesitamos:**
- Caminando
- De pie (plano medio)
- Sentada (plano relajado, tono "calma")
- Detalle del pie con la sandalia puesta
- Cuerpo completo (outfit real)
- Plano medio
- Movimiento natural (no pose de stock)

**Outfits sugeridos (de quien fotografíe/modele, no diseñar vestuario
llamativo):** denim, blanco, lino, negro, tonos tierra — cualquier outfit que
no compita en color/estampado con la sandalia.

**Regla dura:** no fotografiar a nadie sin su autorización explícita, y no
inventar un escenario o persona que no exista (ver `HOMEPAGE_SPEC.md` §
Photography Production Needs, regla transversal).

### C. Craft — demostrar que existe trabajo humano real

**Objetivo:** la familia que distingue "boutique bonita" de "Maygel" — ver
`BRAND_SYSTEM.md` § 5.

**Necesitamos:**
- Manos trabajando
- Materiales (cuero, hilo, suela, antes de convertirse en producto)
- Corte
- Armado
- Costuras/uniones (detalle macro)
- Detalles del proceso
- Herramientas
- Producto a medio hacer
- Acabado final

**Regla dura: no fingir procesos.** Fotografiar únicamente lo que Maygel
realmente hace, en su taller real, en el orden real de su proceso — nunca
recrear un paso que no ocurre así en la práctica.

### D. Story — dar humanidad a Maygel

**Objetivo:** material para "Sobre Maygel" (`About.astro`) y cualquier
momento editorial que necesite contexto humano.

**Puede incluir (según lo que la familia autorice):**
- Espacio real de trabajo (el taller, no un estudio genérico)
- Retrato de la mamá del propietario (si ella quiere aparecer)
- Equipo/familia, si desean aparecer
- Materiales, mesa de trabajo, momentos reales

**Si no quieren aparecer en cámara:** la historia se cuenta igual con manos,
espacio y objetos reales — nunca se obliga a nadie a salir en una foto, y
nunca se sustituye por un modelo genérico "actuando" de familia artesana.

## Hero — spec exacta

- **Orientación:** horizontal ancha.
- **Ratio:** el bloque actual usa alturas de `360px`–`760px` a ancho
  completo (ver `HOMEPAGE_SPEC.md`) — encargar la foto en una relación de
  aspecto ancha (ej. `16:9` a `21:9`) para que recorte bien a esas alturas
  sin perder el sujeto.
- **Espacio negativo:** generoso arriba o a un lado, para que el titular
  ("Hecho despacio.") pueda superponerse sin tapar el producto — hoy el
  titular vive debajo de la imagen (composición apilada), pero dejar aire
  real permite decidir superponer texto en el futuro sin rehacer la sesión.
- **Posición del producto/persona:** no centrado a la fuerza — dejar que la
  composición real (persona caminando, producto en primer plano) ocupe un
  tercio de la imagen, no el centro geométrico exacto.
- **Luz:** natural, cálida, coherente con la paleta espresso/camel del
  sistema (`DESIGN_SYSTEM.md`).
- **Fondo:** contexto real (taller, exterior con luz cálida) — nunca un
  fondo de estudio genérico.
- **Uso desktop:** foto completa a ancho de pantalla.
- **Uso mobile:** la composición hoy es apilada igual en mobile y desktop
  (`HOMEPAGE_SPEC.md` § responsive) — pedir un crop vertical seguro de la
  misma foto (no una segunda sesión) que conserve el sujeto principal
  encuadrado si el recorte automático lo desplaza.
- **Mínimo necesario:** 1 foto hero + 1 crop mobile verificado de esa misma
  foto (no dos fotos distintas, salvo que el encuadre horizontal
  simplemente no funcione recortado).

## Craft Moment — spec exacta

La sección `CraftMoment.astro` usa hoy un formato panorámico ancho
(`21:9`/`32:9`, ver `HOMEPAGE_SPEC.md` § CRAFT) con un crop horizontal
agresivo — necesita una foto pensada para ese recorte, no una foto vertical
recortada a la fuerza.

- Sujeto: manos trabajando o materiales, con textura real visible.
- Composición: espacio negativo real a los lados (la imagen se ve muy
  ancha y corta en altura — el sujeto no puede estar centrado en una
  composición pensada para una foto cuadrada).
- Encargar explícitamente en formato panorámico desde la toma, no confiar en
  que un recorte posterior de una foto vertical se vea bien.

## Producto destacado — spec exacta

`FeaturedProducts.astro` muestra un único producto en composición 60% imagen
/ 40% info desde `900px` (ver `HOMEPAGE_SPEC.md`).

- Más editorial que las fotos de catálogo — el mismo modelo puede tener una
  toma "hero" propia además de sus fotos de Clean Product estándar.
- Composición limpia, buen espacio alrededor del producto (no tan ajustada
  como la vista frontal de catálogo).
- Debe funcionar recortada tanto a la proporción de escritorio (imagen
  ancha) como apilada en mobile — pedir verificación de ambos recortes en la
  misma sesión.

## Mayoristas — spec exacta

1-2 imágenes más neutras y comerciales que las de lifestyle, pensadas para
reutilizarse en varios contextos:

- Catálogo mayorista (si se produce un PDF en el futuro).
- Banner de la sección `VentaMayor.astro`.
- Envío directo por WhatsApp cuando alguien pregunta por mayoreo.

Composición: producto(s) agrupados mostrando variedad de color, luz pareja,
sin modelo puesto (para que se lea como catálogo comercial, no lifestyle).

## Redes — shot list adicional

**No es una estrategia social completa** — solo asegurar que el material de
la misma sesión sirva también para redes, sin producir contenido aparte.

### Instagram feed
- Ratio `4:5`.
- Producto (Clean Product reutilizado).
- Lifestyle (reutilizado).
- Detalle (Craft reutilizado).
- Craft (reutilizado).

### Stories / Reels
- Ratio `9:16`.
- Caminando.
- Close-up de detalle.
- Fabricación (craft en movimiento).
- Cambio de ángulo del mismo producto.
- Empaque, si existe empaque real (no inventar uno para la foto).

## Video

Si es posible durante la misma sesión, clips cortos (**3-8 segundos** cada
uno):

- Manos trabajando.
- Sandalia caminando.
- Detalle de materiales.
- Producto girando (mesa giratoria o mano sosteniendo).
- Empaque, si existe.
- Selección de colores (mano pasando sobre las opciones).

**Formato:** `9:16` prioritario (redes/stories); algunos `16:9` adicionales
solo si se consideran útiles para web (ej. un clip de fondo en una sección
editorial futura) — no producir `16:9` por defecto si no hay un uso claro.

## Estándar técnico

- **Master:** JPEG de alta calidad, HEIC, o RAW original — **sin compresión
  destructiva** en el archivo maestro. El master nunca se edita ni se
  comprime directamente dentro de `/public`; las versiones web se generan
  después vía el pipeline de `<Image>` de Astro/Vercel (ya implementado,
  ver `PERFORMANCE_RULES.md`).
- **Resolución mínima:** al menos 3000px en el lado más largo para fotos de
  producto (permite recortes/variantes responsive sin perder nitidez);
  video mínimo 1080p, preferible 4K si el equipo lo permite.
- **Orientación:** consistente con la familia (vertical para Clean
  Product/Lifestyle, panorámica para Craft Moment, según especificado
  arriba) — no mezclar orientaciones dentro de la misma familia sin razón.
- **Consistencia de color:** mismo balance de blancos/tono cálido a lo largo
  de toda la sesión, para que las fotos de distintos modelos no se vean
  editadas por personas distintas.

## Nomenclatura de archivos

Esquema: `{familia}-{modelo-o-tema}-{color-si-aplica}-{tipo}-{numero}.ext`

**Ejemplos:**
- `producto-trenzada-miel-frontal-01.jpg`
- `producto-trenzada-miel-lateral-01.jpg`
- `producto-trenzada-miel-detalle-costura-01.jpg`
- `lifestyle-trenzada-miel-caminando-01.jpg`
- `craft-manos-01.jpg`
- `craft-materiales-cuero-01.jpg`
- `story-taller-01.jpg`
- `story-retrato-mama-01.jpg`
- `mayorista-grupo-colores-01.jpg`

**Nunca** entregar/organizar el archivo final como `IMG_7382.jpg` o
similares — renombrar antes de entregar al equipo de desarrollo, para que
subirlas al admin (que ya permite nombre de archivo libre vía Blob) sea
trazable.

## Shoot Day Plan

Organizado para una sola sesión eficiente, en bloques:

1. **Producto limpio** (Clean Product, todos los modelos — hacerlo primero
   mientras la luz y el equipo están recién montados y el producto sin usar
   se ve impecable).
2. **Detalles** (macro de costura/textura/acabado, mismos modelos, mismo
   set).
3. **Craft** (manos, materiales, proceso — cambiar a la zona real de
   trabajo).
4. **Lifestyle** (requiere modelo/persona real — agendar cuando esa persona
   esté disponible, idealmente con luz natural de exterior si aplica).
5. **Historia** (retrato/ambiente del taller y familia, si autorizan).
6. **Video vertical** (aprovechar los mismos setups ya montados de craft y
   lifestyle para capturar clips, en vez de volver a armar cada escena).

## Shot count (meta aproximada, no rígida)

**Por modelo:**
- Clean: 5-8 fotos.
- Lifestyle: 4-8 fotos.
- Detail: 3-5 fotos.
- Video: 3-5 clips.

**General (una sola vez, no por modelo):**
- Craft/Story: 15-30 assets totales.

## Prioridad de assets

**MUST HAVE (necesario para lanzar catálogo):**
- Clean Product frontal + 3/4 de cada modelo real que se vaya a publicar.
- 1 foto hero + su crop mobile.
- 1 foto para "producto destacado" (puede reutilizar una toma de Clean
  Product si no da tiempo a una toma editorial aparte).

**SHOULD HAVE (sube el nivel de marca):**
- Lifestyle de al menos los modelos más representativos del catálogo.
- Craft (proceso real) para reforzar la sección de historia/manifiesto.
- Craft Moment (foto panorámica dedicada).

**NICE TO HAVE (contenido extra):**
- Story/retratos de familia.
- Mayoristas (imágenes comerciales dedicadas).
- Shot list de redes (feed + stories) más allá de lo ya cubierto arriba.
- Video.
