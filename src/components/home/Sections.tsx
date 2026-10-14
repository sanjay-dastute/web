import Link from "next/link";
import { clients, pillars, reasons, industries, work } from "@/lib/content";

export function SectionHead({ eyebrow, children, center = true }: { eyebrow?: string; children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`mb-12 ${center ? "text-center mx-auto" : ""} max-w-[760px]`} data-reveal>
      {eyebrow && <p className="mb-4 text-[13px] uppercase tracking-[0.14em] text-mute">{eyebrow}</p>}
      <h2 className="text-[clamp(32px,4.6vw,56px)] font-normal leading-[1.05] tracking-[-0.02em]">{children}</h2>
    </div>
  );
}

export function LogoBar() {
  const row = [...clients, ...clients];
  return (
    <section className="border-y border-line py-8">
      <p className="container-air mb-5 text-center text-[13px] text-mute">Trusted by growing brands across Tamil Nadu</p>
      <div className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee-track flex w-max gap-16">
          {row.map((c, i) => (
            <span key={i} className="whitespace-nowrap text-[22px] tracking-tight text-ink/45 transition-colors hover:text-ink">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pillars() {
  return (
    <section className="container-air py-[120px]">
      <SectionHead eyebrow="What we do for you">
        Be <em className="cursive not-italic text-twilight-blue">found,</em> understood and chosen.
      </SectionHead>
      <div className="grid gap-6 md:grid-cols-3">
        {pillars.map((p, i) => (
          <div key={p.title} data-reveal={i * 0.1} className="border-t border-ink pt-6">
            <p className="mb-6 text-[13px] text-mute">0{i + 1}</p>
            <h3 className="mb-3 text-[32px] leading-[1.1]">{p.title}</h3>
            <p className="text-ink/70">{p.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-16 text-center text-[12px] uppercase tracking-[0.18em] text-mute" data-reveal>
        Branding <span className="text-signal-blue">·</span> Web & Apps <span className="text-signal-blue">·</span> Marketing{" "}
        <span className="text-signal-blue">·</span> SEO <span className="text-signal-blue">·</span> AI Search
      </p>
    </section>
  );
}

export function Problem() {
  return (
    <section className="bg-haze py-[120px]">
      <div className="container-air grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-end">
        <h2 className="text-[clamp(32px,4.6vw,56px)] leading-[1.05] tracking-[-0.02em]" data-reveal>
          Most good businesses are <em className="cursive not-italic text-twilight-blue">invisible</em> to their own customers.
        </h2>
        <div className="space-y-4 text-[18px] text-ink/75" data-reveal="0.15">
          <p>Not because the product is weak. Because professional branding and digital work has always been priced for large companies - and the affordable alternative is three freelancers who never talk to each other.</p>
          <p>A logo that doesn&apos;t match the website. A website nobody finds. Marketing that sounds like it was written by someone who has never met your customer.</p>
          <p className="text-ink">We built Creatoos to close that gap.</p>
        </div>
      </div>
    </section>
  );
}

export function WorkPreview() {
  return (
    <section className="container-air py-[120px]">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <SectionHead eyebrow="Selected work" center={false}>
          Work we&apos;re happy to put our <em className="cursive not-italic text-twilight-blue">name</em> on.
        </SectionHead>
        <Link href="/work" className="btn btn-ghost mb-12" data-reveal>All projects →</Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {work.map((w, i) => (
          <Link key={w.name} href="/work" data-reveal={(i % 2) * 0.1} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[11px]" style={{ background: w.tone }}>
              {/* TODO: replace with project imagery. */}
              <span className="display absolute inset-0 grid place-items-center px-6 text-center text-[clamp(40px,6vw,84px)] text-ink/80 transition-transform duration-700 group-hover:scale-105">
                {w.name.split(" - ")[0]}
              </span>
            </div>
            <div className="mt-4 flex justify-between text-[14px]">
              <span>{w.name}</span>
              <span className="text-mute">{w.kind}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function Why() {
  return (
    <section className="bg-haze py-[120px]">
      <div className="container-air">
        <SectionHead eyebrow="Why Creatoos">
          Why clients <em className="cursive not-italic text-twilight-blue">stay.</em>
        </SectionHead>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <div key={r.title} data-reveal={(i % 3) * 0.08} className="rounded-[12px] bg-white p-6 transition-transform duration-500 hover:-translate-y-1">
              <h3 className="mb-2 text-[20px] leading-[1.4]">{r.title}</h3>
              <p className="text-ink/70">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Industries() {
  return (
    <section className="container-air py-[120px] text-center">
      <SectionHead eyebrow="Industries">Who we build for</SectionHead>
      <div className="mx-auto flex max-w-[860px] flex-wrap justify-center gap-3" data-reveal>
        {industries.map((x) => (
          <span key={x} className="pill text-[16px] px-5 py-2.5 transition-colors hover:bg-ink hover:text-white">{x}</span>
        ))}
      </div>
      <Link href="/industries" className="link-u mt-10 inline-block text-[14px]" data-reveal>See industry work</Link>
    </section>
  );
}
