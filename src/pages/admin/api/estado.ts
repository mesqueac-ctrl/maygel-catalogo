import type { APIRoute } from "astro";
import { cambiarDisponible, obtenerPorId } from "../../../lib/productos";

function respuesta(
	redirect: (url: string) => Response,
	ajax: boolean,
	ok: boolean,
	mensaje: string,
	extra?: Record<string, unknown>,
): Response {
	if (ajax) {
		return new Response(JSON.stringify({ ok, mensaje, ...extra }), {
			status: ok ? 200 : 400,
			headers: { "Content-Type": "application/json" },
		});
	}
	const clave = ok ? "ok" : "error";
	const valor = ok ? extra?.okCode ?? "guardado" : mensaje;
	return redirect(`/admin/productos?${clave}=` + encodeURIComponent(String(valor)));
}

export const POST: APIRoute = async ({ request, redirect }) => {
	const datos = await request.formData();
	const ajax = datos.get("ajax") === "1";
	const id = Number(datos.get("id"));
	const disponible = datos.get("disponible") === "si";

	if (!Number.isInteger(id)) {
		return respuesta(redirect, ajax, false, "No se indicó qué sandalia cambiar.");
	}

	const producto = await obtenerPorId(id);
	if (!producto) {
		return respuesta(redirect, ajax, false, "Esa sandalia ya no existe.");
	}

	try {
		await cambiarDisponible(id, disponible);
	} catch {
		return respuesta(redirect, ajax, false, "No se pudo guardar. Inténtalo de nuevo.");
	}

	return respuesta(redirect, ajax, true, disponible ? "La sandalia volvió a la página." : "La sandalia ya no se ve en la página.", {
		okCode: "guardado",
		disponible,
		id,
	});
};
