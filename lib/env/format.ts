import type { ZodError } from "zod";

/**
 * Construye un mensaje de error legible a partir de un fallo de validación de
 * variables de entorno, indicando exactamente qué variable falta o es inválida.
 */
export function formatEnvError(scope: string, error: ZodError): string {
  const details = error.issues
    .map((issue) => `  - ${issue.path.map(String).join(".") || "(raíz)"}: ${issue.message}`)
    .join("\n");

  return [
    `Variables de entorno inválidas o ausentes (${scope}).`,
    details,
    "",
    "Copia .env.example a .env.local y completa los valores faltantes.",
  ].join("\n");
}
