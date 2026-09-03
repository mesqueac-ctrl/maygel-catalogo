# Contexto del proyecto Maygel — documento de traspaso

> Documento para pasar a otra IA o a otra persona desarrolladora que continúe el
> trabajo. Describe el negocio, las decisiones tomadas, el estado actual del
> código y lo que queda pendiente.

---

## 1. El negocio

**Maygel** es un negocio familiar que fabrica y vende sandalias artesanales,
hechas a mano. No es una marca grande: es un taller de familia.

| Dato | Valor |
|---|---|
| Nombre | Maygel |
| WhatsApp | +57 324 351 3189 (formato `wa.me`: `573243513189`) |
| Instagram | @maygelcr |
| Mercado | Colombia (precios en COP, textos en español) |
| Tono de la marca | Cálido, artesanal, cercano |

**Quién administra el sitio:** la madre del propietario del proyecto, que **no
es usuaria técnica**. Este es el condicionante de diseño más importante de todo
el panel de administración: nada de jerga técnica, botones grandes, textos
explícitos, confirmaciones antes de acciones destructivas.

---

## 2. Qué es el proyecto

Sitio web de una sola página (con secciones ancladas) + panel de administración
para gestionar el catálogo sin tocar código.

- **Web pública** (`/`): hero, historia, catálogo de sandalias, contacto.
  Cada producto tiene un botón que abre WhatsApp con un mensaje predefinido.
- **Panel** (`/admin`): login, listado, crear, editar, eliminar, reordenar
  productos y previsualizar cómo se ve la página.

---

## 3. Stack técnico

| Pieza | Versión | Para qué |
|---|---|---|
| Astro | ^7.2.10 | Framework, en modo SSR (`output: "server"`) |
| @astrojs/db | ^0.21.3 | Base de datos de productos (libSQL) |
| @astrojs/vercel | ^11.0.9 | Adapter de despliegue |
| @vercel/blob | ^2.8.0 | Almacenamiento de las fotos de producto |
| TypeScript | strict | Configurado vía `astro/tsconfigs/strict` |

Node >= 22.12.0. Sin frameworks de UI ni de CSS: solo componentes `.astro` con
estilos scoped y variables CSS globales.

### Decisiones de arquitectura y por qué

- **SSR en vez de estático**: el panel necesita sesiones y escrituras, no puede
  ser 100% estático. La web pública también se sirve desde el servidor para que
  los cambios del panel se vean al instante, sin necesidad de un redeploy.
- **Astro DB en vez del JSON inicial**: el proyecto empezó leyendo
  `src/data/productos.json`. Ese archivo **ya no existe**; fue reemplazado por
  la tabla `Producto`. Los datos de ejemplo viven ahora en `db/seed.ts`.
- **Vercel Blob para las fotos**: el sistema de archivos de Vercel es efímero,
  así que las fotos subidas desde el panel no pueden guardarse en disco.
- **Cookie de sesión firmada en vez de librería de auth**: es un único usuario
  contra variables de entorno; meter una librería de sesiones sería
  desproporcionado.
- **Flechas ↑ ↓ en vez de un campo numérico "orden"**: para una usuaria no
  técnica, "pulsa la flecha para subirla" es mucho más claro que "escribe 2 en
  el campo orden".

---

## 4. Diseño visual

Se hicieron **dos iteraciones de diseño**. La primera era cálida y con más
adornos (paleta terracota/beige, tipografías Fraunces + Nunito Sans, sombras,
bordes redondeados, botones verdes de WhatsApp). El cliente pidió rehacerla en
clave **minimalista**. Esta es la vigente:

### Paleta (definida en `src/styles/global.css`)

```css
--color-bg: #FAF6F1;          /* fondo */
--color-text: #2B2420;        /* texto principal */
--color-accent: #B5651D;      /* acento, botones, precios */
--color-accent-soft: #8A7B6C; /* texto secundario */
--color-border: #E4DACD;      /* líneas y bordes */
```

### Tipografías

- Títulos: **Playfair Display** (serif), pesos 400/500
- Cuerpo: **Inter**, pesos 300/400/500
- Se cargan desde Google Fonts en los dos layouts.

### Principios aplicados (respetarlos al continuar)

- Mucho espacio negativo. `--space-section: clamp(5rem, 12vw, 9rem)`.
- **Sin** sombras, **sin** gradientes, **sin** bordes redondeados.
- Secciones separadas por líneas de 1px, no por bloques de color.
- Las fotos de producto son el protagonista: 4:5, sin marco, hover sutil
  (`scale(1.03)`).
