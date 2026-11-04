import { Reveal } from "@/components/molecules/Reveal/Reveal";
import { cn } from "@/lib/cn";
import type { ProcessContent } from "@/types/content";
import { ProcessGlyph } from "./ProcessGlyph";

type ProcessTimelineProps = {
  content: ProcessContent;
};

export function ProcessTimeline({ content }: ProcessTimelineProps) {
  return (
    <section className="section section--deep" aria-labelledby="process-title">
      <div className="section__inner">
        <Reveal>
          <p className="process__eyebrow">{content.eyebrow}</p>
          <h2 className="process__title" id="process-title">
            {content.title}
          </h2>
        </Reveal>
        <div className="process__board">
          <ol className="process__list">
            {content.steps.map((step, index) => {
              const isFinal = index === content.steps.length - 1;

              return (
                <li className={cn("process__step", isFinal && "process__step--final")} key={step.id}>
                  <span className={cn("process__icon", isFinal && "process__icon--final")}>
                    <ProcessGlyph name={step.id} />
                  </span>
                  <div className="process__copy">
                    <span className="process__index">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="process__step-title">{step.title}</h3>
                    <p className="process__step-text">{step.text}</p>
                  </div>
                  <span className="process__dot" aria-hidden="true" />
                </li>
              );
            })}
          </ol>
          <span className="process__rail process__rail--1" aria-hidden="true" />
          <span className="process__rail process__rail--2" aria-hidden="true" />
          <span className="process__rail process__rail--3" aria-hidden="true" />
          <span className="process__bend process__bend--right" aria-hidden="true" />
          <span className="process__bend process__bend--left" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
