# Maygel — Arquitectura

> Documenta la arquitectura REAL tal como existe en el repositorio a fecha de
> esta auditoría (2026-09-17). No es un plan ni una aspiración.

## 1. Stack técnico

| Pieza | Versión | Rol |
|---|---|---|
| Astro | `^7.2.10` | Framework, `output: "server"` (SSR) |
| `@astrojs/db` | `^0.21.3` | ORM/tabla de productos sobre libSQL (Drizzle por debajo) |
| `@astrojs/vercel` | `^11.0.9` | Adaptador de despliegue (funciones server en Vercel) |
| `@vercel/blob` | `^2.8.0` | Almacenamiento de fotos de producto |
| `@libsql/client` | transitiva (vía `@astrojs/db`) | Usada directamente en `scripts/` para inspección/migraciones manuales — ver § 8 |
| TypeScript | `astro/tsconfigs/strict` | Sin overrides propios en `tsconfig.json` |
| Node | `>=22.12.0` | — |

Sin frameworks de UI (React/Vue/Svelte), sin Tailwind ni ningún framework CSS,
sin Astro Content Collections (no existe `src/content/`), sin integración
`@astrojs/sitemap` (el sitemap es una ruta dinámica propia, ver § 6).

## 2. Árbol de carpetas relevante

```
maygel/
├── astro.config.mjs        SSR, integración db(), adapter vercel(), remotePatterns de Blob
├── db/
│   ├── config.ts           tabla Producto (schema)
│   └── seed.ts              3 productos de ejemplo (fixtures, no catálogo real)
├── scripts/
│   └── inspect-remote-db.mjs  diagnóstico read-only de la DB remota (@libsql/client directo)
├── src/
│   ├── middleware.ts        protege /admin/* (excepto login) con sesionValida()
│   ├── consts.ts            WhatsApp, Instagram, mensajes predefinidos, buildWhatsappLink()
│   ├── env.d.ts             tipos de import.meta.env
│   ├── assets/              SVG usados con <Image> (hero.svg legado + placeholders producto-1/2/3.svg)
│   ├── styles/global.css    todos los tokens y clases base (ver DESIGN_SYSTEM.md)
│   ├── lib/
│   │   ├── auth.ts          credencialesValidas, crearSesion, sesionValida, cerrarSesion
│   │   ├── whatsapp.ts      mensajeProducto, enlaceProducto (sin deps de astro:db — se importa desde <script> de cliente)
│   │   └── productos.ts     toda la lógica de acceso a datos + helpers (slugs, formato, validación)
│   ├── layouts/
│   │   ├── Layout.astro         web pública: SEO, OG/Twitter, JSON-LD LocalBusiness, fuentes, contrato de dirección visual, script de reveal
│   │   └── AdminLayout.astro    panel: barra superior, fuentes propias (Playfair+Inter, ver § 9 inconsistencias)
│   ├── components/           públicos: Header, Hero, TrustStrip, FeaturedProducts, ProductGrid,
│   │                         ProductCard, BrandManifesto, About, CustomModelCTA, ComoComprar,
│   │                         VentaMayor, ContactFooter
│   │   └── admin/ProductoForm.astro   formulario compartido crear/editar
│   └── pages/
│       ├── index.astro                ensambla las secciones de home en orden fijo
│       ├── ayuda.astro                 página estática de ayuda (Fase 8.3) — cómo pedir, pagos,
│       │                               envíos por ciudad, cambios, WhatsApp de ayuda
│       ├── terminos.astro              página estática de términos (Fase 8.3) — solo lo confirmado
│       ├── 404.astro                   noindex, mismo Header/Footer públicos
│       ├── sitemap.xml.ts              GET dinámico desde listarDisponibles()
│       ├── productos/[slug].astro      ficha pública (Product JSON-LD, ProductCard variante="ficha")
│       └── admin/
│           ├── login.astro / api/login.ts / api/logout.ts
│           ├── index.astro             redirect a /admin/productos
│           ├── vista-previa.astro      iframe responsive de "/"
│           └── productos/
│               ├── index.astro         listado, sin controles de orden fila-por-fila
│               ├── nueva.astro / [id].astro   crean/editan vía ProductoForm
│               ├── ordenar.astro       reordenamiento staged en cliente + un solo guardado
│               └── api/
│                   ├── guardar.ts      valida, sube foto(s) a Blob, inserta/actualiza
│                   ├── eliminar.ts     borra producto + intenta borrar su foto de Blob
│                   └── reordenar.ts    valida array completo de IDs, escribe con guardarOrdenCompleto() (batch atómico)
├── public/                  favicons, manifest, og-image.jpg, productos/*.svg (placeholders del seed)
└── docs/                    este directorio
```

