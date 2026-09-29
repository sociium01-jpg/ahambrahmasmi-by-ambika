"use client";

import React, { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    question: "How is the 5-week 1-to-1 programme structured?",
    answer:
      "It is one complete, unified 5-week path taught personally one-to-one with Ambika on online video calls — never in a group or pre-recorded seminar. It covers Session 1 (watch preparation videos), Session 2 (1 hr live experiment + DIY), Phase 3A (2 hrs), Phase 3B (2 hrs), Session 4 (2 hrs tools), and Session 5 (1 hr belief, affirmation & vision board), plus a full month of WhatsApp support.",
  },
  {
    question: "What is the fee for the 5-week course?",
    answer:
      "The complete 5-week course is Rs. 15,000/- (only Introductory Price), paid in full as one enrolment covering all sessions, WhatsApp support for the month, curated videos, meditations, and your practice booklet.",
  },
  {
    question: "What if I need to postpone a session or take a break?",
    answer:
      "The programme should be completed within 5 weeks, with a 7-day grace period allowed for unexpected situations. Postponed sessions must be completed within the programme period based on available time slots. If you stop for a month or more, a Reorientation & Recap Session (charged separately at Rs. 2,000/- per hour) is needed before continuing.",
  },
  {
    question: "Do I need any prior experience with the Law of Attraction?",
    answer:
      "None at all. You begin Session 1 by watching The Secret (Ambika shares the YouTube link on WhatsApp after you book) along with a few short preparation videos before your first live experiment call.",
  },
  {
    question: "Can I book follow-up sessions after completing the 5-week course?",
    answer:
      "Yes. Once you have completed the course, you can return anytime for a 1-hour session (Rs. 2,000/-) or a 30-minute session (Rs. 1,000/-) by messaging Ambika directly on WhatsApp.",
  },
];

export function CoachingFaq({ items = DEFAULT_FAQS }: { items?: FaqItem[] }) {
  // Only one open at a time, first open by default (index 0)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col divide-y divide-lavender-border/70 rounded-[24px] lg:rounded-[32px] border border-lavender-border bg-lavender-soft/75 px-[20px] py-[8px] lg:px-[40px] lg:py-[16px]">
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
                className={`flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border border-lavender-border text-[22px] font-light text-maroon transition-transform duration-300 ${
                  isOpen ? "rotate-45 bg-lavender border-maroon" : "rotate-0 bg-white"
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
