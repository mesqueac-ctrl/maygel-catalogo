# Maygel — Caribe cálido

Sistema visual de la tienda pública (`.sitio` en `Layout.astro`). El panel
(`body.admin`) reutiliza la misma paleta, más sobrio y funcional.

## Dirección

Tienda cálida, profesional y orientada a pedir por WhatsApp. Fotos grandes,
pastillas redondas. No Quiet Luxury, no índigo editorial.

## Paleta

Definida una sola vez en `src/styles/global.css` (bloque `.sitio`).

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| Arena `--color-bg` | `#F6EFE6` | fondo | — |
| Crema `--color-surface` | `#FFFAF3` | superficies, tarjetas | — |
| Espresso `--color-text` / `--color-dark` | `#2B1A12` | texto y bloques oscuros | 14.8:1 sobre arena |
| Café `--color-muted` | `#8C5A2F` | texto secundario | 5.3:1 sobre arena |
| Terracota `--color-terracotta` | `#D9572B` | acentos grandes, no texto pequeño | blanco ≈ 3.9:1 — no se usa como texto de botón |
| CTA `--color-cta` | `#C24520` | botones con texto blanco | 5.05:1 (ajuste AA sobre la terracota pedida) |
| Mostaza `--color-mustard` | `#E8B04A` | acento puntual (chips) | espresso sobre mostaza ≈ 7.4:1 |

Radio: `--radius: 1.35rem` (fotos y tarjetas), `--radius-pill` en botones.

## Tipografía

- **Bricolage Grotesque** 700–800 — H1/H2, wordmark. Interlineado ~0.95, tracking negativo.
- **Inter** 400–700 — cuerpo, nav, precios, botones.
- Carga Google Fonts con `display=swap`.

## Componentes

- Botón primario: pastilla terracota oscura `#C24520` + blanco.
- Botón secundario: pastilla outline espresso.
- Header sticky, CTA “Pedir por WhatsApp”.
- Hero: titular grande, dos CTAs, foto redondeada. Pasa directo a La colección.
- ProductCard: foto 4:5, precio vía `precioEfectivo()`, swatches, **Pedir** → `enlaceProducto()`.
- Instagram solo en el footer (`icono + @maygelcr`).
- FAB WhatsApp en móvil; en ficha, barra fija inferior “Pedir este par”.

## Fuera de alcance

Admin, DB, APIs, mensajes de WhatsApp existentes (se reutilizan).
