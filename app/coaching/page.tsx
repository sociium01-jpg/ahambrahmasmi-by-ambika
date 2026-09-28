import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  GlassCard,
  GlassPill,
  GlassTile,
  PriceCard,
} from "@/components/ui/Glass";
import { CoachingFaq } from "@/components/CoachingFaq";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { getWhatsAppUrl } from "@/lib/site";
import { getApprovedReviews } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "1:1 Law of Attraction Coaching",
  description:
    "Intimate 1-to-1 Law of Attraction coaching with Ambika Mohan. Creating Faith in the Law and Tools for Emotional Mastery.",
};

const PILLARS = [
  {
    num: "01",
    phase: "Phases 1 & 2 · Live + DIY",
    title: "Watch, Meet & Observe",
    desc: "You begin by watching The Secret and a few short preparation videos. On our first video call we run a live Law of Attraction experiment together, followed by a week of DIY faith-building tasks in your own life.",
  },
  {
    num: "02",
    phase: "Phases 3A & 3B · 1.5 hrs each",
    title: "The Instrument & Creation",
    desc: "Meet the physical body you live in and your Emotional Guidance System — how what the body feels is already guiding you back to Who-You-Truly-Are. Then learn the 5-step creative process and the nuances of energy.",
  },
  {
    num: "03",
    phase: "Phases 4 & 5 · Emotional Mastery",
    title: "Mind Tools, Beliefs & Vision",
    desc: "Build a daily stillness routine and practice pivoting, hourly breathwork, visualisation, your gratitude journal, and Book of Positive Aspects — culminating in belief self-analysis and your Vision Board.",
  },
];

const SIX_OUTCOMES = [
  {
    num: "01",
    title: "Conscious Day-to-Day Creation",
    text: "An in-depth understanding of how YOU create your day-to-day life experience.",
  },
  {
    num: "02",
    title: "How Thoughts Become Things",
    text: "An understanding of the Nature of Reality / Thought, and how Thoughts become Things.",
  },
  {
    num: "03",
    title: "Connection with Your Higher-Self",
    text: "Learning to connect with your Higher-Self / Inner Being / Universe — resulting in a happier, clearer version of you.",
  },
  {
    num: "04",
    title: "Practical Alignment Blueprint",
    text: "A blueprint to creating a more fulfilling life experience, with practical tools and techniques of alignment with your Higher-Self.",
  },
  {
    num: "05",
    title: "Zest for Life & Clarity",
    text: "A greater zest for Life, and more Clarity in general.",
  },
  {
    num: "06",
    title: "Peace Inside Contrast",
    text: "A certain peace that comes with understanding this system of Life — putting things into perspective even in moments of Contrast. Contrast is part of the creative process.",
  },
];

