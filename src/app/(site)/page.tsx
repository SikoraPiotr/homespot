import { HomePage } from "@/components/templates/HomePage/HomePage";
import { getSiteContent } from "@/lib/content";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: content.meta.title,
    description: content.meta.description,
  };
}

export default async function Page() {
  const content = await getSiteContent();
  return <HomePage content={content} />;
}
