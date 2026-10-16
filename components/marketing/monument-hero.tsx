import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui";
import { landingAction } from "@/constants/landing";
import { LANDING_HERO } from "@/features/catalog/data/landing-roles";
import { tmdbImageUrl } from "@/lib/tmdb/image";
import { cn } from "@/utils/cn";

/**
 * Portada: el nombre ocupa el ancho entero y una fotografía lo cruza.
 *
 * Composición (escritorio): la fotografía llena la mitad izquierda de arriba
 * abajo; el nombre corre por el borde inferior, de margen a margen, y cruza la
 * esquina inferior derecha de la fotografía. Justo encima del nombre, anclados
 * a ese mismo margen derecho, van la frase que dice qué es esto y la acción.
 *
 * En móvil la fotografía sube arriba a ancho completo, el nombre la sigue y la
 * frase y la acción quedan debajo: el orden del flujo es el de la pantalla.
 */
export function MonumentHero() {
  const poster = tmdbImageUrl(LANDING_HERO.posterPath, "w780");
  const art = `Póster de ${LANDING_HERO.title}`;

  return (
    <section
      id="inicio"
      aria-labelledby="portada-nombre"
      className="relative isolate flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col overflow-x-clip px-4 pt-6 pb-6 sm:px-6 sm:pt-8"
    >
      {/* Fotografía insertada: media columna izquierda, de arriba abajo. La
          recorta su envoltorio para que el desplazamiento lento no se salga del
          marco. Dos velos de legibilidad: uno inferior, por donde cruza el
          nombre, y otro hacia el centro, que es donde se apoya su último tramo. */}
      <div className="absolute inset-y-6 left-6 hidden w-[52%] overflow-hidden rounded-xl lg:block">
        {poster ? (
          <img
            src={poster}
            alt={art}
            width={780}
            height={1170}
            className="drift size-full rounded-xl object-cover"
          />
        ) : null}

        <div aria-hidden="true" className="absolute inset-0 rounded-xl scrim-band" />
        <div aria-hidden="true" className="absolute inset-0 rounded-xl scrim-right" />
      </div>

      {/* Fotografía insertada: en móvil y tableta va arriba, a ancho completo. */}
      <div className="relative lg:hidden">
        {poster ? (
          <img
            src={poster}
            alt={art}
            width={780}
            height={1170}
            loading="lazy"
            className="h-[42svh] w-full rounded-xl object-cover"
          />
        ) : null}
        <div aria-hidden="true" className="absolute inset-0 rounded-xl scrim-veil" />
      </div>

      {/* El monumento. Va antes que la frase en el flujo para que en móvil el
          nombre caiga dentro de la primera pantalla: es el titular, no un
          cierre. En escritorio lo adelanta el orden de las piezas. */}
      <div className="animate-enter relative z-10 mt-8 pt-6 [animation-delay:320ms] lg:order-last lg:mt-0 lg:pt-12">
        <h1
          id="portada-nombre"
          className="monument-scale text-right text-[clamp(2.75rem,16vw,5rem)] leading-[0.82] font-semibold tracking-[-0.045em] text-foreground lg:text-[clamp(5rem,11.4vw,16rem)]"
        >
          ShieldFlix
        </h1>
      </div>

      {/* Una sola frase de apoyo y la acción, en el margen derecho: el mismo
          borde donde termina el nombre. En escritorio el bloque se apoya en el
          fondo, por delante del nombre; en móvil cae debajo.
          El bloque empieza donde termina la fotografía (52vw + un respiro), así
          la frase nunca cae sobre el arte: sobre la foto solo cruza el nombre.
          La etiqueta del botón va a tamaño de frase (24px): es la acción de la
          portada, no un control de barra, y a ese tamaño el bloque pesa lo que
          pesa la frase que lo acompaña. */}
      <div className="animate-enter relative z-10 mt-8 flex flex-col items-start gap-7 [animation-delay:180ms] lg:order-first lg:mt-auto lg:items-end lg:pl-[calc(52vw_+_1.5rem)] lg:text-right">
        <p className="max-w-[36ch] text-2xl leading-snug text-pretty text-foreground">
          Cine y series con ficha completa, historial de visionado y varias fuentes de reproducción.
        </p>

        <Link
          href={landingAction.href}
          className={cn(buttonVariants({ size: "lg" }), "h-14 text-2xl [&_svg]:size-6")}
        >
          {landingAction.label}
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
