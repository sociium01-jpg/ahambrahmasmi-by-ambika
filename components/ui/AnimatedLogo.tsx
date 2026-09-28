import React from "react";

interface AnimatedLogoProps {
  variant?: "full" | "circle";
  size?: number;
  className?: string;
}

export function AnimatedLogo({
  variant = "full",
  size = 160,
  className = "",
}: AnimatedLogoProps) {
  if (variant === "circle") {
    return (
      <video
        src="/images/logo-animation-circle.mp4"
        poster="/images/logo.png"
        autoPlay
        loop
        muted
        playsInline
        width={size}
        height={size}
        aria-label="Ahambrahmasmi animated logo"
        className={`block h-full w-full rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <video
      src="/images/logo-animation-cropped.mp4"
      poster="/images/logo.png"
      autoPlay
      loop
      muted
      playsInline
      width={size}
      height={Math.round(size * 1.07)}
      aria-label="Ahambrahmasmi — A Journey of Self Discovery"
      className={`block object-contain mix-blend-multiply ${className}`}
      style={{ width: `${size}px`, height: "auto" }}
    />
  );
}
