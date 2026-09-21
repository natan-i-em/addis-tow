"use client";

import Link from "next/link";
import { site, services, areas } from "@/lib/site";
import { useLanguage, interpolate } from "@/lib/i18n/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="chevrons" aria-hidden="true" style={{ marginBottom: "3rem" }} />
      <div className="shell">
        <div className="footer-grid">
          <div>
            <h4>{site.name}</h4>
            <p style={{ color: "inherit" }}>
              {interpolate(t.footer.taglineLine, {
                tagline: t.footer.tagline,
                city: site.address.city,
              })}
            </p>
            <p style={{ color: "inherit", margin: 0 }}>
              <a href={`tel:${site.phone}`} style={{ color: "var(--hi-vis)" }}>
                {site.phoneDisplay}
              </a>
              <br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>

          <div>
            <h4>{t.footer.servicesHeading}</h4>
            <ul>
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>
                    {t.services.items[s.slug]?.name ?? s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{t.footer.areasHeading}</h4>
            <ul>
              {areas.slice(0, 6).map((a) => (
                <li key={a.slug}>
                  <Link href={`/towing/${a.slug}`}>
                    {t.coverage.items[a.slug]?.name ?? a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{t.footer.findUsHeading}</h4>
            <address style={{ fontStyle: "normal" }}>
              {site.address.street}
              <br />
              {site.address.city}, Ethiopia
            </address>
            <ul style={{ marginTop: "1rem" }}>
              <li>
                <a href={site.telegram}>{t.footer.telegram}</a>
              </li>
              <li>
                <Link href="/request">{t.nav.requestTruck}</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-base">
          <span>
            {interpolate(t.footer.sinceLine, {
              year: String(new Date().getFullYear()),
              legalName: site.legalName,
              foundingYear: String(site.foundingYear),
            })}
          </span>
          <span>{t.footer.openHoursLine}</span>
        </div>
      </div>
    </footer>
  );
}
