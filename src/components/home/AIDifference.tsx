"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/** Poster-scale statement whose two lines slide in from opposite sides and meet in the centre, then the AI positioning line. */
export default function AIDifference() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      // Lines start off-screen on opposite sides and land centred as the headline reaches mid-screen.
      const st = { trigger: ".ai-rows", start: "top bottom", end: "center center", scrub: 0.6 };
      gsap.fromTo(".ai-row-a", { x: "-100vw" }, { x: 0, ease: "power2.out", scrollTrigger: st });
      gsap.fromTo(".ai-row-b", { x: "100vw" }, { x: 0, ease: "power2.out", scrollTrigger: st });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="overflow-hidden py-16 md:py-24">
      <div className="container-air">
      {/* Headline and supporting columns share one left edge and content width. */}
      <div className="ai-rows display select-none text-left font-semibold leading-[1.05] tracking-[-0.01em] whitespace-nowrap text-[clamp(32px,8vw,104px)]" aria-hidden>
        <div className="ai-row-a opacity-50">Made by humans.</div>
        <div className="ai-row-b text-brand-deep">Speed up by AI.</div>
      </div>

      {/* The four pipeline stages play out in the IdeaFunnel scene that follows. */}
      <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2 md:items-start md:gap-12 lg:gap-20">
        <h2 className="max-w-[480px] text-[clamp(30px,3.5vw,44px)] leading-[1.1] tracking-[-0.02em]" data-reveal>
          <em className="cursive not-italic pr-2 text-brand-deep">AI</em> is how we work, not what we sell.
        </h2>
        <div data-reveal="0.1">
          <p className="max-w-[480px] text-[17px] leading-[1.6] text-ink/75">
            AI sits inside our pipeline at four points. It lets a small team produce at the volume a much larger one used to.
            What it does not do is decide what ships.
          </p>
          <Link href="/ai-process" className="link-u mt-6 inline-block text-[14px]">How our AI process works</Link>
        </div>
      </div>
      </div>
    </section>
  );
}
