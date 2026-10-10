import type { APIRoute } from "astro";
import { cambiarArchivado, estaArchivado, obtenerPorId } from "../../../lib/productos";

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
	const valor = ok ? extra?.okCode ?? "archivado" : mensaje;
	return redirect(`/admin/productos?${clave}=` + encodeURIComponent(String(valor)));
}

export const POST: APIRoute = async ({ request, redirect }) => {
	const datos = await request.formData();
	const ajax = datos.get("ajax") === "1";
	const id = Number(datos.get("id"));
	const archivar = datos.get("archivado") !== "no";

	if (!Number.isInteger(id)) {
		return respuesta(redirect, ajax, false, "No se indicó qué sandalia cambiar.");
	}

	const producto = await obtenerPorId(id);
	if (!producto) {
		return respuesta(redirect, ajax, false, "Esa sandalia ya no existe.");
	}

	if (archivar === estaArchivado(producto.archivado)) {
		return respuesta(redirect, ajax, true, "Sin cambios.", { okCode: "guardado", id, archivado: archivar });
	}

	try {
		await cambiarArchivado(id, archivar);
	} catch {
		return respuesta(redirect, ajax, false, "No se pudo guardar. Inténtalo de nuevo.");
	}

	return respuesta(
		redirect,
		ajax,
		true,
		archivar ? "La sandalia se archivó." : "La sandalia volvió a la lista.",
		{ okCode: archivar ? "archivado" : "restaurado", id, archivado: archivar },
	);
};
