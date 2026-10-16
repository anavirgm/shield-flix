import "server-only";

import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

import { clientEnv } from "@/lib/env/client";
import type { Database } from "@/types/database.types";

/**
 * Cliente de Supabase para Server Components, Server Actions y Route Handlers.
 *
 * Crea **una instancia nueva por request** (nunca se comparte entre requests)
 * y lee la sesión de las cookies del request.
 *
 * El refresco de token también se escribe aquí cuando el contexto lo permite
 * (Server Actions y Route Handlers). En un Server Component las cookies son de
 * solo lectura: en ese caso `setAll` no puede escribir y el refresco queda a
 * cargo de `proxy.ts`.
 */
export async function createSupabaseServerClient(): Promise<SupabaseClient<Database>> {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Se lanza al escribir cookies desde un Server Component.
            // Es esperado: `proxy.ts` se encarga de refrescar la sesión.
          }
        },
      },
    },
  );
}
