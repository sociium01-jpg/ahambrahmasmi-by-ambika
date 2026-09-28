"use client";

import React, { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    question: "How are the 1-to-1 coaching sessions conducted?",
    answer:
      "Every session is taught personally, one-to-one with Ambika on an online video call — never in a group or via pre-recorded courses. Between calls, you take around a week to observe and practice the principles in your own daily life, supported by a short recap and practice page.",
  },
  {
    question: "Should I start with Course 1 or The Whole Path?",
    answer:
      "You can begin with Course 1 (Introduction to LOA · ₹8,500) and add Course 2 (Tools for Emotional Mastery · ₹5,000) later, or book The Whole Path together for ₹12,500 — which saves ₹1,000 and includes a full month of personal WhatsApp support with Ambika.",
  },
  {
    question: "Do I need any prior experience with the Law of Attraction?",
    answer:
      "None at all. You begin Phase 1 by watching The Secret (Ambika shares the YouTube link on WhatsApp after you book) along with a few short preparation videos before your first live experiment call.",
  },
  {
    question: "How do we schedule call times after I book?",
    answer:
      "When you book, you select your preferred time window in IST (Morning, Afternoon, or Evening). Ambika messages you personally on WhatsApp to fix the exact day and time for your first call.",
  },
  {
    question: "Can I book single follow-up sessions after completing the course?",
    answer:
      "Yes. Once you have walked the path, you can return anytime for a 1-hour session (₹2,000) or a 30-minute session (₹1,000) by messaging Ambika directly on WhatsApp.",
  },
];

export function CoachingFaq({ items = DEFAULT_FAQS }: { items?: FaqItem[] }) {
  // Only one open at a time, first open by default (index 0)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col divide-y divide-divider rounded-[24px] lg:rounded-[32px] border border-line bg-white px-[20px] py-[8px] lg:px-[40px] lg:py-[16px]">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.question} className="py-[18px] lg:py-[24px]">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full min-h-[48px] items-center justify-between gap-[16px] bg-transparent text-left cursor-pointer group"
            >
              <span className="font-playfair text-[20px] lg:text-[24px] font-normal leading-[1.3] text-ink group-hover:text-maroon transition-colors">
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className={`flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border border-line text-[22px] font-light text-maroon transition-transform duration-300 ${
                  isOpen ? "rotate-45 bg-sand border-maroon" : "rotate-0"
                }`}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="pt-[14px] pr-[12px] lg:pr-[48px] font-inter text-[15px] lg:text-[16px] font-light leading-[1.7] text-body">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
