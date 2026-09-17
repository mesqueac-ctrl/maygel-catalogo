# Maygel — Reglas de rendimiento

## Objetivos (Core Web Vitals)

| Métrica | Objetivo |
|---|---|
| LCP | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.1 |

## Objetivo Lighthouse (móvil)

| Categoría | Objetivo |
|---|---|
| Performance | ≥ 95 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | 100 |

**Regla obligatoria: no declarar estos valores como logrados sin medición
real.** La última medición registrada en `CONTEXTO-PROYECTO.md` (Performance
98, Accessibility 100, CLS ~0.0008, LCP ~1.9s) corresponde a una iteración de
diseño anterior (paleta terracota, sin el sistema Quiet Colombian Craft
actual) — **no es válida para el estado actual del código** hasta que se
vuelva a medir contra producción real.

## Reglas de implementación

### Imágenes

- Usar el componente `<Image>` de Astro para toda foto remota (Blob) —
  conversión automática a `webp` ya implementada en `ProductCard.astro`.
- Toda imagen de `/public` (fixtures/placeholders) se sirve con `<img>` plano
  con `width`/`height` explícitos — ya implementado, mantener la bifurcación
  documentada en `ARCHITECTURE.md` § 4.
- `width`/`height` explícitos en toda imagen, siempre, para prevenir CLS —
  sin excepción, incluidas fotos nuevas de producto.
- La foto del hero/producto con prioridad de LCP se marca `loading="eager"`
  + `fetchpriority="high"` (ya implementado vía prop `prioridadImagen`); el
  resto usa `loading="lazy"` por defecto.
- Formatos objetivo cuando exista fotografía real: AVIF o WebP servidos por
  el pipeline de `<Image>` — nunca subir JPEG/PNG sin optimizar como fuente
  principal si el componente puede procesarlos.

### Fuentes

- Máximo 3 pesos por familia tipográfica cargada (ver `DESIGN_SYSTEM.md` § 8).
- `rel="preconnect"` a `fonts.googleapis.com` y `fonts.gstatic.com` ya
  implementado — mantenerlo en cualquier layout nuevo que cargue Google
  Fonts.
- **Resuelto en Fase 1:** `AdminLayout.astro` cargaba Playfair Display +
  Inter sin que ninguna regla CSS los usara (ver `ARCHITECTURE.md` § 9.2) —
  reemplazado por una carga de Manrope (los pesos que el admin ya declaraba
  usar vía `--font-body`/`--font-heading`).
- No cargar una fuente nueva sin verificar antes que exista un selector CSS
  real que la consuma.

### JS y bundle

- No hay ningún framework de UI ni librería de animación — mantener esa
  restricción. Cualquier interactividad nueva se resuelve con `<script>` de
  Astro (JS vanilla, sin hidratación de componentes).
- El único observer global (`IntersectionObserver` de revelado en
  `Layout.astro`) es compartido por todas las secciones — no instanciar un
  segundo `IntersectionObserver` por componente cuando se puede reutilizar el
  atributo `data-reveal` existente.
- Cero hidratación de islas (no aplica: no hay componentes de framework). Si
  en el futuro se introduce uno, debe justificarse por qué Astro + JS vanilla
  no alcanza, y usar la directiva de hidratación más restrictiva posible
  (`client:visible` sobre `client:load`).

### CSS

- Sin framework CSS (Tailwind, etc.) — estilos scoped por componente +
  variables globales en `global.css`. Mantener esa arquitectura; no mezclar
  un segundo sistema (p. ej. utilidades ad-hoc) en componentes nuevos.
- Ningún `box-shadow`, ninguna librería de iconos pesada, ningún CSS de
  terceros vía CDN.

### Caching / assets

- El sitio es 100% SSR (`output: "server"`) — no hay páginas pre-renderizadas
  estáticas que cachear agresivamente en CDN sin invalidación; el catálogo
  cambia vía admin y debe reflejarse sin redeploy (ya es el comportamiento
  actual).
- Imágenes de Blob son inmutables por URL (Vercel Blob genera nombres con
  sufijo aleatorio) — cacheables agresivamente sin riesgo de servir una
  versión vieja bajo la misma URL.

### Medición

- Antes de cerrar cualquier fase que toque frontend público, medir Lighthouse
  contra el build real (local con `build:local` como mínimo, producción real
  antes de dar la fase por cerrada) y registrar el resultado con fecha en
  `ROADMAP.md`, nunca solo en la conversación de la fase.

