import "server-only";

import { z } from "zod";

import { requiredString, requiredUrl } from "./fields";
import { formatEnvError } from "./format";

/**
 * Variables de entorno **exclusivas del servidor**.
 *
 * `import "server-only"` garantiza un error en tiempo de compilación si algún
 * componente de cliente intenta importar este módulo: los secretos nunca
 * pueden acabar en el bundle del navegador.
 *
 * La validación es perezosa (se ejecuta en el primer uso) en lugar de en el
 * momento del import, para que `next build` no falle cuando los secretos se
 * inyectan en runtime (Vercel, Docker, CI). El primer acceso real sí falla
 * inmediatamente con un mensaje explícito si falta algo.
 */

const serverEnvSchema = z.object({
  /** Clave privada de Supabase: omite RLS por completo. Solo servidor. */
  SUPABASE_SERVICE_ROLE_KEY: requiredString("SUPABASE_SERVICE_ROLE_KEY"),

  /** Clave privada de TMDB: se consume únicamente desde el servidor. */
  TMDB_API_KEY: requiredString("TMDB_API_KEY"),

  TMDB_BASE_URL: requiredUrl("TMDB_BASE_URL").default("https://api.themoviedb.org/3"),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cached: ServerEnv | null = null;

/**
 * Devuelve las variables de servidor validadas (cachea el resultado).
 *
 * @throws Error con el detalle de las variables ausentes o inválidas.
 */
export function getServerEnv(): ServerEnv {
  if (cached) {
    return cached;
  }

  const parsed = serverEnvSchema.safeParse({
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    TMDB_BASE_URL: process.env.TMDB_BASE_URL,
  });

  if (!parsed.success) {
    throw new Error(formatEnvError("servidor", parsed.error));
  }

  cached = parsed.data;
  return cached;
}
