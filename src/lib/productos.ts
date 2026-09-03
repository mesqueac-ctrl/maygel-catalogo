import { db, Producto, eq, asc, sql } from "astro:db";

export const COLORES_VALIDOS = ["Negro", "Blanco", "Miel", "Beige"] as const;
export type ColorValido = (typeof COLORES_VALIDOS)[number];

export const COLORES_METADATA: Record<ColorValido, { nombre: string; hex: string; border: string }> = {
	Negro: { nombre: "Negro", hex: "#222222", border: "#222222" },
	Blanco: { nombre: "Blanco", hex: "#FFFFFF", border: "#D8CFC4" },
	Miel: { nombre: "Miel", hex: "#C47C35", border: "#B56E28" },
	Beige: { nombre: "Beige", hex: "#E7DACB", border: "#D6C4B0" },
};

export interface ProductoRegistro {
	id: number;
	nombre: string;
	precio: number;
	tallas: string;
	colores: string;
	imagen: string;
	/** JSON opcional { "Negro": "url", ... } con la imagen específica de cada
	 * color. Los colores sin entrada usan `imagen` como imagen principal. */
	imagenesColores?: string | null;
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

/** Convierte "Negro, Blanco, Miel" en array de ColorValido, filtrando vacíos e inválidos. */
export function coloresComoLista(colores?: string | null): ColorValido[] {
	if (!colores || typeof colores !== "string") return [];
	return colores
		.split(",")
		.map((c) => c.trim())
		.filter((c): c is ColorValido => (COLORES_VALIDOS as readonly string[]).includes(c));
}

/**
 * Parsea el JSON de `imagenesColores` de forma segura. Un valor ausente,
 * vacío o corrupto simplemente no aporta imágenes por color (fallback total
 * a la imagen principal), sin lanzar excepción.
 */
export function imagenesColoresComoMapa(
	imagenesColores?: string | null,
): Partial<Record<ColorValido, string>> {
	if (!imagenesColores) return {};

	try {
		const datos = JSON.parse(imagenesColores);
		if (!datos || typeof datos !== "object") return {};

		const mapa: Partial<Record<ColorValido, string>> = {};
		for (const color of COLORES_VALIDOS) {
			const url = (datos as Record<string, unknown>)[color];
			if (typeof url === "string" && url.trim()) {
				mapa[color] = url;
			}
		}
		return mapa;
	} catch {
		return {};
	}
}

/** Imagen a mostrar para un color dado: la específica si existe, si no la principal. */
export function imagenParaColor(producto: Pick<ProductoRegistro, "imagen" | "imagenesColores">, color: ColorValido | null): string {
	if (!color) return producto.imagen;
	const mapa = imagenesColoresComoMapa(producto.imagenesColores);
	return mapa[color] ?? producto.imagen;
}

/** Convierte texto libre en un slug URL-safe: minúsculas, sin acentos, sin espacios. */
export function slugify(texto: string): string {
	return texto
		.normalize("NFD")
		.replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

/**
 * Slug público de un producto. Se le añade el id para garantizar unicidad
 * sin depender de que los nombres no choquen entre sí (no hay campo slug en
 * Astro DB y no queremos migrar el esquema solo para esta fase).
 */
export function slugDeProducto(producto: Pick<ProductoRegistro, "id" | "nombre">): string {
	return `${slugify(producto.nombre)}-${producto.id}`;
}

/** Busca un producto disponible por su slug público. */
export async function obtenerPorSlug(slug: string): Promise<ProductoRegistro | undefined> {
	const productos = await listarDisponibles();
	return productos.find((producto) => slugDeProducto(producto) === slug);
}

/** Texto alt/descripción reutilizable para las imágenes de un producto. */
export function descripcionImagen(nombre: string): string {
	return /sandalia/i.test(nombre)
		? `${nombre}, artesanal y hecha a mano por Maygel`
		: `Sandalia ${nombre}, artesanal y hecha a mano por Maygel`;
}

export function formatearPrecio(precio: number): string {
	return new Intl.NumberFormat("es-CO", {
		style: "currency",
		currency: "COP",
		maximumFractionDigits: 0,
	}).format(precio);
}
