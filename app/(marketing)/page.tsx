import { Hero } from "@/components/catalog";
import {
  CapabilityModules,
  CatalogChapters,
  ExploreBand,
  FootageBand,
  RevealOnScroll,
  SourceShowcase,
} from "@/components/marketing";
import { getHeroContent } from "@/features/catalog/hero";

/**
 * Portada.
 *
 * Un solo argumento, de arriba abajo: la portada enseña la película que ahora
 * mismo destaca en el catálogo (dato real de TMDB, cacheado), el catálogo enseña
 * títulos reales, el reproductor enseña cómo cambia de fuente, el metraje enseña
 * el oficio del que viene la película, las funciones se demuestran con recortes
 * del producto y el verbo final abre el catálogo.
 *
 * Si la portada no tiene contenido (TMDB no responde), no deja un hueco: la
 * página empieza en el bloque siguiente.
 *
 * La cabecera y el pie los pone el marco raíz: son los mismos de todo el sitio.
 */
export default async function HomePage() {
  const hero = await getHeroContent();

  return (
    <>
      <main className="flex flex-1 flex-col">
        {hero ? <Hero content={hero} /> : null}
        <CatalogChapters />
        <SourceShowcase />
        <FootageBand />
        <CapabilityModules />
        <ExploreBand />
      </main>

      {/* Enciende las entradas por scroll de toda la portada. */}
      <RevealOnScroll />
    </>
  );
}
