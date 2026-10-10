import type { APIRoute } from "astro";
import { del } from "@vercel/blob";
import { eliminar, estaArchivado, obtenerPorId, urlsDeFotosProducto } from "../../../lib/productos";

export const POST: APIRoute = async ({ request, redirect }) => {
	const datos = await request.formData();
	const id = Number(datos.get("id"));
	const vista = String(datos.get("vista") ?? "archivadas");

	if (!Number.isInteger(id)) {
		return redirect("/admin/productos?error=" + encodeURIComponent("No se indicó qué eliminar."));
	}

	const producto = await obtenerPorId(id);

	if (!producto) {
		return redirect("/admin/productos?error=" + encodeURIComponent("Esa sandalia ya no existe."));
	}

	if (!estaArchivado(producto.archivado)) {
		return redirect(
			"/admin/productos?error=" +
				encodeURIComponent("Primero archívala. Eliminarla del todo solo se puede desde Archivadas."),
		);
	}

	try {
		await eliminar(id);
	} catch {
		return redirect(
			"/admin/productos?error=" + encodeURIComponent("No se pudo eliminar. Inténtalo de nuevo."),
		);
	}

	const token = import.meta.env.BLOB_READ_WRITE_TOKEN;
	for (const url of urlsDeFotosProducto(producto)) {
		try {
			await del(url, token ? { token } : {});
		} catch {
			// El producto ya se borró; una foto huérfana no bloquea.
		}
	}

	return redirect(
		`/admin/productos?vista=${encodeURIComponent(vista)}&ok=` + encodeURIComponent("eliminado"),
	);
};
