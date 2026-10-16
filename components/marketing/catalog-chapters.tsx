import { LANDING_CHAPTER } from "@/features/catalog/data/landing-roles";
import { PREVIEW_GENRES } from "@/features/catalog/data/landing-preview";
import { tmdbImageUrl } from "@/lib/tmdb/image";

/**
 * Capítulo del catálogo: una palabra enorme a la izquierda y las barras
 * plegables debajo; a la derecha, una fotografía a media columna.
 *
 * La palabra se mide en `cqw`, así que siempre llena exactamente su columna
 * sea cual sea el ancho de pantalla, sin un `clamp()` por breakpoint.
 * Las barras son `<details>` nativos: abren en el sitio, sin JavaScript.
 */
export function CatalogChapters() {
  const photo = tmdbImageUrl(LANDING_CHAPTER.backdropPath, "w1280");

  return (
    <section
      id="catalogo"
      aria-labelledby="catalogo-titulo"
      className="px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid w-full max-w-[80rem] gap-14 lg:grid-cols-[minmax(0,42rem)_minmax(0,1fr)] lg:items-start lg:gap-16">
        <div className="@container min-w-0">
          <h2
            id="catalogo-titulo"
            className="reveal text-[22cqw] leading-[0.88] font-semibold tracking-[-0.05em] text-foreground"
          >
            Catálogo
          </h2>

          <p className="reveal mt-7 max-w-[54ch] text-base leading-relaxed text-muted [animation-delay:60ms]">
            Una muestra real: seis categorías con los títulos que TMDB devuelve hoy, su año y su
            nota media. El Sprint 2 conecta esta misma estructura a Postgres.
          </p>

          <div className="mt-10 flex flex-col gap-1.5">
            {PREVIEW_GENRES.map((genre, index) => (
              <details
                key={genre.tmdbId}
                open={index === 0}
                className="reveal group rounded-xl bg-surface text-foreground"
              >
                <summary className="flex h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 transition-colors duration-200 ease-out-quart hover:bg-surface-hover [&::-webkit-details-marker]:hidden">
                  <span className="text-base font-medium">{genre.name}</span>
                  <span
                    aria-hidden="true"
                    className="relative size-4 shrink-0 text-muted transition-transform duration-300 ease-out-quart group-open:rotate-45 group-open:text-brand-soft"
                  >
                    <span className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 bg-current" />
                    <span className="absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 bg-current" />
                  </span>
                </summary>

                {/* Sin separadores: la separación es espacio, no una línea. */}
                <ul className="flex flex-col gap-3 px-5 pt-2 pb-6">
                  {genre.titles.map((title) => (
                    <li key={title.tmdbId} className="flex items-baseline justify-between gap-6">
                      <span className="text-base text-foreground">{title.title}</span>
                      <span className="shrink-0 text-base text-muted tabular-nums">
                        {title.year} · {title.rating.toFixed(1)}
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          {photo ? (
            <div className="reveal overflow-hidden rounded-xl lg:sticky lg:top-6">
              <img
                src={photo}
                alt={`Fotograma de ${LANDING_CHAPTER.title}`}
                width={1280}
                height={720}
                loading="lazy"
                className="drift h-[70svh] w-full object-cover"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
