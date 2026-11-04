import Image from "next/image";
import { ButtonLink } from "@/components/atoms/Button/ButtonLink";
import { SectionHeader } from "@/components/atoms/SectionHeader/SectionHeader";
import { Reveal } from "@/components/molecules/Reveal/Reveal";
import type { SiteContent } from "@/types/content";

function externalHref(href: string): string | null {
  try {
    const url = new URL(href);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

type OffersProps = {
  content: SiteContent["offers"];
  showHeader?: boolean;
};

export function Offers({ content, showHeader = false }: OffersProps) {
  return (
    <section className="section section--deep section--lux" aria-labelledby={showHeader ? "offers-title" : undefined}>
      <div className="section__inner">
        <ul className="offer-board">
          {content.items.map((item) => {
            const href = externalHref(item.href);
            if (!href) return null;

            return (
              <li key={item.id}>
                <a className="offer-card" href={href} target="_blank" rel="noreferrer noopener">
                  <span className="offer-card__media">
                    <Image src={item.imageSrc} alt="" fill sizes="(max-width: 40rem) 100vw, 25vw" />
                  </span>
                  <span className="offer-card__title">{item.title}</span>
                  <span className="sr-only">{item.imageAlt}. Otwiera się w nowej karcie.</span>
                </a>
              </li>
            );
          })}
        </ul>
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
