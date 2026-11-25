import { PageHero } from "@/components/organisms/PageHero/PageHero";
import { Services } from "@/components/organisms/Services/Services";
import { getSiteContent } from "@/lib/content";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { services } = await getSiteContent();
  return {
    title: `${services.title} | Homespot Nieruchomości`,
    description: "Sprzedaż, wynajem, zarządzanie najmem, finansowanie, inwestycje i analiza rynku w Poznaniu.",
  };
}

export default async function ServicesPage() {
  const content = await getSiteContent();

  return (
    <>
      <PageHero
        eyebrow={content.services.eyebrow}
        title={content.services.title}
        lead={content.services.lead}
        leadScript
        imageSrc={content.services.pageHeroImage}
        imageAlt={content.services.pageHeroAlt}
      />
      <Services content={content.services} />
    </>
  );
}
