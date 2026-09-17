# Maygel — Sistema visual (Rediseño V2.1, "Quiet Luxury / Editorial")

> Generado a partir del build real (Fase C + V2.1). Documenta el mundo visual vigente para que futuras fases no reinventen decisiones ya tomadas.

## Dirección

Boutique premium editorial, no "DTC cálido genérico". Fotografía grande (o su reserva textil mientras no existe), tipografía serif para frases de marca, sans para interfaz, botones de texto en vez de cajas sólidas, sin eyebrows.

## Tipografía

- **Cormorant Garamond** (500/600) — H1, H2 de sección, wordmark, manifiesto. Solo para frases de marca/editoriales, nunca para UI.
- **Manrope** (400/500/600) — nav, body, botones, precios, labels, nombre de producto en catálogo, H3.
- Los números de secuencia (`01/02/03` tipo "Cómo comprar") van en Manrope con `font-variant-numeric: lining-nums tabular-nums` — el "1" de Cormorant Garamond puede leerse como "I" a tamaño grande y rompe la claridad funcional de un número.

## Paleta (`src/styles/global.css`)

| Token | Valor | Uso | Contraste verificado |
|---|---|---|---|
| `--color-bg` | `#f7f2ea` | fondo general (ivory) | — |
| `--color-surface` | `#fcfaf7` | secciones alternas (warm-white) | — |
| `--color-text` | `#241a15` | texto principal (espresso) | 15.3:1 sobre bg |
| `--color-muted` | `#6e5f52` | texto secundario | 5.5:1 sobre bg |
| `--color-accent` | `#8c5a2f` | texto/CTA/números | 5.2–5.8:1 sobre bg/surface, 5.8:1 blanco-sobre-camel |
| `--color-champagne` | `#c8aa86` | decorativo (separadores, texturas) — nunca portador de texto |
| `--color-dark` | `#1c130e` | bloques editoriales oscuros (manifiesto, footer) |
| `--color-dark-text` | `#f4ece1` | texto sobre `--color-dark` |
| `--color-line` | `rgba(36,26,15,.14)` | bordes/hairlines |

Alias de compatibilidad (no rediseñados en V2.1): `--color-accent-soft → --color-muted`, `--font-heading → --font-body`, `--color-border → --color-line`. Los usa exclusivamente el panel admin.

## Componentes clave

- **Botones** (`.btn`, `.btn-outline`, `.btn-on-dark`): texto + flecha (`→`/`↗`), sin relleno ni sombra, subrayado como único borde.
- **Header**: sticky, translúcido + blur al hacer scroll, se compacta (padding) al cruzar 12px de scroll. Nav móvil con `grid-template-rows` (0fr→1fr), no `max-height`.
- **Hero**: asimétrico ~58/42 en desktop (imagen izquierda, copy derecha), apilado en móvil (imagen arriba). El panel de imagen es un bloque textil con ruido SVG sutil — reserva de fotografía real, nunca un mockup con letra.
- **ProductCard**: prop `variante` (`"catalogo" | "ficha"`). Catálogo = foto + nombre (Manrope tracked uppercase) + precio + puntos de color decorativos, sin CTA ni descripción. Ficha = versión completa con selector de color funcional y CTA de WhatsApp.
- **Revelado** (`[data-reveal]`): fade + translateY(12px), un único gesto reutilizado en headers de sección, respeta `prefers-reduced-motion`.

## Reglas duras (no negociables sin nueva decisión del usuario)

- Sin eyebrows/kickers sobre H1/H2 en ninguna sección pública.
- Sin tarjetas-caja con sombra/borde genérico para contenido — el catálogo vive en espacio abierto.
- Máximo 3 pesos por familia tipográfica cargada.

## Pendiente de reemplazo (marcado en código)

- `Hero.astro` (`.hero__visual`), `About.astro` (`.about__visual`), `CustomModelCTA.astro` (`.modelo__visual`): bloques de textura reservados para fotografía real del taller/producto.

---
Fase construida: V2.1 Quiet Luxury. Ver el comentario de contrato en `src/layouts/Layout.astro` (primer hijo de `<body>`) para la decisión completa registrada en build-time.
