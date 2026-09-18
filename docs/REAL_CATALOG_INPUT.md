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

## Ya definido globalmente (Fase 8.4 — no repetir por modelo)

Estos datos ya están confirmados para **todo** el catálogo y no hace falta
volver a preguntarlos modelo por modelo:

- **Precio:** $60.000 COP por par (a menos que el negocio confirme
  explícitamente un precio distinto para un modelo puntual).
- **Fabricación:** bajo pedido, siempre.
- **Suela:** goma, siempre.
- **Talla:** flexible según pedido — nunca un rango fijo (ver
  `PRODUCT_PAGE_SPEC.md` § Talla). El campo `tallas` de cada producto puede
  dejarse como `"Según pedido"` salvo que ese modelo puntual sí tenga un
  rango real confirmado.
- **Disponible:** `sí` por defecto al cargar un modelo nuevo.

## Ficha por producto (copiar por cada modelo)

Con lo global ya definido, cada modelo real solo necesita esto:

```
### [Nombre provisional del modelo]

- Nombre definitivo: ___
- Foto principal: [archivo, ver nomenclatura en PHOTOGRAPHY_BRIEF.md]
- Fotos adicionales por color (opcional — el modelo de datos soporta una
  imagen específica por color, ver `imagenesColores` en ARCHITECTURE.md): ___
- Colores aplicables (de la lista cerrada: Negro, Blanco, Miel, Beige, Café,
  Plateado — marcar los que aplican a este modelo): ___
- Detalle visual / qué lo hace especial (1-2 frases reales — se usa como
  `descripcion`, aparece en meta description y JSON-LD): ___
- Material superior (SOLO si el negocio ya lo confirmó para este modelo
  específico — nunca "cuero", "cuerina", "sintético", "piel" ni "PVC" sin
  confirmación real; dejar en blanco si no se sabe todavía): ___
- Producto destacado (sí/no — controla si aparece en "Selección Maygel" de
  la home; solo uno debería estar marcado a la vez): ___
- Orden en catálogo (posición relativa a los demás modelos): ___
- Categoría (solo si el negocio ya confirmó una taxonomía real — hoy
  `CATEGORIAS_VALIDAS` es provisional, ver `ARCHITECTURE.md` § 9.3; dejar en
  blanco si no hay categorías confirmadas todavía): ___
```

**Regla dura:** ninguna palabra de material superior ("cuero genuino",
"piel", "material ecológico") se escribe en una ficha real sin que el
negocio confirme exactamente ese material para ese modelo específico — ver
`COMMERCIAL_TRUST_MATRIX.md` § material superior. La suela sí puede
describirse como "de goma" siempre, para cualquier modelo.

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
