import type { ComponentProps } from "react";

import { cn } from "@/utils/cn";

/**
 * Ancho máximo y padding lateral consistentes en todo el sitio.
 *
 * El margen es el mismo que el de las secciones de la portada (16/24px), para
 * que la cabecera, el pie y el contenido compartan una sola línea vertical:
 * en pantallas anchas, todos los bordes izquierdos caen en la misma columna.
 */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6", className)} {...props} />;
}
