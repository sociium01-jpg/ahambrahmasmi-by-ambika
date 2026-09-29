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
      ? "btn-3d-gold inline-flex min-h-[46px] items-center justify-center gap-[10px] rounded-full px-[24px] py-[11px] font-inter text-[14px] sm:text-[15px] font-semibold text-ink cursor-pointer transition-all"
      : variant === "inline"
      ? "inline-flex min-h-[42px] items-center justify-center gap-[8px] rounded-full border border-lavender-frame/60 bg-white/80 backdrop-blur-md px-[18px] py-[8px] font-inter text-[13px] sm:text-[14px] font-semibold text-maroon shadow-sm hover:bg-lavender hover:border-maroon cursor-pointer transition-all"
      : "inline-flex min-h-[48px] items-center justify-center gap-[10px] rounded-full border-[1.5px] border-lavender-frame/70 bg-lavender/85 backdrop-blur-md px-[24px] py-[12px] font-inter text-[14px] sm:text-[15px] font-semibold text-maroon shadow-[0_8px_24px_rgba(104,79,122,0.16)] hover:bg-maroon hover:text-white hover:border-maroon cursor-pointer transition-all";

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
            {/* Translucent Frosted Backdrop */}
            <div
              onClick={() => setOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 bg-[#2C1D28]/55 backdrop-blur-md transition-opacity"
            />

            {/* Glass Translucent Double-Frame Card */}
            <div className="relative z-10 w-full max-w-[840px] max-h-[90vh] overflow-y-auto rounded-[28px] sm:rounded-[34px] border-[2px] border-white/80 bg-gradient-to-br from-[#FBF5EE]/88 via-[#F7F2FA]/85 to-[#F3E3C8]/85 p-[22px] sm:p-[42px] lg:p-[54px] shadow-[0_32px_90px_rgba(44,29,40,0.42),inset_0_1px_2px_rgba(255,255,255,0.95)] backdrop-blur-2xl">
              {/* Inner Sacred Gold & Lavender Frame Line */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[8px] sm:inset-[10px] rounded-[22px] sm:rounded-[26px] border border-[#846B96]/55 shadow-[inset_0_0_0_3px_rgba(255,255,255,0.45),inset_0_0_0_4px_rgba(191,175,117,0.65)]"
              />

              {/* Top-Right Translucent Glass Close Button */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close guidelines"
                className="sticky top-[4px] float-right z-20 flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/90 bg-white/75 text-ink shadow-md backdrop-blur-md hover:bg-maroon hover:text-white cursor-pointer transition-colors"
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

              {/* Header */}
              <div className="relative z-10 flex flex-col items-center text-center clear-both sm:clear-none">
                <div className="mb-[10px] flex h-[64px] w-[64px] items-center justify-center overflow-hidden rounded-full border border-white/90 bg-white/90 shadow-sm">
                  <AnimatedLogo variant="circle" size={60} />
                </div>

                <p className="m-0 font-cursive text-[28px] sm:text-[34px] leading-[1.15] text-lavender-deep">
                  A journey of self discovery
                </p>

                <span className="mt-[10px] font-inter text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.22em] text-lavender-deep">
                  {IMPORTANT_TO_READ.eyebrow}
                </span>

                <h2
                  id="guidelines-modal-title"
                  className="m-0 mt-[4px] font-playfair text-[32px] sm:text-[44px] lg:text-[48px] font-medium leading-[1.1] text-maroon"
                >
                  {IMPORTANT_TO_READ.title}
                </h2>

                <div
                  aria-hidden="true"
                  className="mt-[12px] h-[1.5px] w-[200px] sm:w-[260px] bg-[#C8B87A]"
                />
              </div>

              {/* Body Copy inside Frosted Glass Panel */}
              <div className="relative z-10 mx-auto mt-[22px] sm:mt-[28px] max-w-[720px] flex flex-col gap-[18px]">
                <p className="m-0 font-cormorant text-[20px] sm:text-[23px] font-medium leading-[1.5] text-ink">
                  {IMPORTANT_TO_READ.intro}
                </p>

                <ul className="m-0 flex flex-col gap-[14px] sm:gap-[16px] rounded-[22px] border border-white/85 bg-white/65 p-[20px] sm:p-[28px] pl-[20px] sm:pl-[28px] list-none shadow-[0_12px_32px_rgba(104,79,122,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] backdrop-blur-xl">
                  {IMPORTANT_TO_READ.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-[14px] font-cormorant text-[19px] sm:text-[22px] font-medium leading-[1.48] text-ink"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[10px] h-[6px] w-[6px] shrink-0 rounded-full bg-maroon"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <p className="m-0 pt-[4px] font-cormorant text-[19px] sm:text-[22px] italic leading-[1.5] text-lavender-deep">
                  {IMPORTANT_TO_READ.closing}
                </p>
              </div>

              {/* Footer */}
              <div className="relative z-10 mt-[24px] flex flex-col sm:flex-row items-center justify-between gap-[14px] border-t border-[#C8B87A]/40 pt-[18px]">
                <span className="font-cormorant text-[19px] italic text-muted">
                  Aham Brahmasmi · by Ambika
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn-3d-maroon inline-flex min-h-[46px] items-center justify-center rounded-full px-[28px] py-[11px] font-inter text-[14px] font-semibold text-white cursor-pointer"
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
