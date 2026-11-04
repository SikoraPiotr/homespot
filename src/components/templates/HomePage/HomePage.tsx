import { Hero } from "@/components/organisms/Hero/Hero";
import { HomeIntro } from "@/components/organisms/HomeIntro/HomeIntro";
import { HomeTiles } from "@/components/organisms/HomeTiles/HomeTiles";
import { ProcessTimeline } from "@/components/organisms/ProcessTimeline/ProcessTimeline";
import type { SiteContent } from "@/types/content";

type HomePageProps = {
  content: SiteContent;
};

export function HomePage({ content }: HomePageProps) {
  return (
    <>
      <Hero content={content.hero} social={content.social} />
      <HomeIntro content={content.home.intro} />
      <ProcessTimeline content={content.home.process} />
      <HomeTiles tiles={content.home.tiles} />
    </>
  );
}
