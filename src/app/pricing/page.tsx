import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Faq from "@/components/Faq";
import ContactCta from "@/components/ContactCta";
import { AdBudget, NextSteps, Plans, ProofStats, ScopeClarity, Terms } from "@/components/Marketing";
import { breadcrumbLd, pageMeta, SITE_NAME, SITE_URL } from "@/lib/seo";
import { pricingFaqs } from "@/lib/proposal";

export const metadata: Metadata = pageMeta(
  "/pricing",
  "Digital Marketing Pricing in Coimbatore | Plans from INR 25,000 - Creatoos",
  "Digital marketing plans from INR 25,000 per month: social media, reels, Meta and Google Ads, SEO, AEO and reporting. Ad spend paid directly by you, never marked up.",
);

// Starting prices as schema.org offers, so search and AI answers can quote them accurately.
const offersLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Creatoos digital marketing plans",
  url: `${SITE_URL}/pricing`,
  itemListElement: [
    { name: "Starter", price: 25000 },
    { name: "Growth", price: 40000 },
  ].map((p) => ({
    "@type": "Offer",
    name: `${p.name} digital marketing plan`,
    seller: { "@type": "Organization", name: SITE_NAME },
    priceSpecification: { "@type": "UnitPriceSpecification", price: p.price, priceCurrency: "INR", unitText: "MONTH", valueAddedTaxIncluded: false },
  })),
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Pricing", path: "/pricing" }]), offersLd]} />
      <PageHero
        eyebrow="Pricing · Digital marketing"
        title="Grow your brand with marketing that *performs.*"
        sub="A complete digital marketing partnership on a project basis: strategy, content, ads, SEO and reporting, run by one in-house team. Projects start from INR 25,000 a month."
        primary={{ label: "Book a Free Consultation", href: "/contact" }}
        secondary={{ label: "Compare plans", href: "#plans" }}
      />
      <Plans />
      <AdBudget />
      <ProofStats sectors={false} />
      <ScopeClarity />
      <Terms />
      <NextSteps />
      <Faq items={pricingFaqs} title="Pricing, answered." />
      <ContactCta />
    </>
  );
}
