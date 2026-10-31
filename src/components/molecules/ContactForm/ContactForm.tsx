"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/atoms/Button/Button";

type ContactFormProps = {
  successMessage: string;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export function ContactForm({ successMessage }: ContactFormProps) {
  const [values, setValues] = useState<FormState>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error ?? "Nie udało się wysłać formularza.");
      }

      setSuccess(true);
      setValues(initialState);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Wystąpił błąd.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="contact__form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label className="field__label" htmlFor="contact-name">
          Imię i nazwisko
        </label>
        <input
          className="field__control"
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          value={values.name}
          onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="contact-email">
          E-mail
        </label>
        <input
          className="field__control"
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="contact-phone">
          Telefon
        </label>
        <input
          className="field__control"
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(event) => setValues((prev) => ({ ...prev, phone: event.target.value }))}
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="contact-message">
          Wiadomość
        </label>
        <textarea
          className="field__control field__control--area"
          id="contact-message"
          name="message"
          required
          value={values.message}
          onChange={(event) => setValues((prev) => ({ ...prev, message: event.target.value }))}
        />
      </div>

      {error ? (
        <p className="field__error" role="alert">
          {error}
        </p>
      ) : null}

      {success ? (
        <p className="contact__status" role="status">
          {successMessage}
        </p>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Wysyłanie..." : "Wyślij wiadomość"}
      </Button>
    </form>
  );
}
