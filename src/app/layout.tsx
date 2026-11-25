import type { Metadata } from "next";
import { Caveat, Manrope, Outfit } from "next/font/google";
import "@/styles/main.scss";

const display = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const script = Caveat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Homespot Nieruchomości | Twoje miejsce zwane domem",
  description:
    "Homespot Nieruchomości w Poznaniu. Sprzedaż, zakup, wynajem, zarządzanie najmem, finansowanie i inwestycje.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${display.variable} ${body.variable} ${script.variable}`}>{children}</body>
    </html>
  );
}
