import React from "react";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  COURSES,
  FURTHER_SESSIONS,
  WHATSAPP_NUMBER,
  getWhatsAppUrl,
} from "@/lib/site";
import { getApprovedReviews } from "@/lib/supabase";

const DESKTOP_JOURNEY_CARDS = [
  {
    num: "01",
    title: "Watch & meet",
    desc: (
      <>
        <em>The Secret</em>, a few videos, then a live LOA experiment on a call.
      </>
    ),
    dark: false,
  },
  {
    num: "02",
    title: "DIY experiments",
    desc: "A week of faith-building tasks in your own life.",
    dark: false,
  },
  {
    num: "3A",
    title: "The instrument",
    desc: "Your body and Emotional Guidance System. 1.5 hrs.",
    dark: false,
  },
  {
    num: "3B",
    title: "Creation",
    desc: "The 5-step creative process. 1.5 hrs.",
    dark: false,
  },
  {
    num: "04",
    title: "Mind tools",
    desc: "Meditation routine, pivoting, breathwork, gratitude.",
    dark: true,
  },
  {
    num: "05",
    title: "Beliefs & vision",
    desc: "Belief self-analysis, recap and your vision board. 1 hr.",
    dark: true,
  },
];

const MOBILE_JOURNEY_STEPS = [
  {
    num: "1",
    title: "Watch & meet",
    desc: (
      <>
        <em>The Secret</em>, a few videos, then a live LOA experiment on a call.
      </>
    ),
    dark: false,
  },
  {
    num: "2",
    title: "DIY experiments",
    desc: "A week of faith-building tasks in your own life.",
    dark: false,
  },
  {
    num: "3A",
    title: "The instrument · 1.5 hrs",
    desc: "Your body and Emotional Guidance System.",
    dark: false,
  },
  {
    num: "3B",
    title: "Creation · 1.5 hrs",
    desc: "The 5-step creative process.",
    dark: false,
  },
  {
    num: "4",
    title: "Mind tools",
    desc: "Meditation routine, pivoting, breathwork, gratitude.",
    dark: true,
  },
  {
    num: "5",
    title: "Beliefs & vision · 1 hr",
    desc: "Belief self-analysis, recap and your vision board.",
    dark: true,
  },
];

