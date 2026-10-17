/**
 * Errores del cliente de TMDB.
 *
 * Cualquier fallo de la API —red caída, timeout, clave inválida, 404, un payload
 * que no encaja— sale de `lib/tmdb` como un `TmdbError` con un `code` cerrado.
 *
 * La consecuencia práctica: el resto de la app **no inspecciona `Response` ni
 * códigos HTTP**. Decide con `error.code` y muestra `error.userMessage`. Si
 * mañana TMDB devuelve un 402 que nadie previó, se mapea aquí una vez y todas
 * las pantallas heredan el comportamiento.
 *
 * Sobre la clave: viaja como query param (API v3), así que el mensaje técnico
 * nunca incluye la URL completa, solo la ruta. Un error de TMDB no puede acabar
 * filtrando `TMDB_API_KEY` en un log o en una traza.
 *
 * ## Por qué las consultas no lanzan
 *
 * `use cache` **serializa** el resultado de la función, y al hacerlo reconstruye
 * los errores: comprobado en este proyecto, un `TmdbError` que cruza esa frontera
 * vuelve como un `Error` plano y pierde `code`, `path` y `status` (solo
 * sobreviven `name`, `message` y `cause`). Es decir, lanzar desde una consulta
 * cacheada rompería justo lo que este módulo promete: que quien consume pueda
 * distinguir *no encontrado* de *sin conexión*.
 *
 * Por eso las consultas de `queries.ts` devuelven `TmdbResult<T>` —un objeto
 * serializable— en lugar de lanzar, y el único sitio que convierte un
 * `TmdbError` en ese objeto es `runTmdbQuery`. Los fallos esperados (404, red)
 * dejan de viajar como excepciones y pasan a ser un estado que la interfaz pinta.
 */

/** Motivos por los que una consulta a TMDB puede fallar. */
export type TmdbErrorCode =
  | "unauthorized"
  | "not_found"
  | "rate_limited"
  | "invalid_response"
  | "timeout"
  | "network"
  | "http";

/** Contexto con el que se construye un `TmdbError`. */
export type TmdbErrorInit = {
  code: TmdbErrorCode;
  /** Ruta de la API, sin clave ni query (`/movie/550`). */
  path: string;
  status?: number;
  /** Mensaje técnico de TMDB o del sistema. Para logs, nunca para la interfaz. */
  detail?: string;
  cause?: unknown;
};

/** Traducción de cada código a un mensaje apto para la interfaz. */
const USER_MESSAGES: Record<TmdbErrorCode, string> = {
  unauthorized: "El catálogo no está disponible ahora mismo (clave de TMDB rechazada).",
  not_found: "No encontramos ese título en el catálogo.",
  rate_limited: "El catálogo está recibiendo demasiadas peticiones. Inténtalo en un momento.",
  invalid_response: "El catálogo devolvió datos con un formato inesperado.",
  timeout: "El catálogo tardó demasiado en responder. Inténtalo de nuevo.",
  network: "No pudimos conectar con el catálogo. Comprueba tu conexión.",
  http: "El catálogo devolvió un error inesperado.",
};

/** Error del cliente de TMDB: un código cerrado y un mensaje para el usuario. */
export class TmdbError extends Error {
  readonly code: TmdbErrorCode;
  readonly path: string;
  readonly status: number | undefined;
  readonly detail: string | undefined;

  constructor(init: TmdbErrorInit) {
    const status = init.status === undefined ? "" : ` ${init.status}`;
    const detail = init.detail ? ` — ${init.detail}` : "";

    super(`TMDB ${init.code}${status} en ${init.path}${detail}`, { cause: init.cause });

    this.name = "TmdbError";
    this.code = init.code;
    this.path = init.path;
    this.status = init.status;
    this.detail = init.detail;
  }

  /** Mensaje listo para pintar en la interfaz (nunca incluye la clave). */
  get userMessage(): string {
    return USER_MESSAGES[this.code];
  }
}

/** Discrimina un error del cliente del resto de errores (bug, cancelación, etc.). */
export function isTmdbError(value: unknown): value is TmdbError {
  return value instanceof TmdbError;
}

/**
 * Traduce un estado HTTP de TMDB a un código propio.
 *
 * Centralizarlo evita que cada consulta repita `if (status === 401)`: el día que
 * haga falta tratar un 423 o distinguir 401 de 403, se cambia aquí.
 */
export function tmdbErrorCodeForStatus(status: number): TmdbErrorCode {
  if (status === 401 || status === 403) return "unauthorized";
  if (status === 404) return "not_found";
  if (status === 429) return "rate_limited";

  return "http";
}

/**
 * Fallo en forma serializable.
 *
 * Es el `TmdbError` sin la parte que no sobrevive a la caché: mismos datos
 * útiles (`code`, `path`, `status`, `userMessage`), pero como objeto plano.
 */
export type TmdbFailure = {
  code: TmdbErrorCode;
  /** Ruta de la API, sin clave ni query. */
  path: string;
  status?: number;
  /** Mensaje técnico para logs. */
  detail?: string;
  /** Mensaje apto para la interfaz. */
  userMessage: string;
};

/** Resultado de una consulta: o trae datos, o trae un fallo. Nunca ambos. */
export type TmdbResult<T> = { ok: true; data: T } | { ok: false; error: TmdbFailure };

/** Convierte un `TmdbError` en su forma serializable. */
export function toTmdbFailure(error: TmdbError): TmdbFailure {
  return {
    code: error.code,
    path: error.path,
    status: error.status,
    detail: error.detail,
    userMessage: error.userMessage,
  };
}

/**
 * Ejecuta una consulta y convierte el fallo de TMDB en un resultado.
 *
 * Se llama **dentro** de la función cacheada (el error todavía es un `TmdbError`
 * de verdad) y devuelve algo que la caché puede guardar y devolver entero.
 *
 * Un error que no sea de TMDB se propaga: eso ya no es "el catálogo falló", es
 * un bug, y debe llegar al error boundary con su traza intacta.
 */
export async function runTmdbQuery<T>(operation: () => Promise<T>): Promise<TmdbResult<T>> {
  try {
    return { ok: true, data: await operation() };
  } catch (error) {
    if (isTmdbError(error)) {
      return { ok: false, error: toTmdbFailure(error) };
    }

    throw error;
  }
}
