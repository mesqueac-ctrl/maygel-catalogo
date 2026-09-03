import type { APIRoute } from "astro";
import { del } from "@vercel/blob";
import { eliminar, obtenerPorId } from "../../../lib/productos";

export const POST: APIRoute = async ({ request, redirect }) => {
	const datos = await request.formData();
	const id = Number(datos.get("id"));

	if (!Number.isInteger(id)) {
		return redirect("/admin/productos?error=" + encodeURIComponent("No se indicó qué eliminar."));
	}

	const producto = await obtenerPorId(id);

	if (!producto) {
		return redirect("/admin/productos?error=" + encodeURIComponent("Esa sandalia ya no existe."));
	}

	try {
		await eliminar(id);
	} catch {
		return redirect(
			"/admin/productos?error=" + encodeURIComponent("No se pudo eliminar. Inténtalo de nuevo."),
		);
	}

	// Limpiamos la foto del almacenamiento; si falla, el producto ya se borró igual.
	// El token solo se pasa si existe explícitamente; si no, @vercel/blob intenta
	// autenticar vía OIDC (el mecanismo real en Vercel Production).
	if (producto.imagen.startsWith("http")) {
		const token = import.meta.env.BLOB_READ_WRITE_TOKEN;
		try {
			await del(producto.imagen, token ? { token } : {});
		} catch {
			// Sin consecuencias para la usuaria.
		}
	}

	return redirect("/admin/productos?ok=eliminado");
};
