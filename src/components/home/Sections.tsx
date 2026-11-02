import Link from "next/link";
import { clients, reasons, industries, work } from "@/lib/content";

/** `split` turns on the word-by-word reveal; leave it off inside client components that re-render. */
export function SectionHead({ eyebrow, children, center = true, split = true }: { eyebrow?: string; children: React.ReactNode; center?: boolean; split?: boolean }) {
  return (
    <div className={`mb-12 ${center ? "text-center mx-auto" : ""} max-w-[760px]`}>
      {eyebrow && <p className="mb-4 text-[13px] uppercase tracking-[0.14em] text-mute" data-reveal>{eyebrow}</p>}
      <h2 className="text-[clamp(32px,4.6vw,56px)] font-normal leading-[1.05] tracking-[-0.02em]" data-split={split || undefined} data-reveal={split ? undefined : ""}>{children}</h2>
    </div>
  );
}

/** Client roll as a split layout: count and line on the left, a 3x3 grid of monogram tiles on the right. */
export function LogoBar() {
  // Initials for the monogram, skipping a leading "The".
  const initials = (name: string) => name.replace(/^The /, "").split(" ").slice(0, 2).map((w) => w[0]).join("");
  return (
    <section className="border-y border-line bg-white py-[96px]">
      <div className="container-air grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div data-reveal>
          <p className="mb-4 text-[13px] uppercase tracking-[0.14em] text-mute">Our clients</p>
          <p className="text-gradient-brand text-[clamp(64px,8vw,112px)] font-medium leading-none tracking-[-0.04em]">{clients.length}+</p>
          <h2 className="mt-4 max-w-[380px] text-[clamp(26px,3vw,36px)] leading-[1.15] tracking-[-0.02em]">
            Growing brands across <em className="cursive not-italic text-brand-deep">Tamil Nadu</em> trust us with their name.
          </h2>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {clients.map((c, i) => (
            <li
              key={c}
              data-reveal={(i % 3) * 0.08 + Math.floor(i / 3) * 0.08}
              className="group flex items-center gap-3 rounded-[14px] border border-line bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_16px_40px_-20px_rgba(255,33,79,.45)]"
            >
              <span
                aria-hidden
                className="grid h-11 w-11 shrink-0 place-items-center text-[13px] font-medium text-white transition-transform duration-500 group-hover:rotate-[30deg]"
                style={{ background: "var(--gradient-brand)", clipPath: "polygon(25% 4%, 75% 4%, 100% 50%, 75% 96%, 25% 96%, 0 50%)" }}
              >
                <span className="transition-transform duration-500 group-hover:-rotate-[30deg]">{initials(c)}</span>
              </span>
              <span className="text-[15px] leading-tight">{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export function WorkPreview() {
  return (
    <section className="container-air py-[120px]">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <SectionHead eyebrow="Selected work" center={false}>
          Work we&apos;re happy to put our <em className="cursive not-italic text-brand-deep">name</em> on.
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
          Why clients <em className="cursive not-italic text-brand-deep">stay.</em>
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
