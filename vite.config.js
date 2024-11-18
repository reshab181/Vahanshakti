import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import removeConsole from "vite-plugin-remove-console";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    removeConsole({
      external: ["info", "warn", "error"], // Specify if you want to keep specific console methods
    }),
  ],
  build: {
    chunkSizeWarningLimit: 3000,
  },
  rollupOptions: {
    output: {
      manualChunks: {
        "service-worker": ["service-worker.js"],
      },
    },
  },
});
