/**
 * Vista previa del catálogo (snapshot real de TMDB, es-ES).
 *
 * Solo alimenta la landing: son datos e imágenes reales de TMDB descargados el
 * 2026-10-16 para que la portada no dependa de ninguna llamada en
 * tiempo de ejecución. El Sprint 2 sustituye este archivo por la capa de consultas
 * (`features/catalog/queries.ts`) contra la API y Postgres.
 *
 * Atribución obligatoria: TMDB. Ver el pie de la landing.
 */

/** Título con sus rutas de imagen en TMDB (sin el prefijo de tamaño). */
export type PreviewTitle = {
  tmdbId: number;
  title: string;
  year: number;
  rating: number;
  posterPath: string;
  backdropPath: string;
};

/** Título reducido para las filas de una categoría del catálogo. */
export type PreviewRow = {
  tmdbId: number;
  title: string;
  year: number;
  rating: number;
};

/** Categoría del catálogo con sus títulos reales. */
export type PreviewGenre = {
  tmdbId: number;
  name: string;
  titles: PreviewRow[];
};

/** Títulos con imagen: portada, capítulo del catálogo y paneles del reproductor. */
export const PREVIEW_TITLES: PreviewTitle[] = [
  {
    tmdbId: 969681,
    title: "Spider-Man: Brand New Day",
    year: 2026,
    rating: 8.5,
    posterPath: "/9g0sEFhmvmK4nGhXj8DHuv2noYI.jpg",
    backdropPath: "/4tjxYg2AbOzzG9G1YuiT2NzYhlH.jpg",
  },
  {
    tmdbId: 1291595,
    title: "Insidious: Fuera del más allá",
    year: 2026,
    rating: 7.7,
    posterPath: "/uIMddTcnM9P6PrJiDjsXIeYp902.jpg",
    backdropPath: "/p40lmrdI4blcAPZQMTPaiy5v5Ym.jpg",
  },
  {
    tmdbId: 1148365,
    title: "Matchbox: La película",
    year: 2026,
    rating: 7.9,
    posterPath: "/ev2GnYar3LUyui8sOu4gqeMXvLi.jpg",
    backdropPath: "/jdJsnhHfkIi3J7jwfiCFT4gXNx5.jpg",
  },
  {
    tmdbId: 1368337,
    title: "La Odisea",
    year: 2026,
    rating: 8,
    posterPath: "/sf2ke1nwFOLLcwLZiXu9VaMMv8e.jpg",
    backdropPath: "/nVBzWBqHTB3XD0iqWiJLfKLo5fq.jpg",
  },
  {
    tmdbId: 1423191,
    title: "Resident Evil",
    year: 2026,
    rating: 7.3,
    posterPath: "/vrLEVObLGbUinE4sC4Lqao2dK0E.jpg",
    backdropPath: "/3icyRAqgakNcQn6aDVz9libFmBA.jpg",
  },
  {
    tmdbId: 1236045,
    title: "Animales",
    year: 2026,
    rating: 7.2,
    posterPath: "/hhycOr6ji35RMGHnstHN4UKAvR4.jpg",
    backdropPath: "/tzoarEu7TsG959upiELyYPm5kO9.jpg",
  },
  {
    tmdbId: 1377237,
    title: "Entrega al límite",
    year: 2026,
    rating: 8.3,
    posterPath: "/pmjSjZtFOYDWhAs4B2AbBE8hTQf.jpg",
    backdropPath: "/npXZNWjOEYrqdMDPQ11SGBrXqAG.jpg",
  },
  {
    tmdbId: 1228834,
    title: "Operación Teherán",
    year: 2026,
    rating: 6.8,
    posterPath: "/5uB1PWP3QHEcgMXKChsaYmtTUkQ.jpg",
    backdropPath: "/dJTWIecL2vxsCRl5G0lRhPsfrhc.jpg",
  },
  {
    tmdbId: 1058424,
    title: "Hope",
    year: 2026,
    rating: 7,
    posterPath: "/hHPIefotew38oJm3YCJPAzpi26c.jpg",
    backdropPath: "/ujUwzNV8ZkOzZonvhhHsc9KOKDf.jpg",
  },
  {
    tmdbId: 1101412,
    title: "Fall 2: Deadpoint",
    year: 2026,
    rating: 7.3,
    posterPath: "/ccBIyg1ITvuCDr4eMeEH0ZgNh4t.jpg",
    backdropPath: "/nGau0KBOaRILSK5MqFcuTfv7GMl.jpg",
  },
  {
    tmdbId: 1712451,
    title: "Dead Residents Evil",
    year: 2026,
    rating: 5.7,
    posterPath: "/qKhMVWwFikSUzOpkhOl35GBLkGH.jpg",
    backdropPath: "/yKx5gYrYgakKZuUWAsuFDStBroy.jpg",
  },
  {
    tmdbId: 1084244,
    title: "Toy Story 5",
    year: 2026,
    rating: 8.3,
    posterPath: "/pTjZfbFVWUIwUM5OzX3LVh84ejU.jpg",
    backdropPath: "/qjTqY5coNiz6sVtPng40IzltsoN.jpg",
  },
  {
    tmdbId: 1339274,
    title: "No dejes a los niños solos",
    year: 2026,
    rating: 6.8,
    posterPath: "/w01yTCLE2nCSj8IMxUjrc8vIwQ9.jpg",
    backdropPath: "/flo7Xmyxz2wDUjr5Ff0VrxaVwlY.jpg",
  },
  {
    tmdbId: 460458,
    title: "Resident Evil. Bienvenidos a Raccoon City",
    year: 2021,
    rating: 5.9,
    posterPath: "/oRIoAzRLtoNO9adWRW0jeGfMr0N.jpg",
    backdropPath: "/wYtEvBmpBRXPdwGgr1gcWiwJSI7.jpg",
  },
  {
    tmdbId: 1294189,
    title: "The Mongoose",
    year: 2026,
    rating: 0,
    posterPath: "/eSS5mvSG84UUuvtbHel5Yu3Wik4.jpg",
    backdropPath: "/iRIhPqqoUHiFBxn8oYf3gCQnaKk.jpg",
  },
  {
    tmdbId: 1302904,
    title: "Prácticamente magia 2",
    year: 2026,
    rating: 6.7,
    posterPath: "/xCXznyg1BOAKISMuduRJLtcAgCR.jpg",
    backdropPath: "/oIglj0Jy9duG4LnrRUpH8n001Pk.jpg",
  },
];

