import React from "react";
import Link from "next/link";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";

interface LogoProps {
  variant?: "nav" | "booking-sidebar" | "booking-mobile" | "footer-desktop";
  href?: string;
  className?: string;
}

export function Logo({
  variant = "nav",
  href = "/",
  className = "",
}: LogoProps) {
  if (variant === "booking-sidebar") {
    return (
      <Link
        href={href}
        className={`inline-flex items-center gap-[14px] no-underline ${className}`}
      >
        <span className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
          <AnimatedLogo variant="circle" size={52} />
        </span>
        <span className="flex flex-col gap-[4px]">
          <span className="font-serif text-[26px] leading-none text-cream">
            Ahambrahmasmi
          </span>
          <span className="font-sans text-[12px] uppercase tracking-[3px] text-gold">
            Book your path
          </span>
        </span>
      </Link>
    );
  }

  if (variant === "booking-mobile") {
    return (
      <span className={`inline-flex items-center gap-[8px] ${className}`}>
        <span className="relative flex h-[32px] w-[32px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
          <AnimatedLogo variant="circle" size={32} />
        </span>
        <span className="font-serif text-[18px] text-ink">Book your path</span>
      </span>
    );
  }

  if (variant === "footer-desktop") {
    return (
      <Link
        href={href}
        className={`inline-flex items-center gap-[16px] no-underline ${className}`}
      >
        <AnimatedLogo variant="full" size={116} className="shrink-0" />
        <span className="flex flex-col gap-[2px]">
          <span className="font-serif text-[22px] leading-tight text-ink">
            Ahambrahmasmi
          </span>
          <span className="font-sans text-[13px] text-muted">
            A journey of self discovery
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-[10px] lg:gap-[14px] no-underline ${className}`}
    >
      <span className="relative flex h-[44px] w-[44px] lg:h-[60px] lg:w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
        <AnimatedLogo variant="circle" size={60} />
      </span>
      <span className="flex flex-col">
        <span className="font-serif text-[19px] lg:text-[24px] leading-tight text-ink">
          Ahambrahmasmi
        </span>
        <span className="font-sans text-[10px] lg:text-[12px] uppercase tracking-[2px] text-gold-text">
          by Ambika
        </span>
      </span>
    </Link>
  );
}
