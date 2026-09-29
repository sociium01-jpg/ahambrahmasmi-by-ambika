export const WHATSAPP_NUMBER: string = "919003819484";
export const EMAIL: string = "Ahambrahmasmi.by.ambika@gmail.com";
export const LIVE_EMAIL_FALLBACK: string = "Ahambrahmasmi.by.ambika@gmail.com";
export const INSTAGRAM: string = "https://instagram.com/ahambrahmasmi.by.Ambika";
export const INSTAGRAM_HANDLE: string = "@ahambrahmasmi.by.Ambika";

export type CourseId = "whole" | "intro" | "tools";

export interface CourseOption {
  id: CourseId;
  name: string;
  mobileName: string;
  fullTitle: string;
  subtitle: string;
  tag: string;
  phases: string;
  priceInr: number;
  actualPriceInr?: number;
  priceLabel: string;
  priceRsLabel: string;
  actualPriceLabel?: string;
  badge?: string;
  mobileBadge?: string;
  best: boolean;
  description: string;
  mobileDescription: string;
  bookingDescDesktop: string;
  bookingDescMobile: string;
  includes: string;
  image: string;
  imageAlt: string;
  benefits?: string[];
}

export const COURSE_SESSIONS_LIST: string[] = [
  "Session 1 — watch videos",
  "Session 2 — live experiment + DIY · 1 to 1 coaching (1hr)",
  "Phase 3A — 1 to 1 coaching (2hrs)",
  "Phase 3B — 1 to 1 coaching (2hrs)",
  "Session 4 — tools · 1 to 1 coaching (2hrs)",
  "Session 5 — belief, affirmation, vision board · 1 to 1 coaching (1hr)",
  "WhatsApp support for the month · videos, meditations, booklet",
];

export const IMPORTANT_TO_READ = {
  eyebrow: "1 TO 1 · LOA COACHING",
  title: "Important to read",
  intro:
    "This is a 5-week one-to-one programme. Each session builds on the previous session, so it is important to complete the programme within this time.",
  bullets: [
    "The programme should be completed within 5 weeks. A 7-day grace period is allowed for unexpected situations.",
    "If you need to postpone a session, it must be completed within the programme period and will depend on my available time slots.",
    "If you stop the programme for a long period, especially for a month or more, we may need a Reorientation & Recap Session before continuing. This will help us go over what we have already covered and prepare for the next session.",
    "The Reorientation & Recap Session will be charged separately at Rs. 2,000/- per hour.",
    "Any additional coaching time needed because of a long break or for anything outside the programme will be charged at Rs. 2,000/- per hour.",
    "The programme fee is non-refundable once the programme has started.",
  ],
  closing:
    "These guidelines help us maintain continuity in your learning while also respecting the time and energy dedicated to your one-to-one journey.",
};

const SINGLE_COURSE: CourseOption = {
  id: "whole",
  name: "The 5-Week 1-to-1 LOA Course",
  mobileName: "The 5-Week Course",
  fullTitle: "The 5-Week 1-to-1 Law of Attraction Coaching Programme",
  subtitle: "One path. Paid in full. One to one.",
  tag: "5-Week Programme · All Sessions",
  phases: "Sessions 1, 2, Phase 3A, Phase 3B, Session 4 & Session 5",
  priceInr: 15000,
  priceLabel: "₹15,000",
  priceRsLabel: "Rs. 15,000/-",
  badge: "Only Introductory Price",
  mobileBadge: "Only Introductory Price · One enrolment",
  best: true,
  description:
    "All 6 one-to-one sessions across 5 weeks — from creating unshakeable faith in the Law of Attraction to emotional mastery tools, belief alignment, vision board, and a full month of WhatsApp support.",
  mobileDescription:
    "All sessions above. One enrolment. Includes 1-to-1 coaching (Sessions 1–5) + WhatsApp support for the month, videos, meditations & booklet.",
  bookingDescDesktop:
    "All sessions included · 5-week 1-to-1 coaching · WhatsApp support for the month, videos, meditations & booklet",
  bookingDescMobile:
    "All sessions above · One enrolment · 5-week 1-to-1 coaching + WhatsApp support",
  includes:
    "Sessions 1, 2 (1hr), 3A (2hrs), 3B (2hrs), 4 (2hrs), 5 (1hr) + 1 month WhatsApp support",
  image: "/images/hero-sea.jpg",
  imageAlt: "A woman sitting quietly by the sea at sunrise",
  benefits: COURSE_SESSIONS_LIST,
};

export const COURSES: Record<CourseId, CourseOption> = {
  whole: SINGLE_COURSE,
  intro: SINGLE_COURSE,
  tools: SINGLE_COURSE,
};

export const COURSE_LIST: CourseOption[] = [SINGLE_COURSE];

export const FURTHER_SESSIONS = {
  title: "Further sessions after the course",
  tag: "After the course",
  description:
    "Already completed the 5-week programme? Come back for a 1-hour or 30-minute one-to-one session whenever you want personal guidance.",
  hourlyInr: 2000,
  hourlyLabel: "₹2,000",
  hourlyRsLabel: "Rs. 2,000/-",
  halfHourInr: 1000,
  halfHourLabel: "₹1,000",
  halfHourRsLabel: "Rs. 1,000/-",
  image: "/images/sessions-call.jpg",
  imageAlt: "A woman smiling on a video call at home",
};

export type CallTimeId = "morning" | "afternoon" | "evening";

export const CALL_TIME_SLOTS: { id: CallTimeId; label: string }[] = [
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
  { id: "evening", label: "Evening" },
];

export function getWhatsAppUrl(
  message = "Hi Ambika, I'd love to know more about Ahambrahmasmi 1-to-1 coaching."
): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function getEmailHref(): string {
  const target = EMAIL === "[email]" ? LIVE_EMAIL_FALLBACK : EMAIL;
  return `mailto:${target}`;
}