## 3. Responsabilidad de cada capa

- **`db/`** — única fuente de verdad del *schema*. `db/seed.ts` son fixtures de
  desarrollo/demo, no datos reales de catálogo.
- **`src/lib/`** — toda la lógica de negocio y acceso a datos vive aquí, nunca
  directamente en un componente `.astro`. `productos.ts` es el único punto de
  acceso a la tabla `Producto` (ninguna página o componente importa `astro:db`
  directamente salvo a través de este módulo).
- **`src/layouts/`** — dos layouts independientes y deliberadamente distintos:
  público (marca, SEO) y admin (utilitario). No comparten sistema visual
  (ver `BRAND_SYSTEM.md` § por qué el admin es la excepción).
- **`src/components/`** — componentes de presentación. No contienen lógica de
  acceso a datos salvo el `await` inicial de listado/consulta al principio del
  frontmatter (patrón consistente en todos: `ProductGrid`, `FeaturedProducts`,
  `ProductCard`).
- **`src/pages/`** — orquestan layout + componentes + lectura de query params
  para mensajes de éxito/error. La validación de negocio vive en `api/*.ts`,
  nunca en el frontmatter de una página de formulario.
- **`scripts/`** — herramientas operativas fuera del build (inspección de DB).
  Nunca deben importarse desde `src/`.

## 4. Modelo de datos

Tabla `Producto` (`db/config.ts`):

| Campo | Tipo | Notas |
|---|---|---|
| `id` | number, PK | autoincremental |
| `nombre` | text | genera el slug público (`slugify(nombre)-id`) |
| `precio` | number | entero, COP, sin decimales — precio normal |
| `precioOferta` | number, opcional (Fase 8.2) | precio de oferta opcional. Ver § 4.4 — nunca se lee directamente, siempre a través de `precioEfectivo()` |
| `tallas` | text | `"35, 36, 37"` — parseado con `tallasComoLista()` |
| `colores` | text | subconjunto de `COLORES_VALIDOS` (`Negro`, `Blanco`, `Miel`, `Beige`, `Café`, `Plateado` — los dos últimos añadidos en Fase 8.2, confirmados por el negocio), parseado con `coloresComoLista()` |
| `imagen` | text | URL de Blob (`http...`) o ruta de `/public` (fixtures) — bifurcación intencional en el render (`<Image>` vs `<img>`) |
| `imagenesColores` | text, opcional | JSON `{ "Color": "url" }`, foto específica por color; fallback silencioso a `imagen` si falta o es inválido |
| `descripcion` | text | — |
| `disponible` | boolean, default `true` | ver § 4.2 — significado exacto y por qué es solo un booleano hoy |
| `orden` | number, default `0` | posición en catálogo; escrito por `crear()` (al final) o `guardarOrdenCompleto()` |
| `categoria` | text, opcional | subconjunto de `CATEGORIAS_VALIDAS` (`Brillos`, `Tiras`, `Trenzadas`, `Clásicas`, `Elegantes`) — **taxonomía provisional, sin confirmar con el negocio** |
| `destacado` | boolean, default `false` | controla la sección "Selección Maygel" en home |

