import React from "react";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { InvestmentAndGuidelines } from "@/components/InvestmentAndGuidelines";
import {
  COURSE_SESSIONS_LIST,
  WHATSAPP_NUMBER,
  getWhatsAppUrl,
} from "@/lib/site";
import { getApprovedReviews } from "@/lib/supabase";

const DESKTOP_JOURNEY_CARDS = [
  {
    num: "01",
    title: "Watch videos",
    desc: (
      <>
        Watch <em>The Secret</em> and curated preparation videos before our
        first call.
      </>
    ),
    lavender: false,
  },
  {
    num: "02",
    title: "Live + DIY",
    desc: "Live LOA experiment + 1-to-1 coaching (1 hr) & a week of DIY observation.",
    lavender: false,
  },
  {
    num: "3A",
    title: "The instrument",
    desc: "Your physical body & Emotional Guidance System. 1-to-1 coaching (2 hrs).",
    lavender: false,
  },
  {
    num: "3B",
    title: "Creation",
    desc: "The 5-step creative process & energy nuances. 1-to-1 coaching (2 hrs).",
    lavender: false,
  },
  {
    num: "04",
    title: "Mind tools",
    desc: "Meditation, pivoting, breathwork & gratitude tools. 1-to-1 coaching (2 hrs).",
    lavender: true,
  },
  {
    num: "05",
    title: "Belief & vision",
    desc: "Belief analysis, affirmations & your vision board. 1-to-1 coaching (1 hr).",
    lavender: true,
  },
];

const MOBILE_JOURNEY_STEPS = [
  {
    num: "1",
    title: "Session 1 · Watch videos",
    desc: (
      <>
        Watch <em>The Secret</em> and preparation videos shared by Ambika.
      </>
    ),
    lavender: false,
  },
  {
    num: "2",
    title: "Session 2 · Live experiment + DIY (1 hr)",
    desc: "1-to-1 coaching call with a live LOA experiment + a week of DIY faith-building tasks.",
    lavender: false,
  },
  {
    num: "3A",
    title: "Phase 3A · The instrument (2 hrs)",
    desc: "1-to-1 coaching on your body and Emotional Guidance System.",
    lavender: false,
  },
  {
    num: "3B",
    title: "Phase 3B · Creation (2 hrs)",
    desc: "1-to-1 coaching on the 5-step creative process & energy nuances.",
    lavender: false,
  },
  {
    num: "4",
    title: "Session 4 · Tools (2 hrs)",
    desc: "1-to-1 coaching on meditation, pivoting, hourly breathwork & gratitude journal.",
    lavender: true,
  },
  {
    num: "5",
    title: "Session 5 · Belief & vision board (1 hr)",
    desc: "1-to-1 coaching on belief analysis, affirmations & creating your vision board.",
    lavender: true,
  },
];

