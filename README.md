# Ahambrahmasmi by Ambika

1-to-1 Law of Attraction coaching website and booking front door for **Ambika Mohan**.

## Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS with custom Sanctuary design tokens (`cream`, `sand`, `ink`, `maroon`, `gold`, `night`, etc.)
- **Typography**: `DM Serif Display` (headings) + `Outfit` (body & UI) via `next/font/google`
- **Database**: Supabase (`bookings` and `reviews` tables with RLS enabled and server-only access)
- **Payments**: Razorpay Orders + Checkout + HMAC-SHA256 verification + `payment.captured` webhook
- **Notifications**: Resend email notification to `NOTIFY_EMAIL` on paid booking

## Environment Variables (`.env.local`)

Copy `.env.local.example` to `.env.local` and configure the following variables:

| Variable | Scope | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Server / Public URL | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only** | Supabase Service Role key (used by API routes & Server Components; never exposed to client) |
| `RAZORPAY_KEY_ID` | Server (passed via order API) | Razorpay Key ID (`rzp_test_...` for testing) |
| `RAZORPAY_KEY_SECRET` | **Server only** | Razorpay Key Secret for order creation & HMAC-SHA256 verification |
| `RAZORPAY_WEBHOOK_SECRET` | **Server only** | Secret configured on Razorpay webhook (`/api/razorpay/webhook`) |
| `RESEND_API_KEY` | **Server only** | Resend API key for booking confirmation emails |
| `NOTIFY_EMAIL` | **Server only** | Ambika's email address to receive paid booking alerts |

## Database Setup

Run `supabase/schema.sql` inside the Supabase SQL Editor to create the `bookings` and `reviews` tables with Row Level Security (RLS) enabled.

## Running Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.
