import type { Metadata } from "next";
import HomeContent from "@/components/home/HomeContent";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import { site, faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: `Tow truck in ${site.address.city} — call ${site.phoneDisplay}, 24/7`,
  description: `Flatbed towing, breakdown and accident recovery, jump starts and tire changes across ${site.address.city}. Average arrival ${site.responseMinutes} minutes. Price agreed before the truck leaves.`,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <HomeContent />
      {/* Structured data stays in English — it's read by Google, not by
          the visitor, and the toggle only affects what's on screen. */}
      <JsonLd data={faqSchema([...faqs])} />
    </>
  );
}
