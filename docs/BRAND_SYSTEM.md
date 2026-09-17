# Maygel — Sistema de marca

> Especificación cerrada de identidad — Fase 1 (Quiet Colombian Craft).
> Sustituye la versión descriptiva de Fase 0. Donde este documento define una
> regla, es la fuente de verdad; `DESIGN_SYSTEM.md` traduce cada regla a
> tokens e implementación concreta.

## 0. Objetivo de percepción

Cuando alguien entra a Maygel no debe pensar *"qué bonito emprendimiento"*.
Debe pensar: **esta es una marca seria, cuidada y profesional** — una marca de
moda artesanal consolidada, aunque siga siendo, en la realidad del negocio, un
taller familiar pequeño. La percepción de marca no depende del tamaño del
negocio; depende de la precisión de cada decisión visual y de contenido.

**Prueba de identidad propia:** si el wordmark "Maygel" pudiera reemplazarse
por el de cualquier otra marca de moda y el sitio siguiera funcionando igual
de bien, la identidad ha fallado. Cada regla de este documento existe para
que eso no sea posible — ver especialmente § 5 (fotografía) y § 4 (voz), que
son las dos superficies donde una identidad "quiet" corre más riesgo de
volverse genérica.

## 1. Propósito de Maygel

Maygel fabrica sandalias artesanales hechas a mano, bajo pedido, en un taller
familiar colombiano. No vende inventario en masa: cada par se confecciona
específicamente para quien lo pide. El propósito del sitio es transmitir esa
realidad con la elegancia y claridad suficientes para que una clienta confíe
en encargar un producto que todavía no existe físicamente cuando lo pide.

## 2. Posicionamiento

Marca de **moda artesanal colombiana**, no tienda online genérica ni
dropshipping. Compite por percepción de calidad, confianza y punto de vista
— no por precio ni por volumen.

## 3. Los seis pilares (deben convivir, no alternarse)

Ninguna decisión visual o de contenido puede reforzar un pilar a costa de
otro. Los seis conviven en cada superficie:

1. **Artesanía** — humana, real, hecha con intención. Se demuestra con
   fotografía de proceso y materiales (familia CRAFT, § 5), nunca solo con la
   palabra "artesanal" repetida en el texto.
2. **Elegancia** — sofisticada pero nunca pretenciosa. Un titular corto y bien
   compuesto es elegante; un titular con adjetivos superlativos es
   pretencioso.
3. **Calma** — sin ruido visual ni presión comercial. El espacio es una
   herramienta de calma, no una ausencia de decisión.
4. **Confianza** — una marca estable y profesional, segura para comprar un
   producto que se fabrica después del pedido. Se construye con claridad de
   proceso (`UX_RULES.md` § 5-6), no con sellos de garantía genéricos.
5. **Feminidad contemporánea** — sin clichés rosas, sin recursos
   excesivamente delicados (lazos, cursiva decorativa, ilustraciones
   florales). La feminidad aquí es de composición y tono, no de paleta rosa
   ni de ornamento.
6. **Origen colombiano** — comunicado mediante historia real, materiales y
   humanidad (el taller, la familia, el proceso). **Nunca** mediante clichés
   tropicales (palmeras, colores bandera, patrones "étnicos" genéricos,
   tipografía "artesanal" con textura de madera).

## 4. Personalidad

**Maygel es:**
serena · artesanal · femenina · contemporánea · precisa · cálida · confiable

**Maygel NO es:**
rústica · boho genérica · tropical cliché · ostentosa · infantil ·
corporativa · tecnológica · dropshipping · fast fashion

| Eje | Maygel se posiciona en... | No en... |
|---|---|---|
| Rústico ↔ Refinado | Refinado con calidez (madera clara, cuero curtido, no plástico) | Rústico sin cuidado (astillado, improvisado) ni refinado frío (mármol, acero) |
| Genérico ↔ Con voz propia | Con voz propia: precisa, cálida, sin urgencia | Genérico de plantilla de ecommerce |
| Corporativo ↔ Cercano | Cercano pero profesional | Corporativo distante, ni informal excesivo |
| Local folklórico ↔ Internacional anónimo | Colombiano contado con humanidad | Ni folklore de postal ni "cualquier marca podría ser de cualquier país" |

## 5. Fotografía — el pilar más importante de la identidad final

**Estado actual: no existe fotografía real.** Todo el espacio reservado hoy
(hero, about, modelo personalizado) usa un bloque de textura/color como
marcador de posición deliberado — nunca un icono, nunca un mockup de stock.
Esto seguirá siendo así hasta que exista fotografía real; lo que este
apartado define es el estándar que esa fotografía deberá cumplir, para que
cuando llegue, refuerce la identidad en vez de diluirla en "boutique
genérica".

### Las cuatro familias

| Familia | Qué muestra | Rol en el sitio |
|---|---|---|
| **A. Clean Product** | El producto solo, foco absoluto, fondo neutro/de contexto real (nunca ciclorama de estudio genérico blanco puro) | Catálogo, ficha de producto — la tarjeta compacta vive de esta familia |
| **B. Editorial** | El producto dentro de una composición de moda (luz, sombra, prop mínimo relacionado al taller — cuero, hilo, madera) | Hero, momentos de declaración de marca |
| **C. Lifestyle** | Sandalias puestas, en uso real, sin pose de catálogo de stock | Bloques de "artesanía / editorial break", futuras campañas |
| **D. Craft** | Manos, materiales, herramientas, el taller — el proceso mismo | Sección de historia/about, manifiesto de marca — es la familia que hace la diferencia entre "boutique bonita" y "Maygel" |

