"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import type { ReviewItem, SiteContent } from "@/types/content";

type ReviewsProps = {
  content: SiteContent["reviews"];
};

const GAP_PX = 16;

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

function useVisibleCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 64rem)").matches) {
        setCount(3);
      } else if (window.matchMedia("(min-width: 40rem)").matches) {
        setCount(2);
      } else {
        setCount(1);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

export function Reviews({ content }: ReviewsProps) {
  const visible = useVisibleCount();
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const total = content.items.length;
  const maxIndex = Math.max(0, total - visible);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) {
      return;
    }

    const measure = () => {
      const width = node.clientWidth;
      const itemWidth = (width - (visible - 1) * GAP_PX) / visible;
      setStep(itemWidth + GAP_PX);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, total]);

  if (total === 0) {
    return (
      <section className="section section--fog" aria-label="Lista opinii">
        <div className="section__inner">
          <p className="reviews__empty">Wkrótce pojawią się tu opinie klientów.</p>
        </div>
      </section>
    );
  }

  const canPrev = index > 0;
  const canNext = index < maxIndex;
  const offset = step * index;

  return (
    <section className="section section--fog" aria-label="Lista opinii">
      <div className="section__inner">
        <div className="reviews__carousel">
          <div className="reviews__toolbar">
            <p className="reviews__count">
              {index + 1}-{Math.min(index + visible, total)} z {total}
            </p>
            <div className="reviews__controls">
              <Button
                variant="ghost"
                aria-label="Poprzednie opinie"
                disabled={!canPrev}
                onClick={() => setIndex((value) => Math.max(0, value - 1))}
              >
                ←
              </Button>
              <Button
                variant="ghost"
                aria-label="Następne opinie"
                disabled={!canNext}
                onClick={() => setIndex((value) => Math.min(maxIndex, value + 1))}
              >
                →
              </Button>
            </div>
          </div>

          <div
            className="reviews__viewport"
            ref={viewportRef}
            style={{ ["--reviews-visible" as string]: String(visible), ["--reviews-gap" as string]: `${GAP_PX}px` }}
          >
            <div
              className={
                reduceMotion ? "reviews__track reviews__track--instant" : "reviews__track"
              }
              style={{ transform: `translate3d(-${offset}px, 0, 0)` }}
            >
              {content.items.map((review) => (
                <div className="reviews__item" key={review.id}>
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
