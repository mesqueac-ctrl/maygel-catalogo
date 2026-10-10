# Migraciones de Astro DB en producción — procedimiento seguro

> Este documento existe porque Astro 7 eliminó el CLI `astro db` (push,
> verify, shell, execute) que `@astrojs/db` documenta como forma normal de
> aplicar cambios de esquema. El runtime de `@astrojs/db` sigue funcionando
> con normalidad en producción — solo la herramienta de migración desapareció.

## 🚫 Prohibido, siempre, contra la base remota de producción

- `astro db push` (con o sin `--force-reset`)
- `astro db execute`
- `astro db verify`, `astro db shell`
- invocar directamente los módulos compilados de `@astrojs/db`
  (`node_modules/@astrojs/db/dist/core/cli/...`)
- cualquier variante de "reset", "sync forzado" o "recrear tabla"

**Por qué**: `--force-reset` borra todos los datos y recrea la tabla desde
cero. Es exactamente la función que, según la evidencia disponible, vació la
tabla `Producto` en este proyecto una vez (ver "Incidente conocido" más abajo).

## Incidente conocido

En algún momento, la tabla `Producto` en producción pasó de tener 3 filas
(los productos de ejemplo del seed) a tener 0 filas, sin que el esquema
cambiara. La investigación forense (ver historial de esta sesión) descartó:

- el `ALTER TABLE` manual de la migración de `imagenesColores` (las 3 filas
  seguían presentes justo después de ejecutarlo);
- `npm run build` / `astro build --remote` (no ejecuta seed ni tocan
  `_astro_db_snapshot`, confirmado leyendo el código de la integración);
- el endpoint `/admin/api/eliminar` (solo borra una fila a la vez, con `WHERE
  id = X` obligatorio — no puede vaciar la tabla en una sola operación);
- cualquier proceso automático (no existe CI/cron en este repositorio).

La evidencia que sí quedó: la tabla interna `_astro_db_snapshot` (que **solo**
la función `push`/`pushToDb` de `@astrojs/db` escribe) contenía múltiples
entradas, incluyendo dos con el esquema ya actualizado (con `imagenesColores`)
— es decir, algo ejecutó esa función al menos dos veces después de la
migración manual. La hipótesis mejor sustentada es que alguien, en algún
momento, ejecutó `astro db push` con `--force-reset` (posiblemente invocando
el módulo compilado directamente, ya que el CLI normal de `astro` no enruta
el comando `db` en este proyecto) — probablemente intentando "arreglar" o
"sincronizar" el esquema sin saber que esa ruta borra los datos.

No se pudo confirmar con certeza absoluta quién ni cuándo. Los datos
perdidos eran productos de ejemplo (demo), no catálogo real — el impacto
real fue bajo, pero el mecanismo que lo permitió sigue existiendo si alguien
vuelve a intentar lo mismo.

## Procedimiento seguro para aplicar un cambio de esquema

### Antes

1. Confirmar que `ASTRO_DB_REMOTE_URL` y `ASTRO_DB_APP_TOKEN` están
   disponibles en el entorno — nunca imprimir sus valores ni pegarlos en
   ningún archivo del repositorio.
2. Si el proveedor de la base (Turso u otro) ofrece backup o "point-in-time
   recovery", confirmarlo desde su dashboard antes de continuar. (Ver
   "Backups" más abajo — no verificado en este proyecto todavía.)
3. Ejecutar `npm run db:inspect:remote` y guardar su salida (fuera del
   repositorio) como referencia: cuántas filas tiene cada tabla, y el schema
   completo de `Producto`.

### Migración

4. Escribir un script temporal (fuera de `src/`, por ejemplo en `scripts/`,
   sin trackear en git) que use `@libsql/client`:
   ```js
   import { createClient } from "@libsql/client";
   const client = createClient({
     url: process.env.ASTRO_DB_REMOTE_URL,
     authToken: process.env.ASTRO_DB_APP_TOKEN,
   });
   ```
5. El SQL a ejecutar debe ser **exacto y mínimo** — típicamente un único
   `ALTER TABLE "Producto" ADD COLUMN nombreColumna TEXT;` (nullable, sin
   `NOT NULL` ni `DEFAULT` artificial). Nunca `DROP`, nunca recrear la tabla,
   salvo una decisión extraordinaria y explícitamente autorizada por el
   negocio, documentada aparte.
6. Ejecutar solo esa sentencia. Nada de bucles, nada de "reset y vuelvo a
   crear todo".

### Después

7. Ejecutar `npm run db:inspect:remote` de nuevo y comparar contra el "antes"
   del paso 3: mismo número de filas, mismos IDs, columnas nuevas con los
   valores esperados (normalmente `NULL` para filas existentes).
8. Borrar el script temporal de migración — nunca debe quedar en el
   repositorio ni contener credenciales escritas literalmente.
9. Ejecutar `npm run build` (build remoto) para confirmar que el código
   funciona contra el esquema actualizado.
10. Smoke test manual: homepage, catálogo, una ficha, sitemap, admin.

