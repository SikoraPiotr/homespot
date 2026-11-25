import Image from "next/image";

type SiteFooterProps = {
  addressLines: string[];
  mapsUrl: string;
};

export function SiteFooter({ addressLines, mapsUrl }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand-block">
          <span className="site-footer__lockup">
            <Image
              className="site-footer__mark"
              src="/brand/logo-mark-cyan.svg"
              alt=""
              width={64}
              height={64}
            />
            <Image
              className="site-footer__wordmark"
              src="/brand/logotyp-white-flat.svg"
              alt="Homespot Nieruchomości"
              width={768}
              height={215}
            />
          </span>
          <p className="site-footer__copy">© {year} Homespot Nieruchomości</p>
        </div>
        <p className="site-footer__copy">
          <a className="site-footer__address" href={mapsUrl}>
            {addressLines.join(", ")}
          </a>
        </p>
      </div>
    </footer>
  );
}
