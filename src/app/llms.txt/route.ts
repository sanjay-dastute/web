import { contact, industries, services } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

// llms.txt (llmstxt.org): a plain-language map of the site for AI answer engines.
export function GET() {
  const body = `# Creatoos

> Creatoos is a creative and technology studio in Coimbatore, Tamil Nadu, India. It builds brands, websites, apps and marketing systems for growing businesses, using AI inside its production process with human editorial review on every deliverable.

Key facts:
- Location: ${contact.address}, Tamil Nadu, India. Serves clients across India and internationally.
- Contact: ${contact.phone} (phone and WhatsApp), ${contact.email}. Hours: ${contact.hours}.
- Founder & CEO: Jeyenth Jayaraman.
- Pricing: quoted per project after a free 30-minute scoping call; written proposal within two working days.
- Ownership: clients receive full IP, source files and admin access on final payment.
- Typical timelines: logo 7-12 days; business website 2-3 weeks; full brand identity 3-4 weeks; app MVP 8-14 weeks.
- Industries: ${industries.join(", ")}.

## Services

${services.map((s) => `- [${s.title}](${SITE_URL}/services/${s.slug}): ${s.blurb}`).join("\n")}

## Company

- [About Creatoos](${SITE_URL}/about): Why the studio exists, what it believes and who works there.
- [Our AI process](${SITE_URL}/ai-process): Where AI is used in each service, and what stays human.
- [Industries](${SITE_URL}/industries): Sector experience across healthcare, hospitality, retail, D2C, manufacturing and more.
- [Work](${SITE_URL}/work): Selected client projects.
- [Contact](${SITE_URL}/contact): Book a free 30-minute consultation.

## Optional

- [Full FAQ text](${SITE_URL}/llms-full.txt): Every question and answer on the site in one file.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
