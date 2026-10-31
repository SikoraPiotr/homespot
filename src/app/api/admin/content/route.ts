import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSiteContent, saveSiteContent } from "@/lib/content";
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
    await saveSiteContent(body);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Nie udało się zapisać treści." }, { status: 500 });
  }
}
