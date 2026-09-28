import { NextResponse } from "next/server";
import { z } from "zod";
import Razorpay from "razorpay";
import crypto from "crypto";
import { COURSES, CourseId } from "@/lib/site";
import { getServiceSupabase } from "@/lib/supabase";

const CreateOrderSchema = z.object({
  course: z.enum(["whole", "intro", "tools"]),
  name: z.string().trim().min(2, "Please enter your full name."),
  whatsapp: z
    .string()
    .trim()
    .transform((val) => val.replace(/\D/g, "").replace(/^91/, ""))
    .refine(
      (digits) => /^[6-9]\d{9}$/.test(digits),
      "Please enter a valid 10-digit Indian WhatsApp number."
    ),
  email: z.string().trim().email("Please enter a valid email address."),
  call_time: z.enum(["morning", "afternoon", "evening"]),
  note: z.string().trim().max(2000).optional().default(""),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = CreateOrderSchema.safeParse(json);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        {
          error: firstIssue?.message || "Invalid booking details.",
          issues: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const { course, name, whatsapp, email, call_time, note } = parsed.data;

    // 1. Authoritative server-side price lookup from lib/site.ts (never trust client amount)
    const selectedCourse = COURSES[course as CourseId];
    const amountInr = selectedCourse.priceInr;
    const amountPaise = amountInr * 100;

    // 2. Insert a 'pending' booking row in Supabase
    let bookingId: string = crypto.randomUUID();
    const supabase = getServiceSupabase();

    if (supabase) {
      const { data: inserted, error: dbError } = await supabase
        .from("bookings")
        .insert({
          course,
          amount_inr: amountInr,
          name,
          whatsapp: `+91${whatsapp}`,
          email,
          call_time,
          note: note || null,
          status: "pending",
        })
        .select("id")
        .single();

      if (dbError) {
        console.error("[create-order] Supabase insert error:", dbError);
        return NextResponse.json(
          { error: "Could not save booking record. Please try again." },
          { status: 500 }
        );
      }
      if (inserted?.id) {
        bookingId = inserted.id;
      }
    }

    // 3. Create Razorpay Order (or simulated test order when Razorpay credentials are placeholders)
    const keyId = process.env.RAZORPAY_KEY_ID || "";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "";
    const hasRealRazorpayKeys =
      Boolean(keyId) &&
      Boolean(keySecret) &&
      !keyId.includes("placeholder") &&
      !keyId.includes("xxxx");

    let orderId = `order_test_${bookingId.replace(/-/g, "").slice(0, 14)}`;

    if (hasRealRazorpayKeys) {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const order = await razorpay.orders.create({
        amount: amountPaise,
        currency: "INR",
        receipt: bookingId,
        notes: {
          booking_id: bookingId,
          course,
          name,
          whatsapp: `+91${whatsapp}`,
          call_time,
        },
      });

      orderId = order.id;
    }

    // 4. Update razorpay_order_id on the Supabase booking row
    if (supabase) {
      await supabase
        .from("bookings")
        .update({ razorpay_order_id: orderId })
        .eq("id", bookingId);
    }

    return NextResponse.json({
      bookingId,
      orderId,
      amount: amountPaise,
      amountInr,
      currency: "INR",
      keyId: hasRealRazorpayKeys ? keyId : "rzp_test_simulated",
      simulated: !hasRealRazorpayKeys,
    });
  } catch (err) {
    console.error("[create-order] Unexpected error:", err);
    return NextResponse.json(
      { error: "Unable to initiate checkout. Please try again." },
      { status: 500 }
    );
  }
}
