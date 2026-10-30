"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pipeline } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const COUNT = 50;
const KEEP = new Set([7, 18, 23, 36, 44]);

/**
 * The AI pipeline as a pinned scene: one brief -> fifty generated ideas -> forty-five cut in edit -> five
 * shipped. Without JS or with reduced motion it renders the end state (all fifty, the five picked).
 */
export default function IdeaFunnel() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current!;
    const stages = gsap.utils.toArray<HTMLElement>(".if-stage", el);
    const count = el.querySelector<HTMLElement>(".if-count")!;
    const label = el.querySelector<HTMLElement>(".if-label")!;
    const states: [string, string][] = [["1", "brief"], ["50", "ideas generated"], ["5", "survive the edit"], ["5", "shipped to you"]];

    const ctx = gsap.context(() => {
      const kept = el.querySelectorAll(".if-chip.keep");
      const cut = el.querySelectorAll(".if-chip:not(.keep)");
      gsap.set(".if-chip", { autoAlpha: 0, scale: 0.4 });
      gsap.set(".if-brief", { autoAlpha: 1, scale: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: el, start: "top top", end: "+=260%", pin: true, scrub: 0.6,
          onUpdate: (st) => {
            const i = Math.min(3, Math.floor(st.progress * 4));
            stages.forEach((s, j) => s.classList.toggle("is-on", j === i));
            if (count.dataset.i !== String(i)) { count.dataset.i = String(i); count.textContent = states[i][0]; label.textContent = states[i][1]; }
          },
        },
      });
      // Generate: every idea pops in from the brief at the centre.
      tl.to(".if-chip", { autoAlpha: 1, scale: 1, duration: 1, stagger: { each: 0.02, from: "center" } }, 0.4)
        // Edit: most are cut.
        .to(cut, { autoAlpha: 0.12, scale: 0.7, filter: "grayscale(1)", duration: 1, stagger: { each: 0.01, from: "random" } }, "+=0.4")
        .to(kept, { scale: 1.15, duration: 0.6 }, "<0.4")
        // Ship: the five come forward, the rest fall away.
        .to(cut, { autoAlpha: 0, y: 20, duration: 0.8 }, "+=0.4")
        .to(kept, { scale: 1.45, duration: 0.8, ease: "back.out(2)" }, "<")
        .to({}, { duration: 0.4 });
    }, el);
    return () => ctx.revert();
  }, []);

  // Outer div stays React's own while GSAP wraps the pinned section in a spacer.
  return (
    <div>
      <section ref={root} className="relative overflow-hidden bg-ink text-white" aria-labelledby="if-h">
        <div className="container-air grid min-h-[100svh] items-center gap-10 py-[calc(var(--nav-h)+24px)] md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-[13px] uppercase tracking-[0.14em] text-white/50">The AI pipeline</p>
            <h2 id="if-h" className="text-[clamp(30px,4vw,52px)] leading-[1.05] tracking-[-0.02em]">
              Anyone can generate fifty captions. Very few can pick the <em className="cursive not-italic text-brand-glow">five</em> worth publishing.
            </h2>
            <ol className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4">
              {pipeline.map((p) => (
                <li key={p.n} className="if-stage group border-t border-white/15 pt-3 transition-colors duration-500 [&.is-on]:border-brand">
                  <p className="text-[12px] text-white/60 transition-colors group-[.is-on]:text-brand-glow">{p.n}</p>
                  <p className="text-[20px] text-white/70 transition-colors group-[.is-on]:text-white">{p.title}</p>
                  <p className="mt-1 text-[13px] text-white/60 transition-colors group-[.is-on]:text-white/75">{p.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative">
            <p className="mb-6 flex items-baseline gap-3" aria-hidden>
              <span className="if-count text-gradient-brand text-[64px] font-medium leading-none tracking-[-0.04em]">5</span>
              <span className="if-label text-white/60">shipped to you</span>
            </p>
            <div className="grid grid-cols-10 gap-2" aria-hidden>
              {Array.from({ length: COUNT }, (_, i) => (
                <span
                  key={i}
                  className={`if-chip ${KEEP.has(i) ? "keep" : ""} ${i === 24 ? "if-brief" : ""} flex aspect-[4/5] flex-col justify-end gap-1 rounded-[6px] p-1.5 ${
                    KEEP.has(i) ? "relative z-10 shadow-[0_8px_24px_-8px_rgba(255,33,79,.8)]" : "bg-white/10"
                  }`}
                  style={KEEP.has(i) ? { background: "var(--gradient-brand)" } : undefined}
                >
                  <span className="h-[3px] w-full rounded-full bg-white/50" />
                  <span className="h-[3px] w-2/3 rounded-full bg-white/30" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
