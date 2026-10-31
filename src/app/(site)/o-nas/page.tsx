import { AboutStory } from "@/components/organisms/AboutStory/AboutStory";
import { PageHero } from "@/components/organisms/PageHero/PageHero";
import { getSiteContent } from "@/lib/content";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { about, meta } = await getSiteContent();
  return {
    title: `${about.title} | Homespot Nieruchomości`,
    description: meta.description,
  };
}

export default async function AboutPage() {
  const content = await getSiteContent();

  return (
    <>
      <PageHero
        eyebrow={content.about.eyebrow}
        title={content.about.title}
        lead={content.about.lead}
        imageSrc={content.about.pageHeroImage}
        imageAlt={content.about.pageHeroAlt}
      />
      <AboutStory content={content.about} />
    </>
  );
}
