import { SectionHeader } from "@/components/atoms/SectionHeader/SectionHeader";
import { ContactForm } from "@/components/molecules/ContactForm/ContactForm";
import { Reveal } from "@/components/molecules/Reveal/Reveal";
import type { SiteContent } from "@/types/content";

type ContactProps = {
  content: SiteContent["contact"];
  showHeader?: boolean;
};

export function Contact({ content, showHeader = false }: ContactProps) {
  return (
    <section className="section section--lux" aria-labelledby={showHeader ? "contact-title" : "contact-details-heading"}>
      <div className="section__inner contact__layout">
        <Reveal>
          <div className="contact__details">
            {showHeader ? (
              <SectionHeader
                eyebrow={content.eyebrow}
                title={content.title}
                titleId="contact-title"
              />
            ) : (
              <h2 className="contact__aside-title" id="contact-details-heading">
                Biuro Homespot
              </h2>
            )}
            <address className="contact__address">
              {content.addressLines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </address>
            <a className="contact__email" href={`mailto:${content.email}`}>
              {content.email}
            </a>
          </div>
        </Reveal>

        <Reveal delay={2}>
          <ContactForm successMessage={content.formSuccess} />
        </Reveal>
      </div>
    </section>
  );
}
