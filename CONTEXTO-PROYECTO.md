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
    │   └── productos.ts    listarTodos, listarDisponibles, obtenerPorId,
    │                       crear, actualizar, eliminar, mover,
    │                       tallasComoLista, formatearPrecio
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
    │   ├── ProductCard.astro   foto 4:5, precio, tallas, CTA WhatsApp
    │   ├── ContactFooter.astro CTA + Instagram + horario (TODO)
    │   └── admin/ProductoForm.astro  formulario compartido crear/editar
    │
    └── pages/
        ├── index.astro
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
| `nombre` | text | |
| `precio` | number | entero en COP, sin decimales |
| `tallas` | text | separadas por comas: `"35, 36, 37"` |
| `imagen` | text | URL de Vercel Blob, o ruta `/productos/x.svg` del seed |
| `descripcion` | text | |
| `disponible` | boolean | default true; si es false no aparece en la web |
| `orden` | number | default 0; menor = aparece antes |

**Detalle importante sobre `imagen`**: puede contener dos cosas. Si empieza por
`http` es una URL remota de Blob y `ProductCard.astro` la renderiza con el
componente `<Image>` de Astro (optimizada). Si no, es una ruta de `/public` y se
renderiza con un `<img>` normal, porque `<Image>` no procesa archivos de
`public/`. Esa bifurcación es intencional, no la elimines sin migrar el seed.

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

En desarrollo, Astro DB crea una base de datos temporal y ejecuta `db/seed.ts`
en cada arranque: **los cambios hechos en el panel en local se pierden al
reiniciar el servidor.** Es el comportamiento esperado.

---

## 10. Estado actual: qué está hecho y verificado

Todo lo siguiente se probó en un navegador real, no solo compilado:

- ✅ Web pública responsive, leyendo de la base de datos
- ✅ Links de WhatsApp con mensaje predefinido por producto
- ✅ `/admin/*` sin sesión redirige a login
- ✅ Login correcto entra; login incorrecto muestra error claro
- ✅ Crear, editar y eliminar productos (con confirmación antes de borrar)
- ✅ Ocultar un producto lo saca de la web pública sin borrarlo
- ✅ Reordenar con ↑↓ y que el orden se refleje en la web pública
- ✅ Cerrar sesión vuelve a bloquear el acceso
- ✅ Vista previa celular/computador
- ✅ Panel usable desde el móvil
- ✅ Meta tags Open Graph con URL absoluta
- ✅ `build:local` y `@astrojs/check`: 0 errores, 0 warnings

**No verificado en producción**: la subida real de fotos a Vercel Blob nunca se
ha ejecutado, porque no hay `BLOB_READ_WRITE_TOKEN` configurado. El código está
escrito y maneja el caso de token ausente con un mensaje amable, pero el camino
feliz sigue sin probarse contra el servicio real. **Es lo primero que hay que
comprobar tras el despliegue.**

---

## 11. Pendiente

### Bloqueado, necesita las cuentas del cliente

1. Crear el Blob Store en Vercel → copiar `BLOB_READ_WRITE_TOKEN`
2. Crear la base de datos remota (Astro Studio o Turso) → URL y token
3. Cargar las 6 variables de entorno en Vercel, con contraseña fuerte
4. Empujar el esquema a la base remota: `npm run astro db push --remote`
5. Sembrar los datos iniciales: `npm run astro db execute db/seed.ts --remote`
6. Desplegar y **probar que subir una foto funciona de verdad**

### Contenido que debe aportar el cliente

Están marcados con `TODO` en el código:

- Historia real del negocio → `src/components/About.astro`
- Horario de atención real → `src/components/ContactFooter.astro`
- Fotos reales de las sandalias → se suben desde el panel
- Foto real para redes → reemplazar `public/og-image.jpg` (1200×630)

Los placeholders actuales (`src/assets/*.svg`, `public/productos/*.svg`) son
dibujos de línea generados a mano, no fotos.

### Ideas no implementadas

- Varios usuarios con cuentas distintas
- Recuperación de contraseña
- Subida de varias fotos por producto / galería
- Recorte o compresión de imágenes antes de subirlas
- Analítica

---

## 12. Cómo trabajar en este proyecto

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
