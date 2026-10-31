"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type FlipCardProps = {
  title: string;
  front: ReactNode;
  back: ReactNode;
  className?: string;
  hint?: string;
};

export function FlipCard({
  title,
  front,
  back,
  className,
  hint = "Najechanie lub fokus odwraca kartę",
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const cardId = useId();

  return (
    <article
      className={cn("flip-card", flipped && "is-flipped", className)}
      aria-labelledby={cardId}
    >
      <button
        type="button"
        className="sr-only"
        aria-pressed={flipped}
        onClick={() => setFlipped((value) => !value)}
      >
        {flipped ? `Pokaż przód karty: ${title}` : `Pokaż tył karty: ${title}`}
      </button>
      <div className="flip-card__inner">
        <div className="flip-card__face flip-card__face--front">
          {front}
          <p className="flip-card__hint">{hint}</p>
        </div>
        <div className="flip-card__face flip-card__face--back">{back}</div>
      </div>
      <span id={cardId} className="sr-only">
        {title}
      </span>
    </article>
  );
}
