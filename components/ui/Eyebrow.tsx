import React from "react";

interface EyebrowProps {
  children: React.ReactNode;
  tone?: "default" | "gold" | "light-gold";
  className?: string;
}

export function Eyebrow({
  children,
  tone = "default",
  className = "",
}: EyebrowProps) {
  const toneClass =
    tone === "gold"
      ? "text-gold"
      : tone === "light-gold"
      ? "text-[#F2D08A]"
      : "text-gold-text";

  return (
    <span
      className={`font-sans font-medium uppercase text-[11px] tracking-[2px] lg:text-[13px] lg:tracking-[3px] ${toneClass} ${className}`}
    >
      {children}
    </span>
  );
}
