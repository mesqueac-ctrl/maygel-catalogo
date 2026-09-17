# Maygel — Reglas de SEO

> Normas obligatorias para todo contenido indexable. Preparado para escalar a
> fichas de producto individuales reales (hoy el catálogo son fixtures, ver
> `ARCHITECTURE.md` § 9).

## 1. Title

- Formato home: `"Maygel — Sandalias artesanales hechas a mano"` (ya
  implementado).
- Formato ficha de producto: `"{Nombre del producto} — Sandalias Maygel"`
  (ya implementado en `[slug].astro`).
- Nunca superar ~60 caracteres visibles en resultados de búsqueda.
- Nunca duplicar el title entre dos páginas distintas.

## 2. Meta description

- Home: descripción fija de negocio (ya centralizada como
  `descripcionNegocio` en `Layout.astro` — no duplicar ese texto en otro
  archivo).
- Ficha de producto: `{descripcion del producto} Sandalia artesanal hecha a
  mano, fabricación bajo pedido. {precio formateado}.` (patrón ya
  implementado) — longitud objetivo 120–158 caracteres.
- Nunca dejar la meta description vacía o genérica ("Bienvenido a mi sitio").

## 3. Canonical

- Toda página pública emite `<link rel="canonical">` con la URL absoluta de
  sí misma (ya implementado vía `Astro.url` en `Layout.astro`). No apuntar
  nunca el canonical de una ficha de producto a la home.

## 4. Robots

- Páginas públicas disponibles: `index, follow` (default de `Layout.astro`).
- Ficha de producto con `disponible: false`: `noindex, follow` — **no**
  `nofollow` (decisión explícita, Fase 5.1). La página deja de tener valor
  como resultado de búsqueda de ese producto, pero sigue teniendo enlaces
  internos reales (migas, relacionados, footer) que sí conviene seguir
  rastreando; cortar el rastreo con `nofollow` no aporta nada y sí puede
  aislar esas páginas del resto del grafo interno del sitio. Regla general:
  `nofollow` nunca se usa como solución genérica para "ocultar" una página —
  solo si hay una razón concreta y documentada para cortar ese rastreo
  puntual (no es el caso de "no disponible").
- `/admin/*` y `404`: `noindex, nofollow` (ya implementado) — aquí sí aplica
  `nofollow` porque no hay enlaces internos de valor que rastrear desde esas
  páginas (login, formularios, página de error).
- `robots.txt`: permite todo excepto `/admin/`, referencia el sitemap. No
  añadir `Disallow` adicionales sin razón documentada.

## 5. Sitemap

- Generado dinámicamente (`sitemap.xml.ts`) desde `listarDisponibles()` — se
  mantiene siempre en sync con el catálogo real, nunca hardcodear URLs de
  producto en un sitemap estático.
- Incluye únicamente productos `disponible: true`. Un producto no disponible
  nunca debe aparecer en el sitemap — coherente con que su ficha ya es
  `noindex` (§ 4): no tiene sentido pedirle a Google que rastree por sitemap
  una URL que la propia página marca como no indexable.
- **Si el modelo de estados futuro (A/B/C, ver `ARCHITECTURE.md` § 4.3) se
  implementa alguna vez**, esta regla binaria deja de alcanzar — habría que
  decidir sitemap por estado (p. ej. B "temporalmente no disponible" podría
  seguir en el sitemap si su página sigue siendo `index`; C "retirado"
  probablemente no, salvo que sea una página informativa que sí se quiera
  indexar). No aplicar la regla de hoy sin revisarla en ese momento.

## 6. Headings

- Una sola `<h1>` visible por página.
- Home: `<h1>` es el titular del hero (`Hero.astro`); secciones usan `<h2>`
  (`ProductGrid`, `FeaturedProducts`); nombres de tarjeta usan `<h3>`
  (`ProductCard`) — jerarquía verificada sin saltos en Fase 6.
- **Ficha de producto — corregido en Fase 6 (esta sección describía una
  arquitectura anterior a Fase 5 y ya no aplica):** desde que la PDP es su
  propia página (`productos/[slug].astro`), el nombre del producto es un
  `<h1>` real y visible (`.ficha__nombre`), no `sr-only`. La sección
  "también puede gustarte" usa `<h2>`, y las tarjetas relacionadas (mismo
  `ProductCard` del catálogo) usan `<h3>` — sin saltos de nivel.
