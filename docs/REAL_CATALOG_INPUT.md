# Maygel — Ficha de insumos para catálogo real

> Plantilla reutilizable para que el negocio complete un formulario por cada
> sandalia real antes de cargarla en el admin. No es el catálogo en sí — es
> el insumo que la administradora necesita tener a mano para llenar
> `ProductoForm.astro` sin inventar ni dejar campos a medias. Ver
> `GUIA-PANEL.md` para el paso a paso de cómo cargarlo una vez completo.

## Cómo usar este documento

1. Copiar el bloque de "Ficha por producto" una vez por cada modelo real.
2. Completar cada campo con el dato real — dejar en blanco (no inventar) lo
   que todavía no se sabe, y anotarlo en `BUSINESS_INPUTS.md`/
   `OWNER_CONTENT_CHECKLIST.md` si bloquea el lanzamiento.
3. Solo cuando una ficha esté completa, cargarla en el admin.

## Ficha por producto (copiar por cada modelo)

```
### [Nombre provisional del modelo]

- Nombre definitivo: ___
- Slug: (se autogenera del nombre al crear — no escribir uno manual salvo
  que el nombre genere un slug confuso; ver ARCHITECTURE.md § slug — el
  slug NO se puede cambiar después de crear el producto)
- Precio (COP, número entero): ___
- Disponible (sí/no): ___
- Descripción corta (la que ya usa `descripcion` en el modelo de datos —
  aparece en meta description y JSON-LD, se recomienda 1-2 frases con
  material real):
  ___
- Descripción editorial (si el negocio quiere un texto más largo para la
  ficha — hoy el modelo de datos solo tiene un campo de descripción; si se
  necesita un segundo campo editorial, es una decisión de arquitectura
  futura, no inventarlo aquí):
  ___
- Colores (de la lista cerrada: Negro, Blanco, Miel, Beige — marcar los que
  aplican a este modelo): ___
- Tallas (lista real que se fabrica para este modelo, ej. "35, 36, 37, 38"): ___
- Materiales (ver plantilla de materiales más abajo — solo si están
  confirmados, nunca "cuero genuino" sin verificar)
- Fabricación: ¿este modelo tiene alguna particularidad de fabricación que
  otros no tienen (tiempo distinto, técnica distinta)? ___
- Imagen principal: [archivo, ver nomenclatura en PHOTOGRAPHY_BRIEF.md]
- Imágenes adicionales por color (el modelo de datos soporta una imagen
  específica por color, opcional — ver `imagenesColores` en
  ARCHITECTURE.md): ___
- Producto destacado (sí/no — controla si aparece en "Selección Maygel" de
  la home; solo uno debería estar marcado a la vez, el primero según orden
  de catálogo es el que se muestra): ___
- Orden en catálogo (posición relativa a los demás modelos): ___
- Categoría (solo si el negocio ya confirmó una taxonomía real — hoy
  `CATEGORIAS_VALIDAS` es provisional, ver `ARCHITECTURE.md` § 9.3; dejar en
  blanco si no hay categorías confirmadas todavía): ___
```

### Plantilla de materiales por modelo (solo si están confirmados)

```
- Material superior (lo que toca la piel/se ve por fuera): ___
- Plantilla (lo que pisa el pie por dentro): ___
- Suela: ___
- Detalles (hebilla, costura visible, adornos): ___
- Acabado (curtido, tratamiento, color aplicado): ___
```

**Regla dura:** ninguna palabra como "cuero genuino", "piel", "material
ecológico" o "suela antideslizante" se escribe en una ficha real sin que el
negocio confirme exactamente ese material para ese modelo específico — ver
`COMMERCIAL_TRUST_MATRIX.md` § materiales.

## Reglas de naming de productos (Fase 8 — criterio, sin renombrar nada real)

Un nombre de producto en Maygel debe sentirse como una pieza de una colección
de moda artesanal, no como una ficha técnica de inventario.

**Sí:**
- Corto: 2-4 palabras (ej. "Sandalia Trenzada Terracota", ya usado en
  fixtures — el patrón real a seguir).
- Describe una característica de diseño estable del modelo (la trenza, la
  doble correa, el corte), no algo que cambia por variante.
- Puede incluir una palabra de tono/material evocador si es real (terracota,
  ocre) — pero solo como acompañamiento del nombre, no como afirmación de
  material (ver `CONTENT_GUIDE.md`, "terracota"/"ocre" ahí describen tono
  visual del nombre, no fueron ni deben leerse como claim de material).

**Evitar:**
- Nombres genéricos que no distinguen nada ("Sandalia 1", "Modelo A").
- Jerga técnica de fabricación ("Ref. ST-04").
- Incluir el nombre de un color específico si ese mismo modelo se fabrica en
  varios colores (el color ya se selecciona aparte en la ficha) — un nombre
  como "Sandalia Negra Trenzada" confunde si también existe en Miel/Beige.
- Nombres largos que no caben bien en una tarjeta de catálogo ni en el
  `<title>` de SEO (`{Nombre} — Sandalias Maygel`, ver `SEO_RULES.md` § 1).

**Ejemplo conceptual (no son productos reales):**
- Bien: "Sandalia Doble Correa", "Sandalia Trenzada Camel".
- Mal: "Sandalia negra de cuero premium modelo 3", "SKU-2024-B".
