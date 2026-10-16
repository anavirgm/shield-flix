import { Bookmark } from "lucide-react";

import { PREVIEW_GENRES } from "@/features/catalog/data/landing-preview";
import { LANDING_SOURCES } from "@/features/catalog/data/landing-roles";
import { tmdbImageUrl } from "@/lib/tmdb/image";

/**
 * Fragmentos de interfaz a tamaño real.
 *
 * Van marcados con `data-ui`: son recortes del producto, no maquetas, así que
 * conservan sus propias medidas tipográficas (12–14px) y el sistema los mide
 * aparte del texto de la página. Los pósters son de TMDB y dan al recorte la
 * prueba que ninguna maqueta da: es el catálogo de verdad dentro del producto.
 *
 * Regla de composición: filas de menos de 90px de alto, para que el bloque se
 * lea como una lista de interfaz y nunca como una rejilla de tarjetas.
 */

/** Fuentes de un título: la activa y las dos que quedan en reserva. */
export function SourceRowsFragment() {
  return (
    <div data-ui className="flex w-full flex-col gap-2.5">
      <p className="text-[13px] text-muted">Fuentes de este título</p>

      <div className="flex items-center justify-between gap-3 rounded-lg bg-surface-hover px-3.5 py-2.5">
        <span className="text-sm font-medium text-foreground">VidSrc · 1080p</span>
        <span className="inline-flex items-center gap-2 text-[13px] text-success">
          <span aria-hidden="true" className="size-2 rounded-full bg-success" />
          activa
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-lg bg-background px-3.5 py-2.5">
        <span className="text-sm text-muted">SuperEmbed · 720p</span>
        <span className="text-[13px] text-muted">en reserva</span>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-lg bg-background px-3.5 py-2.5">
        <span className="text-sm text-muted">EmbedSU · 480p</span>
        <span className="text-[13px] text-muted">en reserva</span>
      </div>
    </div>
  );
}

/** Historial: el póster, por dónde va y lo que le queda. */
export function ProgressFragment() {
  const title = LANDING_SOURCES[0];
  const poster = tmdbImageUrl(title.posterPath, "w154");

  return (
    <div data-ui className="flex w-full items-center gap-4">
      {poster ? (
        <img
          src={poster}
          alt={`Póster de ${title.title}`}
          width={154}
          height={231}
          loading="lazy"
          className="h-32 w-[5.5rem] shrink-0 rounded-lg object-cover"
        />
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="text-[13px] text-muted">Continuar viendo</p>
        <p className="truncate text-sm font-medium text-foreground">{title.title}</p>

        <span className="block h-1.5 w-full overflow-hidden rounded-full bg-surface-hover">
          <span className="block h-full w-[68%] rounded-full bg-brand" />
        </span>

        <div className="flex items-center justify-between text-[13px] text-muted tabular-nums">
          <span>68% visto</span>
          <span>Quedan 42 min</span>
        </div>
      </div>
    </div>
  );
}

/** Lista de pendientes de un perfil, con el póster de cada título. */
export function ListFragment() {
  return (
    <div data-ui className="flex w-full flex-col gap-3">
      <p className="text-[13px] text-muted">Mi lista</p>

      <ul className="flex flex-col gap-3">
        {LANDING_SOURCES.map((title) => {
          const poster = tmdbImageUrl(title.posterPath, "w92");

          return (
            <li key={title.tmdbId} className="flex items-center gap-3">
              {poster ? (
                <img
                  src={poster}
                  alt={`Póster de ${title.title}`}
                  width={92}
                  height={138}
                  loading="lazy"
                  className="h-11 w-8 shrink-0 rounded object-cover"
                />
              ) : null}

              <span className="truncate text-sm text-foreground">{title.title}</span>
              <span className="ml-auto shrink-0 text-[13px] text-muted tabular-nums">
                {title.year}
              </span>
              <Bookmark className="size-4 shrink-0 text-brand-soft" aria-hidden="true" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Una categoría ya filtrada: la consulta y los títulos que devuelve. */
export function GenreRowsFragment() {
  const category = PREVIEW_GENRES[0];

  if (!category) {
    return null;
  }

  return (
    <table data-ui className="w-full text-left">
      <caption className="mb-3 text-left text-[13px] font-normal text-muted">
        {category.name} · {category.titles.length} títulos
      </caption>
      <thead>
        <tr className="text-[12px] text-muted">
          <th scope="col" className="pb-2 font-normal">
            Título
          </th>
          <th scope="col" className="pb-2 text-right font-normal">
            Nota
          </th>
        </tr>
      </thead>
      <tbody data-ui className="divide-y divide-border">
        {category.titles.map((title) => (
          <tr key={title.tmdbId}>
            <td className="py-2.5 pr-3 text-sm text-foreground">{title.title}</td>
            <td className="py-2.5 text-right text-sm text-muted tabular-nums">
              {title.rating.toFixed(1)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
