import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { clientEnv } from "@/lib/env/client";
import { getServerEnv } from "@/lib/env/server";
import type { Database } from "@/types/database.types";

/**
 * Cliente administrador de Supabase (clave `service_role`).
 *
 * ⚠️ La clave `service_role` **omite por completo las políticas RLS**. Solo
 * puede usarse en el servidor, para operaciones privilegiadas y auditables
 * (por ejemplo, el CRUD del panel de administración).
 *
 * Nunca debe importarse desde un componente de cliente: `import "server-only"`
 * hace que ese error sea imposible de compilar.
 */

let adminClient: SupabaseClient<Database> | undefined;

export function createSupabaseAdminClient(): SupabaseClient<Database> {
  if (adminClient) {
    return adminClient;
  }

  const { SUPABASE_SERVICE_ROLE_KEY } = getServerEnv();

  adminClient = createClient<Database>(
    clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );

  return adminClient;
}