/** Categorías y sus títulos para las barras del catálogo. */
export const PREVIEW_GENRES: PreviewGenre[] = [
  {
    tmdbId: 28,
    name: "Acción",
    titles: [
      { tmdbId: 969681, title: "Spider-Man: Brand New Day", year: 2026, rating: 8.5 },
      { tmdbId: 1368337, title: "La Odisea", year: 2026, rating: 8 },
      { tmdbId: 1377237, title: "Entrega al límite", year: 2026, rating: 8.3 },
      {
        tmdbId: 460458,
        title: "Resident Evil. Bienvenidos a Raccoon City",
        year: 2021,
        rating: 5.9,
      },
      { tmdbId: 299536, title: "Vengadores: Infinity War", year: 2018, rating: 8.2 },
    ],
  },
  {
    tmdbId: 35,
    name: "Comedia",
    titles: [
      { tmdbId: 1377237, title: "Entrega al límite", year: 2026, rating: 8.3 },
      { tmdbId: 1084244, title: "Toy Story 5", year: 2026, rating: 8.3 },
      { tmdbId: 1204680, title: "Coyote vs. Acme", year: 2026, rating: 7.5 },
      { tmdbId: 1084242, title: "Zootrópolis 2", year: 2025, rating: 7.7 },
      { tmdbId: 1022789, title: "Del revés 2 (Inside Out 2)", year: 2024, rating: 7.5 },
    ],
  },
  {
    tmdbId: 18,
    name: "Drama",
    titles: [
      { tmdbId: 911430, title: "F1 la película", year: 2025, rating: 7.8 },
      { tmdbId: 150540, title: "Del revés (Inside Out)", year: 2015, rating: 7.9 },
      { tmdbId: 157336, title: "Interstellar", year: 2014, rating: 8.5 },
      { tmdbId: 872585, title: "Oppenheimer", year: 2023, rating: 8 },
      { tmdbId: 361743, title: "Top Gun: Maverick", year: 2022, rating: 8.2 },
    ],
  },
  {
    tmdbId: 878,
    name: "Ciencia ficción",
    titles: [
      { tmdbId: 969681, title: "Spider-Man: Brand New Day", year: 2026, rating: 8.5 },
      { tmdbId: 1423191, title: "Resident Evil", year: 2026, rating: 7.3 },
      {
        tmdbId: 460458,
        title: "Resident Evil. Bienvenidos a Raccoon City",
        year: 2021,
        rating: 5.9,
      },
      { tmdbId: 1101383, title: "El final de Oak Street", year: 2026, rating: 7.1 },
      { tmdbId: 299536, title: "Vengadores: Infinity War", year: 2018, rating: 8.2 },
    ],
  },
  {
    tmdbId: 27,
    name: "Terror",
    titles: [
      { tmdbId: 1291595, title: "Insidious: Fuera del más allá", year: 2026, rating: 7.7 },
      { tmdbId: 1423191, title: "Resident Evil", year: 2026, rating: 7.3 },
      {
        tmdbId: 460458,
        title: "Resident Evil. Bienvenidos a Raccoon City",
        year: 2021,
        rating: 5.9,
      },
      { tmdbId: 1339713, title: "Obsession", year: 2026, rating: 8.2 },
      { tmdbId: 1375646, title: "Colony", year: 2026, rating: 8.1 },
    ],
  },
  {
    tmdbId: 16,
    name: "Animación",
    titles: [
      { tmdbId: 1084244, title: "Toy Story 5", year: 2026, rating: 8.3 },
      { tmdbId: 1084242, title: "Zootrópolis 2", year: 2025, rating: 7.7 },
      { tmdbId: 1022789, title: "Del revés 2 (Inside Out 2)", year: 2024, rating: 7.5 },
      { tmdbId: 1315772, title: "Minions & Monsters", year: 2026, rating: 7.6 },
      { tmdbId: 1184918, title: "Robot salvaje", year: 2024, rating: 8.3 },
    ],
  },
];
