"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Group = { title: string; body: string };

/**
 * What's included, as a deck of sticky cards: each card pins near the top and the next slides over it,
 * while the one underneath shrinks and dims. Phones and reduced motion get a plain list of cards.
 */
export default function IncludedStack({ items }: { items: Group[] }) {
  const root = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".inc-card", root.current);
      cards.slice(0, -1).forEach((c, i) => {
        gsap.to(c, {
          scale: 0.92, opacity: 0.45, ease: "none",
          scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top 25%", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <ol ref={root} className="space-y-4 md:space-y-[18vh]">
      {items.map((g, i) => (
        <li key={g.title} className="md:sticky" style={{ top: `calc(var(--nav-h) + 40px + ${i * 14}px)` }}>
          <div className={`inc-card grid origin-top gap-6 rounded-[24px] p-8 md:grid-cols-[120px_1fr] md:p-12 ${i % 2 ? "bg-ink text-white" : "bg-brand-petal"}`}>
            <span className={`display text-[clamp(56px,7vw,96px)] leading-none ${i % 2 ? "text-brand-glow" : "text-brand-deep"}`}>{String(i + 1).padStart(2, "0")}</span>
            <div className="self-end">
              <h3 className="text-[clamp(24px,2.6vw,36px)] leading-[1.15] tracking-[-0.02em]">{g.title}</h3>
              <p className={`mt-4 max-w-[640px] text-[17px] ${i % 2 ? "text-white/75" : "text-ink/70"}`}>{g.body}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