**Regla de escritura estricta ya implementada:** `categoria` vacía se guarda
como `null`; un valor que no está en `CATEGORIAS_VALIDAS` **detiene el guardado
completo** con el mensaje "Categoría no válida." — nunca se convierte
silenciosamente a `null` (`admin/api/guardar.ts`).

### 4.1 Datos demo vs. catálogo real — regla dura

**Los 3 registros de `db/seed.ts` son fixtures de desarrollo, nunca el
catálogo comercial.** Ninguna decisión de arquitectura visual, layout de grid,
o comportamiento de sección puede asumir implícita o explícitamente que
siempre habrá exactamente 3 productos, ni que siempre habrá al menos 1.

Toda interfaz que dependa de la lista de productos (`ProductGrid`,
`FeaturedProducts`, sitemap, grid de la ficha "relacionados" cuando exista,
cualquier componente futuro) debe funcionar correctamente y sin verse rota o
vacía de forma extraña en **todos** estos escenarios, verificados en cada fase
que toque estos componentes:

| Escenario | Comportamiento esperado |
|---|---|
| 0 productos | La sección se oculta (destacados) o muestra su estado vacío ya diseñado (catálogo principal — ver `UX_RULES.md` § 10), nunca un grid roto o vacío sin explicación |
| 1 producto | El grid no se ve "flotando" desproporcionado ni fuerza columnas vacías con huecos raros |
| 2–4 productos | Igual que arriba — sin asimetrías de grid que solo funcionen con un múltiplo exacto de columnas |
| Muchos productos (10+) | Paginación o scroll simple sin degradar performance; sin asumir que "todo cabe en una pantalla" |
| Destacados variables (0, 1, o muchos) | La asimetría de la primera tarjeta (`FeaturedProducts`, ver `DESIGN_SYSTEM.md`) solo se activa con el umbral ya definido en código (`>= 3`); con menos, el grid es regular, nunca roto |

Cualquier componente nuevo de catálogo/grid debe declarar explícitamente, en
su implementación, cómo se comporta en los 5 escenarios de la tabla — no
asumir el caso feliz de "3 productos" que es el único que existe hoy en
desarrollo.

### 4.2 `disponible` — significado exacto (Fase 5.1)

**Hoy `disponible` significa exactamente una cosa: "este producto se ofrece
activamente para pedido ahora mismo, y debe verse y encontrarse en la web
pública."** Es un booleano de una sola dimensión — no distingue *por qué* un
producto no se ofrece (agotado temporalmente, retirado en definitiva, nunca
más fabricable, oculto por error de datos). Auditado en cada punto donde se
lee:

| Lugar | Efecto de `disponible=false` |
|---|---|
| `listarDisponibles()` (`src/lib/productos.ts`) | El producto no aparece en homepage/catálogo público |
| `sitemap.xml.ts` | El producto no aparece en el sitemap |
| `productos/[slug].astro` | La ficha sigue siendo alcanzable por URL directa (no 404), pero: CTA de pedido deshabilitado con mensaje real, `robots: noindex, follow` (no `nofollow` — ver `SEO_RULES.md`), y el JSON-LD `Product` se omite por completo (`datosEstructurados = null`) |
| Admin (`ProductoForm.astro`, `index.astro`) | Checkbox simple "Disponible"; el listado admin no distingue motivo, solo muestra el booleano |

**No implica** "temporalmente agotado" vs. "retirado para siempre" vs. "nunca
se volverá a fabricar" — hoy esas tres situaciones de negocio, si existieran,
se representarían con el mismo `disponible=false` y serían indistinguibles en
el dato. Ver § 4.3 para el modelo futuro si eso deja de ser suficiente.

### 4.3 Modelo de estados futuro (documentado, NO implementado)

Si el negocio necesita distinguir *por qué* un producto no está disponible
(para variar copy, indexación o comportamiento de sitemap por motivo, en vez
de un único `noindex` genérico), el modelo conceptual a evaluar —
**sin implementar todavía, no hay necesidad real hoy con 3 productos de
fixture** — es:

