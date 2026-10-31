import { AmbientField } from "@/components/organisms/AmbientField/AmbientField";
import { SiteFooter } from "@/components/organisms/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/organisms/SiteHeader/SiteHeader";
import type { SiteContent } from "@/types/content";
import type { ReactNode } from "react";

type SiteShellProps = {
  navigation: SiteContent["navigation"];
  children: ReactNode;
};

export function SiteShell({ navigation, children }: SiteShellProps) {
  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Przejdź do treści
      </a>
      <AmbientField />
      <SiteHeader navigation={navigation} />
      <main className="page__main" id="main">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
