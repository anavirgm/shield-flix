import { cacheLife, cacheTag } from "next/cache";

import {
  TMDB_CACHE_TAGS,
  TMDB_DEFAULT_PAGE,
  TMDB_INCLUDE_ADULT,
  TMDB_MOVIE_LIST_TAGS,
  TMDB_PATHS,
} from "@/constants/tmdb";
import type {
  TmdbDiscoverSortBy,
  TmdbGenre,
  TmdbMovieDetails,
  TmdbMovieListItem,
  TmdbMovieListType,
  TmdbPaginatedResponse,
  TmdbTimeWindow,
  TmdbTrendingItem,
  TmdbVideo,
  TmdbVideosResponse,
} from "@/types/tmdb";

import { tmdbFetch } from "./client";
import { runTmdbQuery, type TmdbResult } from "./errors";
import {
  movieGenresSchema,
  movieIdentitySchema,
  movieVideosSchema,
  pagedEnvelopeSchema,
} from "./guards";

/**
 * Consultas de TMDB listas para consumir desde Server Components.
 *
 * Cada consulta declara su política de caché en el propio cuerpo, con `use cache`
 * + `cacheLife` + `cacheTag`. Es el modelo explícito de Next 16: nada se cachea
 * por accidente y, cuando algo caduca, la decisión se lee aquí.
 *
 * Elección de perfiles (según cuánto tarda en quedar obsoleto cada dato):
 * - `hours`   → listas y descubrir: el catálogo se mueve a lo largo del día.
 * - `days`    → ficha y vídeos: los metadatos de un título apenas cambian.
 * - `weeks`   → géneros: son prácticamente fijos.
 * - `minutes` → búsqueda: depende de lo que el usuario escriba ahora.
 *
 * Las etiquetas (`TMDB_CACHE_TAGS`) permiten invalidar por demanda más adelante
 * con `revalidateTag`: el panel de administración podrá refrescar un título sin
 * esperar a que expire su ventana de caché.
 *
 * Todas son `async` y reciben valores serializables: con `use cache`, los
 * argumentos forman parte de la clave de caché (una página de "populares" no
 * comparte entrada con la de "mejor valoradas").
 *
 * Todas devuelven `TmdbResult<T>` en lugar de lanzar (ver `errors.ts`): el fallo
 * llega como dato, así que quien consume distingue "no encontrado" de "sin
 * conexión" sin `try/catch` y sin perder el motivo al atravesar la caché.
 */

/** Listas predefinidas de TMDB (`/movie/popular`, `/movie/top_rated`…). */
export async function getMoviesByList(
  list: TmdbMovieListType,
  page: number = TMDB_DEFAULT_PAGE,
): Promise<TmdbResult<TmdbPaginatedResponse<TmdbMovieListItem>>> {
  "use cache";
  cacheLife("hours");
  cacheTag(TMDB_MOVIE_LIST_TAGS[list]);

  return runTmdbQuery(() =>
    tmdbFetch<TmdbPaginatedResponse<TmdbMovieListItem>>(TMDB_PATHS.movieList(list), {
      query: { page, include_adult: TMDB_INCLUDE_ADULT },
      guard: pagedEnvelopeSchema,
    }),
  );
}

/** Tendencias (`day` o `week`). TMDB no expone `include_adult` en este endpoint. */
export async function getTrendingMovies(
  window: TmdbTimeWindow = "week",
  page: number = TMDB_DEFAULT_PAGE,
): Promise<TmdbResult<TmdbPaginatedResponse<TmdbTrendingItem>>> {
  "use cache";
  cacheLife("hours");
  cacheTag(TMDB_CACHE_TAGS.trending);

  return runTmdbQuery(() =>
    tmdbFetch<TmdbPaginatedResponse<TmdbTrendingItem>>(TMDB_PATHS.trending(window), {
      query: { page },
      guard: pagedEnvelopeSchema,
    }),
  );
}

/** Filtros admitidos por `/discover/movie` (subconjunto que usa la app). */
export type TmdbDiscoverMovieFilters = {
  page?: number;
  /** Género de TMDB (`with_genres`). */
  genreId?: number;
  sortBy?: TmdbDiscoverSortBy;
  /** Año de estreno exacto (`primary_release_year`). */
  year?: number;
  /** Idioma original en ISO-639-1 (`with_original_language`). */
  originalLanguage?: string;
  minVoteAverage?: number;
  minVoteCount?: number;
  /** Fecha de estreno mínima, `YYYY-MM-DD`. */
  releasedFrom?: string;
  /** Fecha de estreno máxima, `YYYY-MM-DD`. */
  releasedTo?: string;
};

