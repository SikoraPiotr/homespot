export type SocialLink = {
  id: string;
  label: string;
  href: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  imageSrc: string;
  imageAlt: string;
};

export type AboutSection = {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  imageSrc: string;
  imageAlt: string;
};

export type HomeTile = {
  id: string;
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export type SiteContent = {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    slogan: string;
    socialHeading: string;
    backgroundImage: string;
    backgroundAlt: string;
  };
  home: {
    intro: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      ctaLabel: string;
      ctaHref: string;
    };
    tiles: HomeTile[];
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    closing: string;
    pageHeroImage: string;
    pageHeroAlt: string;
    sections: AboutSection[];
  };
  services: {
    eyebrow: string;
    title: string;
    items: ServiceItem[];
  };
  offers: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    pageHeroImage: string;
    pageHeroAlt: string;
  };
  team: {
    eyebrow: string;
    title: string;
    intro: string;
    pageHeroImage: string;
    pageHeroAlt: string;
    members: TeamMember[];
  };
  contact: {
    eyebrow: string;
    title: string;
    addressLines: string[];
    email: string;
    formSuccess: string;
    pageHeroImage: string;
    pageHeroAlt: string;
  };
  social: SocialLink[];
  navigation: Array<{ id: string; label: string; href: string }>;
};