- Botones: color sólido o enlace subrayado; único efecto de hover es `opacity`
  o cambio de color de borde.
- Mobile-first, todo responsive.

> **Nota**: el panel de administración deliberadamente **no** sigue el
> minimalismo extremo de la web pública. Usa botones grandes, avisos con color
> (verde/rojo) y más peso visual, porque prioriza la claridad para una usuaria
> no técnica sobre la elegancia.

---

## 5. Estructura del código

```
maygel/
├── astro.config.mjs        SSR + db + adapter Vercel + remotePatterns de Blob
├── package.json
├── .env                    valores locales (NO se sube a git)
├── .env.example            plantilla de variables
├── README.md               documentación técnica
├── GUIA-PANEL.md           guía de uso en lenguaje simple, para la mamá
├── CONTEXTO-PROYECTO.md    este documento
│
├── db/
│   ├── config.ts           tabla Producto
│   └── seed.ts             3 productos de ejemplo
│
├── public/
│   ├── og-image.jpg        1200×630, generada con sharp (provisional)
│   ├── favicon.svg / .ico
│   └── productos/          producto-1/2/3.svg (placeholders del seed)
│
└── src/
    ├── middleware.ts       protege /admin/*
    ├── consts.ts           WhatsApp, Instagram, buildWhatsappLink()
    ├── env.d.ts            tipos de las variables de entorno
    │
    ├── assets/             hero.svg, producto-1/2/3.svg (placeholders)
    ├── styles/global.css   paleta, reset, .container .section .btn .eyebrow
    │
    ├── lib/
    │   ├── auth.ts         credencialesValidas, crearSesion, sesionValida, cerrarSesion
    │   ├── whatsapp.ts     mensajeProducto, enlaceProducto (mensajes de producto)
    │   └── productos.ts    listarTodos, listarDisponibles, obtenerPorId,
    │                       crear, actualizar, eliminar, mover,
    │                       tallasComoLista, formatearPrecio, slugDeProducto,
    │                       imagenParaColor, imagenesColoresComoMapa
    │
    ├── layouts/
    │   ├── Layout.astro        web pública: SEO, Open Graph, fuentes
    │   └── AdminLayout.astro   panel: barra superior + Cerrar sesión
    │
    ├── components/
    │   ├── Header.astro        sticky, nav + link a WhatsApp
    │   ├── Hero.astro          título + foto a ancho completo
    │   ├── About.astro         historia (TODO: texto placeholder)
    │   ├── ProductGrid.astro   lee listarDisponibles(), grid 1/2/3 columnas
    │   ├── ProductCard.astro   foto 4:5, precio, tallas, colores, CTA WhatsApp
    │   ├── ComoComprar.astro   pasos + datos de fabricación/entrega/pago
    │   ├── VentaMayor.astro    sección mayorista, CTA y mensaje propios
    │   ├── ContactFooter.astro CTA + Instagram
    │   └── admin/ProductoForm.astro  formulario compartido crear/editar
    │
    └── pages/
        ├── index.astro
        ├── 404.astro                    página de error real (noindex)
        ├── sitemap.xml.ts               sitemap dinámico desde la DB
        ├── productos/
        │   └── [slug].astro             ficha pública de cada producto
        └── admin/
            ├── index.astro          redirige a /admin/productos
            ├── login.astro
            ├── vista-previa.astro   iframe del sitio, celular/computador
            ├── productos/
            │   ├── index.astro      listado con ↑↓, editar, eliminar
            │   ├── nueva.astro
            │   └── [id].astro       edición
            └── api/
                ├── login.ts     POST valida y crea cookie
                ├── logout.ts    POST borra cookie
                ├── guardar.ts   POST sube foto a Blob + inserta/actualiza
                ├── eliminar.ts  POST borra producto + su foto
                └── mover.ts     POST sube/baja una posición
```

---

## 6. Modelo de datos

`db/config.ts`, tabla **Producto**:

| Campo | Tipo | Notas |
|---|---|---|
| `id` | number | primaryKey, autoincremental |
| `nombre` | text | también genera el slug de la URL pública (`slugify(nombre)-id`) |
| `precio` | number | entero en COP, sin decimales |
| `tallas` | text | separadas por comas: `"35, 36, 37"` |
| `colores` | text | separadas por comas, solo valores de `COLORES_VALIDOS` (Negro/Blanco/Miel/Beige) |
| `imagen` | text | URL de Vercel Blob, o ruta `/productos/x.svg` del seed. Foto principal / fallback |
| `imagenesColores` | text (opcional) | JSON `{"Color": "url"}` — foto específica por color, opcional. Añadida después del lanzamiento inicial (ver sección 10.1) |
| `descripcion` | text | |
| `disponible` | boolean | default true; si es false no aparece en la web |
| `orden` | number | default 0; menor = aparece antes |

