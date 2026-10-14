import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ContactCta from "@/components/ContactCta";
import { SectionHead } from "@/components/home/Sections";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Services | Branding, Web, Marketing & AI - Creatoos Coimbatore",
  description: "Nine service lines under one roof: branding, logo design, web and app development, digital marketing, social media, SEO, AI search optimisation and strategy.",
};

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
      <PageHero
        eyebrow="Services"
        title="Everything you need to be found, understood and *chosen*"
        sub="Buy one service or the whole stack. Most clients start with two or three and add the rest as they grow - and because it's all one team, the pieces actually fit together."
        primary={{ label: "Book a Free Consultation", href: "/contact" }}
      />

      <section className="container-air py-[120px]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}`} data-reveal={(i % 3) * 0.08}
              className="group card-haze flex min-h-[280px] flex-col justify-between p-7 transition-colors duration-500 hover:bg-ink hover:text-white">
              <div className="flex justify-between text-[13px]">
                <span className="opacity-60">{String(i + 1).padStart(2, "0")}</span>
                <span className="display text-[28px] text-twilight-blue transition-colors group-hover:text-white/40">{s.icon}</span>
              </div>
              <div>
                <h2 className="text-[26px] leading-[1.1]">{s.title}</h2>
                <p className="mt-3 text-[15px] opacity-70">{s.blurb}</p>
                <span className="mt-5 inline-block text-[14px] transition-transform group-hover:translate-x-1">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-haze py-[120px]">
        <div className="container-air">
          <SectionHead eyebrow="How services combine">Common starting <em className="cursive not-italic text-twilight-blue">points</em></SectionHead>
          <div className="grid gap-4 md:grid-cols-2">
            {paths.map((p, i) => (
              <div key={p.title} data-reveal={(i % 2) * 0.08} className="rounded-[12px] bg-white p-7">
                <h3 className="text-[20px]">{p.title}</h3>
                <div className="mt-5 flex flex-wrap items-center gap-2 text-[14px]">
                  {p.steps.map((s, k) => (
                    <span key={s} className="flex items-center gap-2">
                      <span className="pill">{s}</span>
                      {k < p.steps.length - 1 && <span className="text-mute">→</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-air py-[120px]">
        <SectionHead eyebrow="Engagement formats">Four ways to work with us</SectionHead>
        <div className="grid gap-6 md:grid-cols-4">
          {formats.map((f, i) => (
            <div key={f.title} data-reveal={i * 0.08} className="border-t border-ink pt-6">
              <h3 className="text-[24px]">{f.title}</h3>
              <p className="mt-3 text-ink/70">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <ContactCta />
    </>
  );
}
