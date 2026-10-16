/**
 * Contenido y enlaces de la portada pública.
 *
 * La portada es una sola página de anclas (`#catalogo`, `#reproductor`,
 * `#funciones`), así que su acción vive aquí y no en
 * `constants/navigation.ts`, que describe la navegación de todo el sitio.
 */
export type LandingLink = {
  label: string;
  href: string;
  external?: boolean;
};

/** Repositorio público: el destino real del proyecto durante el Sprint 1. */
export const PROJECT_URL = "https://github.com/anavirgm/shield-flix";

/** La única acción de la portada: abre el catálogo. */
export const landingAction: LandingLink = {
  label: "Explorar el catálogo",
  href: "#catalogo",
};
