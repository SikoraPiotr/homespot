import Image from "next/image";
import Link from "next/link";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Grochowska+63%2C+60-339+Pozna%C5%84";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand-block">
          <Link className="site-footer__brand-link" href="/" aria-label="Homespot Nieruchomości, strona startowa">
            <Image
              className="site-footer__mark"
              src="/brand/logo-mark-cyan.svg"
              alt=""
              width={40}
              height={40}
              loading="lazy"
              decoding="async"
              aria-hidden
            />
            <Image
              className="site-footer__logotyp"
              src="/brand/logotyp-white-flat.svg"
              alt=""
              width={768}
              height={215}
              loading="lazy"
              decoding="async"
              aria-hidden
            />
          </Link>
          <p className="site-footer__copy">© {year} Homespot Nieruchomości</p>
        </div>
        <p className="site-footer__copy">
          <a className="site-footer__maps" href={MAPS_URL} target="_blank" rel="noreferrer">
            Grochowska 63, 60-339 Poznań
          </a>
        </p>
      </div>
    </footer>
  );
}
