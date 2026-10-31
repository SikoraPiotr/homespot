import Image from "next/image";
import { SectionHeader } from "@/components/atoms/SectionHeader/SectionHeader";
import { FlipCard } from "@/components/molecules/FlipCard/FlipCard";
import { Reveal } from "@/components/molecules/Reveal/Reveal";
import type { SiteContent } from "@/types/content";

type TeamProps = {
  content: SiteContent["team"];
  showHeader?: boolean;
};

export function Team({ content, showHeader = false }: TeamProps) {
  return (
    <section className="section section--fog section--lux" aria-labelledby={showHeader ? "team-title" : undefined}>
      <div className="section__inner">
        {showHeader ? (
          <Reveal>
            <SectionHeader
              eyebrow={content.eyebrow}
              title={content.title}
              titleId="team-title"
              lead={content.intro}
            />
          </Reveal>
        ) : null}

        <div className="team__grid">
          {content.members.map((member, index) => (
            <Reveal key={member.id} delay={((index % 3) + 1) as 1 | 2 | 3}>
              <FlipCard
                className="flip-card--team"
                title={member.name}
                hint="Odwróć kartę, aby zobaczyć kontakt"
                front={
                  <>
                    <div className="flip-card__media">
                      <Image
                        src={member.imageSrc}
                        alt={member.imageAlt}
                        fill
                        sizes="(max-width: 64rem) 100vw, 33vw"
                      />
                    </div>
                    <div className="flip-card__overlay">
                      <h3 className="flip-card__title">{member.name}</h3>
                      <p className="flip-card__subtitle">{member.role}</p>
                    </div>
                  </>
                }
                back={
                  <div className="flip-card__meta">
                    <h3 className="flip-card__title">{member.name}</h3>
                    <a href={`mailto:${member.email}`}>{member.email}</a>
                    <a href={`tel:${member.phone.replace(/\s+/g, "")}`}>{member.phone}</a>
                  </div>
                }
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
