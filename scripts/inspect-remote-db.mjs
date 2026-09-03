// Diagnóstico READ-ONLY de la base de datos remota (Astro DB / libSQL).
// Solo hace SELECT y PRAGMA. Nunca contiene ni imprime credenciales.
// Uso: npm run db:inspect:remote
//
// Requiere ASTRO_DB_REMOTE_URL y ASTRO_DB_APP_TOKEN en el entorno (por
// ejemplo, cargando el .env local antes de ejecutar este script).
//
// Este script NUNCA debe ganar capacidad de escritura. Cualquier migración
// real debe hacerse con un script temporal aparte, sin trackear en git —
// ver MIGRACIONES-PRODUCCION.md.
import { createClient } from "@libsql/client";

const url = process.env.ASTRO_DB_REMOTE_URL;
const authToken = process.env.ASTRO_DB_APP_TOKEN;

if (!url || !authToken) {
	console.error(
		"Faltan ASTRO_DB_REMOTE_URL y/o ASTRO_DB_APP_TOKEN en el entorno.\n" +
			"Cárgalos desde tu .env local antes de ejecutar este script.",
	);
	process.exit(1);
}

const client = createClient({ url, authToken });

function linea(titulo) {
	console.log("\n=== " + titulo + " ===");
}

try {
	await client.execute("SELECT 1");
	console.log("Conexión: OK");

	linea("Tablas");
	const tablas = await client.execute("SELECT name, type FROM sqlite_master ORDER BY name");
	for (const t of tablas.rows) console.log(`- ${t.name} (${t.type})`);

	const existeProducto = tablas.rows.some((t) => String(t.name).toLowerCase() === "producto");

	if (!existeProducto) {
		console.log("\nLa tabla Producto no existe en esta base.");
	} else {
		linea("Schema de Producto");
		const info = await client.execute("PRAGMA table_info('Producto')");
		for (const c of info.rows) {
			console.log(`${c.name} | tipo=${c.type} | notnull=${c.notnull} | pk=${c.pk} | default=${c.dflt_value}`);
		}

		linea("Conteo de filas");
		const conteo = await client.execute('SELECT COUNT(*) AS total FROM "Producto"');
		console.log("total:", conteo.rows[0].total);

		if (Number(conteo.rows[0].total) > 0) {
			linea("Productos (id, nombre, disponible)");
			const filas = await client.execute('SELECT id, nombre, disponible FROM "Producto" ORDER BY id');
			for (const f of filas.rows) {
				console.log(`id=${f.id} | nombre="${f.nombre}" | disponible=${f.disponible}`);
			}
		}
	}
} catch (error) {
	console.error("ERROR:", error instanceof Error ? error.message : error);
	process.exit(1);
} finally {
	client.close();
}
