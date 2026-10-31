import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/molecules/Reveal/Reveal";
import type { SiteContent } from "@/types/content";

type HomeTilesProps = {
  tiles: SiteContent["home"]["tiles"];
};

export function HomeTiles({ tiles }: HomeTilesProps) {
  return (
    <section className="section section--lux" aria-labelledby="home-tiles-title">
      <div className="section__inner">
        <Reveal>
          <h2 className="home-tiles__heading" id="home-tiles-title">
            Odkryj Homespot
          </h2>
        </Reveal>
        <ul className="home-tiles__grid">
          {tiles.map((tile, index) => (
            <Reveal key={tile.id} delay={((index % 3) + 1) as 1 | 2 | 3}>
              <li>
                <Link className="home-tiles__card" href={tile.href}>
                  <span className="home-tiles__media" aria-hidden="true">
                    <Image src={tile.imageSrc} alt="" fill sizes="(max-width: 40rem) 100vw, 33vw" />
                  </span>
                  <span className="home-tiles__veil" aria-hidden="true" />
                  <span className="home-tiles__body">
                    <span className="home-tiles__title">{tile.title}</span>
                    <span className="home-tiles__desc">{tile.description}</span>
                    <span className="home-tiles__cta">Przejdź dalej</span>
                  </span>
                  <span className="sr-only">{tile.imageAlt}</span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
