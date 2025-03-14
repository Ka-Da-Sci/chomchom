import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import compression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    compression({
      algorithm: "brotliCompress", // Uses Brotli instead of gzip
      deleteOriginFile: false, // Keep original files for fallback
    }),
  ],
  build: {
    rollupOptions: {
      plugins: [visualizer({ open: true })], // This opens the report in a browser
    },
  },
});
