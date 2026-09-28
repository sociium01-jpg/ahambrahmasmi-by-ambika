import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { getServiceSupabase } from "@/lib/supabase";
import { sendBookingNotificationEmail } from "@/lib/notify";
import { COURSES, CourseId } from "@/lib/site";

const VerifySchema = z.object({
  bookingId: z.string().min(1),
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().optional().default(""),
  razorpay_signature: z.string().optional().default(""),
  simulatedStatus: z.enum(["paid", "failed"]).optional(),
  // Optional fallback metadata when testing without live Supabase
  fallbackMeta: z
    .object({
      course: z.enum(["whole", "intro", "tools"]),
      name: z.string(),
      whatsapp: z.string(),
      email: z.string(),
      call_time: z.string(),
      note: z.string().optional(),
    })
    .optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = VerifySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid verification payload." },
        { status: 400 }
      );
    }

    const {
      bookingId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      simulatedStatus,
      fallbackMeta,
    } = parsed.data;

    const keySecret = process.env.RAZORPAY_KEY_SECRET || "";
    const hasRealSecret =
      Boolean(keySecret) &&
      !keySecret.includes("placeholder") &&
      !keySecret.includes("xxxx");

    let isSignatureValid = false;

    if (hasRealSecret) {
      if (razorpay_payment_id && razorpay_signature) {
        const expectedSignature = crypto
          .createHmac("sha256", keySecret)
          .update(`${razorpay_order_id}|${razorpay_payment_id}`)
          .digest("hex");

        const expectedBuf = Buffer.from(expectedSignature, "utf8");
        const receivedBuf = Buffer.from(razorpay_signature, "utf8");
        isSignatureValid =
          expectedBuf.length === receivedBuf.length &&
          crypto.timingSafeEqual(expectedBuf, receivedBuf);
      }
    } else if (process.env.NODE_ENV !== "production" && simulatedStatus) {
      // Allow interactive test walkthrough in local dev when Razorpay test secret is not yet set
      isSignatureValid = simulatedStatus === "paid";
    }

    const supabase = getServiceSupabase();

    if (!isSignatureValid) {
      if (supabase) {
        await supabase
          .from("bookings")
          .update({ status: "failed" })
          .eq("id", bookingId);
      }
      return NextResponse.json(
        {
          verified: false,
          status: "failed",
          error: "Payment signature verification failed.",
        },
        { status: 400 }
      );
    }

    // Signature valid -> mark 'paid' and store razorpay_payment_id
    let bookingRecord: {
      id: string;
      course: CourseId;
      amount_inr: number;
      name: string;
      whatsapp: string;
      email: string;
      call_time: string;
      note: string | null;
    } | null = null;

    if (supabase) {
      const { data, error } = await supabase
        .from("bookings")
        .update({
          status: "paid",
          razorpay_payment_id,
        })
        .eq("id", bookingId)
        .select("*")
        .single();

      if (!error && data) {
        bookingRecord = data;
      }
    }

    if (!bookingRecord && fallbackMeta) {
      const courseObj = COURSES[fallbackMeta.course];
      bookingRecord = {
        id: bookingId,
        course: fallbackMeta.course,
        amount_inr: courseObj.priceInr,
        name: fallbackMeta.name,
        whatsapp: fallbackMeta.whatsapp,
        email: fallbackMeta.email,
        call_time: fallbackMeta.call_time,
        note: fallbackMeta.note || null,
      };
    }

    if (bookingRecord) {
      await sendBookingNotificationEmail({
        bookingId: bookingRecord.id,
        course: bookingRecord.course,
        amountInr: bookingRecord.amount_inr,
        name: bookingRecord.name,
        whatsapp: bookingRecord.whatsapp,
        email: bookingRecord.email,
        callTime: bookingRecord.call_time,
        note: bookingRecord.note,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
      });
    }

    return NextResponse.json({
      verified: true,
      status: "paid",
      bookingId,
      paymentId: razorpay_payment_id,
    });
  } catch (err) {
    console.error("[verify] Error verifying payment:", err);
    return NextResponse.json(
      { error: "Verification error." },
      { status: 500 }
    );
  }
}
