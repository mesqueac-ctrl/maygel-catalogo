import type { APIRoute } from "astro";
import { mover } from "../../../lib/productos";

export const POST: APIRoute = async ({ request, redirect }) => {
	const datos = await request.formData();
	const id = Number(datos.get("id"));
	const direccion = String(datos.get("direccion"));

	if (!Number.isInteger(id) || (direccion !== "subir" && direccion !== "bajar")) {
		return redirect("/admin/productos");
	}

	try {
		await mover(id, direccion);
	} catch {
		return redirect(
			"/admin/productos?error=" + encodeURIComponent("No se pudo cambiar el orden."),
		);
	}

	return redirect("/admin/productos?ok=movido");
};
