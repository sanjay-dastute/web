import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero, { Accent } from "@/components/PageHero";
import Faq from "@/components/Faq";
import ContactCta from "@/components/ContactCta";
import { SectionHead } from "@/components/home/Sections";
import { services } from "@/lib/content";
import { serviceDetails } from "@/lib/serviceDetails";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const d = serviceDetails[(await params).slug];
  return d ? { title: d.metaTitle, description: d.metaDescription } : {};
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
      <PageHero
        eyebrow={`Service ${String(idx + 1).padStart(2, "0")} / 09 · ${svc.title}`}
        title={d.h1}
        sub={d.sub}
        primary={{ label: "Book a Free Consultation", href: "/contact" }}
        secondary={{ label: "See Our Work", href: "/work" }}
      />

      <section className="container-air py-[120px]">
        <SectionHead eyebrow="What's included" center={false}>{d.includedTitle}</SectionHead>
        <div className={`grid gap-4 sm:grid-cols-2 ${d.included.length > 4 ? "lg:grid-cols-3" : ""}`}>
          {d.included.map((g, i) => (
            <div key={g.title} data-reveal={(i % 3) * 0.08} className="card-haze flex flex-col gap-3 p-7 transition-transform duration-500 hover:-translate-y-1">
              <h3 className="text-[20px] leading-[1.4]">{g.title}</h3>
              <p className="text-ink/70">{g.body}</p>
            </div>
          ))}
        </div>
        {d.extras && (
          <div className="mt-16" data-reveal>
            <p className="mb-4 text-[13px] uppercase tracking-[0.14em] text-mute">{d.extras.title}</p>
            <div className="flex flex-wrap gap-2">
              {d.extras.items.map((x) => <span key={x} className="pill px-4 py-2 text-[14px]">{x}</span>)}
            </div>
          </div>
        )}
      </section>

      <section className="bg-haze py-[120px]">
        <div className="container-air grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div data-reveal>
            <p className="mb-4 text-[13px] uppercase tracking-[0.14em] text-mute">AI in the process</p>
            <h2 className="text-[clamp(32px,4.6vw,56px)] leading-[1.05] tracking-[-0.02em]">{d.aiTitle}</h2>
            {d.aiIntro && <p className="mt-6 text-[18px] text-ink/75">{d.aiIntro}</p>}
            <div className="mt-8 rounded-[12px] bg-white p-6">
              <p className="cursive text-[32px] leading-none text-twilight-blue">What stays human</p>
              <p className="mt-3">{d.human}</p>
            </div>
          </div>
          <ol className="space-y-px">
            {d.ai.map((a, i) => (
              <li key={a.title} data-reveal={i * 0.06} className="border-t border-line py-6">
                <div className="flex gap-5">
                  <span className="text-[13px] text-mute">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-[20px] leading-[1.4]">{a.title}</h3>
                    <p className="mt-1 text-ink/70">{a.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {d.timeline && (
        <section className="container-air py-[120px]">
          <SectionHead eyebrow="Timeline" center={false}>How long it <Accent text="*takes*" /></SectionHead>
          <ul>
            {d.timeline.map((t, i) => (
              <li key={t.label} data-reveal={i * 0.06} className="group flex flex-wrap items-baseline justify-between gap-4 border-t border-line py-6 last:border-b">
                <span className="text-[20px] transition-transform duration-500 group-hover:translate-x-2">{t.label}</span>
                <span className="text-twilight-blue">{t.time}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Faq items={d.faqs} title={`${svc.title} FAQ`} />

      <section className="container-air pb-[120px]">
        <Link href={`/services/${next.slug}`} className="group flex items-end justify-between border-t border-ink pt-8" data-reveal>
          <span>
            <span className="block text-[13px] text-mute">Next service</span>
            <span className="display mt-2 block text-[clamp(48px,8vw,120px)] transition-colors group-hover:text-twilight-blue">{next.title}</span>
          </span>
          <span className="text-[40px] transition-transform group-hover:translate-x-2">→</span>
        </Link>
      </section>

      <ContactCta />
    </>
  );
}
