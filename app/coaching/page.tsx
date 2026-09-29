import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GlassCard, GlassPill } from "@/components/ui/Glass";
import { CoachingFaq } from "@/components/CoachingFaq";
import { InvestmentAndGuidelines } from "@/components/InvestmentAndGuidelines";
import { getWhatsAppUrl } from "@/lib/site";
import { getApprovedReviews } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "1:1 Law of Attraction Coaching",
  description:
    "Intimate 5-week 1-to-1 Law of Attraction coaching with Ambika Mohan. One path. Paid in full. One to one. Rs. 15,000/- (only Introductory Price).",
};

const PILLARS = [
  {
    num: "01",
    phase: "Sessions 1 & 2 · Videos + 1 hr Live",
    title: "Watch, Meet & Observe",
    desc: "You begin Session 1 by watching The Secret and curated preparation videos. In Session 2 (1 hr 1-to-1 coaching) we run a live Law of Attraction experiment together, followed by a week of DIY faith-building tasks in your own life.",
  },
  {
    num: "02",
    phase: "Phases 3A & 3B · 2 hrs each",
    title: "The Instrument & Creation",
    desc: "Over two 2-hour 1-to-1 coaching sessions, meet the physical body you live in and your Emotional Guidance System — then master the 5-step creative process and the subtle energy nuances of manifestation.",
  },
  {
    num: "03",
    phase: "Session 4 (2 hrs) & Session 5 (1 hr)",
    title: "Tools, Beliefs & Vision Board",
    desc: "Practise meditation, pivoting, hourly breathwork, visualisation, gratitude journal, and Book of Positive Aspects in Session 4 (2 hrs) — culminating in belief self-analysis, affirmations, and your Vision Board in Session 5 (1 hr).",
  },
];

const SIX_OUTCOMES = [
  {
    num: "01",
    title: "Conscious Day-to-Day Creation",
    text: "An in-depth understanding of how YOU create your day-to-day life experience.",
    tone: "beige",
  },
  {
    num: "02",
    title: "How Thoughts Become Things",
    text: "An understanding of the Nature of Reality / Thought, and how Thoughts become Things.",
    tone: "lavender",
  },
  {
    num: "03",
    title: "Connection with Your Higher-Self",
    text: "Learning to connect with your Higher-Self / Inner Being / Universe — resulting in a happier, clearer version of you.",
    tone: "beige",
  },
  {
    num: "04",
    title: "Practical Alignment Blueprint",
    text: "A blueprint to creating a more fulfilling life experience, with practical tools and techniques of alignment with your Higher-Self.",
    tone: "lavender",
  },
  {
    num: "05",
    title: "Zest for Life & Clarity",
    text: "A greater zest for Life, and more Clarity in general.",
    tone: "beige",
  },
  {
    num: "06",
    title: "Peace Inside Contrast",
    text: "A certain peace that comes with understanding this system of Life — putting things into perspective even in moments of Contrast. Contrast is part of the creative process.",
    tone: "lavender",
  },
];

