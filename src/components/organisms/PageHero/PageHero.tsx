import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  imageSrc: string;
  imageAlt: string;
};

export function PageHero({ eyebrow, title, lead, imageSrc, imageAlt }: PageHeroProps) {
  return (
    <section className="page-hero" aria-labelledby="page-hero-title">
      <div className="page-hero__media" aria-hidden="true">
        <Image src={imageSrc} alt="" fill priority sizes="100vw" />
      </div>
      <div className="page-hero__veil" aria-hidden="true" />
      <div className="page-hero__content">
        <p className="page-hero__eyebrow">{eyebrow}</p>
        <h1 className="page-hero__title" id="page-hero-title">
          {title}
        </h1>
        {lead ? <p className="page-hero__lead">{lead}</p> : null}
      </div>
      <span className="sr-only">{imageAlt}</span>
    </section>
  );
}
