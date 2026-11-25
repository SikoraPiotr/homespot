import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { detectImageKind, MAX_IMAGE_BYTES } from "@/lib/image-file";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Wybierz plik zdjęcia." }, { status: 400 });
  }

  if (file.size <= 0 || file.size > MAX_IMAGE_BYTES) {
    return NextResponse.json({ error: "Zdjęcie może mieć najwyżej 8 MB." }, { status: 400 });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const kind = detectImageKind(bytes);

  if (!kind) {
    return NextResponse.json({ error: "Dozwolone są tylko pliki JPG, PNG i WebP." }, { status: 400 });
  }

  const filename = `${randomUUID()}.${kind}`;
  const directory = path.join(process.cwd(), "public", "media", "uploads");
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, filename), bytes);

  return NextResponse.json({ src: `/media/uploads/${filename}` });
}
