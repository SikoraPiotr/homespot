import type { ReactNode } from "react";

type IconLinkProps = {
  href: string;
  label: string;
  children: ReactNode;
};

export function IconLink({ href, label, children }: IconLinkProps) {
  return (
    <a className="icon-link" href={href} target="_blank" rel="noreferrer noopener" aria-label={label}>
      <span className="icon-link__glyph" aria-hidden="true">
        {children}
      </span>
    </a>
  );
}
