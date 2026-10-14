import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactCta from "@/components/ContactCta";
import WorkGrid from "@/components/WorkGrid";

export const metadata: Metadata = {
  title: "Our Work | Branding, Web & Marketing Case Studies - Creatoos",
  description: "Selected projects across healthcare, hospitality, retail and D2C. Branding, websites, campaigns and search work from Creatoos, Coimbatore.",
};

export default function WorkPage() {
  return (
    <>
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
