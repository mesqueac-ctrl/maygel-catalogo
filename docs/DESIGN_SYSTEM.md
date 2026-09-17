# Maygel — Sistema de diseño

> Traduce `BRAND_SYSTEM.md` a tokens e implementación concreta. Fase 1 cierra
> la auditoría y la foundation (tokens, tipografía, spacing, botones, focus).
> Homepage, catálogo, PDP y mayoristas **no se rediseñan en esta fase** — ver
> confirmación explícita al final del informe de entrega de Fase 1.

## 0. Auditoría KEEP / REFINE / REPLACE

Evaluado contra los seis pilares de `BRAND_SYSTEM.md` § 3 y la prueba de
identidad propia (§ 0). Explicación del porqué en cada fila.

| Elemento | Veredicto | Por qué |
|---|---|---|
| **Wordmark** (Cormorant 600, sin icono) | **KEEP**, reglas formalizadas | Ya cumple "sin cliché" (§ 7 de `BRAND_SYSTEM.md`) — el riesgo no era el wordmark en sí sino que no tenía reglas de uso escritas. Resuelto documentalmente, sin tocar código. |
| **Header** (sticky, translúcido, nav de 4 enlaces + WhatsApp texto) | **REFINE** (fase 2, no ahora) | Estructura correcta y ya alineada con "no debe competir con el producto". Necesita foco visible verificado (riesgo abierto de Fase 0) antes de darse por cerrado — no es un problema de identidad. |
| **Hero** (asimétrico, imagen 58/60% + copy, bloque textil de reserva) | **REFINE** | La composición asimétrica y la ausencia de mockup ya son correctas. El bloque de textura de reserva es genérico (degradado cálido) — cuando llegue fotografía real, debe ser de la familia B (Editorial), nunca A aislada, para no caer en "boutique bonita genérica". No se toca código hasta que exista foto real. |
| **Tipografía (Cormorant Garamond + Manrope)** | **KEEP la combinación, REPLACE la escala** | La combinación editorial/interfaz es correcta y ya calibrada en pesos (3 por familia). Lo que faltaba — y sí se resuelve en esta fase — es una escala formal con roles nombrados (display/h1/h2/h3/body/small/label/nav/price/quote), no una fuente distinta. |
| **Paleta (ivory/espresso/camel/champagne)** | **KEEP los valores, REPLACE la estructura de roles** | Los hex ya evitan blanco puro, negro absoluto y terracota saturado — exactamente la dirección pedida ("marfil cálido, papel/blanco roto, espresso cálido, cuero/arena"). Lo que faltaba eran roles semánticos nombrados (background primary/secondary, surface, accent subtle, inverse, success/error) — se añaden en esta fase como capa semántica sobre los mismos valores, sin cambiar ningún hex visible hoy. |
| **Grid y spacing** | **REPLACE** | No existía una escala numerada ni breakpoints centralizados — solo `clamp()` ad-hoc por componente. Se formaliza en esta fase (§ 4). |
| **Botones** (texto + flecha, sin caja) | **KEEP** | Es la decisión que mejor cumple "la interfaz no debe competir con el producto" y "sin botones-caja" de todo el sistema. Se mantiene sin cambios. |
| **Product cards** (foto + nombre + precio, sin caja en catálogo; completa en ficha) | **KEEP la estructura**, pendiente de fotografía real (§ 5) | Estructura ya correcta; su percepción de calidad depende de que la fotografía real (cuando exista) sea de las familias B/C/D combinadas, no solo A. |
| **Catálogo (grid 2/3 columnas)** | **KEEP la estructura, REPLACE el spacing** | Migra a la escala formal de § 4 en una fase futura que sí toque el componente (Fase 4 de `ROADMAP.md`) — no en esta fase de foundation. |
| **Fotografía** | **REPLACE (especificación), sin implementación** | Es el gap más grande frente a "Quiet Colombian Craft": hoy no existe ninguna foto real, y el marcador de posición actual no comunica las 4 familias necesarias. Se documenta el estándar completo (`BRAND_SYSTEM.md` § 5); no se puede "implementar" fotografía que no existe. |
| **Footer** (wordmark grande, nav simple, oscuro) | **KEEP** | Ya cumple el registro de "declaración de marca" sin exceso de columnas de enlaces. |
| **Estados (hover/focus/motion)** | **REFINE** | Hover de imagen y compactación de header ya correctos. Motion de revelado se ajusta a 600ms (dentro del rango 200–600ms pedido, antes 700ms). Focus states se formalizan globalmente en esta fase (§ 6) — no habían sido verificados. |
| **Mobile** | **KEEP** | Ya verificado mobile-first sin overflow en 360–1440px en la fase anterior; se revalida contra los tokens nuevos sin cambiar estructura. |
| **Admin** (solo para dependencias compartidas) | **KEEP visualmente, aislar dependencias** | El admin no sigue el sistema de marca por decisión intencional (ver `ARCHITECTURE.md` § 8). Dependencias compartidas detectadas: `--color-accent-soft`, `--font-heading`, `--color-border` (alias de compatibilidad) y una carga de Google Fonts (Playfair+Inter) que ya no se usa — ver § 7. Ninguna se elimina sin verificar antes que el admin no la necesite. |

