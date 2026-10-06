# Maygel — Borrador de la primera colección real (Fase 8.5, nombres aprobados en Fase 8.7)

> Este documento parte de un catálogo visual/comercial (flyer) recibido como
> referencia. **El flyer no es una fuente de verdad de negocio** — es
> material de referencia visual que puede contener texto, nombres, precios,
> marcas o datos de terceros que no pertenecen a Maygel. No se creó ningún
> producto real ni en local ni en remoto a partir de este documento.
>
> **Actualización Fase 8.7:** el negocio confirmó oficialmente los 10
> nombres propuestos en `COLLECTION_01_NAMING.md` — dejan de ser
> candidatos y pasan a `NOMBRE APROBADO`. Lo que sigue pendiente (colores
> reales por modelo, fotografía oficial, material superior, disponibilidad)
> **no cambió** — solo el nombre quedó resuelto. Ver la tabla de mapeo en
> `COLLECTION_01_NAMING.md` § 3 (actualizada) para la relación definitiva
> entre cada nombre aprobado y su referencia visual del flyer.

## 0. Contradicciones encontradas entre el flyer y las fuentes de verdad ya existentes

**Estas discrepancias son el hallazgo más importante de esta fase — antes de
usar cualquier dato del flyer, hay que resolverlas con el negocio.**

| Dato del flyer | Fuente de verdad actual | Discrepancia |
|---|---|---|
| WhatsApp: `+57 313 637 9874` | `src/consts.ts` → `WHATSAPP_NUMBER = "573243513189"` (+57 324 351 3189) | **Números distintos.** No se cambia el número configurado en el proyecto basándose en un flyer — se mantiene `consts.ts` como única fuente real hasta que el negocio confirme explícitamente cuál es el número vigente (¿cambió, o el flyer es de otro momento/proveedor?). |
| Instagram: `@maygel.co` | `src/consts.ts` → `INSTAGRAM_HANDLE = "maygelcr"` | **Handles distintos.** Mismo tratamion: no se cambia sin confirmación explícita. |
| Dominio: `www.maygel.co` | `astro.config.mjs` → `site: "https://www.maygel.co"` | Coincide — sin conflicto, no requiere acción. |
| "Envíos a todo el país" | `COMMERCIAL_TRUST_MATRIX.md`: Soledad (contraentrega), Barranquilla (domicilio pagado, ~$10.000–$15.000), Cartagena (solo mayorista) — **sin cobertura nacional confirmada para retail** | **No se usa esta frase del flyer.** Contradice directamente lo ya confirmado. Se mantienen las reglas reales documentadas. |
| Colores por modelo: Rosa, Azul, Marfil, Nude, Oro Rosado aparecen en el flyer | `COLORES_VALIDOS` confirmados: Negro, Blanco, Miel, Beige, Café, Plateado | **5 colores del flyer no están en la lista global confirmada.** No se inventan ni se agregan a `COLORES_VALIDOS` sin que el negocio los confirme explícitamente — ver § 3. |
| Nombres de modelo (LUNA, SEVEN, CT CLASSIC, MS 99, BEYA...) | — | Tratados como **candidatos**, no definitivos — ver § 2 y § 5 (varios coinciden textualmente con marcas grabadas en la plantilla de la foto, señal de que vienen de un proveedor externo, no de Maygel). |

## 1. Tabla de los 10 modelos

**Nombre: `APROBADO POR NEGOCIO` (Fase 8.7) para los 10.** Colores,
disponibilidad y fotografía definitiva siguen `PENDIENTE DE CONFIRMACIÓN`
— nada de eso cambió en esta fase, solo el nombre.

