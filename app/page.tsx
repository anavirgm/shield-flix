import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button, Input, buttonVariants } from "@/components/ui";
import { cn } from "@/utils/cn";

/** Secuencia real del producto; el orden aporta información. */
const steps = [
  {
    title: "Busca el título",
    description:
      "Catálogo de TMDB siempre actualizado: películas, series y personas en una sola búsqueda.",
  },
  {
    title: "Elige servidor",
    description:
      "Comprobamos vidsrc y fuentes alternativas en tiempo real y priorizamos la reproducción estable.",
  },
  {
    title: "Dale play",
    description:
      "Reproductor nativo con calidad adaptativa y sin salir de ShieldFlix. Continúa donde lo dejaste.",
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative isolate border-b border-border/60 bg-hero-glow">
        <Container className="flex flex-col items-center gap-7 py-20 text-center sm:py-28">
          <h1
            className="max-w-4xl animate-rise text-4xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "40ms" }}
          >
            Todo tu cine, en un solo lugar.
          </h1>

          <p
            className="max-w-2xl animate-rise text-lg text-pretty text-muted"
            style={{ animationDelay: "120ms" }}
          >
            ShieldFlix combina el catálogo de TMDB con un reproductor multi-servidor y un panel de
            administración en tiempo real: busca, elige servidor y reproduce.
          </p>

          <form
            role="search"
            action="/"
            className="mt-2 w-full max-w-xl animate-rise"
            style={{ animationDelay: "200ms" }}
          >
            <label htmlFor="hero-search" className="sr-only">
              Buscar películas o series
            </label>
            <div className="flex items-center gap-2 rounded-xl glass p-2 shadow-elevated">
              <Search className="ml-1.5 size-5 shrink-0 text-muted" aria-hidden="true" />
              <Input
                id="hero-search"
                name="q"
                placeholder="Buscar películas, series, personas…"
                className="border-transparent bg-transparent focus-visible:ring-0"
              />
              <Button type="submit" className="shrink-0">
                Buscar
              </Button>
            </div>
          </form>

          <Link
            href="#como-funciona"
            className="inline-flex animate-rise items-center gap-2 rounded-lg text-sm font-medium text-muted transition-colors duration-200 hover:text-foreground"
            style={{ animationDelay: "280ms" }}
          >
            Ver cómo funciona
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Container>
      </section>

      <section id="como-funciona" className="scroll-mt-24 py-20">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Cómo funciona
            </h2>
            <p className="max-w-2xl text-pretty text-muted">
              Tres pasos, cero fricción. El reproductor resuelve la disponibilidad entre varios
              servidores y elige el que mejor responde.
            </p>
          </div>

          <ol className="grid gap-10 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="flex flex-col gap-4">
                <span className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand/15 text-sm font-semibold text-brand-soft ring-1 ring-brand/30 ring-inset">
                    {index + 1}
                  </span>
                  <span
                    className="h-px flex-1 bg-gradient-to-r from-border to-transparent"
                    aria-hidden="true"
                  />
                </span>
                <h3 className="text-lg font-medium">{step.title}</h3>
                <p className="text-sm text-pretty text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="flex flex-col gap-6 rounded-xl glass p-8 shadow-elevated sm:flex-row sm:items-center sm:justify-between sm:p-12">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                El catálogo llega en el próximo sprint
              </h2>
              <p className="max-w-xl text-pretty text-muted">
                Búsqueda, tendencias y ficha de título sobre datos reales de TMDB, con el
                reproductor multi-servidor conectado de punta a punta.
              </p>
            </div>

            <Link
              href="https://github.com/anavirgm/shield-flix"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "shrink-0")}
            >
              Seguir el progreso
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
