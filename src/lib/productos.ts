import { db, Producto, eq, and, asc, sql } from "astro:db";

// Café y Plateado confirmados por el negocio en Fase 8.2 — antes solo
// Negro/Blanco/Miel/Beige.
export const COLORES_VALIDOS = ["Negro", "Blanco", "Miel", "Beige", "Café", "Plateado"] as const;
export type ColorValido = (typeof COLORES_VALIDOS)[number];

/** Taxonomía de categorías aprobada. Cada producto tiene como máximo una. */
export const CATEGORIAS_VALIDAS = ["Brillos", "Tiras", "Trenzadas", "Clásicas", "Elegantes"] as const;
export type CategoriaValida = (typeof CATEGORIAS_VALIDAS)[number];

// Representación visual aproximada de cada color — el nombre textual sigue
// siendo la fuente real (ver COMMERCIAL_TRUST_MATRIX.md). El `border` es
// siempre un tono más oscuro del mismo color para que el swatch se distinga
// del fondo claro del sitio, salvo Negro (ya suficientemente oscuro solo).
export const COLORES_METADATA: Record<ColorValido, { nombre: string; hex: string; border: string }> = {
	Negro: { nombre: "Negro", hex: "#222222", border: "#222222" },
	Blanco: { nombre: "Blanco", hex: "#FFFFFF", border: "#2B1A12" },
	Miel: { nombre: "Miel", hex: "#C47C35", border: "#B56E28" },
	Beige: { nombre: "Beige", hex: "#E7DACB", border: "#2B1A12" },
	Café: { nombre: "Café", hex: "#6F4E37", border: "#4F3627" },
	Plateado: { nombre: "Plateado", hex: "#C7C7C7", border: "#A0A0A0" },
};

export interface ProductoRegistro {
	id: number;
	nombre: string;
	/** Slug persistente de la URL pública — independiente del nombre. Nunca se
	 * regenera automáticamente al editar `nombre`. */
	slug: string;
	precio: number;
	/** Precio de oferta opcional (Fase 8.2). Nunca se lee directamente — usar
	 * siempre `precioEfectivo()`. Cuando existe, ya fue validado en el
	 * servidor (`admin/api/guardar.ts`): mayor que 0 y menor que `precio`. */
	precioOferta?: number | null;
	tallas: string;
	colores: string;
	imagen: string;
	/** JSON opcional { "Negro": "url", ... } con la imagen específica de cada
	 * color. Los colores sin entrada usan `imagen` como imagen principal. */
	imagenesColores?: string | null;
	descripcion: string;
	disponible: boolean;
	orden: number;
	/** Una de CATEGORIAS_VALIDAS, o null si todavía no se asignó ninguna. */
	categoria?: string | null;
	/** Si aparece en la sección de destacados de la homepage. */
	destacado: boolean;
	/** NULL o false = activa. true = archivada (no se ve en la web). */
	archivado?: boolean | null;
}

export type ProductoNuevo = Omit<ProductoRegistro, "id" | "orden" | "archivado">;

/** NULL o 0/false = no archivado. Solo true/1 cuenta como archivado. */
export function estaArchivado(valor?: boolean | null | number): boolean {
	return valor === true || valor === 1;
}

export function descripcionPublica(nombre: string, descripcion?: string | null): string {
	const texto = descripcion?.trim();
	if (texto) return texto;
	return `Sandalia ${nombre}, hecha a mano bajo pedido por Maygel en Soledad.`;
}

const FILTRO_NO_ARCHIVADO = sql`(${Producto.archivado} IS NULL OR ${Producto.archivado} = 0)`;

// `slug` ya es NOT NULL + UNIQUE en el schema (db/config.ts) y guardar.ts
// siempre lo rellena al crear — nunca debería llegar null en la práctica.
// Este fallback solo cubre el desfase real que existe hoy en la base remota:
// la columna se añadió con ALTER TABLE (físicamente nullable, SQLite no
// permite NOT NULL ahí sin recrear la tabla — ver ARCHITECTURE.md § slug),
// así que el tipo de esta función sigue siendo defensivo hasta que esa
// migración se ejecute. Nunca inventa un valor distinto al que ya se
// derivaba del nombre antes de que `slug` existiera como columna.
function conSlugSeguro<T extends { id: number; nombre: string; slug: string | null }>(
	fila: T,
): T & { slug: string } {
	return { ...fila, slug: fila.slug ?? `${slugify(fila.nombre)}-${fila.id}` };
}

