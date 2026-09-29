"use client";

import React from "react";
import Link from "next/link";
import { GuidelinesModal } from "@/components/GuidelinesModal";

interface CourseCardItem {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  duration: string;
  tone: "beige" | "lavender";
  icon: React.ReactNode;
}

const COURSE_3D_ITEMS: CourseCardItem[] = [
  {
    id: "session-1",
    step: "Session 1",
    title: "Watch videos",
    subtitle:
      "Begin at your own pace with The Secret and curated foundation talks shared by Ambika.",
    duration: "Pre-call video foundation",
    tone: "beige",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="4" />
        <polygon points="10 9 15 12 10 15 10 9" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "session-2",
    step: "Session 2",
    title: "Live experiment + DIY",
    subtitle:
      "Experience first-hand how your thoughts translate into real-life synchronicity over 48 hours.",
    duration: "1 to 1 coaching (1hr)",
    tone: "lavender",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    id: "phase-3a",
    step: "Phase 3A",
    title: "1 to 1 coaching (2hrs)",
    subtitle:
      "Unpack what happened behind the scenes in your experiment and understand the system of creation.",
    duration: "1 to 1 coaching (2hrs)",
    tone: "beige",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="9" ry="4" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
      </svg>
    ),
  },
  {
    id: "phase-3b",
    step: "Phase 3B",
    title: "1 to 1 coaching (2hrs)",
    subtitle:
      "Deepen your understanding of your Emotional Guidance System, vibration, and point of attraction.",
    duration: "1 to 1 coaching (2hrs)",
    tone: "lavender",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: "session-4",
    step: "Session 4",
    title: "Tools · 1 to 1 coaching (2hrs)",
    subtitle:
      "Master practical Abraham Hicks processes, meditation, and emotional navigation for daily life.",
    duration: "1 to 1 coaching (2hrs)",
    tone: "beige",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    id: "session-5",
    step: "Session 5",
    title: "Belief, affirmation, vision board",
    subtitle:
      "Reshape limiting beliefs, craft personal affirmations, build your vision board & daily alignment plan.",
    duration: "1 to 1 coaching (1hr)",
    tone: "lavender",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    id: "whatsapp-support",
    step: "Included All Month",
    title: "WhatsApp support for the month · videos, meditations, booklet",
    subtitle:
      "Continuous guidance throughout your 5-week journey along with curated videos, guided meditations & practice booklet.",
    duration: "Full 5-Week Support",
    tone: "beige",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <path d="M9 7h6M9 11h6" />
      </svg>
    ),
  },
];

export function Course3DCards() {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-wrap items-center justify-between gap-[14px]">
        <div className="flex flex-col gap-[4px]">
          <span className="font-cursive text-[28px] sm:text-[34px] leading-none text-lavender-deep">
            Step by step · One to one
          </span>
          <h3 className="m-0 font-playfair text-[26px] sm:text-[32px] font-medium text-maroon">
            The course
          </h3>
        </div>
        <GuidelinesModal
          buttonLabel="Guidelines · Important to read"
          variant="pill"
        />
      </div>

      {/* 3D Animated Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px] sm:gap-[22px]">
        {COURSE_3D_ITEMS.map((card, idx) => {
          const isFullWidthLast = idx === COURSE_3D_ITEMS.length - 1;
          const isBeige = card.tone === "beige";

          return (
            <div
              key={card.id}
              className={`group relative flex flex-col justify-between gap-[16px] rounded-[24px] p-[22px] sm:p-[26px] transition-all duration-300 hover:-translate-y-[6px] active:translate-y-[1px] ${
                isFullWidthLast ? "md:col-span-2 lg:col-span-3" : ""
              } ${
                isBeige
                  ? "bg-gradient-to-br from-[#F7EAD2] via-[#F3E3C8] to-[#EAD3AE] border border-[#DEC8A2] border-b-[6px] border-b-[#C5A97A] shadow-[0_14px_30px_rgba(78,59,44,0.10),inset_0_1px_0_rgba(255,255,255,0.85)] hover:shadow-[0_22px_44px_rgba(78,59,44,0.16),inset_0_1px_0_rgba(255,255,255,0.95)]"
                  : "bg-gradient-to-br from-[#F8F3FB] via-[#F1E8F5] to-[#E5D5EE] border border-[#D5C0E0] border-b-[6px] border-b-[#B69BC7] shadow-[0_14px_30px_rgba(104,79,122,0.11),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-[0_22px_44px_rgba(104,79,122,0.18),inset_0_1px_0_rgba(255,255,255,0.95)]"
              }`}
            >
              {/* Top Row: 3D Animated Icon Orb + Step Pill */}
              <div className="flex items-center justify-between gap-[12px]">
                <div
                  className={`flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[18px] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                    isBeige
                      ? "bg-white/90 text-maroon border border-[#DEC8A2] shadow-[0_6px_14px_rgba(142,27,37,0.12),inset_0_1px_0_#FFF]"
                      : "bg-white/90 text-lavender-deep border border-[#D5C0E0] shadow-[0_6px_14px_rgba(104,79,122,0.14),inset_0_1px_0_#FFF]"
                  }`}
                >
                  {card.icon}
                </div>

                <span
                  className={`rounded-full px-[14px] py-[5px] font-inter text-[11px] font-bold uppercase tracking-[0.16em] ${
                    isBeige
                      ? "bg-white/80 text-maroon border border-[#DEC8A2]"
                      : "bg-white/85 text-lavender-deep border border-[#D5C0E0]"
                  }`}
                >
                  {card.step}
                </span>
              </div>

              {/* Middle Content */}
              <div
                className={`flex flex-col gap-[8px] ${
                  isFullWidthLast
                    ? "lg:flex-row lg:items-center lg:justify-between lg:gap-[24px]"
                    : ""
                }`}
              >
                <div className="flex flex-col gap-[6px]">
                  <h4 className="m-0 font-playfair text-[21px] sm:text-[23px] font-medium leading-[1.25] text-ink group-hover:text-maroon transition-colors">
                    {card.title}
                  </h4>
                  <p className="m-0 font-cormorant text-[18px] sm:text-[19px] leading-[1.45] text-body">
                    {card.subtitle}
                  </p>
                </div>

                {/* Bottom / Right Duration Badge */}
                <div className="pt-[8px] lg:pt-0 shrink-0 flex items-center justify-between border-t border-ink/10 lg:border-t-0">
                  <span className="inline-flex items-center gap-[6px] rounded-full bg-white/75 px-[14px] py-[6px] font-inter text-[12px] font-semibold text-ink shadow-sm">
                    <span
                      aria-hidden="true"
                      className="h-[6px] w-[6px] rounded-full bg-maroon animate-pulse"
                    />
                    {card.duration}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-[14px] pt-[6px]">
        <Link
          href="/course"
          className="inline-flex min-h-[46px] items-center gap-[8px] font-inter text-[14px] font-semibold text-maroon no-underline hover:underline"
        >
          <span>Read full session-by-session details on the Course page →</span>
        </Link>
        <GuidelinesModal buttonLabel="Guidelines" variant="inline" />
      </div>
    </div>
  );
}
