/**
 * Contenido y enlaces de la portada pública.
 *
 * La portada es una sola página de anclas (`#catalogo`, `#reproductor`,
 * `#funciones`, `#explorar`), así que sus enlaces viven aquí y no en
 * `constants/navigation.ts`, que describe la navegación de la aplicación.
 */
export type LandingLink = {
  label: string;
  href: string;
  external?: boolean;
};

/** Repositorio público: el destino real del proyecto durante el Sprint 1. */
export const PROJECT_URL = "https://github.com/anavirgm/shield-flix";

/**
 * Los cuatro enlaces de texto de la portada. Van arriba a la derecha, sin
 * logotipo: el nombre de la marca es el titular del hero, no una repetición.
 */
export const landingLinks: LandingLink[] = [
  { label: "Catálogo", href: "#catalogo" },
  { label: "Reproductor", href: "#reproductor" },
  { label: "Funciones", href: "#funciones" },
  { label: "Proyecto", href: PROJECT_URL, external: true },
];

/** La única acción de la portada: abre el catálogo. */
export const landingAction: LandingLink = {
  label: "Explorar",
  href: "#catalogo",
};
