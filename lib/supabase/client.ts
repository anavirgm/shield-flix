import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import { clientEnv } from "@/lib/env/client";
import type { Database } from "@/types/database.types";

/**
 * Cliente de Supabase para el navegador.
 *
 * Usa la clave pública (`anon`): toda la autorización real vive en las
 * políticas RLS de PostgreSQL, nunca en el cliente.
 *
 * Se memoiza para reutilizar la misma instancia (y el mismo WebSocket de
 * Realtime) durante toda la sesión del navegador.
 */

let browserClient: SupabaseClient<Database> | undefined;

export function createSupabaseBrowserClient(): SupabaseClient<Database> {
  browserClient ??= createBrowserClient<Database>(
    clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  return browserClient;
}