- **A. Disponible** — estado actual `disponible=true`, sin cambios.
- **B. Temporalmente no disponible** — se espera volver a fabricar/tener
  stock; la ficha debe seguir indexable (`index` o `noindex` según se decida
  cuando exista el caso real), CTA deshabilitado con mensaje "vuelve pronto"
  en vez del genérico actual, sitemap: incluir o no según se decida.
- **C. Retirado** — no se va a volver a ofrecer; la decisión de indexación
  depende del contexto real (página informativa con `noindex` si tiene valor
  de contenido/enlaces, redirect 301 a una categoría si existe reemplazo
  directo, o 404/410 si no aporta nada) — **nunca una única regla fija para
  todos los casos de retiro**, ver `SEO_RULES.md` § retirado.

Implementarlo implicaría: una columna de estado (enum, no booleano) en vez de
`disponible`, migración de datos existentes (`true`→A, `false`→revisar caso a
caso, probablemente B por defecto), y lógica condicional en sitemap/robots/
JSON-LD por estado en vez de la rama binaria actual. Ninguna de estas
implementaciones existe hoy — este párrafo es solo el diseño a considerar
cuando el negocio confirme que el booleano ya no alcanza.

### 4.4 Precios y descuentos (Fase 8.2)

**Contrato:** `precio` es siempre el precio normal, obligatorio. `precioOferta`
es opcional y, cuando existe, debe ser un número mayor que `0` y estrictamente
menor que `precio` — validado en el servidor (`admin/api/guardar.ts`), nunca
solo en el cliente. Un `precioOferta` inválido (`<= 0`, `>= precio`, o no
numérico) detiene el guardado con un mensaje claro, igual que el resto de
validaciones de este formulario — nunca se guarda silenciosamente como si no
existiera.

**Precio efectivo — una sola fuente de verdad:** `precioEfectivo(producto)`
(`src/lib/productos.ts`) devuelve `producto.precioOferta` si es un número
válido según la regla anterior, si no, `producto.precio`. Es defensivo (igual
que `conSlugSeguro()`) por si algún dato antiguo o manipulado no pasara por
la validación de escritura — nunca confía en que el dato ya viene bien
formado. **Todo el código que muestra o envía un precio de producto (PDP,
`ProductCard`, WhatsApp, JSON-LD `Offer.price`) llama a esta función — ninguno
recalcula `precioOferta ?? precio` por su cuenta.**

**Por qué no se guarda el porcentaje de descuento:** un `-10%` se calcula
siempre desde `precio` y `precioEfectivo()` en el momento de mostrarlo — un
porcentaje guardado en DB podría desincronizarse si alguien cambia `precio`
sin recalcular el porcentaje. Nunca hay dos fuentes de la misma verdad.

**Estado real: no existe ningún descuento activo hoy.** La arquitectura está
lista, pero ningún producto (ni fixture ni real) tiene `precioOferta`
poblado — se activa el primer descuento solo cuando el negocio confirme un
monto real (ver `BUSINESS_INPUTS.md`).

**Migración pendiente en remoto:** `precioOferta` es una columna nueva
(`ALTER TABLE ADD COLUMN`, aditiva, nullable) — remoto sigue en 0 filas
(verificado, ver `MIGRACIONES-PRODUCCION.md` § Historial), así que no hay
riesgo de datos, pero **la migración no se ejecutó todavía** — el código
nuevo no debe desplegarse a producción sin ella primero (SQLite fallaría con
"no such column" al consultar `Producto` en remoto). Script exacto y
procedimiento en `MIGRACIONES-PRODUCCION.md`.

## 5. Astro DB — estado real y limitación conocida

**Astro 7 eliminó el CLI `astro db`** (`push`, `execute`, `verify`, `shell`).
El runtime (`astro:db` en el código de la app) funciona con normalidad; solo
la herramienta de línea de comandos para aplicar cambios de schema desapareció.

