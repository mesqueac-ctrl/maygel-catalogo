# Maygel — Sistema de naming, Colección 01 (Fase 8.6, aprobado en Fase 8.7)

> Continúa `docs/COLLECTION_01_DRAFT.md`. Este documento propuso nombres
> nuevos para los 10 modelos de esa colección, sin usar los nombres del
> flyer de proveedor como base (varios coinciden con marcas grabadas en la
> plantilla del producto — ver `COLLECTION_01_DRAFT.md` § 2 y § 5).
>
> **Fase 8.7 — estado: `APROBADO POR NEGOCIO`.** Los 10 nombres
> recomendados en § 3 (Luna, Deriva, Onda, Bruma, Nudo, Estela, Llana,
> Nácar, Trazo, Cristal) dejaron de ser propuestas — son los nombres
> oficiales de la Colección 01. Ver § 11 (nuevo) para la tabla de mapeo
> definitiva y el estado de foto oficial. **Nada de esto se implementó en
> código ni en base de datos** — sigue siendo documentación de
> planificación hasta que exista fotografía oficial y datos por modelo
> confirmados.

## 1. Reglas generales

- Nombre corto (1-2 palabras), fácil de pronunciar y escribir en español.
- Nunca depende del color (un nombre debe seguir siendo cierto si el mismo
  modelo se fabrica en otro color).
