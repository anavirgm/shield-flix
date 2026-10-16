import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases condicionales (`clsx`) y resuelve conflictos entre utilidades
 * de Tailwind (`tailwind-merge`).
 *
 * Es la base de todos los componentes de UI: permite que quien los consume
 * sobrescriba estilos sin pelear con el orden de las clases.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
