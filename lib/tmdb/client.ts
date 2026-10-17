import "server-only";

import type { ZodType } from "zod";

import { TMDB_LANGUAGE, TMDB_TIMEOUT_MS } from "@/constants/tmdb";
import { getServerEnv } from "@/lib/env/server";

import { TmdbError, tmdbErrorCodeForStatus } from "./errors";
import { parseTmdbPayload } from "./guards";

/**
 * Transporte de bajo nivel contra la API v3 de TMDB.
 *
 * Este módulo no conoce el dominio: sabe autenticar, serializar la query,
 * cortar por timeout y convertir cualquier fallo en un `TmdbError`. Las consultas
 * con significado (`getTrendingMovies`, `getMovieDetails`…) viven en
 * `queries.ts`, que es lo que debe consumir la app.
 *
 * `server-only` es la garantía dura de que la clave no acaba en el bundle del
 * navegador: si un componente de cliente importa este archivo, la compilación
 * falla antes de filtrar nada.
 */

/** Valor admitido en la query. `undefined` se descarta (no se envía "undefined"). */
export type TmdbQueryValue = string | number | boolean | undefined;

/** Opciones de una petición a TMDB. */
export type TmdbRequestOptions = {
  /** Parámetros de la query, en el dialecto de TMDB (`with_genres`, `sort_by`…). */
  query?: Record<string, TmdbQueryValue>;
  /** Guarda estructural del payload esperado (ver `guards.ts`). */
  guard?: ZodType;
};

/**
 * Ejecuta un `GET` contra TMDB y devuelve el payload ya validado.
 *
 * Sin caché propia: la política de caché es decisión de cada consulta
 * (`cacheLife` + `cacheTag` en `queries.ts`), porque no caduca lo mismo una
 * tendencia que un listado de géneros.
 */
export async function tmdbFetch<T>(path: string, options: TmdbRequestOptions = {}): Promise<T> {
  const { TMDB_API_KEY, TMDB_BASE_URL } = getServerEnv();

  const url = buildUrl(TMDB_BASE_URL, path, {
    api_key: TMDB_API_KEY,
    language: TMDB_LANGUAGE,
    ...options.query,
  });

  const response = await request(url, path);
  const payload = await readPayload(response, path);

  // Única asunción del módulo: el payload pasó la guarda estructural y el
  // contrato de campos es el que documenta `types/tmdb.ts`.
  return parseTmdbPayload(payload, options.guard, path) as T;
}

/** Compone la URL final. Los parámetros sin valor no se envían. */
function buildUrl(baseUrl: string, path: string, params: Record<string, TmdbQueryValue>): string {
  const url = new URL(`${baseUrl.replace(/\/+$/, "")}${path}`);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  return url.toString();
}

/** Lanza la petición y traduce los fallos de red/tiempo a `TmdbError`. */
async function request(url: string, path: string): Promise<Response> {
  try {
    return await fetch(url, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(TMDB_TIMEOUT_MS),
    });
  } catch (error) {
    const aborted =
      error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError");

    throw new TmdbError({
      code: aborted ? "timeout" : "network",
      path,
      cause: error,
    });
  }
}

/** Lee el cuerpo: comprueba el estado y exige JSON válido. */
async function readPayload(response: Response, path: string): Promise<unknown> {
  if (!response.ok) {
    throw new TmdbError({
      code: tmdbErrorCodeForStatus(response.status),
      path,
      status: response.status,
      detail: await readErrorMessage(response),
    });
  }

  try {
    return await response.json();
  } catch (error) {
    throw new TmdbError({
      code: "invalid_response",
      path,
      status: response.status,
      detail: "El cuerpo de la respuesta no es JSON válido.",
      cause: error,
    });
  }
}

/** TMDB explica sus errores como `{ status_message }`; se aprovecha para el log. */
async function readErrorMessage(response: Response): Promise<string | undefined> {
  try {
    const body: unknown = await response.json();
    const message =
      body !== null && typeof body === "object" ? Reflect.get(body, "status_message") : undefined;

    return typeof message === "string" ? message : undefined;
  } catch {
    return undefined;
  }
}
