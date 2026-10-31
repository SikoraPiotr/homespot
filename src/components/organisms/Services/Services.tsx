import Image from "next/image";
import { SectionHeader } from "@/components/atoms/SectionHeader/SectionHeader";
import { FlipCard } from "@/components/molecules/FlipCard/FlipCard";
import { Reveal } from "@/components/molecules/Reveal/Reveal";
import type { SiteContent } from "@/types/content";

type ServicesProps = {
  content: SiteContent["services"];
  showHeader?: boolean;
};

export function Services({ content, showHeader = false }: ServicesProps) {
  return (
    <section className="section section--lux" aria-labelledby={showHeader ? "services-title" : undefined}>
      <div className="section__inner">
        {showHeader ? (
          <Reveal>
            <SectionHeader eyebrow={content.eyebrow} title={content.title} titleId="services-title" />
          </Reveal>
        ) : null}

        <div className="services__grid">
          {content.items.map((item, index) => (
            <Reveal key={item.id} delay={((index % 3) + 1) as 1 | 2 | 3}>
              <FlipCard
                className="flip-card--service"
                title={item.title}
                front={
                  <>
                    {item.imageSrc ? (
                      <div className="flip-card__media">
                        <Image
                          src={item.imageSrc}
                          alt=""
                          fill
                          sizes="(max-width: 64rem) 100vw, 33vw"
                        />
                      </div>
                    ) : null}
                    <div className="flip-card__overlay flip-card__overlay--service">
                      <h3 className="flip-card__title">{item.title}</h3>
                      <p className="flip-card__subtitle">{item.subtitle}</p>
                    </div>
                    {item.imageAlt ? <span className="sr-only">{item.imageAlt}</span> : null}
                  </>
                }
                back={<p className="flip-card__text">{item.description}</p>}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
