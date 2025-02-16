import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [tailwindcss()],
	assetsInclude: ["**/template.html"],
	build: {
		rollupOptions: {
			input: "index.html",
		},
		assetsDir: "assets",
	},
});
