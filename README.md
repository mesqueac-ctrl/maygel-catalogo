# Maygel

Sitio web de Maygel — sandalias artesanales — con panel de administración.

- **Web pública**: una sola página con hero, historia, catálogo y contacto.
- **Panel**: `/admin`, para gestionar el catálogo sin tocar código.
  Guía de uso en [GUIA-PANEL.md](./GUIA-PANEL.md).

## Stack

| Pieza | Qué hace |
|---|---|
| Astro (SSR) | Framework del sitio |
| Astro DB | Base de datos de productos |
| Vercel adapter | Despliegue con renderizado en servidor |
| Vercel Blob | Almacenamiento de las fotos |

## Desarrollo local

```bash
npm install
cp .env.example .env   # y rellena los valores
npm run dev
```

El sitio queda en `http://localhost:4321` y el panel en `http://localhost:4321/admin`.

En local, Astro DB crea una base de datos temporal y la llena con los productos
de `db/seed.ts` cada vez que arranca.

### Build

```bash
npm run build         # producción (necesita la base de datos remota)
npm run build:local   # prueba local, sin base de datos remota
```

Para `build:local` hay que definir `ASTRO_DATABASE_FILE`:

```bash
ASTRO_DATABASE_FILE=".astro/local.db" npm run build:local
```

## Variables de entorno

Configúralas en Vercel (Settings → Environment Variables) y en tu `.env` local.

| Variable | Para qué |
|---|---|
| `ADMIN_USER` | Usuario del panel |
| `ADMIN_PASSWORD` | Contraseña del panel |
| `SESSION_SECRET` | Firma la cookie de sesión (cadena aleatoria larga) |
| `BLOB_READ_WRITE_TOKEN` | Subir fotos a Vercel Blob |
| `ASTRO_DB_REMOTE_URL` | Base de datos en producción |
| `ASTRO_DB_APP_TOKEN` | Token de esa base de datos |

Genera un `SESSION_SECRET` con:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Pasos para publicar

1. Crear el proyecto en Vercel e importar este repositorio.
2. En Vercel: **Storage → Blob** → crear un store. Copiar el `BLOB_READ_WRITE_TOKEN`.
3. Crear la base de datos remota (Astro Studio o Turso) y copiar su URL y token.
4. Añadir las 6 variables de entorno de la tabla de arriba.
5. Subir el esquema y los datos iniciales a la base remota:
   ```bash
   npm run astro db push --remote
   npm run astro db execute db/seed.ts --remote
   ```
6. Desplegar. Vercel ejecuta `npm run build`, que ya incluye `--remote`.

## Estructura

```
db/
├── config.ts              tabla Producto
└── seed.ts                productos iniciales

src/
├── middleware.ts          protege /admin/*
├── consts.ts              WhatsApp e Instagram
├── lib/
│   ├── auth.ts            login y cookie de sesión
│   └── productos.ts       consultas a la base de datos
├── layouts/
│   ├── Layout.astro       web pública (SEO, fuentes)
│   └── AdminLayout.astro  panel
├── components/
│   ├── Header, Hero, About, ProductCard, ProductGrid, ContactFooter
│   └── admin/ProductoForm.astro
├── pages/
│   ├── index.astro
│   └── admin/
│       ├── login.astro
│       ├── vista-previa.astro   cómo se ve el sitio en celular / computador
│       ├── productos/     lista, nueva, [id]
│       └── api/           login, logout, guardar, eliminar, mover
└── styles/global.css      paleta y estilos base
```

## Personalizar

- **Historia del negocio**: `src/components/About.astro` (marcado con `TODO`).
- **Horario de atención**: `src/components/ContactFooter.astro` (marcado con `TODO`).
- **WhatsApp / Instagram**: `src/consts.ts`.
- **Colores y tipografías**: variables al inicio de `src/styles/global.css`.
- **Imagen para redes sociales**: `public/og-image.jpg` (1200×630). Hay una
  provisional; reemplázala por una foto real cuando la tengas.

Las etiquetas Open Graph se construyen con el dominio real en tiempo de
ejecución, así que funcionan en WhatsApp y Facebook sin configurar nada más.