## 1. Roles semánticos de color (nuevos — capa sobre los valores existentes)

**Ningún valor hexadecimal cambia en esta fase.** Los roles nuevos son un
alias semántico sobre los tokens ya calibrados a AA en Fase 0, para que
futuros componentes consuman roles con nombre claro en vez de nombres
heredados (`--color-accent-soft`, etc.).

| Rol semántico | Variable nueva | Valor (= alias de) | Uso |
|---|---|---|---|
| Background primary | `--bg-primary` | `#f7f2ea` (`--color-bg`) | Fondo general — ivory cálido |
| Background secondary | `--bg-secondary` | `#fcfaf7` (`--color-surface`) | Secciones alternas — papel/blanco roto |
| Surface | `--surface` | `#fcfaf7` (= `--bg-secondary` hoy) | Reservado para contenido elevado (futuro); hoy sin superficie de tarjeta propia, coincide con `--bg-secondary` a propósito — no se inventa un tercer blanco sin uso real |
| Text primary | `--text-primary` | `#241a15` (`--color-text`) | Texto de lectura — espresso cálido |
| Text secondary | `--text-secondary` | `#6e5f52` (`--color-muted`) | Subtítulos, metadatos, precios secundarios |
| Accent | `--accent` | `#8c5a2f` (`--color-accent`) | Un único acento por vista — enlaces de acción, precio destacado |
| Accent subtle | `--accent-subtle` | `#b98a5c` **(nuevo)** | Fondos/subrayados de énfasis bajo — **nunca portador de texto** (2.75:1, falla AA incluso a tamaño grande) |
| Border | `--border` | `rgba(36,26,15,.14)` (`--color-line`) | Hairlines |
| Inverse surface | `--inverse-surface` | `#1c130e` (`--color-dark`) | Bloques editoriales oscuros |
| Inverse text | `--inverse-text` | `#f4ece1` (`--color-dark-text`) | Texto sobre `--inverse-surface` |
| Decorative | `--decorative` | `#c8aa86` (`--color-champagne`) | Separadores, texturas — nunca texto |
| Success **(nuevo)** | `--color-success` | `#3f6b3f` | Confirmaciones públicas futuras (5.6–5.9:1 sobre ambos fondos, AA) |
| Error **(nuevo)** | `--color-error` | `#8c3a22` (mismo tono ya usado por el admin — se reutiliza en vez de introducir un tercer rojo) | Errores públicos futuros (6.9–7.4:1, AA) |

