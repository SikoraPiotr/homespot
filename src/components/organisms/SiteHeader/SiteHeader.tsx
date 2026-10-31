"use client";

import { BrandLockup } from "@/components/atoms/BrandLockup/BrandLockup";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import type { SiteContent } from "@/types/content";

type SiteHeaderProps = {
  navigation: SiteContent["navigation"];
};

function DesktopNavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      className={cn("site-header__link", isActive && "is-active")}
      href={href}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      className={cn("site-header__drawer-link", isActive && "is-active")}
      href={href}
      aria-current={isActive ? "page" : undefined}
      onClick={onNavigate}
    >
      {label}
    </Link>
  );
}

export function SiteHeader({ navigation }: SiteHeaderProps) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const showSolid = solid || !isHome;

  return (
    <>
      <header className={cn("site-header", showSolid && "is-solid")}>
        <div className="site-header__inner">
          <Link className="site-header__brand" href="/" aria-label="Homespot Nieruchomości, strona startowa">
            <BrandLockup />
          </Link>

          <nav className="site-header__nav" aria-label="Główne">
            {navigation.map((item) => (
              <DesktopNavLink key={item.id} href={item.href} label={item.label} />
            ))}
          </nav>

          <div className="site-header__actions">
            <Link className="icon-link" href="/kontakt" aria-label="Przejdź do kontaktu">
              <span className="icon-link__glyph" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 7.5 12 13l8-5.5M5.5 19h13A1.5 1.5 0 0 0 20 17.5v-11A1.5 1.5 0 0 0 18.5 5h-13A1.5 1.5 0 0 0 4 6.5v11A1.5 1.5 0 0 0 5.5 19Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              </span>
            </Link>
            <button
              className="site-header__menu-btn"
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Zamknij menu" : "Otwórz menu"}</span>
              <span aria-hidden="true">{open ? "✕" : "＋"}</span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={cn("site-header__drawer", open && "is-open")}
        aria-hidden={!open}
      >
        <nav aria-label="Mobilne">
          {navigation.map((item) => (
            <MobileNavLink
              key={item.id}
              href={item.href}
              label={item.label}
              onNavigate={() => setOpen(false)}
            />
          ))}
        </nav>
      </div>
    </>
  );
}
