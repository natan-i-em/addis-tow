import Link from "next/link";
import { site, services, areas } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="chevrons" aria-hidden="true" style={{ marginBottom: "3rem" }} />
      <div className="shell">
        <div className="footer-grid">
          <div>
            <h4>{site.name}</h4>
            <p style={{ color: "inherit" }}>
              {site.tagline} across {site.address.city}. Dispatch answers every
              hour of the year.
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
            <h4>Services</h4>
            <ul>
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Areas</h4>
            <ul>
              {areas.slice(0, 6).map((a) => (
                <li key={a.slug}>
                  <Link href={`/towing/${a.slug}`}>Towing in {a.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Find us</h4>
            <address style={{ fontStyle: "normal" }}>
              {site.address.street}
              <br />
              {site.address.city}, Ethiopia
            </address>
            <ul style={{ marginTop: "1rem" }}>
              <li>
                <a href={site.telegram}>Telegram</a>
              </li>
              <li>
                <Link href="/request">Request a truck</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-base">
          <span>
            © {new Date().getFullYear()} {site.legalName}. Operating since{" "}
            {site.foundingYear}.
          </span>
          <span>Open 24 hours, including public holidays.</span>
        </div>
      </div>
    </footer>
  );
}
