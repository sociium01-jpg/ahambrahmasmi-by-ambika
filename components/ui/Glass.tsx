import React from "react";
import Link from "next/link";

export interface PriceCardProps {
  id?: string;
  variant?: "dark" | "featured";
  eyebrow: string;
  badgeText: string;
  title: string;
  subtitle?: string;
  priceLabel: string;
  struckPriceLabel?: string;
  priceNote?: string;
  bestFor?: string;
  items: string[];
  ctaLabel: string;
  ctaHref: string;
  className?: string;
}

export function PriceCard({
  id,
  variant = "dark",
  eyebrow,
  badgeText,
  title,
  subtitle,
  priceLabel,
  struckPriceLabel,
  priceNote,
  bestFor,
  items,
  ctaLabel,
  ctaHref,
  className = "",
}: PriceCardProps) {
  const isFeatured = variant === "featured";

  return (
    <article
      id={id}
      style={{
        background: isFeatured
          ? "linear-gradient(135deg, #9E1F2B 0%, #5E0F17 100%)"
          : "linear-gradient(135deg, #4A141B 0%, #1E0A0D 100%)",
        border: isFeatured
          ? "1px solid rgba(231, 184, 90, 0.45)"
          : "1px solid rgba(255, 255, 255, 0.10)",
      }}
      className={`relative isolate overflow-hidden rounded-[32px] p-[28px] lg:p-[40px] text-cream flex flex-col gap-[20px] transition-all duration-300 hover:-translate-y-1 ${
        isFeatured
          ? "shadow-price-featured hover:shadow-price-featured-hover"
          : "shadow-price-dark hover:shadow-price-dark-hover"
      } ${className}`}
    >
      {/* Decorative top-right glow circle */}
      <div
        aria-hidden="true"
        style={{
          background: "rgba(255, 255, 255, 0.06)",
          filter: "blur(40px)",
        }}
        className="pointer-events-none absolute -top-[80px] -right-[80px] -z-10 h-[192px] w-[192px] rounded-full"
      />

      {/* Top row: Eyebrow + Badge pill */}
      <div className="flex items-center justify-between gap-[12px]">
        <span className="font-inter text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
          {eyebrow}
        </span>
        <span
          className={`rounded-full px-[14px] py-[6px] font-inter text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.16em] ${
            isFeatured ? "bg-gold text-ink" : "bg-badge text-wine"
          }`}
        >
          {badgeText}
        </span>
      </div>

      {/* Title & Subtitle */}
      <div className="flex flex-col gap-[6px]">
        <h3 className="m-0 font-playfair text-[26px] lg:text-[32px] font-normal leading-[1.18] text-white">
          {title}
        </h3>
        {subtitle && (
          <p className="m-0 font-inter text-[14px] text-white/75 leading-[1.5]">
            {subtitle}
          </p>
        )}
      </div>

      {/* Price block */}
      <div className="flex flex-col gap-[4px] border-y border-white/[0.14] py-[18px]">
        <div className="flex items-baseline gap-[14px]">
          <span className="font-playfair text-[46px] lg:text-[56px] leading-none text-white">
            {priceLabel}
          </span>
          {struckPriceLabel && (
            <span className="font-inter text-[17px] text-white/50 line-through">
              {struckPriceLabel}
            </span>
          )}
        </div>
        {priceNote && (
          <span className="font-inter text-[13px] text-gold/90">
            {priceNote}
          </span>
        )}
      </div>

      {/* Best For note */}
      {bestFor && (
        <p className="m-0 font-cormorant text-[20px] italic leading-[1.4] text-badge">
          {bestFor}
        </p>
      )}

      {/* List items starting with gold "→" */}
      <ul className="m-0 flex flex-grow flex-col gap-[12px] p-0 list-none font-inter text-[14px] lg:text-[15px] leading-[1.55] text-white/90">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-[10px]">
            <span aria-hidden="true" className="font-bold text-gold shrink-0">
              →
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Link
        href={ctaHref}
        className={`mt-[8px] inline-flex min-h-[50px] w-full items-center justify-center rounded-full px-[28px] py-[16px] text-center font-inter text-[13px] font-semibold uppercase tracking-[0.2em] no-underline transition-all ${
          isFeatured
            ? "bg-gold text-ink hover:brightness-95"
            : "border border-white/25 bg-white/10 text-white hover:bg-white hover:text-ink"
        }`}
      >
        {ctaLabel}
      </Link>
    </article>
  );
}

export function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`glass-card-surface rounded-[24px] p-[24px] lg:p-[48px] ${className}`}
    >
      {children}
    </div>
  );
}

export function GlassPill({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`glass-pill-surface inline-flex items-center justify-center rounded-full px-[24px] py-[9px] lg:px-[32px] lg:py-[10px] font-inter text-[11px] font-bold uppercase tracking-[0.25em] text-white ${className}`}
    >
      {children}
    </span>
  );
}

export function GlassTile({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`glass-tile-surface rounded-[16px] lg:rounded-[18px] p-[22px] lg:p-[28px] ${className}`}
    >
      {children}
    </div>
  );
}
