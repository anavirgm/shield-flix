import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";

import "@/styles/globals.css";

/*
 * Tipografía: una sola familia, Geist.
 *
 * Se mantiene Geist de forma deliberada aunque el detector de impeccable la
 * marque como `overused-font`: es la fuente del stack Next.js/Vercel, ya viene
 * precargada por el scaffold y cubre todo lo que la interfaz necesita.
 *
 * El par monoespaciado se retiró: la norma del design system reserva la mono
 * para código literal, y no había ni un solo uso en la interfaz. El código
 * hereda la pila monoespaciada del sistema.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ShieldFlix: streaming cinematográfico",
    template: "%s · ShieldFlix",
  },
  description:
    "Plataforma de streaming híbrida: catálogo TMDB, reproductor multi-servidor y panel de administración en tiempo real.",
  applicationName: "ShieldFlix",
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

/**
 * Marco raíz: solo el documento y el contenido.
 *
 * La cabecera y el pie no viven aquí porque la portada no los usa: el nombre de
 * la marca es su titular, así que repetirlo en una barra solo lo gasta. Las
 * páginas interiores aportan su propio marco en `app/(app)/layout.tsx`.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:ring-2 focus:ring-ring"
        >
          Saltar al contenido
        </a>

        <div id="contenido" tabIndex={-1} className="flex flex-1 flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