export default async function CoachingPage() {
  const approvedReviews = await getApprovedReviews();
  const isProd = process.env.NODE_ENV === "production";
  const showReviews = !isProd || approvedReviews.length > 0;

  const firstWritten = approvedReviews.find((r) => r.written_review);
  const secondWritten = approvedReviews.filter((r) => r.written_review)[1];

  const whatsappGeneralUrl = getWhatsAppUrl(
    "Hi Ambika, I'm exploring your 5-week 1:1 Law of Attraction Coaching programme and have a question."
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
              "linear-gradient(180deg, rgba(46,32,26,0.56) 0%, rgba(38,24,32,0.78) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-[860px] flex-col items-center gap-[18px] lg:gap-[24px] text-white">
          <GlassPill>1 TO 1 · LOA COACHING</GlassPill>

          <p className="m-0 font-cursive text-[36px] sm:text-[46px] lg:text-[54px] leading-[1.1] text-[#E9D8F4]">
            A journey of self discovery
          </p>

          <h1 className="m-0 font-playfair text-[40px] sm:text-[54px] lg:text-[72px] font-normal leading-[1.06]">
            One Path. Paid in Full.{" "}
            <em className="italic text-gold">One to One.</em>
          </h1>

          <p className="m-0 max-w-[640px] font-inter text-[15px] lg:text-[18px] font-light leading-[1.7] text-white/90">
            A complete 5-week one-to-one coaching programme with Ambika Mohan —
            from building unshakeable faith in the Law of Attraction to daily
            emotional mastery, belief alignment, and a full month of WhatsApp
            support.
          </p>

          <div
            id="hero-cta-sentinel"
            className="mt-[8px] flex w-full sm:w-auto flex-col sm:flex-row items-center justify-center gap-[14px]"
          >
            <Link
              href="/book"
              className="btn-3d-maroon animate-gold-shimmer inline-flex min-h-[54px] w-full sm:w-auto items-center justify-center rounded-full px-[34px] py-[16px] font-inter text-[13px] font-semibold uppercase tracking-[0.18em] text-white no-underline"
            >
              Book the 5-Week Course · ₹15,000
            </Link>
            <a
              href="#programme-investment"
              className="inline-flex min-h-[54px] w-full sm:w-auto items-center justify-center rounded-full border border-white/40 bg-white/10 px-[30px] py-[16px] font-inter text-[13px] font-semibold uppercase tracking-[0.18em] text-white no-underline hover:bg-white hover:text-ink transition-colors"
            >
              View Course &amp; Fee
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2 — "WORDS DON'T TEACH" SPLIT SECTION
          ============================================================ */}
      <section className="px-[16px] lg:px-[80px] pt-[64px] lg:pt-[110px] grid grid-cols-1 lg:grid-cols-12 items-center gap-[40px] lg:gap-[64px] animate-fade-up">
        <div className="lg:col-span-6 flex flex-col gap-[18px]">
          <span className="font-cursive text-[30px] sm:text-[36px] leading-none text-lavender-deep">
            The Philosophy
          </span>
          <h2 className="m-0 font-playfair text-[34px] lg:text-[50px] font-normal leading-[1.08] text-ink">
            Words don’t teach.{" "}
            <em className="italic text-maroon">
              Only your life experience will.
            </em>
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
              teach the principles of the Law of Attraction to seekers so that I
              have a much more personal connection with the ones who are seeking
              this information. It gives me so much more satisfaction to share
              what I know in this intimate way than through an online video
              course or a group seminar.
            </p>
            <p className="m-0">
              People tell you to “have faith!” — but they don’t teach you{" "}
              <em className="font-playfair italic text-maroon">how!</em> Every
              session is followed by a week of DIY observation and experiments
              in your own life, because faith is what Creates.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="relative h-[320px] lg:h-[500px] w-full overflow-hidden rounded-[26px] lg:rounded-[32px] border border-beige-border">
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
          <div className="mt-[16px] lg:mt-0 lg:absolute lg:left-[28px] lg:-bottom-[28px] lg:max-w-[440px] rounded-[22px] bg-lavender border border-lavender-border p-[24px] shadow-floating">
            <p className="m-0 font-cormorant text-[22px] lg:text-[25px] italic leading-[1.35] text-ink">
              “You’ll start by watching the movie,{" "}
              <span className="text-maroon">The Secret</span> — followed by a
              live experiment on our very first call.”
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3 — "CREATING FAITH IN THE LAW" (3 GlassCards on Beige/Lavender Blob BG)
          ============================================================ */}
      <section className="relative isolate mx-[12px] lg:mx-[40px] mt-[64px] lg:mt-[130px] overflow-hidden rounded-[28px] lg:rounded-[36px] bg-sand/80 border border-beige-border px-[16px] py-[56px] lg:px-[64px] lg:py-[96px] animate-fade-up">
        {/* Soft Blurred Golden Beige + Lavender Blobs Behind GlassCards */}
        <div
          aria-hidden="true"
          style={{
            background: "rgba(231, 184, 90, 0.42)",
            filter: "blur(90px)",
          }}
          className="pointer-events-none absolute -top-[60px] left-[6%] -z-10 h-[340px] w-[340px] lg:h-[440px] lg:w-[440px] rounded-full"
        />
        <div
          aria-hidden="true"
          style={{
            background: "rgba(182, 152, 206, 0.45)",
            filter: "blur(95px)",
          }}
          className="pointer-events-none absolute -bottom-[70px] right-[6%] -z-10 h-[360px] w-[360px] lg:h-[480px] lg:w-[480px] rounded-full"
        />

        <div className="mx-auto max-w-[720px] flex flex-col items-start lg:items-center text-left lg:text-center gap-[10px] mb-[36px] lg:mb-[52px]">
          <span className="font-cursive text-[32px] sm:text-[38px] leading-none text-lavender-deep">
            How the 5 weeks unfold
          </span>
          <h2 className="m-0 font-playfair text-[32px] lg:text-[50px] font-normal leading-[1.1] text-ink">
            Creating <em className="italic text-maroon">Faith</em> &amp;
            Emotional Mastery
          </h2>
          <p className="m-0 font-inter text-[15px] lg:text-[17px] font-light leading-[1.65] text-body">
            Six intimate sessions across 5 weeks — combining 1-to-1 video calls,
            live experiments, stillness, mind management tools, and weekly
            observation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px] lg:gap-[28px]">
          {PILLARS.map((pillar) => (
            <GlassCard key={pillar.num} className="flex flex-col gap-[16px]">
              <div className="flex items-center gap-[14px] lg:flex-col lg:items-start lg:gap-[14px]">
                <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-maroon font-playfair text-[20px] text-gold">
                  {pillar.num}
                </span>
                <span className="font-inter text-[11px] font-bold uppercase tracking-[0.18em] text-lavender-deep">
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
          SECTION 4 — UNIFIED INVESTMENT & IMPORTANT TO READ (PDF PAGES 1 & 2)
          ============================================================ */}
      <div
        id="programme-investment"
        className="px-[12px] sm:px-[24px] lg:px-[80px] pt-[64px] lg:pt-[110px]"
      >
        <InvestmentAndGuidelines showLogoHeader={true} />
      </div>

      {/* ============================================================
          SECTION 5 — 6 OUTCOMES GRID (Warm Beige & Soft Lavender Alternating Cards)
          ============================================================ */}
      <section className="px-[16px] lg:px-[80px] pt-[64px] lg:pt-[110px] animate-fade-up">
        <div className="mx-auto max-w-[760px] flex flex-col items-start lg:items-center text-left lg:text-center gap-[10px] mb-[36px] lg:mb-[52px]">
          <span className="font-cursive text-[32px] sm:text-[38px] leading-none text-lavender-deep">
            My intention with every seeker
          </span>
          <h2 className="m-0 font-playfair text-[32px] lg:text-[50px] font-normal leading-[1.1] text-ink">
            What I Wish to <em className="italic text-maroon">Accomplish</em>{" "}
            Through What I Teach
          </h2>
        </div>

        <ol className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] lg:gap-[26px]">
          {SIX_OUTCOMES.map((item) => (
            <li
              key={item.num}
              className={`flex flex-col gap-[12px] rounded-[24px] p-[24px] lg:p-[32px] shadow-mobile-stat ${
                item.tone === "lavender"
                  ? "bg-lavender border border-lavender-border"
                  : "bg-beige-card/70 border border-beige-border"
              }`}
            >
              <span className="font-playfair text-[34px] leading-none text-maroon">
                {item.num}
              </span>
              <h3 className="m-0 font-playfair text-[21px] lg:text-[23px] font-medium text-ink">
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
          SECTION 6 — ABOUT YOUR COACH
          ============================================================ */}
      <section className="mx-[12px] lg:mx-[80px] mt-[64px] lg:mt-[110px] rounded-[28px] lg:rounded-[36px] bg-lavender/70 border border-lavender-border p-[24px] sm:p-[40px] lg:p-[72px] animate-fade-up">
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
            <span className="mt-[18px] rounded-full bg-beige-card border border-beige-border px-[18px] py-[8px] font-cursive text-[24px] leading-none text-ink">
              Hi, I’m Ambika · fellow seeker
            </span>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-[18px] text-left">
            <span className="font-cursive text-[32px] leading-none text-lavender-deep">
              About your coach
            </span>
            <h2 className="m-0 font-playfair text-[32px] lg:text-[46px] font-normal leading-[1.1] text-ink">
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
                href="/book"
                className="btn-3d-maroon animate-gold-shimmer inline-flex min-h-[52px] w-full sm:w-auto items-center justify-center rounded-full px-[30px] py-[15px] font-inter text-[13px] font-semibold uppercase tracking-[0.18em] text-white no-underline"
              >
                Book the 5-Week Course · ₹15,000
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-[52px] w-full sm:w-auto items-center justify-center rounded-full border-[1.5px] border-ink bg-white/80 px-[28px] py-[15px] font-inter text-[13px] font-semibold uppercase tracking-[0.18em] text-ink no-underline hover:bg-ink hover:text-cream transition-colors"
              >
                Read my full story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 7 — FAQ ACCORDION
          ============================================================ */}
      <section className="mx-auto max-w-[960px] px-[16px] lg:px-[40px] pt-[64px] lg:pt-[110px] animate-fade-up">
        <div className="flex flex-col items-start lg:items-center text-left lg:text-center gap-[10px] mb-[32px] lg:mb-[48px]">
          <span className="font-cursive text-[32px] leading-none text-lavender-deep">
            Common Questions
          </span>
          <h2 className="m-0 font-playfair text-[32px] lg:text-[48px] font-normal leading-[1.1] text-ink">
            Frequently Asked <em className="italic text-maroon">Questions</em>
          </h2>
        </div>

        <CoachingFaq />
      </section>

      {/* ============================================================
          SECTION 8 — "VOICES OF TRANSFORMATION"
          ============================================================ */}
      {showReviews && (
        <section className="px-[16px] lg:px-[80px] pt-[64px] lg:pt-[110px] animate-fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-[16px] mb-[32px] lg:mb-[48px]">
            <div className="flex flex-col gap-[8px]">
              <span className="font-cursive text-[32px] leading-none text-lavender-deep">
                Seekers’ words
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
            <div className="lg:col-span-6 flex flex-col justify-between gap-[18px] rounded-[24px] bg-beige-card/75 p-[28px] lg:p-[36px] border border-beige-border">
              <svg
                width="36"
                height="28"
                viewBox="0 0 36 28"
                fill="#8E1B25"
                aria-hidden="true"
              >
                <path d="M0 28V16C0 7 5 1.5 14 0l1.5 4C10 5.5 7.5 9 7.5 13H14v15H0zm20 0V16c0-9 5-14.5 14-16l1.5 4C30 5.5 27.5 9 27.5 13H34v15H20z" />
              </svg>
              <p className="m-0 font-playfair text-[22px] lg:text-[26px] leading-[1.38] text-ink">
                {firstWritten
                  ? firstWritten.written_review
                  : "[First seeker’s written review goes here — the Reviews page has none yet.]"}
              </p>
              <span className="font-inter text-[14px] text-muted">
                {firstWritten
                  ? `${firstWritten.name} · 5-Week LOA Course`
                  : "[Name] · 5-Week LOA Course"}
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

            <div className="lg:col-span-3 flex flex-col justify-between rounded-[24px] bg-lavender border border-lavender-border p-[28px]">
              <span className="font-inter text-[16px] leading-[1.6] text-body">
                {secondWritten
                  ? `“${secondWritten.written_review}”`
                  : "“[Short written review]”"}
              </span>
              <span className="font-inter text-[14px] text-lavender-deep">
                {secondWritten
                  ? `${secondWritten.name} · 5-Week LOA Course`
                  : "[Name] · 5-Week LOA Course"}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 9 — DIYA CLOSING CTA
          ============================================================ */}
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
          <h2 className="m-0 font-playfair text-[60px] font-normal leading-[1.04]">
            You are a powerful creator.
            <br />
            <em className="italic text-gold">Come see it for yourself.</em>
          </h2>
          <div className="mt-[8px] flex gap-[14px]">
            <Link
              href="/book"
              className="btn-3d-gold inline-flex min-h-[54px] items-center justify-center rounded-full px-[32px] py-[18px] font-inter text-[13px] font-semibold uppercase tracking-[0.18em] text-ink no-underline"
            >
              Book the 5-Week Course · ₹15,000
            </Link>
            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[54px] items-center justify-center rounded-full border-[1.5px] border-cream px-[28px] py-[17px] font-inter text-[13px] font-semibold uppercase tracking-[0.18em] text-cream no-underline hover:bg-cream hover:text-ink transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

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
          <h2 className="m-0 font-playfair text-[34px] font-normal leading-[1.08]">
            You are a powerful creator.{" "}
            <em className="italic text-gold">Come see it for yourself.</em>
          </h2>
          <Link
            href="/book"
            className="btn-3d-gold mt-[4px] inline-flex min-h-[52px] w-full items-center justify-center rounded-full p-[16px] text-center font-inter text-[13px] font-semibold uppercase tracking-[0.18em] text-ink no-underline"
          >
            Book the 5-Week Course · ₹15,000
          </Link>
        </div>
      </section>
    </main>
  );
}
