import type { ReactNode } from "react";

import {
  GenreRowsFragment,
  ListFragment,
  ProgressFragment,
  SourceRowsFragment,
} from "@/components/marketing/ui-fragments";

type Capability = {
  title: string;
  body: string;
  panel: ReactNode;
};

/**
 * Funciones: el producto demostrándose a sí mismo.
 *
 * Cada módulo lleva un recorte de interfaz a la izquierda —a tamaño real, sin
 * escalar— y el texto a su derecha, nunca debajo. Los módulos van sangrados: el
 * titular queda en el margen de la página y los recortes empiezan más adentro,
 * así la sección se lee como una columna y no como una rejilla.
 *
 * La altura de cada panel la decide su contenido, y eso es lo que mantiene el
 * ritmo: el reproductor ocupa tres filas, el historial ocupa un póster.
 */
const capabilities: Capability[] = [
  {
    title: "Un reproductor con reserva",
    body: "Cada título guarda sus fuentes con su calidad y su prioridad. Si la primera no responde, la siguiente entra sin perder el minuto.",
    panel: <SourceRowsFragment />,
  },
  {
    title: "Retoma donde lo dejaste",
    body: "El historial avanza por título, temporada y episodio. Volver a una serie no cuesta buscar por dónde ibas.",
    panel: <ProgressFragment />,
  },
  {
    title: "Una lista que es tuya",
    body: "Favoritos y pendientes viven en tu perfil: la base de datos comprueba quién puede leerlos antes de devolver una sola fila.",
    panel: <ListFragment />,
  },
  {
    title: "Filtrar por género",
    body: "Cada título se cruza con sus géneros en su propia tabla, así que filtrar por género es una consulta con índice y no una búsqueda de texto.",
    panel: <GenreRowsFragment />,
  },
];

export function CapabilityModules() {
  return (
    <section
      id="funciones"
      aria-labelledby="funciones-titulo"
      className="scroll-mt-16 bg-surface/40 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto w-full max-w-[80rem]">
        <h2
          id="funciones-titulo"
          className="reveal max-w-[24ch] text-[2rem] leading-tight font-semibold tracking-[-0.025em] text-foreground"
        >
          Lo que ya hace
        </h2>

        <p className="reveal mt-5 max-w-[52ch] text-base leading-relaxed text-muted [animation-delay:60ms]">
          Cada pieza lleva su recorte real de interfaz: nada aquí está dibujado a mano.
        </p>

        <div className="mt-16 flex flex-col gap-24 lg:pl-[14%]">
          {capabilities.map((capability) => (
            <article
              key={capability.title}
              className="reveal grid gap-6 sm:grid-cols-[22.5rem_minmax(0,30ch)] sm:items-start sm:gap-8"
            >
              <div className="flex min-h-44 items-center overflow-hidden rounded-xl bg-surface p-5">
                {capability.panel}
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground">{capability.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{capability.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
