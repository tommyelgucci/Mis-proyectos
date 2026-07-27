/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:7860",
    },
  },
  test: {
    // Zona horaria fija: varios tests de racha dependen del cambio de hora y
    // en UTC (que no tiene) pasarían sin comprobar nada.
    env: { TZ: "Europe/Madrid" },
  },
});
