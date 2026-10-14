"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/content";
import { SectionHead } from "./Sections";

/** Sticky preview on the right swaps as each service scrolls past on the left. */
export default function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".svc-item").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (s) => s.isActive && setActive(i),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const s = services[active];

  return (
    <section ref={root} className="container-air py-[120px]">
      <SectionHead eyebrow="Services">
        Nine service lines. <em className="cursive not-italic text-twilight-blue">One</em> accountable team.
      </SectionHead>

      <div className="grid gap-10 md:grid-cols-[1fr_1.05fr]">
        <ol>
          {services.map((x, i) => (
            <li key={x.slug} className="svc-item border-t border-line py-8 last:border-b">
              <Link href={`/services/${x.slug}`} className={`group block transition-opacity duration-500 ${i === active ? "opacity-100" : "md:opacity-35"}`}>
                <div className="flex items-baseline gap-4">
                  <span className="text-[13px] text-mute">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-[clamp(24px,2.6vw,32px)] leading-[1.1]">{x.title}</h3>
                  <span className="ml-auto -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">→</span>
                </div>
                <p className="mt-3 pl-9 text-ink/70">{x.blurb}</p>
              </Link>
            </li>
          ))}
        </ol>

        <div className="hidden md:block">
          <div className="sticky top-[calc(var(--nav-h)+40px)]">
            <div className="sky relative aspect-[4/5] overflow-hidden rounded-[14px]">
              <div key={s.slug} className="absolute inset-0 flex flex-col justify-between p-8 animate-[fadeSwap_.6s_ease]">
                <span className="text-[13px] text-ink/60">{String(active + 1).padStart(2, "0")} / 09</span>
                <span className="display text-center text-[clamp(72px,9vw,128px)] text-white drop-shadow-[0_10px_40px_rgba(66,97,136,.35)]">
                  {s.icon}
                </span>
                <div className="rounded-[12px] bg-white/80 p-5 backdrop-blur">
                  <p className="cursive text-[32px] leading-[1.1] text-twilight-blue">{s.tagline}</p>
                  <p className="mt-1 text-[14px]">{s.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeSwap{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
