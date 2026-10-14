"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { pipeline } from "@/lib/content";

/** Poster-scale statement that slides across on scroll, then the four-stage pipeline. */
export default function AIDifference() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ai-row-a", { xPercent: 0 }, { xPercent: -14, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(".ai-row-b", { xPercent: -14 }, { xPercent: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(".ai-step", {
        opacity: 0.15, y: 30, stagger: 0.25, ease: "none",
        scrollTrigger: { trigger: ".ai-steps", start: "top 80%", end: "bottom 55%", scrub: true },
      });
      gsap.from(".ai-bar", { scaleX: 0, transformOrigin: "left", ease: "none", scrollTrigger: { trigger: ".ai-steps", start: "top 80%", end: "bottom 55%", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="overflow-hidden py-[120px]">
      {/* Full-bleed: headline and content share the same edge padding. */}
      <div className="display select-none whitespace-nowrap px-[max(20px,4vw)] text-[clamp(96px,16vw,259px)]" aria-hidden>
        <div className="ai-row-a">Made by humans.</div>
        <div className="ai-row-b text-twilight-blue">Sped up by AI.</div>
      </div>

      <div className="mt-20 grid gap-12 px-[max(20px,4vw)] md:grid-cols-[1fr_1.2fr] lg:gap-[8vw]">
        <div data-reveal>
          <h2 className="text-[clamp(32px,4.6vw,56px)] leading-[1.05] tracking-[-0.02em]">
            <em className="cursive not-italic pr-2 text-twilight-blue">AI</em> is how we work, not what we sell.
          </h2>
          <p className="mt-6 text-[18px] text-ink/75">
            AI sits inside our pipeline at four points. It lets a small team produce at the volume a much larger one used to.
            What it does not do is decide what ships. Anyone can generate fifty captions. Very few can pick the five worth publishing.
          </p>
          <Link href="/ai-process" className="link-u mt-8 inline-block text-[14px]">How our AI process works</Link>
        </div>

        <div className="ai-steps relative">
          <div className="absolute left-0 right-0 top-0 h-px bg-line"><div className="ai-bar h-px bg-ink" /></div>
          <div className="grid gap-px sm:grid-cols-2">
            {pipeline.map((p) => (
              <div key={p.n} className="ai-step pt-6 pr-6 pb-8">
                <p className="text-[13px] text-mute">{p.n}</p>
                <h3 className="mt-2 text-[32px] leading-[1.1]">{p.title}</h3>
                <p className="mt-2 text-ink/70">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
