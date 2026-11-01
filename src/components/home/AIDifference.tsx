"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/** Poster-scale statement that slides across on scroll, then the AI positioning line. */
export default function AIDifference() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ai-row-a", { xPercent: 0 }, { xPercent: -14, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(".ai-row-b", { xPercent: -14 }, { xPercent: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="overflow-hidden py-[120px]">
      {/* Full-bleed: headline and content share the same edge padding. */}
      <div className="display select-none [font-family:var(--font-oswald)] font-semibold tracking-[-0.01em] whitespace-nowrap px-[max(20px,4vw)] text-[clamp(56px,10vw,160px)]" aria-hidden>
        <div className="ai-row-a">Made by humans.</div>
        <div className="ai-row-b text-brand-deep">Speed up by AI.</div>
      </div>

      {/* The four pipeline stages play out in the IdeaFunnel scene that follows. */}
      <div className="mt-20 grid gap-8 px-[max(20px,4vw)] md:grid-cols-[1fr_1fr] md:items-end lg:gap-[8vw]">
        <h2 className="text-[clamp(32px,4.6vw,56px)] leading-[1.05] tracking-[-0.02em]" data-reveal>
          <em className="cursive not-italic pr-2 text-brand-deep">AI</em> is how we work, not what we sell.
        </h2>
        <div data-reveal="0.1">
          <p className="text-[18px] text-ink/75">
            AI sits inside our pipeline at four points. It lets a small team produce at the volume a much larger one used to.
            What it does not do is decide what ships.
          </p>
          <Link href="/ai-process" className="link-u mt-6 inline-block text-[14px]">How our AI process works</Link>
        </div>
      </div>
    </section>
  );
}
