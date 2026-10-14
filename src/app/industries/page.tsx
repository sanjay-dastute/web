import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactCta from "@/components/ContactCta";

export const metadata: Metadata = {
  title: "Industries We Serve | Healthcare, Hospitality, Retail & More - Creatoos",
  description: "Branding and digital marketing for healthcare, hospitality, education, retail, D2C and manufacturing businesses.",
};

const blocks = [
  { t: "Healthcare & clinics", b: "Patient trust is built before the first appointment. Clinic branding, doctor profiles, treatment pages, appointment flows and the local search work that gets you found at the moment someone needs you." },
  { t: "Hospitality & hotels", b: "Direct bookings are worth more than OTA bookings. The brand, site and content that make guests book with you instead of an aggregator, plus the social presence that fills rooms off-season." },
  { t: "Education & consultancies", b: "Long consideration cycles need content that answers questions at every stage. Course pages, counselling content, SEO for high-intent queries and nurture campaigns." },
  { t: "Retail & boutiques", b: "Product photography without a shoot, catalogue content at volume, festival campaigns planned ahead, and local search that drives footfall as well as online orders." },
  { t: "D2C brands", b: "Brand identity, packaging, e-commerce build, performance marketing and the creative testing volume that makes paid acquisition work rather than just expensive." },
  { t: "Manufacturing & B2B", b: "Technical credibility communicated simply. Company profiles, product catalogues, export-ready websites, LinkedIn presence and search visibility beyond your existing network." },
  { t: "Real estate", b: "Project branding, microsites, walkthrough content and lead-generation campaigns with proper qualification, so your sales team talks to buyers rather than browsers." },
  { t: "Professional services", b: "Positioning that distinguishes you from every other firm claiming the same things, plus content that demonstrates expertise instead of asserting it." },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="We know your category before the *first* meeting"
        sub="Sector experience means we skip the education phase and start on the actual problem."
        primary={{ label: "Talk to us about your sector", href: "/contact" }}
      />
      <section className="container-air py-[120px]">
        <ul>
          {blocks.map((x, i) => (
            <li key={x.t} data-reveal={(i % 2) * 0.06}
              className="group grid gap-4 border-t border-line py-10 last:border-b md:grid-cols-[80px_1fr_1.2fr] md:items-baseline">
              <span className="text-[13px] text-mute">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="text-[clamp(28px,3.4vw,44px)] leading-[1.05] transition-all duration-500 group-hover:translate-x-2 group-hover:text-twilight-blue">{x.t}</h2>
              <p className="text-[17px] text-ink/70">{x.b}</p>
            </li>
          ))}
        </ul>
      </section>
      <ContactCta />
    </>
  );
}
