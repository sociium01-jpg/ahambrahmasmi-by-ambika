# ANTIGRAVITY BUILD PROMPT — Ahambrahmasmi by Ambika

Paste each stage into Antigravity **one at a time**. Wait for each stage to finish and check it before pasting the next one.

**Before Stage 1:** unzip `ahambrahmasmi-assets.zip` into the empty project folder. You should see `public/images/` (11 images) and `design-reference/` (4 HTML files).

---

## STAGE 1 — Project setup, design tokens, assets

```
You are building the website for "Ahambrahmasmi by Ambika" — 1-to-1 Law of Attraction coaching by Ambika Mohan. It is her personal website AND the booking front door for her programme. The #1 goal: a visitor can book a course in under a minute, especially on a phone.

STACK
- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- next/font/google for fonts, next/image for every image
- Deploy target: Vercel. Database: Supabase. Payments: Razorpay (added in Stage 3).
- No UI kit. Hand-build components with Tailwind.

SOURCE OF TRUTH FOR THE DESIGN
The folder design-reference/ contains the approved designs as HTML files:
- desktop-home.html   (1440px wide)
- mobile-home.html    (390px wide)
- desktop-booking.html
- mobile-booking.html
They use a custom <x-dc> wrapper and inline styles — ignore the wrapper and the <script type="text/x-dc"> block, but COPY every layout, size, spacing, radius, colour, font size, image and piece of copy EXACTLY. Where a value is in those files, it wins over anything I write below. Treat {{...}} placeholders in the booking files as dynamic values.

ASSETS (already in public/images/ — use these exact files, do not substitute stock images):
- logo.png            — Ambika's circular heart/infinity logo. Always shown on a white circle.
- ambika.png          — Ambika's portrait (square, 800px). Always shown as a circle.
- hero-sea.jpg        — hero background (woman by the sea)
- about-rock.jpg      — About section main image (woman meditating on a rock)
- lotus.jpg           — small pill-shaped overlay in About
- course1-bench.jpg   — Course 1 card
- course2-journal.jpg — Course 2 card
- sessions-call.jpg   — "Further sessions" card
- quote-sky.jpg       — Bhagavad Gita quote band
- review-grateful.jpg — video review tile
- cta-diya.jpg        — closing call-to-action (hands holding a diya)
Write meaningful alt text on every image (copy the alt text from the design files).

DESIGN TOKENS — put these in tailwind.config.ts under theme.extend.colors, and as CSS variables in globals.css:
  cream       #FBF5EE   page background
  sand        #F3E3D3   hero panel, journey cards, soft cards
  white       #FFFFFF   cards
  ink         #2B1B1B   headings, dark pricing card, primary text
  maroon      #8E1B25   primary buttons, accents, italic highlight words
  maroon-dark #6B111A   hover state for maroon
  gold        #E7B85A   secondary CTA on dark, badges, "Hi, I'm Ambika" pill
  gold-text   #9A7020   small uppercase eyebrow labels
  body        #5A4540   paragraph text
  muted       #7A625A   captions, small text
  line        #E6D3C3   input and outline borders
  divider     #F0E4D8   hairline dividers
  night       #1C1010   closing CTA background
  Quote-band overlay: rgba(43,27,27,0.42) over the sky photo.

TYPOGRAPHY
- Display / headings: "DM Serif Display" (400, plus italic). Italic words in headlines are coloured maroon (or gold on dark backgrounds).
- Body / UI: "Outfit" weights 300, 400, 500, 600.
- Eyebrow labels: Outfit 500, 11–13px, letter-spacing 2–3px, UPPERCASE, gold-text colour.
- Desktop H1 82px / line-height 1.02. Mobile H1 44px. Section H2: 56px desktop, 34px mobile.

SHAPE LANGUAGE
- All buttons are full pills (rounded-full). Primary = maroon fill, white text. Secondary = 1.5px outline.
- Cards: 20–28px radius. Big sections/bands: 28–36px radius.
- Soft shadow only on floating cards: 0 16px 40px rgba(43,27,27,0.10).
- Icons: thin inline stroke SVGs (1.8 stroke), never emoji.

TASK FOR THIS STAGE
1. Scaffold the Next.js + Tailwind project.
2. Add the tokens, fonts and a global layout (cream background, Outfit body).
3. Build shared components: <Logo/> (logo.png on white circle + "Ahambrahmasmi" in DM Serif + "BY AMBIKA" eyebrow), <Button variant="primary|outline|gold"/>, <Eyebrow/>, <WhatsAppIcon/>.
4. Create a lib/site.ts config file holding: WHATSAPP_NUMBER = "91XXXXXXXXXX", EMAIL = "[email]", INSTAGRAM = "https://instagram.com/ahambrahmasmi.by.Ambika", and the course data below. Every WhatsApp link on the site must be built from this file: https://wa.me/${WHATSAPP_NUMBER}?text=<url-encoded friendly message>.

COURSE DATA (lib/site.ts) — fees in INR:
- whole:  "The whole path" — Introduction to LOA + Tools for Emotional Mastery — ₹12,500 (introductory; actual fee ₹25,000) — includes all five phases, WhatsApp support for the month, videos, meditations and the booklet. Badge "Save ₹1,000".
- intro:  "Introduction to LOA: Creating Faith in the Law" — Course 1 — Phases 1, 2, 3A, 3B — ₹8,500
- tools:  "Tools for Emotional Mastery" — Course 2 — Phases 4 and 5 — ₹5,000
- further sessions (not bookable online, WhatsApp only): ₹2,000 / hour, ₹1,000 / 30 minutes

Show me the running project with an empty home page using the tokens before moving on.
```

