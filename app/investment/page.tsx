import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { COURSES, FURTHER_SESSIONS, getWhatsAppUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Investment",
  description:
    "Course fees in INR for The whole path (₹12,500), Introduction to LOA (₹8,500), Tools for Emotional Mastery (₹5,000), and further sessions.",
};

export default function InvestmentPage() {
  const whatsappFurtherUrl = getWhatsAppUrl(
    "Hi Ambika, I'd like to arrange a further 1-to-1 session with you."
  );

  return (
    <main className="mx-auto w-full max-w-[1440px] px-[16px] lg:px-[80px] pt-[24px] lg:pt-[56px]">
      <section className="mx-auto max-w-[1160px] flex flex-col gap-[14px] text-left lg:text-center lg:items-center animate-fade-up">
        <Eyebrow>Fees in INR</Eyebrow>
        <h1 className="m-0 font-serif text-[38px] lg:text-[56px] font-normal leading-[1.06] text-ink">
          Investment in <em className="italic text-maroon">your path</em>
        </h1>
        <p className="m-0 max-w-[580px] text-[16px] lg:text-[18px] font-light leading-[1.65] text-body">
          Start with the whole path (save ₹1,000 and receive a full month of
          WhatsApp support), or take each course on its own. Separate = ₹13,500.
          Together = ₹12,500.
        </p>
      </section>

      {/* Three Pricing Cards */}
      <section className="mx-auto mt-[36px] lg:mt-[56px] max-w-[1160px] grid grid-cols-1 lg:grid-cols-12 gap-[24px] lg:gap-[32px] items-stretch animate-fade-up">
        {/* Card 1: The whole path (Dark Ink Highlight) */}
        <article className="lg:col-span-5 flex flex-col gap-[22px] rounded-[28px] lg:rounded-[32px] bg-ink p-[28px] sm:p-[40px] text-cream shadow-floating">
          <div className="flex items-center justify-between">
            <span className="text-[12px] lg:text-[13px] uppercase tracking-[2px] text-gold">
              Option 1 · The whole path
            </span>
            <span className="rounded-full bg-gold px-[14px] py-[6px] text-[12px] lg:text-[13px] font-semibold text-ink">
              Save ₹1,000
            </span>
          </div>
          <h2 className="m-0 font-serif text-[28px] lg:text-[34px] font-normal leading-[1.15]">
            {COURSES.whole.fullTitle}
          </h2>
          <div className="flex items-baseline gap-[14px]">
            <span className="font-serif text-[56px] lg:text-[68px] leading-none">
              {COURSES.whole.priceLabel}
            </span>
            <span className="text-[17px] text-[#A8928B] line-through">
              {COURSES.whole.actualPriceLabel}
            </span>
          </div>
          <span className="text-[14px] text-[#A8928B] -mt-[10px]">
            Introductory fee — actual fee ₹25,000 · Paid in full
          </span>

          <div className="flex flex-col gap-[12px] text-[15px] lg:text-[16px] text-[#E6D8D2]">
            {COURSES.whole.benefits?.map((b) => (
              <span key={b} className="flex items-center gap-[12px]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#E7B85A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12l5 5 9-10" />
                </svg>
                {b}
              </span>
            ))}
          </div>

          <Link
            href="/book?course=whole"
            className="mt-auto inline-flex min-h-[54px] items-center justify-center rounded-full bg-gold p-[18px] text-center text-[16px] font-semibold text-ink no-underline hover:brightness-95 transition-all"
          >
            Begin the whole path · ₹12,500
          </Link>
        </article>

        {/* Cards 2 & 3: Separate Courses */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-[24px] items-stretch">
          {/* Card 2: Course 1 */}
          <article className="flex flex-col gap-[18px] rounded-[28px] bg-white p-[28px] sm:p-[32px] border border-divider">
            <div className="relative h-[180px] w-full overflow-hidden rounded-[20px]">
              <Image
                src={COURSES.intro.image}
                alt={COURSES.intro.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="h-full w-full object-cover"
              />
              <span className="absolute left-[12px] top-[12px] rounded-full bg-white px-[12px] py-[6px] text-[12px] font-medium text-ink">
                {COURSES.intro.tag}
              </span>
            </div>
            <h2 className="m-0 font-serif text-[26px] lg:text-[28px] font-normal text-ink">
              {COURSES.intro.name}
            </h2>
            <p className="m-0 text-[15px] leading-[1.6] text-body">
              {COURSES.intro.description}
            </p>
            <div className="mt-auto flex flex-col gap-[14px] border-t border-divider pt-[18px]">
              <div className="flex items-baseline justify-between">
                <span className="text-[14px] text-muted">Course 1 fee</span>
                <span className="font-serif text-[34px] text-ink">
                  {COURSES.intro.priceLabel}
                </span>
              </div>
              <Link
                href="/book?course=intro"
                className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-maroon px-[24px] py-[14px] text-[15px] font-medium text-white no-underline hover:bg-maroon-dark transition-colors"
              >
                Book Introduction · ₹8,500
              </Link>
            </div>
          </article>

          {/* Card 3: Course 2 */}
          <article className="flex flex-col gap-[18px] rounded-[28px] bg-white p-[28px] sm:p-[32px] border border-divider">
            <div className="relative h-[180px] w-full overflow-hidden rounded-[20px]">
              <Image
                src={COURSES.tools.image}
                alt={COURSES.tools.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="h-full w-full object-cover"
              />
              <span className="absolute left-[12px] top-[12px] rounded-full bg-white px-[12px] py-[6px] text-[12px] font-medium text-ink">
                {COURSES.tools.tag}
              </span>
            </div>
            <h2 className="m-0 font-serif text-[26px] lg:text-[28px] font-normal text-ink">
              {COURSES.tools.name}
            </h2>
            <p className="m-0 text-[15px] leading-[1.6] text-body">
              {COURSES.tools.description}
            </p>
            <div className="mt-auto flex flex-col gap-[14px] border-t border-divider pt-[18px]">
              <div className="flex items-baseline justify-between">
                <span className="text-[14px] text-muted">Course 2 fee</span>
                <span className="font-serif text-[34px] text-ink">
                  {COURSES.tools.priceLabel}
                </span>
              </div>
              <Link
                href="/book?course=tools"
                className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-maroon px-[24px] py-[14px] text-[15px] font-medium text-white no-underline hover:bg-maroon-dark transition-colors"
              >
                Book Tools · ₹5,000
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Further Sessions After the Course (WhatsApp only) */}
      <section className="mx-auto mt-[32px] lg:mt-[48px] max-w-[1160px] rounded-[28px] bg-sand p-[24px] sm:p-[36px] lg:p-[48px] grid grid-cols-1 lg:grid-cols-12 items-center gap-[24px] lg:gap-[40px] animate-fade-up">
        <div className="lg:col-span-4 relative h-[200px] lg:h-[220px] overflow-hidden rounded-[22px]">
          <Image
            src={FURTHER_SESSIONS.image}
            alt={FURTHER_SESSIONS.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 380px"
            className="h-full w-full object-cover"
          />
          <span className="absolute left-[14px] top-[14px] rounded-full bg-white px-[12px] py-[6px] text-[12px] font-medium text-ink">
            {FURTHER_SESSIONS.tag}
          </span>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-[16px]">
          <Eyebrow>Continuing guidance</Eyebrow>
          <h2 className="m-0 font-serif text-[30px] lg:text-[40px] font-normal leading-[1.1] text-ink">
            Further sessions after the course
          </h2>
          <p className="m-0 text-[16px] leading-[1.65] text-body">
            Already walked the path? Come back for a one-hour or 30-minute
            session when you want guidance. Arrange these directly with Ambika
            on WhatsApp — they are not booked as an online package on this page.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] pt-[4px]">
            <div className="flex items-baseline justify-between rounded-[16px] bg-white px-[20px] py-[14px]">
              <span className="text-[15px] font-medium text-ink">1 hour</span>
              <span className="font-serif text-[28px] text-maroon">₹2,000</span>
            </div>
            <div className="flex items-baseline justify-between rounded-[16px] bg-white px-[20px] py-[14px]">
              <span className="text-[15px] font-medium text-ink">
                30 minutes
              </span>
              <span className="font-serif text-[28px] text-maroon">₹1,000</span>
            </div>
          </div>

          <div className="pt-[6px]">
            <a
              href={whatsappFurtherUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[50px] items-center justify-center gap-[10px] rounded-full border-[1.5px] border-maroon bg-white px-[26px] py-[13px] text-[15px] font-medium text-maroon no-underline hover:bg-maroon hover:text-white transition-colors"
            >
              <WhatsAppIcon size={18} />
              <span>Arrange on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
