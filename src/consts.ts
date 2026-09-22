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

/**
 * Fase 13.1 — metadata de SEO por producto (meta description y alt text de
 * la foto principal), aprobada explícitamente por el negocio. Vive aparte de
 * `producto.descripcion` (la frase corta editorial que se ve en el PDP) a
 * propósito: cambiar esta metadata nunca debe alterar el texto visible de la
 * página. El alt text describe únicamente lo que la foto temporal de cada
 * producto muestra de verdad — no la identidad de diseño documentada cuando
 * ambas no coinciden (ver COLLECTION_01_VISUAL_DRAFT.md).
 */
export const SEO_PRODUCTO: Record<string, { metaDescription: string; alt: string }> = {
	luna: {
		metaDescription:
			"Sandalia plana de líneas delicadas, tiras finas y tobillera. Hecha a mano, bajo pedido. $45.000.",
		alt: "Sandalia Luna de Maygel: plana, tiras finas y tobillera",
	},
	deriva: {
		metaDescription:
			"Sandalia plana de diseño limpio y ligero, fácil de combinar. Hecha a mano, bajo pedido. $45.000.",
		alt: "Sandalia Deriva de Maygel: plana, tira fina diagonal",
	},
	onda: {
		metaDescription: "Sandalia plana de diseño fluido y relajado. Hecha a mano, bajo pedido. $45.000.",
		alt: "Sandalia Onda de Maygel: plana, tiras anchas onduladas",
	},
	bruma: {
		metaDescription: "Sandalia plana de silueta suave y cómoda a la vista. Hecha a mano, bajo pedido. $45.000.",
		// La foto temporal muestra tiras con aplicaciones brillantes y aros
		// dorados, no "acolchadas" — el alt describe la foto real, no la
		// identidad de diseño original del modelo.
		alt: "Sandalia Bruma de Maygel: plana, tiras con aplicaciones brillantes y detalle dorado",
	},
	nudo: {
		metaDescription: "Sandalia plana con detalle central tipo nudo. Hecha a mano, bajo pedido. $45.000.",
		alt: "Sandalia Nudo de Maygel: plana, con nudo decorativo",
	},
	estela: {
		metaDescription: "Sandalia plana de líneas simples con brillo discreto. Hecha a mano, bajo pedido. $45.000.",
		alt: "Sandalia Estela de Maygel: plana, tira ancha con brillo",
	},
	llana: {
		metaDescription:
			"Sandalia plana minimalista y versátil, modelo destacado de Maygel. Hecha a mano, bajo pedido. $45.000.",
		alt: "Sandalia Llana de Maygel: plana, tiras finas cruzadas y tobillera",
	},
	nacar: {
		metaDescription: "Sandalia plana elegante con brillo sutil. Hecha a mano, bajo pedido. $45.000.",
		alt: "Sandalia Nácar de Maygel: plana, tiras cruzadas con brillo",
	},
	trazo: {
		metaDescription: "Sandalia plana de líneas claras y estética distintiva. Hecha a mano, bajo pedido. $45.000.",
		alt: "Sandalia Trazo de Maygel: plana, tiras finas múltiples cruzadas",
	},
	cristal: {
		metaDescription: "Sandalia plana con detalle de cadena dorada. Hecha a mano, bajo pedido. $45.000.",
		// No se afirma "transparente" en el alt: no está confirmado que se
		// distinga con claridad en la foto temporal actual.
		alt: "Sandalia Cristal de Maygel: plana, tira ancha con cadena dorada",
	},
};
