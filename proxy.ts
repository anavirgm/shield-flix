import type { NextRequest } from "next/server";

import { updateSupabaseSession } from "@/lib/supabase/proxy";

/**
 * Proxy de Next.js 16 (equivalente al antiguo `middleware.ts`).
 *
 * Se ejecuta antes de renderizar cualquier ruta y mantiene viva la sesión de
 * Supabase (refresco de token) en cada request.
 *
 * Sprint 3 añadirá aquí las comprobaciones optimistas de rutas protegidas
 * (`/admin`, `/mi-lista`), redirigiendo a `/login` cuando no haya sesión.
 */
export async function proxy(request: NextRequest) {
  return updateSupabaseSession(request);
}

export const config = {
  matcher: [
    /*
     * Todas las rutas excepto:
     *  - `_next/static` y `_next/image` (assets de build)
     *  - `favicon.ico`
     *  - imágenes y fuentes estáticas
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff|woff2)$).*)",
  ],
};
