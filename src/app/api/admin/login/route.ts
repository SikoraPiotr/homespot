import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSession, verifyAdminCredentials } from "@/lib/auth";

const loginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Podaj login i hasło." }, { status: 400 });
    }

    const { username, password } = parsed.data;

    if (!verifyAdminCredentials(username, password)) {
      return NextResponse.json({ error: "Nieprawidłowe dane logowania." }, { status: 401 });
    }

    await createAdminSession(username);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Błąd logowania." }, { status: 500 });
  }
}
