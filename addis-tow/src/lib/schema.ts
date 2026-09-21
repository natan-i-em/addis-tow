import { site, services, areas, faqs, type Service, type Area } from "./site";

/**
 * Structured data is how Google understands that this is a local emergency
 * service with a phone number, a service area and prices. It is what produces
 * the star rating, the FAQ dropdowns and the "open 24 hours" line in results.
 */

const id = (path: string) => `${site.url}${path}`;

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": id("/#business"),
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    priceRange: "ETB 500 – 25,000",
    foundingDate: String(site.foundingYear),
    image: id("/opengraph-image"),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: areas.map((a) => ({
      "@type": "Place",
      name: `${a.name}, ${site.address.city}`,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Towing and roadside services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, description: s.short },
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: s.priceFrom,
          priceCurrency: "ETB",
        },
      })),
    },
    sameAs: [site.telegram],
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": id(`/services/${service.slug}#service`),
    name: service.headline,
    description: service.description,
    serviceType: service.name,
    provider: { "@id": id("/#business") },
    areaServed: { "@type": "City", name: site.address.city },
    offers: {
      "@type": "Offer",
      priceCurrency: "ETB",
      price: service.priceFrom,
      availability: "https://schema.org/InStock",
    },
  };
}

export function areaSchema(area: Area) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": id(`/towing/${area.slug}#service`),
    name: `Tow truck service in ${area.name}, ${site.address.city}`,
    description: area.note,
    provider: { "@id": id("/#business") },
    areaServed: {
      "@type": "Place",
      name: `${area.name}, ${site.address.city}`,
      containedInPlace: { "@type": "City", name: site.address.city },
    },
  };
}

export function faqSchema(list: { q: string; a: string }[] = [...faqs]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: list.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: id(item.path),
    })),
  };
}
