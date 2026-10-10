// Sin dependencias de astro:db a propósito: este archivo lo usan tanto
// componentes de servidor como el <script> de ProductCard, que corre en el
// navegador y no puede importar módulos server-only.
export { WHATSAPP_NUMBER, buildWhatsappLink } from "../consts";
import { buildWhatsappLink } from "../consts";

/**
 * Mensaje para encargar un producto por WhatsApp. `color` y `talla` son
 * `null` cuando el producto no tiene esa variante, o cuando tiene varias y
 * ninguna fue elegida todavía — en ese caso simplemente no se mencionan
 * (nunca se envía un valor no seleccionado como si estuviera confirmado).
 * `precioFormateado` es opcional (algunos llamantes todavía no lo tienen a
 * mano) pero siempre debe venir de `formatearPrecio(precioEfectivo(producto))`
 * (Fase 8.2 — el precio efectivo, con descuento aplicado si existe), nunca de
 * `producto.precio` directo ni de un valor escrito a mano — así Maygel
 * confirma el precio exacto que la clienta vio y va a pagar, no uno
 * distinto. Si se pasa `urlProducto`, se añade como referencia en una línea
 * aparte para identificar exactamente qué sandalia vio la clienta.
 */
export function mensajeProducto(
	nombre: string,
	color: string | null,
	urlProducto?: string,
	talla?: string | null,
	precioFormateado?: string | null,
): string {
	let base = `Hola, quiero encargar la sandalia ${nombre}`;
	if (color) base += ` en color ${color}`;
	if (talla) base += `, talla ${talla}`;
	if (precioFormateado) base += ` (${precioFormateado})`;
	base += ". Entiendo que es un producto fabricado bajo pedido.";

	return urlProducto ? `${base}\nProducto: ${urlProducto}` : base;
}

/** Enlace `wa.me` listo para usar, para encargar un producto.
 *  También lo usa el botón «Pedir» del catálogo: si hay un solo color se
 *  incluye; si hay varios, `color` va `null` y se completa en la ficha. */
export function enlaceProducto(
	nombre: string,
	color: string | null,
	urlProducto?: string,
	talla?: string | null,
	precioFormateado?: string | null,
): string {
	return buildWhatsappLink(mensajeProducto(nombre, color, urlProducto, talla, precioFormateado));
}
