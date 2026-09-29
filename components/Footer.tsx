"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";
import {
  EMAIL,
  IMPORTANT_TO_READ,
  INSTAGRAM,
  INSTAGRAM_HANDLE,
  getEmailHref,
} from "@/lib/site";

type PopupType = "guidelines" | "privacy" | "accessibility" | null;

export function Footer() {
  const pathname = usePathname();
  const [activePopup, setActivePopup] = useState<PopupType>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!activePopup) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePopup(null);
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePopup]);

  if (pathname?.startsWith("/book")) {
    return null;
  }

  const emailHref = getEmailHref();

  return (
    <>
      <footer
        id="contact"
        className="mt-[72px] lg:mt-[110px] w-full bg-plum-night text-cream border-t border-gold/20"
      >
        <div className="mx-auto max-w-[1440px] px-[20px] pt-[56px] pb-[128px] lg:px-[80px] lg:pt-[76px] lg:pb-[48px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-[36px] lg:gap-[44px]">
            {/* Column 1: Brand + Animated Logo */}
            <div className="lg:col-span-4 flex flex-col items-start gap-[16px]">
              <Link
                href="/"
                className="inline-flex items-center gap-[14px] no-underline group"
              >
                <span className="flex h-[62px] w-[62px] shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-gold/60 bg-white shadow-md">
                  <AnimatedLogo variant="circle" size={58} />
                </span>
                <span className="flex flex-col">
                  <span className="font-playfair text-[24px] text-white group-hover:text-gold transition-colors">
                    Ahambrahmasmi
                  </span>
                  <span className="font-cursive text-[24px] leading-tight text-gold">
                    by Ambika · A journey of self discovery
                  </span>
                </span>
              </Link>
              <p className="m-0 font-inter text-[14px] font-light leading-[1.7] text-white/75 max-w-[340px]">
                Intimate, one-to-one Law of Attraction coaching with Ambika
                Mohan. One path. Paid in full. One to one. Everything happens in
                perfect Divine timing.
              </p>
            </div>

            {/* Column 2: Menu Links */}
            <div className="lg:col-span-3 flex flex-col gap-[10px]">
              <span className="font-inter text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
                Menu Links
              </span>
              <Link
                href="/"
                className="font-inter text-[14px] text-white/80 hover:text-gold no-underline py-[2px] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="font-inter text-[14px] text-white/80 hover:text-gold no-underline py-[2px] transition-colors"
              >
                About Ambika
              </Link>
              <Link
                href="/course"
                className="font-inter text-[14px] text-white/80 hover:text-gold no-underline py-[2px] transition-colors"
              >
                The 5-Week Course
              </Link>
              <Link
                href="/coaching"
                className="font-inter text-[14px] text-white/80 hover:text-gold no-underline py-[2px] transition-colors"
              >
                1-to-1 Coaching
              </Link>
              <Link
                href="/investment"
                className="font-inter text-[14px] text-white/80 hover:text-gold no-underline py-[2px] transition-colors"
              >
                Investment (Rs. 15,000/-)
              </Link>
              <Link
                href="/reviews"
                className="font-inter text-[14px] text-white/80 hover:text-gold no-underline py-[2px] transition-colors"
              >
                Seekers’ Words (Reviews)
              </Link>
              <Link
                href="/space"
                className="font-inter text-[14px] text-white/80 hover:text-gold no-underline py-[2px] transition-colors"
              >
                Seeker / Student Login
              </Link>
              <Link
                href="/book"
                className="font-inter text-[14px] font-medium text-gold hover:underline no-underline py-[2px]"
              >
                Book the Course →
              </Link>
            </div>

            {/* Column 3: Guidelines, Privacy Policy & Accessibility (All Popup & Close Format) */}
            <div className="lg:col-span-2 flex flex-col items-start gap-[10px]">
              <span className="font-inter text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
                Policies &amp; Info
              </span>
              <button
                type="button"
                onClick={() => setActivePopup("guidelines")}
                className="bg-transparent border-0 p-0 py-[2px] text-left font-inter text-[14px] text-white/80 hover:text-gold cursor-pointer transition-colors"
              >
                Guidelines (Important to read)
              </button>
              <button
                type="button"
                onClick={() => setActivePopup("privacy")}
                className="bg-transparent border-0 p-0 py-[2px] text-left font-inter text-[14px] text-white/80 hover:text-gold cursor-pointer transition-colors"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setActivePopup("accessibility")}
                className="bg-transparent border-0 p-0 py-[2px] text-left font-inter text-[14px] text-white/80 hover:text-gold cursor-pointer transition-colors"
              >
                Accessibility
              </button>
            </div>

            {/* Column 4: Contact Details (Email Only — No WhatsApp Number) */}
            <div className="lg:col-span-3 flex flex-col gap-[12px]">
              <span className="font-inter text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
                Contact Details
              </span>
              <a
                href={emailHref}
                className="inline-flex items-center gap-[10px] font-inter text-[14px] text-white/85 hover:text-gold no-underline py-[2px] break-all transition-colors"
              >
                <span className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-white/10 text-gold">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="3" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <span>{EMAIL}</span>
              </a>

              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[10px] font-inter text-[14px] text-white/85 hover:text-gold no-underline py-[2px] transition-colors"
              >
                <span className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-white/10 text-gold">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </span>
                <span>{INSTAGRAM_HANDLE}</span>
              </a>

              <span className="font-inter text-[13px] text-white/60 pt-[4px]">
                1-to-1 Online Coaching · Worldwide
              </span>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Sociium Credit */}
          <div className="mt-[44px] border-t border-white/15 pt-[24px] flex flex-col sm:flex-row items-center justify-between gap-[12px] text-center sm:text-left">
            <span className="font-inter text-[13px] text-white/65">
              © 2026 Ahambrahmasmi by Ambika. All rights reserved.
            </span>
            <span className="font-inter text-[13px] font-medium tracking-[0.04em] text-gold">
              Designed and Developed Sociium. 2026
            </span>
          </div>
        </div>
      </footer>

      {/* ============================================================
          GLASS TRANSLUCENT POPUP MODALS (GUIDELINES, PRIVACY POLICY, ACCESSIBILITY)
          ============================================================ */}
      {mounted &&
        activePopup &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="footer-popup-title"
            className="fixed inset-0 z-[120] flex items-center justify-center p-[12px] sm:p-[24px] lg:p-[40px] animate-fade-up"
          >
            {/* Deep Frosted Backdrop */}
            <div
              onClick={() => setActivePopup(null)}
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

              {/* Top-Right Translucent Glass Close Button */}
              <button
                type="button"
                onClick={() => setActivePopup(null)}
                aria-label="Close popup"
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
                  {activePopup === "guidelines"
                    ? IMPORTANT_TO_READ.eyebrow
                    : activePopup === "privacy"
                    ? "AHAMBRAHMASMI BY AMBIKA · PRIVACY"
                    : "AHAMBRAHMASMI BY AMBIKA · INCLUSIVITY"}
                </span>

                <h2
                  id="footer-popup-title"
                  className="m-0 mt-[6px] font-sans text-[28px] sm:text-[36px] lg:text-[40px] font-bold leading-[1.15] text-white not-italic"
                >
                  {activePopup === "guidelines"
                    ? IMPORTANT_TO_READ.title
                    : activePopup === "privacy"
                    ? "Privacy Policy"
                    : "Accessibility Statement"}
                </h2>

                <div
                  aria-hidden="true"
                  className="mt-[14px] h-[1.5px] w-[200px] sm:w-[260px] bg-[#E7B85A]/70"
                />
              </div>

              {/* Content for Guidelines */}
              {activePopup === "guidelines" && (
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
              )}

              {/* Content for Privacy Policy */}
              {activePopup === "privacy" && (
                <div className="relative z-10 mx-auto mt-[22px] sm:mt-[28px] max-w-[720px] flex flex-col gap-[16px]">
                  <div
                    className="rounded-[20px] border border-white/25 p-[22px] sm:p-[30px] flex flex-col gap-[14px] font-sans text-[15px] sm:text-[17px] leading-[1.65] text-white not-italic"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <p className="m-0">
                      <strong className="text-[#E7B85A]">
                        1. Sacred Confidentiality:
                      </strong>{" "}
                      Every one-to-one coaching conversation, personal
                      reflection, and life circumstance shared with Ambika Mohan
                      during your 5-week journey is held in strict, sacred
                      confidence.
                    </p>
                    <p className="m-0">
                      <strong className="text-[#E7B85A]">
                        2. Information We Collect:
                      </strong>{" "}
                      When you enrol in the 5-week course or submit a review, we
                      collect only the details needed to coordinate your 1-to-1
                      sessions — your name, email address, contact number, and
                      preferred session time slot.
                    </p>
                    <p className="m-0">
                      <strong className="text-[#E7B85A]">
                        3. Secure Payments:
                      </strong>{" "}
                      All course fee payments (`Rs. 15,000/-`) are processed
                      securely through <strong>Razorpay</strong> using encrypted
                      UPI, card, or netbanking channels. We never store your
                      card numbers or banking credentials on our servers.
                    </p>
                    <p className="m-0">
                      <strong className="text-[#E7B85A]">
                        4. Seekers’ Reviews &amp; Notes:
                      </strong>{" "}
                      Reviews submitted on the site or inside the Seeker Portal
                      are published only after approval. Personal notes saved in
                      your Seeker Portal remain private to your browser/account.
                    </p>
                    <p className="m-0">
                      <strong className="text-[#E7B85A]">
                        5. Contact for Privacy Requests:
                      </strong>{" "}
                      For any questions or data deletion requests, please write
                      directly to{" "}
                      <a
                        href={emailHref}
                        className="text-[#E7B85A] underline font-semibold hover:text-white"
                      >
                        {EMAIL}
                      </a>
                      .
                    </p>
                  </div>
                </div>
              )}

              {/* Content for Accessibility */}
              {activePopup === "accessibility" && (
                <div className="relative z-10 mx-auto mt-[22px] sm:mt-[28px] max-w-[720px] flex flex-col gap-[16px]">
                  <div
                    className="rounded-[20px] border border-white/25 p-[22px] sm:p-[30px] flex flex-col gap-[14px] font-sans text-[15px] sm:text-[17px] leading-[1.65] text-white not-italic"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <p className="m-0">
                      <strong className="text-[#E7B85A]">
                        Our Commitment:
                      </strong>{" "}
                      Ahambrahmasmi by Ambika is committed to ensuring our
                      digital sanctuary is welcoming, readable, and accessible
                      to every seeker across desktop, tablet, and mobile
                      devices.
                    </p>
                    <p className="m-0">
                      <strong className="text-[#E7B85A]">
                        Visual Contrast &amp; Typography:
                      </strong>{" "}
                      We use high-contrast typography and clear visual hierarchy
                      across all pages and popups, meeting WCAG AA/AAA
                      readability standards.
                    </p>
                    <p className="m-0">
                      <strong className="text-[#E7B85A]">
                        Keyboard &amp; Screen Reader Support:
                      </strong>{" "}
                      All interactive buttons, popups, course accordions, and
                      booking steps support keyboard navigation (<code>Tab</code>
                      , <code>Enter</code>, <code>Escape</code> to close
                      dialogs), semantic landmarks, and minimum <code>48px</code>{" "}
                      touch targets on mobile.
                    </p>
                    <p className="m-0">
                      <strong className="text-[#E7B85A]">
                        Reduced Motion:
                      </strong>{" "}
                      Animations and 3D card transitions automatically respect
                      your device’s <code>prefers-reduced-motion</code> setting.
                    </p>
                    <p className="m-0">
                      <strong className="text-[#E7B85A]">
                        Need Assistance?
                      </strong>{" "}
                      If you experience any difficulty accessing course
                      materials or booking your 1-to-1 path, please email{" "}
                      <a
                        href={emailHref}
                        className="text-[#E7B85A] underline font-semibold hover:text-white"
                      >
                        {EMAIL}
                      </a>{" "}
                      and we will assist you personally.
                    </p>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="relative z-10 mt-[24px] flex flex-col sm:flex-row items-center justify-between gap-[14px] border-t border-white/20 pt-[18px]">
                <span className="font-sans text-[14px] font-medium text-[#E7B85A] not-italic">
                  Aham Brahmasmi · by Ambika
                </span>
                <button
                  type="button"
                  onClick={() => setActivePopup(null)}
                  className="btn-3d-maroon inline-flex min-h-[46px] items-center justify-center rounded-full px-[28px] py-[11px] font-sans text-[14px] font-semibold text-white cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