/** Todos los productos, en el orden que definió la administradora. */
export async function listarTodos(): Promise<ProductoRegistro[]> {
	const filas = await db.select().from(Producto).orderBy(asc(Producto.orden), asc(Producto.id));
	return filas.map(conSlugSeguro);
}

/** Solo los productos visibles, para la página pública. */
export async function listarDisponibles(): Promise<ProductoRegistro[]> {
	const filas = await db
		.select()
		.from(Producto)
		.where(and(eq(Producto.disponible, true), FILTRO_NO_ARCHIVADO))
		.orderBy(asc(Producto.orden), asc(Producto.id));
	return filas.map(conSlugSeguro);
}

export async function obtenerPorId(id: number): Promise<ProductoRegistro | undefined> {
	const filas = await db.select().from(Producto).where(eq(Producto.id, id));
	return filas[0] ? conSlugSeguro(filas[0]) : undefined;
}

export async function crear(datos: ProductoNuevo): Promise<void> {
	// Los productos nuevos van al final del catálogo.
	const [{ maximo }] = await db
		.select({ maximo: sql<number | null>`max(${Producto.orden})` })
		.from(Producto);

	await db.insert(Producto).values({ ...datos, orden: (maximo ?? 0) + 1, archivado: false });
}

export async function actualizar(id: number, datos: ProductoNuevo): Promise<void> {
	await db.update(Producto).set(datos).where(eq(Producto.id, id));
}

export async function eliminar(id: number): Promise<void> {
	await db.delete(Producto).where(eq(Producto.id, id));
}

export async function cambiarDisponible(id: number, disponible: boolean): Promise<void> {
	await db.update(Producto).set({ disponible }).where(eq(Producto.id, id));
}

export async function cambiarArchivado(id: number, archivado: boolean): Promise<void> {
	await db.update(Producto).set({ archivado }).where(eq(Producto.id, id));
}

/**
 * Persiste el orden completo del catálogo de una sola vez. `idsEnOrden` debe
 * llegar ya validado por quien llama (todos los IDs existentes, sin
 * duplicados, sin faltantes, sin extras) — esta función asume esa garantía
 * y solo se encarga de escribir `orden = índice + 1` para cada uno.
 *
 * Se ejecuta como un único `batch` de libSQL (soportado nativamente por el
 * driver `drizzle-orm/libsql` que usa Astro DB): todas las escrituras viajan
 * en una sola petición atómica al servidor — o se aplican todas, o ninguna —
 * evitando que una lista de 50+ productos quede en un estado a medio guardar
 * si algo falla a mitad de camino.
 */
export async function guardarOrdenCompleto(idsEnOrden: number[]): Promise<void> {
	const escrituras = idsEnOrden.map((id, indice) =>
		db.update(Producto).set({ orden: indice + 1 }).where(eq(Producto.id, id)),
	);

	if (escrituras.length === 0) return;

	await db.batch(escrituras as [(typeof escrituras)[number], ...(typeof escrituras)[number][]]);
}

/** Convierte "35, 36, 37" en ["35", "36", "37"], quitando espacios y vacíos. */
export function tallasComoLista(tallas: string): string[] {
	return tallas
		.split(",")
		.map((talla) => talla.trim())
		.filter(Boolean);
}

/**
 * Decide el modo de talla de la PDP (Fase 8.4), sin ningún cambio de schema:
 * `tallas` sigue siendo el mismo campo de texto libre de siempre.
 *
 * - `false` (lista fija): el contenido es una lista de números separados
 *   por coma (ej. "35, 36, 37") — se mantiene el selector de botones ya
 *   existente desde Fase 5, por si algún modelo puntual sí tiene un rango
 *   cerrado real confirmado.
 * - `true` (flexible, el caso esperado para el catálogo real confirmado en
 *   Fase 8.4): cualquier otro contenido, típicamente `"Según pedido"` — la
 *   PDP no muestra botones de una lista inventada, sino un campo de texto
 *   libre opcional + el aviso de que la fabricación es según pedido.
 */
