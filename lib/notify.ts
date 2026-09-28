import { Resend } from "resend";
import { COURSES, CourseId } from "@/lib/site";

export interface BookingNotificationPayload {
  bookingId: string;
  course: CourseId;
  amountInr: number;
  name: string;
  whatsapp: string;
  email: string;
  callTime: string;
  note?: string | null;
  razorpayOrderId: string;
  razorpayPaymentId: string;
}

export async function sendBookingNotificationEmail(
  payload: BookingNotificationPayload
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL;

  if (
    !apiKey ||
    !notifyEmail ||
    apiKey.includes("re_xxxx") ||
    notifyEmail.includes("[email]")
  ) {
    console.info(
      "[Notify] Skipping Resend email (RESEND_API_KEY or NOTIFY_EMAIL not set):",
      payload.bookingId
    );
    return;
  }

  try {
    const resend = new Resend(apiKey);
    const courseInfo = COURSES[payload.course];
    const cleanPhone = payload.whatsapp.replace(/\D/g, "");
    const fullPhone = cleanPhone.startsWith("91")
      ? cleanPhone
      : `91${cleanPhone}`;
    const waLink = `https://wa.me/${fullPhone}?text=${encodeURIComponent(
      `Hi ${payload.name}, thank you for booking "${courseInfo.name}" with Ahambrahmasmi! Here is the link to watch The Secret before our first call...`
    )}`;

    await resend.emails.send({
      from: "Ahambrahmasmi Bookings <onboarding@resend.dev>",
      to: [notifyEmail],
      subject: `New Seeker Booking: ${payload.name} — ${courseInfo.name} (₹${payload.amountInr.toLocaleString("en-IN")})`,
      html: `
        <div style="font-family: sans-serif; color: #2B1B1B; background: #FBF5EE; padding: 32px; border-radius: 16px; max-width: 600px;">
          <p style="font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #9A7020; margin: 0 0 8px;">New Paid Booking</p>
          <h1 style="font-family: Georgia, serif; font-size: 28px; margin: 0 0 20px; color: #2B1B1B;">${courseInfo.name} — ₹${payload.amountInr.toLocaleString("en-IN")}</h1>
          <table style="width: 100%; border-collapse: collapse; background: #FFFFFF; border-radius: 12px; overflow: hidden;">
            <tr><td style="padding: 12px 16px; border-bottom: 1px solid #F0E4D8; color: #7A625A;">Seeker Name</td><td style="padding: 12px 16px; border-bottom: 1px solid #F0E4D8; font-weight: 600;">${payload.name}</td></tr>
            <tr><td style="padding: 12px 16px; border-bottom: 1px solid #F0E4D8; color: #7A625A;">WhatsApp</td><td style="padding: 12px 16px; border-bottom: 1px solid #F0E4D8;"><a href="${waLink}" style="color: #8E1B25; font-weight: 600;">+91 ${cleanPhone.slice(-10)} (Click to message)</a></td></tr>
            <tr><td style="padding: 12px 16px; border-bottom: 1px solid #F0E4D8; color: #7A625A;">Email</td><td style="padding: 12px 16px; border-bottom: 1px solid #F0E4D8;">${payload.email}</td></tr>
            <tr><td style="padding: 12px 16px; border-bottom: 1px solid #F0E4D8; color: #7A625A;">Preferred Call Time</td><td style="padding: 12px 16px; border-bottom: 1px solid #F0E4D8;">${payload.callTime} (IST)</td></tr>
            <tr><td style="padding: 12px 16px; border-bottom: 1px solid #F0E4D8; color: #7A625A;">Note / Seeking</td><td style="padding: 12px 16px; border-bottom: 1px solid #F0E4D8;">${payload.note || "—"}</td></tr>
            <tr><td style="padding: 12px 16px; border-bottom: 1px solid #F0E4D8; color: #7A625A;">Booking ID</td><td style="padding: 12px 16px; border-bottom: 1px solid #F0E4D8; font-family: monospace; font-size: 12px;">${payload.bookingId}</td></tr>
            <tr><td style="padding: 12px 16px; color: #7A625A;">Razorpay Payment ID</td><td style="padding: 12px 16px; font-family: monospace; font-size: 12px;">${payload.razorpayPaymentId}</td></tr>
          </table>
        </div>
      `,
    });
  } catch (err) {
    console.error("[Notify] Failed to send Resend notification email:", err);
  }
}
