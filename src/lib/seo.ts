import type { Metadata } from "next";
import { contact, services } from "./content";

export const SITE_URL = "https://creatoos.com";
export const SITE_NAME = "Creatoos";

/** Per-page metadata with canonical URL, Open Graph and Twitter cards. */
export function pageMeta(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    // Explicit image: a page-level openGraph object replaces the root opengraph-image file convention.
    openGraph: { type: "website", url: path, siteName: SITE_NAME, title, description, locale: "en_IN", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}

const sameAs = contact.socials.map((s) => s.href);

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  image: `${SITE_URL}/opengraph-image`,
  description:
    "Creatoos is a creative and technology studio in Coimbatore, Tamil Nadu. Branding, logo design, web and app development, digital marketing, social media, SEO and AI search optimisation (AEO/GEO) for growing businesses, with an AI-assisted process and human editorial review.",
  slogan: "Brands built to be understood. Fast.",
  email: contact.email,
  telephone: contact.phone.replace(/\s/g, ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: "38A, Chettipalayam Street, Rukmani Colony, Veerakeralam",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    postalCode: "641007",
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "City", name: "Coimbatore" },
    { "@type": "State", name: "Tamil Nadu" },
    { "@type": "Country", name: "India" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:30",
    closes: "18:30",
  },
  founder: { "@type": "Person", name: "Jeyenth Jayaraman", jobTitle: "Founder & CEO" },
  knowsAbout: [
    "Brand strategy", "Brand identity design", "Logo design", "Web development", "E-commerce development",
    "Mobile app development", "Performance marketing", "Social media management", "Search engine optimisation",
    "Answer Engine Optimisation (AEO)", "Generative Engine Optimisation (GEO)", "Market research",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Creatoos services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, url: `${SITE_URL}/services/${s.slug}` },
    })),
  },
  sameAs,
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
};

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}

export function serviceLd(slug: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${slug}#service`,
    name,
    description,
    url: `${SITE_URL}/services/${slug}`,
    serviceType: name,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "India" },
  };
}
