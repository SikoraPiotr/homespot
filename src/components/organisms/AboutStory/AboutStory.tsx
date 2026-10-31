import Image from "next/image";
import { Reveal } from "@/components/molecules/Reveal/Reveal";
import { cn } from "@/lib/cn";
import type { SiteContent } from "@/types/content";

type AboutStoryProps = {
  content: SiteContent["about"];
};

export function AboutStory({ content }: AboutStoryProps) {
  return (
    <div className="about-story">
      {content.sections.map((section, index) => (
        <section
          key={section.id}
          className={cn("section section--fog about-story__block", index % 2 === 1 && "about-story__block--reverse")}
          aria-labelledby={`about-${section.id}-title`}
        >
          <div className="section__inner about-story__grid">
            <Reveal>
              <div className="about-story__copy">
                <p className="about-story__eyebrow">{section.eyebrow}</p>
                <h2 className="about-story__title" id={`about-${section.id}-title`}>
                  {section.title}
                </h2>
                <div className="about-story__text">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 28)}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <figure className="about-story__figure">
                <Image
                  src={section.imageSrc}
                  alt={section.imageAlt}
                  fill
                  sizes="(max-width: 64rem) 100vw, 46vw"
                />
              </figure>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="section section--deep about-story__closing" aria-label="Podsumowanie">
        <div className="section__inner">
          <Reveal>
            <p className="about-story__closing-text">{content.closing}</p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