- Nunca saltar niveles (h1 → h3 sin h2) en ninguna sección nueva.

## 7. Alt text

- `descripcionImagen(nombre)` genera el alt base:
  `"{nombre}, artesanal y hecha a mano por Maygel"` — reutilizar esta función
  para cualquier imagen nueva de producto, nunca escribir alt text ad-hoc.
- Alt de foto por color: `"{altBase} — color {Color}"` (ya implementado en el
  script de `ProductCard`).
- Ninguna imagen decorativa (texturas de marcador de posición) lleva alt
  descriptivo — usan `role="img"` + `aria-label` cuando representan contenido
  ausente (ver `Hero.astro`, `About.astro`, `CustomModelCTA.astro`), o deben
  marcarse `aria-hidden="true"` si son puramente decorativas.

## 8. URLs y slugs

- **Cerrado en Fase 5.1: contrato final de inmutabilidad.** `Producto.slug`
  es persistente e independiente del nombre, único (índice en DB +
  validación en `guardar.ts`), y **no editable desde el admin una vez creado
  el producto** — el campo se muestra de solo lectura al editar, y el
  servidor ignora cualquier valor de slug entrante en una edición aunque se
  manipulara la petición. Cambiar el nombre de un producto **no** cambia su
  URL — verificado. Ver `ARCHITECTURE.md` § slug para el detalle completo
  (incluye el estado exacto del NOT NULL físico local vs. remoto).
- Redirect 301 ante un futuro cambio de slug indexado sigue pendiente
  (documentado, no bloqueante hoy sin tráfico real) — y, por diseño, no se
  necesita mientras el admin no permita editar el slug. Si algún día se
  reintroduce la posibilidad de editarlo, el redirect 301 (con historial de
  slugs) debe existir **antes**, no después.
- Ninguna URL pública debe contener mayúsculas, espacios ni parámetros de
  query como parte de la identidad del recurso (los `?ok=`/`?error=` del
  admin son aceptables porque el admin es `noindex`).

## 9. Open Graph

- `og:type`: `"website"` en home, `"product"` en fichas (ya implementado).
- `og:image`: siempre URL absoluta (WhatsApp/Facebook lo exigen) — nunca ruta
  relativa.
- Dimensiones declaradas explícitas (`1200x630`) deben coincidir con el
  archivo real (`public/og-image.jpg`) — si se reemplaza la imagen, verificar
  que mantenga esas proporciones o actualizar los meta `width`/`height`.
- `og:image:alt` siempre presente y descriptivo.

## 10. Twitter metadata

- `twitter:card`: `summary_large_image` (ya implementado, consistente con
  `og:image`).
- Reutilizar siempre `title`/`description`/`imagenUrl` ya calculados — nunca
  duplicar el texto con una variante distinta para Twitter.

## 11. Product schema (JSON-LD)

- Tipo `Product`, con `brand.name: "Maygel"`, `offers.priceCurrency: "COP"`.
- **`offers.availability` se omite por completo (decisión Fase 5.1, revierte
  el uso previo de `MadeToOrder`).** Verificado contra la documentación real
  de Google (`developers.google.com/search/docs/appearance/structured-data/
  product-snippet`): sus valores reconocidos para `availability` son
  `BackOrder`, `Discontinued`, `InStock`, `InStoreOnly`,
  `LimitedAvailability`, `OnlineOnly`, `OutOfStock`, `PreOrder`, `PreSale`,
  `SoldOut` — **`MadeToOrder` no está en esa lista**, aunque sí existe en el
  enum `ItemAvailability` de schema.org. Ninguno de los valores que Google sí
  reconoce describe con honestidad "se fabrica después de pedirlo, sin
  inventario previo": `InStock` sería falso, `PreOrder`/`BackOrder` implican
  un concepto de inventario que no existe en este negocio. Google documenta
  `availability` como propiedad **recomendada**, no requerida (solo `price`/
  `priceSpecification.price` es requerido) — se omite en vez de forzar un
  valor incorrecto. **Regla dura: nunca sustituir automáticamente por
  `InStock` u otro valor solo para "llenar" el campo si no es literalmente
  cierto.** El hecho de que sea "bajo pedido" sigue comunicándose como texto
  real y visible en la página ("Hecho a mano, bajo pedido...", ver
  `CONTENT_GUIDE.md`), nunca como dato estructurado falso.
