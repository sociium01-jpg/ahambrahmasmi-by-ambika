"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";
import {
  EMAIL,
  INSTAGRAM,
  INSTAGRAM_HANDLE,
  WHATSAPP_NUMBER,
  getEmailHref,
  getWhatsAppUrl,
} from "@/lib/site";

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/book")) {
    return null;
  }

  const isCoachingPage = pathname?.startsWith("/coaching");
  const whatsappHref = getWhatsAppUrl();
  const emailHref = getEmailHref();
  const displayPhone = `+${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2)}`;

  if (isCoachingPage) {
    return (
      <footer
        id="contact"
        className="mt-[80px] lg:mt-[120px] w-full bg-plum-night text-cream"
      >
        <div className="mx-auto max-w-[1440px] px-[16px] pt-[56px] pb-[120px] lg:px-[80px] lg:py-[80px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-[36px] lg:gap-[48px]">
            {/* Col 1: Brand + Animated Logo */}
            <div className="lg:col-span-4 flex flex-col items-start gap-[16px]">
              <Link
                href="/"
                className="inline-flex items-center gap-[14px] no-underline"
              >
                <span className="flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full bg-white">
                  <AnimatedLogo variant="circle" size={56} />
                </span>
                <span className="flex flex-col">
                  <span className="font-playfair text-[24px] text-white">
                    Ahambrahmasmi
                  </span>
                  <span className="font-cormorant text-[18px] italic text-gold">
                    by Ambika · A journey of self discovery
                  </span>
                </span>
              </Link>
              <p className="m-0 font-inter text-[14px] font-light leading-[1.65] text-white/75 max-w-[320px]">
                Intimate, one-to-one Law of Attraction coaching. Everything
                happens in perfect Divine timing.
              </p>
            </div>

            {/* Col 2: Explore */}
            <div className="lg:col-span-3 flex flex-col gap-[10px]">
              <span className="font-inter text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
                Explore
              </span>
              <Link
                href="/"
                className="font-inter text-[14px] text-white/80 hover:text-gold no-underline py-[2px]"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="font-inter text-[14px] text-white/80 hover:text-gold no-underline py-[2px]"
              >
                About Ambika
              </Link>
              <Link
                href="/coaching"
                className="font-inter text-[14px] text-white/80 hover:text-gold no-underline py-[2px]"
              >
                1:1 Coaching
              </Link>
              <Link
                href="/reviews"
                className="font-inter text-[14px] text-white/80 hover:text-gold no-underline py-[2px]"
              >
                Seekers’ words
              </Link>
            </div>

            {/* Col 3: Courses */}
            <div className="lg:col-span-3 flex flex-col gap-[10px]">
              <span className="font-inter text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
                Programmes
              </span>
              <Link
                href="/book?course=whole"
                className="font-inter text-[14px] text-white/80 hover:text-gold no-underline py-[2px]"
              >
                The Whole Path · ₹12,500
              </Link>
              <Link
                href="/book?course=intro"
                className="font-inter text-[14px] text-white/80 hover:text-gold no-underline py-[2px]"
              >
                Introduction to LOA · ₹8,500
              </Link>
              <Link
                href="/book?course=tools"
                className="font-inter text-[14px] text-white/80 hover:text-gold no-underline py-[2px]"
              >
                Tools for Emotional Mastery · ₹5,000
              </Link>
              <Link
                href="/space"
                className="font-inter text-[14px] text-white/80 hover:text-gold no-underline py-[2px]"
              >
                Seeker login
              </Link>
            </div>

            {/* Col 4: Direct Contact */}
            <div className="lg:col-span-2 flex flex-col gap-[10px]">
              <span className="font-inter text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
                Connect
              </span>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-[14px] text-white/80 hover:text-gold no-underline py-[2px]"
              >
                WhatsApp ({displayPhone})
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-[14px] text-white/80 hover:text-gold no-underline py-[2px]"
              >
                {INSTAGRAM_HANDLE}
              </a>
              <a
                href={emailHref}
                className="font-inter text-[14px] text-white/80 hover:text-gold no-underline py-[2px] break-all"
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer id="contact" className="mx-auto w-full max-w-[1440px]">
      {/* Desktop Footer (with resized animated logo) */}
      <div className="hidden lg:flex items-center justify-between px-[80px] py-[64px]">
        <Logo variant="footer-desktop" href="/" />
        <div className="flex items-center gap-[32px] text-[15px]">
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center text-maroon hover:text-maroon-dark no-underline"
          >
            {INSTAGRAM_HANDLE}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center text-maroon hover:text-maroon-dark no-underline"
          >
            WhatsApp
          </a>
          <a
            href={emailHref}
            className="min-h-[44px] inline-flex items-center text-maroon hover:text-maroon-dark no-underline"
          >
            {EMAIL}
          </a>
          <Link
            href="/reviews"
            className="min-h-[44px] inline-flex items-center text-maroon hover:text-maroon-dark no-underline"
          >
            Reviews
          </Link>
        </div>
      </div>

      {/* Mobile Footer (with resized animated logo + tagline) */}
      <div className="flex lg:hidden flex-col items-center gap-[16px] px-[16px] pt-[40px] pb-[120px] text-center">
        <Link href="/" aria-label="Ahambrahmasmi home" className="inline-block">
          <AnimatedLogo variant="full" size={140} />
        </Link>
        <span className="text-[14px] text-muted">
          Everything happens in perfect Divine timing.
        </span>
        <div className="flex flex-wrap justify-center gap-[20px] text-[14px]">
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center text-maroon hover:text-maroon-dark no-underline"
          >
            Instagram
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center text-maroon hover:text-maroon-dark no-underline"
          >
            WhatsApp
          </a>
          <a
            href={emailHref}
            className="min-h-[44px] inline-flex items-center text-maroon hover:text-maroon-dark no-underline"
          >
            Email
          </a>
          <Link
            href="/reviews"
            className="min-h-[44px] inline-flex items-center text-maroon hover:text-maroon-dark no-underline"
          >
            Reviews
          </Link>
        </div>
      </div>
    </footer>
  );
}