Consecuencia operativa: cualquier cambio de schema en producción requiere un
script temporal con `@libsql/client` directo (nunca `--force-reset`, nunca
`DROP`). Procedimiento completo y advertencias en `MIGRACIONES-PRODUCCION.md`
(raíz del repo, no duplicado aquí). Incidente conocido documentado ahí: una
ejecución externa de `astro db push --force-reset` vació la tabla `Producto`
en producción una vez; el runbook actual existe para que no vuelva a pasar.

## 6. SEO — implementación actual

- `Layout.astro`: `<title>`, `meta description`, `canonical`, `robots` (por
  prop, default `index, follow`), Open Graph completo, Twitter Card
  (`summary_large_image`), JSON-LD `LocalBusiness` (fijo, no depende de la
  página).
- `productos/[slug].astro`: JSON-LD `Product` con `Offer` **sin `availability`**
  (omitido a propósito desde Fase 5.1 — Google no documenta `MadeToOrder`
  como valor reconocido de `availability`, ver § 6.1), `og:type = "product"`,
  imagen específica del color inicial si aplica. Solo se emite si
  `disponible=true`; si no, `datosEstructurados = null`.
- `sitemap.xml.ts`: generado en cada request desde `listarDisponibles()` — no
  es un archivo estático, así que nunca queda desactualizado respecto al
  catálogo real. Incluye `/` y cada `/productos/{slug}` disponible.
- `robots.txt` (estático, `public/`): permite todo excepto `/admin/`, referencia
  el sitemap.
- Slugs: campo propio persistente, contrato final de inmutabilidad — ver
  bloque siguiente. `CONTEXTO-PROYECTO.md` § 12 describe una deuda técnica ya
  cerrada (slug derivado del nombre); no aplica desde Fase 5.

> **Slug persistente e inmutable — contrato final cerrado en Fase 5.1.**
> `Producto.slug` es un campo propio (`db/config.ts`), declarado
> `column.text({ unique: true })` (NOT NULL + UNIQUE a nivel de esquema
> declarado). Estado físico real por entorno:
> - **Local**: recrea la tabla en cada arranque → NOT NULL y UNIQUE reales.
> - **Remoto**: columna añadida con `ALTER TABLE` (Fase 5) → físicamente
>   nullable todavía (SQLite no permite añadir NOT NULL a una columna
>   existente sin recrear la tabla), pero **la unicidad ya es real** vía
>   `CREATE UNIQUE INDEX idx_producto_slug`. La migración que cerraría el NOT
>   NULL físico está diseñada y lista para ejecutar, pero pendiente de
>   autorización explícita del negocio antes de correr una recreación de
>   tabla en producción — script exacto en `MIGRACIONES-PRODUCCION.md` §
>   "Migración diseñada, NO ejecutada".
>
> **Contrato de inmutabilidad (Fase 5.1, cierra la brecha que dejó Fase 5):**
> una vez creado un producto, su slug **no se puede volver a cambiar desde el
> admin, sin excepción**:
> - Al crear: se autogenera desde el nombre (`generarSlugDisponible()`), o se
>   puede escribir a mano antes del primer guardado — validado con
>   `slugify()` y unicidad (`existeSlug()`).
> - Al editar: el campo se muestra de solo lectura (`disabled`) en
>   `ProductoForm.astro` — ni siquiera se envía en el `FormData`. Además,
>   `admin/api/guardar.ts` ignora por completo cualquier `slug` que pudiera
>   llegar en una edición: siempre relee el producto por `id` y reutiliza su
>   slug ya guardado, sea cual sea el contenido real de la petición
>   (defensa en profundidad — protege incluso contra una petición manipulada
>   a mano que sí incluyera un campo `slug`).
> - Renombrar el producto **nunca** regenera ni toca el slug — verificado.
>
> **Pendiente, documentado, no implementado (decisión explícita de alcance):**
> si en el futuro una URL indexada con tráfico real necesitara cambiar de
> slug, eso requeriría primero construir un historial de slugs + redirect
> 301 automático desde el anterior — y **solo entonces** volver a permitir
> editar el slug desde el admin, nunca antes. No se construye ese sistema
> ahora porque no hay tráfico/indexación real que lo justifique todavía; la
> regla que sí aplica desde ya es que el admin normal jamás permite el
> cambio directo, con o sin ese sistema futuro.

