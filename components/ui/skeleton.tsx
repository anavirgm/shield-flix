import type { ComponentProps } from "react";

import { cn } from "@/utils/cn";

/**
 * Bloque de carga con brillo sutil. Reserva el espacio final del contenido para
 * evitar saltos de layout (CLS) y se oculta a lectores de pantalla: el estado se
 * anuncia en el contenedor con `aria-busy`.
 */
export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn("animate-shimmer rounded-xl bg-surface-hover/60", className)}
      {...props}
    />
  );
}
