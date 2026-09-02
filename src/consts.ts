export const WHATSAPP_NUMBER = "573243513189";
export const INSTAGRAM_HANDLE = "maygelcr";
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

export function buildWhatsappLink(mensaje: string): string {
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}