---

## STAGE 2 — Homepage (desktop + mobile, one responsive page)

```
Build the homepage at app/page.tsx as ONE responsive page:
- ≥1024px must match design-reference/desktop-home.html exactly.
- <768px must match design-reference/mobile-home.html exactly.
- 768–1023px: sensible in-between (mobile layout with 2-column course cards).
Max content width 1440px, centred. Side padding 80px desktop, 16px mobile.

SECTIONS IN ORDER (copy all text word-for-word from the design files):

1. NAV
   Desktop: Logo left · links centre (Home [active, maroon], About me, Courses, Investment, Reviews, Seeker login) · right: round WhatsApp icon button + maroon pill "Book your path" → /book.
   Mobile: Logo left, 44px round menu button right that opens a full-screen cream drawer with the same links and a full-width "Book your path" button.

2. HERO
   Desktop: a sand-coloured panel (radius 36px, 760px tall). hero-sea.jpg fills the right 760px; the sand panel covers the left with a half-circle right edge (border-radius 0 380px 380px 0). Left text: eyebrow "SELF-DISCOVERY · LAW OF ATTRACTION · 1-TO-1", H1 "Remember who you *truly* are." (truly = italic maroon), paragraph, buttons "Begin the whole path · ₹12,500" (primary → /book?course=whole) and "Explore the courses" (underlined text link → #courses), caption "Introductory fee — actual fee ₹25,000".
   Ambika's photo as a 400px circle with a 12px cream border, overlapping the join between sand and photo. Gold pill "Hi, I'm Ambika · fellow seeker" near it. White floating card bottom-right: "Not sure where to start?" + WhatsApp row with the number.
   Mobile: photo card first (420px tall, radius 28px) with Ambika's circle bottom-left and the gold pill beside it; then the text block below with full-width stacked buttons; then a 3-column stat strip (1-to-1 / 5 phases / 1 month WhatsApp support); then a sand WhatsApp card.

3. ABOUT — about-rock.jpg (radius 28px) with lotus.jpg as a tall pill overlay, a white 3-stat card overlapping the bottom (desktop), and text on the right: eyebrow ABOUT ME, H2 "I didn't begin with answers. I began with *questions.*", two paragraphs, dark pill "Read my story" → /about.

4. OFFERINGS (id="courses") — white full-width band. Centered heading "How I can walk with you". Three cards (3 columns desktop, stacked mobile): image with a white pill tag on it, title, description, price, button. Course 1 and Course 2 "Book" buttons → /book?course=intro and /book?course=tools. "Further sessions" card has an outline "Ask" button → WhatsApp.

5. JOURNEY — heading "Words don't teach. *Your life will.*". Desktop: 6 cards in a row (01, 02, 3A, 3B on sand; 04, 05 on maroon with gold numbers), captions underneath "← Course 1 · Introduction to LOA" and "Course 2 · Tools for Emotional Mastery →". Mobile: vertical timeline with numbered circles joined by a line.

6. QUOTE BAND — quote-sky.jpg with the dark overlay, centered italic DM Serif quote from the Bhagavad Gita + "Everything happens in perfect Divine timing."

7. PRICING + REVIEWS — Desktop two columns: left dark ink card "The whole path" (₹12,500 big, ₹25,000 struck through, 4 gold-tick benefits, gold button → /book?course=whole); right "Seekers' words" with a large written-review card and two small tiles (video tile uses review-grateful.jpg). Mobile: pricing card full width, then reviews as a horizontal swipe row with dots.
   Reviews come from Supabase later — for now render the placeholder cards exactly as designed and hide the section automatically if there are zero approved reviews AND we are in production (keep it visible in dev).

8. CLOSING CTA — night background, cta-diya.jpg on the right (desktop) / bottom with a fade (mobile). H2 "You are a powerful creator. *Come see it for yourself.*" (italic in gold). Buttons: gold "Book your path" → /book, outline "Chat on WhatsApp".

9. FOOTER — logo, "A journey of self discovery" / "Everything happens in perfect Divine timing.", links: Instagram, WhatsApp, Email, Reviews.

MOBILE STICKY BOOKING BAR (mobile only, very important):
A white rounded bar (radius 22px, 12px from the screen edges, 12px above the bottom safe area, shadow 0 12px 36px rgba(43,27,27,0.22)) fixed to the bottom of the viewport on every page EXCEPT /book. Left: "Whole path from" + "₹12,500" in DM Serif. Right: round WhatsApp button + maroon pill "Book now" → /book. Add bottom padding to the page so it never covers the footer. It appears after the user scrolls past the hero buttons.

QUALITY BAR
- Lighthouse mobile ≥ 90 performance and ≥ 95 accessibility.
- Hero image priority-loaded; everything else lazy.
- Every interactive element ≥ 44px tall, real <a>/<button>, visible focus ring in maroon.
- Subtle fade-up on section entry (respect prefers-reduced-motion). No other animation.

Show me the page at 1440px and at 390px side by side with the design-reference files and list any differences you could not match.
```

