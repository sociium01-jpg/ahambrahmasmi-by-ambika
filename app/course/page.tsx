import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";
import { CoursePhases, PhaseItem } from "@/components/CoursePhases";
import { InvestmentAndGuidelines } from "@/components/InvestmentAndGuidelines";
import { COURSES } from "@/lib/site";

export const metadata: Metadata = {
  title: "The 5-Week Course Overview",
  description:
    "Full overview of the 5-week 1-to-1 Law of Attraction coaching programme with Ambika Mohan — One path. Paid in full. One to one. Rs. 15,000/- (only Introductory Price).",
};

const UNIFIED_COURSE_SESSIONS: PhaseItem[] = [
  {
    id: "session-1",
    badge: "01",
    title: "Session 1 · Watch videos",
    duration: "Pre-session preparation videos",
    paragraphs: [
      "Preparing to learn the Law of Attraction by watching the movie The Secret and a few curated videos whose YouTube links I’ll be sharing with you.",
    ],
  },
  {
    id: "session-2",
    badge: "02",
    title: "Session 2 · Live experiment + DIY",
    duration: "1 to 1 coaching (1hr) + 1 week of DIY observation",
    paragraphs: [
      <>
        A 1-hour live one-to-one video call to illustrate the Law of Attraction
        with a live experiment, followed by DIY tasks to understand and observe
        how this Law works in your own life — because{" "}
        <em>words don’t teach</em>. Only your own <em>life experience will</em>.
      </>,
      <>
        You’ll be making your own observations and doing a few experiments which
        will further reinforce what you have learnt and will help you{" "}
        <em>believe</em> in the Law of Attraction, thereby helping you realise
        that <em>you</em> are in control of your life experience — making you
        have more <em>faith in you</em> rather than the world outside… because{" "}
        <em>faith</em> is what Creates. People tell you to “have faith!” but
        they don’t teach you <em>how!</em> So, it will be more like a DIY{" "}
        <em>faith</em> building exercise.
      </>,
    ],
  },
  {
    id: "phase-3a",
    badge: "3A",
    title: "Phase 3A · The instrument",
    duration: "1 to 1 coaching (2hrs)",
    paragraphs: [
      "We begin this 2-hour one-to-one session by looking at your observations from the DIY week, and seeing if you’ve had any proof of the Law. If you’ve not been able to experience much yet, you will continue to keep observing. Faith is key, so we observe until we create faith.",
      "This session is a meeting with the instrument you live in. You will learn about your physical body as an instrument, your Emotional Guidance System, and the living relationship between the two — how what the body feels is already guiding you back to Who-You-Truly-Are. You will also see why a simple daily practice of stillness helps that instrument stay clear. A short recap and a week’s observation page follow the call.",
    ],
  },
  {
    id: "phase-3b",
    badge: "3B",
    title: "Phase 3B · Creation",
    duration: "1 to 1 coaching (2hrs)",
    paragraphs: [
      "We begin 3B with what you noticed on the page from the week. Then during this 2-hour one-to-one coaching session you will learn the 5-step creative process, and the minute nuances of manifestation — how it is quietly shaped by the principles of energy. A short recap and a week’s practice page follow the call. You will understand how life happens on a day-to-day basis and how exactly this Universe works by the end of the session.",
    ],
  },
  {
    id: "session-4",
    badge: "04",
    title: "Session 4 · Tools for mind management",
    duration: "1 to 1 coaching (2hrs) + 1 week practice",
    paragraphs: [
      "You’ll take around a week to experiment and observe whatever you’ve learnt and also to analyse what changes you have created in your life by introducing a meditation routine. We’ll discuss your experiences over this 2-hour one-to-one session. You’ll learn powerful tools which will help you further gain more Clarity and a better connection with your Higher-Self. You’ll try and experiment with the added tools that next week.",
      "Tools covered: Pivoting, breathwork every one hour, creating the feeling with words & visualisation, asking questions to the Universe and getting answers whenever in doubt, gratitude journal, book of positive aspects, etc.",
    ],
    tools: [
      "Meditation routine",
      "Pivoting",
      "Breathwork every one hour",
      "Creating the feeling with words & visualisation",
      "Asking questions to the Universe & receiving answers",
      "Gratitude journal",
      "Book of positive aspects",
    ],
  },
  {
    id: "session-5",
    badge: "05",
    title: "Session 5 · Belief, affirmation & vision board",
    duration: "1 to 1 coaching (1hr)",
    paragraphs: [
      "You’ll have tried and tested all theories and tools by the end of this week. You’ll have a 1-hour one-to-one session to ask questions about what you observed, and make tweaks if necessary. You’ll also do a self-analysis of your beliefs about your current situation in hand, and learn what changes to make in your belief system and affirmations. We will do a complete recap of all that we learnt during the course, create your Vision Board, and give you a list of reminders on how to conduct yourself through life in general to maintain your Alignment with the Source Energy within.",
    ],
    tools: ["Belief self-analysis", "Affirmations", "Vision board", "Daily alignment reminders"],
  },
];

