import { defineDb, defineTable, column } from "astro:db";

const Producto = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		nombre: column.text(),
		precio: column.number(),
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
	},
});

export default defineDb({
	tables: { Producto },
});