export default async function CoachingPage() {
  const approvedReviews = await getApprovedReviews();
  const isProd = process.env.NODE_ENV === "production";
  const showReviews = !isProd || approvedReviews.length > 0;

  const firstWritten = approvedReviews.find((r) => r.written_review);
  const secondWritten = approvedReviews.filter((r) => r.written_review)[1];

  const whatsappFurtherUrl = getWhatsAppUrl(
    "Hi Ambika, I'd love to ask about scheduling a further 1-to-1 session."
  );
  const whatsappGeneralUrl = getWhatsAppUrl(
    "Hi Ambika, I'm exploring your 1:1 Law of Attraction Coaching page and have a question."
  );

  return (
    <main className="mx-auto w-full max-w-[1440px] overflow-x-hidden">
      {/* ============================================================
          SECTION 1 — FULL-BLEED PHOTO HERO WITH GLASS PILL
          ============================================================ */}
      <section className="relative mx-[12px] lg:mx-[40px] mt-[12px] lg:mt-[24px] min-h-[540px] lg:min-h-[680px] overflow-hidden rounded-[28px] lg:rounded-[36px] flex items-center justify-center text-center px-[20px] py-[64px] lg:px-[120px] lg:py-[96px] animate-fade-up">
        <Image
          src="/images/hero-sea.jpg"
          alt="A woman sitting quietly by the sea at sunrise"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1360px"
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(30,10,13,0.58) 0%, rgba(30,10,13,0.76) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-[860px] flex-col items-center gap-[20px] lg:gap-[26px] text-white">
          <GlassPill>WORK WITH ME</GlassPill>

          <h1 className="m-0 font-playfair text-[44px] sm:text-[56px] lg:text-[76px] font-normal leading-[1.05]">
            1:1 Law of Attraction{" "}
            <em className="italic text-gold">Coaching</em>
          </h1>

          <p className="m-0 font-cormorant text-[30px] lg:text-[38px] font-medium italic leading-[1.2] text-badge">
            A journey of self discovery
          </p>

          <p className="m-0 max-w-[620px] font-inter text-[15px] lg:text-[18px] font-light leading-[1.7] text-white/90">
            An intimate, one-to-one coaching programme with Ambika Mohan —
            taught personally on live video calls, never in a group or
            pre-recorded course.
          </p>

          <div
            id="hero-cta-sentinel"
            className="mt-[8px] flex w-full sm:w-auto flex-col sm:flex-row items-center justify-center gap-[14px]"
          >
            <Link
              href="/book?course=whole"
              className="inline-flex min-h-[52px] w-full sm:w-auto items-center justify-center rounded-full bg-maroon px-[34px] py-[16px] font-inter text-[13px] font-semibold uppercase tracking-[0.2em] text-white no-underline hover:bg-maroon-dark transition-colors"
            >
              Book my spot · ₹12,500
            </Link>
            <a
              href="#whole-path"
              className="inline-flex min-h-[52px] w-full sm:w-auto items-center justify-center rounded-full border border-white/40 bg-white/10 px-[30px] py-[16px] font-inter text-[13px] font-semibold uppercase tracking-[0.2em] text-white no-underline hover:bg-white hover:text-ink transition-colors"
            >
              Choose your journey
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2 — "WORDS DON'T TEACH" SPLIT SECTION
          ============================================================ */}
      <section className="px-[16px] lg:px-[80px] pt-[64px] lg:pt-[120px] grid grid-cols-1 lg:grid-cols-12 items-center gap-[40px] lg:gap-[64px] animate-fade-up">
        <div className="lg:col-span-6 flex flex-col gap-[20px]">
          <span className="font-inter text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.22em] text-gold-text">
            THE PHILOSOPHY
          </span>
          <h2 className="m-0 font-playfair text-[34px] lg:text-[52px] font-normal leading-[1.08] text-ink">
            Words don’t teach.{" "}
            <em className="italic text-maroon">Only your life experience will.</em>
          </h2>
          <div className="flex flex-col gap-[16px] font-inter text-[15px] lg:text-[17px] font-light leading-[1.75] text-body">
            <p className="m-0">
              Firstly, I thank you for this opportunity to be a vessel for the
              Universe to flow its Love &amp; Wisdom to you as an answer to your
              seeking and to be a co-creator in your experience. There’s nothing
              that makes me feel more connected to my Higher Self than doing
              this.
            </p>
            <p className="m-0">
              I’ve created a good, old-fashioned 1-to-1 Coaching Program to
              teach the basic principles of Law of Attraction to seekers so that
              I have a much more personal connection with the ones who are
              seeking this information. It gives me so much more satisfaction to
              share what I know in this intimate way than through an online
              video course or a group seminar.
            </p>
            <p className="m-0">
              People tell you to “have faith!” — but they don’t teach you{" "}
              <em className="font-playfair italic text-maroon">how!</em> Every
              call is followed by a week of DIY observation and experiments in
              your own life, because faith is what Creates.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="relative h-[320px] lg:h-[500px] w-full overflow-hidden rounded-[26px] lg:rounded-[32px]">
            <Image
              src="/images/about-rock.jpg"
              alt="A woman meditating on a rock by a misty river"
              fill
              sizes="(max-width: 1024px) 100vw, 580px"
              className="h-full w-full object-cover"
            />
          </div>
          <Image
            src="/images/lotus.jpg"
            alt="A pink lotus in a pond"
            width={150}
            height={200}
            className="hidden sm:block absolute -right-[12px] top-[36px] h-[180px] w-[136px] rounded-[70px] border-[6px] border-cream object-cover shadow-floating"
          />
          <div className="mt-[16px] lg:mt-0 lg:absolute lg:left-[28px] lg:-bottom-[28px] lg:max-w-[440px] rounded-[22px] bg-white p-[24px] shadow-floating">
            <p className="m-0 font-cormorant text-[22px] lg:text-[25px] italic leading-[1.35] text-ink">
              “You’ll start by watching the movie,{" "}
              <span className="text-maroon">The Secret</span> — followed by a
              live experiment on our very first call.”
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3 — "CREATING FAITH IN THE LAW" (3 GlassCards on Blob Sand BG)
          ============================================================ */}
      <section className="relative isolate mx-[12px] lg:mx-[40px] mt-[64px] lg:mt-[140px] overflow-hidden rounded-[28px] lg:rounded-[36px] bg-sand px-[16px] py-[56px] lg:px-[64px] lg:py-[100px] animate-fade-up">
        {/* Two Big Blurred Colour Blobs Behind GlassCards */}
        <div
          aria-hidden="true"
          style={{
            background: "rgba(231, 184, 90, 0.45)",
            filter: "blur(90px)",
          }}
          className="pointer-events-none absolute -top-[60px] left-[8%] -z-10 h-[360px] w-[360px] lg:h-[460px] lg:w-[460px] rounded-full"
        />
        <div
          aria-hidden="true"
          style={{
            background: "rgba(142, 27, 37, 0.22)",
            filter: "blur(100px)",
          }}
          className="pointer-events-none absolute -bottom-[80px] right-[8%] -z-10 h-[380px] w-[380px] lg:h-[500px] lg:w-[500px] rounded-full"
        />

        <div className="mx-auto max-w-[720px] flex flex-col items-start lg:items-center text-left lg:text-center gap-[12px] mb-[36px] lg:mb-[56px]">
          <span className="font-inter text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.22em] text-gold-text">
            HOW THE CURRICULUM UNFOLDS
          </span>
          <h2 className="m-0 font-playfair text-[32px] lg:text-[52px] font-normal leading-[1.1] text-ink">
            Creating <em className="italic text-maroon">Faith</em> in the Law
          </h2>
          <p className="m-0 font-inter text-[15px] lg:text-[17px] font-light leading-[1.65] text-body">
            Five progressive phases across two courses — combining 1-to-1 calls,
            live experiments, stillness, and weekly observation pages.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px] lg:gap-[28px]">
          {PILLARS.map((pillar) => (
            <GlassCard
              key={pillar.num}
              className="flex flex-col gap-[16px]"
            >
              <div className="flex items-center gap-[14px] lg:flex-col lg:items-start lg:gap-[16px]">
                <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-maroon font-playfair text-[20px] text-gold">
                  {pillar.num}
                </span>
                <span className="font-inter text-[11px] font-bold uppercase tracking-[0.2em] text-gold-text">
                  {pillar.phase}
                </span>
              </div>
              <h3 className="m-0 font-playfair text-[24px] lg:text-[28px] font-normal leading-[1.2] text-ink">
                {pillar.title}
              </h3>
              <p className="m-0 font-inter text-[15px] lg:text-[16px] font-light leading-[1.7] text-body">
                {pillar.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ============================================================
          SECTION 4 — "CHOOSE YOUR JOURNEY" (3 PriceCards: dark · featured · dark)
          Mobile order: Whole Path (featured) FIRST, then Intro, then Tools
          ============================================================ */}
      <section className="px-[16px] lg:px-[80px] pt-[64px] lg:pt-[120px] animate-fade-up">
        <div className="mx-auto max-w-[720px] flex flex-col items-start lg:items-center text-left lg:text-center gap-[12px] mb-[36px] lg:mb-[56px]">
          <span className="font-inter text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.22em] text-gold-text">
            INVESTMENT · FEES IN INR
          </span>
          <h2 className="m-0 font-playfair text-[34px] lg:text-[54px] font-normal leading-[1.08] text-ink">
            Choose Your <em className="italic text-maroon">Journey</em>
          </h2>
          <p className="m-0 font-inter text-[15px] lg:text-[17px] font-light leading-[1.65] text-body">
            Walk the whole path together and save ₹1,000, or begin with Course 1
            and add Course 2 whenever you are ready.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px] lg:gap-[28px] items-stretch">
          {/* Card 1 on Desktop / Card 2 on Mobile: Introduction to LOA */}
          <PriceCard
            id="introduction"
            variant="dark"
            eyebrow="COURSE 1"
            badgeText="Phases 1–3B"
            title="Introduction to LOA"
            subtitle="Creating Faith in the Law"
            priceLabel="₹8,500"
            priceNote="Sessions 1, 2, 3A and 3B"
            bestFor="Best for seekers ready to experience direct, personal proof of the Law."
            items={[
              "Session 1: Watch The Secret + preparation videos & live experiment call",
              "Session 2: A week of DIY faith-building experiments (1 hr review)",
              "Phase 3A: The instrument — your body & Emotional Guidance System (1.5 hrs)",
              "Phase 3B: Creation — the 5-step creative process & energy nuances (1.5 hrs)",
            ]}
            ctaLabel="Book Course 1"
            ctaHref="/book?course=intro"
            className="order-2 lg:order-1"
          />

          {/* Card 2 on Desktop / Card 1 on Mobile: The Whole Path (Featured) */}
          <PriceCard
            id="whole-path"
            variant="featured"
            eyebrow="COMPLETE PROGRAMME"
            badgeText="Best value"
            title="The Whole Path"
            subtitle="Introduction to LOA + Tools for Emotional Mastery"
            priceLabel="₹12,500"
            struckPriceLabel="₹25,000"
            priceNote="Introductory fee · Save ₹1,000 vs. booking separately (₹13,500)"
            bestFor="Best for seekers committed to complete alignment, daily tools, and 1-month support."
            items={[
              "Every 1-to-1 session of Course 1 (Phases 1, 2, 3A, 3B) + Course 2 (Phases 4 & 5)",
              "Direct WhatsApp support with Ambika for the full month",
              "Curated preparation videos, guided meditations & practice booklet",
              "Belief self-analysis, daily alignment blueprint & Vision Board",
            ]}
            ctaLabel="Book my spot · ₹12,500"
            ctaHref="/book?course=whole"
            className="order-1 lg:order-2"
          />

          {/* Card 3 on Desktop & Mobile: Tools for Emotional Mastery */}
          <PriceCard
            id="tools"
            variant="dark"
            eyebrow="COURSE 2"
            badgeText="Phases 4–5"
            title="Tools for Emotional Mastery"
            subtitle="Practical Mind & Belief Alignment"
            priceLabel="₹5,000"
            priceNote="Sessions 4 and 5 · Follows Course 1"
            bestFor="Best for returning Course 1 seekers ready to master daily emotional tools."
            items={[
              "Phase 4: Meditation routine, pivoting, hourly breathwork & gratitude journal",
              "Creating the feeling with words, visualisation & Book of Positive Aspects",
              "Asking questions to the Universe and receiving your own answers",
              "Phase 5: Belief self-analysis, full course recap & Vision Board (1 hr)",
            ]}
            ctaLabel="Book Course 2"
            ctaHref="/book?course=tools"
            className="order-3"
          />
        </div>
      </section>

      {/* ============================================================
          SECTION 5 — "FURTHER SESSIONS" DARK BLOCK WITH GLASSTILES
          Mobile: image above text
          ============================================================ */}
      <section className="mx-[12px] lg:mx-[80px] mt-[64px] lg:mt-[100px] overflow-hidden rounded-[28px] lg:rounded-[36px] bg-plum-night p-[24px] sm:p-[40px] lg:p-[64px] text-cream animate-fade-up">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-[28px] lg:gap-[48px]">
          {/* Image first on mobile, right column on desktop */}
          <div className="lg:col-span-5 lg:order-2 relative h-[240px] sm:h-[300px] lg:h-[360px] w-full overflow-hidden rounded-[22px] lg:rounded-[26px]">
            <Image
              src="/images/sessions-call.jpg"
              alt="A woman smiling on a video call at home"
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="lg:col-span-7 lg:order-1 flex flex-col gap-[20px]">
            <span className="font-inter text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
              AFTER THE COURSE
            </span>
            <h2 className="m-0 font-playfair text-[32px] lg:text-[46px] font-normal leading-[1.1] text-white">
              Further <em className="italic text-gold">Sessions</em>
            </h2>
            <p className="m-0 font-inter text-[15px] lg:text-[17px] font-light leading-[1.7] text-white/85">
              Already walked the path? Come back for a one-hour or 30-minute
              1-to-1 session whenever you want clarity or guidance through a
              new moment of Contrast. Arranged directly with Ambika on WhatsApp.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] pt-[4px]">
              <GlassTile className="flex flex-col gap-[6px]">
                <span className="font-inter text-[12px] uppercase tracking-[0.18em] text-gold">
                  DEEP DIVE SESSION
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="font-playfair text-[32px] text-white">
                    ₹2,000
                  </span>
                  <span className="font-inter text-[14px] text-white/70">
                    / 1 hour
                  </span>
                </div>
              </GlassTile>

              <GlassTile className="flex flex-col gap-[6px]">
                <span className="font-inter text-[12px] uppercase tracking-[0.18em] text-gold">
                  ALIGNMENT CHECK-IN
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="font-playfair text-[32px] text-white">
                    ₹1,000
                  </span>
                  <span className="font-inter text-[14px] text-white/70">
                    / 30 minutes
                  </span>
                </div>
              </GlassTile>
            </div>

            <div className="pt-[6px]">
              <a
                href={whatsappFurtherUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[50px] w-full sm:w-auto items-center justify-center gap-[10px] rounded-full border border-gold bg-gold/10 px-[28px] py-[14px] font-inter text-[13px] font-semibold uppercase tracking-[0.2em] text-gold no-underline hover:bg-gold hover:text-ink transition-colors"
              >
                <WhatsAppIcon size={18} />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 6 — 6 OUTCOMES GRID (Numbered list on mobile, 3x2 grid on desktop)
          ============================================================ */}
      <section className="px-[16px] lg:px-[80px] pt-[64px] lg:pt-[120px] animate-fade-up">
        <div className="mx-auto max-w-[760px] flex flex-col items-start lg:items-center text-left lg:text-center gap-[12px] mb-[36px] lg:mb-[56px]">
          <span className="font-inter text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.22em] text-gold-text">
            INTENTION WITH SEEKERS
          </span>
          <h2 className="m-0 font-playfair text-[32px] lg:text-[52px] font-normal leading-[1.1] text-ink">
            What I Wish to <em className="italic text-maroon">Accomplish</em>{" "}
            Through What I Teach
          </h2>
        </div>

        <ol className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] lg:gap-[28px]">
          {SIX_OUTCOMES.map((item) => (
            <li
              key={item.num}
              className="flex flex-col gap-[12px] rounded-[24px] bg-white p-[24px] lg:p-[32px] border border-divider shadow-mobile-stat"
            >
              <span className="font-playfair text-[36px] leading-none text-maroon">
                {item.num}
              </span>
              <h3 className="m-0 font-playfair text-[21px] lg:text-[23px] font-normal text-ink">
                {item.title}
              </h3>
              <p className="m-0 font-inter text-[15px] font-light leading-[1.65] text-body">
                {item.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ============================================================
          SECTION 7 — ABOUT YOUR COACH (Centred portrait on mobile)
          ============================================================ */}
      <section className="mx-[12px] lg:mx-[80px] mt-[64px] lg:mt-[120px] rounded-[28px] lg:rounded-[36px] bg-sand p-[24px] sm:p-[40px] lg:p-[72px] animate-fade-up">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-[32px] lg:gap-[56px]">
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div className="relative h-[220px] w-[220px] lg:h-[320px] lg:w-[320px] overflow-hidden rounded-full border-[10px] border-cream bg-cream shadow-floating">
              <Image
                src="/images/ambika.png"
                alt="Ambika Mohan"
                width={320}
                height={320}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="mt-[18px] rounded-full bg-gold px-[18px] py-[8px] font-inter text-[13px] font-medium text-ink">
              Hi, I’m Ambika · fellow seeker
            </span>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-[20px] text-left">
            <span className="font-inter text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.22em] text-gold-text">
              ABOUT YOUR COACH
            </span>
            <h2 className="m-0 font-playfair text-[32px] lg:text-[48px] font-normal leading-[1.1] text-ink">
              Empowering you to receive{" "}
              <em className="italic text-maroon">your own answers.</em>
            </h2>
            <p className="m-0 font-inter text-[15px] lg:text-[17px] font-light leading-[1.75] text-body">
              Through the teachings of Abraham Hicks and observing my own life,
              I began to see that life wasn’t simply happening to me — it was
              being experienced through me. Somewhere along that journey, Aham
              Brahmasmi stopped being a phrase and became a knowing: I am the
              Core from which my life experience emerges.
            </p>
            <blockquote className="m-0 border-l-2 border-maroon pl-[20px] font-cormorant text-[22px] lg:text-[26px] italic leading-[1.45] text-ink">
              “My desire is to teach each and every one of my students to
              empower themselves by learning how to directly establish a
              connection with the Universe — so that you never need to come back
              to me with questions.”
            </blockquote>
            <div className="pt-[8px] flex flex-col sm:flex-row gap-[14px]">
              <Link
                href="/book?course=whole"
                className="inline-flex min-h-[50px] w-full sm:w-auto items-center justify-center rounded-full bg-maroon px-[30px] py-[15px] font-inter text-[13px] font-semibold uppercase tracking-[0.2em] text-white no-underline hover:bg-maroon-dark transition-colors"
              >
                Book my spot
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-[50px] w-full sm:w-auto items-center justify-center rounded-full border-[1.5px] border-ink px-[28px] py-[15px] font-inter text-[13px] font-semibold uppercase tracking-[0.2em] text-ink no-underline hover:bg-ink hover:text-cream transition-colors"
              >
                Read my full story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 8 — FAQ ACCORDION (5 items, 1 open at a time, 1st open by default)
          ============================================================ */}
      <section className="mx-auto max-w-[960px] px-[16px] lg:px-[40px] pt-[64px] lg:pt-[120px] animate-fade-up">
        <div className="flex flex-col items-start lg:items-center text-left lg:text-center gap-[12px] mb-[32px] lg:mb-[48px]">
          <span className="font-inter text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.22em] text-gold-text">
            COMMON QUESTIONS
          </span>
          <h2 className="m-0 font-playfair text-[32px] lg:text-[48px] font-normal leading-[1.1] text-ink">
            Frequently Asked <em className="italic text-maroon">Questions</em>
          </h2>
        </div>

        <CoachingFaq />
      </section>

      {/* ============================================================
          SECTION 9 — "VOICES OF TRANSFORMATION"
          ============================================================ */}
      {showReviews && (
        <section className="px-[16px] lg:px-[80px] pt-[64px] lg:pt-[120px] animate-fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-[16px] mb-[32px] lg:mb-[48px]">
            <div className="flex flex-col gap-[10px]">
              <span className="font-inter text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.22em] text-gold-text">
                SEEKERS’ WORDS
              </span>
              <h2 className="m-0 font-playfair text-[32px] lg:text-[48px] font-normal leading-[1.1] text-ink">
                Voices of{" "}
                <em className="italic text-maroon">Transformation</em>
              </h2>
            </div>
            <Link
              href="/reviews"
              className="min-h-[44px] inline-flex items-center font-inter text-[14px] font-semibold uppercase tracking-[0.15em] text-maroon no-underline hover:text-maroon-dark"
            >
              Leave a review →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[20px] lg:gap-[28px] items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between gap-[18px] rounded-[24px] bg-white p-[28px] lg:p-[36px] border border-divider">
              <svg
                width="36"
                height="28"
                viewBox="0 0 36 28"
                fill="#E7B85A"
                aria-hidden="true"
              >
                <path d="M0 28V16C0 7 5 1.5 14 0l1.5 4C10 5.5 7.5 9 7.5 13H14v15H0zm20 0V16c0-9 5-14.5 14-16l1.5 4C30 5.5 27.5 9 27.5 13H34v15H20z" />
              </svg>
              <p className="m-0 font-playfair text-[22px] lg:text-[26px] leading-[1.38] text-body">
                {firstWritten
                  ? firstWritten.written_review
                  : "[First seeker’s written review goes here — the Reviews page has none yet.]"}
              </p>
              <span className="font-inter text-[14px] text-muted">
                {firstWritten
                  ? `${firstWritten.name} · ${firstWritten.course}`
                  : "[Name] · The Whole Path"}
              </span>
            </div>

            <div className="lg:col-span-3 relative min-h-[220px] overflow-hidden rounded-[24px]">
              <Image
                src="/images/review-grateful.jpg"
                alt="A gratitude journal with a pen"
                fill
                sizes="(max-width: 1024px) 100vw, 320px"
                className="h-full w-full object-cover"
              />
              <span className="absolute left-[16px] bottom-[16px] rounded-full bg-white px-[14px] py-[8px] font-inter text-[13px] font-medium text-ink">
                ▶ [Video review]
              </span>
            </div>

            <div className="lg:col-span-3 flex flex-col justify-between rounded-[24px] bg-sand p-[28px]">
              <span className="font-inter text-[16px] leading-[1.6] text-body">
                {secondWritten
                  ? `“${secondWritten.written_review}”`
                  : "“[Short written review]”"}
              </span>
              <span className="font-inter text-[14px] text-muted">
                {secondWritten
                  ? `${secondWritten.name} · ${secondWritten.course}`
                  : "[Name] · Introduction to LOA"}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 10 — DIYA CLOSING CTA
          ============================================================ */}
      <section className="hidden lg:block relative mx-[40px] mt-[120px] h-[520px] overflow-hidden rounded-[36px] bg-night animate-fade-up">
        <Image
          src="/images/cta-diya.jpg"
          alt="Hands holding a lit diya"
          width={620}
          height={520}
          className="absolute right-0 top-0 h-[520px] w-[620px] object-cover"
        />
        <div className="absolute left-0 top-0 flex h-[520px] w-[900px] flex-col gap-[24px] px-[96px] py-[88px] text-cream box-border">
          <span className="font-inter text-[12px] font-bold uppercase tracking-[0.25em] text-gold">
            YOUR JOURNEY BEGINS WITH ONE STEP
          </span>
          <h2 className="m-0 font-playfair text-[64px] font-normal leading-[1.04]">
            You are a powerful creator.
            <br />
            <em className="italic text-gold">Come see it for yourself.</em>
          </h2>
          <div className="mt-[8px] flex gap-[14px]">
            <Link
              href="/book?course=whole"
              className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-gold px-[32px] py-[18px] font-inter text-[13px] font-semibold uppercase tracking-[0.2em] text-ink no-underline hover:brightness-95 transition-all"
            >
              Book your path
            </Link>
            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[54px] items-center justify-center rounded-full border-[1.5px] border-cream px-[28px] py-[17px] font-inter text-[13px] font-semibold uppercase tracking-[0.2em] text-cream no-underline hover:bg-cream hover:text-ink transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

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
          <span className="font-inter text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
            BEGIN WITH ONE STEP
          </span>
          <h2 className="m-0 font-playfair text-[34px] font-normal leading-[1.08]">
            You are a powerful creator.{" "}
            <em className="italic text-gold">Come see it for yourself.</em>
          </h2>
          <Link
            href="/book?course=whole"
            className="mt-[4px] inline-flex min-h-[50px] w-full items-center justify-center rounded-full bg-gold p-[16px] text-center font-inter text-[13px] font-semibold uppercase tracking-[0.2em] text-ink no-underline"
          >
            Book your path
          </Link>
        </div>
      </section>
    </main>
  );
}
