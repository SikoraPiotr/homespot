"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error ?? "Logowanie nieudane.");
      }

      router.replace("/admin");
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Błąd logowania.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="admin">
      <div className="admin__shell">
        <section className="admin__card">
          <h1 className="admin__title">Homespot CMS</h1>
          <p className="admin__lead">Zaloguj się, aby edytować treści strony.</p>

          <form className="admin__form" onSubmit={onSubmit}>
            <div className="field">
              <label className="field__label" htmlFor="admin-user">
                Login
              </label>
              <input
                className="field__control"
                id="admin-user"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>

            <div className="field">
              <label className="field__label" htmlFor="admin-password">
                Hasło
              </label>
              <input
                className="field__control"
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            {error ? (
              <p className="field__error" role="alert">
                {error}
              </p>
            ) : null}

            <Button type="submit" disabled={pending} fullWidth>
              {pending ? "Logowanie..." : "Zaloguj"}
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
}
