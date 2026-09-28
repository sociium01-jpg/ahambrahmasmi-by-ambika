import React from "react";
import Link from "next/link";

export type ButtonVariant =
  | "primary"
  | "outline"
  | "outline-ink"
  | "outline-light"
  | "gold"
  | "dark";

interface BaseButtonProps {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}

type LinkButtonProps = BaseButtonProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

type ActionButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonProps = LinkButtonProps | ActionButtonProps;

export function Button(props: ButtonProps) {
  const { variant = "primary", className = "", children } = props;

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-maroon text-white hover:bg-maroon-dark font-medium transition-colors",
    outline:
      "border-[1.5px] border-maroon text-maroon hover:bg-maroon hover:text-white font-medium transition-colors",
    "outline-ink":
      "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-cream font-medium transition-colors",
    "outline-light":
      "border-[1.5px] border-cream text-cream hover:bg-cream hover:text-ink font-medium transition-colors",
    gold: "bg-gold text-ink hover:brightness-95 font-semibold transition-all",
    dark: "bg-ink text-cream hover:bg-maroon font-medium transition-colors",
  };

  const baseClasses = `inline-flex min-h-[44px] items-center justify-center rounded-full text-center no-underline cursor-pointer ${variantClasses[variant]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    const { href, target, rel, onClick } = props;
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          className={baseClasses}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={baseClasses}>
        {children}
      </Link>
    );
  }

  const {
    variant: _v,
    className: _c,
    children: _ch,
    type = "button",
    ...buttonProps
  } = props as ActionButtonProps;

  return (
    <button type={type} className={baseClasses} {...buttonProps}>
      {children}
    </button>
  );
}
