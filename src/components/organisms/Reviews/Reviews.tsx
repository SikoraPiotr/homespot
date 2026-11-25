"use client";

import { useEffect, useState } from "react";
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
  const [pageSize, setPageSize] = useState(1);
  const [page, setPage] = useState(0);
  const total = content.items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const visible = content.items.slice(safePage * pageSize, safePage * pageSize + pageSize);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 64rem)");
    const apply = () => setPageSize(query.matches ? 4 : 1);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    setPage(0);
  }, [pageSize]);

  if (total === 0) {
    return (
      <section className="section section--fog" aria-label="Lista opinii">
        <div className="section__inner">
          <p className="reviews__empty">Wkrótce pojawią się tu opinie klientów.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section section--fog" aria-label="Lista opinii">
      <div className="section__inner reviews__panel">
        <div className="reviews__grid">
          {visible.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
        {pageCount > 1 ? (
          <div className="reviews__nav">
            <button
              className="reviews__arrow"
              type="button"
              onClick={() => setPage((current) => Math.max(0, current - 1))}
              disabled={safePage === 0}
            >
              <span aria-hidden="true">‹</span>
              <span className="sr-only">Poprzednie opinie</span>
            </button>
            <p className="reviews__page">
              {safePage + 1} / {pageCount}
            </p>
            <button
              className="reviews__arrow"
              type="button"
              onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}
              disabled={safePage === pageCount - 1}
            >
              <span aria-hidden="true">›</span>
              <span className="sr-only">Następne opinie</span>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
