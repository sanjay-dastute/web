import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import ContactCta from "@/components/ContactCta";
import WorkGrid from "@/components/WorkGrid";

export const metadata: Metadata = pageMeta("/work", "Our Work | Branding, Web & Marketing Case Studies - Creatoos", "Selected projects across healthcare, hospitality, retail and D2C. Branding, websites, campaigns and search work from Creatoos, Coimbatore.");

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Work", path: "/work" }])} />
      <PageHero
        eyebrow="Work"
        title="Work we're happy to put our *name* on"
        sub="Filter by service. Every project lists what we did and, where the client allows, what happened next."
      />
      <WorkGrid />
      <ContactCta />
    </>
  );
}