Ver reglas obligatorias hacia adelante en `SEO_RULES.md`.

## 7. Vercel Blob

- `admin/api/guardar.ts` sube la foto principal y, opcionalmente, una foto por
  color marcado.
- `admin/api/eliminar.ts` intenta borrar la foto de Blob al borrar el producto;
  si falla, no revierte el borrado del producto (falla silenciosa, sin
  consecuencia para la usuaria).
- **Autenticación:** el código pasa `token` explícito solo si
  `BLOB_READ_WRITE_TOKEN` existe en el entorno; si no, deja que `@vercel/blob`
  resuelva OIDC (mecanismo real en Vercel Production). Este comportamiento fue
  corregido en un fix reciente (`b9fe47e`) — antes forzaba el token y rompía
  OIDC.
- `astro.config.mjs` declara `remotePatterns` para `**.public.blob.vercel-storage.com`,
  necesario para que `<Image>` optimice URLs remotas de Blob.

## 8. Sistema admin

- **Autenticación de un solo usuario**: `ADMIN_USER`/`ADMIN_PASSWORD` en env,
  comparación en tiempo constante (`crypto.timingSafeEqual`), cookie
  `maygel_sesion` firmada con HMAC-SHA256 (`SESSION_SECRET`), 7 días,
  `httpOnly`, `secure` solo en producción.
- `src/middleware.ts` protege todo `/admin/*` salvo `/admin/login` y
  `/admin/api/login`.
- **Flujo de productos**: listar (`index.astro`) → crear/editar (`ProductoForm.astro`
  compartido) → `api/guardar.ts` (valida, sube fotos, inserta/actualiza) →
  redirect con `?ok=` o `?error=`.
- **Reordenamiento**: `admin/productos/ordenar.astro` — el array completo se
  reorganiza en el cliente (sin escrituras intermedias); "Guardar orden" envía
  el array completo de IDs a `api/reordenar.ts`, que valida exhaustivamente
  (array, enteros positivos, sin duplicados, cuenta exacta, todos los IDs
  existen, ninguno falta, ninguno sobra) antes de escribir con
  `guardarOrdenCompleto()` — un único `db.batch()` atómico (soportado por el
  driver `drizzle-orm/libsql` subyacente). Cualquier fallo de validación no
  escribe nada. El listado principal (`admin/productos/index.astro`) **no**
  tiene controles de orden fila-por-fila — esa responsabilidad vive solo en
  `ordenar.astro`.
- **Vista previa**: `admin/vista-previa.astro` — iframe de `/` con toggle
  móvil/computador, sin lógica de negocio.
- El panel **no sigue el sistema de marca minimalista** de la web pública
  (botones sólidos, avisos de color, `AdminLayout` con fuentes propias) —
  decisión intencional documentada en `CONTEXTO-PROYECTO.md`: prioriza
  claridad para una usuaria no técnica sobre la coherencia visual de marca.

## 9. Inconsistencias detectadas en esta auditoría

> Documentadas, **no corregidas** — esta fase es solo de documentación.

1. **Colores de tema desincronizados — resuelto en Fase 1.** `Layout.astro`,
   `AdminLayout.astro` y `public/site.webmanifest` declaraban
   `theme-color`/`background_color` con la paleta anterior (`#B5651D` /
   `#FAF6F1`). Actualizados a `#8C5A2F` / `#F7F2EA` (valores reales de
   `--color-accent`/`--color-bg`) en los tres archivos.
