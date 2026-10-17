import { getMovieGenres, getMovieVideos, getTrendingMovies } from "@/lib/tmdb";
import type { TmdbMovieListItem, TmdbVideo } from "@/types/tmdb";

/**
 * Contenido de la portada.
 *
 * La vista no consume la respuesta cruda de TMDB, sino este resumen ya
 * resuelto: así no sabe nada de `backdrop_path`, `genre_ids` ni de claves de
 * YouTube, y el día que el destacado salga de otro sitio (mejor valoradas, una
 * colección propia) la vista no se toca.
 */
export type HeroContent = {
  id: number;
  title: string;
  overview: string;
  backdropPath: string;
  /** Año de estreno (`YYYY`), o `null` si TMDB aún no lo tiene. */
  year: string | null;
  /** Nota media de TMDB, sobre 10. */
  rating: number;
  /** Géneros para la línea de metadatos (como mucho dos). */
  genres: string[];
  /** Clave del tráiler en YouTube, o `null` si el título no tiene ninguno. */
  trailerKey: string | null;
};

/**
 * Sinopsis mínima para que la portada no quede a medias: por debajo de esto el
 * bloque de texto se ve vacío y es mejor que el sitio lo ocupe otro título.
 */
const MIN_OVERVIEW_LENGTH = 40;

/**
 * Tope del titular. El h1 tiene que caber en dos líneas a cualquier ancho, y
 * eso se decide aquí, eligiendo título, en lugar de recortarlo con
 * `line-clamp`: un titular cortado a media palabra se lee mal y engaña al
 * buscador.
 */
const MAX_TITLE_LENGTH = 34;

/** La línea de metadatos se mantiene corta: dos géneros como mucho. */
const MAX_GENRES = 2;

/**
 * Cuántas candidatas se miran en busca de tráiler. No todas las tendencias traen
 * uno (películas recién estrenadas o muy pequeñas a veces no tienen ninguno), y
 * la portada quiere poder ofrecer "Ver tráiler"; cada candidata cuesta una
 * consulta de vídeos, cacheada durante días, así que el margen se queda corto.
 */
const TRAILER_LOOKAHEAD = 4;

/** Película que sí sostiene la portada: fondo garantizado y sinopsis útil. */
type FeaturedMovie = TmdbMovieListItem & { backdrop_path: string };

/**
 * Candidatas a ocupar la portada, en orden de relevancia.
 *
 * Filtra lo que no puede sostenerla (sin fondo, sin sinopsis, para adultos) y
 * acota cuántas se consideran: el orden de tendencias ya viene de más a menos
 * relevante y no se altera.
 */
export function featuredCandidates(
  movies: readonly TmdbMovieListItem[],
  limit: number,
): FeaturedMovie[] {
  return movies
    .filter(
      (movie): movie is FeaturedMovie =>
        !movie.adult &&
        movie.backdrop_path !== null &&
        movie.overview.trim().length >= MIN_OVERVIEW_LENGTH,
    )
    .slice(0, limit);
}

/**
 * Primer tráiler de YouTube: manda el oficial; si no lo hay, cualquier tráiler;
 * y de última, cualquier vídeo, porque un avance también da algo que ver.
 */
export function pickTrailerKey(videos: readonly TmdbVideo[]): string | null {
  const youtube = videos.filter((video) => video.site === "YouTube");

  const trailer =
    youtube.find((video) => video.type === "Trailer" && video.official) ??
    youtube.find((video) => video.type === "Trailer") ??
    youtube[0];

  return trailer?.key ?? null;
}

/**
 * Elige la candidata que puede sostener la portada entera.
 *
 * `trailers` va en paralelo a `candidates` (mismo índice, mismo título). Primero
 * se queda con las que tienen tráiler, porque la portada ofrece "Ver tráiler" y
 * una película que no lo tiene deja la mitad de la acción sin destino; entre esas
 * prefiere la de título corto, que es la que cabe en el titular. Solo si ninguna
 * tiene tráiler se cae a la primera candidata: no tener tráiler resta, no
 * descarta.
 */
export function pickFeaturedMovie(
  candidates: readonly FeaturedMovie[],
  trailers: readonly (string | null)[],
): FeaturedMovie | null {
  const withTrailer = candidates.filter((_, index) => trailers[index] != null);
  const pool = withTrailer.length > 0 ? withTrailer : candidates;

  return pool.find((movie) => movie.title.length <= MAX_TITLE_LENGTH) ?? pool[0] ?? null;
}

/**
 * Resuelve la portada: destacado, géneros y tráiler.
 *
 * Devuelve `null` cuando no hay nada que enseñar (TMDB no responde, la clave es
 * de relleno o ninguna tendencia sirve). Es un estado legítimo, no un error: la
 * portada empieza directamente en el bloque siguiente, sin hueco ni marco vacío.
 */
export async function getHeroContent(): Promise<HeroContent | null> {
  const trending = await getTrendingMovies("day");

  if (!trending.ok) {
    return null;
  }

  const candidates = featuredCandidates(trending.data.results, TRAILER_LOOKAHEAD);

  if (candidates.length === 0) {
    return null;
  }

  // Los vídeos de todas las candidatas, a la vez: en serie, la portada tardaría
  // lo que tarde TMDB multiplicado por el margen.
  const videoResults = await Promise.all(candidates.map((movie) => getMovieVideos(movie.id)));

  const trailers = videoResults.map((result) => (result.ok ? pickTrailerKey(result.data) : null));

  const movie = pickFeaturedMovie(candidates, trailers);

  if (!movie) {
    return null;
  }

  const genres = await getMovieGenres();
  const trailerKey = trailers[candidates.indexOf(movie)] ?? null;

  const genreNames = new Map<number, string>();

  if (genres.ok) {
    for (const genre of genres.data) {
      genreNames.set(genre.id, genre.name);
    }
  }

  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview.trim(),
    backdropPath: movie.backdrop_path,
    year: movie.release_date.slice(0, 4) || null,
    rating: movie.vote_average,
    genres: movie.genre_ids
      .map((id) => genreNames.get(id))
      .filter((name): name is string => name !== undefined)
      .slice(0, MAX_GENRES),
    trailerKey,
  };
}
