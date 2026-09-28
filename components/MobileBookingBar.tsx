"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { getWhatsAppUrl } from "@/lib/site";

export function MobileBookingBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/book")) {
      setVisible(false);
      return;
    }

    const checkScroll = () => {
      const heroCtaEl = document.getElementById("hero-cta-sentinel");
      if (heroCtaEl) {
        const rect = heroCtaEl.getBoundingClientRect();
        setVisible(rect.bottom < 0);
      } else {
        // On inner pages without the hero sentinel, show after scrolling slightly or immediately
        setVisible(window.scrollY > 120);
      }
    };

    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [pathname]);

  if (pathname?.startsWith("/book")) {
    return null;
  }

  const whatsappHref = getWhatsAppUrl(
    "Hi Ambika, I'd love to ask a question before booking my path."
  );

  return (
    <div
      aria-hidden={!visible}
      className={`fixed left-[12px] right-[12px] bottom-[max(12px,env(safe-area-inset-bottom))] z-40 flex lg:hidden items-center justify-between rounded-[22px] bg-white py-[10px] pr-[10px] pl-[18px] shadow-sticky-bar transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-6 opacity-0 pointer-events-none"
      }`}
    >
      <span className="flex flex-col">
        <span className="text-[12px] text-muted">Whole path from</span>
        <span className="font-serif text-[22px] leading-tight text-ink">
          ₹12,500
        </span>
      </span>
      <div className="flex items-center gap-[8px]">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          tabIndex={visible ? 0 : -1}
          className="flex h-[48px] w-[48px] items-center justify-center rounded-full border-[1.5px] border-line text-maroon hover:border-maroon"
        >
          <WhatsAppIcon size={20} />
        </a>
        <Link
          href="/book"
          tabIndex={visible ? 0 : -1}
          className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-maroon px-[22px] py-[14px] text-[15px] font-medium text-white no-underline hover:bg-maroon-dark"
        >
          Book now
        </Link>
      </div>
    </div>
  );
}
