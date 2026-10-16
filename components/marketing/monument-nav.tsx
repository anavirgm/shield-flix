import Link from "next/link";

import { buttonVariants } from "@/components/ui";
import { landingAction, landingLinks } from "@/constants/landing";

/**
 * Retardos escalonados de la entrada. Van como clases (no como `style`) para
 * que la animación siga viviendo en la hoja de estilos.
 */
const linkDelays = [
  "[animation-delay:60ms]",
  "[animation-delay:120ms]",
  "[animation-delay:180ms]",
  "[animation-delay:240ms]",
];

/**
 * Barra de la portada: cuatro enlaces de texto y la única acción, arriba a la
 * derecha. No hay logotipo aquí a propósito: el nombre aparece entero y una
 * sola vez como titular, así que repetirlo en pequeño solo lo gasta.
 */
export function MonumentNav() {
  return (
    <nav
      aria-label="Principal"
      className="animate-enter relative z-10 flex flex-wrap items-center justify-end gap-x-7 gap-y-3"
    >
      <ul className="flex flex-wrap items-center gap-x-7 gap-y-1">
        {landingLinks.map((link, index) => (
          <li key={link.href}>
            <Link
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className={`animate-enter inline-flex h-10 items-center text-base text-muted transition-colors duration-200 ease-out-quart hover:text-foreground ${linkDelays[index] ?? ""}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href={landingAction.href}
        className={buttonVariants({
          size: "lg",
          className: "animate-enter [animation-delay:300ms]",
        })}
      >
        {landingAction.label}
      </Link>
    </nav>
  );
}