---

## STAGE 3 — Booking flow with Razorpay + Supabase

```
Build /book as a 3-step booking flow + confirmation.
Desktop must match design-reference/desktop-booking.html (maroon left sidebar with logo, step list and "Your selection" summary; form on the right).
Mobile must match design-reference/mobile-booking.html (top bar with close/back, logo title, Ambika's photo as a WhatsApp link, 3-segment progress bar, and a sticky white bottom bar showing selected course + price + the primary button).

Read ?course=whole|intro|tools from the URL to preselect the course (default: whole).

STEP 1 — Choose your path: three radio cards (whole path first with "Save ₹1,000" badge). Real radio inputs, keyboard accessible.
STEP 2 — Your details: Full name, WhatsApp number (+91 prefix, 10 digits, validated), Email (validated), Best time for calls (IST): Morning / Afternoon / Evening chips, optional "What are you seeking right now?" textarea (desktop only is fine to also show on mobile). Use proper autocomplete attributes.
STEP 3 — Review & pay: summary card (course, includes, call time, total). Payment method hint chips UPI / Card / Netbanking (UPI selected by default — these just pre-select the Razorpay method). Button "Pay ₹12,500" (dynamic).
CONFIRMATION — gold tick circle, "You're on the path.", text about Ambika messaging on WhatsApp with the link to The Secret, a small card "Next: your first call", and buttons (desktop) "Open my seeker's space" (link to /space — placeholder page for now) and "Start over".

BACKEND
Supabase table `bookings`:
  id uuid pk default gen_random_uuid(), created_at timestamptz default now(),
  course text check (course in ('whole','intro','tools')), amount_inr int,
  name text, whatsapp text, email text, call_time text, note text,
  razorpay_order_id text, razorpay_payment_id text,
  status text default 'pending' check (status in ('pending','paid','failed'))
Enable RLS with NO public policies — only the server (service role key) reads/writes.

API routes (server only):
  POST /api/booking/create-order  → validate input with zod, look up the price from lib/site.ts ON THE SERVER (never trust the client amount), insert a 'pending' booking, create a Razorpay order (amount in paise, currency INR, receipt = booking id), return order id + key id.
  POST /api/booking/verify        → verify razorpay_signature with HMAC-SHA256 using RAZORPAY_KEY_SECRET; on success set status='paid' and store payment id; on failure status='failed'.
  Also add a Razorpay webhook route /api/razorpay/webhook (payment.captured) that verifies the webhook signature and marks the booking paid — so a closed browser tab doesn't lose a booking.

On the client, load https://checkout.razorpay.com/v1/checkout.js, open Razorpay Checkout with prefill (name, email, contact), theme color #8E1B25, and the selected method. Only show the confirmation step after /verify returns success. On failure show a friendly retry message with a WhatsApp fallback link.

After a paid booking, send Ambika a notification email via Resend (NOTIFY_EMAIL env) with all the booking details. (WhatsApp notification can be added later.)

Env vars (.env.local, and list them in README): NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET, RESEND_API_KEY, NOTIFY_EMAIL.

Use Razorpay TEST keys only. Walk me through a full test payment with a Razorpay test UPI/card and show the row in Supabase.
```

