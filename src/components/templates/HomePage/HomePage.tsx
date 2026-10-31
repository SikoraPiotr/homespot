import { Hero } from "@/components/organisms/Hero/Hero";
import { HomeIntro } from "@/components/organisms/HomeIntro/HomeIntro";
import { HomeTiles } from "@/components/organisms/HomeTiles/HomeTiles";
import type { SiteContent } from "@/types/content";

type HomePageProps = {
  content: SiteContent;
};

export function HomePage({ content }: HomePageProps) {
  return (
    <>
      <Hero content={content.hero} social={content.social} />
      <HomeIntro content={content.home.intro} />
      <HomeTiles tiles={content.home.tiles} />
    </>
  );
}
