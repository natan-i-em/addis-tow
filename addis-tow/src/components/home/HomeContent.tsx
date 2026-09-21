"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import Glyph from "@/components/Glyph";
import Faq from "@/components/Faq";
import RequestForm from "@/components/RequestForm";
import { site, services, areas } from "@/lib/site";
import { useLanguage, interpolate } from "@/lib/i18n/LanguageProvider";

export default function HomeContent() {
  const { t } = useLanguage();

  

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="hero">
        <div className="shell hero-grid">
          <div>
            <p className="hero-status">
              <span className="pulse" aria-hidden="true" />
              {interpolate(t.hero.status, { trucks: String(site.trucks) })}
            </p>

            <h1>
              {t.hero.h1a}
              <br />
              {interpolate(t.hero.h1b, { city: site.address.city })}
            </h1>

            <p className="hero-sub">{t.hero.sub}</p>

            <div className="hero-actions">
              <a className="btn btn-call" href={`tel:${site.phone}`}>
                {interpolate(t.hero.callBtn, { phone: site.phoneDisplay })}
              </a>
              <a className="btn btn-ghost" href="#request">
                {t.hero.requestBtn}
              </a>
            </div>

            <dl className="hero-facts">
              <div>
                <dt>{site.responseMinutes} {t.coverage.etaSuffix}</dt>
                <dd>{t.hero.factEtaLabel}</dd>
              </div>
              <div>
                <dt>{t.hero.fact247}</dt>
                <dd>{t.hero.fact247Label}</dd>
              </div>
              <div>
                <dt>{new Date().getFullYear() - site.foundingYear} yrs</dt>
                <dd>{t.hero.factYearsLabel}</dd>
              </div>
            </dl>
          </div>

          <div className="card-quick" id="request">
            <h2>{t.hero.quickTitle}</h2>
            <p className="hint">{t.hero.quickHint}</p>
            <RequestForm variant="compact" />
          </div>
        </div>

        {/* A truck drives the width of the hero once, on load. */}
        <div className="shell">
          <div className="road" aria-hidden="true">
            <svg className="truck" viewBox="0 0 132 46" fill="none">
              <rect
                className="beacon"
                x="34"
                y="6"
                width="12"
                height="4"
                fill="currentColor"
              />
              <path
                d="M8 34V14h34v20M42 22h18l14 12v0"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path d="M74 34h44" stroke="currentColor" strokeWidth="2.5" />
              <path
                d="M82 34 118 20"
                stroke="currentColor"
                strokeWidth="2"
                opacity=".55"
              />
              <circle cx="24" cy="38" r="6" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="66" cy="38" r="6" stroke="currentColor" strokeWidth="2.5" />
            </svg>
          </div>
        </div>
      </section>

      <div className="chevrons" aria-hidden="true" />

      {/* ---------------- services ---------------- */}
      <section id="services">
        <div className="shell">
          <Reveal>
            <h2>{t.services.sectionTitle}</h2>
            <p className="lede">{t.services.sectionLede}</p>
          </Reveal>

          <div className="svc-grid">
            {services.map((s, i) => {
              const copy = t.services.items[s.slug];
              return (
                <Reveal key={s.slug} delay={i * 45}>
                  <Link href={`/services/${s.slug}`} className="svc">
                    <Glyph name={s.glyph} />
                    <h3>{copy?.name ?? s.name}</h3>
                    <p>{copy?.short ?? s.short}</p>
                    <div className="svc-foot">
                      <span className="price">
                        {s.priceFrom.toLocaleString()} {t.services.priceFromSuffix}
                        <small>{t.services.startingPrice}</small>
                      </span>
                      <span className="svc-more">{t.services.detailsLink}</span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- process ---------------- */}
      <section style={{ background: "var(--concrete)" }}>
        <div className="shell">
          <Reveal>
            <h2>{t.steps.sectionTitle}</h2>
            <p className="lede">{t.steps.sectionLede}</p>
          </Reveal>
          <div className="steps">
            {t.steps.items.map((s: any, i: any) => (
              <Reveal key={s.title} delay={i * 70} className="step">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- coverage ---------------- */}
      <section id="coverage">
        <div className="shell">
          <Reveal>
            <h2>{t.coverage.sectionTitle}</h2>
            <p className="lede">{t.coverage.sectionLede}</p>
          </Reveal>
          <div className="areas">
            {areas.map((a, i) => {
              const copy = t.coverage.items[a.slug];
              return (
                <Reveal key={a.slug} delay={i * 40}>
                  <Link href={`/towing/${a.slug}`} className="area">
                    <h3>
                      {copy?.name ?? a.name}{" "}
                      <span className="eta">
                        ~{a.eta} {t.coverage.etaSuffix}
                      </span>
                    </h3>
                    <p>{a.nearby.join(" · ")}</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- pricing ---------------- */}
      <section id="pricing" style={{ background: "var(--concrete)" }}>
        <div className="shell split">
          <Reveal>
            <h2>{t.pricing.sectionTitle}</h2>
            <p>{t.pricing.p1}</p>
            <p>{t.pricing.p2}</p>
            <ul style={{ listStyle: "none", padding: 0, marginTop: "1.5rem" }}>
              {services.slice(0, 5).map((s) => {
                const copy = t.services.items[s.slug];
                return (
                  <li
                    key={s.slug}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "1rem",
                      padding: ".7rem 0",
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    <span>{copy?.name ?? s.name}</span>
                    <strong>
                      {interpolate(t.form.priceFromOption, {
                        price: s.priceFrom.toLocaleString(),
                      })}
                    </strong>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="aside">
              <h3>{t.pricing.payingTitle}</h3>
              <p>{t.pricing.payingP1}</p>
              <p style={{ marginBottom: 0 }}>{t.pricing.payingP2}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- safety ---------------- */}
      <section className="section-dark">
        <div className="shell">
          <Reveal>
            <h2>{t.safety.sectionTitle}</h2>
            <p className="lede">{t.safety.sectionLede}</p>
          </Reveal>
          <ul className="safety">
            {t.safety.items.map((x: any, i: any) => (
              <Reveal key={x.title} as="li" delay={i * 60}>
                <h3>{x.title}</h3>
                <p>{x.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section id="faq">
        <div className="shell">
          <Reveal>
            <h2>{t.faq.sectionTitle}</h2>
          </Reveal>
          <Faq items={t.faq.items} />
        </div>
      </section>

      {/* ---------------- closing cta ---------------- */}
      <section
        style={{
          background: "var(--hi-vis)",
          paddingBlock: "clamp(2.5rem,6vw,4rem)",
        }}
      >
        <div
          className="shell"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2 style={{ marginBottom: ".3rem" }}>{t.cta.title}</h2>
            <p style={{ margin: 0, color: "rgba(20,23,26,.75)" }}>{t.cta.sub}</p>
          </div>
          <a
            className="btn btn-ink"
            href={`tel:${site.phone}`}
            style={{ fontSize: "1.5rem", padding: "1rem 2rem" }}
          >
            {site.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}
