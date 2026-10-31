import Image from "next/image";
import { cn } from "@/lib/cn";

type BrandLockupProps = {
  className?: string;
  variant?: "header" | "footer";
};

export function BrandLockup({ className, variant = "header" }: BrandLockupProps) {
  return (
    <span className={cn("brand-lockup", variant === "footer" && "brand-lockup--footer", className)}>
      <Image
        className="brand-lockup__mark"
        src="/brand/logo-mark-cyan.svg"
        alt=""
        width={40}
        height={40}
        aria-hidden
      />
      <span className="brand-lockup__text">
        <span className="brand-lockup__name">
          <span className="brand-lockup__home">home</span>
          <span className="brand-lockup__spot">spot</span>
        </span>
        <span className="brand-lockup__sub">Nieruchomości</span>
      </span>
    </span>
  );
}
