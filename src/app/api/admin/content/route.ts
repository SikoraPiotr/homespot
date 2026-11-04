import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSiteContent, saveSiteContent } from "@/lib/content";
import { reviewsContentSchema } from "@/lib/reviews";
import type { SiteContent } from "@/types/content";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = await getSiteContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as SiteContent;
    const reviews = reviewsContentSchema.safeParse(body.reviews);

    if (!reviews.success) {
      return NextResponse.json(
        { error: "Sprawdź opinie: autor, treść i ocena są wymagane." },
        { status: 400 },
      );
    }

    await saveSiteContent({ ...body, reviews: reviews.data });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Nie udało się zapisać treści." }, { status: 500 });
  }
}
