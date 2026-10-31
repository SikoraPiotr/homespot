import { ButtonLink } from "@/components/atoms/Button/ButtonLink";
import { Reveal } from "@/components/molecules/Reveal/Reveal";
import type { SiteContent } from "@/types/content";

type HomeIntroProps = {
  content: SiteContent["home"]["intro"];
};

export function HomeIntro({ content }: HomeIntroProps) {
  return (
    <section className="section section--fog" id="home-intro" aria-labelledby="home-intro-title">
      <div className="section__inner home-intro">
        <Reveal>
          <p className="home-intro__eyebrow">{content.eyebrow}</p>
          <h2 className="home-intro__title" id="home-intro-title">
            {content.title}
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <div className="home-intro__copy">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <ButtonLink href={content.ctaHref}>{content.ctaLabel}</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
