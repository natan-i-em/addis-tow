import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client, authenticated with the service role key.
 * Never import this from a "use client" component — the service role
 * key bypasses Row Level Security and must not reach the browser.
 */
export function supabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

export type TowRequestRow = {
  id: string;
  reference: string;
  service: string | null;
  vehicle: string | null;
  location: string;
  coords: string | null;
  urgency: string | null;
  scheduled_for: string | null;
  name: string;
  phone: string;
  notes: string | null;
  status: string;
  created_at: string;
};