export function esTallaFlexible(tallas: string): boolean {
	const lista = tallasComoLista(tallas);
	if (lista.length === 0) return true;
	return !lista.every((talla) => /^\d+$/.test(talla));
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
export function urlsDeFotosProducto(producto: Pick<ProductoRegistro, "imagen" | "imagenesColores">): string[] {
	const urls = [producto.imagen];
	for (const url of Object.values(imagenesColoresComoMapa(producto.imagenesColores))) {
		if (url) urls.push(url);
	}
	return [...new Set(urls.filter((url) => url.startsWith("http")))];
}

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
 * Comprueba si un slug ya está en uso por otro producto (excluyendo, al
 * editar, el propio producto que se está guardando).
 */
export async function existeSlug(slug: string, excluirId?: number): Promise<boolean> {
	const filas = await db.select({ id: Producto.id }).from(Producto).where(eq(Producto.slug, slug));
	return filas.some((fila) => fila.id !== excluirId);
}

/**
 * Genera un slug disponible a partir de un nombre: normaliza con `slugify()`
 * y, si ya existe, añade `-2`, `-3`... hasta encontrar uno libre. Se usa
 * solo cuando no se indicó un slug explícito (alta sin campo, o el campo se
 * dejó vacío) — nunca sobrescribe un slug ya persistido.
 */
export async function generarSlugDisponible(nombre: string, excluirId?: number): Promise<string> {
	const base = slugify(nombre) || "sandalia";
	let candidato = base;
	let sufijo = 2;

	while (await existeSlug(candidato, excluirId)) {
		candidato = `${base}-${sufijo}`;
		sufijo += 1;
	}

	return candidato;
}

/** Busca un producto por su slug persistente, exista o no `disponible`. La
 * página pública decide qué mostrar según ese campo — ver
 * docs/PRODUCT_PAGE_SPEC.md § producto no disponible. */
export async function obtenerPorSlug(slug: string): Promise<ProductoRegistro | undefined> {
	const filas = await db.select().from(Producto).where(eq(Producto.slug, slug));
	return filas[0] ? conSlugSeguro(filas[0]) : undefined;
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

/**
 * Único punto del código que decide qué precio se muestra y se cobra
 * (Fase 8.2): el de oferta si existe y es válido, si no, el normal. `admin/
 * api/guardar.ts` ya valida `precioOferta` al guardar (mayor que 0, menor
 * que `precio`), pero esta función vuelve a comprobarlo — defensivo, igual
 * que `conSlugSeguro()`, por si algún dato no pasó por esa validación.
 * Nunca calcular `producto.precioOferta ?? producto.precio` a mano en un
 * componente: siempre a través de esta función, para que PDP, `ProductCard`,
 * WhatsApp y el JSON-LD nunca puedan mostrar/cobrar precios distintos.
 */
export function precioEfectivo(producto: Pick<ProductoRegistro, "precio" | "precioOferta">): number {
	const oferta = producto.precioOferta;
	const esOfertaValida = typeof oferta === "number" && oferta > 0 && oferta < producto.precio;
	return esOfertaValida ? oferta : producto.precio;
}

/** `true` solo si el producto tiene un precio de oferta que de verdad se va
 * a mostrar como descuento (mismo criterio que `precioEfectivo()`). */
export function tieneDescuento(producto: Pick<ProductoRegistro, "precio" | "precioOferta">): boolean {
	return precioEfectivo(producto) !== producto.precio;
}

/** Foto de apoyo para bloques editoriales (hero, historia, modelo propio).
 * Prueba slugs reales; si no existen (p. ej. fixtures locales), usa el primer
 * producto disponible con imagen. Nunca inventa una URL. */
export async function fotoDeApoyo(slugsPreferidos: string[]): Promise<{
	imagen: string;
	alt: string;
} | null> {
	for (const slug of slugsPreferidos) {
		const producto = await obtenerPorSlug(slug);
		if (producto?.imagen && producto.disponible && !estaArchivado(producto.archivado)) {
			return { imagen: imagenParaColor(producto, null), alt: descripcionImagen(producto.nombre) };
		}
	}
	const disponible = (await listarDisponibles()).find((p) => p.imagen);
	if (!disponible) return null;
	return { imagen: imagenParaColor(disponible, null), alt: descripcionImagen(disponible.nombre) };
}