---

## STAGE 4 — Inner pages (same design system)

```
Using the same tokens, components and section styles as the homepage, build:
- /about — Ambika's full "About me" story (text from https://sunny-mist-wood-sky.grok.me/), ambika.png portrait, the "Intention with seekers" content (https://sunny-mist-wood-sky.grok.me/intention) including the six numbered outcomes and the Bhagavad Gita quote band.
- /course — full course overview (https://sunny-mist-wood-sky.grok.me/course): Ambika's opening letter, then Course 1 (Phases 1, 2, 3A, 3B) and Course 2 (Phases 4, 5) as expandable phase cards with durations, the list of tools as pills, the closing "You'll understand…" section, and a Book CTA after each course.
- /investment — the three pricing options as cards (whole path highlighted in the dark ink style) + further sessions note (WhatsApp only).
- /reviews — approved reviews grid (written + video) and the "Leave a review" form (name, course select, written review, optional photo, YouTube/Instagram link or short video upload) saving to a Supabase `reviews` table with approved=false by default. Honeypot field for spam.
Copy text word-for-word from those URLs. Keep every page mobile-first with the sticky booking bar.
```

---

## STAGE 5 — Final QA before launch

```
Run a full QA pass and fix everything you find:
1. Compare every page at 390px, 768px and 1440px against design-reference/ and list remaining visual differences.
2. Lighthouse (mobile) on /, /book, /course — report scores; fix anything under 90.
3. Keyboard-only walk through the booking flow; every control reachable, focus visible.
4. Test a full Razorpay TEST payment for each of the 3 courses and one failed payment.
5. Confirm no secret keys are exposed to the client bundle.
6. Add SEO: title "Ahambrahmasmi by Ambika — 1-to-1 Law of Attraction Coaching", meta description, OG image (use logo on cream), favicon from logo.png, sitemap.xml, robots.txt.
7. List every placeholder still in the site ([number], [email], review placeholders) so I can fill them.
```

---

### Open items to confirm with the client before going live
- **Phase 4 duration conflict:** the live site says 1 hour; the Investment PDF says 1.5 hours. The design currently doesn't state a duration for Phase 4. Confirm with Ambika before Stage 4.
- **WhatsApp number and email:** the current site uses a placeholder number. You need the real ones in `lib/site.ts`.
- **Payments:** Ambika needs her own Razorpay account (KYC). Switch from test to live keys only after her account is activated.
- **Reviews:** there are none yet. Launch with the section hidden, or collect 2–3 before launch.
- **Images:** apart from her portrait and logo, the photos are free Unsplash images (licence allows commercial use, no attribution required). A real shoot of Ambika would replace hero-sea, about-rock and sessions-call.
- **Portrait size:** `ambika.png` is only 800px. It works at the sizes in the design, but ask for a higher-resolution original.
