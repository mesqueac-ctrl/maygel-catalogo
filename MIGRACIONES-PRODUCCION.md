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

## Principio de mínimo acceso (scopes del token)

**NO VERIFICABLE** desde este entorno — no hay forma segura de inspeccionar
los permisos/alcance del token actual sin acceso al dashboard de Turso. No se
debe asumir que el token tiene acceso de solo lectura o de escritura limitada
sin confirmarlo ahí.
