import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero, { Accent } from "@/components/PageHero";
import Faq from "@/components/Faq";
import ContactCta from "@/components/ContactCta";
import { SectionHead } from "@/components/home/Sections";
import { services } from "@/lib/content";
import { serviceDetails } from "@/lib/serviceDetails";
import { breadcrumbLd, pageMeta, serviceLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import IncludedStack from "@/components/services/IncludedStack";
import AiTrack from "@/components/services/AiTrack";
import TimelineBars from "@/components/services/TimelineBars";
import { DmServices, LaunchPlan, Objectives, Plans, ProofStats, ScopeOfWork } from "@/components/Marketing";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const d = serviceDetails[(await params).slug];
  const { slug } = await params;
  return d ? pageMeta(`/services/${slug}`, d.metaTitle, d.metaDescription) : {};
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const d = serviceDetails[slug];
  const svc = services.find((s) => s.slug === slug);
  if (!d || !svc) notFound();
  const idx = services.indexOf(svc);
  const next = services[(idx + 1) % services.length];

  return (
    <>
      <JsonLd data={[
        serviceLd(slug, svc.title, d.metaDescription),
        breadcrumbLd([{ name: "Services", path: "/services" }, { name: svc.title, path: `/services/${slug}` }]),
      ]} />
      <PageHero
        eyebrow={`Service ${String(idx + 1).padStart(2, "0")} / 09 - ${svc.title}`}
        title={d.h1}
        sub={d.sub}
        primary={{ label: "Book a Free Consultation", href: "/contact" }}
        secondary={{ label: "See Our Work", href: "/work" }}
      />

      <section className="container-air py-[120px]">
        <SectionHead eyebrow="What's included" center={false}>{d.includedTitle}</SectionHead>
        <IncludedStack items={d.included} />
        {d.extras && (
          <div className="mt-16" data-reveal>
            <p className="mb-4 text-[13px] uppercase tracking-[0.14em] text-mute">{d.extras.title}</p>
            <div className="flex flex-wrap gap-2">
              {d.extras.items.map((x, k) => <span key={x} data-reveal={k * 0.04} className="pill px-4 py-2 text-[14px] transition-colors hover:bg-brand hover:text-white">{x}</span>)}
            </div>
          </div>
        )}
      </section>

      {/* Digital marketing carries the full proposal: objectives, 16 services, scope, launch plan, proof, plans. */}
      {slug === "digital-marketing" && (
        <>
          <Objectives />
          <DmServices />
          <ScopeOfWork />
          <LaunchPlan />
          <ProofStats />
          <Plans compact />
        </>
      )}

      <section className="bg-haze py-[120px]">
        <div className="container-air grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div data-reveal>
            <p className="mb-4 text-[13px] uppercase tracking-[0.14em] text-mute">AI in the process</p>
            <h2 className="text-[clamp(32px,4.6vw,56px)] leading-[1.05] tracking-[-0.02em]">{d.aiTitle}</h2>
            {d.aiIntro && <p className="mt-6 text-[18px] text-ink/75">{d.aiIntro}</p>}
            <div className="mt-8 rounded-[12px] bg-white p-6">
              <p className="cursive text-[32px] leading-none text-brand-deep">What stays human</p>
              <p className="mt-3">{d.human}</p>
            </div>
          </div>
          <AiTrack steps={d.ai} />
        </div>
      </section>

      {d.timeline && (
        <section className="container-air py-[120px]">
          <SectionHead eyebrow="Timeline" center={false}>How long it <Accent text="*takes*" /></SectionHead>
          <TimelineBars rows={d.timeline} />
        </section>
      )}

      <Faq items={d.faqs} title={`${svc.title} FAQ`} />

      <section className="container-air pb-[120px]">
        <Link href={`/services/${next.slug}`} className="group flex items-end justify-between gap-6 border-t border-ink pt-8" data-reveal>
          <span>
            <span className="block text-[13px] text-mute">Next service</span>
            {/* Red fill wipes across the title on hover; the outline copy sits underneath. */}
            <span className="display relative mt-2 block text-[clamp(48px,8vw,120px)] leading-[1]">
              <span>{next.title}</span>
              <span aria-hidden className="absolute inset-0 text-brand-deep transition-[clip-path] duration-700 ease-out [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)]">{next.title}</span>
            </span>
          </span>
          <span aria-hidden className="mb-3 grid h-16 w-16 shrink-0 place-items-center rounded-full border border-ink transition-all duration-500 group-hover:-rotate-45 group-hover:border-brand-deep group-hover:bg-brand-deep group-hover:text-white">
            <span className="relative block h-[2px] w-6 bg-current after:absolute after:-right-px after:-top-[4px] after:h-[10px] after:w-[10px] after:rotate-45 after:border-r-2 after:border-t-2 after:border-current after:content-['']" />
          </span>
        </Link>
      </section>

      <ContactCta />
    </>
  );
}