2. **`AdminLayout.astro` cargaba una familia tipográfica que ya no se usa —
   resuelto en Fase 1.** Solicitaba Google Fonts `Playfair+Display` e
   `Inter`, pero `--font-heading` está aliasado a `--font-body` (Manrope) —
   Playfair Display nunca se aplicaba (peso muerto) **e Inter tampoco**,
   porque `--font-body` en el admin resolvía a Manrope sin que Manrope
   estuviera cargado, cayendo en el fallback `ui-sans-serif` del sistema.
   Se reemplazó el `<link>` de Google Fonts por Manrope (los mismos pesos
   400/500/600 que la web pública) — el admin ahora renderiza la fuente que
   sus propias reglas ya declaraban, sin cambiar ninguna otra decisión
   visual del panel.
3. **`CATEGORIAS_VALIDAS` es una taxonomía provisional — decisión de Fase 4:
   los chips decorativos se retiraron del catálogo público.** Definida en
   código (`Brillos`, `Tiras`, `Trenzadas`, `Clásicas`, `Elegantes`) sin
   confirmación del negocio. Un control que parece interactivo debe serlo;
   con 3 productos y sin categorías confirmadas, los chips no aportaban valor
   real, así que se retiraron (no se eliminó el campo `categoria` del modelo,
   solo la UI de chips). La separación entre datos (`producto.categoria`, ya
   en el modelo) y presentación ya existe — cuando el negocio confirme una
   taxonomía real, el filtrado se construye leyendo ese campo, sin
   necesidad de reintroducir UI a ciegas. Escala de filtrado prevista (ver
   `ROADMAP.md` Fase 4): 1–8 productos, exploración visual simple sin
   filtros; 9–24, evaluar categorías ligeras; 25+, arquitectura de filtros
   completa.
4. **Catálogo en producción son fixtures, no productos reales.** Los 3
   productos actuales (`Sandalia Trenzada Terracota`, etc.) son datos de
   ejemplo de `db/seed.ts`, con fotos SVG de línea como placeholder — no el
   catálogo real del negocio.
5. **Documentación de traspaso desactualizada en partes.**
   `CONTEXTO-PROYECTO.md` describe la paleta y tipografía de una iteración de
   diseño anterior (terracota/Playfair+Inter) y menciona `mover.ts` /
   flechas ↑↓ como mecanismo de orden — ambos reemplazados por
   `reordenar.ts` + `ordenar.astro`. Ese documento sigue siendo válido para
   historia de negocio, auth, Blob y procedimiento de migraciones, pero no
   para el sistema visual vigente (usar `docs/` para eso desde ahora).
6. **`AGENTS.md` vs `CLAUDE.md` — resuelto en esta fase.** `AGENTS.md`
   contenía una copia independiente y desactualizada del `CLAUDE.md` anterior
   (solo la sección de servidor de desarrollo + links de Astro), con riesgo
   de divergir silenciosamente de las reglas reales. Decisión: `CLAUDE.md` es
   la única fuente de gobierno; `AGENTS.md` quedó como archivo mínimo que
   apunta a `CLAUDE.md` y `/docs` (existe solo por si alguna herramienta busca
   `AGENTS.md` por convención). No debe volver a acumular reglas propias.
7. **Estado de foco — resuelto en Fase 2.** `:focus-visible` global
   (`a, button, input, textarea, select`) en `global.css`, verificado en
   navegador (wordmark, enlace de tarjeta de catálogo).
8. **Diferenciación error vs. estado vacío — ya correcta por diseño, ahora
   documentada (Fase 4).** `listarDisponibles()` no atrapa excepciones: si la
   consulta a la base de datos falla, el error se propaga y Astro renderiza
   su página de error (dev: overlay; producción: 500), **nunca** cae en la
   rama `productos.length === 0` del catálogo — esa rama solo se alcanza si
   la consulta tuvo éxito y devolvió cero filas. No se añadió manejo de
   errores adicional: hacerlo sin una necesidad real (p. ej. un mensaje de
   error específico de negocio) sería complejidad no solicitada.

## 10. Reglas para futuras modificaciones

