import { defineDb, defineTable, column } from "astro:db";

const Producto = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		nombre: column.text(),
		// Slug persistente e independiente del nombre — fuente de verdad de la
		// URL pública. Se genera una sola vez al crear el producto (nunca se
		// regenera ni se puede editar después, ver admin/api/guardar.ts) y
		// normaliza con `slugify()`. Contrato objetivo: NOT NULL + UNIQUE.
		//
		// Estado real por entorno (ver MIGRACIONES-PRODUCCION.md § Historial):
		// - Local (`astro dev`/`build:local`): recrea la tabla desde este
		//   archivo en cada arranque, así que aquí SÍ se aplican `unique` y la
		//   ausencia de `optional` como NOT NULL real.
		// - Remoto: la columna se añadió con `ALTER TABLE ADD COLUMN` (nullable
		//   a nivel físico — SQLite no permite añadir NOT NULL a una columna
		//   existente sin recrear la tabla) y ya tiene un `UNIQUE INDEX` real
		//   (`idx_producto_slug`, equivalente en efecto a `unique: true`). La
		//   migración que añadiría NOT NULL físico en remoto está diseñada y
		//   documentada, no ejecutada — ver ARCHITECTURE.md § slug.
		slug: column.text({ unique: true }),
		precio: column.number(),
		// Precio de oferta opcional (Fase 8.2) — nunca se lee directamente en
		// el código de la app, siempre a través de `precioEfectivo()`
		// (src/lib/productos.ts). Validado en `admin/api/guardar.ts`: si se
		// informa, debe ser mayor que 0 y menor que `precio`.
		//
		// Estado real: columna nueva, aditiva. Local (recrea la tabla) ya la
		// tiene. Remoto NO la tiene todavía — migración diseñada y documentada,
		// no ejecutada (ver MIGRACIONES-PRODUCCION.md § Fase 8.2). No desplegar
		// este código a producción antes de ejecutarla.
		precioOferta: column.number({ optional: true }),
		tallas: column.text(),
		colores: column.text(),
		imagen: column.text(),
		// JSON opcional { "Negro": "https://...", "Miel": "https://..." } con
		// la imagen específica de cada color, si la administradora subió una.
		// Los colores sin entrada aquí usan `imagen` como imagen principal.
		imagenesColores: column.text({ optional: true }),
		descripcion: column.text(),
		disponible: column.boolean({ default: true }),
		// Posición en el catálogo. Más bajo = aparece antes.
		orden: column.number({ default: 0 }),
		// Categoría de estilo (ej. "Brillos", "Clásicas"). Lista controlada,
		// validada en código — todavía sin categorías comerciales definidas.
		categoria: column.text({ optional: true }),
		// Si aparece en la sección de destacados de la homepage.
		destacado: column.boolean({ default: false }),
	},
});

export default defineDb({
	tables: { Producto },
});