export default function CoursePage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-[14px] sm:px-[24px] lg:px-[80px] pt-[24px] lg:pt-[56px]">
      {/* ============================================================
          PART 1 — AMBIKA'S OPENING LETTER (Warm Cream + Soft Lavender Accents)
          ============================================================ */}
      <section className="mx-auto max-w-[960px] rounded-[28px] lg:rounded-[36px] bg-white border border-lavender-border/70 p-[24px] sm:p-[40px] lg:p-[64px] shadow-mobile-stat animate-fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[20px]">
          <div className="flex flex-col gap-[10px]">
            <span className="font-cursive text-[28px] sm:text-[34px] leading-none text-lavender-deep">
              A journey of self discovery
            </span>
            <Eyebrow>1 to 1 · LOA Coaching · 5-Week Programme</Eyebrow>
            <h1 className="m-0 font-serif text-[34px] lg:text-[54px] font-normal leading-[1.08] text-ink">
              One path. Paid in full.{" "}
              <em className="italic text-maroon">One to one.</em>
            </h1>
          </div>
          <AnimatedLogo variant="full" size={120} className="shrink-0" />
        </div>

        <div className="mt-[28px] flex flex-col gap-[18px] text-[17px] lg:text-[18px] font-light leading-[1.75] text-body">
          <p className="m-0 font-serif text-[22px] text-ink">Hi,</p>
          <p className="m-0">
            Firstly, I thank you for this opportunity to be a vessel for the
            Universe to flow its Love &amp; Wisdom to you as an answer to your
            seeking and to be a co-creator in your experience. There’s nothing
            that makes me feel more connected to my Higher Self than doing this.
            So, Thank you.
          </p>
          <p className="m-0">
            I’ve created a good, old-fashioned 1-to-1 Coaching Program to teach
            the principles of the Law of Attraction to seekers so that I have a
            much more personal connection with the ones who are seeking this
            information. It gives me so much more satisfaction to share what I
            know in this intimate way than through an online video course or a
            group seminar. I like to feel the connection with each one of my
            clients because at the end of the day, this is how I share my Love
            with the world in my own unique way.
          </p>
          <p className="m-0">
            That being said, let me give you an overview of how I will be taking
            this further. You’ll start by watching the movie,{" "}
            <em>The Secret</em>. It’s available on YouTube for which I will be
            sending you a link.
          </p>
        </div>
      </section>

      {/* ============================================================
          PART 2 — THE UNIFIED 5-WEEK COURSE (ALL SESSIONS 1 TO 5)
          ============================================================ */}
      <section className="mx-auto mt-[40px] lg:mt-[64px] max-w-[960px] rounded-[28px] lg:rounded-[36px] bg-beige-card/75 border border-beige-border p-[22px] sm:p-[40px] lg:p-[56px] animate-fade-up">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-[16px] mb-[28px]">
          <div className="flex flex-col gap-[8px]">
            <span className="font-cursive text-[28px] text-lavender-deep leading-none">
              Complete 5-Week Curriculum
            </span>
            <Eyebrow>All Sessions · One Enrolment</Eyebrow>
            <h2 className="m-0 font-serif text-[30px] lg:text-[44px] font-normal leading-[1.1] text-ink">
              The 5-Week 1-to-1 Coaching Journey
            </h2>
          </div>
          <div className="flex flex-col lg:items-end">
            <span className="font-serif text-[32px] lg:text-[38px] text-maroon shrink-0">
              {COURSES.whole.priceRsLabel}
            </span>
            <span className="font-cormorant text-[18px] italic text-maroon">
              (only Introductory Price)
            </span>
          </div>
        </div>

        <CoursePhases phases={UNIFIED_COURSE_SESSIONS} variant="sand" />

        <div className="mt-[28px] rounded-[20px] bg-lavender border border-lavender-border p-[20px] sm:p-[28px] flex flex-col sm:flex-row sm:items-center justify-between gap-[16px]">
          <div className="flex flex-col gap-[4px]">
            <span className="font-playfair text-[20px] font-medium text-maroon">
              Includes 1 Month of Personal Support
            </span>
            <span className="text-[15px] text-body">
              WhatsApp support for the month · curated videos, guided
              meditations &amp; your practice booklet.
            </span>
          </div>
          <Link
            href="/book"
            className="btn-3d-maroon animate-gold-shimmer shrink-0 inline-flex min-h-[52px] items-center justify-center rounded-full px-[28px] py-[14px] text-[15px] font-semibold text-white no-underline"
          >
            Book the 5-Week Course · ₹15,000
          </Link>
        </div>
      </section>

      {/* ============================================================
          PART 3 — INVESTMENT & IMPORTANT TO READ (PDF PAGES 1 & 2)
          ============================================================ */}
      <div className="mt-[48px] lg:mt-[72px]">
        <InvestmentAndGuidelines showLogoHeader={false} />
      </div>

      {/* ============================================================
          PART 4 — CLOSING "AT THE END OF IT ALL, YOU'LL UNDERSTAND…"
          ============================================================ */}
      <section className="mx-auto mt-[48px] lg:mt-[72px] max-w-[960px] rounded-[28px] lg:rounded-[36px] bg-lavender border border-lavender-border p-[28px] sm:p-[44px] lg:p-[64px] text-ink animate-fade-up">
        <span className="font-cursive text-[30px] sm:text-[36px] text-lavender-deep leading-none">
          At the end of it all
        </span>
        <h2 className="m-0 mt-[8px] font-serif text-[30px] lg:text-[46px] font-normal leading-[1.12] text-ink">
          You’ll understand that you are a{" "}
          <em className="italic text-maroon">Unique extension of One Force.</em>
        </h2>

        <p className="m-0 mt-[20px] text-[17px] lg:text-[19px] font-light leading-[1.75] text-body">
          At the end of it all, you’ll understand that you are a Unique
          extension of One Force. You’ll have experienced for yourself the Power
          of your own thoughts to create, and the power you possess within.
          You’ll have realised that it is{" "}
          <em className="font-medium text-maroon">you</em> who is
          drawing/creating all your experiences around you and that you’re{" "}
          <em className="font-medium text-maroon">not a victim</em> to the
          experiences that “seem to be” defining you… Rather, you’re here as{" "}
          <em className="font-medium text-maroon">powerful creators</em> (an
          extension of Creation itself) come to experience an exhilarating joy
          ride! You’ll understand that you can{" "}
          <em className="font-medium text-maroon">be / do / have</em> anything
          you desire and that it’s your birthright. You will not eliminate
          negativity from your life because you’ll learn that Contrast is an
          essential part of the Creative process. However, you’ll learn to see
          the value in it. You’ll never feel “lost” again because you now
          understand and see the value of it all.
        </p>

        <div className="mt-[32px] flex flex-col sm:flex-row sm:items-end justify-between gap-[24px] border-t border-lavender-border pt-[28px]">
          <div className="flex items-center gap-[16px]">
            <Image
              src="/images/ambika.png"
              alt="Ambika Mohan"
              width={64}
              height={64}
              className="h-[64px] w-[64px] rounded-full border-2 border-gold object-cover"
            />
            <div className="flex flex-col gap-[2px]">
              <span className="text-[15px] text-body">
                Looking forward to sharing what I know with you.{" "}
                <em>Stay Blessed.</em>
              </span>
              <span className="font-cursive text-[30px] text-maroon">
                Warm Regards, Ambika Mohan
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-[12px]">
            <Link
              href="/book"
              className="btn-3d-maroon animate-gold-shimmer inline-flex min-h-[52px] items-center justify-center rounded-full px-[28px] py-[16px] text-[16px] font-semibold text-white no-underline"
            >
              Begin the 5-Week Path · ₹15,000
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
