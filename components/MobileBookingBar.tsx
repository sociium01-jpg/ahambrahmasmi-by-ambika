"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DockItem {
  label: string;
  href: string;
  match: (pathname: string) => boolean;
  icon: (active: boolean) => React.ReactNode;
}

const DOCK_ITEMS: DockItem[] = [
  {
    label: "Home",
    href: "/",
    match: (p) => p === "/",
    icon: (active) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={active ? "2" : "1.75"}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1v-9.5z" />
      </svg>
    ),
  },
  {
    label: "Coaching",
    href: "/coaching",
    match: (p) => p.startsWith("/coaching") || p.startsWith("/investment"),
    icon: (active) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={active ? "2" : "1.75"}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
      </svg>
    ),
  },
  {
    label: "Courses",
    href: "/course",
    match: (p) => p.startsWith("/course"),
    icon: (active) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={active ? "2" : "1.75"}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 4h7a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H2V4z" />
        <path d="M22 4h-7a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H22V4z" />
      </svg>
    ),
  },
  {
    label: "Reviews",
    href: "/reviews",
    match: (p) => p.startsWith("/reviews"),
    icon: (active) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={active ? "2" : "1.75"}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

export function MobileBookingBar() {
  const pathname = usePathname() || "/";

  // Hide on /book so the 3-step checkout button has full focus
  if (pathname.startsWith("/book")) {
    return null;
  }

  return (
    <nav
      aria-label="Mobile and tablet quick navigation dock"
      className="fixed left-1/2 -translate-x-1/2 bottom-[max(12px,env(safe-area-inset-bottom))] z-40 w-[calc(100%-24px)] max-w-[520px] lg:hidden app-dock-glass rounded-[28px] p-[7px] flex items-center justify-between gap-[4px]"
    >
      <div className="flex flex-1 items-center justify-around">
        {DOCK_ITEMS.map((item) => {
          const active = item.match(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`relative flex min-h-[48px] min-w-[56px] sm:min-w-[68px] flex-col items-center justify-center gap-[3px] rounded-[20px] px-[8px] py-[6px] no-underline transition-all duration-200 ${
                active
                  ? "bg-maroon/10 text-maroon font-semibold"
                  : "text-muted hover:text-ink active:scale-95"
              }`}
            >
              {item.icon(active)}
              <span className="font-inter text-[10px] sm:text-[11px] leading-none tracking-[0.02em]">
                {item.label}
              </span>
              {active && (
                <span
                  aria-hidden="true"
                  className="absolute top-[5px] right-[12px] h-[5px] w-[5px] rounded-full bg-gold shadow-[0_0_6px_#E7B85A]"
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Tactile 3D Book CTA */}
      <Link
        href="/book"
        className="btn-3d-maroon animate-gold-shimmer shrink-0 inline-flex min-h-[46px] items-center justify-center gap-[6px] rounded-[20px] px-[16px] sm:px-[20px] py-[10px] font-inter text-[13px] sm:text-[14px] font-semibold text-white no-underline"
      >
        <span>Book</span>
        <span className="rounded-full bg-gold/25 px-[7px] py-[2px] text-[11px] font-bold text-[#F1DDB0]">
          ₹15k
        </span>
      </Link>
    </nav>
  );
}
