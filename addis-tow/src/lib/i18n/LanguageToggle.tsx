"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language / ቋንቋ"
      style={{
        display: "inline-flex",
        border: "1px solid var(--asphalt-3)",
        borderRadius: "2px",
        overflow: "hidden",
        fontFamily: "var(--font-condensed)",
        fontSize: compact ? "0.95rem" : "0.85rem",
      }}
    >
      {(["en", "am"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          style={{
            border: "none",
            cursor: "pointer",
            padding: compact ? "0.5rem 0.8rem" : "0.35rem 0.65rem",
            background: lang === l ? "var(--hi-vis)" : "transparent",
            color: lang === l ? "var(--ink)" : "var(--muted-dark)",
            fontWeight: 700,
          }}
        >
          {l === "en" ? "EN" : "አማ"}
        </button>
      ))}
    </div>
  );
}
