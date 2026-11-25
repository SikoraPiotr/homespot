import { MediaImage } from "@/components/atoms/MediaImage/MediaImage";
import { cn } from "@/lib/cn";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  leadScript?: boolean;
  imageSrc: string;
  imageAlt: string;
  variant?: "default" | "team";
};

export function PageHero({
  eyebrow,
  title,
  lead,
  leadScript = false,
  imageSrc,
  imageAlt,
  variant = "default",
}: PageHeroProps) {
  return (
    <section
      className={cn("page-hero", variant === "team" && "page-hero--team")}
      aria-labelledby="page-hero-title"
    >
      <div className="page-hero__media" aria-hidden="true">
        <MediaImage src={imageSrc} alt="" fill eager quality={78} sizes="100vw" />
      </div>
      <div className="page-hero__veil" aria-hidden="true" />
      <div className="page-hero__content">
        <p className="page-hero__eyebrow">{eyebrow}</p>
        <h1 className="page-hero__title" id="page-hero-title">
          {title}
        </h1>
        {lead ? (
          <p className={cn("page-hero__lead", leadScript && "page-hero__lead--script")}>{lead}</p>
        ) : null}
      </div>
      <span className="sr-only">{imageAlt}</span>
    </section>
  );
}
