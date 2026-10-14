import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import ContactCta from "@/components/ContactCta";
import AIDifference from "@/components/home/AIDifference";
import { SectionHead } from "@/components/home/Sections";

export const metadata: Metadata = pageMeta("/ai-process", "How Creatoos Uses AI | AI-Assisted Creative & Marketing Process", "AI sits in our production pipeline - research, generation, variation and testing. Every output passes human editorial review. Here's exactly how it works.");

const byService = [
  { s: "Branding", ai: "Category research, competitor messaging analysis, name generation and screening, wider design exploration.", h: "The positioning decision and the final mark." },
  { s: "Logo design", ai: "Ideation breadth, context mockups, variant and format generation.", h: "The mark is drawn by a designer." },
  { s: "Web development", ai: "Copy drafting, layout exploration, code scaffolding, automated QA, schema generation.", h: "Architecture, performance and final copy." },
  { s: "App development", ai: "Requirement analysis, boilerplate, test case generation, store listing assets.", h: "Architecture, security and payment logic." },
  { s: "Digital marketing", ai: "Ad variants at volume, audience research, landing page variants, anomaly detection.", h: "Strategy and budget decisions." },
  { s: "Social media", ai: "Content at volume against a documented brand voice, visual production, trend response.", h: "Every post is read before it goes out." },
  { s: "SEO", ai: "Keyword clustering, content briefs, continuous technical auditing, internal linking analysis.", h: "Content is written and edited by people." },
  { s: "AEO / GEO", ai: "Prompt-set testing at scale, citation pattern analysis.", h: "Interpretation and strategy." },
  { s: "Strategy & research", ai: "Review mining, competitor mapping, interview synthesis.", h: "The conclusions." },
];

const limits = [
  "We do not publish unedited generated content.",
  "We do not sell AI-generated logos as original design work.",
  "We do not use AI to fabricate reviews, testimonials or engagement.",
  "We do not feed confidential client material into public AI tools.",
  "We do not let AI make strategic, budget or brand-safety decisions.",
];

export default function AIProcessPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Our AI Process", path: "/ai-process" }])} />
      <PageHero
        eyebrow="Our AI process"
        title="*AI* is our production layer, not our pitch"
        sub="Every agency now says they use AI. Here's precisely what we mean, where it sits, and what it never touches."
      />

      <section className="container-air grid gap-12 py-[120px] md:grid-cols-[1fr_1.3fr]">
        <h2 className="text-[clamp(32px,4.6vw,56px)] leading-[1.05] tracking-[-0.02em]" data-reveal>
          The <em className="cursive not-italic text-twilight-blue">honest</em> version
        </h2>
        <div className="space-y-6 text-[18px] text-ink/75" data-reveal="0.1">
          <p>AI does not make our work more creative. It makes it faster to produce, which changes what&apos;s possible within a real timeline and budget.</p>
          <p>When a creative costs less to produce, you can test twenty instead of two. When research takes days instead of weeks, it fits in a project that couldn&apos;t previously afford it. When content drafts in hours, launches stop slipping.</p>
          <p className="text-ink">Speed isn&apos;t a vanity metric. It&apos;s what lets a business with a modest budget behave like one with a large one.</p>
        </div>
      </section>

      <AIDifference />

      <section className="bg-haze py-[120px]">
        <div className="container-air">
          <SectionHead eyebrow="Service by service">A straight answer for every service</SectionHead>
          <div className="overflow-x-auto" data-reveal>
            <table className="w-full min-w-[720px] text-left">
              <thead className="text-[13px] text-mute">
                <tr><th className="py-4 pr-6 font-medium">Service</th><th className="py-4 pr-6 font-medium">Where AI is used</th><th className="py-4 font-medium">What stays human</th></tr>
              </thead>
              <tbody>
                {byService.map((r) => (
                  <tr key={r.s} className="border-t border-line align-top transition-colors hover:bg-white">
                    <td className="py-5 pr-6 text-[18px]">{r.s}</td>
                    <td className="py-5 pr-6 text-ink/70">{r.ai}</td>
                    <td className="py-5 text-twilight-blue">{r.h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="container-air py-[120px]">
        <SectionHead eyebrow="What AI never does here">Our limits, stated <em className="cursive not-italic text-twilight-blue">plainly</em></SectionHead>
        <ul className="mx-auto max-w-[760px]">
          {limits.map((l, i) => (
            <li key={l} data-reveal={i * 0.06} className="flex gap-5 border-t border-line py-5 text-[20px] last:border-b">
              <span className="text-[13px] leading-[2.4] text-mute">0{i + 1}</span>{l}
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center text-ink/70" data-reveal>If you ever want to know whether a specific deliverable was AI-assisted and how, ask. We&apos;ll tell you.</p>
      </section>

      <ContactCta />
    </>
  );
}
