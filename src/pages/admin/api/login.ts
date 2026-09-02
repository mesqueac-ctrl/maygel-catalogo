import type { APIRoute } from "astro";
import { credencialesValidas, crearSesion } from "../../../lib/auth";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
	const datos = await request.formData();
	const usuario = String(datos.get("usuario") ?? "");
	const contrasena = String(datos.get("contrasena") ?? "");

	if (!credencialesValidas(usuario, contrasena)) {
		return redirect("/admin/login?error=1");
	}

	crearSesion(cookies);
	return redirect("/admin/productos");
};
