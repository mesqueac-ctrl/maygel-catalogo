// Sin dependencias de astro:db a propósito: este archivo lo usan tanto
// componentes de servidor como el <script> de ProductCard, que corre en el
// navegador y no puede importar módulos server-only.
export { WHATSAPP_NUMBER, buildWhatsappLink } from "../consts";
import { buildWhatsappLink } from "../consts";

/**
 * Mensaje para encargar un producto por WhatsApp. Si `color` es null (el
 * producto no tiene colores, o tiene varios y ninguno fue elegido todavía),
 * el mensaje simplemente no lo menciona. Si se pasa `urlProducto`, se añade
 * como referencia en una segunda línea para que Maygel identifique exactamente
 * qué sandalia vio la clienta.
 */
export function mensajeProducto(nombre: string, color: string | null, urlProducto?: string): string {
	const base = color
		? `Hola, quiero encargar la sandalia ${nombre} en color ${color}. Entiendo que es un producto fabricado bajo pedido.`
		: `Hola, quiero encargar la sandalia ${nombre}. Entiendo que es un producto fabricado bajo pedido.`;

	return urlProducto ? `${base}\nProducto: ${urlProducto}` : base;
}

/** Enlace `wa.me` listo para usar, para encargar un producto. */
export function enlaceProducto(nombre: string, color: string | null, urlProducto?: string): string {
	return buildWhatsappLink(mensajeProducto(nombre, color, urlProducto));
}
