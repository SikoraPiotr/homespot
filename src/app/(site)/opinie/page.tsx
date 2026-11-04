import { PageHero } from "@/components/organisms/PageHero/PageHero";
import { Reviews } from "@/components/organisms/Reviews/Reviews";
import { getSiteContent } from "@/lib/content";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { reviews } = await getSiteContent();
  return {
    title: `${reviews.title} | Homespot Nieruchomości`,
    description: reviews.lead,
  };
}

export default async function ReviewsPage() {
  const content = await getSiteContent();

  return (
    <>
      <PageHero
        eyebrow={content.reviews.eyebrow}
        title={content.reviews.title}
        lead={content.reviews.lead}
        imageSrc={content.reviews.pageHeroImage}
        imageAlt={content.reviews.pageHeroAlt}
      />
      <Reviews content={content.reviews} />
    </>
  );
}