/**
 * Catálogo filtrado (`/discover/movie`).
 *
 * Es la consulta que alimenta la rejilla con filtros de género: los filtros se
 * traducen al dialecto de TMDB aquí, para que la interfaz siga hablando en
 * `camelCase` y no sepa nada de `primary_release_date.gte`.
 */
export async function getDiscoverMovies(
  filters: TmdbDiscoverMovieFilters = {},
): Promise<TmdbResult<TmdbPaginatedResponse<TmdbMovieListItem>>> {
  "use cache";
  cacheLife("hours");
  cacheTag(TMDB_CACHE_TAGS.discover);

  return runTmdbQuery(() =>
    tmdbFetch<TmdbPaginatedResponse<TmdbMovieListItem>>(TMDB_PATHS.discoverMovie, {
      query: {
        page: filters.page ?? TMDB_DEFAULT_PAGE,
        include_adult: TMDB_INCLUDE_ADULT,
        sort_by: filters.sortBy,
        with_genres: filters.genreId,
        primary_release_year: filters.year,
        with_original_language: filters.originalLanguage,
        "vote_average.gte": filters.minVoteAverage,
        "vote_count.gte": filters.minVoteCount,
        "primary_release_date.gte": filters.releasedFrom,
        "primary_release_date.lte": filters.releasedTo,
      },
      guard: pagedEnvelopeSchema,
    }),
  );
}

/** Géneros de película, ya extraídos del envoltorio `{ genres: [...] }`. */
export async function getMovieGenres(): Promise<TmdbResult<TmdbGenre[]>> {
  "use cache";
  cacheLife("weeks");
  cacheTag(TMDB_CACHE_TAGS.genres);

  return runTmdbQuery(async () => {
    const { genres } = await tmdbFetch<{ genres: TmdbGenre[] }>(TMDB_PATHS.movieGenres, {
      guard: movieGenresSchema,
    });

    return genres;
  });
}

/**
 * Búsqueda de películas por texto.
 *
 * Una consulta vacía devuelve el vacío sin llamar a TMDB (respondería 422): así
 * el buscador puede renderizar el estado "sin resultados" sin gastar una
 * petición ni ensuciar el log con un fallo esperado.
 */
export async function searchMovies(
  query: string,
  page: number = TMDB_DEFAULT_PAGE,
): Promise<TmdbResult<TmdbPaginatedResponse<TmdbMovieListItem>>> {
  "use cache";
  cacheLife("minutes");
  cacheTag(TMDB_CACHE_TAGS.search);

  const term = query.trim();

  if (term.length === 0) {
    return {
      ok: true,
      data: { page: TMDB_DEFAULT_PAGE, results: [], total_pages: 0, total_results: 0 },
    };
  }

  return runTmdbQuery(() =>
    tmdbFetch<TmdbPaginatedResponse<TmdbMovieListItem>>(TMDB_PATHS.searchMovie, {
      query: { query: term, page, include_adult: TMDB_INCLUDE_ADULT },
      guard: pagedEnvelopeSchema,
    }),
  );
}

/** Bloques que se pueden pedir junto a la ficha en una sola petición. */
export type TmdbMovieAppend =
  "videos" | "credits" | "images" | "keywords" | "external_ids" | "recommendations" | "similar";

/**
 * Ficha de una película.
 *
 * `append` usa `append_to_response`, así que pedir la ficha con vídeos y
 * reparto cuesta **una** petición, no tres. Los bloques añadidos llegan como
 * campos opcionales (ver `TmdbMovieDetails`).
 */
export async function getMovieDetails(
  id: number,
  append: readonly TmdbMovieAppend[] = [],
): Promise<TmdbResult<TmdbMovieDetails>> {
  "use cache";
  cacheLife("days");
  cacheTag(TMDB_CACHE_TAGS.movie(id));

  return runTmdbQuery(() =>
    tmdbFetch<TmdbMovieDetails>(TMDB_PATHS.movie(id), {
      query: { append_to_response: append.length > 0 ? append.join(",") : undefined },
      guard: movieIdentitySchema,
    }),
  );
}

/** Vídeos (tráilers y clips) de una película, ya extraídos de su envoltorio. */
export async function getMovieVideos(id: number): Promise<TmdbResult<TmdbVideo[]>> {
  "use cache";
  cacheLife("days");
  cacheTag(TMDB_CACHE_TAGS.movie(id));

  return runTmdbQuery(async () => {
    const { results } = await tmdbFetch<TmdbVideosResponse>(TMDB_PATHS.movieVideos(id), {
      guard: movieVideosSchema,
    });

    return results;
  });
}
