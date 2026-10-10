-- Maygel — columna archivado
-- NO EJECUTAR contra producción desde el entorno de desarrollo.
--
-- ORDEN OBLIGATORIO:
--   1. Correr ESTE ALTER en producción (vía @libsql/client, ver
--      MIGRACIONES-PRODUCCION.md). Nunca `astro db push`.
--   2. Comprobar filas/IDs con `npm run db:inspect:remote`.
--   3. Recién entonces desplegar el código que usa `archivado`.
--
-- NULL o 0 = no archivado (productos existentes quedan NULL).
-- 1 = archivado.

ALTER TABLE "Producto" ADD COLUMN "archivado" INTEGER;
