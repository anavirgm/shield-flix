import type { TmdbImageSize } from "@/types/tmdb";

/** Base pública del CDN de imágenes de TMDB (no requiere clave). */
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

/**
 * Construye la URL de una imagen de TMDB.
 *
 * TMDB devuelve `null` en `poster_path`/`backdrop_path` cuando el título no
 * tiene arte, así que el helper devuelve `null` en ese caso: quien lo consume
 * decide el respaldo en lugar de pintar una URL rota.
 */
export function tmdbImageUrl(path: string | null, size: TmdbImageSize = "w780"): string | null {
  if (!path) return null;

  return `${TMDB_IMAGE_BASE_URL}/${size}${path.startsWith("/") ? path : `/${path}`}`;
}
