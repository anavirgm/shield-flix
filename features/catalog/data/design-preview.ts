/**
 * Instantánea real de TMDB (es-ES) para documentar la tarjeta y el carrusel en
 * la página de diseño.
 *
 * Es un fixture, no una fuente de datos: la app consultará TMDB en tiempo de
 * ejecución (#12). Esta página solo necesita ejemplos estables, que no dependan
 * de la red ni cambien bajo los pies de una revisión de interfaz. Se descargó el
 * 2026-10-17 y conserva a propósito los casos límite que trae el dato real: un
 * título sin sinopsis (la tarjeta no muestra overlay) y otro sin votos (la
 * tarjeta no muestra nota).
 *
 * Atribución obligatoria: TMDB.
 */

import type { MovieSummary } from "@/features/catalog/movie";

/** Ejemplo con destino: la tarjeta entera es un enlace y enseña la sinopsis. */
export const DESIGN_PREVIEW_LINKED: MovieSummary = {
  id: 969681,
  title: "Spider-Man: Brand New Day",
  posterPath: "/9g0sEFhmvmK4nGhXj8DHuv2noYI.jpg",
  year: "2026",
  overview:
    "Han pasado cuatro años desde los acontecimientos de No Way Home, y Peter Parker ahora es un adulto que vive completamente solo, ha desaparecido voluntariamente de las vidas y recuerdos de quienes ama. Combatiendo el crimen en una Nueva York que ya no conoce su nombre, se ha dedicado por completo a proteger su ciudad—un Spider-Man a tiempo completo—, pero a medida que aumentan las exigencias sobre él, la presión desencadena una evolución física que amenaza su existencia, al mismo tiempo que un extraño nuevo patrón de crímenes da lugar a una de las amenazas más poderosas a las que se ha enfrentado.",
  rating: 8.5,
};

/** El mismo título sin destino: la tarjeta es un bloque, sin hover ni foco. */
export const DESIGN_PREVIEW_UNLINKED: MovieSummary = {
  id: 1291595,
  title: "Insidious: Fuera del más allá",
  posterPath: "/uIMddTcnM9P6PrJiDjsXIeYp902.jpg",
  year: "2026",
  overview:
    "La saga de terror vuelve a sus raíces sobrenaturales. Una nueva protagonista se enfrenta a misteriosas apariciones que van mucho más allá de los fenómenos de embrujamiento clásicos. El mal encuentra nuevos caminos en la realidad. Un trío de acechadores se infiltra en un tranquilo suburbio obligando a una nueva familia a entrar en el plano astral, donde descubren una aterradora verdad: el Más Allá está sangrando en el mundo real",
  rating: 7.7,
};

/**
 * Caso escrito a mano. Ninguna película del catálogo se ha quedado sin carátula
 * todavía, así que el estado se representa con un título inventado; `id: 0`
 * deja claro que no apunta a ninguna ficha.
 */
export const DESIGN_PREVIEW_WITHOUT_POSTER: MovieSummary = {
  id: 0,
  title: "Título sin carátula",
  posterPath: null,
  year: "2026",
  overview: null,
  rating: 7.4,
};

