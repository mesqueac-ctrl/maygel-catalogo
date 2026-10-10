# Maygel

## Purpose

Sitio público de un taller familiar en Soledad (Atlántico, Colombia) que fabrica sandalias artesanales a mano, bajo pedido. La venta se cierra por WhatsApp; no hay checkout.

## Users

Clientas en Colombia (sobre todo Soledad y Barranquilla) que eligen modelo y color en el celular y encargan por WhatsApp. También mayoristas que consultan por el mismo canal. El panel `/admin` lo usa una persona no técnica (fuera del rediseño visual de esta tienda).

## Mechanism

Catálogo real desde Astro DB + fotos en Blob. Cada par se fabrica después del pedido. Precio, colores, envíos y cambios solo afirman lo confirmado en `docs/COMMERCIAL_TRUST_MATRIX.md`.

## Platform

web (Astro SSR en Vercel).

## Constraints

No inventar precios, materiales, testimonios ni tiempos en días. No tocar admin, base de datos, APIs, `.env` ni mensajes prellenados de WhatsApp. Accesibilidad AA, 44px táctil, un h1 por página. Sin dependencias nuevas.

## Voice

Cálida, pausada, en “tú”. Titular de marca: “Hecho despacio.”