- Nunca describe literalmente toda la sandalia ("Sandalia de Tiras
  Blancas") — sugiere una sensación o un rasgo, no un inventario.
- Nunca hereda un nombre de proveedor/catálogo mayorista (ver los casos ya
  señalados: SEVEN, MS 99, BEYA).
- Sin clichés tropicales (palmera, playa, "verano eterno") — ver
  `BRAND_SYSTEM.md` § 11. Se descartaron a propósito nombres como "Arena",
  "Marea" o "Duna" por leerse demasiado cerca de ese cliché, aunque
  encajaban visualmente.
- El significado, si existe, debe poder explicarse en una frase honesta —
  nunca un nombre "bonito" sin ninguna relación real con el diseño.

## 2. Tres sistemas posibles

### Sistema A — Nombres femeninos refinados

Nombres propios de mujer, cortos y poco manidos (evitando los más comunes
tipo "Sofía"/"Valentina" para no sonar genérico).

- **Personalidad:** cercana, cálida, con sensación de historia personal —
  coherente con "taller familiar".
- **Ventajas:** muy fácil de recordar y pronunciar; refuerza la calidez
  humana de la marca.
- **Riesgos:** si se elige un nombre demasiado común, se vuelve genérico;
  mal ejecutado puede sonar a línea de perfumes en vez de moda artesanal.
- **Escalabilidad:** alta — hay cientos de nombres disponibles para
  colecciones futuras.
- **Coherencia con Maygel:** alta, ya existe una identidad familiar/
  femenina en la marca (ver `BRAND_SYSTEM.md` § "Feminidad contemporánea").

### Sistema B — Palabras evocadoras de luz, tierra y movimiento

Sustantivos comunes del español (no nombres propios) que evocan una
sensación sensorial: luz, textura, movimiento — sin nombrar directamente
un color, un material ni un lugar tropical.

- **Personalidad:** poética pero contenida, editorial — el mismo registro
  ya aprobado en `CONTENT_GUIDE.md` ("Hecho despacio", "No producimos en
  masa").
- **Ventajas:** evita el riesgo de sonar genérico de los nombres propios;
  cada nombre puede anclarse a un rasgo visual real del modelo (brillo →
  palabras de luz; volumen → palabras de textura suave).
- **Riesgos:** si se usa para los 10 modelos sin variar el campo semántico,
  puede sentirse repetitivo; algunas palabras abstractas necesitan una
  frase de apoyo para que se entienda la conexión con el diseño.
- **Escalabilidad:** alta — el campo semántico (luz, agua, tierra, aire,
  textura) es amplio y da para varias colecciones futuras sin repetirse.
- **Coherencia con Maygel:** muy alta — es la dirección que mejor conecta
  con la voz de marca ya cerrada en fases anteriores.

### Sistema C — Nombres cortos de sonoridad editorial

Palabras cortas, casi abstractas, elegidas más por sonido que por
significado literal (una sílaba o dos, estilo "nombre de marca de moda").

- **Personalidad:** moderna, minimalista, con estética de moda
  internacional.
- **Ventajas:** muy corto, se ve bien en tipografía grande, fácil de usar
  en `<title>`/SEO.
- **Riesgos:** el más alto de los tres — este es exactamente el patrón que
  `BRAND_SYSTEM.md` § 0 advierte ("si el wordmark pudiera ser de cualquier
  otra marca..."). Nombres bonitos pero sin significado real pueden sonar
  fríos para una marca que se apoya en ser un taller familiar.
- **Escalabilidad:** media — el repertorio de "palabras cortas bonitas" se
  agota rápido y se repite con otras marcas de moda.
- **Coherencia con Maygel:** media-baja — es el sistema menos alineado con
  la calidez que la marca ya decidió proyectar.

### Recomendación de sistema

**Sistema B como dirección principal**, con la puerta abierta a usar un
nombre del Sistema A puntualmente si un modelo específico pide más calidez
personal que un sustantivo abstracto (ninguno de los 10 lo necesitó en la
propuesta de abajo, pero queda documentado como opción futura).

## 3. Matriz de los 10 modelos (histórico de la propuesta — nombres ya `APROBADO POR NEGOCIO`, ver § 11)

| Nº | Nombre del flyer | 3 nombres propuestos | Recomendación (→ ahora oficial) | Significado / intención | Por qué encaja con la silueta |
|---|---|---|---|---|---|
| 1 | LUNA | Luna, Alba, Vela | **Luna** | Luz nocturna, brillo sutil, constante | Tiras finas con aplicación brillante + tobillera — el brillo discreto evoca un reflejo lunar, no una silueta cargada |
| 2 | SEVEN | Deriva, Cauce, Trazo | **Deriva** | Dejarse llevar, movimiento suave | Tira fina diagonal sobre el empeine — una sola línea que "fluye" sobre el pie, no una construcción compleja |
| 3 | CT CLASSIC | Onda, Cauce, Llana | **Onda** | Curva suave, ritmo tranquilo | Tiras anchas onduladas tipo mule — la palabra describe honestamente la forma ondulada de la tira, sin depender de material |
| 4 | SUMMER | Bruma, Nube, Vela | **Bruma** | Volumen ligero, suavidad difusa | Tiras anchas acolchadas cruzadas — la sensación de volumen suave se lee como una bruma, sin caer en cliché de playa/verano |
| 5 | NUDO | Nudo, Trazo, Liviana | **Nudo** | Gesto simple, hecho a mano | Ya es descriptivo y honesto — el diseño tiene un nudo decorativo real, no hace falta reemplazarlo |
| 6 | MS 99 | Estela, Eco, Nácar | **Estela** | Rastro de luz al moverse | Tira ancha con aplicación brillante tipo slide — "estela" conecta el brillo con el movimiento al caminar |
| 7 | BÁSICA | Llana, Seda, Seda | **Llana** | Sencillez, superficie suave y pareja | Tiras finas cruzadas, punta cuadrada — más elegante que un adjetivo de catálogo ("básica"), sin perder la sencillez real del diseño |
| 8 | BEYA | Nácar, Vela, Aura | **Nácar** | Brillo suave, nacarado | Tiras cruzadas con textura brillante — nácar describe un brillo real sin inventar un material específico |
| 9 | TIRAS | Trazo, Liviana, Llana | **Trazo** | Línea fina, gesto de dibujo | Tiras finas múltiples cruzadas — se leen como trazos, coherente con el diseño más minimalista de los 10 |
| 10 | TRANSPARENTE | Cristal, Vidrio, Bruma | **Cristal** | Claridad, transparencia | Tira ancha con detalle transparente — "cristal" describe la sensación visual sin repetir la palabra "transparente" del flyer |

**Ningún nombre recomendado se tomó de un logo o texto grabado visible en
las fotos del flyer** — ver `COLLECTION_01_DRAFT.md` § 5 para el detalle de
qué grabados se evitaron a propósito (SEVEN, MS 99, BEYA, el monograma "N").

## 4. Slugs conceptuales (no creados en DB)

| Nombre recomendado | Slug conceptual |
|---|---|
| Luna | `luna` |
| Deriva | `deriva` |
| Onda | `onda` |
| Bruma | `bruma` |
| Nudo | `nudo` |
| Estela | `estela` |
| Llana | `llana` |
| Nácar | `nacar` |
| Trazo | `trazo` |
| Cristal | `cristal` |

Todos únicos, sin acentos ni ñ (coherente con `slugify()` ya implementado
en `src/lib/productos.ts`) — no se creó ningún slug real, esto es solo la
forma que tomaría si el negocio aprueba el nombre.

## 5. Frases editoriales cortas (máximo 8 palabras)

| Modelo | Frase |
|---|---|
| Luna | "Brillo sutil en cada paso." |
| Deriva | "Una línea suave que acompaña tu andar." |
| Onda | "Curvas suaves, presencia tranquila." |
| Bruma | "Volumen ligero, abrazo suave al pie." |
| Nudo | "Un nudo simple, un gesto propio." |
| Estela | "Brillo que deja huella al caminar." |
| Llana | "Líneas cruzadas, sencillez con carácter." |
| Nácar | "Destellos suaves en cada cruce." |
| Trazo | "Tiras finas, trazo ligero y fresco." |
| Cristal | "Transparencia que resalta cada paso." |

Todas describen una sensación o un rasgo visual real (ver § 6 más abajo) —
ninguna menciona un material ni una prestación no confirmada.

## 6. Identidad visual observable por modelo

Para evitar nombres duplicados en diseños parecidos en futuras colecciones:

| Modelo | Rasgos observables |
|---|---|
| Luna | tiras finas, brillo, correa al tobillo |
| Deriva | tira fina diagonal, plana |
| Onda | tiras anchas onduladas, slide, tacón bajo |
| Bruma | tiras anchas acolchadas, cruzadas, slide, volumen |
| Nudo | tira ancha, nudo decorativo, slide |
| Estela | tira ancha, brillo, slide |
| Llana | tiras finas cruzadas, punta cuadrada, plana |
| Nácar | tiras cruzadas, brillo, tacón bajo |
| Trazo | tiras finas múltiples cruzadas, punta cuadrada, plana |
| Cristal | tira ancha, transparencia, punta cuadrada, plana |

## 7. Candidatos a modelo hero (3, sin marcar nada)

Basado en diferenciación visual, coherencia con Maygel, potencial de
fotografía premium, versatilidad para hero y claridad de silueta:

1. **Luna** — silueta más distintiva de los 10 (tobillera + brillo),
   funciona bien en una foto hero de cuerpo/pie completo.
2. **Bruma** — silueta más limpia y minimalista (volumen acolchado sobre
   fondo neutro), muy fotogénica para una composición editorial con mucho
   espacio negativo.
3. **Nudo** — el detalle físico del nudo da un punto focal claro y natural
   para una foto de detalle/craft, coherente con la familia "Craft" de
   `BRAND_SYSTEM.md` § 5.

## 8. Producto destacado (puede diferir del hero)

**Estado (Fase 8.7): `APROBADO PARA DIRECCIÓN VISUAL, PENDIENTE DE FOTO
FINAL`** — la elección de hero/destacados queda confirmada como dirección
de marca, pero no se escribe en DB (`destacado`) hasta tener foto oficial
real de cada uno.

- **Hero principal (de § 7):** Luna — la silueta con más personalidad para
  abrir la colección.
- **Producto destacado principal:** **Llana** — representa mejor la
  esencia "hecho a mano, sin ornamento" que ya define la marca; silueta
  simple, fácil de fotografiar bien incluso sin una sesión muy elaborada.
- **Segundo destacado:** **Trazo** — complementa a Llana sin repetir
  silueta (tiras finas múltiples vs. cruce simple), mantiene la sensación
  minimalista de la colección.

## 9. Nombre de la colección

**Recomendación: no hace falta nombrar la colección todavía.** Maygel
construye su identidad alrededor del nombre de cada modelo y de la
historia real del taller, no de campañas estacionales — bautizar una
"colección" ahora (sobre todo con solo 10 modelos sin fotografía propia
confirmada) se sentiría más cercano al lenguaje de moda rápida que
`BRAND_SYSTEM.md` § 11 pide evitar ("Un emprendimiento genérico de
Instagram"). Si en el futuro se justifica (por ejemplo, al lanzar una
segunda colección con una identidad claramente distinta de la primera), un
nombre sobrio como "Colección 01" ya cumple la función sin inventar un
concepto de marketing.

## 10. Preguntas — resueltas en Fase 8.7

- ~~¿El negocio aprueba reemplazar los 10 nombres del flyer por los
  nombres nuevos propuestos en § 3?~~ **Resuelto: sí, aprobado
  oficialmente.**
- ¿Hay algún nombre de la lista que ya esté en uso o registrado por otra
  marca que el negocio conozca? — sin respuesta todavía, no bloquea el
  avance (no se detectó ningún conflicto de marca registrada desde este
  entorno).
- Todo lo que ya estaba pendiente en `COLLECTION_01_DRAFT.md` **sigue
  pendiente igual** (colores reales por modelo, fotografía propia,
  disponibilidad, material superior) — la Fase 8.7 resolvió únicamente el
  nombre.

## 11. Mapeo oficial modelo → nombre (Fase 8.7)

| Orden | Nombre oficial | Referencia visual anterior (flyer) | Slug | Estado |
|---|---|---|---|---|
| 1 | Luna | "LUNA" | `luna` | NOMBRE APROBADO — FOTO OFICIAL PENDIENTE |
| 2 | Deriva | "SEVEN" | `deriva` | NOMBRE APROBADO — FOTO OFICIAL PENDIENTE |
| 3 | Onda | "CT CLASSIC" | `onda` | NOMBRE APROBADO — FOTO OFICIAL PENDIENTE |
| 4 | Bruma | "SUMMER" | `bruma` | NOMBRE APROBADO — FOTO OFICIAL PENDIENTE |
| 5 | Nudo | "NUDO" | `nudo` | NOMBRE APROBADO — FOTO OFICIAL PENDIENTE |
| 6 | Estela | "MS 99" | `estela` | NOMBRE APROBADO — FOTO OFICIAL PENDIENTE |
| 7 | Llana | "BÁSICA" | `llana` | NOMBRE APROBADO — FOTO OFICIAL PENDIENTE |
| 8 | Nácar | "BEYA" | `nacar` | NOMBRE APROBADO — FOTO OFICIAL PENDIENTE |
| 9 | Trazo | "TIRAS" | `trazo` | NOMBRE APROBADO — FOTO OFICIAL PENDIENTE |
| 10 | Cristal | "TRANSPARENTE" | `cristal` | NOMBRE APROBADO — FOTO OFICIAL PENDIENTE |

Los 10 slugs son compatibles con `slugify()` (`src/lib/productos.ts`):
minúsculas, sin acentos, sin espacios, sin caracteres especiales — **no se
creó ninguno en la base de datos**, se generará automáticamente al crear
cada producto real en el admin (ver `ARCHITECTURE.md` § slug: el slug se
autogenera del nombre y no se puede editar después de crear el producto).

## 12. Checklist conceptual para la futura carga en el admin

**No ejecutado — ni seed, ni API, ni DB, ni admin remoto.** Cuando exista
foto oficial y el negocio confirme los datos pendientes, cada uno de los
10 productos necesitará, en el formulario de `ProductoForm.astro`:

- [ ] Nombre (ya definido, ver § 11 — ej. "Luna")
- [ ] Precio: `60000` (global, no preguntar de nuevo)
- [ ] Precio con descuento: vacío salvo que el negocio confirme una oferta
      real
- [ ] Colores: marcar solo los confirmados para ese modelo específico
      (subconjunto de Plateado/Café/Miel/Beige/Blanco/Negro — ninguno
      confirmado todavía, ver `COLLECTION_01_DRAFT.md` § 3)
- [ ] Tallas: `Según pedido` (global, modo flexible ya soportado desde
      Fase 8.4)
- [ ] Descripción: la frase editorial de § 5, o una versión ajustada una
      vez exista foto real (debe seguir sin inventar materiales)
- [ ] Foto principal: la foto oficial de la sesión propia (nunca la foto
      del flyer/proveedor — ver `COLLECTION_01_DRAFT.md` § 4)
- [ ] Fotos por color: opcional, solo si existen
- [ ] Disponible: `sí`, salvo que el negocio diga lo contrario
- [ ] Destacado: marcar solo en Llana y/o Trazo si el negocio confirma la
      dirección de § 8 en el momento de cargar
- [ ] Categoría: dejar vacío salvo que el negocio confirme una taxonomía
      real (ver `ARCHITECTURE.md` § 9.3)

Material superior no aparece en esta checklist como campo propio — sigue
viviendo dentro de la descripción, y solo se menciona si el negocio lo
confirma por modelo (ver `COMMERCIAL_TRUST_MATRIX.md`).