**Detalle importante sobre `imagen`**: puede contener dos cosas. Si empieza por
`http` es una URL remota de Blob y `ProductCard.astro` la renderiza con el
componente `<Image>` de Astro (optimizada, incluyendo conversión a `webp`). Si
no, es una ruta de `/public` y se renderiza con un `<img>` normal, porque
`<Image>` no procesa archivos de `public/`. Esa bifurcación es intencional, no
la elimines sin migrar el seed.

**Detalle sobre `imagenesColores`**: si un color no tiene entrada en este JSON
(o el campo está vacío/null, como en los 3 productos actuales), la ficha usa
automáticamente `imagen` para ese color. Nunca es obligatorio.

---

## 7. Autenticación

Implementada a mano en `src/lib/auth.ts`:

- Usuario y contraseña se comparan contra `ADMIN_USER` y `ADMIN_PASSWORD` con
  `crypto.timingSafeEqual` (comparación en tiempo constante).
- La cookie `maygel_sesion` contiene `usuario.expiración.firmaHMAC-SHA256`,
  firmada con `SESSION_SECRET`.
- Flags: `httpOnly`, `sameSite: lax`, `secure` solo en producción. Dura 7 días.
- `src/middleware.ts` intercepta todo `/admin/*` y redirige a `/admin/login`
  si la sesión no es válida. Excepciones públicas: `/admin/login` y
  `/admin/api/login`.

Es un modelo de **un solo usuario**. Si en el futuro se necesitan varias
personas con cuentas distintas, hay que rehacer esta capa.

---

## 8. Variables de entorno

| Variable | Para qué |
|---|---|
| `ADMIN_USER` | Usuario del panel |
| `ADMIN_PASSWORD` | Contraseña del panel |
| `SESSION_SECRET` | Firma la cookie (cadena aleatoria larga) |
| `BLOB_READ_WRITE_TOKEN` | Subir/borrar fotos en Vercel Blob |
| `ASTRO_DB_REMOTE_URL` | Base de datos en producción |
| `ASTRO_DB_APP_TOKEN` | Token de esa base de datos |

En local están en `.env` (ignorado por git). En producción se configuran en
Vercel → Settings → Environment Variables.

⚠️ El `.env` local actual tiene una contraseña de prueba (`prueba-local-1234`).
**No debe usarse en producción.**

---

## 9. Comandos

```bash
npm run dev            # desarrollo, http://localhost:4321
npm run build          # producción: incluye --remote (lo ejecuta Vercel)
npm run build:local    # build de prueba sin base de datos remota
```

`build:local` necesita definir la ruta de la base de datos local:

```bash
ASTRO_DATABASE_FILE=".astro/local.db" npm run build:local
```

Comprobación de tipos:

```bash
npx @astrojs/check --tsconfig tsconfig.json
```

> Ojo: `npm run build` **falla en local a propósito**, porque lleva `--remote` y
> exige credenciales de la base de datos de producción. Para verificar en local
> hay que usar `build:local`. Esto suele confundir; no lo "arregles" quitando el
> `--remote` o romperás el despliegue en Vercel.

### ⚠️ El CLI `astro db` ya NO existe en Astro 7

Documentación antigua (incluida versiones anteriores de este mismo archivo)
menciona comandos como `astro db push --remote` o `astro db execute ... --remote`
para aplicar cambios de esquema o sembrar datos en la base remota. **Astro 7
eliminó ese CLI.** Intentar ejecutar esos comandos hoy simplemente cae al
`--help` genérico de Astro — no hace nada, ni falla con un error claro.

El runtime de `@astrojs/db` (lo que usa el sitio para leer/escribir productos)
sigue funcionando perfectamente; es solo la herramienta de línea de comandos
para migraciones la que desapareció. Ver la sección 10.1 para el estado real
de la migración y la sección 13 para el procedimiento a seguir si hace falta
otro cambio de esquema en el futuro.

En desarrollo, Astro DB crea una base de datos temporal y ejecuta `db/seed.ts`
en cada arranque: **los cambios hechos en el panel en local se pierden al
reiniciar el servidor.** Es el comportamiento esperado.

---

## 10. Estado actual: qué está hecho y verificado

