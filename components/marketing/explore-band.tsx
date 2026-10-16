import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * Cierre: una sola palabra es el botón.
 *
 * La banda entera es un enlace al catálogo, en el color de marca y a sangre. El
 * verbo se mide en `cqw`, así que llena exactamente el ancho disponible en
 * cualquier pantalla, y al pasar el ratón el campo y la palabra intercambian
 * sus colores.
 */
export function ExploreBand() {
  return (
    <Link
      href="#catalogo"
      className="group @container flex min-h-[60svh] flex-col justify-between bg-brand-strong px-6 pt-10 pb-6 text-white transition-colors duration-300 ease-out-quart hover:bg-foreground sm:px-10 sm:pt-14 sm:pb-8"
    >
      <div className="flex items-start justify-between gap-6">
        <p className="reveal max-w-[32ch] text-base leading-relaxed transition-colors duration-300 ease-out-quart group-hover:text-background sm:text-lg">
          Abre el catálogo y mira qué hay dentro: seis categorías con títulos reales de TMDB y su
          nota media.
        </p>
        <ArrowUpRight
          className="reveal size-10 shrink-0 transition-colors duration-300 ease-out-quart group-hover:text-brand-strong sm:size-14"
          aria-hidden="true"
        />
      </div>

      <span className="reveal block text-[21cqw] leading-[0.85] font-semibold tracking-[-0.05em] transition-colors duration-300 ease-out-quart group-hover:text-brand-strong">
        Explorar
      </span>
    </Link>
  );
}
