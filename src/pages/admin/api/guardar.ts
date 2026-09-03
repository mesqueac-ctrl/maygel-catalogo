import type { APIRoute } from "astro";
import { put, del } from "@vercel/blob";
import {
	actualizar,
	crear,
	COLORES_VALIDOS,
	imagenesColoresComoMapa,
	type ColorValido,
	type ProductoNuevo,
} from "../../../lib/productos";

const TAMANO_MAXIMO = 8 * 1024 * 1024; // 8 MB

function errorRedirect(redirect: (url: string) => Response, mensaje: string): Response {
	return redirect("/admin/productos?error=" + encodeURIComponent(mensaje));
}

/** Sube la foto a Vercel Blob y devuelve su URL pública. */
async function subirFoto(foto: File): Promise<string> {
	const token = import.meta.env.BLOB_READ_WRITE_TOKEN;
	if (!token) {
		throw new Error(
			"El almacenamiento de fotos todavía no está configurado. Avísale a quien administra la página.",
		);
	}

	if (foto.size > TAMANO_MAXIMO) {
		throw new Error("La foto pesa demasiado. Intenta con una imagen más liviana (máximo 8 MB).");
	}

	if (!foto.type.startsWith("image/")) {
		throw new Error("El archivo que elegiste no es una foto.");
	}

	const resultado = await put(`productos/${Date.now()}-${foto.name}`, foto, {
		access: "public",
		token,
		addRandomSuffix: true,
	});

	return resultado.url;
}

/** Borra la foto anterior del almacenamiento; si falla, no interrumpe el guardado. */
async function borrarFotoAnterior(url: string): Promise<void> {
	const token = import.meta.env.BLOB_READ_WRITE_TOKEN;
	if (!token || !url.startsWith("http")) return;

	try {
		await del(url, { token });
	} catch {
		// La foto vieja queda huérfana, pero el producto se guardó bien.
	}
}

export const POST: APIRoute = async ({ request, redirect }) => {
	let datos: FormData;

	try {
		datos = await request.formData();
	} catch {
		return errorRedirect(redirect, "No se pudo leer el formulario. Inténtalo de nuevo.");
	}

	const idTexto = datos.get("id");
	const esEdicion = idTexto !== null && idTexto !== "";
	const id = Number(idTexto);

	const nombre = String(datos.get("nombre") ?? "").trim();
	const precio = Number(datos.get("precio"));
	const tallas = String(datos.get("tallas") ?? "").trim();
	const descripcion = String(datos.get("descripcion") ?? "").trim();
	const disponible = datos.get("disponible") === "si";
	const imagenActual = String(datos.get("imagenActual") ?? "");
	const foto = datos.get("foto");

	if (!nombre || !tallas || !descripcion) {
		return errorRedirect(redirect, "Faltan datos por llenar.");
	}

	if (!Number.isFinite(precio) || precio < 0) {
		return errorRedirect(redirect, "El precio no es válido.");
	}

	// Procesamiento y validación estricta de colores
	const coloresEntrantes = datos
		.getAll("colores")
		.flatMap((item) => String(item).split(","))
		.map((c) => c.trim())
		.filter(Boolean);

	const coloresValidados = Array.from(
		new Set(
			coloresEntrantes.filter((c): c is ColorValido =>
				(COLORES_VALIDOS as readonly string[]).includes(c),
			),
		),
	);

	if (coloresValidados.length === 0) {
		return errorRedirect(
			redirect,
			"Debes seleccionar al menos un color disponible (Negro, Blanco, Miel o Beige).",
		);
	}

	// Orden consistente según la paleta definida
	const coloresOrdenados = COLORES_VALIDOS.filter((c) => coloresValidados.includes(c));
	const colores = coloresOrdenados.join(", ");

	let imagen = imagenActual;

	// Solo subimos si realmente eligieron un archivo nuevo.
	if (foto instanceof File && foto.size > 0) {
		try {
			imagen = await subirFoto(foto);
		} catch (error) {
			const mensaje = error instanceof Error ? error.message : "No se pudo subir la foto.";
			return errorRedirect(redirect, mensaje);
		}
	}

	if (!imagen) {
		return errorRedirect(redirect, "Tienes que elegir una foto para la sandalia.");
	}

	// Fotos específicas por color: partimos del mapa que ya existía (para no
	// perder fotos de colores que no se tocaron en esta edición), subimos las
	// que sí traen archivo nuevo, y al final solo dejamos entradas de colores
	// que siguen marcados como disponibles.
	const mapaAnterior = imagenesColoresComoMapa(String(datos.get("imagenesColoresActual") ?? ""));
	const mapaImagenesColores: Partial<Record<ColorValido, string>> = { ...mapaAnterior };

	for (const color of coloresValidados) {
		const fotoColor = datos.get(`foto_color_${color}`);
		if (fotoColor instanceof File && fotoColor.size > 0) {
			try {
				mapaImagenesColores[color] = await subirFoto(fotoColor);
			} catch (error) {
				const mensaje = error instanceof Error ? error.message : "No se pudo subir la foto.";
				return errorRedirect(redirect, `Color ${color}: ${mensaje}`);
			}
		}
	}

	// Solo conservamos entradas de colores que siguen marcados; si desmarcaron
	// un color, su imagen específica (si tenía) deja de aplicar.
	const mapaFinal: Partial<Record<ColorValido, string>> = {};
	for (const color of coloresValidados) {
		if (mapaImagenesColores[color]) mapaFinal[color] = mapaImagenesColores[color]!;
	}

	const imagenesColores = Object.keys(mapaFinal).length > 0 ? JSON.stringify(mapaFinal) : null;

	const producto: ProductoNuevo = {
		nombre,
		precio,
		tallas,
		colores,
		imagen,
		imagenesColores,
		descripcion,
		disponible,
	};

	try {
		if (esEdicion && Number.isInteger(id)) {
			await actualizar(id, producto);

			if (imagenActual && imagen !== imagenActual) {
				await borrarFotoAnterior(imagenActual);
			}

			return redirect("/admin/productos?ok=guardado");
		}

		await crear(producto);
		return redirect("/admin/productos?ok=creado");
	} catch {
		return errorRedirect(redirect, "No se pudo guardar en la base de datos.");
	}
};
