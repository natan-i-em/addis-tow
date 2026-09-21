"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, type Lang, type Dict } from "@/lib/i18n/dictionary";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "addistow-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always start in English so the server-rendered HTML (and first paint)
  // stays in English for search engines. The stored preference is applied
  // just after mount, client-side only.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "am" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l === "am" ? "am-ET" : "en-ET";
  };

  const value = useMemo(() => ({ lang, setLang, t: dictionaries[lang] }), [lang]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}

/** Replaces {placeholders} in a string, e.g. interpolate(t.hero.callBtn, { phone }) */
export function interpolate(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in vars ? String(vars[key]) : `{${key}}`
  );
}
