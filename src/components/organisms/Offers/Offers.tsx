import { ButtonLink } from "@/components/atoms/Button/ButtonLink";
import { SectionHeader } from "@/components/atoms/SectionHeader/SectionHeader";
import { Reveal } from "@/components/molecules/Reveal/Reveal";
import type { SiteContent } from "@/types/content";

type OffersProps = {
  content: SiteContent["offers"];
  showHeader?: boolean;
};

export function Offers({ content, showHeader = false }: OffersProps) {
  return (
    <section className="section section--deep section--lux" aria-labelledby={showHeader ? "offers-title" : undefined}>
      <div className="section__inner">
        <Reveal>
          <div className="offers__panel">
            <div>
              {showHeader ? (
                <SectionHeader
                  eyebrow={content.eyebrow}
                  title={content.title}
                  titleId="offers-title"
                />
              ) : (
                <h2 className="sr-only">Portal ofert</h2>
              )}
              {showHeader ? <p className="offers__description">{content.description}</p> : null}
              {!showHeader ? (
                <p className="offers__description offers__description--compact">
                  Przejście otworzy portal z aktualną bazą nieruchomości Homespot.
                </p>
              ) : null}
            </div>
            <ButtonLink href={content.ctaHref} external>
              {content.ctaLabel}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
