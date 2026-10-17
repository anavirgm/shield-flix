import Link from "next/link";
import { Star } from "lucide-react";

import type { MovieSummary } from "@/features/catalog/movie";
import { tmdbImageUrl } from "@/lib/tmdb/image";
import { cn } from "@/utils/cn";

/**
 * Tarjeta de película reutilizable: póster, título, año y nota media.
 *
 * `href` es opcional a propósito. La ficha de la película aún no existe (#18),
 * así que una tarjeta que enlazara a `/pelicula/[id]` sería un enlace roto: sin
 * `href` la tarjeta es un bloque informativo y no finge interactividad; cuando
 * la ficha exista, quien la consume pasa el destino y la tarjeta entera se vuelve
 * un enlace (el objetivo táctil completo, no solo el título).
 *
 * Estados que contempla, porque llegan del dato real de TMDB:
 * - Sin póster: el hueco no se colapsa (se reserva con el mismo aspecto 2:3) y
 *   lo ocupa el título, para que la cuadrícula conserve su ritmo.
 * - Sin voto: TMDB devuelve `0` cuando nadie ha votado; se oculta la nota en
 *   lugar de enseñar un "0" que no es una nota.
 * - Sin año: se omite el dato, no se pinta un guion.
 *
 * La sinopsis aparece en un overlay al pasar el ratón o al enfocar el teclado,
 * solo en la versión enlazada: es un refuerzo progresivo, nunca la única vía
 * (por eso el dato esencial —título, año, nota— siempre va debajo del póster,
 * visible también en móvil, donde no hay hover). El overlay lleva `scrim-card`,
 * que garantiza contraste AA sobre un póster blanco puro.
 *
 * Ese overlay se calla a los lectores de pantalla (`aria-hidden`): es un adorno
 * de hover sobre una sinopsis que reaparecerá completa en la ficha (#18), y
 * dejarlo en el árbol accesible convertiría el nombre accesible de cada tarjeta
 * de la fila en una sinopsis entera.
 */
type MovieCardProps = {
  movie: MovieSummary;
  /** Destino de la tarjeta. Sin él no hay estados de hover ni foco: ver nota. */
  href?: string;
};

export function MovieCard({ movie, href }: MovieCardProps) {
  const poster = tmdbImageUrl(movie.posterPath, "w342");
  const interactive = href !== undefined;
  const hasOverview = (movie.overview?.trim().length ?? 0) > 0;

  const body = (
    <>
      <div
        className={cn(
          "relative overflow-hidden rounded-xl bg-surface",
          interactive &&
            "transition-[box-shadow,transform] duration-300 ease-out-quart group-hover:shadow-elevated group-focus-visible:shadow-elevated motion-reduce:transition-none",
        )}
      >
        {poster ? (
          <img
            src={poster}
            alt=""
            width={342}
            height={513}
            loading="lazy"
            decoding="async"
            draggable={false}
            className={cn(
              "aspect-[2/3] w-full object-cover",
              interactive &&
                "transition-transform duration-300 ease-out-quart group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100",
            )}
          />
        ) : (
          // Sin arte, el hueco lo ocupa el título. Es repetición decorativa del
          // texto de abajo, así que se calla a los lectores de pantalla.
          <div aria-hidden="true" className="grid aspect-[2/3] w-full place-items-center p-4">
            <span className="line-clamp-4 text-center text-sm text-muted">{movie.title}</span>
          </div>
        )}

        {interactive && hasOverview ? (
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 flex items-end scrim-card p-3 opacity-0 transition-opacity duration-200 ease-out-quart group-hover:opacity-100 group-focus-visible:opacity-100",
              "motion-reduce:transition-none",
            )}
          >
            <p className="line-clamp-2 text-sm leading-snug text-foreground">{movie.overview}</p>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        {/* Altura fija de dos líneas: el bloque de metadatos de todas las
            tarjetas de una fila cae en la misma línea sin importar cuánto dure
            cada título. */}
        <p className="line-clamp-2 min-h-10 text-sm font-medium text-foreground">{movie.title}</p>

        {movie.year !== null || movie.rating !== null ? (
          <p className="flex items-center gap-2 text-sm text-muted tabular-nums">
            {movie.year !== null ? <span>{movie.year}</span> : null}

            {movie.rating !== null ? (
              /* Icono + cifra como una sola imagen accesible (mismo patrón que
                  la portada): se lee "nota media 8,4 sobre 10", no un número suelto. */
              <span
                role="img"
                aria-label={`Nota media: ${movie.rating.toFixed(1)} sobre 10`}
                className="inline-flex items-center gap-1"
              >
                <Star aria-hidden="true" className="size-3.5 text-brand-soft" />
                <span aria-hidden="true">{movie.rating.toFixed(1)}</span>
              </span>
            ) : null}
          </p>
        ) : null}
      </div>
    </>
  );

  if (interactive) {
    return (
      <Link href={href} className="group flex h-full flex-col gap-2.5">
        {body}
      </Link>
    );
  }

  return <article className="flex h-full flex-col gap-2.5">{body}</article>;
}
