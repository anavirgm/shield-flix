/**
 * Vista de una película para las listas del catálogo (tarjetas y carruseles).
 *
 * Es el mismo patrón que `HeroContent` para la portada: la tarjeta no consume la
 * respuesta cruda de TMDB (`TmdbMovieListItem`), sino este resumen ya decidido.
 * Así, cuando el catálogo pase a Postgres o cambie el proveedor, se toca este
 * archivo y no cada tarjeta.
 *
 * Los campos son los mínimos que una tarjeta puede mostrar: todo lo que no se
 * ve en la cuadrícula (sinopsis, géneros, créditos) vive en la ficha (#18).
 */
export type MovieSummary = {
  id: number;
  title: string;
  /**
   * Ruta del póster en el CDN de TMDB, o `null` cuando el título no tiene arte.
   * La tarjeta dibuja su propio respaldo en ese caso: el hueco del póster no se
   * colapsa y la cuadrícula conserva su ritmo.
   */
  posterPath: string | null;
  /** Año de estreno (`YYYY`), o `null` si TMDB aún no tiene fecha. */
  year: string | null;
  /**
   * Sinopsis, para el overlay de hover. Es contenido de refuerzo: el dato
   * esencial (título, año, nota) se ve siempre debajo del póster, así que esta
   * sinopsis puede quedarse en `null` sin que la tarjeta pierda nada esencial.
   */
  overview: string | null;
  /**
   * Nota media sobre 10, o `null` cuando el título aún no tiene votos: TMDB
   * devuelve `0` en ese caso y mostrar "0" como nota engaña más que informa.
   */
  rating: number | null;
};
