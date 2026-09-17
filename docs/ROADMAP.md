# Maygel — Roadmap

> Cada fase declara objetivo, alcance, dependencias, criterios de aprobación
> y estado. Ninguna fase se marca `Completa` con errores de build, typecheck
> o lint pendientes (regla de `CLAUDE.md`).

## Fase 0 — Documentación y arquitectura

- **Objetivo:** auditar el repositorio real y crear la arquitectura documental
  (`/docs` + gobierno en `CLAUDE.md`) antes de cualquier cambio visual.
- **Alcance:** los 10 documentos de `/docs`, actualización de `CLAUDE.md`. Sin
  cambios de código, CSS, DB ni comportamiento.
- **Dependencias:** ninguna.
- **Criterios de aprobación:** los 10 documentos existen y reflejan el estado
  real verificado por lectura de código (no supuestos); `CLAUDE.md` define
  orden de autoridad y reglas obligatorias.
- **Estado:** ✅ Completa (esta fase).

## Fase 1 — Brand system + tokens

- **Objetivo:** auditar críticamente el sistema visual contra la dirección
  "Quiet Colombian Craft" (no solo conservar "Quiet Luxury"), cerrar
  `BRAND_SYSTEM.md`/`DESIGN_SYSTEM.md` como especificación firme, e
  implementar la foundation global: roles semánticos de color, escala de
  espaciado, escala tipográfica formal, focus states, unificar
  `theme-color`/manifest, resolver la carga de fuentes muertas en
  `AdminLayout.astro`.
- **Alcance:** `global.css` (roles semánticos, spacing, focus-visible,
  motion ajustado), `site.webmanifest`, metadatos de tema en los layouts,
  `AdminLayout.astro` (solo el `<link>` de fuentes). **No** se tocó
  homepage, catálogo, PDP ni mayoristas — ver confirmación en la entrega de
  la fase.
- **Dependencias:** Fase 0.
- **Criterios de aprobación:** cero valores de color/tema duplicados o
  contradictorios en el repositorio; `@astrojs/check` y build sin errores;
  auditoría KEEP/REFINE/REPLACE documentada; cero regresión visual en
  componentes existentes (mismos valores de color, solo capa semántica
  añadida).
- **Estado:** ✅ Completa (foundation). Migración gradual de componentes a
  los roles semánticos nuevos y fotografía real quedan para fases
  posteriores (ver `DESIGN_SYSTEM.md` § 11).

## Fase 2 — Header / navegación / layout

- **Objetivo:** transformar el header, la navegación y el shell global
  (skip link, `<main>` identificable, footer) para que se sientan de una
  marca profesional, sin rediseñar el contenido de homepage/catálogo/PDP.
- **Alcance:** `Header.astro` (reescrito: menú móvil full-screen editorial
  con `inert` + scroll lock + cierre con Escape + devolución de foco),
  `Layout.astro` (skip link), `index.astro`/`404.astro`/`[slug].astro`
  (`<main id="contenido">`), `ContactFooter.astro` (label de nav consistente
  con el header).
- **Dependencias:** Fase 1.
- **Criterios de aprobación:** navegación por teclado completa y visible en
  cada control (heredado del focus-visible global de Fase 1); menú móvil
  accesible (Escape, foco devuelto, fondo inerte); sin regresión de
  comportamiento existente (scroll compacto, WhatsApp, anclas); 0 overflow
  horizontal verificado en 375/768/1024/1440 (320 no concluyente por una
  limitación de la herramienta de emulación de viewport, no del sitio).
- **Estado:** ✅ Completa.

## Fase 3 — Homepage editorial

- **Objetivo:** ajustar la homepage contra `HOMEPAGE_SPEC.md` — en particular
  evaluar social proof real y la sección de historia extendida si el negocio
  aporta contenido.
- **Alcance:** secciones de `src/pages/index.astro` y sus componentes.
- **Dependencias:** Fases 1-2, contenido real de historia (`CONTENT_GUIDE.md`).
- **Criterios de aprobación:** cada sección tiene contenido real o se omite;
  sin secciones de relleno.
- **Estado:** ⬜ Pendiente.

## Fase 4 — Catálogo

- **Objetivo:** convertir el catálogo en un sistema de descubrimiento de
  producto profesional — grid que no asume 3 fixtures, tarjeta sin ruido,
  chips de categoría resueltos (no dejar falsos controles).
- **Alcance:** `ProductGrid.astro` (reescrito: sin chips decorativos, grid
  por cantidad 0/1/2/3+, mobile 1→2 columnas desde 480px),
  `ProductCard.astro` (accesibilidad de swatches, `sizes`/`widths`
  responsive en `<Image>`).
- **Decisión de categorías:** `CATEGORIAS_VALIDAS` sigue sin confirmar por
  el negocio — los chips se retiraron del UI público en vez de dejarlos como
  falso filtro (ver `ARCHITECTURE.md` § 9.3). El filtrado real queda
  bloqueado por negocio, no por arquitectura: el campo `producto.categoria`
  ya existe y basta para construirlo cuando haya taxonomía confirmada.
