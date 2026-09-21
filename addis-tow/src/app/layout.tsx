import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ActionBar from "@/components/ActionBar";
import JsonLd from "@/components/JsonLd";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { businessSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

/* Barlow was drawn from the low-contrast grotesques used on public transport
   and road signage — the right vernacular for a recovery service. */
const base = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-base",
  display: "swap",
});

const condensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — 24/7 tow truck service in ${site.address.city}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "tow truck Addis Ababa",
    "towing service Ethiopia",
    "flatbed towing Addis",
    "car breakdown recovery Addis Ababa",
    "24 hour tow truck near me",
    "accident recovery Ethiopia",
    "jump start Addis Ababa",
    "የመኪና ተሳቢ",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline} in ${site.address.city}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  category: "automotive",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1A1D21",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ET" className={`${base.variable} ${condensed.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <LanguageProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <ActionBar />
        </LanguageProvider>
        <JsonLd data={businessSchema()} />
      </body>
    </html>
  );
}
