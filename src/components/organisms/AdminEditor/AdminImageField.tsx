"use client";

import { useId, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { AdminField } from "./AdminField";

type AdminImageFieldProps = {
  label: string;
  src: string;
  alt: string;
  onSrcChange: (src: string) => void;
  onAltChange: (alt: string) => void;
};

export function AdminImageField({
  label,
  src,
  alt,
  onSrcChange,
  onAltChange,
}: AdminImageFieldProps) {
  const inputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFileChange(file: File | undefined) {
    if (!file) {
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      const payload = (await response.json()) as { path?: string; error?: string };

      if (!response.ok || !payload.path) {
        throw new Error(payload.error ?? "Upload nieudany.");
      }

      onSrcChange(payload.path);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload nieudany.");
    } finally {
      setUploading(false);
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  }

  return (
    <div className="admin__image">
      <div className="admin__image-head">
        <h3 className="admin__list-title">{label}</h3>
        <div className="admin__image-actions">
          <input
            ref={fileRef}
            id={inputId}
            className="admin__file-input"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
            onChange={(event) => onFileChange(event.target.files?.[0])}
          />
          <Button
            variant="ghost"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
          >
            {uploading ? "Wgrywanie..." : "Wybierz zdjęcie"}
          </Button>
        </div>
      </div>

      <div className="admin__image-preview">
        {src ? (
          // Preview only in CMS; next/image not required here.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" className="admin__image-thumb" />
        ) : (
          <div className="admin__image-empty">Brak zdjęcia</div>
        )}
        <p className="admin__hint">{src || "Ścieżka pojawi się po wgraniu."}</p>
      </div>

      <AdminField
        id={`${inputId}-alt`}
        label="Tekst alternatywny"
        value={alt}
        onChange={onAltChange}
      />

      {error ? (
        <p className="field__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
