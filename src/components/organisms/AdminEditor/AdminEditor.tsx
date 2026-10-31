"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button/Button";
import { ButtonLink } from "@/components/atoms/Button/ButtonLink";
import type { SiteContent } from "@/types/content";

type AdminEditorProps = {
  initialContent: SiteContent;
};

export function AdminEditor({ initialContent }: AdminEditorProps) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSave() {
    setPending(true);
    setError(null);
    setStatus(null);

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error("Zapis nieudany.");
      }

      setStatus("Zapisano. Odśwież stronę główną, aby zobaczyć zmiany.");
      router.refresh();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Błąd zapisu.");
    } finally {
      setPending(false);
    }
  }

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin__shell">
      <div className="admin__toolbar">
        <div>
          <h1 className="admin__title">Edycja treści</h1>
          <p className="admin__lead">Zmiany trafiają do pliku JSON na serwerze.</p>
        </div>
        <div className="admin__toolbar">
          <ButtonLink href="/" variant="ghost">
            Podgląd strony
          </ButtonLink>
          <Button variant="ghost" onClick={onLogout}>
            Wyloguj
          </Button>
          <Button onClick={onSave} disabled={pending}>
            {pending ? "Zapisywanie..." : "Zapisz"}
          </Button>
        </div>
      </div>

      <section className="admin__card admin__form">
        <div className="field">
          <label className="field__label" htmlFor="hero-slogan">
            Slogan hero
          </label>
          <input
            className="field__control"
            id="hero-slogan"
            value={content.hero.slogan}
            onChange={(event) =>
              setContent((prev) => ({
                ...prev,
                hero: { ...prev.hero, slogan: event.target.value },
              }))
            }
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="about-lead">
            Lead O nas
          </label>
          <textarea
            className="field__control field__control--area"
            id="about-lead"
            value={content.about.lead}
            onChange={(event) =>
              setContent((prev) => ({
                ...prev,
                about: { ...prev.about, lead: event.target.value },
              }))
            }
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="offers-cta">
            Tekst CTA ofert
          </label>
          <input
            className="field__control"
            id="offers-cta"
            value={content.offers.ctaLabel}
            onChange={(event) =>
              setContent((prev) => ({
                ...prev,
                offers: { ...prev.offers, ctaLabel: event.target.value },
              }))
            }
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="contact-title">
            Tytuł kontaktu
          </label>
          <input
            className="field__control"
            id="contact-title"
            value={content.contact.title}
            onChange={(event) =>
              setContent((prev) => ({
                ...prev,
                contact: { ...prev.contact, title: event.target.value },
              }))
            }
          />
        </div>

        {error ? (
          <p className="field__error" role="alert">
            {error}
          </p>
        ) : null}
        {status ? (
          <p className="admin__status" role="status">
            {status}
          </p>
        ) : null}
      </section>
    </div>
  );
}