**Regla de balance:** ninguna sección del sitio se sostiene solo con la
familia A (Clean Product). Un sitio que solo muestra producto aislado es
indistinguible de cualquier ecommerce — las familias B, C y D son las que
construyen "marca consolidada" en vez de "catálogo".

### Estándar técnico (aplicable cuando exista fotografía real)

- Formato de producto consistente: vertical o cuadrado según la sección (ver
  `aspect-ratio` por componente en `DESIGN_SYSTEM.md` § 8), nunca decidido
  foto a foto.
- Luz natural o cálida — nunca luz de estudio fría ni flash directo.
- Fondo neutro o de contexto real del taller — nunca un fondo de stock
  genérico ni un color plano saturado.
- Composición con aire alrededor del sujeto — nunca el producto "flotando"
  centrado sin ningún contexto en todas las fotos por igual.
- Sin filtros artificiales, sin viñetas, sin efectos de "vintage" — la
  calidez viene de la luz y el material real, no de un filtro aplicado en
  post.
- Ninguna foto se recorta o deforma para encajar el contenedor: el
  `aspect-ratio` del diseño se elige para la foto real, nunca al revés.

## 6. Sistema tipográfico (principio — valores exactos en `DESIGN_SYSTEM.md`)

- **Editorial (serif):** para frases de marca, titulares, momentos de
  declaración y citas editoriales. Aporta sofisticación y humanidad — nunca
  se usa para interfaz.
- **Interfaz (sans):** para navegación, cuerpo, botones, precios,
  formularios. Aporta claridad — nunca se usa para un titular de marca.
- Auditoría de la combinación actual (Cormorant Garamond + Manrope): **se
  mantiene** — cumple el rol editorial/interfaz pedido y ya está calibrada
  para rendimiento (3 pesos por familia). El riesgo real no era la elección
  de fuente sino la falta de una escala formal y de reglas de uso — resuelto
  en `DESIGN_SYSTEM.md` § 3.
- Máximo 3 pesos cargados por familia, sin excepción.

## 7. Wordmark — reglas de uso (sin isotipo nuevo)

- El wordmark es únicamente tipográfico: **"Maygel"**, familia editorial,
  peso 600, sin cursiva, sin sombra, sin contorno, sin gradiente.
- **Prohibido:** icono de sandalia, hoja, flor, corazón, corona, o cualquier
  símbolo genérico de "artesanía"/"naturaleza" acompañando el wordmark.
- El wordmark nunca compite en tamaño con el titular principal de una vista —
  su protagonismo es de identidad recurrente (aparece igual en cada página),
  no decorativo.
- **Futuro, no implementado ahora:** un monograma "M" y/o una firma
  secundaria podrían existir como variantes del mismo sistema tipográfico
  (nunca como símbolo figurativo) — evaluar solo cuando el wordmark principal
  esté ya consolidado en uso real.

## 8. Composición y espacio

- El espacio comunica calidad: nunca se llena "por miedo a que se vea vacío".
- Composiciones asimétricas son la norma esperada (no la excepción) en
  momentos editoriales (hero, destacados) — ver reglas exactas de grid en
  `DESIGN_SYSTEM.md` § 4.
- Ritmo alternado de fondos (claro → superficie → oscuro editorial) en vez de
  una sola superficie continua — ya implementado, se mantiene.

## 9. Iconografía

- Uso mínimo. Preferir tipografía y espacio sobre iconos.
- Si se necesita un icono, un único grosor de trazo consistente con el resto
  del sistema — nunca mezclar estilos (outline + filled + emoji).
- Emoji no se usan como iconografía de interfaz en ningún punto del sitio
  público.

## 10. Tono emocional y voz

Cercano pero no informal; seguro pero no corporativo; orgulloso del oficio
sin sonar autopromocional. La voz de Maygel nunca usa lenguaje de urgencia,
superlativos no verificables, ni clichés tropicales para comunicar origen
colombiano (ver `CONTENT_GUIDE.md` para ejemplos concretos de lenguaje).

## 11. Lo que Maygel nunca debe parecer

- Una plantilla de ecommerce genérica.
- Un negocio de dropshipping o reventa.
- Un emprendimiento genérico de Instagram (badges, colores saturados,
  urgencia artificial).
- Una interfaz SaaS (botones-caja, sombras, cards idénticas icono+título+texto).
- Un prototipo o mockup sin terminar.
- Una postal turística de Colombia (palmeras, colores de bandera, patrones
  "étnicos" de stock).

## 12. Ejemplos de decisiones correctas / incorrectas

| Situación | Correcto | Incorrecto |
|---|---|---|
| Encabezar una sección | El titular solo, con peso tipográfico | Una etiqueta pequeña en mayúsculas ("eyebrow") sobre el titular |
| Mostrar producto en catálogo | Foto grande + nombre + precio, nada más | Tarjeta con sombra, borde, badge, botón grande de color |
| Comunicar origen colombiano | Historia real del taller, materiales reales | Bandera, palmera, patrón "étnico" genérico |
| Comunicar confianza | Frase concreta y verificable | "Calidad premium garantizada 100%" sin respaldo |
| Botón de acción | Texto + flecha, subrayado sutil | Botón rectangular sólido con sombra |
| Sección vacía de contenido | Ocultar la sección por completo | Estado vacío genérico tipo "No hay productos 😢" |
| Urgencia comercial | Ausente, o basada en un hecho real | Countdown, "solo quedan 2" |
| Fotografía de producto | Las 4 familias (§ 5) combinadas | Solo fotos de catálogo aisladas, sin proceso ni contexto |
