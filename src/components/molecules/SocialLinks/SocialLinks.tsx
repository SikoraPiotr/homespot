import { IconLink } from "@/components/atoms/IconLink/IconLink";
import type { SocialLink } from "@/types/content";

function SocialGlyph({ id }: { id: string }) {
  if (id === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (id === "facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.6L17 11h-3V9z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.5 9.5A2 2 0 1 1 6.5 5.5 2 2 0 0 1 6.5 9.5zM4.8 11h3.4v8H4.8v-8zM13.2 11h3.2v1.1c.5-.8 1.6-1.4 3-1.4 3.1 0 3.8 2 3.8 4.7V19h-3.4v-3.4c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V19h-3.4v-8h.8z" />
    </svg>
  );
}

type SocialLinksProps = {
  items: SocialLink[];
  className?: string;
};

export function SocialLinks({ items, className }: SocialLinksProps) {
  return (
    <ul className={className ?? "hero__social-list"}>
      {items.map((item) => (
        <li key={item.id}>
          <IconLink href={item.href} label={item.label}>
            <SocialGlyph id={item.id} />
          </IconLink>
        </li>
      ))}
    </ul>
  );
}