**El sitio ya está desplegado y funcionando en `https://www.maygel.co`.**
Todo lo siguiente se probó contra producción real, no solo en local:

- ✅ Web pública responsive, leyendo de la base de datos remota
- ✅ Fichas individuales de producto (`/productos/{slug}`), SEO, JSON-LD, sitemap dinámico
- ✅ Links de WhatsApp (general, por producto con color, y mayorista) con mensaje correcto
- ✅ `/admin/*` sin sesión redirige a login
- ✅ Variantes de color con imagen opcional por color (`imagenesColores`)
- ✅ Meta tags Open Graph con URL absoluta de producción
- ✅ `build:local` y `@astrojs/check`: 0 errores, 0 warnings
- ✅ Lighthouse en producción: Performance 98, Accessibility 100 (homepage y fichas), CLS ~0.0008, LCP ~1.9s

### 10.1 Migración de esquema `imagenesColores` — ya aplicada

La columna `Producto.imagenesColores` (`TEXT`, opcional) **ya fue añadida a la
base remota**, no mediante `astro db push` (no disponible, ver sección 9) sino
conectando directamente con `@libsql/client` (ya instalado como dependencia
transitiva de `@astrojs/db`) usando `ASTRO_DB_REMOTE_URL`/`ASTRO_DB_APP_TOKEN`,
y ejecutando manualmente:

```sql
ALTER TABLE "Producto" ADD COLUMN imagenesColores TEXT;
```

Verificado antes y después: los 3 productos existentes sobrevivieron intactos,
sin pérdida de datos, con `imagenesColores = NULL` (fallback automático a la
foto principal). Ver sección 13 para repetir este procedimiento si hiciera
falta otra migración en el futuro.

**No verificado todavía**: la subida real de fotos a Vercel Blob desde el
panel de producción (con `BLOB_READ_WRITE_TOKEN` real configurado en Vercel).
El código está escrito y maneja el caso de token ausente con un mensaje
amable, pero el camino feliz de subir una foto real no se ha probado contra
el servicio real en producción — requiere iniciar sesión con las credenciales
reales del panel, que no están disponibles en este entorno de desarrollo.

---

## 11. Pendiente

### Contenido que debe aportar el cliente

Están marcados con `TODO` en el código:

- Historia real del negocio → `src/components/About.astro`
- Fotos reales de las sandalias → se suben desde el panel (ver `GUIA-FOTOS.md`)
- Foto real para redes → reemplazar `public/og-image.jpg` (1200×630) si se
  decide cambiar la imagen de marca usada en Open Graph

~~Horario de atención real~~ — ya no aplica: el bloque de horario ficticio se
eliminó del footer (no había un dato real que mostrar).

**Catálogo actualmente en producción**: los 3 productos (`Sandalia Trenzada
Terracota`, `Sandalia Clásica de Cuero`, `Sandalia Doble Correa Ocre`) siguen
siendo los **fixtures de `db/seed.ts`** — nombres, precios, descripciones,
tallas, colores y fotos (SVG de línea) de ejemplo, no el catálogo real del
negocio. Sustituirlos es la siguiente tarea de negocio, no de código — ver
`GUIA-PANEL.md` para el procedimiento exacto. No requiere ningún cambio de
código: el admin ya soporta editar todos esos campos.

### Ideas no implementadas

- Varios usuarios con cuentas distintas
- Recuperación de contraseña
- Subida de varias fotos por producto / galería (más allá de la foto
  principal y la foto opcional por color ya soportadas)
- Recorte o compresión de imágenes antes de subirlas
- Analítica

---

## 12. Deuda técnica post-lanzamiento

- **`@astrojs/db` sobre Astro 7**: Astro 7 eliminó oficialmente el CLI
  `astro db` (push/verify/shell/execute). El runtime de `@astrojs/db` sigue
  funcionando con normalidad en producción — el sitio lee y escribe productos
  sin problema. Pero cualquier cambio de esquema futuro requerirá repetir el
  procedimiento manual con `@libsql/client` (sección 10.1 y 13), hasta que se
  evalúe una migración a **Drizzle + libSQL/Turso** directo, o arquitectura
  equivalente. **No es bloqueante actual** — es mantenimiento a planificar,
  no una tarea urgente.
- **Slug derivado del nombre** (`slugify(nombre) + "-" + id`): si se cambia
  el nombre de un producto, cambia su URL pública. Aceptable durante la carga
  inicial del catálogo (sin tráfico/indexación relevante todavía); una vez el
  catálogo real lleve tiempo publicado, conviene evitar cambiar nombres sin
  necesidad, o considerar persistir el slug en DB.
