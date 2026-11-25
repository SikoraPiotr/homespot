"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import type { SiteContent, TeamMember } from "@/types/content";

type AdminMediaProps = {
  content: SiteContent;
  onChange: Dispatch<SetStateAction<SiteContent>>;
};

type PhotoSlot = {
  id: string;
  group: string;
  label: string;
  src: string;
  alt: string;
  position?: string;
};

export function AdminMedia({ content, onChange }: AdminMediaProps) {
  const [uploading, setUploading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const slots = photoSlots(content);

  async function upload(slotId: string, file: File | undefined, apply: (src: string) => void) {
    if (!file) return;

    setUploading(slotId);
    setError(null);

    try {
      const body = new FormData();
      body.set("file", file);
      const response = await fetch("/api/admin/media", { method: "POST", body });
      const payload = (await response.json()) as { src?: string; error?: string };

      if (!response.ok || !payload.src) {
        throw new Error(payload.error ?? "Nie udało się wgrać zdjęcia.");
      }

      apply(payload.src);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Nie udało się wgrać zdjęcia.");
    } finally {
      setUploading(null);
    }
  }

  function updateMember(id: string, patch: Partial<TeamMember>) {
    onChange((prev) => ({
      ...prev,
      team: {
        ...prev.team,
        members: prev.team.members.map((member) => (member.id === id ? { ...member, ...patch } : member)),
      },
    }));
  }

  const groups = [...new Set(slots.map((slot) => slot.group))];

  return (
    <section className="admin__card admin__form" aria-labelledby="admin-photos-title">
      <h2 className="admin__subtitle" id="admin-photos-title">
        Zdjęcia
      </h2>
      <p className="admin__hint">
        Każde zdjęcie na stronie da się tu podmienić. Po wyborze pliku widać nowy podgląd. Tekst i ścieżki
        wchodzą na stronę po Zapisz. JPG, PNG albo WebP, do 8 MB.
      </p>
      {error ? (
        <p className="field__error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="admin__people">
        <h3 className="admin__group-title">Zespół</h3>
        {content.team.members.map((member, index) => (
          <div className="admin__person" key={member.id}>
            <PhotoPreview
              label={`Zdjęcie ${index + 1}`}
              src={member.imageSrc}
              alt={member.imageAlt}
              position="center 16%"
              busy={uploading === member.id}
              onAlt={(alt) => updateMember(member.id, { imageAlt: alt })}
              onFile={(file) => upload(member.id, file, (src) => updateMember(member.id, { imageSrc: src }))}
            />
            <div className="admin__person-fields">
              <Field
                id={`member-name-${member.id}`}
                label="Imię i nazwisko"
                value={member.name}
                onChange={(name) => updateMember(member.id, { name })}
              />
              <Field
                id={`member-role-${member.id}`}
                label="Rola"
                value={member.role}
                onChange={(role) => updateMember(member.id, { role })}
              />
              <Field
                id={`member-email-${member.id}`}
                label="E-mail"
                value={member.email}
                onChange={(email) => updateMember(member.id, { email })}
              />
              <Field
                id={`member-phone-${member.id}`}
                label="Telefon"
                value={member.phone}
                onChange={(phone) => updateMember(member.id, { phone })}
              />
            </div>
          </div>
        ))}
      </div>

      {groups.map((group) => (
        <div className="admin__group" key={group}>
          <h3 className="admin__group-title">{group}</h3>
          <div className="admin__media-grid">
            {slots
              .filter((slot) => slot.group === group)
              .map((slot) => (
                <PhotoPreview
                  key={slot.id}
                  label={slot.label}
                  src={slot.src}
                  alt={slot.alt}
                  position={slot.position}
                  busy={uploading === slot.id}
                  onAlt={(alt) => applyAlt(onChange, slot.id, alt)}
                  onFile={(file) => upload(slot.id, file, (src) => applySrc(onChange, slot.id, src))}
                />
              ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function PhotoPreview({
  label,
  src,
  alt,
  position = "center",
  busy,
  onAlt,
  onFile,
}: {
  label: string;
  src: string;
  alt: string;
  position?: string;
  busy: boolean;
  onAlt: (alt: string) => void;
  onFile: (file: File | undefined) => void;
}) {
  const fieldId = `photo-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="admin__photo">
      <p className="field__label">{label}</p>
      <div className="admin__photo-preview">
        {/* Admin previews local uploads that are not known at build time. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" style={{ objectPosition: position }} />
      </div>
      <label className="admin__upload">
        {busy ? "Wysyłanie..." : "Podmień zdjęcie"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={busy}
          onChange={(event) => {
            onFile(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
      </label>
      <div className="field">
        <label className="field__label" htmlFor={fieldId}>
          Opis zdjęcia
        </label>
        <input className="field__control" id={fieldId} value={alt} onChange={(event) => onAlt(event.target.value)} />
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <input className="field__control" id={id} value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}

function photoSlots(content: SiteContent): PhotoSlot[] {
  return [
    {
      id: "hero",
      group: "Strona główna",
      label: "Duże zdjęcie na starcie",
      src: content.hero.backgroundImage,
      alt: content.hero.backgroundAlt,
    },
    ...content.home.tiles.map((tile) => ({
      id: `tile-${tile.id}`,
      group: "Strona główna",
      label: `Kafelek: ${tile.title}`,
      src: tile.imageSrc,
      alt: tile.imageAlt,
      position: tile.id === "team" ? "center 18%" : "center",
    })),
    {
      id: "about-hero",
      group: "O nas",
      label: "Baner O nas",
      src: content.about.pageHeroImage,
      alt: content.about.pageHeroAlt,
    },
    ...content.about.sections.map((section) => ({
      id: `about-${section.id}`,
      group: "O nas",
      label: section.title,
      src: section.imageSrc,
      alt: section.imageAlt,
    })),
    ...content.services.items.map((item) => ({
      id: `service-${item.id}`,
      group: "Usługi",
      label: item.title,
      src: item.imageSrc ?? "",
      alt: item.imageAlt ?? item.title,
    })),
    {
      id: "offers-hero",
      group: "Oferty",
      label: "Baner ofert",
      src: content.offers.pageHeroImage,
      alt: content.offers.pageHeroAlt,
    },
    ...content.offers.items.map((item) => ({
      id: `offer-${item.id}`,
      group: "Oferty",
      label: item.title,
      src: item.imageSrc,
      alt: item.imageAlt,
    })),
    {
      id: "reviews-hero",
      group: "Opinie",
      label: "Baner opinii",
      src: content.reviews.pageHeroImage,
      alt: content.reviews.pageHeroAlt,
    },
    {
      id: "team-hero",
      group: "Zespół, baner",
      label: "Baner zespołu",
      src: content.team.pageHeroImage,
      alt: content.team.pageHeroAlt,
      position: "center 18%",
    },
    {
      id: "contact-hero",
      group: "Kontakt",
      label: "Baner kontaktu",
      src: content.contact.pageHeroImage,
      alt: content.contact.pageHeroAlt,
    },
  ];
}

function applySrc(onChange: Dispatch<SetStateAction<SiteContent>>, id: string, src: string) {
  onChange((prev) => updateSlot(prev, id, { src }));
}

function applyAlt(onChange: Dispatch<SetStateAction<SiteContent>>, id: string, alt: string) {
  onChange((prev) => updateSlot(prev, id, { alt }));
}

function updateSlot(content: SiteContent, id: string, patch: { src?: string; alt?: string }): SiteContent {
  if (id === "hero") {
    return {
      ...content,
      hero: {
        ...content.hero,
        backgroundImage: patch.src ?? content.hero.backgroundImage,
        backgroundAlt: patch.alt ?? content.hero.backgroundAlt,
      },
    };
  }

  if (id.startsWith("tile-")) {
    const tileId = id.slice("tile-".length);
    return {
      ...content,
      home: {
        ...content.home,
        tiles: content.home.tiles.map((tile) =>
          tile.id === tileId
            ? { ...tile, imageSrc: patch.src ?? tile.imageSrc, imageAlt: patch.alt ?? tile.imageAlt }
            : tile,
        ),
      },
    };
  }

  if (id === "about-hero") {
    return {
      ...content,
      about: {
        ...content.about,
        pageHeroImage: patch.src ?? content.about.pageHeroImage,
        pageHeroAlt: patch.alt ?? content.about.pageHeroAlt,
      },
    };
  }

  if (id.startsWith("about-")) {
    const sectionId = id.slice("about-".length);
    return {
      ...content,
      about: {
        ...content.about,
        sections: content.about.sections.map((section) =>
          section.id === sectionId
            ? { ...section, imageSrc: patch.src ?? section.imageSrc, imageAlt: patch.alt ?? section.imageAlt }
            : section,
        ),
      },
    };
  }

  if (id.startsWith("service-")) {
    const itemId = id.slice("service-".length);
    return {
      ...content,
      services: {
        ...content.services,
        items: content.services.items.map((item) =>
          item.id === itemId
            ? { ...item, imageSrc: patch.src ?? item.imageSrc, imageAlt: patch.alt ?? item.imageAlt }
            : item,
        ),
      },
    };
  }

  if (id === "offers-hero") {
    return {
      ...content,
      offers: {
        ...content.offers,
        pageHeroImage: patch.src ?? content.offers.pageHeroImage,
        pageHeroAlt: patch.alt ?? content.offers.pageHeroAlt,
      },
    };
  }

  if (id.startsWith("offer-")) {
    const itemId = id.slice("offer-".length);
    return {
      ...content,
      offers: {
        ...content.offers,
        items: content.offers.items.map((item) =>
          item.id === itemId
            ? { ...item, imageSrc: patch.src ?? item.imageSrc, imageAlt: patch.alt ?? item.imageAlt }
            : item,
        ),
      },
    };
  }

  if (id === "reviews-hero") {
    return {
      ...content,
      reviews: {
        ...content.reviews,
        pageHeroImage: patch.src ?? content.reviews.pageHeroImage,
        pageHeroAlt: patch.alt ?? content.reviews.pageHeroAlt,
      },
    };
  }

  if (id === "team-hero") {
    return {
      ...content,
      team: {
        ...content.team,
        pageHeroImage: patch.src ?? content.team.pageHeroImage,
        pageHeroAlt: patch.alt ?? content.team.pageHeroAlt,
      },
    };
  }

  if (id === "contact-hero") {
    return {
      ...content,
      contact: {
        ...content.contact,
        pageHeroImage: patch.src ?? content.contact.pageHeroImage,
        pageHeroAlt: patch.alt ?? content.contact.pageHeroAlt,
      },
    };
  }

  return content;
}
