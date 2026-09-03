import type { APIRoute } from "astro";
import { listarDisponibles, slugDeProducto } from "../lib/productos";

// Se genera dinámicamente en lugar de mantenerse como archivo estático para
// incluir automáticamente las fichas de producto reales, sin hardcodear URLs.
export const GET: APIRoute = async ({ site }) => {
	const base = (site?.href ?? "https://www.maygel.co/").replace(/\/$/, "");
	const productos = await listarDisponibles();

	const urls = [
		{ loc: `${base}/`, priority: "1.0" },
		...productos.map((producto) => ({
			loc: `${base}/productos/${slugDeProducto(producto)}`,
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
