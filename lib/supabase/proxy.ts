import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { clientEnv } from "@/lib/env/client";
import type { Database } from "@/types/database.types";

/**
 * Refresca la sesión de Supabase en cada request.
 *
 * En Next.js 16 el antiguo `middleware` se llama `proxy`; el archivo raíz
 * `proxy.ts` delega en esta función.
 *
 * Flujo:
 *  1. Se leen las cookies del request.
 *  2. Se llama a `auth.getUser()`, que valida el token contra Supabase Auth y,
 *     si expiró, lo refresca.
 *  3. Las cookies nuevas se escriben en el request (para los componentes que se
 *     renderizan después) y en la respuesta (para el navegador).
 *
 * Nota: en este punto solo se hacen comprobaciones "optimistas" (por ejemplo,
 * redirigir a `/login`). La autorización real siempre se valida en el servidor,
 * cerca de los datos (Data Access Layer).
 */
export async function updateSupabaseSession(request: NextRequest): Promise<NextResponse> {
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });

          // Cabeceras que impiden que un CDN o proxy cachee una respuesta que
          // transporta cookies de sesión.
          Object.entries(headers).forEach(([key, value]) => {
            response.headers.set(key, value);
          });
        },
      },
    },
  );

  // Debe ejecutarse antes de generar la respuesta: si el refresco termina
  // después de enviar los headers, las cookies nuevas se pierden.
  await supabase.auth.getUser();

  return response;
}
