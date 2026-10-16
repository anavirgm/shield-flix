import { z } from "zod";

/**
 * Campos reutilizables para los esquemas de variables de entorno.
 *
 * El objetivo es que un fallo de validación diga exactamente qué variable falta
 * y, cuando aplica, si su formato es incorrecto.
 */

/** Cadena obligatoria: distingue entre "ausente/vacía" y "formato inválido". */
export function requiredString(name: string) {
  return z.string(`${name} es requerida`).min(1, `${name} es requerida`);
}

/** URL obligatoria, con mensajes explícitos para ausencia y formato. */
export function requiredUrl(name: string) {
  return requiredString(name).pipe(z.url(`${name} debe ser una URL válida`));
}
