import Link from "next/link";
import { services } from "@/lib/content";
import { SectionHead } from "./Sections";

/**
 * Services as an editorial index: one full-width row per service. Hovering a row sweeps the brand
 * gradient in from the left, turns the text white and slides the service's short tag in on the right.
 */
export default function ServicesShowcase() {
  return (
    <section className="container-air py-[120px]">
      <SectionHead split={false} eyebrow="Services">
        Nine service lines. <em className="cursive not-italic text-brand-deep">One</em> accountable team.
      </SectionHead>

      <ol className="border-t border-line">
        {services.map((s, i) => (
          <li key={s.slug} data-reveal={(i % 3) * 0.06} className="border-b border-line">
            <Link
              href={`/services/${s.slug}`}
              className="group relative isolate grid grid-cols-[36px_1fr_auto] items-center gap-x-4 overflow-hidden px-2 py-7 transition-colors duration-500 hover:text-white md:grid-cols-[64px_1.1fr_1fr_auto] md:px-6"
            >
              {/* Gradient sweep behind the row. */}
              <span aria-hidden className="absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" style={{ background: "linear-gradient(110deg, #ff214f, #d6103c)" }} />

              <span className="text-[13px] text-mute transition-colors duration-500 group-hover:text-white/80">{String(i + 1).padStart(2, "0")}</span>

              <span>
                <span className="block text-[clamp(24px,3vw,40px)] leading-[1.1] tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-2">{s.title}</span>
                <span className="mt-2 block text-[14px] text-ink/70 transition-colors duration-500 group-hover:text-white/85 md:hidden">{s.blurb}</span>
              </span>

              <span className="hidden text-[15px] text-ink/70 transition-colors duration-500 group-hover:text-white/90 md:block">{s.blurb}</span>

              {/* Short tag slides in on hover, then an arrow drawn in CSS. */}
              <span className="flex items-center gap-4">
                <span aria-hidden className="display hidden w-[96px] translate-x-6 text-right text-[28px] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 lg:block">{s.icon}</span>
                <span aria-hidden className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 transition-all duration-500 group-hover:-rotate-45 group-hover:border-white group-hover:bg-white">
                  <span className="relative block h-[2px] w-4 bg-current transition-colors group-hover:bg-brand-deep after:absolute after:-right-px after:-top-[4px] after:h-[10px] after:w-[10px] after:rotate-45 after:border-r-2 after:border-t-2 after:border-current after:content-[''] group-hover:after:border-brand-deep" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
