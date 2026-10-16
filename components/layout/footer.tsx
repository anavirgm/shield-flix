import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/container";

const footerLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "Design system", href: "/design" },
  { label: "GitHub", href: "https://github.com/anavirgm/shield-flix", external: true },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/30">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand-soft">
            <ShieldCheck className="size-4" aria-hidden="true" />
          </span>
          <p className="text-sm text-pretty text-muted">
            <span className="font-medium text-foreground">ShieldFlix</span> — catálogo, reproductor
            multi-servidor y panel de administración.
          </p>
        </div>

        <nav aria-label="Secundaria">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className="text-muted transition-colors duration-200 hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <Container className="border-t border-border/60 py-6">
        <p className="text-xs text-muted">
          © ShieldFlix — Proyecto de portafolio. Datos de catálogo por TMDB.
        </p>
      </Container>
    </footer>
  );
}