- **Escala de filtrado (para cuando aplique):** 1–8 productos, exploración
  visual sin filtros (estado actual); 9–24, evaluar categorías ligeras; 25+,
  arquitectura de filtros completa.
- **Dependencias:** Fase 3.
- **Criterios de aprobación:** grid probado con 0/1/2/3/8 productos sin
  romperse; ningún control falso en el UI; sin links duplicados por tarjeta;
  `astro check` y ambos builds sin errores.
- **Estado:** ✅ Completa.

## Fase 5 — PDP (página de producto) + slug persistente

- **Objetivo:** slug persistente (`Producto.slug`) + PDP rediseñada como
  página propia (selector de color/talla real, guía de tallas, CTA con
  validación inline, envíos/cambios, relacionados, estado no-disponible
  diferenciado de 404).
- **Alcance:** `db/config.ts` (+`slug`), `db/seed.ts` (slugs de los 3
  fixtures), `src/lib/productos.ts` (`existeSlug`, `generarSlugDisponible`,
  `slugDeProducto()` eliminado), `admin/api/guardar.ts` (validación/generación
  de slug), `ProductoForm.astro` (campo slug + vista previa), `ProductCard.astro`
  (simplificado a solo catálogo), `productos/[slug].astro` (reescrita
  completa), `src/lib/whatsapp.ts` (+talla), `sitemap.xml.ts`,
  `FeaturedProducts.astro` (usan `producto.slug`).
- **Migración remota:** `ALTER TABLE Producto ADD COLUMN slug TEXT; CREATE
  UNIQUE INDEX idx_producto_slug ON Producto(slug);` — aplicada (0 filas
  antes/después, ver `MIGRACIONES-PRODUCCION.md` § Historial).
- **Dependencias:** Fase 4.
- **Criterios de aprobación:** renombrar un producto no cambia su URL
  (verificado); slug duplicado rechazado con mensaje claro (verificado);
  normalización de acentos/ñ/símbolos verificada; PDP probada con selección
  completa/incompleta, producto no disponible, slug inexistente (404 real);
  `astro check` y ambos builds sin errores; DB remota con 0 filas antes y
  después de la migración.
- **Estado:** ✅ Completa.

## Fase 5.1 — Hardening arquitectónico y SEO (post-aprobación de Fase 5)

- **Objetivo:** cerrar cabos sueltos identificados al aprobar Fase 5 antes de
  darla por definitivamente cerrada — sin rediseño visual: contrato final de
  inmutabilidad del slug, endurecer la constraint de unicidad/NOT NULL en DB,
  corregir la semántica de `disponible` y dejar el `Product` JSON-LD honesto
  con lo que Google realmente documenta.
- **Alcance:** `admin/api/guardar.ts` (slug ignorado por completo al editar,
  siempre reutiliza el ya guardado), `ProductoForm.astro` (campo slug de solo
  lectura al editar), `db/config.ts` (slug `unique: true`, sin `optional`),
  `src/lib/productos.ts` (comentario de `conSlugSeguro` actualizado),
  `productos/[slug].astro` (`robots: noindex, follow` en vez de `nofollow`;
  `availability` omitido del JSON-LD `Offer`), `MIGRACIONES-PRODUCCION.md`
  (migración NOT NULL diseñada, documentada, no ejecutada),
  `ARCHITECTURE.md`/`SEO_RULES.md`/`PRODUCT_PAGE_SPEC.md` actualizados. **No**
  se tocó homepage, catálogo, header, PDP visual, auth, Blob ni WhatsApp.
- **Dependencias:** Fase 5 (aprobada funcionalmente, esta fase la cierra).
- **Criterios de aprobación:** la URL de un producto ya no puede cambiar
  desde el admin bajo ninguna circunstancia (verificado, incluso contra una
  petición manipulada); DB no acepta slugs nulos sin necesidad real de
  seguir aceptándolos (NOT NULL declarado en schema; unicidad ya real en
  remoto vía índice; NOT NULL físico en remoto diseñado y pendiente de
  autorización, no bloqueante porque no hay datos que lo violen); el
  significado de `disponible` queda documentado como una sola cosa, sin
  usarse como sinónimo ambiguo de estados que no existen todavía; el JSON-LD
  no usa `MadeToOrder` (Google no lo reconoce) ni ningún estado que Google no
  documente; `noindex/nofollow` no se usa como solución genérica —
  `nofollow` solo donde de verdad no hay enlaces internos de valor.
- **Estado:** ✅ Completa.

## Fase 6 — SEO técnico + indexación + performance real

- **Objetivo:** auditoría de extremo a extremo (rastreo, indexación,
  structured data, compartibilidad, medición, encontrabilidad) contra
  `SEO_RULES.md`/`PERFORMANCE_RULES.md`, verificando producción real
  (`https://www.maygel.co`), no solo el código local.
