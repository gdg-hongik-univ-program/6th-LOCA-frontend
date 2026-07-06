import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
};

const variants = {
  primary: "bg-[var(--brand)] text-white hover:bg-[var(--primary-hover)]",
  secondary: "border border-[var(--border)] bg-white text-[var(--text)] hover:bg-zinc-50",
  ghost: "bg-transparent text-[var(--text-secondary)] hover:bg-zinc-100",
};

export function Button({ children, href, variant = "primary", className = "", onClick }: ButtonProps) {
  const classes = `inline-flex h-12 items-center justify-center rounded-xl px-5 text-sm font-semibold transition ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} type="button">
      {children}
    </button>
  );
}
