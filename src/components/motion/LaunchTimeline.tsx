"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { launchPlan } from "@/lib/proposal";

gsap.registerPlugin(ScrollTrigger);

/**
 * 30-day launch plan as a track: a red line draws through the five stops as you scroll, each stop lights up
 * as the line reaches it, and a day counter runs 1 -> 30. Horizontal on desktop, vertical on phones.
 */
export default function LaunchTimeline() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const steps = gsap.utils.toArray<HTMLElement>(".lt-step", el);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      steps.forEach((s) => s.classList.add("is-on"));
      return;
    }
    const day = el.querySelector<HTMLElement>(".lt-day")!;
    day.textContent = "1";
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: el, start: "top 70%", end: "bottom 55%", scrub: 0.5,
          // A stop lights once the line has reached it.
          onUpdate: (st) => {
            steps.forEach((s, i) => s.classList.toggle("is-on", st.progress >= i / (steps.length - 1) - 0.02));
            day.textContent = String(Math.max(1, Math.round(st.progress * 30)));
          },
        },
      })
        .fromTo(".lt-fill-x", { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0)
        .fromTo(".lt-fill-y", { scaleY: 0 }, { scaleY: 1, ease: "none" }, 0);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative">
      <div className="mb-10 flex items-baseline gap-3" aria-hidden>
        <span className="text-[13px] uppercase tracking-[0.14em] text-mute">Day</span>
        <span className="lt-day text-gradient-brand text-[56px] font-medium leading-none tracking-[-0.03em]">30</span>
        <span className="text-[13px] text-mute">of your first month</span>
      </div>

      <div className="relative">
        {/* Track: horizontal on desktop, vertical on phones. */}
        <div className="absolute left-0 right-0 top-[7px] hidden h-[2px] bg-brand-blush md:block" aria-hidden>
          <div className="lt-fill-x h-full origin-left" style={{ background: "var(--gradient-brand)" }} />
        </div>
        <div className="absolute bottom-0 left-[7px] top-0 w-[2px] bg-brand-blush md:hidden" aria-hidden>
          <div className="lt-fill-y h-full origin-top" style={{ background: "var(--gradient-brand)" }} />
        </div>

        <ol className="grid gap-8 pl-8 md:grid-cols-5 md:gap-4 md:pl-0">
          {launchPlan.map((s) => (
            <li key={s.when} className="lt-step group relative md:pt-10">
              <span className="absolute -left-8 top-1 h-4 w-4 rounded-full border-2 border-brand-blush bg-white transition-all duration-500 group-[.is-on]:scale-125 group-[.is-on]:border-brand group-[.is-on]:bg-brand md:left-0 md:top-0" aria-hidden />
              <p className="text-[13px] uppercase tracking-[0.12em] text-mute transition-colors duration-500 group-[.is-on]:text-brand-deep">{s.when}</p>
              <h3 className="mt-2 text-[20px]">{s.title}</h3>
              <p className="mt-2 text-[15px] text-ink/70">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
