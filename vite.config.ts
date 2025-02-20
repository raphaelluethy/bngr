import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
    }),
  ],
  assetsInclude: ["**/src/*.html"],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        manageBangs: "manage-bangs.html",
      },
    },
    outDir: "dist",
    target: "es2015",
    sourcemap: false,
  },
});