1. **Componentes reutilizables antes que duplicación.** Si dos secciones
   necesitan el mismo patrón visual (p. ej. tarjeta de producto), se extiende
   el componente existente con una prop (ver `ProductCard` `variante`), nunca
   se copia el markup a un segundo archivo.
2. **Lógica fuera de componentes visuales.** Cualquier consulta a la base de
   datos, validación de negocio o construcción de mensajes de WhatsApp vive en
   `src/lib/`, no en el frontmatter de un `.astro` de presentación.
3. **No romper el admin por cambios de frontend.** El admin tiene su propio
   sistema visual intencional; un cambio en `global.css` para la web pública
   nunca debe alterar visualmente el panel sin que sea una decisión explícita
   y documentada (los alias de compatibilidad `--color-accent-soft`,
   `--font-heading`, `--color-border` existen exactamente para esto).
4. **No duplicar fuentes de verdad.** Un dato o una regla de validación vive
   en un solo lugar (`src/lib/productos.ts` para categorías/colores válidos,
   `src/consts.ts` para mensajes de WhatsApp). No repetir listas de valores
   válidos en un segundo archivo.
5. **No introducir dependencias sin justificar peso y necesidad.** El
   proyecto es deliberadamente ligero (Astro + Astro DB + Blob, sin frameworks
   de UI ni CSS). Cualquier librería nueva debe justificar por qué no puede
   resolverse con Astro + CSS + JS vanilla.
6. **No escribir contra la base de datos remota sin el procedimiento de
   `MIGRACIONES-PRODUCCION.md`.** Ningún cambio de schema se aplica con
   `astro db push` (no existe) ni con scripts que no sean estrictamente
   aditivos y de un solo uso, borrados después de verificar.
7. **Nunca cargar una fuente que ninguna regla CSS use.** Antes de añadir un
   `<link>` de Google Fonts, confirmar que algún selector real la referencia
   (ver inconsistencia § 9.2 como ejemplo de lo que evitar).

## 10.1 Shell global (Fase 2)

- **Skip link**: primer elemento tabulable de cada página pública
  (`Layout.astro`), enlaza a `#contenido`. Toda página nueva debe dar a su
  `<main>` el `id="contenido"` para que el skip link funcione — ya aplicado
  en `index.astro`, `404.astro`, `productos/[slug].astro`.
- **Menú móvil**: overlay a pantalla completa (no dropdown), controlado por
  JS vanilla sin librería. Usa el atributo nativo `inert` sobre `main` y
  `.footer` mientras está abierto (en vez de un focus-trap manual) + bloqueo
  de scroll (`document.body.style.overflow`) + cierre con `Escape` +
  devolución de foco al botón que lo abrió. Cualquier página nueva que
  incluya `<Header />` hereda este comportamiento sin cambios.
- **Header**: sticky, se compacta (padding, no altura) al superar 12px de
  scroll — sin CLS, ancla su altura al wordmark (`line-height: 1`) para que
  el compactado no salte.

## 11. Deployment

- Build de producción: `npm run build` = `astro build --remote` (requiere
  `ASTRO_DB_REMOTE_URL`/`ASTRO_DB_APP_TOKEN` — falla en local a propósito).
  Build de verificación local: `ASTRO_DATABASE_FILE=".astro/local.db" npm run
  build:local`.
- Adaptador `@astrojs/vercel`: funciones server-side, sin páginas estáticas
  pre-renderizadas (todo el sitio es SSR, `output: "server"`).
  Vercel Blob debe estar conectado al proyecto (Storage → Blob) para que
  exista `BLOB_READ_WRITE_TOKEN`/OIDC en Production.
- Variables de entorno requeridas en Vercel: `ADMIN_USER`, `ADMIN_PASSWORD`,
  `SESSION_SECRET`, `BLOB_READ_WRITE_TOKEN`, `ASTRO_DB_REMOTE_URL`,
  `ASTRO_DB_APP_TOKEN`.
