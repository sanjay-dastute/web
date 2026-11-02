import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import ContactCta from "@/components/ContactCta";
import { SectionHead } from "@/components/home/Sections";
import ServiceDeck from "@/components/services/ServiceDeck";
import PathFinder from "@/components/services/PathFinder";
import FormatPanels from "@/components/services/FormatPanels";

export const metadata: Metadata = pageMeta("/services", "Services | Branding, Web, Marketing & AI - Creatoos", "Nine service lines under one roof: branding, logo design, web and app development, digital marketing, social media, SEO, AI search optimisation and strategy.");

const paths = [
  { title: "Launching something new", steps: ["Brand strategy", "Identity & logo", "Website", "Social setup", "Local SEO"] },
  { title: "Already trading, but invisible", steps: ["SEO audit", "Website rebuild", "Content operations", "AI search visibility"] },
  { title: "Getting leads but not converting", steps: ["Positioning review", "Messaging", "Landing pages", "Paid campaigns + testing"] },
  { title: "Established and scaling", steps: ["Market research", "Brand refresh", "App or platform build", "Full marketing retainer"] },
];

const formats = [
  { title: "Project", body: "Fixed scope, fixed fee. A defined deliverable with a written scope and delivery calendar." },
  { title: "Retainer", body: "Monthly, minimum three months. Ongoing marketing, content and search work with a named account lead." },
  { title: "Batch / cohort", body: "The same fixed-scope package delivered across a group of businesses - for accelerators, associations and franchises." },
  { title: "Workshop", body: "Half-day or full-day sessions for in-house teams on brand building, AI-assisted marketing and AI search." },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Services", path: "/services" }])} />
      <PageHero
        eyebrow="Services"
        title="Everything you need to be found, understood and *chosen*"
        sub="Buy one service or the whole stack. Most clients start with two or three and add the rest as they grow - and because it's all one team, the pieces actually fit together."
        primary={{ label: "Book a Free Consultation", href: "/contact" }}
      />

      <ServiceDeck />

      <section className="bg-haze py-[120px]">
        <div className="container-air">
          <SectionHead eyebrow="How services combine">Where are you <em className="cursive not-italic text-brand-deep">now?</em></SectionHead>
          <PathFinder paths={paths} />
        </div>
      </section>

      <section className="container-air py-[120px]">
        <SectionHead eyebrow="Engagement formats">Four ways to work with us</SectionHead>
        <FormatPanels formats={formats} />
      </section>

      <ContactCta />
    </>
  );
}