| Nº | Nombre oficial | Referencia visual (flyer) | Diseño visual (observación, sin material) | Colores confirmados | Estado |
|---|---|---|---|---|---|
| 1 | Luna | "LUNA" | Tacón bajo, tiras finas con aplicación brillante, tobillera | Ninguno — el flyer dice Rosa/Café/Beige/Negro, ninguno verificado por modelo todavía | NOMBRE APROBADO — resto PENDIENTE |
| 2 | Deriva | "SEVEN" | Sandalia plana, tira fina diagonal sobre el empeine | Ninguno — el flyer dice Café/Blanco/Beige/Negro/Azul (Azul no está en la lista global) | NOMBRE APROBADO — resto PENDIENTE |
| 3 | Onda | "CT CLASSIC" | Tipo mule/slide, tiras anchas onduladas, tacón bajo cuadrado | Ninguno — el flyer dice Blanco/Negro/Miel (los 3 sí están en la lista global, pero no confirmados por modelo) | NOMBRE APROBADO — resto PENDIENTE |
| 4 | Bruma | "SUMMER" | Slide, tiras anchas acolchadas cruzadas | Ninguno — el flyer dice Marfil (no está en la lista global) | NOMBRE APROBADO — resto PENDIENTE |
| 5 | Nudo | "NUDO" | Slide plano, tira ancha con nudo decorativo | Ninguno — el flyer dice Miel (sí está en la lista global, no confirmado por modelo) | NOMBRE APROBADO — resto PENDIENTE |
| 6 | Estela | "MS 99" | Slide plano, tira ancha con aplicación brillante | Ninguno — el flyer dice Nude (no está en la lista global) | NOMBRE APROBADO — resto PENDIENTE |
| 7 | Llana | "BÁSICA" | Plana, tiras finas cruzadas, punta cuadrada | Ninguno — el flyer dice Blanco (sí está en la lista global, no confirmado por modelo) | NOMBRE APROBADO — resto PENDIENTE |
| 8 | Nácar | "BEYA" | Tacón bajo, tiras cruzadas con textura brillante | Ninguno — el flyer dice Oro Rosado (no está en la lista global) | NOMBRE APROBADO — resto PENDIENTE |
| 9 | Trazo | "TIRAS" | Plana, tiras finas múltiples cruzadas, punta cuadrada | Ninguno — el flyer dice Blanco (sí está en la lista global, no confirmado por modelo) | NOMBRE APROBADO — resto PENDIENTE |
| 10 | Cristal | "TRANSPARENTE" | Plana, tira ancha con detalle transparente, punta cuadrada | Ninguno — el flyer dice Negro (sí está en la lista global, no confirmado por modelo) | NOMBRE APROBADO — resto PENDIENTE |

**Disponibilidad y fotografía definitiva siguen `PENDIENTE DE
CONFIRMACIÓN` para los 10 modelos, sin excepción.**

## 2. Nomenclatura — mantener / revisar (histórico — resuelto en Fase 8.7)

**Superado por la aprobación oficial de Fase 8.7** (ver § 1 de este
documento y `COLLECTION_01_NAMING.md`) — se deja esta tabla como registro
histórico de por qué se recomendó revisar cada nombre del flyer, no como
estado vigente.

| Nombre del flyer | Mantener / revisar | Motivo | Alternativa conceptual A | Alternativa conceptual B |
|---|---|---|---|---|
| LUNA | Mantener | Nombre evocador genérico, sin coincidencia visible con el grabado de la plantilla en la foto | Sandalia Luna | Brillo Luna |
| SEVEN | **Revisar** | El texto grabado en la plantilla de la foto coincide con "Seven" — señal fuerte de que es el nombre comercial de otro proveedor, no de Maygel | Sandalia Esencial | Correa Diagonal |
| CT CLASSIC | **Revisar** | "CT" tiene forma de código/referencia de catálogo mayorista, no de nombre de marca; la foto muestra empaque con referencias impresas de proveedor | Sandalia Clásica | Minimal |
| SUMMER | Revisar (leve) | Nombre genérico en inglés que coincide con el grabado parcial visible en la plantilla | Sandalia Nube | Suave |
| NUDO | Mantener | Nombre descriptivo honesto del diseño real (nudo decorativo en la tira); el logo "N" grabado en la plantilla no coincide con el nombre en sí | Sandalia Nudo | Trenza Suave |
| MS 99 | **Revisar (fuerte)** | Formato de código de catálogo mayorista, sin significado de marca; la foto de fondo muestra libros con nombres de marcas de lujo de terceros (ver § 4) | Sandalia Nude | Elegancia Simple |
| BÁSICA | Mantener | Nombre descriptivo genérico y coherente con la marca, sin coincidencia visible con grabados de terceros | Sandalia Básica | Tiras Cruzadas |
| BEYA | **Revisar** | El grabado "beya" en la plantilla coincide con el nombre — mismo patrón que SEVEN/MS 99: nombre heredado del proveedor, no creado por Maygel | Sandalia Brillante | Oro Rosado (si se confirma ese color) |
| TIRAS | Mantener | Nombre descriptivo genérico y honesto, sin coincidencia visible de terceros | Tiras Blancas | Frescura |
| TRANSPARENTE | Revisar (leve) | Describe honestamente el material visible de la tira, pero la plantilla también parece tener texto grabado — confirmar si el diseño es exclusivo de Maygel | Sandalia Cristal | Correa Transparente |

