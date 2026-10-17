/**
 * Cliente de TMDB.
 *
 * Solo servidor: la clave viaja en cada petición y nunca debe llegar al
 * navegador. El punto de entrada normal son las consultas de `./queries`; el
 * transporte de `./client` se exporta para casos puntuales (route handlers,
 * comprobaciones de salud), no para el día a día.
 */

export {
  TmdbError,
  isTmdbError,
  runTmdbQuery,
  tmdbErrorCodeForStatus,
  toTmdbFailure,
} from "./errors";
export type { TmdbErrorCode, TmdbErrorInit, TmdbFailure, TmdbResult } from "./errors";

export { tmdbFetch } from "./client";
export type { TmdbQueryValue, TmdbRequestOptions } from "./client";

export {
  getDiscoverMovies,
  getMovieDetails,
  getMovieGenres,
  getMoviesByList,
  getMovieVideos,
  getTrendingMovies,
  searchMovies,
} from "./queries";
export type { TmdbDiscoverMovieFilters, TmdbMovieAppend } from "./queries";

export { TMDB_IMAGE_BASE_URL, tmdbImageUrl } from "./image";
