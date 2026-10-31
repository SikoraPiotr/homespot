"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/atoms/Button/ButtonLink";
import { SocialLinks } from "@/components/molecules/SocialLinks/SocialLinks";
import type { SiteContent } from "@/types/content";

type HeroProps = {
  content: SiteContent["hero"];
  social: SiteContent["social"];
};

export function Hero({ content, social }: HeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero" id="start" aria-labelledby="hero-slogan">
      <div className="hero__media" aria-hidden="true">
        <Image src={content.backgroundImage} alt="" fill priority sizes="100vw" />
      </div>
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__sheen" aria-hidden="true" />
      <div className="hero__particles" aria-hidden="true">
        <span className="hero__particle" />
        <span className="hero__particle" />
        <span className="hero__particle" />
        <span className="hero__particle" />
        <span className="hero__particle" />
        <span className="hero__particle" />
      </div>

      <div className="hero__content">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hero__brand-line">Homespot Nieruchomości</p>
          <h1 className="hero__slogan" id="hero-slogan">
            <span>{content.slogan}</span>
          </h1>
          <div className="hero__actions">
            <ButtonLink href="/oferty">Zobacz oferty</ButtonLink>
            <ButtonLink href="/kontakt" variant="ghost">
              Napisz do nas
            </ButtonLink>
          </div>
        </motion.div>

        <motion.div
          className="hero__social"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hero__social-heading">{content.socialHeading}</p>
          <SocialLinks items={social} />
        </motion.div>
      </div>

      <a className="hero__scroll" href="#home-intro" aria-label="Przewiń do wprowadzenia">
        <span>Przewiń</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>

      <span className="sr-only">{content.backgroundAlt}</span>
    </section>
  );
}