- **`path-to-regexp` (ReDoS, severidad alta, `npm audit`)**: dependencia
  transitiva de `@astrojs/vercel`/`@vercel/routing-utils`. Bajo riesgo
  práctico (rutas fijas definidas por el desarrollador, no por input de
  usuario). Resolverlo requeriría una versión mayor del adapter — no se debe
  actualizar sin evaluar el changelog primero.

---

## 13. Procedimiento para futuras migraciones de esquema (mientras `astro db` no exista)

> ## 🚫 NUNCA ejecutar contra la base remota de producción:
> - `astro db push` (con o sin `--force-reset`)
> - `astro db execute`
> - cualquier invocación directa de los módulos compilados de `@astrojs/db`
>   (`node_modules/@astrojs/db/dist/core/cli/...`)
>
> El `--force-reset` de `astro db push` **borra todos los datos y recrea la
> tabla desde cero**. Esto ya ocurrió una vez en este proyecto (ver
> `MIGRACIONES-PRODUCCION.md`, sección "Incidente conocido") y vació los 3
> productos que había en producción. No se sabe con certeza absoluta quién lo
> ejecutó ni cómo, pero la evidencia de código (múltiples entradas en la
> tabla interna `_astro_db_snapshot`, que solo esa función crea) apunta
> fuertemente a esa causa.
>
> El procedimiento correcto y seguro es el de esta sección, usando
> `@libsql/client` directamente — ver también `MIGRACIONES-PRODUCCION.md`
> para el runbook completo paso a paso.

1. Confirmar que `ASTRO_DB_REMOTE_URL` y `ASTRO_DB_APP_TOKEN` están disponibles
   en el entorno (nunca imprimir sus valores).
2. Antes de tocar nada: contar filas y guardar el schema actual
   (`PRAGMA table_info('Producto')`) con el script read-only ya incluido en
   el repositorio: `npm run db:inspect:remote`.
3. Escribir un script temporal fuera de `src/` (por ejemplo `scripts/`) que
   use `@libsql/client` (`createClient({ url, authToken })`) para aplicar
   únicamente el `ALTER TABLE ... ADD COLUMN ...` (u operación equivalente)
   estrictamente aditivo y no destructivo — nunca `DROP`, nunca recrear la
   tabla, nunca tocar filas existentes.
4. Verificar inmediatamente después con `npm run db:inspect:remote` de nuevo.
5. Borrar el script temporal de migración (el de inspección sí se queda,
   está pensado para reutilizarse) — nunca debe quedar en el repositorio ni
   contener credenciales escritas literalmente.

---

## 14. Información pendiente del negocio (para About)

El texto de "Sobre Maygel" sigue siendo un placeholder (marcado con `TODO` en
`src/components/About.astro`). Para escribir la versión real hace falta que
el negocio responda:

- ¿Cómo nació Maygel realmente?
- ¿Quién fundó Maygel?
- ¿Dónde fabrican?
- ¿Qué significa el nombre "Maygel"?
- ¿Qué inspira sus diseños?
- ¿Cómo quieren describir la fabricación artesanal?
- ¿Qué quieren transmitir como marca?

---

## 15. Cómo trabajar en este proyecto

- **Idioma**: todo en español, incluidos nombres de funciones y variables del
  dominio (`listarDisponibles`, `tallasComoLista`, `crearSesion`). Mantener esa
  convención.
- **Textos del panel**: sin jerga técnica. Nunca "producto eliminado de la base
  de datos"; sí "La sandalia se eliminó correctamente". Nunca "campo requerido";
  sí "Faltan datos por llenar". Los errores explican qué hacer, no qué falló
  internamente.
- **Confirmaciones**: cualquier acción irreversible pide confirmación con el
  nombre del elemento y la frase "Esta acción no se puede deshacer".
- **Estilos**: CSS scoped dentro de cada `.astro`, usando siempre las variables
  de `global.css`. No introducir colores sueltos ni frameworks CSS.
- **Verificación**: antes de dar algo por terminado, comprobar con
  `build:local` + `@astrojs/check` y, si es un cambio visible, abrirlo en el
  navegador. El cliente valora que las cosas se prueben de verdad.
- **Preferencia de flujo del cliente**: pide ver la propuesta (paleta,
  estructura, mockups) **antes** de que se escriba el código en cambios
  grandes. Responde de forma breve; conviene proponer una opción concreta y
  recomendada en vez de una lista larga de alternativas.
