export const WHATSAPP_NUMBER = "573243513189";
export const INSTAGRAM_HANDLE = "maygelcr";
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

// Mensajes de contacto general, usados desde varios puntos del sitio
// (Header, Hero, Footer, 404). Centralizados aquí para que todos digan
// exactamente lo mismo sin copiar el texto en cada componente.
export const MENSAJE_CONTACTO_GENERAL = "Hola, quisiera más información sobre las sandalias Maygel";
export const MENSAJE_DUDA_COMPRA = "Hola, tengo una duda sobre las sandalias Maygel";

// Ayuda visible (Fase 8.3): mensaje propio y distinto del de "duda de
// compra" — permite identificar que la persona llegó desde el bloque de
// ayuda (homepage/PDP/footer/página /ayuda), no desde un CTA de producto.
export const MENSAJE_AYUDA = "Hola Maygel, necesito ayuda para elegir o pedir una sandalia.";

// Mensaje mayorista: abre con la intención real (Fase 8.2, confirmado por el
// negocio: los interesados en mayoreo deben escribir por WhatsApp) y queda
// con campos para completar (nombre, ciudad, etc.) porque eso ayuda a Maygel
// a responder con la información justa, sin obligar a la interesada a
// llenar un formulario web antes de escribir.
export const MENSAJE_MAYORISTA =
	"Hola Maygel, estoy interesada/o en comprar sandalias al por mayor. Quisiera conocer modelos disponibles, cantidades y precios.\n" +
	"Nombre:\n" +
	"Ciudad:\n" +
	"Negocio (si tiene):\n" +
	"Cantidad aproximada de interés:\n" +
	"Productos que le interesan:";

// Mensaje para consultar un modelo/referencia propia: deja claro que es una
// consulta, no un pedido confirmado, para no prometer fabricación de algo
// que todavía no se ha revisado.
export const MENSAJE_MODELO_PERSONALIZADO =
	"Hola, tengo un modelo/referencia en mente y quisiera saber si lo pueden fabricar. Les comparto una foto o imagen de referencia.";

export function buildWhatsappLink(mensaje: string): string {
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}
