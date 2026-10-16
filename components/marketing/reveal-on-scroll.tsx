"use client";

import { useEffect } from "react";

/**
 * Enciende las entradas por scroll.
 *
 * Observa los elementos `.reveal` y les añade `is-revealed` en cuanto entran en
 * pantalla; cada pieza se anima una sola vez y deja de observarse. El escaneo se
 * repite si el DOM crece, porque la portada se puede transmitir por partes.
 *
 * El elemento está visible por defecto: la animación solo existe cuando llega la
 * clase, así que sin JavaScript —o sin `IntersectionObserver`— la página se lee
 * igual, solo que sin entrada.
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      for (const target of document.querySelectorAll(".reveal")) {
        target.classList.add("is-revealed");
      }

      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );

    const scan = () => {
      for (const target of document.querySelectorAll(".reveal:not(.is-revealed)")) {
        observer.observe(target);
      }
    };

    scan();

    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
