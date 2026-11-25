"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReviewItem, SiteContent } from "@/types/content";

type ReviewsProps = {
  content: SiteContent["reviews"];
};

function ReviewCard({ review }: { review: ReviewItem }) {
  const filled = "★".repeat(review.rating);
  const empty = "☆".repeat(5 - review.rating);

  return (
    <figure className="review-card">
      <blockquote className="review-card__quote">
        <p>{review.quote}</p>
      </blockquote>
      <figcaption className="review-card__meta">
        <span className="review-card__stars" aria-hidden="true">
          {filled}
          {empty}
        </span>
        <span className="sr-only">Ocena {review.rating} na 5</span>
        <span className="review-card__author">{review.author}</span>
      </figcaption>
    </figure>
  );
}

export function Reviews({ content }: ReviewsProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ prev: false, next: false });
  const total = content.items.length;

  const measure = useCallback(() => {
    const track = trackRef.current;

    if (!track) return;

    setEdges({
      prev: track.scrollLeft > 4,
      next: track.scrollLeft + track.clientWidth < track.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    measure();
    const track = trackRef.current;

    if (!track) return;

    track.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      track.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure, total]);

  function turn(direction: -1 | 1) {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>(".review-card");

    if (!track || !card) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    const step = card.getBoundingClientRect().width + gap;
    const visible = Math.max(1, Math.round((track.clientWidth + gap) / step));

    track.scrollBy({ left: direction * step * visible, behavior: "smooth" });
  }

  if (total === 0) {
    return (
      <section className="section section--fog" aria-label="Lista opinii">
        <div className="section__inner">
          <p className="reviews__empty">Wkrótce pojawią się tu opinie klientów.</p>
        </div>
      </section>
    );
  }

  const showArrows = edges.prev || edges.next;

  return (
    <section className="section section--fog" aria-label="Lista opinii">
      <div className="section__inner">
        <div className="reviews__slider">
          {showArrows ? (
            <button
              className="reviews__arrow reviews__arrow--prev"
              type="button"
              onClick={() => turn(-1)}
              disabled={!edges.prev}
            >
              <span aria-hidden="true">‹</span>
              <span className="sr-only">Poprzednie opinie</span>
            </button>
          ) : null}
          <div
            className="reviews__track"
            ref={trackRef}
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") turn(-1);
              if (event.key === "ArrowRight") turn(1);
            }}
          >
            {content.items.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          {showArrows ? (
            <button
              className="reviews__arrow reviews__arrow--next"
              type="button"
              onClick={() => turn(1)}
              disabled={!edges.next}
            >
              <span aria-hidden="true">›</span>
              <span className="sr-only">Następne opinie</span>
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
