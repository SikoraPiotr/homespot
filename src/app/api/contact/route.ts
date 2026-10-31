import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(10).max(4000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Sprawdź poprawność pól formularza." },
        { status: 400 },
      );
    }

    // Local MVP: accept the payload. Wire SMTP/provider later without changing the form contract.
    console.info("[homespot:contact]", {
      to: process.env.CONTACT_TO ?? "biuro@homespot.com.pl",
      ...parsed.data,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Nie udało się obsłużyć żądania." }, { status: 500 });
  }
}
