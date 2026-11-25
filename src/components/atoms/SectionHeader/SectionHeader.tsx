import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  leadScript?: boolean;
  titleId: string;
};

export function SectionHeader({
  eyebrow,
  title,
  lead,
  leadScript = false,
  titleId,
}: SectionHeaderProps) {
  return (
    <header className="section-header">
      <p className="section-header__eyebrow">{eyebrow}</p>
      <h2 className="section-header__title" id={titleId}>
        {title}
      </h2>
      {lead ? (
        <p className={cn("section-header__lead", leadScript && "section-header__lead--script")}>
          {lead}
        </p>
      ) : null}
    </header>
  );
}
