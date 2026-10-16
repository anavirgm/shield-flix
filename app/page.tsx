export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <span className="rounded-full glass px-4 py-1.5 text-xs font-medium tracking-widest text-muted uppercase">
        Sprint 1 · Core Architecture
      </span>

      <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
        Shield<span className="text-brand">Flix</span>
      </h1>

      <p className="max-w-xl text-pretty text-muted">
        Plataforma de streaming híbrida. Catálogo TMDB, reproductor multi-servidor y panel de
        administración en tiempo real.
      </p>
    </main>
  );
}
