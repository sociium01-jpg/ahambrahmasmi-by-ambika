"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";
import { IMPORTANT_TO_READ } from "@/lib/site";

interface GuidelinesModalProps {
  buttonLabel?: string;
  variant?: "pill" | "gold" | "inline";
  className?: string;
}

export function GuidelinesModal({
  buttonLabel = "Guidelines",
  variant = "pill",
  className = "",
}: GuidelinesModalProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const baseButtonStyles =
    variant === "gold"
      ? "btn-3d-gold inline-flex min-h-[46px] items-center justify-center gap-[10px] rounded-full px-[24px] py-[11px] font-sans text-[14px] sm:text-[15px] font-semibold text-ink cursor-pointer transition-all"
      : variant === "inline"
      ? "inline-flex min-h-[42px] items-center justify-center gap-[8px] rounded-full border border-lavender-frame/60 bg-white/90 px-[18px] py-[8px] font-sans text-[13px] sm:text-[14px] font-semibold text-maroon shadow-sm hover:bg-maroon hover:text-white hover:border-maroon cursor-pointer transition-all"
      : "inline-flex min-h-[48px] items-center justify-center gap-[10px] rounded-full border-[1.5px] border-lavender-frame/70 bg-lavender px-[24px] py-[12px] font-sans text-[14px] sm:text-[15px] font-semibold text-maroon shadow-[0_8px_24px_rgba(104,79,122,0.16)] hover:bg-maroon hover:text-white hover:border-maroon cursor-pointer transition-all";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`${baseButtonStyles} ${className}`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="14" y2="17" />
        </svg>
        <span>{buttonLabel}</span>
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="guidelines-modal-title"
            className="fixed inset-0 z-[120] flex items-center justify-center p-[12px] sm:p-[24px] lg:p-[40px] animate-fade-up"
          >
            {/* Deep Frosted Backdrop so background text never bleeds through */}
            <div
              onClick={() => setOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 transition-opacity"
              style={{
                backgroundColor: "rgba(18, 10, 16, 0.80)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            />

            {/* Dark Frosted Glass Translucent Card with Crisp White Normal Font */}
            <div
              className="relative z-10 w-full max-w-[820px] max-h-[90vh] overflow-y-auto rounded-[28px] sm:rounded-[34px] border-[2px] border-white/35 p-[22px] sm:p-[42px] lg:p-[52px] text-white shadow-[0_32px_90px_rgba(0,0,0,0.65)] font-sans not-italic"
              style={{
                background:
                  "linear-gradient(145deg, rgba(44, 26, 38, 0.94) 0%, rgba(32, 18, 28, 0.96) 100%)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
              }}
            >
              {/* Inner Sacred Gold Frame Line */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[8px] sm:inset-[10px] rounded-[22px] sm:rounded-[26px] border border-[#E7B85A]/45"
              />

              {/* Top-Right Glass Close Button */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close guidelines"
                className="sticky top-[4px] float-right z-20 flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/40 bg-white/15 text-white shadow-md hover:bg-maroon hover:border-white cursor-pointer transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Header — Normal upright font in White & Gold */}
              <div className="relative z-10 flex flex-col items-center text-center clear-both sm:clear-none">
                <div className="mb-[12px] flex h-[64px] w-[64px] items-center justify-center overflow-hidden rounded-full border-2 border-[#E7B85A] bg-white shadow-md">
                  <AnimatedLogo variant="circle" size={60} />
                </div>

                <p className="m-0 font-sans text-[13px] sm:text-[14px] font-medium tracking-[0.08em] text-white/90 not-italic">
                  A journey of self discovery
                </p>

                <span className="mt-[8px] font-sans text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.22em] text-[#E7B85A]">
                  {IMPORTANT_TO_READ.eyebrow}
                </span>

                <h2
                  id="guidelines-modal-title"
                  className="m-0 mt-[6px] font-sans text-[28px] sm:text-[36px] lg:text-[40px] font-bold leading-[1.15] text-white not-italic"
                >
                  {IMPORTANT_TO_READ.title}
                </h2>

                <div
                  aria-hidden="true"
                  className="mt-[14px] h-[1.5px] w-[200px] sm:w-[260px] bg-[#E7B85A]/70"
                />
              </div>

              {/* Body Copy — Crisp White Normal Font */}
              <div className="relative z-10 mx-auto mt-[22px] sm:mt-[28px] max-w-[720px] flex flex-col gap-[18px]">
                <p className="m-0 font-sans text-[16px] sm:text-[18px] font-normal leading-[1.65] text-white not-italic">
                  {IMPORTANT_TO_READ.intro}
                </p>

                <ul
                  className="m-0 flex flex-col gap-[14px] sm:gap-[16px] rounded-[20px] border border-white/25 p-[20px] sm:p-[28px] pl-[20px] sm:pl-[28px] list-none"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {IMPORTANT_TO_READ.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-[14px] font-sans text-[15px] sm:text-[17px] font-normal leading-[1.6] text-white not-italic"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[9px] h-[7px] w-[7px] shrink-0 rounded-full bg-[#E7B85A]"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <p className="m-0 pt-[4px] font-sans text-[15px] sm:text-[16px] font-normal leading-[1.6] text-white/90 not-italic">
                  {IMPORTANT_TO_READ.closing}
                </p>
              </div>

              {/* Footer */}
              <div className="relative z-10 mt-[24px] flex flex-col sm:flex-row items-center justify-between gap-[14px] border-t border-white/20 pt-[18px]">
                <span className="font-sans text-[14px] font-medium text-[#E7B85A] not-italic">
                  Aham Brahmasmi · by Ambika
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn-3d-maroon inline-flex min-h-[46px] items-center justify-center rounded-full px-[28px] py-[11px] font-sans text-[14px] font-semibold text-white cursor-pointer"
                >
                  Got it · Close Guidelines
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
