import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";
import { getWhatsAppUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Seeker's space",
  description:
    "Access your pre-call videos, practice pages, and meditations for Ahambrahmasmi by Ambika.",
};

export default function SeekerSpacePage() {
  const whatsappAccessUrl = getWhatsAppUrl(
    "Hi Ambika, I've booked my path and would love the link to my seeker's space and pre-call videos."
  );

  return (
    <main className="mx-auto w-full max-w-[1440px] px-[16px] lg:px-[80px] pt-[32px] lg:pt-[72px]">
      <section className="mx-auto max-w-[760px] rounded-[28px] lg:rounded-[36px] bg-white p-[28px] sm:p-[48px] lg:p-[64px] border border-divider shadow-mobile-stat flex flex-col items-start gap-[22px] animate-fade-up">
        <div className="flex w-full flex-wrap items-center justify-between gap-[16px]">
          <div className="flex items-center gap-[14px]">
            <Image
              src="/images/ambika.png"
              alt="Ambika"
              width={60}
              height={60}
              className="h-[60px] w-[60px] rounded-full border-2 border-gold object-cover"
            />
            <div className="flex flex-col gap-[2px]">
              <Eyebrow>Seeker login</Eyebrow>
              <span className="font-serif text-[22px] text-ink">
                Your private seeker’s space
              </span>
            </div>
          </div>
          <AnimatedLogo variant="full" size={110} />
        </div>

        <h1 className="m-0 font-serif text-[36px] lg:text-[52px] font-normal leading-[1.06] text-ink">
          Welcome to <em className="italic text-maroon">your space.</em>
        </h1>

        <p className="m-0 text-[16px] lg:text-[18px] font-light leading-[1.7] text-body">
          Once you book your path, Ambika personally messages you on WhatsApp
          with the link to watch <em>The Secret</em>, your Phase 1 preparation
          videos, and your personal observation &amp; practice booklet.
        </p>

        <div className="w-full rounded-[20px] bg-sand p-[22px] flex flex-col gap-[12px]">
          <span className="font-serif text-[22px] text-ink">
            Already booked your path?
          </span>
          <p className="m-0 text-[15px] leading-[1.6] text-body">
            Message Ambika on WhatsApp from your registered number to receive
            your private video links and schedule your next 1-to-1 session.
          </p>
          <div className="flex flex-wrap gap-[12px] pt-[4px]">
            <a
              href={whatsappAccessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-[10px] rounded-full bg-maroon px-[26px] py-[13px] text-[15px] font-medium text-white no-underline hover:bg-maroon-dark transition-colors"
            >
              <WhatsAppIcon size={18} />
              <span>Request my video links on WhatsApp</span>
            </a>
            <Link
              href="/book"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border-[1.5px] border-maroon bg-white px-[24px] py-[13px] text-[15px] font-medium text-maroon no-underline hover:bg-maroon hover:text-white transition-colors"
            >
              Book a course first
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
