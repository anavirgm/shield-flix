import type { ComponentProps } from "react";

import { cn } from "@/utils/cn";

/** Ancho máximo y padding lateral consistentes en todo el sitio. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)} {...props} />;
}
