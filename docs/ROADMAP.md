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

## Fase 6.1 — Deploy controlado + verificación post-producción

- **Objetivo:** desplegar de forma segura todo el trabajo acumulado de Fases
  0→6 (que hasta este punto solo existía en el árbol de trabajo local, sin
  comitear) y verificar con evidencia real que `https://www.maygel.co`
  corresponde al código actual.
- **Alcance:** control de cambios pre-deploy (auditoría completa de
  `git status`/diff, búsqueda de datos de prueba y secretos), un commit
  acumulativo (`a667e1d`), push a `origin/master`, verificación de que el
  deploy automático de Vercel (Git integration ya existente, no se creó
  ningún proyecto nuevo) sirvió la versión nueva, y verificación funcional
  de producción real (SEO, cache, responsive, menú móvil, consola, JSON-LD).
  **Cero cambios de código nuevos** — el único artefacto de código de esta
  fase es la verificación misma; `vercel.json` ya se había creado en Fase 6.
- **Hallazgos pre-deploy:** sin datos de prueba filtrados a `db/seed.ts` (los
  productos editados durante las pruebas de Fase 5.1 vivían solo en
  `.astro/local.db`, gitignorado y regenerado desde el seed en cada build);
  sin secretos en el diff (`.env`/`.env.production` gitignorados, solo
  `.env.example` con placeholders trackeado); sin archivos temporales,
  screenshots ni logs; 0 divergencia con `origin/master` antes del push.
- **Migración `slug NOT NULL`:** revisada de nuevo — no bloquea este deploy.
  El remoto sigue en 0 filas, la unicidad ya es real (`idx_producto_slug`),
  y la app siempre rellena `slug` al crear — dejarla pendiente no tiene
  riesgo real hoy. Se mantiene diseñada y sin ejecutar, sin cambios respecto
  a Fase 5.1.
- **Verificación post-deploy (evidencia real, no local):** dominio canónico
  estable (`https://www.maygel.co`, redirects 308 en un solo salto); robots,
  sitemap, 404 y `/admin` correctos; fuentes/tema nuevos confirmados en vivo
  (`Cormorant Garamond`/`Manrope`, `#8C5A2F`) — cero rastro de la marca
  anterior (`#B5651D`, Playfair, Inter) en home/login/404; cache-control
  `immutable` confirmado en `_astro/*` reales, sin aplicarse a `/public` sin
  hash; menú móvil probado en producción (abre, `Escape` cierra, foco
  vuelve, scroll bloqueado, `main` inerte, sin errores de consola); catálogo
  vacío real (0 productos en remoto) muestra su estado vacío ya diseñado,
  no un grid roto; sin overflow horizontal real en 375/430/768/1024 (los
  valores negativos de scroll width en 768/1024 son el ancho de scrollbar
  del navegador, no overflow de contenido — mismo patrón ya documentado en
  Fase 2).
- **No medido en este entorno:** Lighthouse/PSI/CrUX reales — sigue sin
  existir acceso a esa herramienta desde aquí (ver `PERFORMANCE_RULES.md` §
  Fase 6.1). No se inventó ningún score.
- **Dependencias:** Fase 6.
- **Criterios de aprobación:** la versión de producción corresponde al
  código actual con evidencia real verificada (no solo "push exitoso" o
  "build correcto") — cumplido para todo lo que se puede verificar sin
  Lighthouse real.
- **Estado:** ✅ Completa (deploy y verificación funcional/SEO). Medición de
  Lighthouse/PSI/CrUX real y carga de catálogo real quedan como acción
  externa (ver entrega de la fase).

## Fase 7 — Confianza, conversión y contenido comercial

- **Objetivo:** auditar todo el contenido comercial público (proceso de
  compra, WhatsApp, CTAs, materiales, envíos, pagos, cambios, mayoristas,
  historia, footer) contra la realidad confirmada del negocio, sin añadir
  técnicas artificiales de conversión (badges, urgencia, reviews falsas).
- **Alcance:** `docs/COMMERCIAL_TRUST_MATRIX.md` (nuevo, fuente de verdad
  comercial), `docs/SIZE_GUIDE_REQUIREMENTS.md` (nuevo), `docs/
  BUSINESS_INPUTS.md` (nuevo), `docs/CONTENT_GUIDE.md` (glosario de
  términos aprobados), `docs/UX_RULES.md`/`docs/PRODUCT_PAGE_SPEC.md`
  (correcciones de documentación). Código: `src/lib/whatsapp.ts` (el
  mensaje de encargo de producto ahora incluye el precio, que faltaba),
  `src/pages/productos/[slug].astro` (pasa el precio al CTA y al script),
  `src/components/ProductGrid.astro` (copy de catálogo vacío corregido —
  ya no promete una "próxima colección" sin plan confirmado).
- **Hallazgos:** el resto del contenido comercial auditado ya era honesto y
  consistente desde fases anteriores (proceso de compra real de 4 pasos,
  mayoristas sin cifras inventadas, guía de tallas ya honesta, sin badges ni
  logos de pago falsos, sin políticas legales inventadas). Las dos
  correcciones de código de esta fase fueron los únicos defectos reales
  encontrados; todo lo demás que falta es información que solo el negocio
  puede dar, documentada en `BUSINESS_INPUTS.md` sin inventar respuestas.
- **Dependencias:** Fase 6.1.
- **Criterios de aprobación:** una clienta puede entender qué vende Maygel,
  cómo pedir, cuánto cuesta, qué debe elegir, qué pasa después, cómo recibe
  y qué ocurre si tiene un problema, sin depender de suposiciones — cumplido
  para todo lo que el negocio ya confirmó; lo que falta queda explícito en
  `BUSINESS_INPUTS.md`, no rellenado con placeholders visibles.
