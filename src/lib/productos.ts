import { db, Producto, eq, asc, sql } from "astro:db";

export interface ProductoRegistro {
	id: number;
	nombre: string;
	precio: number;
	tallas: string;
	imagen: string;
	descripcion: string;
	disponible: boolean;
	orden: number;
}

export type ProductoNuevo = Omit<ProductoRegistro, "id" | "orden">;

/** Todos los productos, en el orden que definió la administradora. */
export async function listarTodos(): Promise<ProductoRegistro[]> {
	return db.select().from(Producto).orderBy(asc(Producto.orden), asc(Producto.id));
}

/** Solo los productos visibles, para la página pública. */
export async function listarDisponibles(): Promise<ProductoRegistro[]> {
	return db
		.select()
		.from(Producto)
		.where(eq(Producto.disponible, true))
		.orderBy(asc(Producto.orden), asc(Producto.id));
}

export async function obtenerPorId(id: number): Promise<ProductoRegistro | undefined> {
	const filas = await db.select().from(Producto).where(eq(Producto.id, id));
	return filas[0];
}

export async function crear(datos: ProductoNuevo): Promise<void> {
	// Los productos nuevos van al final del catálogo.
	const [{ maximo }] = await db
		.select({ maximo: sql<number | null>`max(${Producto.orden})` })
		.from(Producto);

	await db.insert(Producto).values({ ...datos, orden: (maximo ?? 0) + 1 });
}

export async function actualizar(id: number, datos: ProductoNuevo): Promise<void> {
	await db.update(Producto).set(datos).where(eq(Producto.id, id));
}

export async function eliminar(id: number): Promise<void> {
	await db.delete(Producto).where(eq(Producto.id, id));
}

/**
 * Sube o baja un producto una posición, intercambiando el orden con su vecino.
 * Devuelve false si ya estaba en el extremo.
 */
export async function mover(id: number, direccion: "subir" | "bajar"): Promise<boolean> {
	const lista = await listarTodos();
	const posicion = lista.findIndex((producto) => producto.id === id);

	if (posicion === -1) return false;

	const destino = direccion === "subir" ? posicion - 1 : posicion + 1;
	if (destino < 0 || destino >= lista.length) return false;

	const actual = lista[posicion];
	const vecino = lista[destino];

	// Reescribimos el orden de toda la lista para que quede consecutivo aunque
	// venga con valores repetidos o con huecos.
	const reordenada = [...lista];
	reordenada[posicion] = vecino;
	reordenada[destino] = actual;

	await Promise.all(
		reordenada.map((producto, indice) =>
			db
				.update(Producto)
				.set({ orden: indice + 1 })
				.where(eq(Producto.id, producto.id)),
		),
	);

	return true;
}

/** Convierte "35, 36, 37" en ["35", "36", "37"], quitando espacios y vacíos. */
export function tallasComoLista(tallas: string): string[] {
	return tallas
		.split(",")
		.map((talla) => talla.trim())
		.filter(Boolean);
}

export function formatearPrecio(precio: number): string {
	return new Intl.NumberFormat("es-CO", {
		style: "currency",
		currency: "COP",
		maximumFractionDigits: 0,
	}).format(precio);
}
