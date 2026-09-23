import { defineMiddleware } from "astro:middleware";
import { sesionValida } from "./lib/auth";

/** Rutas del admin que se pueden visitar sin haber iniciado sesión. */
const RUTAS_PUBLICAS = ["/admin/login", "/admin/api/login"];

export const onRequest = defineMiddleware(async (context, next) => {
	const ruta = context.url.pathname;

	// URL canónica sin slash final (Fase 13.3 §2): con trailingSlash "ignore"
	// (default de Astro) /productos/luna y /productos/luna/ resuelven ambas a
	// 200, lo que deja contenido duplicado sin canonicalizar. Redirige de forma
	// permanente (308, preserva el método) a la versión sin slash. La raíz "/"
	// queda excluida porque ahí el slash final es la propia ruta, no un sufijo.
	if (ruta !== "/" && ruta.endsWith("/")) {
		const destino = ruta.slice(0, -1) + context.url.search;
		return context.redirect(destino, 308);
	}

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
