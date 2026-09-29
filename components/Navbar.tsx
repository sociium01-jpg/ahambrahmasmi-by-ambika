"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { EMAIL, getEmailHref } from "@/lib/site";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/course", label: "The Course" },
  { href: "/coaching", label: "1:1 Coaching" },
  { href: "/reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
  { href: "/space", label: "Seeker login" },
];

export function Navbar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [drawerOpen]);

  if (pathname?.startsWith("/book")) {
    return null;
  }

  const isCoachingPage = pathname?.startsWith("/coaching");
  const emailHref = getEmailHref(
    "Enquiry — Ahambrahmasmi 5-Week 1-to-1 Coaching"
  );

  return (
    <>
      <header
        className={`w-full ${
          isCoachingPage ? "bg-white border-b border-divider" : "bg-cream"
        }`}
      >
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex h-[68px] lg:h-[96px] w-full max-w-[1440px] items-center justify-between px-[16px] lg:px-[80px] box-border"
        >
          <Logo variant="nav" href="/" />

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-[26px] text-[15px]">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : link.href.startsWith("#")
                  ? false
                  : pathname?.startsWith(link.href);

              if (link.href.startsWith("#")) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="min-h-[44px] inline-flex items-center text-ink hover:text-maroon no-underline transition-colors"
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`no-underline transition-colors min-h-[44px] inline-flex items-center ${
                    isActive
                      ? "text-maroon font-medium"
                      : "text-ink hover:text-maroon"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-[14px]">
            <a
              href={emailHref}
              aria-label={`Email Ambika at ${EMAIL}`}
              title={EMAIL}
              className="flex h-[48px] w-[48px] items-center justify-center rounded-full border-[1.5px] border-line text-maroon hover:border-maroon hover:text-maroon-dark transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
            <Link
              href="/book"
              className="btn-3d-maroon inline-flex min-h-[48px] items-center justify-center rounded-full bg-maroon px-[26px] py-[14px] text-[15px] font-medium text-white no-underline hover:bg-maroon-dark transition-colors"
            >
              Book now
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
            className="flex lg:hidden h-[44px] w-[44px] items-center justify-center rounded-full border-[1.5px] border-line bg-white text-ink cursor-pointer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h10" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile Full-Screen Cream Drawer */}
      {drawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-cream px-[16px] pb-[32px] pt-[12px] lg:hidden"
        >
          <div className="flex h-[44px] items-center justify-between">
            <Logo variant="nav" href="/" />
            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Close menu"
              onClick={() => setDrawerOpen(false)}
              className="flex h-[44px] w-[44px] items-center justify-center rounded-full border-[1.5px] border-line bg-white text-ink cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav
            aria-label="Mobile navigation"
            className="flex flex-col gap-[6px] my-auto py-[20px]"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : link.href.startsWith("#")
                  ? false
                  : pathname?.startsWith(link.href);

              if (link.href.startsWith("#")) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setDrawerOpen(false)}
                    className="flex min-h-[48px] items-center border-b border-divider font-serif text-[26px] text-ink no-underline"
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  className={`flex min-h-[48px] items-center border-b border-divider font-serif text-[26px] no-underline ${
                    isActive ? "text-maroon" : "text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col gap-[12px]">
            <Link
              href="/book"
              onClick={() => setDrawerOpen(false)}
              className="btn-3d-maroon flex min-h-[54px] w-full items-center justify-center rounded-full bg-maroon px-[24px] py-[16px] text-center text-[16px] font-medium text-white no-underline hover:bg-maroon-dark"
            >
              Book now
            </Link>
            <a
              href={emailHref}
              className="flex min-h-[50px] w-full items-center justify-center gap-[10px] rounded-full border-[1.5px] border-line bg-white px-[20px] py-[13px] text-[15px] font-medium text-maroon no-underline"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>Email Ambika ({EMAIL})</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
