"use client";

import { Children, useCallback, useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui";
import { cn } from "@/utils/cn";

/**
 * Fila horizontal de tarjetas para el catálogo.
 *
 * Recibe las tarjetas ya renderizadas como `children` y solo se ocupa del
 * movimiento: así la fila se puede alimentar desde un componente de servidor
 * (que es quien consulta TMDB) sin obligar a que la tarjeta entera sea de
 * cliente. Cada hijo se envuelve en un `<li>` con el ancho de la fila, de modo
 * que todas las tarjetas de la portada miden lo mismo sin repetirlo en cada uso.
 *
 * Por qué es cliente: las flechas necesitan saber si la fila está al principio o
 * al final para no ofrecer un control que no haría nada, y eso solo se sabe
 * midiendo el desplazamiento en el navegador.
 *
 * Desplazamiento, en las tres formas que admite el sistema:
 * - Rueda y panel táctil: desplazamiento nativo del contenedor.
 * - Táctil: el arrastre es el del navegador, con su inercia y su rebote. Es más
 *   suave y más accesible que un arrastre propio con punteros, que pelearía con
 *   el scroll de la página y se comería los clics de las tarjetas.
 * - Teclado: las flechas «anterior»/«siguiente» y el propio contenedor (tiene
 *   foco y responde a las flechas del teclado), que es lo que exige el patrón de
 *   carrusel para que la fila no dependa solo del ratón.
 *
 * `scroll-snap` alinea las tarjetas al soltar, y con «reducir movimiento» el
 * salto de las flechas deja de ser animado.
 */
type MovieSliderProps = {
  /** Título visible de la fila; también da nombre accesible al carrusel. */
  heading: string;
  /**
   * Nivel del encabezado. Las filas de la portada cuelgan de su `h1` (nivel 2,
   * por defecto). Cuando la fila va dentro de una sección que ya abre con `h2`
   * —la propia página de diseño—, bajar a `h3` evita dos encabezados hermanos
   * del mismo nivel.
   */
  headingLevel?: 2 | 3;
  /** Tarjetas de la fila. */
  children: ReactNode;
  className?: string;
};

export function MovieSlider({ heading, headingLevel = 2, children, className }: MovieSliderProps) {
  const headingId = useId();
  const railRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const sync = () => {
      const max = rail.scrollWidth - rail.clientWidth;

      setEdges({
        // Un píxel de holgura: los navegadores redondean `scrollLeft` a enteros.
        start: rail.scrollLeft <= 1,
        end: max <= 1 || rail.scrollLeft >= max - 1,
      });
    };

    sync();
    rail.addEventListener("scroll", sync, { passive: true });

    // Un solo observador para la fila y sus tarjetas: cubre el cambio de ancho
    // de la ventana y el de la propia lista cuando llegan más títulos.
    const observer = new ResizeObserver(sync);
    observer.observe(rail);
    for (const item of Array.from(rail.children)) observer.observe(item);

    return () => {
      rail.removeEventListener("scroll", sync);
      observer.disconnect();
    };
  }, [children]);

  const scrollByPage = useCallback((direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Un 90 % del ancho deja asomar la tarjeta siguiente: la fila nunca salta a
    // ciegas, y el `scroll-snap` vuelve a alinear al terminar el movimiento.
    rail.scrollBy({
      left: direction * rail.clientWidth * 0.9,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, []);

  const count = Children.count(children);

  // Sin títulos no hay fila: mejor no pintar un encabezado sobre un hueco vacío.
  if (count === 0) return null;

  const Heading = headingLevel === 3 ? "h3" : "h2";
  const hasOverflow = !edges.start || !edges.end;

  return (
    <section aria-labelledby={headingId} className={cn("flex flex-col gap-4", className)}>
      <Heading
        id={headingId}
        className={cn(
          "tracking-tight",
          headingLevel === 3 ? "text-lg font-medium" : "text-2xl font-semibold",
        )}
      >
        {heading}
      </Heading>

      <div className="relative">
        <ul
          ref={railRef}
          // Con foco propio, la fila se recorre con las flechas del teclado
          // aunque ninguna tarjeta sea enlace. El foco dibuja el anillo del
          // sistema (`:focus-visible` global), así que no lleva estilo extra.
          tabIndex={0}
          aria-labelledby={headingId}
          // `pb-4` son los 16 px de aire inferior que necesita la sombra del
          // hover: alcance exacto de `shadow-elevated` bajo la tarjeta
          // (desplazamiento 12 + desenfoque 16 - extensión 12). Sin esa
          // holgura, el `overflow-x` recortaría la sombra.
          className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4"
        >
          {Children.map(children, (item) => (
            <li className="w-36 shrink-0 snap-start sm:w-44 lg:w-48">{item}</li>
          ))}
        </ul>

        {hasOverflow && !edges.start ? (
          <Button
            variant="secondary"
            size="icon"
            aria-label="Ver los títulos anteriores"
            onClick={() => scrollByPage(-1)}
            // En pantallas táctiles el arrastre sustituye a la flecha, y dos
            // botones de 44 px sobre pósteres estrechos taparían las tarjetas.
            className="absolute top-1/2 left-2 -translate-y-1/2 max-sm:hidden"
          >
            <ChevronLeft aria-hidden="true" />
          </Button>
        ) : null}

        {hasOverflow && !edges.end ? (
          <Button
            variant="secondary"
            size="icon"
            aria-label="Ver los títulos siguientes"
            onClick={() => scrollByPage(1)}
            className="absolute top-1/2 right-2 -translate-y-1/2 max-sm:hidden"
          >
            <ChevronRight aria-hidden="true" />
          </Button>
        ) : null}
      </div>
    </section>
  );
}
