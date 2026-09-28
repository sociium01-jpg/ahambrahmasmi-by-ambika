import { createClient, SupabaseClient } from "@supabase/supabase-js";

export interface BookingRow {
  id: string;
  created_at: string;
  course: "whole" | "intro" | "tools";
  amount_inr: number;
  name: string;
  whatsapp: string;
  email: string;
  call_time: string;
  note: string | null;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  status: "pending" | "paid" | "failed";
}

export interface ReviewRow {
  id: string;
  created_at: string;
  name: string;
  course: string;
  written_review: string;
  photo_url: string | null;
  video_url: string | null;
  approved: boolean;
}

export function getServiceSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (
    !url ||
    !key ||
    url.includes("your-project") ||
    key.includes("your-service-role")
  ) {
    return null;
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function getApprovedReviews(): Promise<ReviewRow[]> {
  try {
    const supabase = getServiceSupabase();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data as ReviewRow[];
  } catch {
    return [];
  }
}
