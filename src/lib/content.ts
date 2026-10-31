import { promises as fs } from "node:fs";
import path from "node:path";
import type { SiteContent } from "@/types/content";

const contentPath = path.join(process.cwd(), "data", "site-content.json");

export async function getSiteContent(): Promise<SiteContent> {
  const raw = await fs.readFile(contentPath, "utf8");
  return JSON.parse(raw) as SiteContent;
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await fs.writeFile(contentPath, `${JSON.stringify(content, null, 2)}\n`, "utf8");
}
