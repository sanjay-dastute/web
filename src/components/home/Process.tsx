"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { processSteps } from "@/lib/content";

/** Pinned horizontal scroll through the five steps (desktop); stacked on mobile. */
export default function Process() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current!;
      const dist = () => el.scrollWidth - window.innerWidth + 40;
      gsap.to(el, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 1, invalidateOnRefresh: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="sky relative overflow-hidden">
      <div className="flex min-h-[100svh] flex-col justify-center py-[120px] md:py-0">
        <div className="container-air mb-12 w-full">
          <p className="mb-4 text-[13px] uppercase tracking-[0.14em] text-ink/60">How we work</p>
          <h2 className="text-[clamp(32px,4.6vw,56px)] leading-[1.05] tracking-[-0.02em]">
            A process you can see <em className="cursive not-italic text-twilight-blue">coming.</em>
          </h2>
        </div>
        <div ref={track} className="flex flex-col gap-4 px-5 md:w-max md:flex-row md:pl-[max(20px,calc((100vw-1150px)/2+20px))] md:pr-10">
          {processSteps.map((p) => (
            <article key={p.n} className="flex flex-col justify-between rounded-[12px] bg-white/75 p-8 backdrop-blur md:h-[380px] md:w-[400px]">
              <span className="display text-[96px] text-twilight-blue/30">{p.n}</span>
              <div>
                <h3 className="text-[32px] leading-[1.1]">{p.title}</h3>
                <p className="mt-3 text-ink/70">{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
