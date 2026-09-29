import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export interface SeekerAdminRecord {
  email: string;
  name: string;
  enrolledAt: string;
  completedSessions: string[];
  nextCallDate: string;
  nextCallTime: string;
  nextCallSession: string;
  meetingLink: string;
  customRecordings: {
    id: string;
    session: string;
    title: string;
    url: string;
    addedAt: string;
  }[];
  sharedNotes?: {
    id: string;
    sessionTag: string;
    title: string;
    content: string;
    createdAt: string;
  }[];
  streakDays?: number;
}

const DEFAULT_DEMO_SEEKERS: SeekerAdminRecord[] = [
  {
    email: "seeker@ahambrahmasmi.in",
    name: "Ananya Sharma",
    enrolledAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    completedSessions: ["session-1", "session-2", "phase-3a"],
    nextCallDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    nextCallTime: "11:00 AM IST",
    nextCallSession: "Phase 3B — 1 to 1 coaching (2hrs)",
    meetingLink: "https://meet.google.com/aham-brahmasmi-1to1",
    customRecordings: [
      {
        id: "rec-1",
        session: "Session 2",
        title: "Ambika’s Personal Voice Note — Your 48-Hr Focus Target",
        url: "#guided-voice-1",
        addedAt: "2 days ago",
      },
      {
        id: "rec-2",
        session: "Phase 3A",
        title: "Session 3A Recap — Soothing Resistance & Emotional Scale",
        url: "#guided-voice-2",
        addedAt: "Yesterday",
      },
    ],
    sharedNotes: [
      {
        id: "shared-1",
        sessionTag: "Session 2",
        title: "48-Hour Experiment — Spotted 3 Blue Butterflies!",
        content:
          "Within 19 hours of our Session 2 call, a neighbour gifted me a teacup with a blue butterfly, and I saw two more on my morning walk!",
        createdAt: "Yesterday",
      },
    ],
    streakDays: 7,
  },
];

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email")?.toLowerCase().trim();
  const supabase = getServiceSupabase();

  if (supabase) {
    try {
      const [{ data: bookings }, { data: reviews }] = await Promise.all([
        supabase
          .from("bookings")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(50),
        supabase
          .from("reviews")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(50),
      ]);

      return NextResponse.json({
        ok: true,
        supabaseConnected: true,
        seekers: DEFAULT_DEMO_SEEKERS,
        bookings: bookings || [],
        reviews: reviews || [],
        seeker: email
          ? DEFAULT_DEMO_SEEKERS.find((s) => s.email.toLowerCase() === email) ||
            DEFAULT_DEMO_SEEKERS[0]
          : null,
      });
    } catch {
      // Fallback if tables don't exist yet
    }
  }

  return NextResponse.json({
    ok: true,
    supabaseConnected: false,
    seekers: DEFAULT_DEMO_SEEKERS,
    bookings: [],
    reviews: [],
    seeker: email
      ? DEFAULT_DEMO_SEEKERS.find((s) => s.email.toLowerCase() === email) ||
        DEFAULT_DEMO_SEEKERS[0]
      : null,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, reviewId, approved } = body;

    const supabase = getServiceSupabase();

    if (action === "toggle_review_approval" && supabase && reviewId) {
      await supabase
        .from("reviews")
        .update({ approved: Boolean(approved) })
        .eq("id", reviewId);
    }

    return NextResponse.json({
      ok: true,
      message: "Synced successfully",
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "Failed to sync",
      },
      { status: 400 }
    );
  }
}
