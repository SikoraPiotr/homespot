"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button/Button";
import { ButtonLink } from "@/components/atoms/Button/ButtonLink";
import type {
  AboutSection,
  HomeTile,
  OfferCard,
  ProcessStep,
  ReviewItem,
  ServiceItem,
  SiteContent,
  SocialLink,
  TeamMember,
} from "@/types/content";
import { AdminField } from "./AdminField";
import { AdminImageField } from "./AdminImageField";
import { AdminStringList } from "./AdminStringList";

type AdminEditorProps = {
  initialContent: SiteContent;
};

type SectionId =
  | "meta"
  | "home"
  | "about"
  | "services"
  | "offers"
  | "reviews"
  | "team"
  | "contact"
  | "social"
  | "navigation";

const SECTIONS: Array<{ id: SectionId; label: string }> = [
  { id: "meta", label: "Meta i hero" },
  { id: "home", label: "Strona główna" },
  { id: "about", label: "O nas" },
  { id: "services", label: "Usługi" },
  { id: "offers", label: "Oferty" },
  { id: "reviews", label: "Opinie" },
  { id: "team", label: "Zespół" },
  { id: "contact", label: "Kontakt" },
  { id: "social", label: "Social" },
  { id: "navigation", label: "Nawigacja" },
];

function newId(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

export function AdminEditor({ initialContent }: AdminEditorProps) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [section, setSection] = useState<SectionId>("meta");
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
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Zapis nieudany.");
      }

      setStatus("Zapisano. Odśwież stronę publiczną, aby zobaczyć zmiany.");
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

  function updateReview(id: string, patch: Partial<ReviewItem>) {
    setContent((prev) => ({
      ...prev,
      reviews: {
        ...prev.reviews,
        items: prev.reviews.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      },
    }));
  }

  function updateService(id: string, patch: Partial<ServiceItem>) {
    setContent((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        items: prev.services.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      },
    }));
  }

  function updateOffer(id: string, patch: Partial<OfferCard>) {
    setContent((prev) => ({
      ...prev,
      offers: {
        ...prev.offers,
        items: prev.offers.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      },
    }));
  }

  function updateMember(id: string, patch: Partial<TeamMember>) {
    setContent((prev) => ({
      ...prev,
      team: {
        ...prev.team,
        members: prev.team.members.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      },
    }));
  }

  function updateAboutSection(id: string, patch: Partial<AboutSection>) {
    setContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        sections: prev.about.sections.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      },
    }));
  }

  function updateTile(id: string, patch: Partial<HomeTile>) {
    setContent((prev) => ({
      ...prev,
      home: {
        ...prev.home,
        tiles: prev.home.tiles.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      },
    }));
  }

  function updateStep(id: string, patch: Partial<ProcessStep>) {
    setContent((prev) => ({
      ...prev,
      home: {
        ...prev.home,
        process: {
          ...prev.home.process,
          steps: prev.home.process.steps.map((item) =>
            item.id === id ? { ...item, ...patch } : item,
          ),
        },
      },
    }));
  }

  function updateSocial(id: string, patch: Partial<SocialLink>) {
    setContent((prev) => ({
      ...prev,
      social: prev.social.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  }

  function updateNav(id: string, patch: { label?: string; href?: string }) {
    setContent((prev) => ({
      ...prev,
      navigation: prev.navigation.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  }

  return (
    <div className="admin__shell admin__shell--wide">
      <header className="admin__topbar">
        <div>
          <h1 className="admin__title">Homespot CMS</h1>
          <p className="admin__lead">Edytuj teksty i zdjęcia. Jedna sekcja naraz, jeden zapis na końcu.</p>
        </div>
        <div className="admin__toolbar">
          <ButtonLink href="/" variant="ghost">
            Podgląd strony
          </ButtonLink>
          <Button variant="ghost" onClick={onLogout}>
            Wyloguj
          </Button>
          <Button onClick={onSave} disabled={pending}>
            {pending ? "Zapisywanie..." : "Zapisz zmiany"}
          </Button>
        </div>
      </header>

      {(error || status) && (
        <div className="admin__banner" role={error ? "alert" : "status"}>
          {error ? <p className="field__error">{error}</p> : null}
          {status ? <p className="admin__status">{status}</p> : null}
        </div>
      )}

      <div className="admin__layout">
        <nav className="admin__nav" aria-label="Sekcje treści">
          {SECTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={
                item.id === section ? "admin__nav-item admin__nav-item--active" : "admin__nav-item"
              }
              onClick={() => setSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <section className="admin__card admin__form" aria-live="polite">
          {section === "meta" ? (
            <>
              <h2 className="admin__subtitle">Meta i hero</h2>
              <AdminField
                id="meta-title"
                label="Tytuł strony (SEO)"
                value={content.meta.title}
                onChange={(value) =>
                  setContent((prev) => ({ ...prev, meta: { ...prev.meta, title: value } }))
                }
              />
              <AdminField
                id="meta-description"
                label="Opis SEO"
                value={content.meta.description}
                multiline
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    meta: { ...prev.meta, description: value },
                  }))
                }
              />
              <AdminField
                id="hero-slogan"
                label="Slogan hero"
                value={content.hero.slogan}
                onChange={(value) =>
                  setContent((prev) => ({ ...prev, hero: { ...prev.hero, slogan: value } }))
                }
              />
              <AdminField
                id="hero-social-heading"
                label="Nagłówek social pod hero"
                value={content.hero.socialHeading}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, socialHeading: value },
                  }))
                }
              />
              <AdminImageField
                label="Zdjęcie tła hero"
                src={content.hero.backgroundImage}
                alt={content.hero.backgroundAlt}
                onSrcChange={(src) =>
                  setContent((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, backgroundImage: src },
                  }))
                }
                onAltChange={(alt) =>
                  setContent((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, backgroundAlt: alt },
                  }))
                }
              />
            </>
          ) : null}

          {section === "home" ? (
            <>
              <h2 className="admin__subtitle">Strona główna</h2>
              <AdminField
                id="home-eyebrow"
                label="Eyebrow intro"
                value={content.home.intro.eyebrow}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    home: { ...prev.home, intro: { ...prev.home.intro, eyebrow: value } },
                  }))
                }
              />
              <AdminField
                id="home-title"
                label="Tytuł intro"
                value={content.home.intro.title}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    home: { ...prev.home, intro: { ...prev.home.intro, title: value } },
                  }))
                }
              />
              <AdminStringList
                id="home-paragraphs"
                label="Akapit"
                values={content.home.intro.paragraphs}
                onChange={(paragraphs) =>
                  setContent((prev) => ({
                    ...prev,
                    home: { ...prev.home, intro: { ...prev.home.intro, paragraphs } },
                  }))
                }
              />
              <AdminField
                id="home-cta-label"
                label="Tekst CTA"
                value={content.home.intro.ctaLabel}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    home: { ...prev.home, intro: { ...prev.home.intro, ctaLabel: value } },
                  }))
                }
              />
              <AdminField
                id="home-cta-href"
                label="Link CTA"
                value={content.home.intro.ctaHref}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    home: { ...prev.home, intro: { ...prev.home.intro, ctaHref: value } },
                  }))
                }
              />

              <h2 className="admin__subtitle">Proces</h2>
              <AdminField
                id="process-eyebrow"
                label="Eyebrow procesu"
                value={content.home.process.eyebrow}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    home: {
                      ...prev.home,
                      process: { ...prev.home.process, eyebrow: value },
                    },
                  }))
                }
              />
              <AdminField
                id="process-title"
                label="Tytuł procesu"
                value={content.home.process.title}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    home: {
                      ...prev.home,
                      process: { ...prev.home.process, title: value },
                    },
                  }))
                }
              />
              <div className="admin__list">
                {content.home.process.steps.map((step, index) => (
                  <div className="admin__list-item" key={step.id}>
                    <AdminField
                      id={`step-title-${step.id}`}
                      label={`Krok ${index + 1}: tytuł`}
                      value={step.title}
                      onChange={(value) => updateStep(step.id, { title: value })}
                    />
                    <AdminField
                      id={`step-text-${step.id}`}
                      label="Opis"
                      value={step.text}
                      multiline
                      rows={3}
                      onChange={(value) => updateStep(step.id, { text: value })}
                    />
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setContent((prev) => ({
                          ...prev,
                          home: {
                            ...prev.home,
                            process: {
                              ...prev.home.process,
                              steps: prev.home.process.steps.filter((item) => item.id !== step.id),
                            },
                          },
                        }))
                      }
                      disabled={content.home.process.steps.length <= 1}
                    >
                      Usuń krok
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    home: {
                      ...prev.home,
                      process: {
                        ...prev.home.process,
                        steps: [
                          ...prev.home.process.steps,
                          { id: newId("step"), title: "Nowy krok", text: "Opis kroku." },
                        ],
                      },
                    },
                  }))
                }
              >
                Dodaj krok
              </Button>

              <h2 className="admin__subtitle">Kafelki</h2>
              <div className="admin__list">
                {content.home.tiles.map((tile, index) => (
                  <div className="admin__list-item" key={tile.id}>
                    <AdminField
                      id={`tile-title-${tile.id}`}
                      label={`Kafelek ${index + 1}: tytuł`}
                      value={tile.title}
                      onChange={(value) => updateTile(tile.id, { title: value })}
                    />
                    <AdminField
                      id={`tile-desc-${tile.id}`}
                      label="Opis"
                      value={tile.description}
                      multiline
                      rows={3}
                      onChange={(value) => updateTile(tile.id, { description: value })}
                    />
                    <AdminField
                      id={`tile-href-${tile.id}`}
                      label="Link"
                      value={tile.href}
                      onChange={(value) => updateTile(tile.id, { href: value })}
                    />
                    <AdminImageField
                      label="Zdjęcie kafelka"
                      src={tile.imageSrc}
                      alt={tile.imageAlt}
                      onSrcChange={(src) => updateTile(tile.id, { imageSrc: src })}
                      onAltChange={(alt) => updateTile(tile.id, { imageAlt: alt })}
                    />
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setContent((prev) => ({
                          ...prev,
                          home: {
                            ...prev.home,
                            tiles: prev.home.tiles.filter((item) => item.id !== tile.id),
                          },
                        }))
                      }
                      disabled={content.home.tiles.length <= 1}
                    >
                      Usuń kafelek
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    home: {
                      ...prev.home,
                      tiles: [
                        ...prev.home.tiles,
                        {
                          id: newId("tile"),
                          title: "Nowy kafelek",
                          description: "Krótki opis.",
                          href: "/",
                          imageSrc: "/media/team-placeholder.svg",
                          imageAlt: "Placeholder",
                        },
                      ],
                    },
                  }))
                }
              >
                Dodaj kafelek
              </Button>
            </>
          ) : null}

          {section === "about" ? (
            <>
              <h2 className="admin__subtitle">O nas</h2>
              <AdminField
                id="about-eyebrow"
                label="Eyebrow"
                value={content.about.eyebrow}
                onChange={(value) =>
                  setContent((prev) => ({ ...prev, about: { ...prev.about, eyebrow: value } }))
                }
              />
              <AdminField
                id="about-title"
                label="Tytuł"
                value={content.about.title}
                onChange={(value) =>
                  setContent((prev) => ({ ...prev, about: { ...prev.about, title: value } }))
                }
              />
              <AdminField
                id="about-lead"
                label="Lead"
                value={content.about.lead}
                multiline
                onChange={(value) =>
                  setContent((prev) => ({ ...prev, about: { ...prev.about, lead: value } }))
                }
              />
              <AdminField
                id="about-closing-title"
                label="Tytuł zamknięcia"
                value={content.about.closingTitle}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    about: { ...prev.about, closingTitle: value },
                  }))
                }
              />
              <AdminField
                id="about-closing-text"
                label="Tekst zamknięcia"
                value={content.about.closingText}
                multiline
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    about: { ...prev.about, closingText: value },
                  }))
                }
              />
              <AdminImageField
                label="Hero strony O nas"
                src={content.about.pageHeroImage}
                alt={content.about.pageHeroAlt}
                onSrcChange={(src) =>
                  setContent((prev) => ({
                    ...prev,
                    about: { ...prev.about, pageHeroImage: src },
                  }))
                }
                onAltChange={(alt) =>
                  setContent((prev) => ({
                    ...prev,
                    about: { ...prev.about, pageHeroAlt: alt },
                  }))
                }
              />

              <h2 className="admin__subtitle">Sekcje historii</h2>
              <div className="admin__list">
                {content.about.sections.map((item, index) => (
                  <div className="admin__list-item" key={item.id}>
                    <AdminField
                      id={`about-sec-eyebrow-${item.id}`}
                      label={`Sekcja ${index + 1}: eyebrow`}
                      value={item.eyebrow}
                      onChange={(value) => updateAboutSection(item.id, { eyebrow: value })}
                    />
                    <AdminField
                      id={`about-sec-title-${item.id}`}
                      label="Tytuł"
                      value={item.title}
                      onChange={(value) => updateAboutSection(item.id, { title: value })}
                    />
                    <AdminStringList
                      id={`about-sec-p-${item.id}`}
                      label="Akapit"
                      values={item.paragraphs}
                      onChange={(paragraphs) => updateAboutSection(item.id, { paragraphs })}
                    />
                    <AdminField
                      id={`about-sec-hl-${item.id}`}
                      label="Wyróżnienie (opcjonalne)"
                      value={item.highlight ?? ""}
                      multiline
                      rows={2}
                      onChange={(value) =>
                        updateAboutSection(item.id, { highlight: value || undefined })
                      }
                    />
                    <AdminField
                      id={`about-sec-hl-label-${item.id}`}
                      label="Etykieta wyróżnienia"
                      value={item.highlightLabel ?? ""}
                      onChange={(value) =>
                        updateAboutSection(item.id, { highlightLabel: value || undefined })
                      }
                    />
                    <AdminImageField
                      label="Zdjęcie sekcji"
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      onSrcChange={(src) => updateAboutSection(item.id, { imageSrc: src })}
                      onAltChange={(alt) => updateAboutSection(item.id, { imageAlt: alt })}
                    />
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setContent((prev) => ({
                          ...prev,
                          about: {
                            ...prev.about,
                            sections: prev.about.sections.filter((sec) => sec.id !== item.id),
                          },
                        }))
                      }
                      disabled={content.about.sections.length <= 1}
                    >
                      Usuń sekcję
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    about: {
                      ...prev.about,
                      sections: [
                        ...prev.about.sections,
                        {
                          id: newId("about"),
                          eyebrow: "Nowa sekcja",
                          title: "Tytuł sekcji",
                          paragraphs: ["Treść sekcji."],
                          imageSrc: "/media/team-placeholder.svg",
                          imageAlt: "Placeholder",
                        },
                      ],
                    },
                  }))
                }
              >
                Dodaj sekcję
              </Button>
            </>
          ) : null}

          {section === "services" ? (
            <>
              <h2 className="admin__subtitle">Usługi</h2>
              <AdminField
                id="services-eyebrow"
                label="Eyebrow"
                value={content.services.eyebrow}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    services: { ...prev.services, eyebrow: value },
                  }))
                }
              />
              <AdminField
                id="services-title"
                label="Tytuł"
                value={content.services.title}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    services: { ...prev.services, title: value },
                  }))
                }
              />
              <AdminField
                id="services-lead"
                label="Lead (pisany)"
                value={content.services.lead}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    services: { ...prev.services, lead: value },
                  }))
                }
              />
              <AdminImageField
                label="Hero strony Usługi"
                src={content.services.pageHeroImage}
                alt={content.services.pageHeroAlt}
                onSrcChange={(src) =>
                  setContent((prev) => ({
                    ...prev,
                    services: { ...prev.services, pageHeroImage: src },
                  }))
                }
                onAltChange={(alt) =>
                  setContent((prev) => ({
                    ...prev,
                    services: { ...prev.services, pageHeroAlt: alt },
                  }))
                }
              />
              <div className="admin__list">
                {content.services.items.map((item, index) => (
                  <div className="admin__list-item" key={item.id}>
                    <AdminField
                      id={`service-title-${item.id}`}
                      label={`Usługa ${index + 1}: tytuł`}
                      value={item.title}
                      onChange={(value) => updateService(item.id, { title: value })}
                    />
                    <AdminField
                      id={`service-sub-${item.id}`}
                      label="Podtytuł"
                      value={item.subtitle}
                      onChange={(value) => updateService(item.id, { subtitle: value })}
                    />
                    <AdminField
                      id={`service-desc-${item.id}`}
                      label="Opis"
                      value={item.description}
                      multiline
                      onChange={(value) => updateService(item.id, { description: value })}
                    />
                    <AdminImageField
                      label="Zdjęcie usługi"
                      src={item.imageSrc ?? ""}
                      alt={item.imageAlt ?? ""}
                      onSrcChange={(src) => updateService(item.id, { imageSrc: src })}
                      onAltChange={(alt) => updateService(item.id, { imageAlt: alt })}
                    />
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setContent((prev) => ({
                          ...prev,
                          services: {
                            ...prev.services,
                            items: prev.services.items.filter((service) => service.id !== item.id),
                          },
                        }))
                      }
                      disabled={content.services.items.length <= 1}
                    >
                      Usuń usługę
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    services: {
                      ...prev.services,
                      items: [
                        ...prev.services.items,
                        {
                          id: newId("service"),
                          title: "Nowa usługa",
                          subtitle: "Krótki podtytuł.",
                          description: "Opis usługi.",
                          imageSrc: "/media/team-placeholder.svg",
                          imageAlt: "Placeholder",
                        },
                      ],
                    },
                  }))
                }
              >
                Dodaj usługę
              </Button>
            </>
          ) : null}

          {section === "offers" ? (
            <>
              <h2 className="admin__subtitle">Oferty</h2>
              <AdminField
                id="offers-eyebrow"
                label="Eyebrow"
                value={content.offers.eyebrow}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    offers: { ...prev.offers, eyebrow: value },
                  }))
                }
              />
              <AdminField
                id="offers-title"
                label="Tytuł"
                value={content.offers.title}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    offers: { ...prev.offers, title: value },
                  }))
                }
              />
              <AdminField
                id="offers-description"
                label="Opis"
                value={content.offers.description}
                multiline
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    offers: { ...prev.offers, description: value },
                  }))
                }
              />
              <AdminField
                id="offers-cta"
                label="Tekst CTA"
                value={content.offers.ctaLabel}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    offers: { ...prev.offers, ctaLabel: value },
                  }))
                }
              />
              <AdminField
                id="offers-cta-href"
                label="Link CTA"
                value={content.offers.ctaHref}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    offers: { ...prev.offers, ctaHref: value },
                  }))
                }
              />
              <AdminImageField
                label="Hero strony Oferty"
                src={content.offers.pageHeroImage}
                alt={content.offers.pageHeroAlt}
                onSrcChange={(src) =>
                  setContent((prev) => ({
                    ...prev,
                    offers: { ...prev.offers, pageHeroImage: src },
                  }))
                }
                onAltChange={(alt) =>
                  setContent((prev) => ({
                    ...prev,
                    offers: { ...prev.offers, pageHeroAlt: alt },
                  }))
                }
              />
              <div className="admin__list">
                {content.offers.items.map((item, index) => (
                  <div className="admin__list-item" key={item.id}>
                    <AdminField
                      id={`offer-title-${item.id}`}
                      label={`Oferta ${index + 1}: tytuł`}
                      value={item.title}
                      onChange={(value) => updateOffer(item.id, { title: value })}
                    />
                    <AdminField
                      id={`offer-href-${item.id}`}
                      label="Link"
                      value={item.href}
                      onChange={(value) => updateOffer(item.id, { href: value })}
                    />
                    <AdminImageField
                      label="Zdjęcie oferty"
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      onSrcChange={(src) => updateOffer(item.id, { imageSrc: src })}
                      onAltChange={(alt) => updateOffer(item.id, { imageAlt: alt })}
                    />
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setContent((prev) => ({
                          ...prev,
                          offers: {
                            ...prev.offers,
                            items: prev.offers.items.filter((offer) => offer.id !== item.id),
                          },
                        }))
                      }
                      disabled={content.offers.items.length <= 1}
                    >
                      Usuń ofertę
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    offers: {
                      ...prev.offers,
                      items: [
                        ...prev.offers.items,
                        {
                          id: newId("offer"),
                          title: "Nowa oferta",
                          href: content.offers.ctaHref,
                          imageSrc: "/media/team-placeholder.svg",
                          imageAlt: "Placeholder",
                        },
                      ],
                    },
                  }))
                }
              >
                Dodaj ofertę
              </Button>
            </>
          ) : null}

          {section === "reviews" ? (
            <>
              <h2 className="admin__subtitle">Opinie</h2>
              <p className="admin__hint">
                Podmień wpisy na prawdziwe opinie z Google. Możesz dodać lub usunąć karty.
              </p>
              <AdminField
                id="reviews-eyebrow"
                label="Eyebrow"
                value={content.reviews.eyebrow}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    reviews: { ...prev.reviews, eyebrow: value },
                  }))
                }
              />
              <AdminField
                id="reviews-title"
                label="Tytuł"
                value={content.reviews.title}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    reviews: { ...prev.reviews, title: value },
                  }))
                }
              />
              <AdminField
                id="reviews-lead"
                label="Lead"
                value={content.reviews.lead}
                multiline
                rows={3}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    reviews: { ...prev.reviews, lead: value },
                  }))
                }
              />
              <AdminImageField
                label="Hero strony Opinie"
                src={content.reviews.pageHeroImage}
                alt={content.reviews.pageHeroAlt}
                onSrcChange={(src) =>
                  setContent((prev) => ({
                    ...prev,
                    reviews: { ...prev.reviews, pageHeroImage: src },
                  }))
                }
                onAltChange={(alt) =>
                  setContent((prev) => ({
                    ...prev,
                    reviews: { ...prev.reviews, pageHeroAlt: alt },
                  }))
                }
              />
              <div className="admin__list">
                {content.reviews.items.map((review, index) => (
                  <div className="admin__list-item" key={review.id}>
                    <AdminField
                      id={`review-author-${review.id}`}
                      label={`Autor ${index + 1}`}
                      value={review.author}
                      onChange={(value) => updateReview(review.id, { author: value })}
                    />
                    <AdminField
                      id={`review-quote-${review.id}`}
                      label="Treść"
                      value={review.quote}
                      multiline
                      onChange={(value) => updateReview(review.id, { quote: value })}
                    />
                    <div className="field">
                      <label className="field__label" htmlFor={`review-rating-${review.id}`}>
                        Ocena
                      </label>
                      <select
                        className="field__control"
                        id={`review-rating-${review.id}`}
                        value={review.rating}
                        onChange={(event) =>
                          updateReview(review.id, { rating: Number(event.target.value) })
                        }
                      >
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <option key={rating} value={rating}>
                            {rating} / 5
                          </option>
                        ))}
                      </select>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setContent((prev) => ({
                          ...prev,
                          reviews: {
                            ...prev.reviews,
                            items: prev.reviews.items.filter((item) => item.id !== review.id),
                          },
                        }))
                      }
                    >
                      Usuń opinię
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    reviews: {
                      ...prev.reviews,
                      items: [
                        ...prev.reviews.items,
                        { id: newId("review"), author: "", quote: "", rating: 5 },
                      ],
                    },
                  }))
                }
              >
                Dodaj opinię
              </Button>
            </>
          ) : null}

          {section === "team" ? (
            <>
              <h2 className="admin__subtitle">Zespół</h2>
              <AdminField
                id="team-eyebrow"
                label="Eyebrow"
                value={content.team.eyebrow}
                onChange={(value) =>
                  setContent((prev) => ({ ...prev, team: { ...prev.team, eyebrow: value } }))
                }
              />
              <AdminField
                id="team-title"
                label="Tytuł"
                value={content.team.title}
                onChange={(value) =>
                  setContent((prev) => ({ ...prev, team: { ...prev.team, title: value } }))
                }
              />
              <AdminField
                id="team-intro"
                label="Intro"
                value={content.team.intro}
                multiline
                onChange={(value) =>
                  setContent((prev) => ({ ...prev, team: { ...prev.team, intro: value } }))
                }
              />
              <AdminField
                id="team-join-text"
                label="Tekst dołączenia"
                value={content.team.joinText}
                onChange={(value) =>
                  setContent((prev) => ({ ...prev, team: { ...prev.team, joinText: value } }))
                }
              />
              <AdminField
                id="team-join-label"
                label="Link dołączenia"
                value={content.team.joinLinkLabel}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    team: { ...prev.team, joinLinkLabel: value },
                  }))
                }
              />
              <AdminField
                id="team-join-email"
                label="E-mail dołączenia"
                value={content.team.joinEmail}
                onChange={(value) =>
                  setContent((prev) => ({ ...prev, team: { ...prev.team, joinEmail: value } }))
                }
              />
              <AdminImageField
                label="Hero strony Zespół"
                src={content.team.pageHeroImage}
                alt={content.team.pageHeroAlt}
                onSrcChange={(src) =>
                  setContent((prev) => ({
                    ...prev,
                    team: { ...prev.team, pageHeroImage: src },
                  }))
                }
                onAltChange={(alt) =>
                  setContent((prev) => ({
                    ...prev,
                    team: { ...prev.team, pageHeroAlt: alt },
                  }))
                }
              />
              <div className="admin__list">
                {content.team.members.map((member, index) => (
                  <div className="admin__list-item" key={member.id}>
                    <AdminField
                      id={`member-name-${member.id}`}
                      label={`Osoba ${index + 1}: imię`}
                      value={member.name}
                      onChange={(value) => updateMember(member.id, { name: value })}
                    />
                    <AdminField
                      id={`member-role-${member.id}`}
                      label="Rola"
                      value={member.role}
                      onChange={(value) => updateMember(member.id, { role: value })}
                    />
                    <AdminField
                      id={`member-email-${member.id}`}
                      label="E-mail"
                      value={member.email}
                      onChange={(value) => updateMember(member.id, { email: value })}
                    />
                    <AdminField
                      id={`member-phone-${member.id}`}
                      label="Telefon"
                      value={member.phone}
                      onChange={(value) => updateMember(member.id, { phone: value })}
                    />
                    <AdminField
                      id={`member-license-${member.id}`}
                      label="Licencja"
                      value={member.license ?? ""}
                      onChange={(value) => updateMember(member.id, { license: value })}
                    />
                    <AdminImageField
                      label="Zdjęcie"
                      src={member.imageSrc}
                      alt={member.imageAlt}
                      onSrcChange={(src) => updateMember(member.id, { imageSrc: src })}
                      onAltChange={(alt) => updateMember(member.id, { imageAlt: alt })}
                    />
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setContent((prev) => ({
                          ...prev,
                          team: {
                            ...prev.team,
                            members: prev.team.members.filter((item) => item.id !== member.id),
                          },
                        }))
                      }
                      disabled={content.team.members.length <= 1}
                    >
                      Usuń osobę
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    team: {
                      ...prev.team,
                      members: [
                        ...prev.team.members,
                        {
                          id: newId("member"),
                          name: "Nowa osoba",
                          role: "Pośrednik",
                          license: "",
                          email: content.contact.email,
                          phone: "+48 000 000 000",
                          imageSrc: "/media/team-placeholder.svg",
                          imageAlt: "Portret członka zespołu",
                        },
                      ],
                    },
                  }))
                }
              >
                Dodaj agenta
              </Button>
              <p className="admin__hint">Nowa osoba pojawi się pod obecną trójką.</p>
            </>
          ) : null}

          {section === "contact" ? (
            <>
              <h2 className="admin__subtitle">Kontakt</h2>
              <AdminField
                id="contact-eyebrow"
                label="Eyebrow"
                value={content.contact.eyebrow}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, eyebrow: value },
                  }))
                }
              />
              <AdminField
                id="contact-title"
                label="Tytuł"
                value={content.contact.title}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, title: value },
                  }))
                }
              />
              <AdminField
                id="contact-office"
                label="Nazwa biura"
                value={content.contact.officeTitle}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, officeTitle: value },
                  }))
                }
              />
              <AdminStringList
                id="contact-address"
                label="Linia adresu"
                values={content.contact.addressLines}
                multiline={false}
                addLabel="Dodaj linię adresu"
                onChange={(addressLines) =>
                  setContent((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, addressLines },
                  }))
                }
              />
              <AdminField
                id="contact-maps"
                label="Link Google Maps"
                value={content.contact.mapsUrl}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, mapsUrl: value },
                  }))
                }
              />
              <AdminField
                id="contact-maps-embed"
                label="Embed Google Maps"
                value={content.contact.mapsEmbedUrl}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, mapsEmbedUrl: value },
                  }))
                }
              />
              <AdminField
                id="contact-email"
                label="E-mail"
                value={content.contact.email}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, email: value },
                  }))
                }
              />
              <AdminField
                id="contact-success"
                label="Komunikat po wysłaniu formularza"
                value={content.contact.formSuccess}
                multiline
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, formSuccess: value },
                  }))
                }
              />
              <AdminImageField
                label="Hero strony Kontakt"
                src={content.contact.pageHeroImage}
                alt={content.contact.pageHeroAlt}
                onSrcChange={(src) =>
                  setContent((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, pageHeroImage: src },
                  }))
                }
                onAltChange={(alt) =>
                  setContent((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, pageHeroAlt: alt },
                  }))
                }
              />
            </>
          ) : null}

          {section === "social" ? (
            <>
              <h2 className="admin__subtitle">Social</h2>
              <div className="admin__list">
                {content.social.map((item, index) => (
                  <div className="admin__list-item" key={item.id}>
                    <AdminField
                      id={`social-label-${item.id}`}
                      label={`Link ${index + 1}: nazwa`}
                      value={item.label}
                      onChange={(value) => updateSocial(item.id, { label: value })}
                    />
                    <AdminField
                      id={`social-href-${item.id}`}
                      label="URL"
                      value={item.href}
                      onChange={(value) => updateSocial(item.id, { href: value })}
                    />
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setContent((prev) => ({
                          ...prev,
                          social: prev.social.filter((link) => link.id !== item.id),
                        }))
                      }
                    >
                      Usuń link
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    social: [
                      ...prev.social,
                      { id: newId("social"), label: "Nowy kanał", href: "https://" },
                    ],
                  }))
                }
              >
                Dodaj link
              </Button>
            </>
          ) : null}

          {section === "navigation" ? (
            <>
              <h2 className="admin__subtitle">Nawigacja</h2>
              <div className="admin__list">
                {content.navigation.map((item, index) => (
                  <div className="admin__list-item" key={item.id}>
                    <AdminField
                      id={`nav-label-${item.id}`}
                      label={`Pozycja ${index + 1}: etykieta`}
                      value={item.label}
                      onChange={(value) => updateNav(item.id, { label: value })}
                    />
                    <AdminField
                      id={`nav-href-${item.id}`}
                      label="Ścieżka"
                      value={item.href}
                      onChange={(value) => updateNav(item.id, { href: value })}
                    />
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setContent((prev) => ({
                          ...prev,
                          navigation: prev.navigation.filter((link) => link.id !== item.id),
                        }))
                      }
                      disabled={content.navigation.length <= 1}
                    >
                      Usuń pozycję
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    navigation: [
                      ...prev.navigation,
                      { id: newId("nav"), label: "Nowa pozycja", href: "/" },
                    ],
                  }))
                }
              >
                Dodaj pozycję
              </Button>
            </>
          ) : null}
        </section>
      </div>
    </div>
  );
}
