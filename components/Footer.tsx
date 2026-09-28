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
  getEmailHref,
  getWhatsAppUrl,
} from "@/lib/site";

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/book")) {
    return null;
  }

  const whatsappHref = getWhatsAppUrl();
  const emailHref = getEmailHref();

  return (
    <footer className="mx-auto w-full max-w-[1440px]">
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