export default async function HomePage() {
  const approvedReviews = await getApprovedReviews();
  const isProd = process.env.NODE_ENV === "production";
  const showReviews = !isProd || approvedReviews.length > 0;

  const whatsappGeneralUrl = getWhatsAppUrl(
    "Hi Ambika, I'm not sure where to start and would love your guidance."
  );
  const whatsappFurtherUrl = getWhatsAppUrl(
    "Hi Ambika, I'd like to ask about booking a further session."
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
      {/* Desktop Hero (matches desktop-home.html lines 39-64) */}
      <section className="hidden lg:block relative mx-[40px] h-[760px] rounded-[36px] bg-sand overflow-hidden animate-fade-up">
        <Image
          src="/images/hero-sea.jpg"
          alt="A woman sitting quietly by the sea at sunrise"
          width={760}
          height={760}
          priority
          className="absolute right-0 top-0 h-[760px] w-[760px] object-cover"
        />
        <div className="absolute left-0 top-0 h-[760px] w-[820px] rounded-r-[380px] bg-sand" />

        <div className="absolute left-[80px] top-[104px] z-10 flex w-[600px] flex-col gap-[26px]">
          <span className="text-[13px] font-medium uppercase tracking-[3px] text-gold-text">
            Self-discovery · Law of Attraction · 1-to-1
          </span>
          <h1 className="m-0 font-serif text-[82px] font-normal leading-[1.02] text-ink">
            Remember who you <em className="italic text-maroon">truly</em> are.
          </h1>
          <p className="m-0 max-w-[520px] text-[19px] font-light leading-[1.65] text-body">
            Intimate, one-to-one Law of Attraction coaching with Ambika. Learn
            how your thoughts, emotions and beliefs create your everyday life —
            and how to create it consciously.
          </p>
          <div className="flex items-center gap-[14px]">
            <Link
              href="/book?course=whole"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-maroon px-[32px] py-[20px] text-[16px] font-medium text-white no-underline hover:bg-maroon-dark transition-colors"
            >
              Begin the whole path · ₹12,500
            </Link>
            <a
              href="#courses"
              className="inline-flex min-h-[44px] items-center border-b-[1.5px] border-ink px-[8px] py-[20px] text-[16px] font-medium text-ink no-underline hover:border-maroon hover:text-maroon transition-colors"
            >
              Explore the courses
            </a>
          </div>
          <span className="text-[14px] text-muted">
            Introductory fee — actual fee ₹25,000
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

        {/* Gold pill */}
        <div className="absolute left-[1010px] top-[150px] z-20 rounded-full bg-gold px-[20px] py-[12px] text-[14px] font-medium text-ink">
          Hi, I’m Ambika · fellow seeker
        </div>

        {/* Floating WhatsApp card bottom-right */}
        <div className="absolute right-[64px] bottom-[56px] z-20 flex w-[340px] flex-col gap-[14px] rounded-[24px] bg-white p-[28px] shadow-floating-lg">
          <span className="font-serif text-[24px] text-ink">
            Not sure where to start?
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
              <span className="text-[13px] text-muted">WhatsApp</span>
              <span className="text-[20px] font-semibold text-ink">
                {displayPhone}
              </span>
            </span>
          </a>
        </div>
      </section>

      {/* Mobile & Tablet Hero (matches mobile-home.html lines 30-57) */}
      <div className="lg:hidden animate-fade-up">
        <section className="relative mx-[12px] h-[420px] overflow-hidden rounded-[28px]">
          <Image
            src="/images/hero-sea.jpg"
            alt="A woman sitting quietly by the sea at sunrise"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 760px"
            className="block h-full w-full object-cover"
          />
          <div className="absolute left-[16px] bottom-[16px] h-[150px] w-[150px] overflow-hidden rounded-full border-[6px] border-cream box-border">
            <Image
              src="/images/ambika.png"
              alt="Ambika"
              width={150}
              height={150}
              priority
              className="block h-full w-full object-cover"
            />
          </div>
          <span className="absolute left-[150px] bottom-[30px] rounded-full bg-gold px-[14px] py-[8px] text-[13px] font-medium text-ink">
            Hi, I’m Ambika
          </span>
        </section>

        <section className="flex flex-col gap-[16px] px-[16px] pt-[28px]">
          <span className="text-[11px] font-medium uppercase tracking-[2px] text-gold-text">
            Self-discovery · LOA · 1-to-1
          </span>
          <h1 className="m-0 font-serif text-[44px] font-normal leading-[1.04] text-ink">
            Remember who you <em className="italic text-maroon">truly</em> are.
          </h1>
          <p className="m-0 text-[16px] font-light leading-[1.6] text-body">
            Intimate, one-to-one Law of Attraction coaching with Ambika. Learn
            how your thoughts, emotions and beliefs create your everyday life.
          </p>
          <Link
            href="/book?course=whole"
            className="rounded-full bg-maroon p-[18px] text-center text-[16px] font-medium text-white no-underline hover:bg-maroon-dark transition-colors"
          >
            Begin the whole path · ₹12,500
          </Link>
          <a
            id="hero-cta-sentinel"
            href="#courses"
            className="rounded-full border-[1.5px] border-ink p-[16px] text-center text-[16px] font-medium text-ink no-underline hover:bg-ink hover:text-cream transition-colors"
          >
            Explore the courses
          </a>
          <span className="text-center text-[13px] text-muted">
            Introductory fee — actual fee ₹25,000
          </span>
        </section>

        {/* Mobile 3-Column Stat Strip */}
        <section className="mx-[16px] mt-[28px] grid grid-cols-3 rounded-[22px] bg-white shadow-mobile-stat">
          <div className="flex flex-col items-center gap-[2px] border-r border-divider px-[8px] py-[18px] text-center">
            <span className="font-serif text-[24px] text-maroon">1-to-1</span>
            <span className="text-[12px] text-muted">Never a group</span>
          </div>
          <div className="flex flex-col items-center gap-[2px] border-r border-divider px-[8px] py-[18px] text-center">
            <span className="font-serif text-[24px] text-maroon">5</span>
            <span className="text-[12px] text-muted">Phases</span>
          </div>
          <div className="flex flex-col items-center gap-[2px] px-[8px] py-[18px] text-center">
            <span className="font-serif text-[24px] text-maroon">1 month</span>
            <span className="text-[12px] text-muted">WhatsApp support</span>
          </div>
        </section>

        {/* Mobile Sand WhatsApp Card */}
        <section className="mx-[16px] mt-[20px] flex items-center gap-[14px] rounded-[22px] bg-sand p-[20px]">
          <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[14px] bg-maroon text-white">
            <WhatsAppIcon size={22} />
          </span>
          <span className="flex flex-grow flex-col gap-[2px]">
            <span className="text-[16px] font-semibold text-ink">
              Not sure where to start?
            </span>
            <span className="text-[14px] text-body">
              Ask Ambika on WhatsApp
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
      {/* Desktop About (matches desktop-home.html lines 66-83) */}
      <section className="hidden lg:grid grid-cols-12 items-center gap-[64px] px-[80px] pt-[120px] animate-fade-up">
        <div className="col-span-6 relative h-[600px]">
          <Image
            src="/images/about-rock.jpg"
            alt="A woman meditating on a rock by a misty river"
            width={560}
            height={480}
            className="absolute left-0 top-0 h-[480px] w-[560px] rounded-[28px] object-cover"
          />
          <Image
            src="/images/lotus.jpg"
            alt="A pink lotus in a pond"
            width={180}
            height={240}
            className="absolute right-0 top-[60px] h-[240px] w-[180px] rounded-[90px] border-[8px] border-cream object-cover"
          />
          <div className="absolute left-[40px] bottom-0 grid w-[520px] grid-cols-3 rounded-[22px] bg-white shadow-floating">
            <div className="flex flex-col items-center gap-[4px] border-r border-divider px-[20px] py-[26px] text-center">
              <span className="font-serif text-[38px] leading-tight text-maroon">
                1-to-1
              </span>
              <span className="text-[13px] text-muted">
                Never a group
                <br />
                or recording
              </span>
            </div>
            <div className="flex flex-col items-center gap-[4px] border-r border-divider px-[20px] py-[26px] text-center">
              <span className="font-serif text-[38px] leading-tight text-maroon">
                5
              </span>
              <span className="text-[13px] text-muted">
                Phases of
                <br />
                calls + practice
              </span>
            </div>
            <div className="flex flex-col items-center gap-[4px] px-[20px] py-[26px] text-center">
              <span className="font-serif text-[38px] leading-tight text-maroon">
                1 month
              </span>
              <span className="text-[13px] text-muted">
                WhatsApp
                <br />
                support
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-6 flex flex-col gap-[24px]">
          <span className="text-[13px] font-medium uppercase tracking-[3px] text-gold-text">
            About me
          </span>
          <h2 className="m-0 font-serif text-[56px] font-normal leading-[1.05] text-ink">
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

      {/* Mobile About (matches mobile-home.html lines 59-68) */}
      <section className="flex lg:hidden flex-col gap-[18px] px-[16px] pt-[64px] animate-fade-up">
        <span className="text-[11px] font-medium uppercase tracking-[2px] text-gold-text">
          About me
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
            className="block h-[260px] w-full rounded-[22px] object-cover"
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
          SECTION 4 — OFFERINGS (id="courses")
          ============================================================ */}
      <section
        id="courses"
        className="mt-[64px] lg:mt-[120px] flex flex-col gap-[28px] lg:gap-[56px] bg-white px-[16px] py-[56px] lg:px-[80px] lg:py-[100px] animate-fade-up"
      >
        <div className="flex flex-col items-start lg:items-center gap-[10px] lg:gap-[14px] text-left lg:text-center">
          <span className="text-[11px] lg:text-[13px] font-medium uppercase tracking-[2px] lg:tracking-[3px] text-gold-text">
            Offerings
          </span>
          <h2 className="m-0 font-serif text-[34px] lg:text-[56px] font-normal leading-[1.1] lg:leading-normal text-ink">
            How I can walk with you
          </h2>
          <p className="hidden lg:block m-0 max-w-[560px] text-[17px] leading-[1.6] text-body">
            Start with the full path, or take each course on its own. Every
            course is taught personally, one-to-one, online.
          </p>
        </div>

        {/* 1 col on mobile (<768px), 2 cols on tablet (768-1023px), 3 cols on desktop (>=1024px) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[28px] lg:gap-[32px]">
          {/* Card 1: Introduction to LOA */}
          <article className="flex flex-col gap-[12px] lg:gap-[20px]">
            <div className="relative">
              <Image
                src={COURSES.intro.image}
                alt={COURSES.intro.imageAlt}
                width={400}
                height={300}
                className="block h-[200px] lg:h-[300px] w-full rounded-[20px] lg:rounded-[24px] object-cover"
              />
              <span className="absolute left-[12px] top-[12px] lg:left-[16px] lg:top-[16px] rounded-full bg-white px-[12px] py-[6px] lg:px-[14px] lg:py-[8px] text-[12px] lg:text-[13px] font-medium text-ink">
                {COURSES.intro.tag}
              </span>
            </div>
            <h3 className="m-0 font-serif text-[24px] lg:text-[30px] font-normal text-ink">
              {COURSES.intro.name}
            </h3>
            <p className="m-0 text-[15px] lg:text-[16px] leading-[1.55] lg:leading-[1.6] text-body">
              <span className="hidden lg:inline">
                {COURSES.intro.description}
              </span>
              <span className="lg:hidden">
                {COURSES.intro.mobileDescription}
              </span>
            </p>
            <div className="mt-auto flex items-center justify-between">
              <span className="font-serif text-[26px] lg:text-[32px] text-ink">
                {COURSES.intro.priceLabel}
              </span>
              <Link
                href="/book?course=intro"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-maroon px-[22px] py-[12px] lg:py-[13px] text-[15px] font-medium text-white no-underline hover:bg-maroon-dark transition-colors"
              >
                Book
              </Link>
            </div>
          </article>

          {/* Card 2: Tools for Emotional Mastery */}
          <article className="flex flex-col gap-[12px] lg:gap-[20px] border-t border-divider pt-[28px] md:border-t-0 md:pt-0">
            <div className="relative">
              <Image
                src={COURSES.tools.image}
                alt={COURSES.tools.imageAlt}
                width={400}
                height={300}
                className="block h-[200px] lg:h-[300px] w-full rounded-[20px] lg:rounded-[24px] object-cover"
              />
              <span className="absolute left-[12px] top-[12px] lg:left-[16px] lg:top-[16px] rounded-full bg-white px-[12px] py-[6px] lg:px-[14px] lg:py-[8px] text-[12px] lg:text-[13px] font-medium text-ink">
                {COURSES.tools.tag}
              </span>
            </div>
            <h3 className="m-0 font-serif text-[24px] lg:text-[30px] font-normal text-ink">
              {COURSES.tools.name}
            </h3>
            <p className="m-0 text-[15px] lg:text-[16px] leading-[1.55] lg:leading-[1.6] text-body">
              <span className="hidden lg:inline">
                {COURSES.tools.description}
              </span>
              <span className="lg:hidden">
                {COURSES.tools.mobileDescription}
              </span>
            </p>
            <div className="mt-auto flex items-center justify-between">
              <span className="font-serif text-[26px] lg:text-[32px] text-ink">
                {COURSES.tools.priceLabel}
              </span>
              <Link
                href="/book?course=tools"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-maroon px-[22px] py-[12px] lg:py-[13px] text-[15px] font-medium text-white no-underline hover:bg-maroon-dark transition-colors"
              >
                Book
              </Link>
            </div>
          </article>

          {/* Card 3: Further sessions */}
          <article className="flex flex-col gap-[12px] lg:gap-[20px] border-t border-divider pt-[28px] md:col-span-2 lg:col-span-1 lg:border-t-0 lg:pt-0">
            <div className="relative">
              <Image
                src={FURTHER_SESSIONS.image}
                alt={FURTHER_SESSIONS.imageAlt}
                width={400}
                height={300}
                className="block h-[200px] lg:h-[300px] w-full rounded-[20px] lg:rounded-[24px] object-cover"
              />
              <span className="absolute left-[12px] top-[12px] lg:left-[16px] lg:top-[16px] rounded-full bg-white px-[12px] py-[6px] lg:px-[14px] lg:py-[8px] text-[12px] lg:text-[13px] font-medium text-ink">
                {FURTHER_SESSIONS.tag}
              </span>
            </div>
            <h3 className="m-0 font-serif text-[24px] lg:text-[30px] font-normal text-ink">
              {FURTHER_SESSIONS.title}
            </h3>
            <p className="hidden lg:block m-0 text-[16px] leading-[1.6] text-body">
              {FURTHER_SESSIONS.description}
            </p>
            <div className="mt-auto flex items-center justify-between">
              <span className="hidden lg:inline font-serif text-[32px] text-ink">
                ₹2,000{" "}
                <span className="font-sans text-[15px] text-muted">
                  / hr · ₹1,000 / 30 min
                </span>
              </span>
              <span className="lg:hidden text-[15px] text-body">
                ₹2,000 / hr · ₹1,000 / 30 min
              </span>
              <a
                href={whatsappFurtherUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border-[1.5px] border-maroon px-[20px] py-[11px] lg:py-[12px] text-[15px] font-medium text-maroon no-underline hover:bg-maroon hover:text-white transition-colors"
              >
                Ask
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* ============================================================
          SECTION 5 — JOURNEY ("Words don't teach. Your life will.")
          ============================================================ */}
      {/* Desktop Journey (matches desktop-home.html lines 113-130) */}
      <section className="hidden lg:flex flex-col gap-[48px] px-[80px] pt-[120px] animate-fade-up">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-[14px]">
            <span className="text-[13px] font-medium uppercase tracking-[3px] text-gold-text">
              How the programme unfolds
            </span>
            <h2 className="m-0 font-serif text-[56px] font-normal leading-[1.05] text-ink">
              Words don’t teach.
              <br />
              <em className="italic text-maroon">Your life will.</em>
            </h2>
          </div>
          <p className="m-0 max-w-[400px] text-[17px] leading-[1.65] text-body">
            Every call is followed by a week of observation, with a recap and a
            practice page to keep you on track.
          </p>
        </div>

        <div className="grid grid-cols-6 gap-[16px]">
          {DESKTOP_JOURNEY_CARDS.map((card, idx) => (
            <div
              key={card.num}
              className={`flex flex-col gap-[12px] rounded-[22px] px-[22px] py-[26px] ${
                idx === 0 ? "min-height-[250px]" : ""
              } ${
                card.dark ? "bg-maroon text-cream" : "bg-sand text-ink"
              }`}
            >
              <span
                className={`font-serif text-[40px] leading-none ${
                  card.dark ? "text-gold" : "text-maroon"
                }`}
              >
                {card.num}
              </span>
              <span className="text-[17px] font-semibold">{card.title}</span>
              <span
                className={`text-[14px] leading-[1.55] ${
                  card.dark ? "text-[#F1D9D3]" : "text-body"
                }`}
              >
                {card.desc}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between px-[6px] text-[14px] text-muted">
          <span>← Course 1 · Introduction to LOA</span>
          <span>Course 2 · Tools for Emotional Mastery →</span>
        </div>
      </section>

      {/* Mobile Journey (matches mobile-home.html lines 94-107) */}
      <section className="flex lg:hidden flex-col gap-[22px] px-[16px] pt-[64px] animate-fade-up">
        <div className="flex flex-col gap-[10px]">
          <span className="text-[11px] font-medium uppercase tracking-[2px] text-gold-text">
            How it unfolds
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
                    className={`flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full font-serif ${
                      isSmallFont ? "text-[16px]" : "text-[17px]"
                    } ${
                      step.dark
                        ? "bg-maroon text-gold"
                        : "bg-sand text-maroon"
                    }`}
                  >
                    {step.num}
                  </span>
                  {!isLast && (
                    <span className="w-[2px] flex-grow bg-line" />
                  )}
                </div>
                <div
                  className={`flex flex-col gap-[4px] ${
                    !isLast ? "pb-[20px]" : ""
                  }`}
                >
                  <span className="pt-[9px] text-[16px] font-semibold text-ink">
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
          SECTION 6 — BHAGAVAD GITA QUOTE BAND
          ============================================================ */}
      <section className="relative mx-[12px] lg:mx-[80px] mt-[64px] lg:mt-[120px] h-[360px] lg:h-[480px] overflow-hidden rounded-[28px] lg:rounded-[36px] animate-fade-up">
        <Image
          src="/images/quote-sky.jpg"
          alt="Calm sea under a pink and blue sky"
          fill
          sizes="(max-width: 1024px) 100vw, 1280px"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#2B1B1B]/45 lg:bg-[#2B1B1B]/[0.42]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[14px] lg:gap-[20px] px-[24px] lg:px-[160px] text-center text-white box-border">
          <span className="text-[11px] lg:text-[13px] font-medium uppercase tracking-[2px] lg:tracking-[3px] text-[#F2D08A]">
            From the Bhagavad Gita
          </span>
          <p className="m-0 font-serif text-[26px] lg:text-[44px] italic leading-[1.3] lg:leading-[1.25]">
            Whatever happens, happens for the best. Whatever is happening is
            also happening for the best.
          </p>
          <span className="hidden lg:inline text-[16px] text-[#F4E8E2]">
            Everything happens in perfect Divine timing.
          </span>
        </div>
      </section>

      {/* ============================================================
          SECTION 7 — PRICING + SEEKERS' WORDS (REVIEWS)
          ============================================================ */}
      {/* Desktop Pricing + Reviews (matches desktop-home.html lines 142-170) */}
      <section className="hidden lg:grid grid-cols-12 items-stretch gap-[40px] px-[80px] pt-[120px] animate-fade-up">
        <div
          className={`${
            showReviews ? "col-span-5" : "col-span-8 col-start-3"
          } flex flex-col gap-[22px] rounded-[32px] bg-ink p-[48px] text-cream`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[13px] uppercase tracking-[2px] text-gold">
              The whole path
            </span>
            <span className="rounded-full bg-gold px-[14px] py-[7px] text-[13px] font-semibold text-ink">
              Best value
            </span>
          </div>
          <span className="font-serif text-[34px] leading-[1.15]">
            Introduction to LOA + Tools for Emotional Mastery
          </span>
          <div className="flex items-baseline gap-[16px]">
            <span className="font-serif text-[72px] leading-none">₹12,500</span>
            <span className="text-[18px] text-[#A8928B] line-through">
              ₹25,000
            </span>
          </div>
          <div className="flex flex-col gap-[12px] text-[16px] text-[#E6D8D2]">
            {COURSES.whole.benefits?.map((benefit) => (
              <span key={benefit} className="flex items-center gap-[12px]">
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
                {benefit}
              </span>
            ))}
          </div>
          <Link
            href="/book?course=whole"
            className="mt-[8px] inline-flex min-h-[54px] items-center justify-center rounded-full bg-gold p-[18px] text-center text-[16px] font-semibold text-ink no-underline hover:brightness-95 transition-all"
          >
            Begin the whole path
          </Link>
        </div>

        {showReviews && (
          <div className="col-span-7 flex flex-col gap-[24px]">
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-[12px]">
                <span className="text-[13px] font-medium uppercase tracking-[3px] text-gold-text">
                  Seekers’ words
                </span>
                <h2 className="m-0 font-serif text-[48px] font-normal text-ink">
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
            <div className="flex flex-grow flex-col gap-[18px] rounded-[24px] bg-white p-[32px]">
              <svg
                width="36"
                height="28"
                viewBox="0 0 36 28"
                fill="#E7B85A"
                aria-hidden="true"
              >
                <path d="M0 28V16C0 7 5 1.5 14 0l1.5 4C10 5.5 7.5 9 7.5 13H14v15H0zm20 0V16c0-9 5-14.5 14-16l1.5 4C30 5.5 27.5 9 27.5 13H34v15H20z" />
              </svg>
              <p className="m-0 font-serif text-[26px] leading-[1.35] text-body">
                {firstWritten
                  ? firstWritten.written_review
                  : "[First seeker’s written review goes here — the Reviews page has none yet.]"}
              </p>
              <span className="text-[15px] text-muted">
                {firstWritten
                  ? `${firstWritten.name} · ${firstWritten.course}`
                  : "[Name] · The whole path"}
              </span>
            </div>

            {/* Two Small Tiles */}
            <div className="grid grid-cols-2 gap-[16px]">
              <div className="relative h-[170px] overflow-hidden rounded-[22px]">
                <Image
                  src="/images/review-grateful.jpg"
                  alt="A gratitude journal with a pen"
                  width={360}
                  height={170}
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
              <div className="flex flex-col justify-between rounded-[22px] bg-sand p-[24px]">
                <span className="text-[16px] leading-[1.5] text-body">
                  {secondWritten
                    ? `“${secondWritten.written_review}”`
                    : "“[Short written review]”"}
                </span>
                <span className="text-[14px] text-muted">
                  {secondWritten
                    ? `${secondWritten.name} · ${secondWritten.course}`
                    : "[Name] · Introduction to LOA"}
                </span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Mobile Pricing + Reviews (matches mobile-home.html lines 118-145) */}
      <div className="lg:hidden animate-fade-up">
        <section className="mx-[12px] mt-[64px] flex flex-col gap-[16px] rounded-[28px] bg-ink px-[22px] py-[32px] text-cream">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[2px] text-gold">
              The whole path
            </span>
            <span className="rounded-full bg-gold px-[12px] py-[6px] text-[12px] font-semibold text-ink">
              Best value
            </span>
          </div>
          <span className="font-serif text-[24px] leading-[1.2]">
            Introduction to LOA + Tools for Emotional Mastery
          </span>
          <div className="flex items-baseline gap-[12px]">
            <span className="font-serif text-[52px] leading-none">₹12,500</span>
            <span className="text-[16px] text-[#A8928B] line-through">
              ₹25,000
            </span>
          </div>
          <div className="flex flex-col gap-[10px] text-[15px] text-[#E6D8D2]">
            <span className="flex items-center gap-[10px]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E7B85A"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12l5 5 9-10" />
              </svg>
              All five phases, one-to-one
            </span>
            <span className="flex items-center gap-[10px]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E7B85A"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12l5 5 9-10" />
              </svg>
              WhatsApp support for the month
            </span>
            <span className="flex items-center gap-[10px]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E7B85A"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12l5 5 9-10" />
              </svg>
              Videos, meditations and the booklet
            </span>
            <span className="flex items-center gap-[10px]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E7B85A"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12l5 5 9-10" />
              </svg>
              ₹1,000 less than both courses separately
            </span>
          </div>
          <Link
            href="/book?course=whole"
            className="mt-[6px] inline-flex min-h-[52px] items-center justify-center rounded-full bg-gold p-[17px] text-center text-[16px] font-semibold text-ink no-underline"
          >
            Begin the whole path
          </Link>
        </section>

        {showReviews && (
          <section className="flex flex-col gap-[18px] px-[16px] pt-[64px]">
            <div className="flex items-end justify-between">
              <h2 className="m-0 font-serif text-[30px] font-normal text-ink">
                Seekers’ words
              </h2>
              <Link
                href="/reviews"
                className="min-h-[44px] inline-flex items-center text-[14px] font-medium text-maroon no-underline"
              >
                Leave a review →
              </Link>
            </div>

            <div className="no-scrollbar flex gap-[12px] overflow-x-auto snap-x snap-mandatory">
              <div className="flex w-[300px] shrink-0 snap-start flex-col gap-[14px] rounded-[22px] bg-white p-[22px]">
                <svg
                  width="28"
                  height="22"
                  viewBox="0 0 36 28"
                  fill="#E7B85A"
                  aria-hidden="true"
                >
                  <path d="M0 28V16C0 7 5 1.5 14 0l1.5 4C10 5.5 7.5 9 7.5 13H14v15H0zm20 0V16c0-9 5-14.5 14-16l1.5 4C30 5.5 27.5 9 27.5 13H34v15H20z" />
                </svg>
                <p className="m-0 font-serif text-[20px] leading-[1.35] text-body">
                  {firstWritten
                    ? firstWritten.written_review
                    : "[First seeker’s written review]"}
                </p>
                <span className="text-[13px] text-muted">
                  {firstWritten
                    ? `${firstWritten.name} · ${firstWritten.course}`
                    : "[Name] · The whole path"}
                </span>
              </div>

              <div className="relative w-[200px] shrink-0 snap-start overflow-hidden rounded-[22px]">
                <Image
                  src="/images/review-grateful.jpg"
                  alt="A gratitude journal with a pen"
                  width={200}
                  height={180}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-[12px] bottom-[12px] rounded-full bg-white px-[12px] py-[6px] text-[12px] font-medium text-ink">
                  ▶ [Video review]
                </span>
              </div>

              <div className="flex w-[260px] shrink-0 snap-start flex-col justify-between rounded-[22px] bg-sand p-[22px]">
                <span className="text-[15px] leading-[1.5] text-body">
                  {secondWritten
                    ? `“${secondWritten.written_review}”`
                    : "“[Short written review]”"}
                </span>
                <span className="text-[13px] text-muted">
                  {secondWritten
                    ? `${secondWritten.name} · ${secondWritten.course}`
                    : "[Name] · Introduction to LOA"}
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-[6px]" aria-hidden="true">
              <span className="h-[6px] w-[18px] rounded-full bg-maroon" />
              <span className="h-[6px] w-[6px] rounded-full bg-line" />
              <span className="h-[6px] w-[6px] rounded-full bg-line" />
            </div>
          </section>
        )}
      </div>

      {/* ============================================================
          SECTION 8 — CLOSING CTA
          ============================================================ */}
      {/* Desktop Closing CTA (matches desktop-home.html lines 172-182) */}
      <section className="hidden lg:block relative mx-[40px] mt-[120px] h-[520px] overflow-hidden rounded-[36px] bg-night animate-fade-up">
        <Image
          src="/images/cta-diya.jpg"
          alt="Hands holding a lit diya"
          width={620}
          height={520}
          className="absolute right-0 top-0 h-[520px] w-[620px] object-cover"
        />
        <div className="absolute left-0 top-0 flex h-[520px] w-[900px] flex-col gap-[24px] px-[96px] py-[88px] text-cream box-border">
          <span className="text-[13px] uppercase tracking-[3px] text-gold">
            Your journey begins with one step
          </span>
          <h2 className="m-0 font-serif text-[68px] font-normal leading-[1.02]">
            You are a powerful creator.
            <br />
            <em className="italic text-gold">Come see it for yourself.</em>
          </h2>
          <div className="mt-[8px] flex gap-[14px]">
            <Link
              href="/book"
              className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-gold px-[30px] py-[18px] font-semibold text-ink no-underline hover:brightness-95 transition-all"
            >
              Book your path
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

      {/* Mobile Closing CTA (matches mobile-home.html lines 147-155) */}
      <section className="lg:hidden relative mx-[12px] mt-[64px] h-[480px] overflow-hidden rounded-[28px] bg-night animate-fade-up">
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
            background: "linear-gradient(#1C1010, rgba(28,16,16,0))",
          }}
        />
        <div className="absolute left-0 top-0 flex w-full flex-col gap-[16px] px-[22px] py-[36px] text-cream box-border">
          <span className="text-[11px] uppercase tracking-[2px] text-gold">
            Begin with one step
          </span>
          <h2 className="m-0 font-serif text-[36px] font-normal leading-[1.08]">
            You are a powerful creator.{" "}
            <em className="italic text-gold">Come see it for yourself.</em>
          </h2>
          <Link
            href="/book"
            className="mt-[4px] inline-flex min-h-[50px] items-center justify-center rounded-full bg-gold p-[16px] text-center font-semibold text-ink no-underline"
          >
            Book your path
          </Link>
        </div>
      </section>
    </main>
  );
}
