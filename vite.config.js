import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // three.js lives in the lazily loaded Scene chunk, so it never blocks first paint.
  build: { chunkSizeWarningLimit: 1100 },
});