- `offers.price`: número entero en COP, igual al campo `precio` de la DB —
  nunca un valor distinto al mostrado en la interfaz.
- El JSON-LD completo se omite (`null`, no se emite `<script>`) si el
  producto tiene `disponible: false` — coherente con que esa página ya es
  `noindex` (§ 4): no tiene sentido afirmar datos estructurados de un
  producto que no se está ofreciendo.
- **No afirmar "Google validado" sin una prueba real.** Antes de dar por
  cerrada cualquier ficha, correr el JSON-LD real por la
  [Rich Results Test](https://search.google.com/test/rich-results) de Google
  (o el validador equivalente vigente) y registrar el resultado real — un
  JSON-LD que "parece correcto" leyendo la documentación no es lo mismo que
  una validación real ejecutada.

## 12. Offer schema

Ya cubierto dentro de `Product.offers` (ver § 11). No se necesita un tipo
`Offer` independiente mientras cada producto tenga un único precio (sin
variantes de precio por talla/color todavía).

### 12.1 `ProductGroup`/variantes (evaluado, no implementado)

Hoy cada producto es un único `Product` con un único precio y una lista
plana de tallas/colores (texto, no filas independientes) — no hay SKU,
disponibilidad, precio, URL ni inventario propio por variante. **No se
implementa `ProductGroup`/`Product` con `hasVariant` ahora** porque no hay
ninguna necesidad real: todas las tallas/colores de un producto comparten
precio y disponibilidad. Si en el futuro cada variante (por color, o por
talla) termina teniendo su propio SKU, precio, disponibilidad, URL o
inventario, ese sería el punto para evaluar migrar a `ProductGroup` con
`hasVariant: Product[]` — decisión de modelo de datos primero (columnas
nuevas en `Producto` o una tabla de variantes), JSON-LD después.

## 13. Organization

`LocalBusiness` (no `Organization` genérico) en `Layout.astro`, con
`telephone`, `areaServed` (Soledad, Barranquilla, Cartagena), `sameAs`
(Instagram). Es fijo por página, no depende del contenido — correcto y no
debe convertirse en `Organization` sin razón de negocio.

## 14. FAQ (cuando corresponda)

No implementado todavía. Si se añade una sección de preguntas frecuentes real
(ver `PRODUCT_PAGE_SPEC.md` § preguntas), debe emitir `FAQPage` JSON-LD **solo
si el contenido es visible en la página** (nunca FAQ oculto solo para SEO) y
**solo con preguntas/respuestas reales**, nunca genéricas inventadas para
llenar el schema.

## 15. Enlazado interno

- Cada card de catálogo enlaza a su ficha (`enlaceFicha`, ya implementado).
- La ficha enlaza de vuelta al catálogo (`← Volver al catálogo`).
- Footer enlaza a las secciones ancladas de la home (`#catalogo`,
  `#sobre-nosotros`, `#como-comprar`, `#por-mayor`).
- Regla futura: cuando exista más de una página de listado (p. ej. por
  categoría), cada ficha de producto debe enlazar también a "productos
  relacionados" (ver `PRODUCT_PAGE_SPEC.md`) para reforzar enlazado interno
  antes de depender solo del sitemap.

## 16. Indexación

- Producto `disponible: true`: `index, follow`, JSON-LD `Product` completo,
  incluido en sitemap.
- Producto `disponible: false` (hoy: único estado de "no disponible" que
  existe): `noindex, follow`, sin JSON-LD, excluido del sitemap, CTA
  deshabilitado con mensaje real, enlaces internos de la página intactos.
  **No se aplica una única solución genérica a todos los futuros "no
  disponible"** — si el modelo de 3 estados (`ARCHITECTURE.md` § 4.3) se
  implementa, un retirado (estado C) podría en cambio justificar un redirect
  301 o un 404/410 según tenga o no una página de reemplazo, decisión caso a
  caso cuando ese estado exista de verdad.
- El admin completo es `noindex, nofollow` y además bloqueado por
  `robots.txt` — doble barrera, mantenerla así (aquí sí aplica `nofollow`,
  a diferencia de una ficha de producto no disponible, ver § 4).

## 17. Imágenes SEO

- Toda imagen de producto real (cuando exista) debe servirse con `width`/
  `height` explícitos y formato optimizado (`webp` vía `<Image>` para URLs de
  Blob) — ver reglas de detalle en `PERFORMANCE_RULES.md`.
- Nunca usar una imagen decorativa (bloque de textura de marcador de
  posición) como `og:image` de una ficha de producto — el `og:image` de
  producto debe ser siempre la foto real (o el fallback de marca) del propio
  producto.

## 18. Contenido local

- `areaServed` en el JSON-LD (Soledad, Barranquilla, Cartagena) debe
  mantenerse sincronizado con las ciudades reales de entrega mencionadas en
  `ComoComprar.astro` (`"Entregas: Soledad y Barranquilla..."`). Si el negocio
  amplía cobertura, actualizar ambos lugares en el mismo cambio.

## 19. Productos (checklist al añadir soporte de página individual real)

Antes de dar por completa una ficha de producto nueva, verificar:

- [ ] `title` único y descriptivo
- [ ] `meta description` con precio y material real (nunca inventado)
- [ ] `canonical` correcto
- [ ] `og:image`/`twitter:image` apuntan a la foto real del producto
- [ ] JSON-LD `Product` sin `offers.availability` (omitido a propósito, § 11)
- [x] Slug persistente e inmutable implementado (Fase 5 + 5.1, ver § 8)
- [ ] Incluido en `sitemap.xml` (automático si `disponible: true`)
- [ ] Un solo `<h1>` visible con el nombre del producto (ver § 6)

## 20. Dominio canónico y redirects (Fase 6)

**Verificado contra producción real (`https://www.maygel.co`), no solo
localhost, el 2026-09-17:**

| Origen | Destino | Status |
|---|---|---|
| `http://maygel.co/` | `https://maygel.co/` | 308 |
| `https://maygel.co/` | `https://www.maygel.co/` | 308 |
| `http://www.maygel.co/` | `https://www.maygel.co/` | 308 |
| `https://www.maygel.co/` | (sin redirect, host final) | 200 |

Una sola versión canónica indexable: `https://www.maygel.co/`. Coincide con
`site: "https://www.maygel.co"` en `astro.config.mjs` y con el `Sitemap:` de
`public/robots.txt`. Sin cadenas de redirect (máximo un salto por variante).
No se detectó ninguna acción pendiente aquí — la configuración de dominio de
Vercel ya resuelve esto correctamente a nivel de host, antes de que la app
reciba la petición.

## 21. Aviso importante: estado de producción vs. código actual (Fase 6)

**Producción (`https://www.maygel.co`) verificada el 2026-09-17 corre el
código del último commit empujado (`b9fe47e`), que es *anterior* a todo el
trabajo de Fase 0 en adelante** (rebrand "Quiet Colombian Craft", slug
persistente, PDP dedicada, esta misma auditoría). Evidencia: el
`theme-color`/manifest en vivo siguen en la paleta antigua (`#B5651D`,
tipografía Playfair Display + Inter), y `git show HEAD:public/site.webmanifest`
confirma que el commit actual en `master` todavía tiene esos valores viejos —
todo el trabajo de Fase 0–5.1 vive sin comittear en el árbol de trabajo local.

**Consecuencia práctica para esta fase:** cualquier verificación contra
producción real (robots, sitemap, JSON-LD de producto, `noindex/follow` de
"no disponible", etc.) todavía refleja el sitio *anterior* al proyecto, no el
código auditado aquí. El sitemap en producción hoy tiene 0 productos porque
la base remota tiene 0 filas (esperado, ver `MIGRACIONES-PRODUCCION.md`), no
por un error de esta fase.

**No es un bug de esta fase ni de ninguna anterior** — es simplemente que
ningún commit posterior a Fase 0 se ha subido ni desplegado todavía. Antes de
que las mediciones de Search Console, PSI/CrUX reales o el sitemap con
productos reales tengan sentido, hace falta: commitear el trabajo aprobado,
hacer push, y que Vercel despliegue esa nueva versión a producción — acción
del negocio/equipo, no de esta fase (ver "Requiere acción externa" en el
reporte de la fase).

## 22. Google Search Console (Fase 6 — no implementado, guía para conectar)

**No existe hoy ninguna meta tag ni verificación DNS de Search Console en el
código.** No se inventó ningún token — se documenta aquí la guía exacta para
cuando el negocio quiera conectar el dominio, preferiblemente **verificación
por DNS a nivel de dominio** (cubre `www` y no-`www` con una sola
verificación, y no depende de un despliegue específico):

1. En [Google Search Console](https://search.google.com/search-console),
   añadir una propiedad de tipo "Dominio" (no "Prefijo de URL") con
   `maygel.co`.
2. Google entrega un registro TXT (`google-site-verification=...`) para
   añadir en el DNS del dominio (dondequiera que esté gestionado — Vercel
   Domains u otro proveedor). Quien tenga acceso al DNS lo añade y confirma
   verificación desde Search Console (puede tardar hasta 24-48h en propagar).
3. Una vez verificada, enviar el sitemap: `https://www.maygel.co/sitemap.xml`
   (Search Console → Sitemaps → añadir esa URL exacta).
4. **No usar verificación por meta tag HTML** salvo que el DNS no sea
   gestionable por el negocio — una meta tag verifica solo `https://` o
   `http://` de un host específico, no ambas variantes www/no-www a la vez.

## 23. Google Merchant Center (Fase 6 — evaluado, no implementado)

**No se creó ninguna cuenta ni se afirma elegibilidad garantizada.** Evaluado
qué requeriría conectar Maygel:

- **Ya cumplido por el JSON-LD `Product` actual:** `name`, `image`,
  `description`, `brand`, `offers.price`, `offers.priceCurrency`, `url` — el
  set que Google puede leer también para experiencias de "merchant listing"
  basadas en structured data.
- **Lo que Merchant Center añadiría sobre lo que ya existe:** un feed de
  productos propio (no solo el JSON-LD de cada página), gestionado desde la
  cuenta de Merchant Center o vía API/Content API — habilita listados
  gratuitos en la pestaña Shopping de Google y Search, con más control sobre
  qué se muestra que solo depender de rastreo/JSON-LD.
- **Requisitos que faltan hoy, sin inventarlos:** cuenta de Merchant Center
  verificada y con el dominio confirmado (mismo mecanismo de Search Console,
  ver § 22, se puede enlazar); política de envío y devoluciones publicada de
  forma clara en el sitio (hoy existe la sección de envíos/cambios en la PDP,
  pero no una página dedicada de políticas — evaluar si Merchant Center la
  exige como página separada al momento de conectar); `availability` con un
  valor que Merchant Center sí reconozca en su feed (el feed de Merchant
  Center tiene sus propias reglas de valores de disponibilidad, distintas del
  JSON-LD de Search — revisar la documentación de Merchant Center en el
  momento de conectar, no asumir que la decisión de § 11 sobre `MadeToOrder`
  aplica igual ahí).
- **No implementado en esta fase** porque conectar Merchant Center es una
  decisión de negocio (cuenta, verificación, posible costo de anuncios si se
  usa Shopping Ads) — esta sección documenta la ruta, no la ejecuta.

## 24. Test matrix (Fase 6)

Verificado contra **código actual** (local, `build:local`) salvo la fila de
producción marcada aparte. Producción real hoy refleja el commit `b9fe47e`
(ver § 21), no este código.

| URL | Status | Index | Canonical | Schema | Sitemap |
|---|---|---|---|---|---|
| `/` | 200 | `index, follow` | self (`/`) | `LocalBusiness` | ✅ incluida |
| PDP `disponible: true` | 200 | `index, follow` | self (slug) | `Product` + `BreadcrumbList` + `LocalBusiness` | ✅ incluida |
| PDP `disponible: false` | 200 (no 404, conservada) | `noindex, follow` | self (slug) | solo `BreadcrumbList` + `LocalBusiness` (sin `Product`) | ❌ excluida |
| PDP slug inexistente | 404 real (`Astro.rewrite`) | `noindex, nofollow` | self (URL pedida) | `LocalBusiness` (layout genérico de 404) | ❌ excluida |
| `/admin/*` (protegido) | 302 → `/admin/login` | `noindex, nofollow` | n/a (redirect) | n/a | ❌ excluida |
| `/admin/login` | 200 | `noindex, nofollow` | n/a | n/a | ❌ excluida |
| `/sitemap.xml` | 200, `Content-Type: application/xml` | n/a | n/a | n/a | — |
| `/robots.txt` | 200 | n/a | n/a | n/a | referencia el sitemap |
| URL random inexistente | 404 real | `noindex, nofollow` | self | `LocalBusiness` | ❌ excluida |
