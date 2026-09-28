import { NextResponse } from "next/server";
import { z } from "zod";
import { getServiceSupabase } from "@/lib/supabase";

const ReviewSubmitSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  course: z.enum([
    "The whole path",
    "Introduction to LOA",
    "Tools for Emotional Mastery",
  ]),
  written_review: z
    .string()
    .trim()
    .min(10, "Please share a few words about your experience.")
    .max(3000),
  photo_url: z.string().trim().max(500000).optional().nullable(),
  video_url: z.string().trim().max(1000).optional().nullable(),
  // Honeypot field for spam protection — must remain empty
  website_hp: z.string().optional().default(""),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = ReviewSubmitSchema.safeParse(json);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstIssue?.message || "Please check your review details." },
        { status: 400 }
      );
    }

    const { name, course, written_review, photo_url, video_url, website_hp } =
      parsed.data;

    // Honeypot triggered -> pretend success without storing spam
    if (website_hp && website_hp.trim().length > 0) {
      return NextResponse.json({ submitted: true });
    }

    const supabase = getServiceSupabase();
    if (supabase) {
      const { error } = await supabase.from("reviews").insert({
        name,
        course,
        written_review,
        photo_url: photo_url || null,
        video_url: video_url || null,
        approved: false,
      });

      if (error) {
        console.error("[reviews] Supabase insert error:", error);
        return NextResponse.json(
          { error: "Could not save review right now. Please try again." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      submitted: true,
      approved: false,
    });
  } catch (err) {
    console.error("[reviews] Error handling review submission:", err);
    return NextResponse.json(
      { error: "Unable to submit review. Please try again." },
      { status: 500 }
    );
  }
}
