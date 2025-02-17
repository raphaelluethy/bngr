import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    tailwindcss(),
    VitePWA({
      injectRegister: "auto",
    }),
  ],
  assetsInclude: ["**/src/*.html"],
  build: {
    rollupOptions: {
      input: "index.html",
    },
    assetsDir: "assets",
  },
});
