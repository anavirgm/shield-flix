import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

/**
 * Marco de la aplicación: cabecera fija y pie para las páginas interiores
 * (design system hoy; catálogo, ficha y panel más adelante).
 *
 * La portada queda fuera de este grupo a propósito: es una página de venta y no
 * lleva la barra de la aplicación.
 */
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
