import { db, Producto } from "astro:db";

export default async function seed() {
	await db.insert(Producto).values([
		{
			id: 1,
			nombre: "Sandalia Trenzada Terracota",
			precio: 89000,
			tallas: "35, 36, 37, 38, 39, 40",
			colores: "Miel, Negro, Beige",
			imagen: "/productos/producto-1.svg",
			descripcion:
				"Sandalia plana trenzada a mano en cuero natural, suela de caucho antideslizante.",
			disponible: true,
			orden: 1,
		},
		{
			id: 2,
			nombre: "Sandalia Clásica de Cuero",
			precio: 95000,
			tallas: "36, 37, 38, 39, 40, 41",
			colores: "Negro, Blanco, Miel",
			imagen: "/productos/producto-2.svg",
			descripcion:
				"Diseño clásico de dos correas, cuero curtido al tanino, ideal para el día a día.",
			disponible: true,
			orden: 2,
		},
		{
			id: 3,
			nombre: "Sandalia Doble Correa Ocre",
			precio: 102000,
			tallas: "34, 35, 36, 37, 38",
			colores: "Miel, Beige",
			imagen: "/productos/producto-3.svg",
			descripcion:
				"Doble correa ajustable con hebilla artesanal, hecha a mano en nuestro taller familiar.",
			disponible: true,
			orden: 3,
		},
	]);
}
