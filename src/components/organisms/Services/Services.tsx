import Image from "next/image";
import { SectionHeader } from "@/components/atoms/SectionHeader/SectionHeader";
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
              <article className="service-card">
                <div className="service-card__copy">
                  <h3 className="service-card__title">{item.title}</h3>
                  <p className="service-card__text">{item.subtitle}</p>
                </div>
                {item.imageSrc ? (
                  <div className="service-card__photo">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt ?? ""}
                      fill
                      sizes="(max-width: 40rem) 100vw, (max-width: 80rem) 50vw, 33vw"
                    />
                  </div>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
