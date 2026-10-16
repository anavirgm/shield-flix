import type { ReactNode } from "react";

import {
  AdminRowsFragment,
  ListFragment,
  ProgressFragment,
  SourceRowsFragment,
} from "@/components/marketing/ui-fragments";
import { LANDING_FEATURE_PHOTO } from "@/features/catalog/data/landing-roles";
import { tmdbImageUrl } from "@/lib/tmdb/image";

type Capability = {
  title: string;
  body: string;
  panel: ReactNode;
};

const photo = tmdbImageUrl(LANDING_FEATURE_PHOTO.backdropPath, "w780");

/**
 * Funciones: el producto demostrándose a sí mismo.
 *
 * Cada módulo lleva una prueba pequeña a la izquierda —un recorte de interfaz a
 * tamaño real o una fotografía muy recortada— y el texto al lado, nunca debajo.
 * Los módulos van sangrados: el titular queda en el margen de la página y las
 * pruebas empiezan más adentro, así la sección se lee como una columna.
 */
const capabilities: Capability[] = [
  {
    title: "Un reproductor con reserva",
    body: "Cada título guarda sus fuentes con su calidad y su prioridad. La primera que responde es la que suena; las demás quedan a un clic.",
    panel: <SourceRowsFragment />,
  },
  {
    title: "Retoma donde lo dejaste",
    body: "El historial avanza por título, temporada y episodio. Volver a una serie no cuesta buscar el capítulo donde te quedaste.",
    panel: <ProgressFragment />,
  },
  {
    title: "Una lista que es tuya",
    body: "Favoritos y pendientes viven en Postgres con RLS activo: cada perfil ve lo suyo y nadie más puede leerlo desde el cliente.",
    panel: <ListFragment />,
  },
  {
    title: "Géneros normalizados",
    body: "Películas y géneros se cruzan en una tabla intermedia con su índice, así que filtrar por género es una consulta y no un texto libre.",
    panel: <AdminRowsFragment />,
  },
  {
    title: "Administración sin atajos",
    body: "El rol se comprueba dentro de la base de datos con una función propia, y un trigger impide escalar privilegios desde el navegador.",
    panel: photo ? (
      <img
        src={photo}
        alt={`Fotograma de ${LANDING_FEATURE_PHOTO.title}`}
        width={780}
        height={439}
        loading="lazy"
        className="size-full object-cover"
      />
    ) : null,
  },
];

export function CapabilityModules() {
  return (
    <section
      id="funciones"
      aria-labelledby="funciones-titulo"
      className="bg-surface/40 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto w-full max-w-[80rem]">
        <h2
          id="funciones-titulo"
          className="reveal text-[2rem] leading-tight font-semibold tracking-[-0.025em] text-foreground"
        >
          Lo que ya hace
        </h2>

        <div className="mt-14 flex flex-col gap-20 lg:pl-[14%]">
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
