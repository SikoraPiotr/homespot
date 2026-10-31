import { BrandLockup } from "@/components/atoms/BrandLockup/BrandLockup";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand-block">
          <BrandLockup variant="footer" />
          <p className="site-footer__copy">© {year} Homespot Nieruchomości</p>
        </div>
        <p className="site-footer__copy">Grochowska 63, 60-339 Poznań</p>
      </div>
    </footer>
  );
}