Los nombres heredados (`--color-bg`, `--color-accent`, `--color-accent-soft`,
`--font-heading`, `--color-border`, etc.) **siguen existiendo sin cambios** —
ver § 7. Ningún componente existente se migra a los nombres nuevos en esta
fase; los nuevos nombres son la base para Fases 2-5.

**Regla dura sin cambios respecto a Fase 0:** ningún color decorativo o
"subtle" se usa nunca como color de texto legible.

## 2. Tipografía — escala formal

| Rol | Familia | Peso | Tamaño (`clamp()`) | Uso |
|---|---|---|---|---|
| Display | Editorial | 600 | `clamp(3rem, 8vw, 5.5rem)` | Reservado para momentos de máxima escala (futuro; el hero actual usa H1) |
| H1 | Editorial | 600 | `clamp(2.6rem, 7.5vw, 4.75rem)` | Titular de hero — valor ya vigente, ahora nombrado |
| H2 | Editorial | 600 | `clamp(2.1rem, 4.4vw, 3.4rem)` | Titular de sección — valor ya vigente (`.section-title`), ahora nombrado |
| H3 | Interfaz | 600 | `0.875rem`–`1.75rem` según contexto | Nombre de producto en catálogo (pequeño, tracked uppercase) vs. ficha (grande, serif — excepción documentada abajo) |
| Body | Interfaz | 400 | `1rem` | Texto de lectura |
| Small | Interfaz | 400–500 | `0.8125rem`–`0.875rem` | Ayudas, metadatos |
| Label | Interfaz | 600 | `0.75rem`–`0.8125rem`, tracked uppercase | Botones, chips, labels de formulario |
| Nav | Interfaz | 400–500 | `0.875rem` | Enlaces de navegación |
| Price (catálogo) | Interfaz | 400 | `0.875rem` | Precio en tarjeta compacta |
| Price (ficha) | Interfaz | 500 | `1.125rem` | Precio en ficha de producto |
| Editorial quote | Editorial | 500 | `clamp(1.25rem, 2.4vw, 1.625rem)` | Frase de apoyo en bloques de declaración (manifiesto) |

**Excepción documentada — nombre de producto en ficha:** usa la familia
editorial (serif), no la de interfaz, porque en la ficha el nombre funciona
como un titular de producto, no como una etiqueta de catálogo. Es una
excepción consciente a "H3 = interfaz", ya implementada
(`ProductCard.astro`, `.card--ficha .card__name`) — no revertir sin razón.

**Regla dura de números (sin cambios):** los números de secuencia o cifra
grande (pasos, tallas, precios) usan siempre la familia de interfaz con
`font-variant-numeric: lining-nums tabular-nums` — la familia editorial puede
volver el "1" ambiguo con una "I" mayúscula a tamaños de titular.

## 3. Wordmark — implementación

Ver reglas de uso completas en `BRAND_SYSTEM.md` § 7. En código:
`font-family: var(--font-display); font-weight: 600;` sin iconografía — ya
implementado en `Header.astro`, `ContactFooter.astro`. Sin cambios en esta
fase.

## 4. Grid y spacing — escala formal (nueva)

### Spacing

| Token | Valor | Uso previsto |
|---|---|---|
| `--space-3xs` | `0.25rem` | separaciones mínimas (icono-texto) |
| `--space-2xs` | `0.5rem` | gaps de chips, puntos de color |
| `--space-xs` | `0.75rem` | padding interno pequeño |
| `--space-sm` | `1rem` | gap estándar de formulario |
| `--space-md` | `1.5rem` | gap entre bloques relacionados |
| `--space-lg` | `2rem` | gap entre grupos |
| `--space-xl` | `clamp(2.5rem, 5vw, 3.5rem)` | separación entre bloques de una sección |
| `--space-2xl` | `clamp(3rem, 6vw, 4.5rem)` | cabeceras de sección a su contenido |
| `--space-3xl` | `clamp(4.5rem, 11vw, 9rem)` | padding vertical de sección (= `--space-section` actual, alias) |
| `--space-4xl` | `clamp(6rem, 14vw, 11rem)` | pausas editoriales mayores (reservado, sin uso todavía) |

