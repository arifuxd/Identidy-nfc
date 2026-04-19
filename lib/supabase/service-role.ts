import { createClient } from "@supabase/supabase-js";

import {
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
} from "@/lib/supabase/env";
import type { Database } from "@/types/database";

export function createServiceRoleClient() {
  return createClient<Database>(
    getSupabaseUrl(),
    getSupabaseServiceRoleKey(),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}
