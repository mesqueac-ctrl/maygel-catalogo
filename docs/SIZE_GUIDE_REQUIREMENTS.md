# Maygel — Requisitos para una guía de tallas real

> La PDP hoy dice explícitamente que no existe guía de tallas todavía, y
> ofrece WhatsApp como salida honesta (`[slug].astro`, ver
> `COMMERCIAL_TRUST_MATRIX.md`). Este documento no inventa la guía — lista
> exactamente qué necesita responder el negocio para construir una real. No
> se implementa nada hasta tener estos datos.

## Qué información hace falta

1. **Tallas que se fabrican realmente**, como rango completo (ej. "del 34 al
   41") — hoy cada producto tiene su propia lista libre en la base de datos
   (`producto.tallas`), pero no existe un rango oficial de marca documentado
   en ningún lado.
2. **Correspondencia talla → medida real del pie o de la plantilla**, por
   ejemplo:
   - Talla 36 → largo de plantilla ___ cm
   - Talla 37 → largo de plantilla ___ cm
   - (una fila por cada talla que fabriquen)
3. **Cómo debe medir la clienta su propio pie** — el método exacto que Maygel
   recomienda (ej. "pon el pie sobre una hoja, marca la punta y el talón,
   mide esa distancia en cm").
4. **Si la horma corre normal, pequeña o grande** respecto a una talla
   colombiana estándar — esta es la pregunta que más resuelve dudas reales de
   compra ("¿pido mi talla normal o una más?").
5. **Si la equivalencia de talla es la misma para todos los modelos**, o si
   varía por modelo (ej. una sandalia con tira ajustable puede sentirse
   distinta a una cerrada) — si varía, la guía necesita ser por modelo, no
   una tabla única de marca.
6. **Unidad de medida que prefiere comunicar el negocio** — cm, talla
   colombiana/US/EU, o varias en paralelo.

## Qué se hace con esta información una vez exista

- Una tabla simple accesible desde la ficha sin salir de la página (ya es la
  regla de `UX_RULES.md` § 7) — reemplaza el texto actual "Todavía no
  tenemos una guía de tallas publicada" dentro del mismo `<details>` que ya
  existe en `[slug].astro`, sin rediseñar el resto de la PDP.
- Si la equivalencia varía por modelo, el dato viviría en el modelo de datos
  del producto (columna o campo estructurado nuevo en `Producto`), no
  hardcodeado en el componente — evaluar esa arquitectura solo cuando el
  negocio confirme que efectivamente varía por modelo.

## Regla dura

**No se inventa ninguna medida, ninguna equivalencia, ningún consejo de
horma** para rellenar esto antes de tiempo — la PDP se queda con su mensaje
honesto actual (invitación a preguntar por WhatsApp) hasta que el negocio
responda lo de arriba.
