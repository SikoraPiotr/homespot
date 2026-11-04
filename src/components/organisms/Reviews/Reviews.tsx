import { Reveal } from "@/components/molecules/Reveal/Reveal";
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
  return (
    <section className="section section--fog" aria-label="Lista opinii">
      <div className="section__inner">
        {content.items.length === 0 ? (
          <p className="reviews__empty">Wkrótce pojawią się tu opinie klientów.</p>
        ) : (
          <div className="reviews__grid">
            {content.items.map((review, index) => (
              <Reveal key={review.id} className="reviews__item" delay={((index % 3) + 1) as 1 | 2 | 3}>
                <ReviewCard review={review} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
