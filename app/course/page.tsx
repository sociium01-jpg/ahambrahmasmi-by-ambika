import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";
import { CoursePhases, PhaseItem } from "@/components/CoursePhases";
import { COURSES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Course overview",
  description:
    "Full overview of Introduction to LOA (Phases 1 to 3B) and Tools for Emotional Mastery (Phases 4 and 5) with Ambika Mohan.",
};

const COURSE_1_PHASES: PhaseItem[] = [
  {
    id: "phase-1",
    badge: "01",
    title: "Phase 1 · Watch videos and schedule a call",
    duration: "Pre-session videos + Quick live call",
    paragraphs: [
      "Preparing to learn the Law of Attraction by watching a few videos whose YouTube links I’ll be sharing. A quick video call to illustrate LOA with a live experiment.",
    ],
  },
  {
    id: "phase-2",
    badge: "02",
    title: "Phase 2 · DIY experiments",
    duration: "1 week of observation",
    paragraphs: [
      <>
        DIY tasks at the end of the first session to understand and observe how
        this Law works in your own life, because <em>words don’t teach</em>.
        Only your own <em>life experience will</em>. You’ll be making your own
        observations and doing a few experiments which will further reinforce
        what you have learnt and will help you <em>believe</em> in the Law of
        Attraction, thereby helping you realise that <em>you</em> are in control
        of your life experience making you have more <em>faith in you</em>{" "}
        rather than the world outside… because <em>faith</em> is what Creates.
        People tell you to “have faith!” but they don’t teach you <em>how!</em>{" "}
        So, it will be more like a DIY <em>faith</em> building exercise.
      </>,
    ],
  },
  {
    id: "phase-3a",
    badge: "3A",
    title: "Phase 3A · The instrument",
    duration: "About 1.5 hrs",
    paragraphs: [
      "We begin this longer stretch by looking at your observations from the DIY week, and seeing if you’ve had any proof of the Law. If you’ve not been able to experience much yet, you will continue to keep observing. Faith is key, so we observe until we create faith.",
      "This session is a meeting with the instrument you live in. You will learn about your physical body as an instrument, your Emotional Guidance System, and the living relationship between the two — how what the body feels is already guiding you back to Who-You-Truly-Are. You will also see why a simple daily practice of stillness helps that instrument stay clear. A short recap and a week’s observation page follow the call.",
    ],
  },
  {
    id: "phase-3b",
    badge: "3B",
    title: "Phase 3B · Creation",
    duration: "About 1.5 hrs",
    paragraphs: [
      "We begin 3B with what you noticed on the page from the week. Then you will learn the 5-step creative process, and the minute nuances of manifestation — how it is quietly shaped by the principles of energy. A short recap and a week’s practice page follow the call. You will understand how life happens on a day-to-day basis and how exactly this Universe works by the end of the session.",
    ],
  },
];

const COURSE_2_PHASES: PhaseItem[] = [
  {
    id: "phase-4",
    badge: "04",
    title: "Phase 4 · Tools for mind management",
    duration: "1.5 hr session + 1 week practice",
    paragraphs: [
      "You’ll take around a week to experiment and observe whatever you’ve learnt and also to analyse what changes you have created in your life by introducing a meditation routine. We’ll discuss your experiences over the next 1.5 hr session. You’ll learn a few more tools which will help you further gain more Clarity and a better connection with your Higher-Self. You’ll try and experiment with the added tools that next week.",
      "Tools: Pivoting, breathwork every one hour, creating the feeling with words & visualisation, asking questions to the Universe and getting answers whenever in doubt, gratitude journal, book of positive aspects, etc.",
    ],
    tools: [
      "Meditation routine",
      "Pivoting",
      "Breathwork every one hour",
      "Creating the feeling with words & visualisation",
      "Asking questions to the Universe & receiving answers",
      "Gratitude journal",
      "Book of positive aspects",
      "Vision board",
    ],
  },
  {
    id: "phase-5",
    badge: "05",
    title: "Phase 5 · Beliefs & vision",
    duration: "1 hr session",
    paragraphs: [
      "You’ll have tried and tested all theories and tools by the end of this week. You’ll have yet another 1-hour session to ask questions about what you observed, and make tweaks if necessary. You’ll also do a self analysis of your beliefs about your current situation in hand. You will learn what changes to make in your belief system and how. We will do a recap of all that we learnt during the course. You will learn about creating a Vision Board. You’ll be given a list of reminders on how to conduct yourself through life in general to maintain your Alignment with the Source Energy within so as to have better intuition, clarity and insight.",
    ],
  },
];

