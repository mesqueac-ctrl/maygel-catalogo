# Maygel — Borrador visual interno, Colección 01 (Fase 8.9A)

> **BORRADOR — REFERENCIA VISUAL — NO OFICIAL.** Todo lo que contiene este
> documento parte de imágenes de proveedor/stock ya auditadas y rechazadas
> como fotografía oficial (ver el reporte de auditoría de Fase 8.9, imágenes
> con logos de terceros como el monograma dorado, "CT SHOES" y "Karo
> Vargas"). Se usan aquí **únicamente** para: dirección visual interna,
> mockups de catálogo, piezas de Instagram/WhatsApp de trabajo, orden y
> jerarquía de la colección, selección provisional de hero/destacados, y
> asociación provisional nombre↔modelo. **Nada de esto es fabricación real,
> ningún dato comercial nuevo se afirma aquí, y nada se implementó en
> código ni en base de datos.**

## 0. Uso interno propuesto

Estas 10 imágenes pueden servir, mientras no exista fotografía oficial
(`COLLECTION_01_PHOTO_PLAN.md`), para:

- Maquetar cómo se vería el grid de catálogo con 10 productos reales (sin
  publicarlo).
- Preparar piezas internas de trabajo para Instagram/WhatsApp (ej. "así se
  verá la colección"), siempre marcadas como borrador si se comparten fuera
  del equipo.
- Decidir el orden/jerarquía visual de la colección antes de la sesión
  fotográfica real.
- Probar la dirección de hero/destacados con una imagen de referencia en
  vez de un rectángulo vacío.
- Servir de referencia de "a qué modelo nos referimos" en conversaciones
  internas, sin que eso implique que el diseño final será idéntico.

**No deben usarse** para publicar en redes reales como si fueran fotos de
producto, ni para prometer a una clienta un diseño exacto — ver
`COLLECTION_01_DRAFT.md` § 5 sobre el riesgo de marca de terceros.

## 1. Mapeo provisional imagen → nombre aprobado

| Nombre (slug) | Imagen asignada | Confianza del mapeo | Motivo / advertencia | Estado |
|---|---|---|---|---|
| Onda (`onda`) | Foto 3 (tres pares, tiras anchas onduladas, mule) | **Alta** | Coincide exactamente con la identidad visual ya definida ("tiras anchas onduladas, slide, tacón bajo") — es literalmente la referencia original de este modelo | `BORRADOR VISUAL` — `FOTO OFICIAL PENDIENTE` |
| Nácar (`nacar`) | Foto 1 (par dorado, tiras cruzadas de brillantes) | **Alta** | Coincide con "tiras cruzadas, brillo, tacón bajo" | `BORRADOR VISUAL` — `FOTO OFICIAL PENDIENTE` |
| Estela (`estela`) | Foto 9 (par rosa/nude, tira ancha de brillantes) | **Alta** | Coincide con "tira ancha, brillo" — el modelo de brillo en banda continua más parecido | `BORRADOR VISUAL` — `FOTO OFICIAL PENDIENTE` |
| Nudo (`nudo`) | Foto 5 (4 colores, doble tira fina + nudo decorativo) | **Alta** | Es el único diseño con nudo decorativo real — coincide con la identidad de este modelo | `BORRADOR VISUAL` — `FOTO OFICIAL PENDIENTE` |
| Trazo (`trazo`) | Foto 8 (mismo diseño que la foto 5, distinto crop) | **Media — advertencia** | Es el mismo producto físico que la foto asignada a "Nudo" (solo cambia el ángulo/marca visible) — se asigna aquí solo para completar el mapeo 1 a 1 de este borrador, **no como confirmación de que Trazo y Nudo comparten diseño real** | `BORRADOR VISUAL` — `FOTO OFICIAL PENDIENTE` |
| Llana (`llana`) | Foto 7 (par negro, tiras finas cruzadas + tobillera) | **Media** | Coincide parcialmente con "tiras finas cruzadas" — esta referencia tiene además tacón bajo y tobillera, que no estaban en la identidad original de Llana ("plana") | `BORRADOR VISUAL` — `FOTO OFICIAL PENDIENTE` |
| Luna (`luna`) | Foto 2 (par tostado, tira acolchada + tobillera, lifestyle) | **Media — advertencia** | Coincide con "correa al tobillo", pero esta referencia no tiene brillo — la identidad original de Luna sí lo incluye | `BORRADOR VISUAL` — `FOTO OFICIAL PENDIENTE` |
| Deriva (`deriva`) | Foto 10 (lifestyle, tira fina + 3 pares en mano) | **Baja** | Es la asignación más débil del lote — la identidad de Deriva es una tira diagonal simple, y esta foto no muestra ese rasgo con claridad | `BORRADOR VISUAL` — `FOTO OFICIAL PENDIENTE` |
| Bruma (`bruma`) | Foto 4 (par blanco, tiras geométricas de brillantes con aros dorados) | **Baja** | No coincide con "acolchada/cruzada" de la identidad original — se asigna por descarte, para completar el mapeo | `BORRADOR VISUAL` — `FOTO OFICIAL PENDIENTE` |
| Cristal (`cristal`) | Foto 6 (3 pares, tira ancha + cadena dorada) | **Baja** | No muestra transparencia (rasgo central de la identidad de Cristal) — se asigna por descarte, para completar el mapeo | `BORRADOR VISUAL` — `FOTO OFICIAL PENDIENTE` |

**Nota de honestidad:** 3 de los 10 mapeos (Deriva, Bruma, Cristal) son de
confianza baja — no hay una imagen del lote que represente bien esos
rasgos. Se completaron igual para tener un borrador visual de las 10
posiciones del grid, pero **no deben tomarse como referencia seria de cómo
se verán esos 3 modelos reales**.

## 2. Hero / destacados (propuesta sobre este material)

Se mantiene la dirección de marca ya aprobada en Fase 8.7 — este borrador
no encontró ninguna razón visual para cambiarla:

- **Hero:** Luna → imagen de referencia: Foto 2 (lifestyle, limpia, sin
  elementos que compitan visualmente).
- **Destacado principal:** Llana → imagen de referencia: Foto 7.
- **Destacado secundario:** Trazo → imagen de referencia: Foto 8.

Estas tres asignaciones son de confianza **media** (ver tabla § 1) — sirven
para maquetar cómo se vería la home con estos tres ocupando esos lugares,
no para confirmar que la foto final será similar.

## 3. Qué reemplaza esto y cuándo

Cada fila de § 1 se reemplaza, modelo por modelo, en cuanto exista la foto
oficial correspondiente (`COLLECTION_01_PHOTO_PLAN.md`). El estado pasa de
`BORRADOR VISUAL — FOTO OFICIAL PENDIENTE` a `FOTO OFICIAL` únicamente
cuando la foto: (a) es de un producto MAYGEL realmente fabricado, y (b)
pasa el checklist de calidad ya definido (sin logos de terceros, color
real, sin deformación, etc.).

## 4. Confirmación

- No se creó ningún producto, ni local ni remoto.
- No se tocó ningún archivo de código ni la base de datos.
- No se hizo deploy.
- No se afirmó ningún dato comercial nuevo (colores, materiales,
  disponibilidad) a partir de estas imágenes — siguen exactamente como
  quedaron documentados en `COLLECTION_01_DRAFT.md`.
- Estas imágenes siguen sin ser fotografía oficial de Maygel.
