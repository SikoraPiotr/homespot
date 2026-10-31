type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  titleId: string;
};

export function SectionHeader({ eyebrow, title, lead, titleId }: SectionHeaderProps) {
  return (
    <header className="section-header">
      <p className="section-header__eyebrow">{eyebrow}</p>
      <h2 className="section-header__title" id={titleId}>
        {title}
      </h2>
      {lead ? <p className="section-header__lead">{lead}</p> : null}
    </header>
  );
}