**No se renombra ningún modelo en esta fase** — esta tabla es solo la
evaluación pedida, para que el negocio decida.

## 3. Colores que necesitan confirmación por modelo

Ningún color está confirmado por modelo todavía — el flyer es una
referencia visual, no una confirmación de negocio. Además, estos 5 colores
del flyer **no existen en la lista global confirmada**
(`COLORES_VALIDOS`: Negro, Blanco, Miel, Beige, Café, Plateado) y no se
deben agregar sin decisión explícita del negocio:

- Rosa (LUNA)
- Azul (SEVEN)
- Marfil (SUMMER)
- Nude (MS 99)
- Oro Rosado (BEYA)

Para cada uno de los 10 modelos, antes de publicar, el negocio debe
confirmar: **en qué colores de la lista global de 6 fabrica realmente ese
modelo específico** (puede ser un subconjunto distinto por modelo — no se
asume que todos los modelos existen en los 6 colores).

**RESUELTO (Fase 13.4).** El negocio confirmó explícitamente que los 10
modelos publicados de la Colección 01 (Luna, Deriva, Onda, Bruma, Nudo,
Estela, Llana, Nácar, Trazo, Cristal) pueden fabricarse en los 6 colores de
`COLORES_VALIDOS` (Negro, Blanco, Miel, Beige, Café, Plateado). Ya no es un
dato pendiente — no se necesita ningún cambio en UI ni en los datos de
producto, que ya reflejan correctamente los 6 colores por modelo.

## 4. Clasificación de fotografías

| Nº | Modelo | Clasificación | Motivo |
|---|---|---|---|
| 1 | LUNA | C — Solo referencia | La plantilla de al menos dos pares tiene un texto/logo cursivo grabado que no es de Maygel — es parte física del producto fotografiado, no algo que un recorte pueda quitar |
| 2 | SEVEN | C — Solo referencia | Grabado en la plantilla coincide con el nombre del modelo — marca de origen de un proveedor externo, inherente al producto |
| 3 | CT CLASSIC | C — Solo referencia | Empaque/caja de proveedor con referencias impresas visible en el encuadre |
| 4 | SUMMER | C — Solo referencia | Grabado de plantilla + bolso acolchado y cadena dorada de fondo (props ajenos a Maygel) |
| 5 | NUDO | C — Solo referencia | Logo/monograma "N" grabado en la plantilla — marca de terceros inherente al producto; fondo con busto decorativo ajeno |
| 6 | MS 99 | **C — Solo referencia (riesgo alto)** | Fondo muestra libros con los nombres "GUCCI" y "Dior" claramente legibles — asociar a Maygel con marcas de lujo de terceros es un riesgo real de marca, no solo estético |
| 7 | BÁSICA | B — Requiere edición | Fotografía relativamente limpia; tiene un bolso azul de fondo que no es de Maygel y podría recortarse/reencuadrarse |
| 8 | BEYA | C — Solo referencia | Grabado "beya" en la plantilla (coincide con el nombre) + fondo con lo que parece una revista/foto de personas ajena |
| 9 | TIRAS | B — Requiere edición (la más cercana a publicable) | Sin marca de terceros visible en la plantilla ni fondo evidente; aun así, no se confirmaron los derechos de uso de esta fotografía como propia de Maygel |
| 10 | TRANSPARENTE | C — Solo referencia | La plantilla también parece tener texto grabado adicional al nombre del modelo |

