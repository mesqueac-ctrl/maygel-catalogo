import { defineMiddleware } from "astro:middleware";
import { sesionValida } from "./lib/auth";

/** Rutas del admin que se pueden visitar sin haber iniciado sesión. */
const RUTAS_PUBLICAS = ["/admin/login", "/admin/api/login"];

export const onRequest = defineMiddleware(async (context, next) => {
	const ruta = context.url.pathname;

	if (!ruta.startsWith("/admin")) {
		return next();
	}

	if (RUTAS_PUBLICAS.includes(ruta)) {
		return next();
	}

	if (!sesionValida(context.cookies)) {
		return context.redirect("/admin/login");
	}

	return next();
});
