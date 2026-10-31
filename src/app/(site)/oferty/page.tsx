import { PageHero } from "@/components/organisms/PageHero/PageHero";
import { Offers } from "@/components/organisms/Offers/Offers";
import { getSiteContent } from "@/lib/content";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { offers } = await getSiteContent();
  return {
    title: `${offers.title} | Homespot Nieruchomości`,
    description: offers.description,
  };
}

export default async function OffersPage() {
  const content = await getSiteContent();

  return (
    <>
      <PageHero
        eyebrow={content.offers.eyebrow}
        title={content.offers.title}
        lead={content.offers.description}
        imageSrc={content.offers.pageHeroImage}
        imageAlt={content.offers.pageHeroAlt}
      />
      <Offers content={content.offers} />
    </>
  );
}
