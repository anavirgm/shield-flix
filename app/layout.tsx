import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

import "@/styles/globals.css";

/*
 * Tipografía: Geist (sans) + Geist Mono.
 *
 * Se mantiene Geist de forma deliberada aunque el detector de impeccable la
 * marque como `overused-font`: es la fuente del stack Next.js/Vercel, ya viene
 * precargada por el scaffold y su par mono cubre los datos del panel. La
 * excepción queda registrada en `.impeccable/config.json`.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ShieldFlix — Streaming cinematográfico",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:ring-2 focus:ring-ring"
        >
          Saltar al contenido
        </a>

        <Header />

        <div id="contenido" tabIndex={-1} className="flex flex-1 flex-col">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}
