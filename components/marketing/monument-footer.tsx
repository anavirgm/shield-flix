import Link from "next/link";

import { PROJECT_URL } from "@/constants/landing";

const footerLinks = [
  { label: "Catálogo", href: "#catalogo" },
  { label: "Funciones", href: "#funciones" },
  { label: "Design system", href: "/design" },
  { label: "GitHub", href: PROJECT_URL, external: true },
];

/**
 * Pie: el nombre vuelve entero, ahora invertido.
 *
 * Es el mismo gesto que abre la página y el cierre del argumento: campo claro,
 * tinta oscura, sin adornos. Debajo van los enlaces y la atribución de TMDB,
 * que es obligatoria al usar sus datos e imágenes en la vista previa.
 */
export function MonumentFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="@container mx-auto flex w-full max-w-[88rem] flex-col gap-16 px-4 pt-20 pb-8 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <ul className="reveal flex flex-col gap-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="text-sm text-background/70 transition-colors duration-200 ease-out-quart hover:text-background"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="reveal max-w-[44ch] text-sm leading-relaxed text-background/70 [animation-delay:80ms] sm:text-right">
            Vista previa construida con datos e imágenes de TMDB. Este producto usa la API de TMDB,
            pero no está respaldado ni certificado por TMDB.
          </p>
        </div>

        <p className="reveal text-right text-[17cqw] leading-[0.85] font-semibold tracking-[-0.05em]">
          ShieldFlix
        </p>
      </div>
    </footer>
  );
}
