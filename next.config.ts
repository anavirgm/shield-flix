import type { NextConfig } from "next";

/**
 * Configuración de Next.js 16 (Turbopack por defecto).
 *
 * - `cacheComponents`: habilita el modelo de caché explícito de Next 16
 *   (las rutas son dinámicas salvo que usen `"use cache"`).
 * - `partialPrefetching`: precarga parcial de rutas para navegación instantánea.
 * - `turbopack.rules`: Tailwind CSS v4 se procesa mediante su loader nativo.
 */
const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
