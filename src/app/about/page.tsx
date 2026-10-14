import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import ContactCta from "@/components/ContactCta";
import { SectionHead } from "@/components/home/Sections";

export const metadata: Metadata = pageMeta("/about", "About Creatoos | Creative & Technology Studio in Coimbatore", "Creatoos is a Coimbatore-based creative and technology studio building brands, digital products and marketing systems - with an AI-assisted process and human editorial control.");

const beliefs = [
  { title: "Positioning before pixels.", body: "A logo cannot fix an unclear proposition. We start with what you stand for." },
  { title: "Speed is a feature.", body: "Faster cycles mean more testing, and more testing means better outcomes." },
  { title: "Judgement doesn't scale.", body: "AI generates. Humans decide. We've never shipped work no person reviewed." },
  { title: "Handover, not hostage.", body: "Source files, code and admin access are yours. We want you to stay because the work is good." },
  { title: "Say the hard thing.", body: "If your budget is better spent elsewhere, we'll tell you before you spend it." },
];

// Team from the current creatoos.com site.
const team = [
  { name: "Jeyenth Jayaraman", role: "Founder & CEO" },
  { name: "Rajakumar Chinnavedi", role: "Digital Marketing Strategist" },
  { name: "Gowrisankar K", role: "Creative Visualiser" },
  { name: "Lisa Trueman", role: "UI/UX Designer" },
];

// TODO: replace with verified figures.
const stats = [
  { n: "[ X ]", label: "projects delivered" },
  { n: "[ X ]", label: "years in operation" },
  { n: "[ X ]", label: "active retainer clients" },
  { n: "[ X ]", label: "industries served" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "About", path: "/about" }])} />
      <PageHero
        eyebrow="About Creatoos"
        title="A studio built for the businesses *around* us"
        sub="Tamil Nadu has one of India's densest bases of small manufacturers, clinics, retailers and founders. Almost none of them could access professional brand and digital work. We set out to change that."
      />

      <section className="container-air grid gap-12 py-[120px] md:grid-cols-[1fr_1.3fr]">
        <h2 className="text-[clamp(32px,4.6vw,56px)] leading-[1.05] tracking-[-0.02em]" data-reveal>
          Why we <em className="cursive not-italic text-twilight-blue">exist</em>
        </h2>
        <div className="space-y-6 text-[18px] text-ink/75" data-reveal="0.1">
          <p>The market was failing growing businesses in two specific ways.</p>
          <p><span className="text-ink">Pricing was wrong.</span> Full-service agencies structure their retainers for enterprise budgets. A business with early revenue defers brand and web work until fixing it costs several times more.</p>
          <p><span className="text-ink">Delivery was fragmented.</span> A logo from one freelancer, a website from another, marketing from a third. Nothing held together and nobody owned the outcome.</p>
          <p>Creatoos productised the answer. Fixed scopes, a production pipeline that uses AI to compress turnaround, and human editorial control on everything that reaches a customer.</p>
        </div>
      </section>

      <section className="overflow-hidden bg-haze py-[120px]">
        <div className="container-air">
          <SectionHead eyebrow="How we think">What we believe</SectionHead>
          <ul>
            {beliefs.map((b, i) => (
              <li key={b.title} data-reveal={i * 0.05} className="group grid gap-2 border-t border-line py-8 md:grid-cols-[1fr_1fr] md:items-baseline">
                <h3 className="text-[clamp(24px,3vw,40px)] leading-[1.1] transition-colors group-hover:text-twilight-blue">{b.title}</h3>
                <p className="text-[18px] text-ink/70">{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-air py-[120px]">
        <SectionHead eyebrow="The team">Who you&apos;ll <em className="cursive not-italic text-twilight-blue">work</em> with</SectionHead>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((t, i) => (
            <div key={t.name} data-reveal={i * 0.08} className="group">
              {/* TODO: replace with team photos. */}
              <div className="sky grid aspect-[4/5] place-items-center overflow-hidden rounded-[11px]">
                <span className="display text-[96px] text-white transition-transform duration-700 group-hover:scale-110">
                  {t.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
              </div>
              <p className="mt-4 text-[18px]">{t.name}</p>
              <p className="text-[14px] text-mute">{t.role}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-ink/70" data-reveal>Every engagement has a named account lead. You will know who is responsible for your work and how to reach them.</p>
      </section>

      <section className="border-y border-line">
        <div className="container-air grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} data-reveal={i * 0.08} className="border-line py-12 text-center [&:not(:last-child)]:md:border-r">
              <p className="display text-[clamp(56px,7vw,96px)] text-twilight-blue">{s.n}</p>
              <p className="mt-2 text-[14px] text-mute">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <ContactCta />
    </>
  );
}
