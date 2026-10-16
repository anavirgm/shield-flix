import { z } from "zod";

import { requiredString, requiredUrl } from "./fields";
import { formatEnvError } from "./format";

/**
 * Variables de entorno del cliente (`NEXT_PUBLIC_*`).
 *
 * Estas variables se incrustan en el bundle del navegador en tiempo de build,
 * por lo que **no deben contener secretos** y deben existir durante el build.
 *
 * IMPORTANTE: las referencias a `process.env.NEXT_PUBLIC_*` deben ser literales.
 * Next.js no puede sustituir accesos dinámicos (`process.env[name]`), y la
 * variable quedaría `undefined` en el navegador.
 */

const clientEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: requiredUrl("NEXT_PUBLIC_SUPABASE_URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: requiredString("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  NEXT_PUBLIC_VIDSRC_BASE_URL: requiredUrl("NEXT_PUBLIC_VIDSRC_BASE_URL").default(
    "https://vidsrc.to/embed/movie",
  ),
});

const parsed = clientEnvSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_VIDSRC_BASE_URL: process.env.NEXT_PUBLIC_VIDSRC_BASE_URL,
});

if (!parsed.success) {
  throw new Error(formatEnvError("cliente", parsed.error));
}

/** Variables de entorno públicas, ya validadas y con tipos. */
export const clientEnv = parsed.data;

export type ClientEnv = typeof clientEnv;
