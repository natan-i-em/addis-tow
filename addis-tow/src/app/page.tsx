import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Glyph from "@/components/Glyph";
import Faq from "@/components/Faq";
import RequestForm from "@/components/RequestForm";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import { site, services, areas, faqs, steps } from "@/lib/site";

export const metadata: Metadata = {
  title: `Tow truck in ${site.address.city} — call ${site.phoneDisplay}, 24/7`,
  description: `Flatbed towing, breakdown and accident recovery, jump starts and tire changes across ${site.address.city}. Average arrival ${site.responseMinutes} minutes. Price agreed before the truck leaves.`,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="hero">
        <div className="shell hero-grid">
          <div>
            <p className="hero-status">
              <span className="pulse" aria-hidden="true" />
              Dispatch open now · {site.trucks} trucks on shift
            </p>

            <h1>
              Stuck on the road
              <br />
              in {site.address.city}?
            </h1>

            <p className="hero-sub">
              Tell us the nearest landmark and a truck starts moving. You get the
              driver&apos;s name, his plate number, and the price — before he
              sets off.
            </p>

            <div className="hero-actions">
              <a className="btn btn-call" href={`tel:${site.phone}`}>
                Call {site.phoneDisplay}
              </a>
              <a className="btn btn-ghost" href="#request">
                Request a truck
              </a>
            </div>

            <dl className="hero-facts">
              <div>
                <dt>{site.responseMinutes} min</dt>
                <dd>Average arrival inside the ring road</dd>
              </div>
              <div>
                <dt>24/7</dt>
                <dd>Night calls cost the same as day calls</dd>
              </div>
              <div>
                <dt>{new Date().getFullYear() - site.foundingYear} yrs</dt>
                <dd>Recovering cars across the city</dd>
              </div>
            </dl>
          </div>

          <div className="card-quick" id="request">
            <h2>Request a truck</h2>
            <p className="hint">
              Three short steps. No account, no payment up front.
            </p>
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
            <h2>What we get called for</h2>
            <p className="lede">
              Most calls end one of two ways: fixed where you stand, or loaded
              and taken to the garage you name.
            </p>
          </Reveal>

          <div className="svc-grid">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 45}>
                <Link href={`/services/${s.slug}`} className="svc">
                  <Glyph name={s.glyph} />
                  <h3>{s.name}</h3>
                  <p>{s.short}</p>
                  <div className="svc-foot">
                    <span className="price">
                      {s.priceFrom.toLocaleString()} birr
                      <small>starting price</small>
                    </span>
                    <span className="svc-more">Details</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- process ---------------- */}
      <section style={{ background: "var(--concrete)" }}>
        <div className="shell">
          <Reveal>
            <h2>From your call to your garage</h2>
            <p className="lede">
              Four things happen, in this order, every time.
            </p>
          </Reveal>
          <div className="steps">
            {steps.map((s, i) => (
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
            <h2>Where we go</h2>
            <p className="lede">
              Anywhere inside the ring road, the expressway as far as Mojo, and
              the Debre Zeit and Sululta roads on request.
            </p>
          </Reveal>
          <div className="areas">
            {areas.map((a, i) => (
              <Reveal key={a.slug} delay={i * 40}>
                <Link href={`/towing/${a.slug}`} className="area">
                  <h3>
                    {a.name} <span className="eta">~{a.eta} min</span>
                  </h3>
                  <p>{a.nearby.join(" · ")}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- pricing ---------------- */}
      <section id="pricing" style={{ background: "var(--concrete)" }}>
        <div className="shell split">
          <Reveal>
            <h2>What it costs</h2>
            <p>
              The call-out fee covers the first 10 kilometres. After that it is
              90 birr per kilometre, charged from where your car is to where you
              want it — not from our yard.
            </p>
            <p>
              Dispatch quotes the full figure on the phone before the truck
              moves. If the job turns out to be different from what you
              described, the driver tells you the new price before he loads.
            </p>
            <ul style={{ listStyle: "none", padding: 0, marginTop: "1.5rem" }}>
              {services.slice(0, 5).map((s) => (
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
                  <span>{s.name}</span>
                  <strong>from {s.priceFrom.toLocaleString()} birr</strong>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="aside">
              <h3>Paying</h3>
              <p>
                Cash, telebirr or a CBE transfer once the car is delivered.
                Nothing is taken up front.
              </p>
              <p style={{ marginBottom: 0 }}>
                Ask for a receipt at the drop if you are claiming on insurance —
                it takes the driver a minute and saves you a trip later.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- safety ---------------- */}
      <section className="section-dark">
        <div className="shell">
          <Reveal>
            <h2>While you wait for us</h2>
            <p className="lede">
              The riskiest part of a breakdown is the twenty minutes before the
              truck arrives.
            </p>
          </Reveal>
          <ul className="safety">
            {[
              {
                t: "Hazards on, first",
                d: "Before anything else. On the ring road at night you are invisible without them.",
              },
              {
                t: "Get out on the safe side",
                d: "Everyone leaves through the doors away from traffic, then stands behind the barrier — not beside the car.",
              },
              {
                t: "Triangle 50 metres back",
                d: "Further on a curve or a downhill, so drivers see it in time to move over.",
              },
              {
                t: "Do not push across lanes",
                d: "A car that will not start is safer where it is than half way across a moving lane.",
              },
            ].map((x, i) => (
              <Reveal key={x.t} as="li" delay={i * 60}>
                <h3>{x.t}</h3>
                <p>{x.d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section id="faq">
        <div className="shell">
          <Reveal>
            <h2>Questions people ask us</h2>
          </Reveal>
          <Faq items={[...faqs]} />
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
            <h2 style={{ marginBottom: ".3rem" }}>Need a truck right now?</h2>
            <p style={{ margin: 0, color: "rgba(20,23,26,.75)" }}>
              Dispatch picks up in under three rings, every hour of the year.
            </p>
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

      <JsonLd data={faqSchema([...faqs])} />
    </>
  );
}
