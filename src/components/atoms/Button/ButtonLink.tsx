import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className,
}: ButtonLinkProps) {
  const classes = cn(
    "button",
    variant === "primary" && "button--primary",
    variant === "ghost" && "button--ghost",
    className,
  );

  if (external) {
    return (
      <a className={classes} href={href} target="_blank" rel="noreferrer noopener">
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}
