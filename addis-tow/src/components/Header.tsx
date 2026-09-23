"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import LanguageToggle from "@/lib/i18n/LanguageToggle";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

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
        <Link href="/" className="brand" aria-label={`${site.name} home`}>
          <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M2 25h28" stroke="#FFC300" strokeWidth="2.5" />
            <path
              d="M5 21v-8h12l4 5h6v3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="M7 13 19 5" stroke="#FFC300" strokeWidth="2" />
          </svg>
          {site.name}
        </Link>

        <nav className="nav" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="header-lang-wrap" style={{ display: "flex", alignItems: "center", gap: "1.1rem" }}>
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
        <Link href="/request" onClick={() => setOpen(false)}>
          {t.nav.requestTruck}
        </Link>
        <div style={{ paddingTop: ".9rem" }}>
          <LanguageToggle compact />
        </div>
      </div>

      <div className="chevrons chevrons-thin" aria-hidden="true" />
    </header>
  );
}
