import { PageHero } from "@/components/organisms/PageHero/PageHero";
import { Team } from "@/components/organisms/Team/Team";
import { getSiteContent } from "@/lib/content";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { team } = await getSiteContent();
  return {
    title: `${team.title} | Homespot Nieruchomości`,
    description: team.intro,
  };
}

export default async function TeamPage() {
  const content = await getSiteContent();

  return (
    <>
      <PageHero
        eyebrow={content.team.eyebrow}
        title={content.team.title}
        lead={content.team.intro}
        imageSrc={content.team.pageHeroImage}
        imageAlt={content.team.pageHeroAlt}
      />
      <Team content={content.team} />
    </>
  );
}
