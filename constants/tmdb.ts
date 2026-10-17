import type { TmdbMovieListType, TmdbTimeWindow } from "@/types/tmdb";

/**
 * Configuración estática del cliente de TMDB.
 *
 * Rutas, idioma, corte de red y etiquetas de caché viven aquí para que las
 * consultas de `lib/tmdb/queries.ts` no contengan literales sueltos: cambiar el
 * idioma del catálogo o el tiempo de espera es un cambio en un solo sitio.
 */

/**
 * Caminos de la API v3, relativos a `TMDB_BASE_URL`.
 *
 * Se construyen con funciones (no con plantillas de texto repartidas por el
 * código) para que un cambio de ruta se detecte en un único punto.
 */
export const TMDB_PATHS = {
  movieList: (list: TmdbMovieListType) => `/movie/${list}`,
  trending: (window: TmdbTimeWindow) => `/trending/movie/${window}`,
  discoverMovie: "/discover/movie",
  movieGenres: "/genre/movie/list",
  searchMovie: "/search/movie",
  movie: (id: number) => `/movie/${id}`,
  movieVideos: (id: number) => `/movie/${id}/videos`,
} as const;

/** Idioma de las respuestas: la interfaz está en español. */
export const TMDB_LANGUAGE = "es-ES";

/**
 * TMDB excluye el contenido para adultos por defecto; se envía explícito en los
 * endpoints donde el usuario influye en el resultado (búsqueda y descubrir)
 * para que la intención quede escrita, no supuesta.
 */
export const TMDB_INCLUDE_ADULT = false;

/**
 * Corte de red. TMDB responde en decenas de milisegundos: si tarda más de esto,
 * el problema no es la lentitud del catálogo, y es mejor fallar rápido y dejar
 * que la interfaz muestre su estado de error.
 */
export const TMDB_TIMEOUT_MS = 8_000;

/** Tamaño de página que se pide a TMDB cuando la vista no impone otro. */
export const TMDB_DEFAULT_PAGE = 1;

/** Etiqueta de caché por lista predefinida de TMDB. */
export const TMDB_MOVIE_LIST_TAGS: Record<TmdbMovieListType, string> = {
  popular: "tmdb:list:popular",
  top_rated: "tmdb:list:top-rated",
  upcoming: "tmdb:list:upcoming",
  now_playing: "tmdb:list:now-playing",
};

/**
 * Etiquetas de caché por consulta.
 *
 * Son la mitad del contrato de `cacheTag`: el panel de administración puede
 * invalidar por título (`revalidateTag(TMDB_CACHE_TAGS.movie(id))`) sin tener
 * que conocer el nombre de la etiqueta. Por eso viven en `constants` y no como
 * literales dentro de las consultas.
 */
export const TMDB_CACHE_TAGS = {
  trending: "tmdb:trending",
  genres: "tmdb:genres",
  discover: "tmdb:discover",
  search: "tmdb:search",
  movie: (id: number) => `tmdb:movie:${id}`,
} as const;
