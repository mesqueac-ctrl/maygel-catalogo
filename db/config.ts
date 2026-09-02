import { defineDb, defineTable, column } from "astro:db";

const Producto = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		nombre: column.text(),
		precio: column.number(),
		tallas: column.text(),
		colores: column.text(),
		imagen: column.text(),
		descripcion: column.text(),
		disponible: column.boolean({ default: true }),
		// Posición en el catálogo. Más bajo = aparece antes.
		orden: column.number({ default: 0 }),
	},
});

export default defineDb({
	tables: { Producto },
});
