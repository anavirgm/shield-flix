import { Bookmark } from "lucide-react";

import { LANDING_SOURCES } from "@/features/catalog/data/landing-roles";

/**
 * Fragmentos de interfaz a tamaño real.
 *
 * Van marcados con `data-ui`: son recortes del producto, no maquetas, así que
 * conservan sus propias medidas tipográficas (12–14px) y el sistema los mide
 * aparte del texto de la página.
 *
 * Regla de composición: como mucho dos filas con fondo por fragmento, para que
 * el bloque no se lea como una rejilla de tarjetas.
 */

/** Fuentes de un título: la activa y la que queda en reserva. */
export function SourceRowsFragment() {
  return (
    <div data-ui className="flex flex-col gap-2.5">
      <p className="text-[13px] text-muted">Fuente de reproducción</p>

      <div className="flex items-center justify-between gap-3 rounded-lg bg-surface-hover px-3.5 py-3">
        <span className="text-sm font-medium text-foreground">VidSrc · 1080p</span>
        <span className="inline-flex items-center gap-2 text-[13px] text-success">
          <span aria-hidden="true" className="size-2 rounded-full bg-success" />
          activa
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-lg bg-background px-3.5 py-3">
        <span className="text-sm text-muted">SuperEmbed · 720p</span>
        <span className="text-[13px] text-muted">en reserva</span>
      </div>
    </div>
  );
}

/** Historial de visionado de un título. */
export function ProgressFragment() {
  return (
    <div data-ui className="flex flex-col gap-3">
      <p className="text-[13px] text-muted">Continuar viendo</p>
      <p className="text-base font-medium text-foreground">La Odisea</p>

      <span className="block h-1.5 w-full overflow-hidden rounded-full bg-surface-hover">
        <span className="block h-full w-[68%] rounded-full bg-brand" />
      </span>

      <div className="flex items-center justify-between text-[13px] text-muted">
        <span>68% visto</span>
        <span>Quedan 42 min</span>
      </div>
    </div>
  );
}

/** Lista de pendientes de un perfil. */
export function ListFragment() {
  return (
    <div data-ui className="flex flex-col gap-3">
      <p className="text-[13px] text-muted">Mi lista</p>

      <ul className="flex flex-col gap-2.5">
        {LANDING_SOURCES.map((title) => (
          <li key={title.tmdbId} className="flex items-center gap-3">
            <Bookmark className="size-4 shrink-0 text-brand-soft" aria-hidden="true" />
            <span className="truncate text-sm text-foreground">{title.title}</span>
            <span className="ml-auto shrink-0 text-[13px] text-muted tabular-nums">
              {title.year}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Últimas fuentes registradas, como las ve el panel. */
export function AdminRowsFragment() {
  return (
    <table data-ui className="w-full text-left">
      <caption className="mb-3 text-left text-[13px] font-normal text-muted">
        Fuentes registradas
      </caption>
      <thead>
        <tr className="text-[12px] text-muted">
          <th scope="col" className="pb-2 font-normal">
            Título
          </th>
          <th scope="col" className="pb-2 text-right font-normal">
            Fuentes
          </th>
        </tr>
      </thead>
      <tbody data-ui className="divide-y divide-border">
        {LANDING_SOURCES.map((title) => (
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
