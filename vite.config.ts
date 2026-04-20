import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "three-vendor",
              priority: 40,
              test: /node_modules[\\/]three[\\/]/,
            },
            {
              name: "r3f-scheduler",
              priority: 35,
              test: /node_modules[\\/]scheduler[\\/]/,
            },
            {
              name: "r3f-support",
              priority: 30,
              test: /node_modules[\\/](react-use-measure|suspend-react|use-sync-external-store|its-fine|zustand|base64-js|buffer)[\\/]/,
            },
            {
              name: "r3f-core",
              priority: 22,
              test: /node_modules[\\/](react-reconciler|@react-three[\\/]fiber)[\\/]/,
            },
          ],
        },
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
