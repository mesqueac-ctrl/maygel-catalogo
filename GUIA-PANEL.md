# Guía del panel de Maygel

Para cuidar el catálogo desde el celular o el computador, sin tocar código.

## Entrar

1. Abre **maygel.co/admin/login**.
2. Escribe tu usuario y tu contraseña.
3. Pulsa **Entrar**.

La sesión dura 7 días.

## Agregar una sandalia

1. Pulsa **Agregar sandalia**.
2. Llena lo importante:
   - **Nombre**
   - **Precio** (solo números, sin puntos: `45000`)
   - **Colores**: toca los círculos de los colores que sí fabricas
   - **Foto principal**: arrástrala, elígela o tómala con el celular. Se achica sola antes de subir.
3. Si quieres, escribe una descripción corta. Si la dejas vacía, la página usa un texto automático.
4. Pulsa **Guardar sandalia**.

Verás “Guardado ✓”. La sandalia ya está en la página.

## Foto por color (opcional)

Al marcar un color puedes subir una foto de la sandalia en ese color. Si no subes nada, se usa la foto principal.

En cada foto de color hay **Usar como foto principal** si quieres que esa pase al catálogo.

## Cambiar una sandalia

En la tarjeta pulsa **Editar**, cambia lo que necesites y **Guardar cambios**.

Si no eliges una foto nueva, se queda la que ya tenía. El enlace de la ficha **no cambia** aunque cambies el nombre.

## Ocultar (no está a la venta)

En la lista pulsa **Ocultar**. Nadie la ve en la página, pero sigue en el panel.

Durante 5 segundos aparece **Deshacer** si te equivocaste.

Para volver a mostrarla: **Mostrar**.

## Ordenar

En la lista **En el catálogo**, arrastra las tarjetas o usa las flechas ↑ ↓. El orden es el mismo de la página web. Se guarda solo.

## Archivar

**Archivar** la saca de la página y de la lista activa. Las fotos no se borran.

Durante 5 segundos puedes **Deshacer**.

En la pestaña **Archivadas**:

- **Restaurar**: vuelve al catálogo.
- **Eliminar definitivamente**: se borra para siempre, también las fotos. Pide confirmación. **No se puede deshacer.**

## Ver cómo quedó

Arriba: **Cómo se ve** (vista en el panel) o **Ver mi página** (el sitio de verdad).

## Salir

Pulsa **Salir**. Hazlo si el celular o el computador no es solo tuyo.

---

## Checklist al cargar una sandalia

```
[ ] Nombre
[ ] Precio
[ ] Colores reales (círculos)
[ ] Foto principal
[ ] Fotos por color (si las tienes)
[ ] Se ve en la página
[ ] Guardado sin error
```

## Después de guardar, revisa en el celular

- el nombre y el precio
- la foto (que no salga girada)
- los colores
- el botón de pedir por WhatsApp

---

## Para quien desarrolla

El panel se prueba con `npm run dev:fixtures` (SQLite local). `npm run dev`
usa la base remota: no crear/editar/archivar ahí. La columna `archivado` en
producción se aplica **antes** de desplegar, ver `MIGRACIONES-PRODUCCION.md`.
