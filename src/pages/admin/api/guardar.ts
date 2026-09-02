import type { APIRoute } from "astro";
import { put, del } from "@vercel/blob";
import { actualizar, crear, type ProductoNuevo } from "../../../lib/productos";

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

	const producto: ProductoNuevo = { nombre, precio, tallas, imagen, descripcion, disponible };

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