- **Alcance:** auditoría PASS/REFINE/MISSING de ~40 puntos de SEO técnico
  (ver `SEO_RULES.md` §20-24); `vercel.json` nuevo (cache-control inmutable
  para `_astro/*`, único cambio de código de esta fase); corrección de
  documentación desactualizada (`SEO_RULES.md` § 6, heading de PDP describía
  la arquitectura anterior a Fase 5); `PERFORMANCE_RULES.md` con análisis
  estructural real del build. **Sin rediseño de homepage/PDP/catálogo, sin
  blog, sin páginas de ciudad, sin reviews falsas, sin Analytics.**
- **Hallazgo central de esta fase:** producción real corre el commit
  `b9fe47e`, anterior a todo el trabajo de Fase 0 en adelante — nada de ese
  trabajo se ha comiteado/desplegado todavía. La auditoría de "producción
  real" que pide esta fase se hizo contra ese estado anterior (dominio,
  redirects, robots.txt, sitemap, headers) porque es lo único que existe en
  producción hoy; el resto de hallazgos de contenido/JSON-LD/performance se
  verificaron contra el código actual (`build:local`), que es lo que
  reflejará producción una vez se despliegue.
- **Dependencias:** Fase 5 + 5.1. Catálogo real y despliegue del trabajo
  comiteado siguen pendientes de negocio/operación, no de código.
- **Criterios de aprobación:** coherencia entre contenido, URLs, status
  codes, indexación, sitemap, canonical, structured data y performance
  estructural — no un score aislado de Lighthouse (no medible en este
  entorno, ver `PERFORMANCE_RULES.md` § Fase 6).
- **Estado:** ✅ Completa (auditoría y hardening de cache). Medición real de
  Lighthouse/PSI/CrUX y conexión de Search Console/Merchant Center quedan
  como acción externa pendiente (ver entrega de la fase) — no bloquean el
  cierre porque dependen de desplegar primero el trabajo comiteado.

## Fase 7 — UX WhatsApp / conversión

- **Objetivo:** revisar mensajes y flujo de conversión con datos reales de
  uso (si existen) contra `UX_RULES.md` § 5.
- **Alcance:** `src/lib/whatsapp.ts`, `src/consts.ts`.
- **Dependencias:** catálogo real, tráfico real (aunque sea mínimo).
- **Criterios de aprobación:** ningún mensaje genera ambigüedad sobre qué
  producto/color/talla se pidió.
- **Estado:** ⬜ Pendiente.

## Fase 8 — Mayoristas

- **Objetivo:** confirmar con el negocio si hay condiciones reales (mínimos,
  descuentos) que documentar y mostrar.
- **Alcance:** `VentaMayor.astro`, `CONTENT_GUIDE.md`.
- **Dependencias:** confirmación de negocio.
- **Criterios de aprobación:** cualquier condición mostrada es real y
  verificada, nunca inventada para sonar más atractiva.
- **Estado:** ⬜ Pendiente.

## Fase 9 — Performance

- **Objetivo:** medir Lighthouse real (móvil) contra el estado actual del
  sistema Quiet Colombian Craft y contra `PERFORMANCE_RULES.md`.
- **Alcance:** medición y ajustes puntuales de assets/fuentes si no se
  cumplen los objetivos.
- **Dependencias:** Fases 1-2 completas (fuentes/tokens estables antes de
  medir).
- **Criterios de aprobación:** Lighthouse móvil real ≥ los objetivos
  declarados en `PERFORMANCE_RULES.md`, con captura/registro de la medición y
  fecha.
- **Estado:** ⬜ Pendiente.

## Fase 10 — QA completo

- **Objetivo:** pase final de calidad antes de considerar el proyecto
  "terminado" en su forma Quiet Colombian Craft: build, typecheck,
  accesibilidad, SEO, responsive, contenido, todo contra los documentos de
  `/docs`.
- **Alcance:** todo el repositorio.
- **Dependencias:** Fases 0-9.
- **Criterios de aprobación:** cero errores de build/typecheck/lint; checklist
  de cada documento de `/docs` revisado explícitamente; todo componente de
  catálogo/grid probado con 0, 1, 2–4 y muchos productos, y con destacados
  variables (ver `ARCHITECTURE.md` § 4.1) — no solo con los 3 fixtures de
  `db/seed.ts`.
- **Estado:** ⬜ Pendiente.

---

## Notas de gobierno del roadmap

- Ninguna fase empieza sin leer los documentos de `/docs` relevantes primero
  (regla de `CLAUDE.md` § Protocolo de trabajo).
- El estado de una fase se actualiza en este archivo al cerrarla — no queda
  únicamente registrado en una conversación.
- Si una fase requiere información del negocio que no existe todavía
  (contenido real, confirmación de categorías, condiciones mayoristas), se
  marca `⏸ Bloqueada por negocio`, no se avanza inventando el dato.
