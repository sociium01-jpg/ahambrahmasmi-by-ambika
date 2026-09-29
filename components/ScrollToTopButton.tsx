"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTopButton() {
  const pathname = usePathname() || "/";
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const updateScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const pct = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setProgress(pct);
      setVisible(scrollTop > 320);
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateScroll);
      }
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG Ring Geometry (size 52x52, radius 22)
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  // On /book, dock is hidden so button sits lower on mobile
  const isBookRoute = pathname.startsWith("/book");

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed right-[16px] lg:right-[32px] ${
        isBookRoute
          ? "bottom-[24px]"
          : "bottom-[86px] lg:bottom-[32px]"
      } z-40 flex h-[52px] w-[52px] items-center justify-center rounded-full btn-3d-orb text-gold cursor-pointer border-0 transition-all duration-300 ${
        visible
          ? "translate-y-0 scale-100 opacity-100 pointer-events-auto"
          : "translate-y-4 scale-75 opacity-0 pointer-events-none"
      }`}
    >
      {/* Live Gold Circular Scroll-Progress Ring */}
      <svg
        width="52"
        height="52"
        viewBox="0 0 52 52"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -rotate-90"
      >
        {/* Subtle Track Ring */}
        <circle
          cx="26"
          cy="26"
          r={radius}
          fill="none"
          stroke="rgba(231, 184, 90, 0.2)"
          strokeWidth="2.5"
        />
        {/* Animated Sacred Gold Progress Ring */}
        <circle
          cx="26"
          cy="26"
          r={radius}
          fill="none"
          stroke="#E7B85A"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 90ms linear",
            filter: "drop-shadow(0 0 4px rgba(231, 184, 90, 0.55))",
          }}
        />
      </svg>

      {/* Upward Arrow Icon */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
