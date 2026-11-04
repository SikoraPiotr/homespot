import { z } from "zod";

export const reviewItemSchema = z.object({
  id: z.string().trim().min(1).max(80),
  author: z.string().trim().min(1).max(80),
  quote: z.string().trim().min(1).max(800),
  rating: z.number().int().min(1).max(5),
});

export const reviewsContentSchema = z.object({
  eyebrow: z.string().trim().min(1).max(80),
  title: z.string().trim().min(1).max(160),
  lead: z.string().trim().min(1).max(400),
  pageHeroImage: z.string().trim().regex(/^\/[A-Za-z0-9/_.-]+$/),
  pageHeroAlt: z.string().trim().min(1).max(200),
  items: z.array(reviewItemSchema).max(40),
});
