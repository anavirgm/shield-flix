/**
 * Reparto de las imágenes de la portada.
 *
 * `landing-preview.ts` trae los 16 títulos reales de TMDB; aquí solo se decide
 * qué arte cumple cada papel. Se resuelve por id (no por posición) para que
 * reordenar la vista previa no cambie la composición de la portada.
 */
import { PREVIEW_TITLES, type PreviewTitle } from "@/features/catalog/data/landing-preview";

function pick(tmdbId: number): PreviewTitle {
  const title = PREVIEW_TITLES.find((item) => item.tmdbId === tmdbId);

  if (!title) {
    throw new Error(`landing-roles: el título ${tmdbId} no está en PREVIEW_TITLES`);
  }

  return title;
}

/** Póster en vertical que ocupa la columna izquierda del hero. */
export const LANDING_HERO = pick(969681);

/** Fotografía media columna que separa el capítulo del catálogo. */
export const LANDING_CHAPTER = pick(1368337);

/** Fotograma cuadrado de cada fuente del reproductor (TMDB, YouTube, VidSrc). */
export const LANDING_SOURCES: readonly [PreviewTitle, PreviewTitle, PreviewTitle] = [
  pick(1236045),
  pick(1148365),
  pick(1423191),
];

/** Recorte fotográfico de los módulos de funciones. */
export const LANDING_FEATURE_PHOTO = pick(1228834);
