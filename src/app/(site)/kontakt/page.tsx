import { Contact } from "@/components/organisms/Contact/Contact";
import { PageHero } from "@/components/organisms/PageHero/PageHero";
import { getSiteContent } from "@/lib/content";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { contact } = await getSiteContent();
  return {
    title: `${contact.title} | Homespot Nieruchomości`,
    description: "Skontaktuj się z Homespot Nieruchomości, Grochowska 63, Poznań.",
  };
}

export default async function ContactPage() {
  const content = await getSiteContent();

  return (
    <>
      <PageHero
        eyebrow={content.contact.eyebrow}
        title={content.contact.title}
        imageSrc={content.contact.pageHeroImage}
        imageAlt={content.contact.pageHeroAlt}
      />
      <Contact content={content.contact} />
    </>
  );
}
