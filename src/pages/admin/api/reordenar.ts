import type { APIRoute } from "astro";
import { estaArchivado, listarTodos, guardarOrdenCompleto } from "../../../lib/productos";

function responder(
	redirect: (url: string) => Response,
	ajax: boolean,
	ok: boolean,
	mensaje: string,
): Response {
	if (ajax) {
		return new Response(JSON.stringify({ ok, mensaje }), {
			status: ok ? 200 : 400,
			headers: { "Content-Type": "application/json" },
		});
	}
	if (!ok) {
		return redirect("/admin/productos?error=" + encodeURIComponent(mensaje));
	}
	return redirect("/admin/productos?ok=" + encodeURIComponent("orden"));
}

export const POST: APIRoute = async ({ request, redirect }) => {
	let datos: FormData;

	try {
		datos = await request.formData();
	} catch {
		return responder(redirect, false, false, "No se pudo leer el formulario. Inténtalo de nuevo.");
	}

	const ajax = datos.get("ajax") === "1";
	const crudo = String(datos.get("idsEnOrden") ?? "");

	let idsEnOrden: unknown;
	try {
		idsEnOrden = JSON.parse(crudo);
	} catch {
		return responder(redirect, ajax, false, "No se pudo leer el nuevo orden. Inténtalo de nuevo.");
	}

	if (!Array.isArray(idsEnOrden) || idsEnOrden.length === 0) {
		return responder(redirect, ajax, false, "No se recibió ningún orden para guardar.");
	}

	if (!idsEnOrden.every((id): id is number => Number.isInteger(id) && id > 0)) {
		return responder(redirect, ajax, false, "El orden recibido no es válido.");
	}

	if (new Set(idsEnOrden).size !== idsEnOrden.length) {
		return responder(redirect, ajax, false, "El orden recibido tiene sandalias repetidas.");
	}

	const productosActuales = await listarTodos();
	const activas = productosActuales.filter((p) => !estaArchivado(p.archivado));
	const archivadas = productosActuales.filter((p) => estaArchivado(p.archivado));

	if (idsEnOrden.length !== activas.length) {
		return responder(
			redirect,
			ajax,
			false,
			"El catálogo cambió mientras ordenabas. Recarga e inténtalo de nuevo.",
		);
	}

	const idsActivas = new Set(activas.map((p) => p.id));
	if (!idsEnOrden.every((id) => idsActivas.has(id))) {
		return responder(
			redirect,
			ajax,
			false,
			"El catálogo cambió mientras ordenabas. Recarga e inténtalo de nuevo.",
		);
	}

	const idsFinal = [...idsEnOrden, ...archivadas.map((p) => p.id)];

	try {
		await guardarOrdenCompleto(idsFinal);
	} catch {
		return responder(redirect, ajax, false, "No se pudo guardar el nuevo orden. Inténtalo de nuevo.");
	}

	return responder(redirect, ajax, true, "Orden guardado.");
};
