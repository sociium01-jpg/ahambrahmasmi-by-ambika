import { NextResponse } from "next/server";
import crypto from "crypto";
import { getServiceSupabase } from "@/lib/supabase";
import { sendBookingNotificationEmail } from "@/lib/notify";
import { CourseId } from "@/lib/site";

export async function POST(req: Request) {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json(
        { error: "Webhook secret not configured." },
        { status: 500 }
      );
    }

    const signature = req.headers.get("x-razorpay-signature");
    if (!signature) {
      return NextResponse.json(
        { error: "Missing x-razorpay-signature header." },
        { status: 400 }
      );
    }

    const rawBody = await req.text();
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    const expectedBuf = Buffer.from(expectedSignature, "utf8");
    const receivedBuf = Buffer.from(signature, "utf8");
    const isValid =
      expectedBuf.length === receivedBuf.length &&
      crypto.timingSafeEqual(expectedBuf, receivedBuf);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid webhook signature." },
        { status: 400 }
      );
    }

    const event = JSON.parse(rawBody);

    if (event.event === "payment.captured") {
      const paymentEntity = event?.payload?.payment?.entity;
      const orderId: string | undefined = paymentEntity?.order_id;
      const paymentId: string | undefined = paymentEntity?.id;

      if (orderId && paymentId) {
        const supabase = getServiceSupabase();
        if (supabase) {
          const { data: existing } = await supabase
            .from("bookings")
            .select("*")
            .eq("razorpay_order_id", orderId)
            .single();

          if (existing && existing.status !== "paid") {
            const { data: updated } = await supabase
              .from("bookings")
              .update({
                status: "paid",
                razorpay_payment_id: paymentId,
              })
              .eq("id", existing.id)
              .select("*")
              .single();

            if (updated) {
              await sendBookingNotificationEmail({
                bookingId: updated.id,
                course: updated.course as CourseId,
                amountInr: updated.amount_inr,
                name: updated.name,
                whatsapp: updated.whatsapp,
                email: updated.email,
                callTime: updated.call_time,
                note: updated.note,
                razorpayOrderId: orderId,
                razorpayPaymentId: paymentId,
              });
            }
          }
        }
      }
    } else if (event.event === "payment.failed") {
      const paymentEntity = event?.payload?.payment?.entity;
      const orderId: string | undefined = paymentEntity?.order_id;
      if (orderId) {
        const supabase = getServiceSupabase();
        if (supabase) {
          await supabase
            .from("bookings")
            .update({ status: "failed" })
            .eq("razorpay_order_id", orderId)
            .eq("status", "pending");
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[razorpay-webhook] Error handling webhook:", err);
    return NextResponse.json(
      { error: "Webhook processing failed." },
      { status: 500 }
    );
  }
}
