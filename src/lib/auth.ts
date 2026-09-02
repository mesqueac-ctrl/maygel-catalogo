import type { AstroCookies } from "astro";
import crypto from "node:crypto";

export const COOKIE_NAME = "maygel_sesion";
const DURACION_SESION_MS = 1000 * 60 * 60 * 24 * 7; // 7 días

function getSecret(): string {
	const secret = import.meta.env.SESSION_SECRET;
	if (!secret) {
		throw new Error("Falta la variable de entorno SESSION_SECRET");
	}
	return secret;
}

function firmar(valor: string): string {
	return crypto.createHmac("sha256", getSecret()).update(valor).digest("hex");
}

/** Compara dos cadenas sin filtrar información por el tiempo que tarda. */
function comparaSegura(a: string, b: string): boolean {
	const bufferA = Buffer.from(a);
	const bufferB = Buffer.from(b);
	if (bufferA.length !== bufferB.length) return false;
	return crypto.timingSafeEqual(bufferA, bufferB);
}

/** Comprueba usuario y contraseña contra las variables de entorno. */
export function credencialesValidas(usuario: string, contrasena: string): boolean {
	const usuarioEsperado = import.meta.env.ADMIN_USER;
	const contrasenaEsperada = import.meta.env.ADMIN_PASSWORD;

	if (!usuarioEsperado || !contrasenaEsperada) {
		throw new Error("Faltan las variables de entorno ADMIN_USER y/o ADMIN_PASSWORD");
	}

	return (
		comparaSegura(usuario, usuarioEsperado) && comparaSegura(contrasena, contrasenaEsperada)
	);
}

export function crearSesion(cookies: AstroCookies): void {
	const expira = Date.now() + DURACION_SESION_MS;
	const payload = `${import.meta.env.ADMIN_USER}.${expira}`;
	const valor = `${payload}.${firmar(payload)}`;

	cookies.set(COOKIE_NAME, valor, {
		httpOnly: true,
		secure: import.meta.env.PROD,
		sameSite: "lax",
		path: "/",
		maxAge: DURACION_SESION_MS / 1000,
	});
}

export function cerrarSesion(cookies: AstroCookies): void {
	cookies.delete(COOKIE_NAME, { path: "/" });
}

export function sesionValida(cookies: AstroCookies): boolean {
	const cookie = cookies.get(COOKIE_NAME)?.value;
	if (!cookie) return false;

	const partes = cookie.split(".");
	if (partes.length !== 3) return false;

	const [usuario, expira, firma] = partes;
	const payload = `${usuario}.${expira}`;

	if (!comparaSegura(firma, firmar(payload))) return false;
	if (Number(expira) < Date.now()) return false;

	return true;
}
