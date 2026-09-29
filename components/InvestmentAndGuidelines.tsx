import React from "react";
import Link from "next/link";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { GuidelinesModal } from "@/components/GuidelinesModal";
import {
  COURSE_SESSIONS_LIST,
  FURTHER_SESSIONS,
  getWhatsAppUrl,
} from "@/lib/site";

interface InvestmentAndGuidelinesProps {
  showLogoHeader?: boolean;
  compact?: boolean;
}

export function InvestmentAndGuidelines({
  showLogoHeader = true,
  compact = false,
}: InvestmentAndGuidelinesProps) {
  const whatsappFurtherUrl = getWhatsAppUrl(
    "Hi Ambika, I'd like to arrange a further 1-to-1 session after the course."
  );

  return (
    <div className="mx-auto w-full max-w-[960px] flex flex-col">
      {/* ============================================================
          INVESTMENT CARD (THE COURSE + FEE + FURTHER SESSIONS + GUIDELINES MODAL BUTTON)
          ============================================================ */}
      <section
        aria-labelledby="investment-heading"
        className={`sacred-double-frame rounded-[24px] lg:rounded-[32px] px-[20px] py-[32px] sm:px-[44px] sm:py-[48px] lg:px-[64px] lg:py-[56px] animate-fade-up ${
          compact ? "mt-0" : ""
        }`}
      >
        {/* Top Emblem + Cursive Tagline + Heading */}
        <div className="flex flex-col items-center text-center">
          {showLogoHeader && (
            <div className="mb-[10px] flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-full border border-beige-border bg-white shadow-sm">
              <AnimatedLogo variant="circle" size={64} />
            </div>
          )}

          <p className="m-0 font-cursive text-[28px] sm:text-[34px] leading-[1.15] text-lavender-deep">
            A journey of self discovery
          </p>

          <span className="mt-[14px] font-inter text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.22em] text-lavender-deep">
            1 TO 1 · LOA COACHING
          </span>

          <h2
            id="investment-heading"
            className="m-0 mt-[4px] font-playfair text-[38px] sm:text-[48px] lg:text-[54px] font-medium leading-[1.08] text-maroon"
          >
            Investment
          </h2>

          {/* Subtle golden-olive divider line from PDF */}
          <div
            aria-hidden="true"
            className="mt-[12px] h-[1.5px] w-[220px] sm:w-[280px] bg-[#C8B87A]"
          />

          <p className="m-0 mt-[14px] font-cormorant text-[22px] sm:text-[26px] italic text-body">
            One path. Paid in full. One to one.
          </p>
        </div>

        {/* Warm Golden Beige Box: "The course" + Guidelines Button */}
        <div className="mt-[28px] sm:mt-[36px] beige-card-surface rounded-[18px] sm:rounded-[22px] p-[22px] sm:p-[32px] lg:p-[36px]">
          <div className="flex flex-wrap items-center justify-between gap-[12px]">
            <h3 className="m-0 font-playfair text-[24px] sm:text-[28px] font-medium text-maroon">
              The course
            </h3>
            <GuidelinesModal
              buttonLabel="Guidelines"
              variant="inline"
            />
          </div>

          <ul className="m-0 mt-[16px] flex flex-col gap-[10px] sm:gap-[12px] pl-0 list-none">
            {COURSE_SESSIONS_LIST.map((item) => (
              <li
                key={item}
                className="flex items-start gap-[12px] font-cormorant text-[19px] sm:text-[22px] font-medium leading-[1.4] text-ink"
              >
                <span
                  aria-hidden="true"
                  className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full bg-ink"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-[20px] flex flex-wrap items-center justify-between gap-[12px] border-t border-beige-border/80 pt-[16px]">
            <span className="font-cormorant text-[18px] sm:text-[19px] italic text-body">
              5-week one-to-one programme · Please read the programme guidelines
              before enrolling.
            </span>
            <GuidelinesModal
              buttonLabel="Guidelines · Important to read"
              variant="pill"
            />
          </div>
        </div>

        {/* Soft Lavender Box: "Fee" */}
        <div className="mt-[20px] sm:mt-[26px] lavender-card-surface rounded-[18px] sm:rounded-[22px] p-[22px] sm:p-[32px] lg:p-[36px] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-[22px]">
          <div className="flex flex-col gap-[8px]">
            <span className="font-playfair text-[22px] sm:text-[26px] font-medium text-maroon">
              Fee
            </span>
            <p className="m-0 font-cormorant text-[21px] sm:text-[24px] font-semibold text-ink">
              The 5 week course
            </p>
            <p className="m-0 font-cormorant text-[19px] sm:text-[22px] text-body">
              All sessions above. One enrolment.
            </p>
            <div className="mt-[6px] flex flex-wrap items-baseline gap-[10px]">
              <span className="font-playfair text-[30px] sm:text-[38px] font-medium text-maroon">
                Rs. 15,000/-
              </span>
              <span className="font-cormorant text-[22px] sm:text-[26px] italic text-maroon">
                (only Introductory Price)
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-[10px] shrink-0">
            <Link
              href="/book"
              className="btn-3d-maroon animate-gold-shimmer inline-flex min-h-[54px] items-center justify-center rounded-full px-[32px] py-[16px] font-inter text-[15px] sm:text-[16px] font-semibold text-white no-underline"
            >
              Book the 5-Week Course · ₹15,000
            </Link>
            <span className="text-center lg:text-right font-inter text-[12px] text-lavender-deep">
              1-to-1 online · Secure Razorpay checkout
            </span>
          </div>
        </div>

        {/* Further sessions after the course */}
        <div className="mt-[28px] sm:mt-[34px] pt-[20px] border-t border-beige-border/70 flex flex-col gap-[16px]">
          <h3 className="m-0 font-playfair text-[22px] sm:text-[25px] font-semibold text-ink">
            Further sessions after the course
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
            <div className="flex items-baseline justify-between rounded-[16px] border border-beige-border bg-white/80 px-[20px] py-[14px]">
              <span className="font-cormorant text-[21px] sm:text-[23px] font-semibold text-ink">
                1 hour
              </span>
              <span className="font-playfair text-[22px] sm:text-[24px] font-medium text-maroon">
                {FURTHER_SESSIONS.hourlyRsLabel}
              </span>
            </div>

            <div className="flex items-baseline justify-between rounded-[16px] border border-lavender-border bg-lavender/60 px-[20px] py-[14px]">
              <span className="font-cormorant text-[21px] sm:text-[23px] font-semibold text-ink">
                30 minutes
              </span>
              <span className="font-playfair text-[22px] sm:text-[24px] font-medium text-maroon">
                {FURTHER_SESSIONS.halfHourRsLabel}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-[12px] pt-[4px]">
            <span className="font-cormorant text-[18px] italic text-muted">
              For alumni who have completed the 5-week programme
            </span>
            <a
              href={whatsappFurtherUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] items-center justify-center gap-[8px] rounded-full border border-maroon/40 bg-white px-[20px] py-[10px] font-inter text-[13px] sm:text-[14px] font-medium text-maroon no-underline hover:bg-maroon hover:text-white transition-colors"
            >
              <WhatsAppIcon size={16} />
              <span>Arrange a follow-up session on WhatsApp</span>
            </a>
          </div>
        </div>

        <p className="m-0 mt-[28px] text-center font-cormorant text-[19px] italic text-muted">
          Aham Brahmasmi · by Ambika
        </p>
      </section>
    </div>
  );
}