/** Ejemplos reales de la cuadrícula, en el orden del catálogo. */
export const DESIGN_PREVIEW_MOVIES: MovieSummary[] = [
  DESIGN_PREVIEW_LINKED,
  DESIGN_PREVIEW_UNLINKED,
  {
    id: 1368337,
    title: "La Odisea",
    posterPath: "/sf2ke1nwFOLLcwLZiXu9VaMMv8e.jpg",
    year: "2026",
    overview:
      "Tras la caída de Troya, el legendario rey de Ítaca, Odiseo a.k.a. Ulises, emprende un largo y peligroso viaje para regresar junto a su esposa Penélope y su hijo Telémaco. En el camino deberá enfrentarse a criaturas mitológicas, dioses caprichosos y pruebas que pondrán a prueba su ingenio, su resistencia y su humanidad. Mientras tanto, en Ítaca, el futuro de su reino pende de un hilo ante la creciente amenaza de quienes creen que jamás volverá.",
    rating: 8,
  },
  {
    id: 1148365,
    title: "Matchbox: La película",
    posterPath: "/ev2GnYar3LUyui8sOu4gqeMXvLi.jpg",
    year: "2026",
    overview:
      "Varios amigos de la infancia se reúnen y el reencuentro se sale de madre cuando acaban metidos en un peligroso complot internacional y se ven obligados a salvar el mundo.",
    rating: 7.8,
  },
  {
    id: 1423191,
    title: "Resident Evil",
    posterPath: "/vrLEVObLGbUinE4sC4Lqao2dK0E.jpg",
    year: "2026",
    overview:
      "Película basada en la saga de videojuegos de Capcom del mismo nombre. En una reinvención totalmente nueva, el mensajero médico Bryan se ve inmerso en una carrera de acción sin descanso por la supervivencia, mientras el caos se desata a su alrededor.",
    rating: 7.3,
  },
  {
    id: 1236045,
    title: "Animales",
    posterPath: "/hhycOr6ji35RMGHnstHN4UKAvR4.jpg",
    year: "2026",
    overview:
      "El secuestro de su hijo obliga a un candidato a la alcaldía de Los Ángeles y a su mujer a reunir el dinero del rescate y a tomar decisiones que podrían destruir sus vidas.",
    rating: 7.1,
  },
  {
    id: 1377237,
    title: "Entrega al límite",
    posterPath: "/pmjSjZtFOYDWhAs4B2AbBE8hTQf.jpg",
    year: "2026",
    overview:
      "Un exsoldado se ve envuelto en una brutal carrera contrarreloj cuando una entrega médica crucial los convierte, a él y a su inesperada compañera, en el objetivo de un cártel despiadado. A medida que la misión se transforma en una cacería mortal, cada desvío, retraso y bala los acerca más al fracaso. Acosados ​​por la traición desde todos los frentes, deberán sobrevivir a la persecución y entregar su carga para salvar la vida de una niña.",
    rating: 8.3,
  },
  {
    id: 1228834,
    title: "Operación Teherán",
    posterPath: "/5uB1PWP3QHEcgMXKChsaYmtTUkQ.jpg",
    year: "2026",
    overview:
      "Tras el final de la guerra en Afganistán, un grupo de exoperadores de la CIA se han quedado marcados por la violencia, el abandono y la culpa. Sin patria ni propósitos a corto plazo, aceptan una última misión y viajan a Teherán para llevar a cabo un golpe arriesgado e ilegal que podría ser su opción para perdonarse a sí mismos o para acabar del todo. Mientras el pasado los persigue y la desconfianza entre ellos va en aumento, la operación se transforma en una prueba moral en la que tendrán que decidir si ser soldados obedientes o son hombres dispuestos a recuperar el control de sus vidas.",
    rating: 6.7,
  },
  // Sin sinopsis en es-ES: la tarjeta simplemente no ofrece overlay.
  {
    id: 1339274,
    title: "No dejes a los niños solos",
    posterPath: "/w01yTCLE2nCSj8IMxUjrc8vIwQ9.jpg",
    year: "2026",
    overview: null,
    rating: 6.8,
  },
  {
    id: 460458,
    title: "Resident Evil. Bienvenidos a Raccoon City",
    posterPath: "/oRIoAzRLtoNO9adWRW0jeGfMr0N.jpg",
    year: "2021",
    overview:
      "Nueva adaptación al cine de los videojuegos de Capcom. La que fue una pujante ciudad sede del gigante farmacéutico Umbrella Corporation, Raccoon City, es ahora un pueblo agonizante del Medio Oeste. El éxodo de la compañía dejó a la ciudad convertida en un erial… con un gran mal gestándose bajo la superficie. Cuando ese mal se desata, un grupo de supervivientes deben unirse para destapar la verdad detrás de Umbrella y sobrevivir a la noche.",
    rating: 5.9,
  },
  // Sin votos: TMDB devuelve 0 y la tarjeta omite la nota.
  {
    id: 1294189,
    title: "The Mongoose",
    posterPath: "/eSS5mvSG84UUuvtbHel5Yu3Wik4.jpg",
    year: "2026",
    overview:
      "Acusado de un delito que no cometió y sin nada que perder, un héroe de guerra llamado Ryan «Fang» Flanagan se enfrenta a las agresivas fuerzas del orden en una persecución en coche por todo el país, con la ayuda de sus compañeros de armas y de un público comprensivo que anima su huida.",
    rating: null,
  },
  {
    id: 1302904,
    title: "Prácticamente magia 2",
    posterPath: "/xCXznyg1BOAKISMuduRJLtcAgCR.jpg",
    year: "2026",
    overview:
      "Las hermanas Owens deben enfrentarse a la oscura maldición que amenaza con desintegrar a su familia de una vez por todas.",
    rating: 6.8,
  },
];