**Ninguna imagen se clasifica como A (publicable directa)** — incluso las
más limpias (TIRAS, BÁSICA) requieren primero confirmar que Maygel tiene
derecho real de uso sobre la fotografía, algo que un flyer de referencia no
demuestra por sí solo. **No se editó ninguna imagen en esta fase** — la
recomendación para el catálogo real sigue siendo la sesión fotográfica
propia descrita en `PHOTOGRAPHY_BRIEF.md`.

## 5. Riesgo de marcas de terceros — resumen

El patrón que se repite en la mayoría de las fotos (grabado en la plantilla
que coincide textualmente con el nombre del modelo del flyer: SEVEN, MS 99,
BEYA, y el monograma "N" de NUDO) indica que **este flyer probablemente
reutiliza fotografías de catálogo de un proveedor mayorista**, no fotos
propias de Maygel. Consecuencias que se deben evitar, tal como pide el
brief:

- No estructurar esos nombres grabados como si fueran de Maygel.
- No copiarlos a `alt`, SEO, `<title>` ni JSON-LD.
- No tratar "GUCCI"/"Dior" (visibles de fondo en la foto de MS 99) como
  contenido asociable a Maygel de ninguna forma.
- Maygel sigue siendo la única marca comercial de la web — cualquier texto
  de tercero visible en una foto de referencia se queda fuera del producto
  final.

## 6. Catálogo web con 10 productos — evaluación de arquitectura

- **Grid:** ya soporta 0/1/2/3+ (`ProductGrid.astro`) — 10 productos caen en
  el caso "3+", sin cambios necesarios.
- **Responsive:** ya verificado en fases anteriores (2 columnas desde
  480px, 3 desde 1000px) — sin cambios necesarios para 10 ítems.
- **Producto destacado:** ya soportado (`FeaturedProducts.astro`, un solo
  destacado, el primero por orden) — ver § 7 para candidatos, sin marcar
  nada en DB.
- **Orden/navegación:** ya soportado (`ordenar.astro`, reordenamiento
  staged) — sin cambios necesarios.
- **Performance:** sin impacto arquitectónico por pasar de 3 a 10 productos
  — el pipeline de `<Image>` ya genera variantes responsive por foto; lo
  que sí impacta performance es el peso real de las fotos finales, no la
  cantidad de productos.
- **Filtros:** según la escala ya documentada en `ARCHITECTURE.md` § 9.3
  (1–8 sin filtros, 9–24 evaluar categorías ligeras, 25+ arquitectura
  completa), **10 productos ya caen en el rango donde evaluar un filtro
  simple aporta valor** — pero no se construye automáticamente. Recomendación:
  esperar a que el negocio confirme una taxonomía real (ver § 7) antes de
  activar cualquier filtro, para no repetir el error ya documentado de
  chips decorativos sin filtrado funcional (`ARCHITECTURE.md` § 9.3).

## 7. Categorías — evaluación, no aprobación

La taxonomía actual (`CATEGORIAS_VALIDAS`: Brillos, Tiras, Trenzadas,
Clásicas, Elegantes) sigue siendo provisional. Con los 10 diseños reales
del flyer como referencia visual (no como confirmación), las categorías
mínimas que *podrían* tener sentido, a evaluar con el negocio:

- **Planas / slide** (sin tiras al tobillo): CT CLASSIC, SUMMER, NUDO, MS 99
- **Con tira al tobillo**: LUNA, SEVEN (parcial), BÁSICA
- **Con brillo / aplicación**: LUNA, MS 99, BEYA
- **Tiras finas cruzadas**: BÁSICA, TIRAS

**No se aprueba ninguna categoría automáticamente** — son observaciones
visuales, no una taxonomía de negocio confirmada. Evitar categorías de
marketing inventadas (ninguna de las anteriores lo es, pero cualquier
nombre final debe pasar por confirmación real antes de usarse en
`CATEGORIAS_VALIDAS`).

## 8. Candidatos a producto destacado (sin marcar en DB)

Basado en diferenciación visual, claridad de fotografía, coherencia con
Maygel y capacidad de representar la colección:

1. **TIRAS** — la foto más limpia de las 10 (sin marca de terceros visible
   en la plantilla ni fondo problemático), diseño simple y reconocible.
2. **BÁSICA** — segunda foto más limpia, nombre y diseño coherentes con el
   registro de marca de Maygel (sencillo, sin ornamento).
