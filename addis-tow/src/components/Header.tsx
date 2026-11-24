"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";
import { useLanguage, interpolate } from "@/lib/i18n/LanguageProvider";
import LanguageToggle from "@/lib/i18n/LanguageToggle";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  // "Rapid Tow Truck" -> big "Rapid" + small "TOW TRUCK" underneath
  const [brandFirst, ...brandRest] = site.name.split(" ");

  const links = [
    { href: "/#services", label: t.nav.services },
    { href: "/#coverage", label: t.nav.coverage },
    { href: "/#pricing", label: t.nav.pricing },
    { href: "/#gallery", label: t.nav.gallery },
    { href: "/#faq", label: t.nav.faq },
  ];

  return (
    <header className="header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label={site.name}>
          <span className="brand-plate">
            <Image
              src="/logo.png"
              alt={site.name}
              width={1024}
              height={683}
              priority
              className="brand-logo"
              style={{ height: 34, width: "auto" }}
            />
          </span>
          <span className="brand-text">
            <span className="brand-name">{brandFirst}</span>
            {brandRest.length > 0 && (
              <span className="brand-sub">{brandRest.join(" ")}</span>
            )}
          </span>
        </Link>

        <nav className="nav" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div
          className="header-lang-wrap"
          style={{ display: "flex", alignItems: "center", gap: "1.1rem" }}
        >
          <LanguageToggle />
          <a className="header-phone" href={`tel:${site.phone}`}>
            <span className="pulse" aria-hidden="true" />
            {site.phoneDisplay}
          </a>
        </div>

        <button
          className="burger"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? t.nav.close : t.nav.menu}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`shell drawer ${open ? "open" : ""}`}
        hidden={!open}
      >
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <a href={`tel:${site.phone}`} onClick={() => setOpen(false)}>
          {interpolate(t.hero.callBtn, { phone: site.phoneDisplay })}
        </a>
        <div style={{ paddingTop: ".9rem" }}>
          <LanguageToggle compact />
        </div>
      </div>

      <div className="chevrons chevrons-thin" aria-hidden="true" />
    </header>
  );
}