export default async function HomePage() {
  const approvedReviews = await getApprovedReviews();
  const isProd = process.env.NODE_ENV === "production";
  const showReviews = !isProd || approvedReviews.length > 0;

  const whatsappGeneralUrl = getWhatsAppUrl(
    "Hi Ambika, I'm exploring your 5-week 1-to-1 LOA coaching course and would love your guidance."
  );
  const displayPhone =
    WHATSAPP_NUMBER === "91XXXXXXXXXX"
      ? "+91 [number]"
      : `+${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2)}`;

  const firstWritten = approvedReviews.find((r) => r.written_review);
  const secondWritten = approvedReviews.filter((r) => r.written_review)[1];
  const firstVideo = approvedReviews.find((r) => r.video_url);

  return (
    <main className="mx-auto w-full max-w-[1440px] overflow-x-hidden">
      {/* ============================================================
          SECTION 2 — HERO (Desktop >=1024px & Mobile <1024px)
          ============================================================ */}
      {/* Desktop Hero */}
      <section className="hidden lg:block relative mx-[40px] h-[760px] rounded-[36px] bg-sand overflow-hidden border border-beige-border animate-fade-up">
        <Image
          src="/images/hero-sea.jpg"
          alt="A woman sitting quietly by the sea at sunrise"
          width={760}
          height={760}
          priority
          className="absolute right-0 top-0 h-[760px] w-[760px] object-cover"
        />
        <div className="absolute left-0 top-0 h-[760px] w-[820px] rounded-r-[380px] bg-sand" />

        <div className="absolute left-[80px] top-[88px] z-10 flex w-[600px] flex-col gap-[22px]">
          <div className="flex flex-col gap-[4px]">
            <span className="font-cursive text-[38px] leading-none text-lavender-deep">
              A journey of self discovery
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-[3px] text-gold-text">
              1 TO 1 · LOA COACHING · 5-WEEK PROGRAMME
            </span>
          </div>
          <h1 className="m-0 font-serif text-[78px] font-normal leading-[1.02] text-ink">
            Remember who you <em className="italic text-maroon">truly</em> are.
          </h1>
          <p className="m-0 max-w-[520px] text-[19px] font-light leading-[1.65] text-body">
            Intimate, one-to-one Law of Attraction coaching with Ambika. One
            path. Paid in full. One to one — learn how your thoughts, emotions
            and beliefs create your everyday life.
          </p>
          <div className="flex items-center gap-[16px]">
            <Link
              href="/book"
              className="btn-3d-maroon animate-gold-shimmer inline-flex min-h-[54px] items-center justify-center rounded-full px-[34px] py-[18px] text-[16px] font-semibold text-white no-underline"
            >
              Book the 5-Week Course · ₹15,000
            </Link>
            <a
              href="#courses"
              className="inline-flex min-h-[44px] items-center border-b-[1.5px] border-ink px-[8px] py-[16px] text-[16px] font-medium text-ink no-underline hover:border-maroon hover:text-maroon transition-colors"
            >
              View course &amp; fee
            </a>
          </div>
          <span className="font-cormorant text-[21px] italic text-maroon">
            Rs. 15,000/- (only Introductory Price) · All 6 sessions + 1 month
            WhatsApp support
          </span>
        </div>

        {/* Ambika 400px circle overlapping join */}
        <div className="absolute left-[640px] top-[150px] z-10 h-[400px] w-[400px] overflow-hidden rounded-full border-[12px] border-cream bg-cream box-border">
          <Image
            src="/images/ambika.png"
            alt="Ambika"
            width={376}
            height={376}
            priority
            className="block h-[376px] w-[376px] object-cover"
          />
        </div>

        {/* Lavender & Gold pill */}
        <div className="absolute left-[1010px] top-[150px] z-20 rounded-full bg-lavender border border-lavender-border px-[22px] py-[10px] font-cursive text-[26px] leading-none text-ink shadow-floating">
          Hi, I’m Ambika · fellow seeker
        </div>

        {/* Floating WhatsApp card bottom-right */}
        <div className="absolute right-[64px] bottom-[56px] z-20 flex w-[340px] flex-col gap-[14px] rounded-[24px] bg-lavender/95 border border-lavender-border p-[28px] shadow-floating-lg backdrop-blur-md">
          <span className="font-serif text-[24px] text-ink">
            Questions before you enrol?
          </span>
          <span className="text-[15px] leading-[1.55] text-body">
            Ask Ambika anything before you book — she replies personally.
          </span>
          <a
            href={whatsappGeneralUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[14px] text-ink no-underline group"
          >
            <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[14px] bg-maroon text-white group-hover:bg-maroon-dark transition-colors">
              <WhatsAppIcon size={22} />
            </span>
            <span className="flex flex-col">
              <span className="text-[13px] text-lavender-deep">WhatsApp</span>
              <span className="text-[20px] font-semibold text-ink">
                {displayPhone}
              </span>
            </span>
          </a>
        </div>
      </section>

      {/* Mobile & Tablet Hero */}
      <div className="lg:hidden animate-fade-up">
        <section className="relative mx-[12px] h-[400px] overflow-hidden rounded-[28px] border border-beige-border">
          <Image
            src="/images/hero-sea.jpg"
            alt="A woman sitting quietly by the sea at sunrise"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 760px"
            className="block h-full w-full object-cover"
          />
          <div className="absolute left-[16px] bottom-[16px] h-[144px] w-[144px] overflow-hidden rounded-full border-[6px] border-cream box-border">
            <Image
              src="/images/ambika.png"
              alt="Ambika"
              width={144}
              height={144}
              priority
              className="block h-full w-full object-cover"
            />
          </div>
          <span className="absolute left-[146px] bottom-[28px] rounded-full bg-lavender border border-lavender-border px-[16px] py-[6px] font-cursive text-[22px] leading-none text-ink shadow-sm">
            Hi, I’m Ambika
          </span>
        </section>

        <section className="flex flex-col gap-[14px] px-[16px] pt-[24px]">
          <div className="flex flex-col gap-[2px]">
            <span className="font-cursive text-[30px] leading-none text-lavender-deep">
              A journey of self discovery
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[2px] text-gold-text">
              1 TO 1 · LOA COACHING · 5 WEEKS
            </span>
          </div>
          <h1 className="m-0 font-serif text-[42px] font-normal leading-[1.05] text-ink">
            Remember who you <em className="italic text-maroon">truly</em> are.
          </h1>
          <p className="m-0 text-[16px] font-light leading-[1.6] text-body">
            One path. Paid in full. One to one. Intimate 5-week Law of
            Attraction coaching with Ambika Mohan.
          </p>
          <Link
            href="/book"
            className="btn-3d-maroon animate-gold-shimmer rounded-full p-[18px] text-center text-[16px] font-semibold text-white no-underline"
          >
            Book the 5-Week Course · ₹15,000
          </Link>
          <a
            id="hero-cta-sentinel"
            href="#courses"
            className="rounded-full border-[1.5px] border-lavender-border bg-lavender/70 p-[15px] text-center text-[15px] font-medium text-ink no-underline hover:bg-lavender transition-colors"
          >
            View course details &amp; guidelines
          </a>
          <span className="text-center font-cormorant text-[19px] italic text-maroon">
            Rs. 15,000/- (only Introductory Price) · All sessions included
          </span>
        </section>

        {/* Mobile 3-Column Stat Strip (Warm Beige & Soft Lavender) */}
        <section className="mx-[16px] mt-[24px] grid grid-cols-3 rounded-[22px] bg-beige-card/70 border border-beige-border shadow-mobile-stat">
          <div className="flex flex-col items-center gap-[2px] border-r border-beige-border px-[8px] py-[16px] text-center">
            <span className="font-serif text-[22px] text-maroon">1-to-1</span>
            <span className="text-[12px] text-body">Never a group</span>
          </div>
          <div className="flex flex-col items-center gap-[2px] border-r border-beige-border px-[8px] py-[16px] text-center">
            <span className="font-serif text-[22px] text-maroon">5 Weeks</span>
            <span className="text-[12px] text-body">6 sessions + DIY</span>
          </div>
          <div className="flex flex-col items-center gap-[2px] px-[8px] py-[16px] text-center">
            <span className="font-serif text-[22px] text-maroon">1 Month</span>
            <span className="text-[12px] text-body">WhatsApp support</span>
          </div>
        </section>

        {/* Mobile Lavender WhatsApp Card */}
        <section className="mx-[16px] mt-[16px] flex items-center gap-[14px] rounded-[22px] bg-lavender border border-lavender-border p-[18px]">
          <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[14px] bg-maroon text-white">
            <WhatsAppIcon size={20} />
          </span>
          <span className="flex flex-grow flex-col gap-[2px]">
            <span className="text-[15px] font-semibold text-ink">
              Have a question before booking?
            </span>
            <span className="text-[13px] text-lavender-deep">
              Message Ambika personally on WhatsApp
            </span>
          </span>
          <a
            href={whatsappGeneralUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open WhatsApp chat"
            className="flex h-[44px] w-[44px] items-center justify-center text-maroon hover:text-maroon-dark"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </section>
      </div>

      {/* ============================================================
          SECTION 3 — ABOUT ME
          ============================================================ */}
      {/* Desktop About */}
      <section className="hidden lg:grid grid-cols-12 items-center gap-[64px] px-[80px] pt-[120px] animate-fade-up">
        <div className="col-span-6 relative h-[600px]">
          <Image
            src="/images/about-rock.jpg"
            alt="A woman meditating on a rock by a misty river"
            width={560}
            height={480}
            className="absolute left-0 top-0 h-[480px] w-[560px] rounded-[28px] object-cover border border-beige-border"
          />
          <Image
            src="/images/lotus.jpg"
            alt="A pink lotus in a pond"
            width={180}
            height={240}
            className="absolute right-0 top-[60px] h-[240px] w-[180px] rounded-[90px] border-[8px] border-cream object-cover"
          />
          <div className="absolute left-[40px] bottom-0 grid w-[520px] grid-cols-3 rounded-[22px] bg-lavender border border-lavender-border shadow-floating">
            <div className="flex flex-col items-center gap-[4px] border-r border-lavender-border px-[20px] py-[24px] text-center">
              <span className="font-serif text-[34px] leading-tight text-maroon">
                1-to-1
              </span>
              <span className="text-[13px] text-body">
                Never a group
                <br />
                or recording
              </span>
            </div>
            <div className="flex flex-col items-center gap-[4px] border-r border-lavender-border px-[20px] py-[24px] text-center">
              <span className="font-serif text-[34px] leading-tight text-maroon">
                5 Weeks
              </span>
              <span className="text-[13px] text-body">
                6 sessions +
                <br />
                weekly practice
              </span>
            </div>
            <div className="flex flex-col items-center gap-[4px] px-[20px] py-[24px] text-center">
              <span className="font-serif text-[34px] leading-tight text-maroon">
                1 Month
              </span>
              <span className="text-[13px] text-body">
                WhatsApp
                <br />
                support
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-6 flex flex-col gap-[22px]">
          <span className="font-cursive text-[34px] leading-none text-lavender-deep">
            About Ambika
          </span>
          <h2 className="m-0 font-serif text-[54px] font-normal leading-[1.06] text-ink">
            I didn’t begin with answers. I began with{" "}
            <em className="italic text-maroon">questions.</em>
          </h2>
          <p className="m-0 text-[18px] font-light leading-[1.75] text-body">
            Through the teachings of Abraham Hicks — and by observing my own
            life — I began to see that life wasn’t simply happening to me. It
            was being experienced through me.
          </p>
          <p className="m-0 text-[18px] font-light leading-[1.75] text-body">
            Somewhere along that journey, Aham Brahmasmi stopped being a phrase
            and became a knowing: I am the Core from which my life experience
            emerges.
          </p>
          <Link
            href="/about"
            className="inline-flex min-h-[48px] self-start items-center justify-center rounded-full bg-ink px-[28px] py-[16px] font-medium text-cream no-underline hover:bg-maroon transition-colors"
          >
            Read my story
          </Link>
        </div>
      </section>

      {/* Mobile About */}
      <section className="flex lg:hidden flex-col gap-[16px] px-[16px] pt-[56px] animate-fade-up">
        <span className="font-cursive text-[30px] leading-none text-lavender-deep">
          About Ambika
        </span>
        <h2 className="m-0 font-serif text-[34px] font-normal leading-[1.1] text-ink">
          I didn’t begin with answers. I began with{" "}
          <em className="italic text-maroon">questions.</em>
        </h2>
        <div className="relative h-[260px]">
          <Image
            src="/images/about-rock.jpg"
            alt="A woman meditating on a rock by a misty river"
            width={720}
            height={260}
            className="block h-[260px] w-full rounded-[22px] object-cover border border-beige-border"
          />
          <Image
            src="/images/lotus.jpg"
            alt="A pink lotus in a pond"
            width={90}
            height={120}
            className="absolute right-[12px] -bottom-[24px] h-[120px] w-[90px] rounded-[45px] border-[5px] border-cream object-cover"
          />
        </div>
        <p className="m-0 mt-[12px] text-[16px] font-light leading-[1.7] text-body">
          Through the teachings of Abraham Hicks — and by observing my own life
          — I began to see that life wasn’t simply happening to me. It was being
          experienced through me.
        </p>
        <Link
          href="/about"
          className="inline-flex min-h-[44px] items-center self-start text-[15px] font-medium text-maroon no-underline hover:text-maroon-dark"
        >
          Read my story →
        </Link>
      </section>

      {/* ============================================================
          SECTION 4 — JOURNEY ("Words don't teach. Your life will.")
          ============================================================ */}
      {/* Desktop Journey */}
      <section className="hidden lg:flex flex-col gap-[40px] px-[80px] pt-[120px] animate-fade-up">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-[10px]">
            <span className="font-cursive text-[34px] leading-none text-lavender-deep">
              How the 5-week programme unfolds
            </span>
            <h2 className="m-0 font-serif text-[54px] font-normal leading-[1.06] text-ink">
              Words don’t teach.
              <br />
              <em className="italic text-maroon">Your life will.</em>
            </h2>
          </div>
          <p className="m-0 max-w-[420px] text-[17px] leading-[1.65] text-body">
            All 6 one-to-one sessions build on each other across 5 weeks, with a
            full month of WhatsApp support, videos, meditations, and booklet.
          </p>
        </div>

        <div className="grid grid-cols-6 gap-[16px]">
          {DESKTOP_JOURNEY_CARDS.map((card, idx) => (
            <div
              key={card.num}
              className={`flex flex-col gap-[12px] rounded-[22px] px-[22px] py-[26px] border ${
                idx === 0 ? "min-h-[240px]" : ""
              } ${
                card.lavender
                  ? "bg-lavender border-lavender-border text-ink"
                  : "bg-beige-card border-beige-border text-ink"
              }`}
            >
              <span
                className={`font-serif text-[38px] leading-none ${
                  card.lavender ? "text-lavender-deep" : "text-maroon"
                }`}
              >
                {card.num}
              </span>
              <span className="text-[17px] font-semibold text-ink">
                {card.title}
              </span>
              <span className="text-[14px] leading-[1.55] text-body">
                {card.desc}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between px-[6px] font-cormorant text-[19px] italic text-lavender-deep">
          <span>← Creating Faith in the Law (Sessions 1, 2, 3A &amp; 3B)</span>
          <span>Tools, Beliefs &amp; Vision Board (Sessions 4 &amp; 5) →</span>
        </div>
      </section>

      {/* Mobile Journey */}
      <section className="flex lg:hidden flex-col gap-[20px] px-[16px] pt-[56px] animate-fade-up">
        <div className="flex flex-col gap-[6px]">
          <span className="font-cursive text-[30px] leading-none text-lavender-deep">
            How the 5 weeks unfold
          </span>
          <h2 className="m-0 font-serif text-[34px] font-normal leading-[1.1] text-ink">
            Words don’t teach.{" "}
            <em className="italic text-maroon">Your life will.</em>
          </h2>
        </div>

        <div className="flex flex-col">
          {MOBILE_JOURNEY_STEPS.map((step, idx) => {
            const isLast = idx === MOBILE_JOURNEY_STEPS.length - 1;
            const isSmallFont = step.num === "3A" || step.num === "3B";
            return (
              <div key={step.num} className="flex gap-[14px]">
                <div className="flex flex-col items-center">
                  <span
                    className={`flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full font-serif border ${
                      isSmallFont ? "text-[15px]" : "text-[17px]"
                    } ${
                      step.lavender
                        ? "bg-lavender border-lavender-border text-lavender-deep"
                        : "bg-beige-card border-beige-border text-maroon"
                    }`}
                  >
                    {step.num}
                  </span>
                  {!isLast && (
                    <span className="w-[2px] flex-grow bg-lavender-border/70" />
                  )}
                </div>
                <div
                  className={`flex flex-col gap-[4px] ${
                    !isLast ? "pb-[18px]" : ""
                  }`}
                >
                  <span className="pt-[8px] text-[16px] font-semibold text-ink">
                    {step.title}
                  </span>
                  <span className="text-[14px] leading-[1.5] text-body">
                    {step.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          SECTION 5 — UNIFIED COURSE INVESTMENT & IMPORTANT TO READ (id="courses")
          ============================================================ */}
      <div
        id="courses"
        className="px-[14px] sm:px-[24px] lg:px-[80px] pt-[64px] lg:pt-[110px]"
      >
        <InvestmentAndGuidelines showLogoHeader={true} />
      </div>

      {/* ============================================================
          SECTION 6 — BHAGAVAD GITA QUOTE BAND
          ============================================================ */}
      <section className="relative mx-[12px] lg:mx-[80px] mt-[64px] lg:mt-[110px] h-[360px] lg:h-[460px] overflow-hidden rounded-[28px] lg:rounded-[36px] animate-fade-up">
        <Image
          src="/images/quote-sky.jpg"
          alt="Calm sea under a pink and blue sky"
          fill
          sizes="(max-width: 1024px) 100vw, 1280px"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#4E3B2C]/48" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[14px] lg:gap-[18px] px-[24px] lg:px-[160px] text-center text-white box-border">
          <span className="font-cursive text-[32px] lg:text-[40px] leading-none text-[#F2D08A]">
            From the Bhagavad Gita
          </span>
          <p className="m-0 font-serif text-[25px] lg:text-[42px] italic leading-[1.3] lg:leading-[1.25]">
            Whatever happens, happens for the best. Whatever is happening is
            also happening for the best.
          </p>
          <span className="font-cormorant text-[20px] lg:text-[24px] italic text-[#F4E8E2]">
            Everything happens in perfect Divine timing.
          </span>
        </div>
      </section>

      {/* ============================================================
          SECTION 7 — SEEKERS' WORDS (REVIEWS) + SUMMARY CARD
          ============================================================ */}
      {showReviews && (
        <section className="px-[16px] lg:px-[80px] pt-[64px] lg:pt-[110px] animate-fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch gap-[28px] lg:gap-[40px]">
            {/* Left Summary Card in Soft Lavender & Warm Beige */}
            <div className="lg:col-span-5 flex flex-col gap-[18px] rounded-[28px] lg:rounded-[32px] bg-lavender border border-lavender-border p-[28px] sm:p-[40px] text-ink shadow-mobile-stat">
              <div className="flex items-center justify-between">
                <span className="font-cursive text-[28px] leading-none text-lavender-deep">
                  One path · One to one
                </span>
                <span className="rounded-full bg-beige-card border border-beige-border px-[12px] py-[5px] text-[12px] font-semibold text-maroon">
                  5-Week Course
                </span>
              </div>
              <h3 className="m-0 font-serif text-[28px] lg:text-[32px] font-normal leading-[1.15] text-ink">
                The 5-Week 1-to-1 LOA Coaching Programme
              </h3>
              <div className="flex flex-wrap items-baseline gap-[10px]">
                <span className="font-serif text-[46px] lg:text-[56px] leading-none text-maroon">
                  Rs. 15,000/-
                </span>
                <span className="font-cormorant text-[20px] italic text-maroon">
                  (only Introductory Price)
                </span>
              </div>
              <div className="flex flex-col gap-[10px] text-[15px] text-body">
                {COURSE_SESSIONS_LIST.map((benefit) => (
                  <span key={benefit} className="flex items-start gap-[10px]">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#8E1B25"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="mt-[3px] shrink-0"
                    >
                      <path d="M5 12l5 5 9-10" />
                    </svg>
                    <span>{benefit}</span>
                  </span>
                ))}
              </div>
              <Link
                href="/book"
                className="btn-3d-maroon animate-gold-shimmer mt-auto inline-flex min-h-[54px] items-center justify-center rounded-full p-[18px] text-center text-[16px] font-semibold text-white no-underline"
              >
                Book the 5-Week Course · ₹15,000
              </Link>
            </div>

            {/* Right Seekers' Words */}
            <div className="lg:col-span-7 flex flex-col gap-[22px]">
              <div className="flex items-end justify-between">
                <div className="flex flex-col gap-[6px]">
                  <span className="font-cursive text-[32px] leading-none text-lavender-deep">
                    Seekers’ words
                  </span>
                  <h2 className="m-0 font-serif text-[32px] lg:text-[46px] font-normal text-ink">
                    What changed for them
                  </h2>
                </div>
                <Link
                  href="/reviews"
                  className="min-h-[44px] inline-flex items-center text-[15px] font-medium text-maroon no-underline hover:text-maroon-dark"
                >
                  Leave a review →
                </Link>
              </div>

              {/* Featured Written Review Card */}
              <div className="flex flex-grow flex-col gap-[16px] rounded-[24px] bg-beige-card/75 border border-beige-border p-[26px] lg:p-[32px]">
                <svg
                  width="34"
                  height="26"
                  viewBox="0 0 36 28"
                  fill="#8E1B25"
                  aria-hidden="true"
                >
                  <path d="M0 28V16C0 7 5 1.5 14 0l1.5 4C10 5.5 7.5 9 7.5 13H14v15H0zm20 0V16c0-9 5-14.5 14-16l1.5 4C30 5.5 27.5 9 27.5 13H34v15H20z" />
                </svg>
                <p className="m-0 font-serif text-[22px] lg:text-[26px] leading-[1.35] text-ink">
                  {firstWritten
                    ? firstWritten.written_review
                    : "[First seeker’s written review goes here — the Reviews page has none yet.]"}
                </p>
                <span className="text-[14px] text-muted">
                  {firstWritten
                    ? `${firstWritten.name} · 5-Week LOA Course`
                    : "[Name] · 5-Week LOA Course"}
                </span>
              </div>

              {/* Two Small Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                <div className="relative h-[180px] overflow-hidden rounded-[22px]">
                  <Image
                    src="/images/review-grateful.jpg"
                    alt="A gratitude journal with a pen"
                    width={360}
                    height={180}
                    className="h-full w-full object-cover"
                  />
                  {firstVideo?.video_url ? (
                    <a
                      href={firstVideo.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute left-[16px] bottom-[16px] rounded-full bg-white px-[14px] py-[8px] text-[13px] font-medium text-ink no-underline"
                    >
                      ▶ Watch {firstVideo.name}’s review
                    </a>
                  ) : (
                    <span className="absolute left-[16px] bottom-[16px] rounded-full bg-white px-[14px] py-[8px] text-[13px] font-medium text-ink">
                      ▶ [Video review]
                    </span>
                  )}
                </div>
                <div className="flex flex-col justify-between rounded-[22px] bg-lavender/75 border border-lavender-border p-[24px]">
                  <span className="text-[16px] leading-[1.5] text-body">
                    {secondWritten
                      ? `“${secondWritten.written_review}”`
                      : "“[Short written review]”"}
                  </span>
                  <span className="text-[14px] text-lavender-deep">
                    {secondWritten
                      ? `${secondWritten.name} · 5-Week LOA Course`
                      : "[Name] · 5-Week LOA Course"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 8 — CLOSING CTA
          ============================================================ */}
      {/* Desktop Closing CTA */}
      <section className="hidden lg:block relative mx-[40px] mt-[110px] h-[520px] overflow-hidden rounded-[36px] bg-night animate-fade-up">
        <Image
          src="/images/cta-diya.jpg"
          alt="Hands holding a lit diya"
          width={620}
          height={520}
          className="absolute right-0 top-0 h-[520px] w-[620px] object-cover"
        />
        <div className="absolute left-0 top-0 flex h-[520px] w-[900px] flex-col gap-[20px] px-[96px] py-[80px] text-cream box-border">
          <span className="font-cursive text-[38px] leading-none text-gold">
            Your journey begins with one step
          </span>
          <h2 className="m-0 font-serif text-[64px] font-normal leading-[1.03]">
            You are a powerful creator.
            <br />
            <em className="italic text-gold">Come see it for yourself.</em>
          </h2>
          <div className="mt-[8px] flex gap-[14px]">
            <Link
              href="/book"
              className="btn-3d-gold inline-flex min-h-[54px] items-center justify-center rounded-full px-[32px] py-[18px] font-semibold text-ink no-underline"
            >
              Book the 5-Week Course · ₹15,000
            </Link>
            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[54px] items-center justify-center rounded-full border-[1.5px] border-cream px-[28px] py-[17px] font-medium text-cream no-underline hover:bg-cream hover:text-ink transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Mobile Closing CTA */}
      <section className="lg:hidden relative mx-[12px] mt-[56px] h-[480px] overflow-hidden rounded-[28px] bg-night animate-fade-up">
        <Image
          src="/images/cta-diya.jpg"
          alt="Hands holding a lit diya"
          width={600}
          height={240}
          className="absolute left-0 bottom-0 h-[240px] w-full object-cover"
        />
        <div
          className="absolute left-0 bottom-0 h-[240px] w-full"
          style={{
            background: "linear-gradient(#2C1D18, rgba(44,29,24,0))",
          }}
        />
        <div className="absolute left-0 top-0 flex w-full flex-col gap-[14px] px-[22px] py-[32px] text-cream box-border">
          <span className="font-cursive text-[30px] leading-none text-gold">
            Begin with one step
          </span>
          <h2 className="m-0 font-serif text-[34px] font-normal leading-[1.08]">
            You are a powerful creator.{" "}
            <em className="italic text-gold">Come see it for yourself.</em>
          </h2>
          <Link
            href="/book"
            className="btn-3d-gold mt-[4px] inline-flex min-h-[52px] items-center justify-center rounded-full p-[16px] text-center font-semibold text-ink no-underline"
          >
            Book the 5-Week Course · ₹15,000
          </Link>
        </div>
      </section>
    </main>
  );
}