3. **LUNA** — mayor diferenciación visual (aplicación brillante, varios
   colores mostrados juntos), aunque su fotografía sí muestra grabados de
   plantilla que habría que resolver antes de usarla como destacado real.

Ninguno de los tres se marca como `destacado` en la base de datos — es una
recomendación para cuando el negocio confirme el modelo y exista una foto
propia real.

## 9. Datos que faltan para publicar cada modelo

Reutilizando la plantilla ya definida en `REAL_CATALOG_INPUT.md` (los
campos globales — precio $60.000, fabricación bajo pedido, suela de goma,
talla "Según pedido", disponible=sí — no se piden de nuevo por modelo):

Por cada uno de los 10 modelos falta:

- Nombre definitivo (ver § 2 — varios candidatos están en revisión).
- Slug: se autogenera del nombre una vez esté definitivo (no antes).
- Foto principal oficial (ninguna de las 10 fotos del flyer está lista
  para publicarse — ver § 4).
- Colores reales que Maygel fabrica para ese modelo específico, del
  subconjunto de los 6 confirmados (ver § 3 — ninguno confirmado todavía).
- Detalle visual breve real (puede redactarse ya, de forma neutral, a
  partir de la columna "Diseño visual" de § 1, sin inventar materiales).
- Material superior, solo si el negocio lo confirma (sigue sin confirmar
  para todo el catálogo).
- Disponibilidad (asumir "sí" salvo que el negocio diga lo contrario).

## 10. Confirmación

- No se creó ningún producto, ni local ni remoto, a partir de este
  documento.
- No se ejecutó ningún seed, llamada al admin ni escritura en DB.
- No se hizo deploy ni cambio al catálogo público.
- No se copió el número de WhatsApp ni el handle de Instagram del flyer al
  código — se mantienen los ya configurados en `consts.ts` (ver § 0).
- No se usó la frase "Envíos a todo el país" en ningún documento como regla
  real.
- No se trató ningún nombre o logo grabado en las fotos como marca de
  Maygel.

## 11. Estado real de producción (Fase 10 — actualización post-deploy)

Los 10 modelos ya son productos reales, creados vía admin, publicados y
desplegados (Fases 8.9C–9.6). Esta sección registra el estado comercial que
queda pendiente sobre ellos, para no perderlo de vista.

**Fotografía — 4 modelos con branding de proveedor visible, decisión de
negocio: dejarlas así por ahora (Fase 10, "dejalas asi").**

| Modelo | Branding visible | Dónde | Decisión |
|---|---|---|---|
| Nácar | Monograma dorado "sunburst + A" | Plantilla/suela interior | Se mantiene la foto actual — `IMAGEN TEMPORAL, PENDIENTE REEMPLAZO POR FOTO REAL` |
| Onda | Texto "CT SHOES" | Plantilla/suela interior | Ídem |
| Bruma | Monograma dorado "sunburst + A" | Plantilla/suela interior | Ídem |
| Estela | Texto "MS" | Plantilla/suela interior | Ídem |

No existe, dentro del lote de 9 fotos temporales ya usado, ninguna imagen
limpia sin asignar que pueda sustituirlas sin generar un nuevo problema
(reutilizar la foto de otro modelo ya nombrado). Quedan así hasta la sesión
de fotografía oficial — ver `COLLECTION_01_PHOTO_PLAN.md`.

**Precio — RESUELTO (Fase 10.2).**

El negocio confirmó explícitamente: **todos los modelos de la Colección 01
son sandalias planas.** Precio normal oficial para los 10: **$45.000 COP**
(Luna, Deriva, Onda, Bruma, Nudo, Estela, Llana, Nácar, Trazo, Cristal —
actualizado vía admin, sin editar DB directamente). Esto reemplaza la nota
anterior de Fase 9.4 que dejaba Luna y Nácar en $60.000 por "tacón bajo
documentado" — la confirmación explícita del negocio en Fase 10.2 tiene
prioridad sobre esa observación visual previa.

Los descuentos (`precioOferta`) siguen siendo un mecanismo opcional,
producto por producto — ningún modelo tiene oferta activa por defecto. Ver
`BUSINESS_INPUTS.md` para el detalle del sistema.
