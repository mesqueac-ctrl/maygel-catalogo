## Fuente de verdad

Antes de modificar UI, arquitectura, SEO, contenido o rendimiento, lee los
documentos relevantes de `/docs`. Este archivo es el gobierno del proyecto;
`/docs` es donde vive el detalle. No improvises un criterio que ya está
decidido en alguno de esos documentos.

## Orden de autoridad

1. `CLAUDE.md` (este archivo)
2. `docs/BRAND_SYSTEM.md`
3. `docs/DESIGN_SYSTEM.md`
4. `docs/ARCHITECTURE.md`
5. La especificación de página que aplique (`docs/HOMEPAGE_SPEC.md`,
   `docs/PRODUCT_PAGE_SPEC.md`, `docs/SEO_RULES.md`, `docs/UX_RULES.md`,
   `docs/PERFORMANCE_RULES.md`, `docs/CONTENT_GUIDE.md`)
6. La implementación existente en el código

Cuando dos fuentes entren en conflicto, gana la de mayor autoridad — y el
conflicto se documenta como inconsistencia en `docs/ARCHITECTURE.md`, no se
resuelve en silencio improvisando un tercer criterio.

## Reglas obligatorias

- No improvisar estilos locales que contradigan el design system
  (`docs/DESIGN_SYSTEM.md`).
- No cambiar tokens globales (`src/styles/global.css`) para arreglar una sola
  pantalla sin justificarlo explícitamente en el mensaje de la fase.
- No romper el admin, la base de datos ni las integraciones (Blob, auth) por
  cambios visuales de la web pública. El admin tiene su propio sistema visual
  intencional — ver `docs/ARCHITECTURE.md` § 8.
- No añadir librerías sin justificar peso y necesidad (el proyecto es
  deliberadamente ligero: Astro + Astro DB + Blob, sin frameworks de UI ni
  CSS).
- No duplicar lógica. La lógica de negocio y acceso a datos vive en
  `src/lib/`, nunca copiada en un componente de presentación.
- No inventar información comercial: precios, materiales, políticas de
  envío/cambio, condiciones mayoristas. Todo debe salir de la base de datos o
  de una confirmación explícita del negocio (ver `docs/CONTENT_GUIDE.md`).
- No inventar productos, precios, materiales o políticas para llenar una
  vista o probar un diseño — usar los fixtures de `db/seed.ts` marcados como
  tal, nunca presentarlos como catálogo real.
- No afirmar métricas de performance/accesibilidad no medidas realmente
  contra el build actual (ver `docs/PERFORMANCE_RULES.md`).
- No considerar terminada una fase con errores de build, typecheck o lint.
  Verificación mínima antes de cerrar cualquier cambio:
  ```
  npx astro sync
  npx @astrojs/check --tsconfig tsconfig.json
  ASTRO_DATABASE_FILE=".astro/local.db" npm run build:local
  ```
  Y `npm run build` (con `--remote`) antes de considerar algo listo para
  producción — requiere credenciales de la base de datos remota; no se
  "arregla" quitando `--remote`.
- Mantener móvil como prioridad (`docs/UX_RULES.md` § 1) — todo componente se
  diseña primero para 360–430px.
- Respetar accesibilidad: `44px` de área táctil mínima, un solo `<h1>` por
  página, `prefers-reduced-motion` respetado, contraste AA verificado (ver
  `docs/DESIGN_SYSTEM.md` § 15).
- Mantener alta calidad visual: sin sombras, sin bordes redondeados salvo
  swatches de color, sin botones-caja sólidos en la interfaz pública, sin
  "eyebrows" (etiquetas pequeñas sobre un titular) — ver
  `docs/BRAND_SYSTEM.md` § 4 y 14.

**Regla permanente:** una implementación funcional pero visualmente genérica,
inconsistente o con apariencia de prototipo no se considera terminada.

## Nunca ejecutar contra la base de datos remota de producción

- `astro db push` (con o sin `--force-reset`)
- `astro db execute`
- cualquier invocación directa de los módulos compilados de `@astrojs/db`

Ese CLI no existe en Astro 7 (fue retirado) y su ruta `--force-reset` borra
todos los datos — esto ya ocurrió una vez en este proyecto (ver
`MIGRACIONES-PRODUCCION.md`). Cualquier cambio de schema sigue el
procedimiento manual con `@libsql/client` documentado ahí y en
`docs/ARCHITECTURE.md` § 5.

## Protocolo de trabajo (antes de cada fase)

1. Leer la documentación relevante en `/docs` (y `CONTEXTO-PROYECTO.md` para
   historia de negocio/auth/Blob no cubierta en `/docs`).
2. Inspeccionar el código existente relacionado — no asumir el estado a
   partir de documentación previa sin verificar contra el código real.
3. Describir el plan antes de implementar cambios grandes (el cliente prefiere
   ver la propuesta antes que el código, ver `CONTEXTO-PROYECTO.md` § 15).
4. Implementar.
5. Ejecutar las validaciones de la sección anterior.
6. Comparar el resultado contra los criterios de aprobación de la fase
   (`docs/ROADMAP.md`).
7. Reportar los cambios (archivos tocados, qué se verificó).
8. Registrar decisiones importantes en el documento de `/docs` que
   corresponda (o en `docs/ROADMAP.md` si es de alcance/estado de fase).

## Desarrollo

Al iniciar el servidor de desarrollo, usa modo background:

```
astro dev --background
```

Gestiona el servidor en background con `astro dev stop`, `astro dev status` y
`astro dev logs`.

## Documentación de Astro

Documentación completa: https://docs.astro.build

Consulta estas guías antes de trabajar en tareas relacionadas:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