`--space-section` se conserva como alias de `--space-3xl` — cero componentes
requieren cambio.

### Grid / max-widths

| Contexto | Valor |
|---|---|
| Ancho máx. de contenido | `--max-width: 1180px` (sin cambio) |
| Gutter lateral | `clamp(1.5rem, 5vw, 3rem)` (sin cambio) |
| Columnas de catálogo | 2 (móvil) / 3 (desde `1000px`) — sin cambio, formalizado |

### Breakpoints (formalizados como referencia, no como custom properties —
CSS no permite variables dentro de `@media`)

| Nombre | Valor | Uso |
|---|---|---|
| `sm` | `640px` | ajustes menores de grid |
| `md` | `768px` | layouts de dos columnas |
| `nav` | `780px` | nav de escritorio del Header |
| `lg` | `1000px` | grid de 3 columnas |
| `xl` | `1024px` | ajustes de altura de hero |

Ningún componente futuro introduce un breakpoint "similar" (p. ej. `760px`)
sin que se añada aquí primero con su razón.

## 4.1 Catálogo — reglas de grid por cantidad (Fase 4)

El grid nunca asume el número actual de fixtures (3). Reglas implementadas en
`ProductGrid.astro`:

| Cantidad | Comportamiento |
|---|---|
| 0 | Estado vacío de marca (ver `UX_RULES.md` § 10), no un grid vacío |
| 1 | Composición propia (`.catalogo__unico`, `max-width: 420px`), nunca una tarjeta estirada dentro de un grid pensado para varias |
| 2 | Grid de 2 columnas en todos los breakpoints (`max-width: 760px`) — nunca una tercera columna vacía en escritorio |
| 3+ | Grid normal: 1 columna hasta `480px`, 2 columnas hasta `1000px`, 3 columnas desde `1000px` |

**Mobile empieza en 1 columna, no en 2.** A 320–430px, 2 columnas dejan la
fotografía por debajo de ~140px de ancho — insuficiente para sentirse
premium. Se escala a 2 columnas solo desde `480px`, cuando hay ancho real.
Verificado visualmente con 0/1/2/3/8 productos (ver entrega de Fase 4).

## 4.2 Ratio de imagen de producto — justificación

`4:5` en catálogo y ficha, `object-fit: cover`. Con los fixtures actuales
(SVG de línea, sin fotografía real) no hay nada que "recortar agresivamente"
— la decisión queda pendiente de re-validar cuando exista fotografía real
(ver `HOMEPAGE_SPEC.md` § Photography Production Needs, familia PRODUCT). Si
la fotografía real no encaja bien en `4:5` con `cover`, la alternativa
documentada es `object-fit: contain` sobre una superficie de color sólido
consistente (nunca recorte agresivo del producto) — decisión a tomar con
fotos reales en mano, no antes.

## 5. Fotografía — estándar técnico

Ver estándar completo y las 4 familias en `BRAND_SYSTEM.md` § 5. Especificación
de implementación cuando exista fotografía real:

| Contexto | Aspect ratio | Familia recomendada |
|---|---|---|
| Tarjeta de catálogo | `4:5` | A (Clean Product) |
| Ficha de producto | `4:5` (desktop), `4:3` (mobile) | A, con detalle opcional de D en la descripción |
| Hero | `~4:5` a `1:1` según crop (hoy `clamp(320px,78vw,460px)` móvil / altura completa desktop) | B (Editorial) |
| About / historia | `4:3` (móvil), `4:5` (desktop) | D (Craft) |
| Modelo personalizado | `16:10` | C (Lifestyle) o D (Craft) |

## 6. Focus states (nuevo — foundation)

- Todo elemento interactivo (enlaces, botones, inputs) recibe un
  `:focus-visible` explícito: `outline: 2px solid var(--accent); outline-offset: 2px;`
  — nunca `outline: none` sin reemplazo.
