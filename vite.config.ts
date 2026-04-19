import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("/node_modules/three/")) {
            return "three-vendor";
          }

          return undefined;
        },
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