## Backups / recuperación (Turso)

**PENDIENTE DE VERIFICACIÓN EN DASHBOARD TURSO.** No se pudo confirmar desde
este entorno si el plan actual de Turso incluye backups automáticos o
"point-in-time recovery" — no hay CLI de Turso instalado ni sesión
autenticada disponible aquí. Antes de la próxima migración, alguien con
acceso al dashboard de Turso debería confirmar:

- si existen backups automáticos y con qué retención;
- si el plan permite "time travel" / restauración a un punto en el tiempo;
- qué acceso (cuenta, permisos) se necesita para restaurar si hiciera falta.

## Rotación de `ASTRO_DB_APP_TOKEN`

**Recomendado: sí**, como medida de precaución — no porque haya evidencia de
que el token esté comprometido externamente, sino porque no se pudo
determinar con certeza quién ejecutó la operación que vació la tabla, y
reducir la superficie de quién puede escribir directamente contra la base
remota es una buena práctica antes de cargar el catálogo real.

Orden seguro para rotarlo (no ejecutado — requiere acceso a Turso/Vercel):

1. Crear un token nuevo desde el proveedor de la base (Turso).
2. Actualizar `ASTRO_DB_APP_TOKEN` en Vercel → Settings → Environment
   Variables (entorno Production).
3. Actualizar el `.env` local de quien tenga autorización para desarrollo.
4. Redeploy en Vercel para que la función server-side reciba el token nuevo.
5. Verificar que el sitio y el admin siguen funcionando con normalidad.
6. Solo entonces, revocar el token anterior desde el proveedor.

## Historial de migraciones aplicadas

| Fecha | Cambio | Filas antes/después | Notas |
|---|---|---|---|
| (Fase 0) | `ALTER TABLE Producto ADD COLUMN imagenesColores TEXT;` | 0/0 | Ver `CONTEXTO-PROYECTO.md` § 10.1 |
| (Fase 0/1) | `ALTER TABLE Producto ADD COLUMN categoria TEXT; ALTER TABLE Producto ADD COLUMN destacado INTEGER NOT NULL DEFAULT 0;` | 0/0 | — |
| Fase 5 | `ALTER TABLE Producto ADD COLUMN slug TEXT; CREATE UNIQUE INDEX idx_producto_slug ON Producto(slug);` | 0/0 | Slug persistente — ver `ARCHITECTURE.md` § slug. Índice único creado además de la columna (dos sentencias, ambas aditivas) |

## Migración diseñada, NO ejecutada: columna `precioOferta` (Fase 8.2)

**Estado: diseñada y documentada aquí, pendiente de autorización explícita
antes de ejecutarse ni de desplegar el código que la usa. No se ha corrido
nada de lo siguiente.**

### Por qué hace falta antes del deploy

El código de Fase 8.2 añade `precioOferta` a `db/config.ts` para soportar
descuentos por producto (ver `ARCHITECTURE.md` § 4.4). Local recrea la tabla
en cada arranque, así que ya funciona ahí sin nada más — pero remoto no
tiene esa columna. Si el código nuevo se desplegara sin esta migración,
cualquier consulta a `Producto` en producción (`db.select()`, `db.insert()`,
`db.update()`) fallaría con "no such column: precioOferta", **incluso con la
tabla en 0 filas** — SQLite valida las columnas referenciadas en la consulta
antes de mirar si hay filas. Es aditiva y de bajo riesgo (nullable, sin
tocar filas existentes), pero es una precondición real, no opcional, para
este deploy.

### Script exacto para cuando se autorice

```sql
ALTER TABLE "Producto" ADD COLUMN "precioOferta" REAL;
```

Una sola sentencia, aditiva, nullable, sin `DEFAULT` — sigue exactamente el
mismo patrón ya usado en Fase 0/1/5 (ver historial arriba). No requiere el
procedimiento de 12 pasos que sí necesitó `slug NOT NULL` (Fase 5.1) porque
aquí no se pide ninguna restricción `NOT NULL` — es opcional por diseño.

### Condiciones para ejecutarla

1. Confirmar de nuevo `npm run db:inspect:remote` inmediatamente antes de
   ejecutar (verificar que sigue en 0 filas, o que las filas reales que
   pueda haber para entonces no se ven afectadas por una columna nueva
   nullable — de cualquier forma, aditiva y segura).
2. Ejecutar solo esa sentencia, con el procedimiento seguro ya documentado
   arriba (script temporal fuera de `src/`, `@libsql/client` directo, nunca
   `astro db push`).
3. Verificar con `npm run db:inspect:remote` de nuevo.
4. Solo entonces, desplegar el código de Fase 8.2 — nunca antes.
5. Actualizar la fila de "Historial de migraciones aplicadas" con fecha real
   y filas antes/después.

## Migración diseñada, NO ejecutada: `slug NOT NULL` físico en remoto (Fase 5.1)

**Estado: diseñada y documentada aquí, pendiente de autorización explícita del
negocio antes de ejecutarse. No se ha corrido nada de lo siguiente.**