- Se implementa a nivel global (`a:focus-visible, button:focus-visible,
  input:focus-visible, textarea:focus-visible, select:focus-visible`) para
  que todo componente público lo herede sin necesidad de tocarlo — resuelve
  el riesgo abierto de Fase 0 (`ARCHITECTURE.md` § 9.7).
- El admin ya tenía su propio `outline: 2px solid var(--color-accent)` en
  inputs — compatible con el nuevo `--accent` (mismo valor), sin conflicto.

## 7. Botones y enlaces (sin cambios — ya cumplían el sistema)

Ver `global.css`: `.btn` / `.btn-outline` / `.btn-on-dark` — texto + flecha,
sin relleno ni sombra, `min-height: 44px`. Se mantiene sin cambios; es el
elemento mejor alineado con "la interfaz no debe competir con el producto"
de todo el sistema actual.

## 8. UI — reglas por componente (futuro, no implementado aún salvo lo ya existente)

| Componente | Estado | Regla |
|---|---|---|
| Botones / enlaces | Implementado | Texto + flecha, ver § 7 |
| Product cards | Implementado (catálogo/ficha) | Ver auditoría § 0 |
| Pills (chips de categoría) | Implementado, decorativo | Texto separado por `·`, sin caja — no convertir en pastilla con fondo sólido cuando se implemente el filtrado real (Fase 4) |
| Selects | Solo en admin | Sin cambios — admin no rediseñado |
| Color swatches | Implementado (círculo + borde) | Mantener; nunca usar el color como fondo de botón (falla contraste con varios colores) |
| Tallas | Texto plano, sin selector | Ver `PRODUCT_PAGE_SPEC.md` para selector futuro |
| Inputs | Solo en admin | Sin cambios |
| Accordions | No implementado | Si se necesita (p. ej. guía de tallas), sin librería — `<details>`/`<summary>` nativo primero |
| Notices (avisos ok/error) | Solo en admin, con colores propios | Público futuro debe usar `--color-success`/`--color-error` nuevos, no inventar un tercer verde/rojo |
| Modal | No implementado | Evitar salvo necesidad real de interrupción/foco protegido (ver `craft-floor` de diseño ya aplicado en Fase C: "un modal para una tarea que no necesita interrupción" es un antipatrón) |
| Navegación | Implementado | Ver `UX_RULES.md` § 2 |
| Footer | Implementado | Ver auditoría § 0 |

## 9. Motion (ajustado)

