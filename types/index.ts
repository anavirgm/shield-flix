/**
 * Punto de entrada único de los tipos compartidos.
 *
 * Agrupa el esquema de Supabase (`database.types.ts`) y las formas de la API
 * de TMDB (`tmdb.ts`) para importar desde `@/types` sin recordar el archivo.
 *
 * Nota: son módulos de solo tipos, por lo que se re-exportan con
 * `export type *` (requerido por `verbatimModuleSyntax`).
 */

export type * from "./database.types";
export type * from "./tmdb";