- **Estado:** ✅ Completa (auditoría + correcciones de código con datos ya
  confirmados). Catálogo real, historia real, guía de tallas real y el resto
  de `BUSINESS_INPUTS.md` quedan como acción externa del negocio.

## Fase 7.1 — Commit + deploy + verificación de Fase 7

- **Objetivo:** publicar los cambios aprobados de Fase 7 (sin funcionalidad
  nueva) y verificar con evidencia real que producción refleja el fix de
  precio en WhatsApp y el copy honesto de catálogo vacío.
- **Alcance:** un commit limpio con exactamente los 10 archivos de Fase 7
  (`1e42afa`), push a `origin/master`, verificación post-deploy contra
  `https://www.maygel.co` (copy vacío en vivo, SEO sin cambios, sin
  regresiones de marca/consola/overflow).
- **Dependencias:** Fase 7.
- **Criterios de aprobación:** el commit servido en producción corresponde
  al código aprobado, sin regresiones — cumplido, verificado con `curl` y en
  navegador.
- **Estado:** ✅ Completa.

## Fase 8 — Brand Content Production (preparación de insumos reales)

- **Objetivo:** organizar y estructurar (sin inventar) los insumos reales de
  marca y negocio que faltan para pasar de "web bien construida" a "marca
  completa": catálogo real, fotografía, historia, materiales, guía de
  tallas, políticas y contenido comercial. Fase de documentación pura, cero
  código.
- **Alcance:** `docs/REAL_CATALOG_INPUT.md` (nuevo — ficha reutilizable por
  producto + reglas de naming), `docs/PHOTOGRAPHY_BRIEF.md` (nuevo — brief
  completo de las 4 familias, hero, craft moment, destacado, mayoristas,
  redes, video, estándar técnico, nomenclatura, shoot day plan, prioridades
  MUST/SHOULD/NICE), `docs/BRAND_STORY_INPUT.md` (nuevo — 12 preguntas para
  la historia real), `docs/OWNER_CONTENT_CHECKLIST.md` (nuevo — checklist
  no técnico para el dueño del negocio), `docs/BUSINESS_INPUTS.md`
  (ampliado con preguntas concretas de cambios/garantía, envíos, pagos y
  mayoristas, antes en prosa general). **Sin cambios de código, CSS, DB ni
  deploy** — cumplido tal como pedía la fase.
- **Dependencias:** Fase 7.1.
- **Criterios de aprobación:** cada insumo pendiente tiene una pregunta
  concreta y accionable en algún documento, sin duplicar preguntas ya
  resueltas en fases anteriores, y sin ningún dato inventado para rellenar
  un hueco.
- **Estado:** ✅ Completa.

## Fase 8.2 — Precio real, colores confirmados y sistema de descuentos

- **Objetivo:** registrar la primera información comercial real confirmada
  por el negocio (precio retail, colores, canal mayorista, fabricación bajo
  pedido) sin aplicarla a los fixtures, y construir la arquitectura de
  descuentos por producto que el negocio pidió — sin activar ningún
  descuento concreto todavía.
- **Alcance:** documentación primero (`COMMERCIAL_TRUST_MATRIX.md`,
  `BUSINESS_INPUTS.md`, `CONTENT_GUIDE.md`, `PRODUCT_PAGE_SPEC.md`,
  `ARCHITECTURE.md`, `MIGRACIONES-PRODUCCION.md`), después código:
  `productos.ts` (colores Café/Plateado, `precioEfectivo()`), `db/config.ts`
  (`precioOferta` opcional), `admin/api/guardar.ts` (validación de servidor
  del descuento), `ProductoForm.astro` (campo de precio con descuento),
  `ProductCard.astro`/`[slug].astro` (precio tachado + efectivo),
  `whatsapp.ts`/consts (mensaje mayorista actualizado, precio efectivo en el
  mensaje de producto), `VentaMayor.astro` (colores actualizados, sin claim
  de material sin confirmar).
- **Dependencias:** Fase 8.1A.
- **Migración pendiente, NO ejecutada:** `precioOferta` requiere
  `ALTER TABLE` aditivo en remoto antes de desplegar este código — ver
  `MIGRACIONES-PRODUCCION.md` § Fase 8.2. Sin esta migración, el deploy
  rompería cualquier consulta a `Producto` en producción.
- **Criterios de aprobación:** ningún dato inventado (tallas, materiales,
  nombres de modelos, descuentos concretos, reglas mayoristas siguen
  pendientes y documentados como tales); precio efectivo calculado por una
  única función, nunca duplicado; validación de descuento solo en servidor.
- **Estado:** ✅ Completa en código y documentación, **deploy y migración
  pendientes de aprobación explícita** (no ejecutados en esta fase).

## Fase 9 — Mayoristas

- **Objetivo:** confirmar con el negocio si hay condiciones reales (mínimos,
  descuentos) que documentar y mostrar.
- **Alcance:** `VentaMayor.astro`, `CONTENT_GUIDE.md`.
- **Dependencias:** confirmación de negocio.
- **Criterios de aprobación:** cualquier condición mostrada es real y
  verificada, nunca inventada para sonar más atractiva.
- **Estado:** ⬜ Pendiente.

## Fase 10 — Performance

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

## Fase 11 — QA completo

- **Objetivo:** pase final de calidad antes de considerar el proyecto
  "terminado" en su forma Quiet Colombian Craft: build, typecheck,
  accesibilidad, SEO, responsive, contenido, todo contra los documentos de
  `/docs`.
- **Alcance:** todo el repositorio.
- **Dependencias:** Fases 0-10.
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
