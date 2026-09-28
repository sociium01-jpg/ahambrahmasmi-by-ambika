import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getWhatsAppUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About me & Intention with seekers",
  description:
    "Ambika Mohan's journey of self-discovery and her intention with seekers of the Law of Attraction.",
};

const SIX_OUTCOMES = [
  {
    num: "01",
    text: "An in-depth understanding of how YOU create your day-to-day life experience.",
  },
  {
    num: "02",
    text: "An understanding of the Nature of Reality / Thought, and how Thoughts become Things.",
  },
  {
    num: "03",
    text: "Learning to connect with your Higher-Self / Inner Being / Universe — resulting in a happier, clearer version of you.",
  },
  {
    num: "04",
    text: "A blueprint to creating a more fulfilling life experience, with practical tools and techniques of alignment with your Higher-Self.",
  },
  {
    num: "05",
    text: "A greater zest for Life, and more Clarity in general.",
  },
  {
    num: "06",
    text: "A certain peace that comes with understanding this system of Life — putting things into perspective even in moments of Contrast. Contrast is part of the creative process.",
  },
];

export default function AboutPage() {
  const whatsappUrl = getWhatsAppUrl(
    "Hi Ambika, I just read your story on Ahambrahmasmi and would love to connect."
  );

  return (
    <main className="mx-auto w-full max-w-[1440px] px-[16px] lg:px-[80px] pt-[24px] lg:pt-[56px]">
      {/* ============================================================
          PART 1 — ABOUT ME (Word-for-word from sunny-mist-wood-sky.grok.me/)
          ============================================================ */}
      <section className="mx-auto max-w-[1120px] rounded-[28px] lg:rounded-[36px] bg-sand p-[24px] sm:p-[40px] lg:p-[72px] animate-fade-up">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-[32px] lg:gap-[56px]">
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div className="relative h-[220px] w-[220px] sm:h-[260px] sm:w-[260px] lg:h-[320px] lg:w-[320px] overflow-hidden rounded-full border-[10px] border-cream bg-cream shadow-floating">
              <Image
                src="/images/ambika.png"
                alt="Ambika"
                width={320}
                height={320}
                priority
                className="h-full w-full object-cover"
              />
            </div>
            <span className="mt-[20px] rounded-full bg-gold px-[18px] py-[8px] text-[14px] font-medium text-ink">
              Ambika · fellow seeker
            </span>
            <span className="mt-[8px] font-serif text-[20px] italic text-maroon">
              A journey of self discovery
            </span>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-[20px]">
            <Eyebrow>About me</Eyebrow>
            <h1 className="m-0 font-serif text-[38px] lg:text-[56px] font-normal leading-[1.06] text-ink">
              I didn’t begin this journey with all the answers. I began with{" "}
              <em className="italic text-maroon">questions.</em>
            </h1>

            <div className="flex flex-col gap-[20px] text-[17px] lg:text-[19px] font-light leading-[1.75] text-body">
              <p className="m-0">
                I didn’t begin this journey with all the answers. I began with{" "}
                <em className="font-serif italic text-maroon">questions</em>.
                Why does life unfold the way it does? Why do some experiences
                bring us joy while others challenge us? And{" "}
                <em className="font-serif italic text-maroon">
                  who are we beneath it all
                </em>
                ? What started as a search for a better way to create my life
                slowly became a journey of{" "}
                <em className="font-serif italic text-maroon">
                  discovering myself
                </em>
                . Through the teachings of Abraham Hicks and, more importantly,
                through observing my own life, I began to see that life wasn’t
                simply happening to me. It was being{" "}
                <em className="font-serif italic text-maroon">
                  experienced through me
                </em>
                —through my{" "}
                <em className="font-serif italic text-maroon">
                  thoughts, emotions, beliefs and perceptions
                </em>
                . And somewhere along that journey,{" "}
                <em className="font-serif italic text-maroon">
                  Aham Brahmasmi
                </em>{" "}
                stopped being a phrase and became a feeling, a knowing:{" "}
                <em className="font-serif italic text-maroon">I am the Core</em>{" "}
                from which my life experience emerges.
              </p>

              <p className="m-0">
                Today, I share from that ever-unfolding journey—not as someone
                who has found the final answer, but as a{" "}
                <em className="font-serif italic text-maroon">fellow seeker</em>{" "}
                who has learned to look at life with deeper curiosity and
                wonder. Because perhaps the answers we spend our lives searching
                for are not somewhere outside us. Perhaps{" "}
                <em className="font-serif italic text-maroon">
                  life itself is the mirror
                </em>
                , and every experience is an invitation to{" "}
                <em className="font-serif italic text-maroon">
                  know ourselves a little more deeply
                </em>
                . This is{" "}
                <em className="font-serif italic text-maroon">
                  Aham Brahmasmi
                </em>{" "}
                by Ambika—a journey of{" "}
                <em className="font-serif italic text-maroon">
                  Self-Discovery
                </em>
                , conscious living, and{" "}
                <em className="font-serif italic text-maroon">
                  remembering who we truly are
                </em>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PART 2 — INTENTION WITH SEEKERS (from sunny-mist-wood-sky.grok.me/intention)
          ============================================================ */}
      <section className="mx-auto mt-[64px] lg:mt-[100px] max-w-[920px] flex flex-col gap-[28px] animate-fade-up">
        <div className="flex flex-col gap-[12px]">
          <Eyebrow>Intention with seekers</Eyebrow>
          <h2 className="m-0 font-serif text-[34px] lg:text-[52px] font-normal leading-[1.08] text-ink">
            Every rendezvous is a{" "}
            <em className="italic text-maroon">perfect match.</em>
          </h2>
        </div>

        <div className="flex flex-col gap-[20px] text-[17px] lg:text-[19px] font-light leading-[1.75] text-body">
          <p className="m-0">
            I’m not one of those coaches who teaches you to “manifest your
            dreams overnight” nor can I promise you instant gratification. I
            live and breathe this philosophy and therefore trust that every
            rendezvous is a perfect match created by the Universe as an answer
            to whatever it is that both parties are seeking.
          </p>
          <p className="m-0">
            The one who’s seeking may or may not be able to incorporate the
            principles immediately, as it depends on what lesson one’s soul /
            higher-self is seeking to learn in this moment &amp; how willing one
            is to take the time &amp; effort to do the inner work. However, I
            believe that once the seed is sown, he/she will connect with it at
            some point in life. And I believe that everything that happens in
            life — the good, the bad, the ugly — is all adding value to one’s
            journey and is leading us all to clarity. So everything that
            happens, happens in perfect Divine timing.
          </p>
        </div>
      </section>

      {/* ============================================================
          PART 3 — BHAGAVAD GITA QUOTE BAND
          ============================================================ */}
      <section className="relative mx-auto mt-[56px] lg:mt-[80px] h-[360px] lg:h-[440px] max-w-[1120px] overflow-hidden rounded-[28px] lg:rounded-[36px] animate-fade-up">
        <Image
          src="/images/quote-sky.jpg"
          alt="Calm sea under a pink and blue sky"
          fill
          sizes="(max-width: 1024px) 100vw, 1120px"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#2B1B1B]/45 lg:bg-[#2B1B1B]/[0.42]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[16px] px-[24px] lg:px-[120px] text-center text-white">
          <span className="text-[11px] lg:text-[13px] font-medium uppercase tracking-[2px] lg:tracking-[3px] text-[#F2D08A]">
            From the Bhagavad Gita
          </span>
          <p className="m-0 font-serif text-[24px] lg:text-[40px] italic leading-[1.3]">
            Whatever happens, happens for the best.
            <br />
            Whatever is happening is also happening for the best.
            <br />
            Whatever will happen will also happen for the best.
          </p>
          <span className="text-[14px] lg:text-[16px] text-[#F4E8E2]">
            Everything happens in perfect Divine timing.
          </span>
        </div>
      </section>

      {/* ============================================================
          PART 4 — SIX NUMBERED OUTCOMES
          ============================================================ */}
      <section className="mx-auto mt-[64px] lg:mt-[100px] max-w-[1120px] rounded-[28px] lg:rounded-[36px] bg-white p-[24px] sm:p-[40px] lg:p-[64px] animate-fade-up">
        <div className="flex flex-col gap-[12px]">
          <Eyebrow>Outcomes</Eyebrow>
          <h2 className="m-0 font-serif text-[32px] lg:text-[48px] font-normal leading-[1.1] text-ink">
            What I wish to accomplish through what I teach
          </h2>
        </div>

        <ol className="mt-[32px] grid grid-cols-1 md:grid-cols-2 gap-[20px] lg:gap-[24px] list-none p-0 m-0">
          {SIX_OUTCOMES.map((item) => (
            <li
              key={item.num}
              className="flex gap-[18px] rounded-[22px] bg-cream p-[24px] items-start"
            >
              <span className="font-serif text-[36px] leading-none text-maroon shrink-0">
                {item.num}
              </span>
              <span className="text-[16px] lg:text-[17px] leading-[1.6] text-body">
                {item.text}
              </span>
            </li>
          ))}
        </ol>

        <blockquote className="m-0 mt-[40px] rounded-[24px] bg-sand p-[28px] lg:p-[36px] font-serif text-[20px] lg:text-[24px] italic leading-[1.5] text-ink">
          My desire is to teach each and every one of my students to empower
          themselves by learning how to directly establish a connection with the
          Universe — so that you never need to come back to me with questions.
          (Although I would be happy to guide you to RECEIVE your own answers
          from The Universe.)
        </blockquote>

        <div className="mt-[36px] flex flex-wrap items-center justify-between gap-[16px] border-t border-divider pt-[28px]">
          <span className="text-[14px] uppercase tracking-[2px] text-gold-text font-medium">
            Everything happens in perfect Divine timing
          </span>
          <div className="flex flex-wrap gap-[12px]">
            <Link
              href="/course"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border-[1.5px] border-maroon px-[24px] py-[13px] text-[15px] font-medium text-maroon no-underline hover:bg-maroon hover:text-white transition-colors"
            >
              Explore the courses
            </Link>
            <Link
              href="/book"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-maroon px-[28px] py-[14px] text-[15px] font-medium text-white no-underline hover:bg-maroon-dark transition-colors"
            >
              Book your path
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border-[1.5px] border-line bg-cream px-[22px] py-[13px] text-[15px] font-medium text-ink no-underline hover:border-maroon"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
