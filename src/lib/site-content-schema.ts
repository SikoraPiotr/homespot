import { z } from "zod";

const mediaPathSchema = z
  .string()
  .trim()
  .regex(/^\/[A-Za-z0-9/_.-]+$/, "Ścieżka obrazu musi zaczynać się od /");

const nonEmpty = (max: number) => z.string().trim().min(1).max(max);
const optionalText = (max: number) => z.string().trim().max(max);

export const socialLinkSchema = z.object({
  id: nonEmpty(80),
  label: nonEmpty(80),
  href: nonEmpty(500),
});

export const serviceItemSchema = z.object({
  id: nonEmpty(80),
  title: nonEmpty(160),
  subtitle: nonEmpty(240),
  description: nonEmpty(1200),
  imageSrc: mediaPathSchema.optional(),
  imageAlt: optionalText(200).optional(),
});

export const teamMemberSchema = z.object({
  id: nonEmpty(80),
  name: nonEmpty(120),
  role: nonEmpty(120),
  license: optionalText(80).optional(),
  email: nonEmpty(160),
  phone: nonEmpty(40),
  imageSrc: mediaPathSchema,
  imageAlt: nonEmpty(200),
});

export const aboutSectionSchema = z.object({
  id: nonEmpty(80),
  eyebrow: nonEmpty(80),
  title: nonEmpty(160),
  paragraphs: z.array(nonEmpty(2000)).min(1).max(12),
  imageSrc: mediaPathSchema,
  imageAlt: nonEmpty(200),
  highlight: optionalText(400).optional(),
  highlightLabel: optionalText(120).optional(),
});

export const homeTileSchema = z.object({
  id: nonEmpty(80),
  title: nonEmpty(120),
  description: nonEmpty(400),
  href: nonEmpty(300),
  imageSrc: mediaPathSchema,
  imageAlt: nonEmpty(200),
});

export const processStepSchema = z.object({
  id: nonEmpty(80),
  title: nonEmpty(120),
  text: nonEmpty(400),
});

export const processContentSchema = z.object({
  eyebrow: nonEmpty(80),
  title: nonEmpty(200),
  steps: z.array(processStepSchema).min(1).max(20),
});

export const offerCardSchema = z.object({
  id: nonEmpty(80),
  title: nonEmpty(160),
  href: nonEmpty(500),
  imageSrc: mediaPathSchema,
  imageAlt: nonEmpty(200),
});

export const reviewItemSchema = z.object({
  id: nonEmpty(80),
  author: nonEmpty(80),
  quote: nonEmpty(800),
  rating: z.number().int().min(1).max(5),
});

export const reviewsContentSchema = z.object({
  eyebrow: nonEmpty(80),
  title: nonEmpty(160),
  lead: nonEmpty(400),
  pageHeroImage: mediaPathSchema,
  pageHeroAlt: nonEmpty(200),
  items: z.array(reviewItemSchema).max(40),
});

export const navigationItemSchema = z.object({
  id: nonEmpty(80),
  label: nonEmpty(80),
  href: nonEmpty(300),
});

export const siteContentSchema = z.object({
  meta: z.object({
    title: nonEmpty(160),
    description: nonEmpty(400),
  }),
  hero: z.object({
    slogan: nonEmpty(200),
    socialHeading: nonEmpty(120),
    backgroundImage: mediaPathSchema,
    backgroundAlt: nonEmpty(200),
  }),
  home: z.object({
    intro: z.object({
      eyebrow: nonEmpty(80),
      title: nonEmpty(200),
      paragraphs: z.array(nonEmpty(2000)).min(1).max(8),
      ctaLabel: nonEmpty(80),
      ctaHref: nonEmpty(300),
    }),
    process: processContentSchema,
    tiles: z.array(homeTileSchema).min(1).max(12),
  }),
  about: z.object({
    eyebrow: nonEmpty(80),
    title: nonEmpty(200),
    lead: nonEmpty(600),
    closingTitle: nonEmpty(200),
    closingText: nonEmpty(600),
    pageHeroImage: mediaPathSchema,
    pageHeroAlt: nonEmpty(200),
    sections: z.array(aboutSectionSchema).min(1).max(12),
  }),
  services: z.object({
    eyebrow: nonEmpty(80),
    title: nonEmpty(200),
    lead: nonEmpty(400),
    pageHeroImage: mediaPathSchema,
    pageHeroAlt: nonEmpty(200),
    items: z.array(serviceItemSchema).min(1).max(20),
  }),
  offers: z.object({
    eyebrow: nonEmpty(80),
    title: nonEmpty(200),
    description: nonEmpty(600),
    ctaLabel: nonEmpty(80),
    ctaHref: nonEmpty(500),
    pageHeroImage: mediaPathSchema,
    pageHeroAlt: nonEmpty(200),
    items: z.array(offerCardSchema).min(1).max(20),
  }),
  reviews: reviewsContentSchema,
  team: z.object({
    eyebrow: nonEmpty(80),
    title: nonEmpty(200),
    intro: nonEmpty(600),
    joinText: nonEmpty(240),
    joinLinkLabel: nonEmpty(80),
    joinEmail: nonEmpty(160),
    pageHeroImage: mediaPathSchema,
    pageHeroAlt: nonEmpty(200),
    members: z.array(teamMemberSchema).min(1).max(20),
  }),
  contact: z.object({
    eyebrow: nonEmpty(80),
    title: nonEmpty(200),
    officeTitle: nonEmpty(160),
    addressLines: z.array(nonEmpty(200)).min(1).max(6),
    mapsUrl: nonEmpty(500),
    mapsEmbedUrl: nonEmpty(500),
    email: nonEmpty(160),
    formSuccess: nonEmpty(400),
    pageHeroImage: mediaPathSchema,
    pageHeroAlt: nonEmpty(200),
  }),
  social: z.array(socialLinkSchema).max(12),
  navigation: z.array(navigationItemSchema).min(1).max(12),
});

export type SiteContentInput = z.infer<typeof siteContentSchema>;
