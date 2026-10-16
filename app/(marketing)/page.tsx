import {
  CapabilityModules,
  CatalogChapters,
  ExploreBand,
  FootageBand,
  MonumentFooter,
  MonumentHero,
  RevealOnScroll,
  SourceShowcase,
} from "@/components/marketing";

/**
 * Portada.
 *
 * Un solo argumento, de arriba abajo: el nombre ocupa la pantalla, el catálogo
 * enseña títulos reales, el reproductor enseña cómo cambia de fuente, el metraje
 * enseña el oficio del que viene la película, las funciones se demuestran con
 * recortes del producto y el verbo final abre el catálogo. El pie devuelve el
 * nombre invertido, como una firma.
 */
export default function HomePage() {
  return (
    <>
      <main className="flex flex-1 flex-col">
        <MonumentHero />
        <CatalogChapters />
        <SourceShowcase />
        <FootageBand />
        <CapabilityModules />
        <ExploreBand />
      </main>

      <MonumentFooter />

      {/* Enciende las entradas por scroll de toda la portada. */}
      <RevealOnScroll />
    </>
  );
}
