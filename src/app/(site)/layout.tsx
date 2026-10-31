import { SiteShell } from "@/components/templates/SiteShell/SiteShell";
import { getSiteContent } from "@/lib/content";
import type { ReactNode } from "react";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const content = await getSiteContent();

  return <SiteShell navigation={content.navigation}>{children}</SiteShell>;
}
