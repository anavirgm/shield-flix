import { MonumentNav } from "@/components/marketing/monument-nav";
import { LANDING_HERO } from "@/features/catalog/data/landing-roles";
import { tmdbImageUrl } from "@/lib/tmdb/image";

/**
 * Portada: el nombre ocupa la página entera y una fotografía lo cruza.
 *
 * Composición (escritorio): la fotografía llena la columna izquierda, la frase
 * de apoyo se centra en la mitad derecha al 42% de alto y el nombre corre por
 * el borde inferior, terminando en el margen derecho y solapando la esquina
 * inferior derecha de la fotografía.
 *
 * En móvil la fotografía sube arriba a ancho completo y el nombre la sigue.
 */
export function MonumentHero() {
  const poster = tmdbImageUrl(LANDING_HERO.posterPath, "w780");
  const art = `Póster de ${LANDING_HERO.title}`;

  return (
    <section
      id="inicio"
      aria-labelledby="portada-nombre"
      className="relative isolate flex min-h-svh flex-col overflow-x-clip px-4 pt-4 pb-6 sm:px-6 sm:pt-6"
    >
      {/* Fotografía insertada: columna izquierda en escritorio. Va recortada por
          su envoltorio para que el desplazamiento lento no se salga del marco. */}
      <div className="absolute inset-y-6 left-6 hidden w-[45%] overflow-hidden rounded-xl lg:block">
        {poster ? (
          <img
            src={poster}
            alt={art}
            width={780}
            height={1170}
            loading="lazy"
            className="drift size-full rounded-xl object-cover"
          />
        ) : null}

        {/* Velo de legibilidad: solo donde el nombre cruza la fotografía. Es un
            scrim neutro (mismo tono, distinta opacidad), no decoración. */}
        <div aria-hidden="true" className="absolute inset-0 rounded-xl scrim-right" />
      </div>

      <MonumentNav />

      {/* Fotografía insertada: en móvil y tableta va arriba, a ancho completo. */}
      <div className="relative mt-5 lg:hidden">
        {poster ? (
          <img
            src={poster}
            alt={art}
            width={780}
            height={1170}
            loading="lazy"
            className="h-[46svh] w-full rounded-xl object-cover"
          />
        ) : null}
        <div aria-hidden="true" className="absolute inset-0 rounded-xl scrim-veil" />
      </div>

      {/* El monumento. El envoltorio entra al cargar; el nombre, además, se
          encoge un 7% mientras la portada sale de pantalla. Va antes que la
          frase en el flujo para que en móvil el nombre caiga dentro de la
          primera pantalla: es el titular, no un cierre. */}
      <div className="animate-enter relative z-10 mt-auto pt-10 [animation-delay:320ms]">
        <h1
          id="portada-nombre"
          className="monument-scale text-right text-[clamp(2.75rem,16vw,5rem)] leading-[0.82] font-semibold tracking-[-0.045em] text-foreground lg:text-[clamp(5rem,11.4vw,16rem)]"
        >
          ShieldFlix
        </h1>
      </div>

      {/* Una sola frase de apoyo. En escritorio se sale del flujo y se centra en
          la mitad derecha; en móvil queda debajo del nombre. */}
      <p className="animate-enter relative z-10 mt-7 max-w-[30ch] text-2xl leading-snug text-pretty text-foreground [animation-delay:180ms] lg:absolute lg:top-[42%] lg:left-1/2 lg:mt-0 lg:w-1/2 lg:max-w-none lg:px-8 lg:text-center lg:[animation-delay:260ms]">
        Cine y series con ficha completa y varias fuentes.
      </p>
    </section>
  );
}
