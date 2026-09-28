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

export const COURSES: Record<CourseId, CourseOption> = {
  whole: {
    id: "whole",
    name: "The whole path",
    mobileName: "The whole path",
    fullTitle: "Introduction to LOA + Tools for Emotional Mastery",
    subtitle: "Introduction to LOA + Tools for Emotional Mastery",
    tag: "Whole path · Phases 1–5",
    phases: "Phases 1, 2, 3A, 3B, 4 and 5",
    priceInr: 12500,
    actualPriceInr: 25000,
    priceLabel: "₹12,500",
    actualPriceLabel: "₹25,000",
    badge: "Save ₹1,000",
    mobileBadge: "Save ₹1,000 · includes WhatsApp support",
    best: true,
    description:
      "Includes all five phases, WhatsApp support for the month, videos, meditations and the booklet.",
    mobileDescription:
      "Includes all five phases, WhatsApp support for the month, videos, meditations and the booklet.",
    bookingDescDesktop:
      "Introduction + Tools · all phases · WhatsApp support for the month",
    bookingDescMobile: "Introduction + Tools · all five phases",
    includes: "Phases 1–5, support, videos, booklet",
    image: "/images/hero-sea.jpg",
    imageAlt: "A woman sitting quietly by the sea at sunrise",
    benefits: [
      "All five phases, one-to-one",
      "WhatsApp support for the month",
      "Videos, meditations and the booklet",
      "₹1,000 less than taking both courses separately",
    ],
  },
  intro: {
    id: "intro",
    name: "Introduction to LOA",
    mobileName: "Introduction to LOA",
    fullTitle: "Introduction to LOA: Creating Faith in the Law",
    subtitle: "Course 1 · Phases 1, 2, 3A, 3B",
    tag: "Course 1 · Phases 1–3B",
    phases: "Phases 1, 2, 3A, 3B",
    priceInr: 8500,
    priceLabel: "₹8,500",
    best: false,
    description:
      "Creating faith in the Law — live experiments, a week of DIY observation, your body as an instrument, and the 5-step creative process.",
    mobileDescription:
      "Creating faith in the Law — live experiments, DIY observation, your body as an instrument, and the 5-step creative process.",
    bookingDescDesktop: "Course 1 · Phases 1, 2, 3A, 3B",
    bookingDescMobile: "Course 1 · Phases 1, 2, 3A, 3B",
    includes: "Phases 1, 2, 3A, 3B",
    image: "/images/course1-bench.jpg",
    imageAlt: "A woman watching a sunset from a hilltop bench",
  },
  tools: {
    id: "tools",
    name: "Tools for Emotional Mastery",
    mobileName: "Emotional Mastery",
    fullTitle: "Tools for Emotional Mastery",
    subtitle: "Course 2 · Phases 4 and 5",
    tag: "Course 2 · Phases 4–5",
    phases: "Phases 4 and 5",
    priceInr: 5000,
    priceLabel: "₹5,000",
    best: false,
    description:
      "Pivoting, hourly breathwork, visualisation, gratitude journal, a look at your beliefs — and your vision board.",
    mobileDescription:
      "Pivoting, hourly breathwork, visualisation, gratitude journal, beliefs and your vision board.",
    bookingDescDesktop: "Course 2 · Phases 4 and 5",
    bookingDescMobile: "Course 2 · Phases 4 and 5",
    includes: "Phases 4 and 5",
    image: "/images/course2-journal.jpg",
    imageAlt: "Hands writing in a journal",
  },
};

export const COURSE_LIST: CourseOption[] = [
  COURSES.whole,
  COURSES.intro,
  COURSES.tools,
];

export const FURTHER_SESSIONS = {
  title: "Further sessions",
  tag: "After the course",
  description:
    "Already walked the path? Come back for a one-hour or 30-minute session when you want guidance.",
  hourlyInr: 2000,
  hourlyLabel: "₹2,000",
  halfHourInr: 1000,
  halfHourLabel: "₹1,000",
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
