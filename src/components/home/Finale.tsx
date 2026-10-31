"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MARK_PARTS, MARK_VIEWBOX } from "@/lib/logo";

gsap.registerPlugin(ScrollTrigger);

const starts = [
  { x: -900, y: -300, rotate: -60 },
  { x: 900, y: -200, rotate: 50 },
  { x: 0, y: 700, rotate: 120 },
];

/** Closing scene: the mark's three strokes fly in from off-screen and lock together as you scroll to the form. */
export default function Finale() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 85%", end: "center 55%", scrub: 0.8 } });
      tl.from(".fn-part", { x: (i) => starts[i].x, y: (i) => starts[i].y, rotate: (i) => starts[i].rotate, autoAlpha: 0, transformOrigin: "50% 50%", ease: "power3.out", stagger: 0.08 })
        .from(".fn-glow", { scale: 0.3, autoAlpha: 0, ease: "power2.out" }, "-=0.4")
        .from(".fn-copy > *", { y: 40, autoAlpha: 0, stagger: 0.1, ease: "power2.out" }, "-=0.3");
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-brand-petal py-[140px]">
      <div className="container-air grid items-center gap-12 md:grid-cols-[1fr_1.1fr]">
        <div className="relative mx-auto aspect-square w-full max-w-[380px]" aria-hidden>
          <div className="fn-glow absolute inset-[10%] rounded-full opacity-60 blur-[60px]" style={{ background: "var(--gradient-brand)" }} />
          <svg viewBox={MARK_VIEWBOX} className="absolute inset-[14%] overflow-visible">
            <defs>
              <linearGradient id="fn-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff6b88" />
                <stop offset="55%" stopColor="#ff214f" />
                <stop offset="100%" stopColor="#d6103c" />
              </linearGradient>
            </defs>
            {MARK_PARTS.map((d, i) => <path key={i} className="fn-part" d={d} fill="url(#fn-grad)" fillRule="evenodd" />)}
          </svg>
        </div>
        <div className="fn-copy">
          <p className="mb-4 text-[13px] uppercase tracking-[0.14em] text-mute">Logo, website, marketing - one team</p>
          <h2 className="text-[clamp(40px,6vw,84px)] leading-[0.98] tracking-[-0.03em]">
            Your brand, <em className="cursive not-italic text-gradient-brand">understood.</em>
          </h2>
          <p className="mt-6 max-w-[460px] text-[18px] text-ink/70">
            Every piece built to fit together, by one accountable team. Tell us where you are and we&apos;ll show you what we&apos;d do first.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#contact" className="btn btn-brand">Start a Project →</Link>
            <Link href="/pricing" className="btn btn-ghost">See pricing</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
