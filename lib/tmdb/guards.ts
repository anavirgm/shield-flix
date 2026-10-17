import { z, type ZodError, type ZodType } from "zod";

import { TmdbError } from "./errors";

/**
 * Guardas estructurales de las respuestas de TMDB.
 *
 * **Decisión de diseño.** `types/tmdb.ts` ya describe el contrato completo de la
 * API (más de 370 líneas). Repetirlo aquí en Zod significaría mantener dos
 * verdades que se separan con el tiempo: cada campo nuevo de TMDB habría que
 * añadirlo dos veces, y una discrepancia no avisaría de nada.
 *
 * Lo que se valida, entonces, es lo que **rompe la interfaz si falta**: la
 * envoltura paginada (sin `results` no hay lista), la identidad de un título
 * (sin `id` no hay enlace ni detalle) y las claves que se usan como índice. Un
 * cambio inesperado de TMDB se convierte en un `TmdbError` con el campo exacto,
 * en lugar de un `undefined` silencioso a mitad de un render.
 *
 * Los esquemas son `loose`: TMDB añade campos con frecuencia y su presencia no
 * debe ser un error.
 */

/** Envoltorio común de todo endpoint paginado: listas, tendencias, descubrir, buscar. */
export const pagedEnvelopeSchema = z.looseObject({
  page: z.number(),
  results: z.array(z.unknown()),
  total_pages: z.number(),
  total_results: z.number(),
});

/** Identidad mínima de una película (`/movie/{id}`). */
export const movieIdentitySchema = z.looseObject({
  id: z.number(),
  title: z.string(),
});

/** `/genre/movie/list`: cada género necesita `id` (filtra) y `name` (se pinta). */
export const movieGenresSchema = z.looseObject({
  genres: z.array(z.looseObject({ id: z.number(), name: z.string() })),
});

/** `/movie/{id}/videos`: `key` y `site` son imprescindibles para poder embeber. */
export const movieVideosSchema = z.looseObject({
  results: z.array(z.looseObject({ id: z.string(), key: z.string(), site: z.string() })),
});

/** Resume los primeros fallos de Zod en una línea, para el `detail` del error. */
function formatIssues(error: ZodError): string {
  const MAX_ISSUES = 3;

  const issues = error.issues
    .slice(0, MAX_ISSUES)
    .map((issue) => `${issue.path.map(String).join(".") || "(raíz)"}: ${issue.message}`);

  const rest = error.issues.length - issues.length;
  const suffix = rest > 0 ? ` (+${rest} más)` : "";

  return `${issues.join("; ")}${suffix}`;
}

/**
 * Comprueba el payload con la guarda de su endpoint.
 *
 * Devuelve `unknown` a propósito: quien llama conoce el tipo de destino
 * (`tmdbFetch<T>`) y es ahí, en una única línea documentada, donde el contrato
 * de `types/tmdb.ts` se asume.
 */
export function parseTmdbPayload(
  payload: unknown,
  guard: ZodType | undefined,
  path: string,
): unknown {
  if (!guard) return payload;

  const result = guard.safeParse(payload);

  if (!result.success) {
    throw new TmdbError({
      code: "invalid_response",
      path,
      detail: formatIssues(result.error),
    });
  }

  return result.data;
}
