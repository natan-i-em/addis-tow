"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#coverage", label: "Where we go" },
  { href: "/#pricing", label: "Prices" },
  { href: "/#faq", label: "Questions" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

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

        <a className="header-phone" href={`tel:${site.phone}`}>
          <span className="pulse" aria-hidden="true" />
          {site.phoneDisplay}
        </a>

        <button
          className="burger"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? "Close" : "Menu"}
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
          Request a truck
        </Link>
      </div>

      <div className="chevrons chevrons-thin" aria-hidden="true" />
    </header>
  );
}