## Fase 6 — Medición real (2026-09-17)

**Lighthouse/PSI real: no se pudo ejecutar en este entorno** (sin acceso a
Chrome DevTools/Lighthouse ni a la API de PageSpeed Insights desde aquí). No
se afirma ningún score de Lighthouse ni dato de CrUX — sería inventado.
Reemplazado por análisis estructural real del build (`build:local`, mismo
código que se auditó en `SEO_RULES.md`), que sí se pudo verificar:

- **JS enviado al cliente: 0 archivos `.js`.** `dist/client/` tras el build
  no contiene ningún bundle de JavaScript — toda la interactividad (menú
  móvil, reveal on scroll, selector de color/talla de la PDP, validación de
  WhatsApp) vive en `<script>` inline por página, sin framework ni
  hidratación, tal como exige este documento. Verificado listando
  `dist/client/` después de `build:local` — no listado por análisis, sino
  por inspección directa del build.
- **CSS: 4 archivos generados** (`ContactFooter`, `index`, `ProductoForm`,
  `_slug_`), 8–12 KB cada uno sin comprimir, con nombre con hash (contenido
  inmutable por URL). `global.css` fuente son ~7.2 KB.
- **Fuentes:** Cormorant Garamond (500, 600) + Manrope (400, 500, 600) — 5
  archivos de peso vía Google Fonts, con `preconnect` a
  `fonts.googleapis.com`/`fonts.gstatic.com` ya presente en `Layout.astro`.
  Dentro del límite de "máximo 3 pesos por familia" de este documento.
- **Imágenes:** en el catálogo real (Blob) se sirven vía `<Image>` con
  `widths`/`sizes` responsive y conversión a `webp` (`ProductCard.astro`,
  `productos/[slug].astro`) — ya documentado como implementado. Los
  fixtures de `db/seed.ts` usan SVG de `/public` con `width`/`height`
  explícitos vía `<img>` plano, bifurcación intencional (`ARCHITECTURE.md`
  § 4).
- **LCP — elemento candidato identificado:** en homepage, el bloque textil
  del hero (`Hero.astro`) o su titular serif, según cuál pinte primero — no
  hay `<img>` de producto en el LCP inicial de home. En la PDP, la imagen
  principal de la galería es la candidata más probable a LCP; no se
  confirmó con una medición real de Lighthouse (pendiente, ver arriba). No
  se agregó ningún `preload` nuevo sin esa confirmación — habría sido
  optimizar a ciegas, contra la regla de este documento.
- **CLS — riesgo estructural revisado, no medido con herramienta real:**
  todas las imágenes de producto (Blob y fixtures) declaran `width`/`height`
  explícitos; el header es `sticky` pero se compacta solo por padding, no
  por altura (Fase 2, ya verificado sin salto); no se detectó contenido
  dinámico que inserte bloques sin reservar espacio. Sin numero de CLS real
  sin Lighthouse.
- **Caché — hallazgo real corregido en esta fase:** los archivos de
  `dist/client/_astro/*` (CSS con hash de contenido, por tanto seguros de
  cachear para siempre) se servían en producción con
  `Cache-Control: public, max-age=0, must-revalidate` — verificado con
  `curl -I` contra un archivo `_astro/*.css` real en
  `https://www.maygel.co`. Corregido añadiendo `vercel.json` con una regla
  de headers para `/_astro/(.*)` →
  `Cache-Control: public, max-age=31536000, immutable`. Los archivos de
  `/public` (favicon, og-image, iconos — sin hash, su contenido puede
  cambiar bajo la misma URL) se dejan con el comportamiento por defecto a
  propósito, sin caché agresivo.
- **Third parties:** solo Google Fonts. Sin analytics, sin scripts de
  terceros, sin CDN de iconos — verificado por grep, cero coincidencias de
  `gtag`/`analytics`/`plausible`/`fathom` en `src/`.

**Objetivos de Lighthouse/Core Web Vitals de este documento siguen siendo
objetivos, no resultados** — no se pueden marcar como alcanzados hasta medir
con la herramienta real contra producción desplegada con el código actual
(ver `SEO_RULES.md` § 21 — producción hoy corre un commit anterior a todo
este trabajo).