export default function CoursePage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-[16px] lg:px-[80px] pt-[24px] lg:pt-[56px]">
      {/* ============================================================
          PART 1 — AMBIKA'S OPENING LETTER
          ============================================================ */}
      <section className="mx-auto max-w-[960px] rounded-[28px] lg:rounded-[36px] bg-white p-[24px] sm:p-[40px] lg:p-[64px] shadow-mobile-stat animate-fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[20px]">
          <div className="flex flex-col gap-[14px]">
            <Eyebrow>Course overview</Eyebrow>
            <h1 className="m-0 font-serif text-[36px] lg:text-[56px] font-normal leading-[1.06] text-ink">
              A personal, <em className="italic text-maroon">one-to-one</em>{" "}
              coaching journey.
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
            the basic principles of Law of Attraction to seekers so that I have
            a much more personal connection with the ones who are seeking this
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
          PART 2 — COURSE 1: INTRODUCTION TO LOA
          ============================================================ */}
      <section className="mx-auto mt-[48px] lg:mt-[80px] max-w-[960px] rounded-[28px] lg:rounded-[36px] bg-sand p-[24px] sm:p-[40px] lg:p-[56px] animate-fade-up">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-[16px] mb-[28px]">
          <div className="flex flex-col gap-[10px]">
            <Eyebrow>Course 1 · Sessions 1 to 3B</Eyebrow>
            <h2 className="m-0 font-serif text-[32px] lg:text-[44px] font-normal leading-[1.1] text-ink">
              Introduction to LOA: Creating Faith in the Law
            </h2>
          </div>
          <span className="font-serif text-[32px] lg:text-[38px] text-maroon shrink-0">
            {COURSES.intro.priceLabel}
          </span>
        </div>

        <CoursePhases phases={COURSE_1_PHASES} variant="sand" />

        <div className="mt-[28px] flex flex-wrap items-center justify-between gap-[16px] pt-[8px]">
          <span className="text-[14px] text-muted">
            Includes Phases 1, 2, 3A and 3B · taught 1-to-1 online
          </span>
          <Link
            href="/book?course=intro"
            className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-maroon px-[28px] py-[14px] text-[15px] font-medium text-white no-underline hover:bg-maroon-dark transition-colors"
          >
            Book Course 1 · ₹8,500
          </Link>
        </div>
      </section>

      {/* ============================================================
          PART 3 — COURSE 2: TOOLS FOR EMOTIONAL MASTERY
          ============================================================ */}
      <section className="mx-auto mt-[48px] lg:mt-[72px] max-w-[960px] rounded-[28px] lg:rounded-[36px] bg-sand p-[24px] sm:p-[40px] lg:p-[56px] animate-fade-up">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-[16px] mb-[28px]">
          <div className="flex flex-col gap-[10px]">
            <Eyebrow>Course 2 · Sessions 4 and 5</Eyebrow>
            <h2 className="m-0 font-serif text-[32px] lg:text-[44px] font-normal leading-[1.1] text-ink">
              Tools for Emotional Mastery
            </h2>
          </div>
          <span className="font-serif text-[32px] lg:text-[38px] text-maroon shrink-0">
            {COURSES.tools.priceLabel}
          </span>
        </div>

        <CoursePhases phases={COURSE_2_PHASES} variant="maroon" />

        <div className="mt-[28px] flex flex-wrap items-center justify-between gap-[16px] pt-[8px]">
          <span className="text-[14px] text-muted">
            Includes Phases 4 and 5 · mind tools, belief analysis &amp; vision
            board
          </span>
          <Link
            href="/book?course=tools"
            className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-maroon px-[28px] py-[14px] text-[15px] font-medium text-white no-underline hover:bg-maroon-dark transition-colors"
          >
            Book Course 2 · ₹5,000
          </Link>
        </div>
      </section>

      {/* ============================================================
          PART 4 — CLOSING "AT THE END OF IT ALL, YOU'LL UNDERSTAND…"
          ============================================================ */}
      <section className="mx-auto mt-[48px] lg:mt-[72px] max-w-[960px] rounded-[28px] lg:rounded-[36px] bg-ink p-[28px] sm:p-[44px] lg:p-[64px] text-cream animate-fade-up">
        <Eyebrow tone="gold">At the end of it all</Eyebrow>
        <h2 className="m-0 mt-[12px] font-serif text-[32px] lg:text-[46px] font-normal leading-[1.12] text-cream">
          You’ll understand that you are a{" "}
          <em className="italic text-gold">Unique extension of One Force.</em>
        </h2>

        <p className="m-0 mt-[24px] text-[17px] lg:text-[19px] font-light leading-[1.75] text-[#E6D8D2]">
          At the end of it all, you’ll understand that you are a Unique
          extension of One Force. You’ll have experienced for yourself the Power
          of your own thoughts to create, and the power you possess within.
          You’ll have realised that it is <em className="text-gold">you</em> who
          is drawing/creating all your experiences around you and that you’re{" "}
          <em className="text-gold">not a victim</em> to the experiences that
          “seem to be” defining you… Rather, you’re here as{" "}
          <em className="text-gold">powerful creators</em> (an extension of
          Creation itself) come to experience an exhilarating joy ride! You’ll
          understand that you can <em className="text-gold">be / do / have</em>{" "}
          anything you desire and that it’s your birthright. You will not
          eliminate negativity from your life because you’ll learn that Contrast
          is an essential part of the Creative process. However, you’ll learn to
          see the value in it. You’ll never feel “lost” again because you now
          understand and see the value of it all.
        </p>

        <div className="mt-[32px] flex flex-col sm:flex-row sm:items-end justify-between gap-[24px] border-t border-white/15 pt-[28px]">
          <div className="flex items-center gap-[16px]">
            <Image
              src="/images/ambika.png"
              alt="Ambika Mohan"
              width={64}
              height={64}
              className="h-[64px] w-[64px] rounded-full border-2 border-gold object-cover"
            />
            <div className="flex flex-col gap-[2px]">
              <span className="text-[15px] text-[#E6D8D2]">
                Looking forward to sharing what I know with you.{" "}
                <em>Stay Blessed.</em>
              </span>
              <span className="font-serif text-[22px] italic text-gold">
                Warm Regards, Ambika Mohan
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-[12px]">
            <Link
              href="/book?course=whole"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-gold px-[28px] py-[16px] text-[16px] font-semibold text-ink no-underline hover:brightness-95 transition-all"
            >
              Begin the whole path · ₹12,500
            </Link>
            <Link
              href="/investment"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border-[1.5px] border-cream px-[24px] py-[15px] text-[15px] font-medium text-cream no-underline hover:bg-cream hover:text-ink transition-colors"
            >
              View Investment
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