### Por qué no se ejecutó ya

`db/config.ts` declara `slug: column.text({ unique: true })` — sin
`optional: true`, es decir NOT NULL a nivel de esquema declarado. Local
(`astro dev`/`build:local`) ya cumple esto de verdad porque recrea la tabla
en cada arranque. Remoto no: la columna se añadió con `ALTER TABLE ADD
COLUMN` (Fase 5), y SQLite no permite añadir `NOT NULL` a una columna
existente sin recrear la tabla completa (el procedimiento "12 pasos" de
SQLite: crear tabla nueva con la restricción, copiar filas, borrar la vieja,
renombrar la nueva). Eso es exactamente la clase de operación que este mismo
documento prohíbe hacer sin "una decisión extraordinaria y explícitamente
autorizada por el negocio, documentada aparte" (ver arriba), después del
incidente que vació `Producto` una vez. Por eso, aunque remoto tiene
actualmente 0 filas (riesgo real de pérdida de datos: ninguno hoy), esta
migración se deja diseñada pero sin correr, en vez de ejecutarse dentro de
esta misma fase de trabajo.

La restricción de unicidad **ya está aplicada de verdad** en remoto vía
`CREATE UNIQUE INDEX idx_producto_slug ON Producto(slug)` (Fase 5) — un
índice único en SQLite rechaza duplicados exactamente igual que una columna
`UNIQUE`. Solo falta la parte NOT NULL.

### Script exacto para cuando se autorice

```sql
-- 1. Tabla nueva con la misma forma que Producto, pero slug NOT NULL.
CREATE TABLE "Producto_new" (
  "id" INTEGER PRIMARY KEY,
  "nombre" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "precio" REAL NOT NULL,
  "tallas" TEXT NOT NULL,
  "colores" TEXT NOT NULL,
  "imagen" TEXT NOT NULL,
  "imagenesColores" TEXT,
  "descripcion" TEXT NOT NULL,
  "disponible" INTEGER NOT NULL DEFAULT 1,
  "orden" INTEGER NOT NULL DEFAULT 0,
  "categoria" TEXT,
  "destacado" INTEGER NOT NULL DEFAULT 0
);

-- 2. Copiar todas las filas. Si existiera alguna fila con slug NULL, esta
--    sentencia falla sola (constraint violation) y no se pierde nada — señal
--    de que hay que rellenar ese slug a mano antes de reintentar.
INSERT INTO "Producto_new" SELECT
  "id", "nombre", "slug", "precio", "tallas", "colores", "imagen",
  "imagenesColores", "descripcion", "disponible", "orden", "categoria",
  "destacado"
FROM "Producto";

-- 3. Reemplazar. DROP solo ocurre después de que el INSERT SELECT anterior
--    ya tuvo éxito completo.
DROP TABLE "Producto";
ALTER TABLE "Producto_new" RENAME TO "Producto";

-- 4. Recrear el índice único (se pierde al recrear la tabla).
CREATE UNIQUE INDEX idx_producto_slug ON Producto(slug);
```

### Condiciones para ejecutarla

1. Autorización explícita y documentada del negocio (no solo de quien
   programa) para esta recreación de tabla puntual — sigue la misma regla que
   toda otra recreación de tabla en este documento.
2. Seguir el "Procedimiento seguro" completo de más arriba (backup/point-in-time
   check, `db:inspect:remote` antes y después, script fuera de git, smoke test).
3. Confirmar antes de correr el paso 2 que ninguna fila real tiene
   `slug IS NULL` (`SELECT id, nombre FROM Producto WHERE slug IS NULL;`) —
   si las hay, resolverlas primero a mano, no dejar que el INSERT falle a
   medias.
4. Una vez ejecutada, actualizar la tabla de "Historial de migraciones
   aplicadas" de abajo con fecha real y filas antes/después, y quitar esta
   sección o marcarla como completada.

## Migración diseñada, NO ejecutada: columna `archivado`

**Estado: escrita aquí y en `scripts/migracion-archivado.sql`. No se ha
corrido contra producción ni contra la base remota.**

### Orden obligatorio

1. **Primero** aplicar el `ALTER` en producción (script temporal con
   `@libsql/client`, nunca `astro db push`).
2. Verificar con `npm run db:inspect:remote`: misma cantidad de filas; la
   columna nueva en `NULL` para las existentes.
3. **Después** desplegar el código que lee `archivado`.
4. Si se despliega el código antes del ALTER, las consultas a `Producto`
   fallan con `no such column: archivado`.

NULL o 0 = no archivado. Solo 1/true cuenta como archivada.

```sql
ALTER TABLE "Producto" ADD COLUMN "archivado" INTEGER;
```

## Principio de mínimo acceso (scopes del token)

**NO VERIFICABLE** desde este entorno — no hay forma segura de inspeccionar
los permisos/alcance del token actual sin acceso al dashboard de Turso. No se
debe asumir que el token tiene acceso de solo lectura o de escritura limitada
sin confirmarlo ahí.
