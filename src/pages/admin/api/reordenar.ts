import type { APIRoute } from "astro";
import { listarTodos, guardarOrdenCompleto } from "../../../lib/productos";

function errorRedirect(redirect: (url: string) => Response, mensaje: string): Response {
	return redirect("/admin/productos/ordenar?error=" + encodeURIComponent(mensaje));
}

export const POST: APIRoute = async ({ request, redirect }) => {
	let datos: FormData;

	try {
		datos = await request.formData();
	} catch {
		return errorRedirect(redirect, "No se pudo leer el formulario. Inténtalo de nuevo.");
	}

	const crudo = String(datos.get("idsEnOrden") ?? "");

	let idsEnOrden: unknown;
	try {
		idsEnOrden = JSON.parse(crudo);
	} catch {
		return errorRedirect(redirect, "No se pudo leer el nuevo orden. Inténtalo de nuevo.");
	}

	if (!Array.isArray(idsEnOrden) || idsEnOrden.length === 0) {
		return errorRedirect(redirect, "No se recibió ningún orden para guardar.");
	}

	if (!idsEnOrden.every((id): id is number => Number.isInteger(id) && id > 0)) {
		return errorRedirect(redirect, "El orden recibido no es válido.");
	}

	const sinDuplicados = new Set(idsEnOrden).size === idsEnOrden.length;
	if (!sinDuplicados) {
		return errorRedirect(redirect, "El orden recibido tiene sandalias repetidas.");
	}

	// Comparamos contra el catálogo real: misma cantidad, mismos IDs exactos
	// (ni faltan ni sobran) — si alguien más modificó el catálogo mientras la
	// administradora reordenaba, o el navegador envió datos corruptos, no
	// guardamos nada en vez de arriesgarnos a dejar productos con orden
	// indefinido o perder alguno de la lista.
	const productosActuales = await listarTodos();

	if (idsEnOrden.length !== productosActuales.length) {
		return errorRedirect(
			redirect,
			"El catálogo cambió mientras ordenabas. Vuelve a intentarlo con la lista actualizada.",
		);
	}

	const idsReales = new Set(productosActuales.map((p) => p.id));
	const idsRecibidos = new Set(idsEnOrden);

	const coincideExacto =
		idsReales.size === idsRecibidos.size && [...idsReales].every((id) => idsRecibidos.has(id));

	if (!coincideExacto) {
		return errorRedirect(
			redirect,
			"El catálogo cambió mientras ordenabas. Vuelve a intentarlo con la lista actualizada.",
		);
	}

	try {
		await guardarOrdenCompleto(idsEnOrden);
	} catch {
		return errorRedirect(redirect, "No se pudo guardar el nuevo orden. Inténtalo de nuevo.");
	}

	return redirect("/admin/productos/ordenar?ok=movido");
};
