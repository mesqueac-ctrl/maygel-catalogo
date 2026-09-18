import type { APIRoute } from "astro";
import { listarDisponibles } from "../lib/productos";

// Se genera dinámicamente en lugar de mantenerse como archivo estático para
// incluir automáticamente las fichas de producto reales, sin hardcodear URLs.
export const GET: APIRoute = async ({ site }) => {
	const base = (site?.href ?? "https://www.maygel.co/").replace(/\/$/, "");
	const productos = await listarDisponibles();

	const urls = [
		{ loc: `${base}/`, priority: "1.0" },
		// Páginas estáticas de ayuda/términos (Fase 8.3) — index,follow reales,
		// se listan a mano porque no vienen de la base de datos.
		{ loc: `${base}/ayuda`, priority: "0.6" },
		{ loc: `${base}/terminos`, priority: "0.3" },
		...productos.map((producto) => ({
			loc: `${base}/productos/${producto.slug}`,
			priority: "0.8",
		})),
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(url) => `	<url>
		<loc>${url.loc}</loc>
		<changefreq>weekly</changefreq>
		<priority>${url.priority}</priority>
	</url>`,
	)
	.join("\n")}
</urlset>
`;

	return new Response(xml, {
		headers: { "Content-Type": "application/xml" },
	});
};
