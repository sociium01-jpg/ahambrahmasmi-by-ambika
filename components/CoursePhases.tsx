"use client";

import React, { useState } from "react";

export interface PhaseItem {
  id: string;
  badge: string;
  title: string;
  duration?: string;
  paragraphs: React.ReactNode[];
  tools?: string[];
}

interface CoursePhasesProps {
  phases: PhaseItem[];
  variant?: "sand" | "maroon";
}

export function CoursePhases({
  phases,
  variant = "sand",
}: CoursePhasesProps) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() =>
    phases.reduce((acc, p) => ({ ...acc, [p.id]: true }), {})
  );

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col gap-[16px]">
      {phases.map((phase) => {
        const isOpen = Boolean(openIds[phase.id]);
        return (
          <div
            key={phase.id}
            className="overflow-hidden rounded-[22px] border border-divider bg-white transition-all"
          >
            <button
              type="button"
              onClick={() => toggle(phase.id)}
              aria-expanded={isOpen}
              className="flex w-full min-h-[68px] items-center justify-between gap-[16px] px-[20px] py-[18px] lg:px-[28px] lg:py-[22px] text-left bg-white hover:bg-cream/50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-[16px]">
                <span
                  className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full font-serif text-[18px] ${
                    variant === "maroon"
                      ? "bg-maroon text-gold"
                      : "bg-sand text-maroon"
                  }`}
                >
                  {phase.badge}
                </span>
                <div className="flex flex-col gap-[2px]">
                  <span className="font-serif text-[22px] lg:text-[26px] text-ink leading-tight">
                    {phase.title}
                  </span>
                  {phase.duration && (
                    <span className="text-[13px] font-medium uppercase tracking-[1.5px] text-gold-text">
                      {phase.duration}
                    </span>
                  )}
                </div>
              </div>
              <span
                aria-hidden="true"
                className={`flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border border-line text-maroon transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </button>

            {isOpen && (
              <div className="flex flex-col gap-[16px] border-t border-divider px-[20px] py-[20px] lg:px-[28px] lg:py-[24px] text-[16px] lg:text-[17px] leading-[1.7] text-body">
                {phase.paragraphs.map((p, i) => (
                  <p key={i} className="m-0">
                    {p}
                  </p>
                ))}
                {phase.tools && phase.tools.length > 0 && (
                  <div className="mt-[4px] flex flex-col gap-[10px]">
                    <span className="text-[12px] font-medium uppercase tracking-[2px] text-gold-text">
                      Mind management tools covered
                    </span>
                    <div className="flex flex-wrap gap-[8px]">
                      {phase.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full border border-line bg-sand/70 px-[14px] py-[6px] text-[14px] font-medium text-ink"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
