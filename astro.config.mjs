// @ts-check
import { defineConfig } from "astro/config";

import db from "@astrojs/db";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
	site: "https://www.maygel.co",
	output: "server",
	integrations: [db()],
	adapter: vercel(),
	image: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.public.blob.vercel-storage.com",
			},
		],
	},
});