| Gesto | Duración | Easing | Notas |
|---|---|---|---|
| Revelado de sección (`[data-reveal]`) | `600ms` (antes `700ms`) | `cubic-bezier(0.16, 1, 0.3, 1)` | Ajustado al rango `200–600ms` pedido; fade + `translateY(12px)`, una vez por elemento |
| Hover de imagen de producto | `600ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | `scale(1.02)` — ya dentro de rango, sin cambio |
| Hover de botón/enlace de texto | `220ms` | `ease` | Color/borde — ya vigente, sin cambio |
| Header, compactación en scroll | `250ms` | `ease` | Transición de `padding` (layout), aceptada conscientemente por bajo riesgo — ver `PERFORMANCE_RULES.md` |
| Menú móvil | `250ms` | `ease` | `grid-template-rows`, no `max-height` (evita layout thrash) |

Todo el sistema de motion respeta `prefers-reduced-motion: reduce` (el bloque
completo de revelado vive dentro de `@media (prefers-reduced-motion:
no-preference)`). **Prohibido:** bounce, spin, parallax grande, entradas
continuas, animación puramente decorativa sin función.

## 10. Mobile-first (sin cambios de comportamiento — ya validado)

Ver comportamiento por sección en `HOMEPAGE_SPEC.md` / `PRODUCT_PAGE_SPEC.md`.
Regla de foundation: cualquier token nuevo (spacing, tipografía) debe
definirse primero en su valor móvil y expandirse con `clamp()`, nunca al
revés.

## 11. Checklist de tokens (actualizado)

Ya existen en `global.css` (Fase 0):

- [x] `--color-bg`, `--color-surface`, `--color-text`, `--color-muted`,
      `--color-accent`, `--color-accent-hover`, `--color-champagne`,
      `--color-line`, `--color-dark`, `--color-dark-text`, `--color-dark-line`
- [x] `--font-display`, `--font-body`
- [x] `--max-width`, `--space-section`
- [x] `--reveal-duration`, `--reveal-ease`
- [x] Alias de compatibilidad admin: `--color-accent-soft`, `--font-heading`, `--color-border`

Añadidos en Fase 1 (foundation, ver `global.css`):

- [x] Roles semánticos: `--bg-primary`, `--bg-secondary`, `--surface`,
      `--text-primary`, `--text-secondary`, `--accent`, `--accent-subtle`,
      `--border`, `--inverse-surface`, `--inverse-text`, `--decorative`
- [x] `--color-success`, `--color-error`
- [x] Escala de espaciado `--space-3xs` … `--space-4xl`
- [x] Focus states globales (`:focus-visible`)
- [x] `--reveal-duration` ajustado a `600ms`

Pendientes (quedan para fases que sí toquen componentes):

- [ ] Migrar componentes existentes a consumir los roles semánticos nuevos
      en vez de los nombres heredados (Fase 2+, gradual, sin big-bang)
- [ ] Fotografía real (bloqueante de negocio, no de código)
- [ ] Filtrado funcional de categoría (Fase 4)
- [ ] `border-radius` como token explícito (aunque su valor sea `0`)

## 12. Diferencias concretas: Quiet Luxury (Fase 0/C) → Quiet Colombian Craft (Fase 1)

| Aspecto | Quiet Luxury (antes) | Quiet Colombian Craft (ahora) |
|---|---|---|
| Roles de color | Nombres heredados sin capa semántica (`--color-accent-soft` etc.) | Capa semántica añadida (`--accent`, `--text-secondary`, etc.) sin cambiar valores — mismo look, vocabulario claro para escalar |
| Acento | Un acento (camel), sin variante "subtle" | Acento + `--accent-subtle` distinguido explícitamente como decorativo-only |
| Spacing | `clamp()` ad-hoc por componente, sin escala nombrada | Escala formal `--space-3xs`…`--space-4xl`, con `--space-section` como alias |
| Tipografía | H1/H2/H3 con reglas base, sin escala de roles completa | Escala de 10 roles nombrados (display, h1-h3, body, small, label, nav, price ×2, quote) |
| Motion | Revelado a 700ms (fuera del rango 200–600ms objetivo) | Ajustado a 600ms |
| Focus | No verificado/formalizado globalmente | `:focus-visible` global explícito en todo elemento interactivo |
| Fotografía | Sin estándar documentado, un solo tipo de placeholder | 4 familias definidas (Clean Product, Editorial, Lifestyle, Craft) con regla de balance obligatoria |
| Wordmark | Correcto mas sin reglas escritas | Reglas de uso cerradas y prohibiciones explícitas (`BRAND_SYSTEM.md` § 7) |
| Identidad | "Quiet luxury" genérico (podría ser cualquier boutique de moda silenciosa) | Seis pilares que exigen colombianidad real + las 4 familias de fotografía — ancla la identidad a Maygel específicamente, no a la categoría "quiet luxury fashion" en general |

**Conclusión de la auditoría:** el sistema anterior no estaba equivocado en
sus decisiones técnicas (paleta AA, sin sombras, botones de texto, tipografía
editorial+interfaz) — estaba **incompleto** en identidad propia (sin
fotografía definida, sin pilares de marca explícitos, sin regla anti-cliché
tropical) y **desestructurado** en foundation (sin escala de spacing/tipografía
nombrada, sin focus states). Fase 1 cierra ambos huecos sin descartar lo que
ya funcionaba.
