"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MARK_PARTS, MARK_VIEWBOX } from "@/lib/logo";
import { problemLines } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/* Where each logo stroke flies in from (SVG units), roughly matching its fragment card. */
const partStarts = [
  { x: -620, y: -260, rotate: -38 },
  { x: 640, y: -40, rotate: 32 },
  { x: -80, y: 520, rotate: 70 },
];

/**
 * Home scenes 2-3, one pinned timeline:
 * the problem (three freelancer pieces that never match drift apart) -> the turn (the logo's three
 * strokes fly in from where those pieces were and lock into the hexagon).
 * Without JS or with reduced motion, the section renders as a static, fully readable layout.
 */
export default function Story() {
  const root = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAnimated(true);
  }, []);

  useEffect(() => {
    if (!animated) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=320%", pin: true, scrub: 0.8 },
      });

      // Act 1 - the problem.
      tl.from(".st-head .line-mask > span", { yPercent: 110, stagger: 0.1, duration: 1 })
        .to(".st-invisible", { opacity: 0.12, duration: 1 }, "+=0.2")
        .from(".st-sub", { autoAlpha: 0, y: 20, duration: 0.8 }, "<");

      gsap.utils.toArray<HTMLElement>(".st-frag").forEach((frag, i) => {
        tl.from(frag, { autoAlpha: 0, scale: 0.7, y: 80, rotate: 0, duration: 1.1, ease: "expo.out" }, i === 0 ? "+=0.2" : "-=0.5")
          .from(`.st-line-${i}`, { autoAlpha: 0, x: -30, duration: 0.8 }, "<0.2");
      });
      // The pieces drift further apart and lose colour: nothing holds together.
      tl.to(".st-frag", { x: (i) => [-60, 70, -30][i], y: (i) => [-40, 20, 60][i], rotate: (i) => [-10, 9, -6][i], filter: "grayscale(1)", opacity: 0.7, duration: 1.4 }, "+=0.3");

      // Act 2 - the turn.
      tl.to([".st-act1", ".st-lines"], { autoAlpha: 0, y: -40, duration: 0.8 }, "+=0.2")
        .to(".st-frag", { x: 0, y: 0, left: "50%", top: "50%", xPercent: -50, yPercent: -50, scale: 0.15, rotate: 0, autoAlpha: 0, duration: 1.2, ease: "power3.in", stagger: 0.08 }, "<0.2")
        .from(".st-part", { x: (i) => partStarts[i].x, y: (i) => partStarts[i].y, rotate: (i) => partStarts[i].rotate, autoAlpha: 0, transformOrigin: "50% 50%", duration: 1.6, ease: "expo.out", stagger: 0.12 }, "-=0.5")
        .from(".st-glow", { autoAlpha: 0, scale: 0.4, duration: 1.2 }, "-=0.8")
        .from(".st-turn .line-mask > span", { yPercent: 110, stagger: 0.1, duration: 1 }, "-=0.6")
        .to({}, { duration: 0.6 });
    }, root);
    // This pin is created a render after the triggers below it (Process, reveals), so put every
    // trigger back in page order and recompute their starts to include this pin's scroll length.
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [animated]);

  // Pinning wraps the section in a GSAP spacer; the outer div keeps the node React unmounts its own,
  // otherwise leaving the page throws "removeChild: not a child of this node".
  return (
    <div>
      <section ref={root} className="relative overflow-hidden bg-brand-petal" aria-labelledby="story-h">
        <div className="container-air relative grid min-h-[100svh] items-center gap-6 md:gap-10 py-[calc(var(--nav-h)+24px)] md:grid-cols-[1fr_1.1fr]">
          {/* Copy column. */}
          <div className="relative z-10">
            <div className="st-act1">
              <h2 id="story-h" className="st-head text-[clamp(34px,4.8vw,64px)] font-medium leading-[1.02] tracking-[-0.03em]">
                <span className="line-mask"><span>Most good businesses are</span></span>
                <span className="line-mask"><span><em className="st-invisible cursive not-italic text-brand-deep">invisible</em> to their</span></span>
                <span className="line-mask"><span>own customers.</span></span>
              </h2>
              <p className="st-sub mt-6 hidden max-w-[460px] md:block text-[17px] text-ink/70">
                Not because the product is weak. Because professional branding and digital work has always been priced for
                large companies, and the affordable alternative is three freelancers who never talk to each other.
              </p>
            </div>
            <ol className="st-lines mt-6 space-y-2 text-[clamp(16px,1.6vw,21px)] md:mt-8 md:space-y-3">
              {problemLines.map((l, i) => (
                <li key={l} className={`st-line-${i} flex gap-3`}>
                  <span className="mt-[0.6em] h-[6px] w-[6px] shrink-0 rounded-full bg-brand" aria-hidden />
                  {l}
                </li>
              ))}
            </ol>
          </div>
  
          {/* Stage: fragments, then the mark. */}
          <div className="relative aspect-square w-full max-w-[min(560px,68svh,82vw)] justify-self-center" aria-hidden>
            <div className="st-frag absolute left-[2%] top-[6%] w-[44%] rotate-[-6deg] rounded-[22px] bg-[#efe4ff] p-5 shadow-[0_20px_40px_-20px_rgba(0,0,0,.25)]">
              <p className="text-[10px] uppercase tracking-[0.14em] text-ink/50">Logo · freelancer 1</p>
              <p className="mt-6 font-serif text-[clamp(22px,2.6vw,34px)] italic leading-none text-[#5b3fa0]">Your Brand</p>
              <p className="mt-2 text-[11px] text-ink/50">est. 2019</p>
            </div>
  
            <div className="st-frag absolute right-[0%] top-[30%] w-[52%] rotate-[5deg] overflow-hidden rounded-[18px] bg-white shadow-[0_20px_40px_-20px_rgba(0,0,0,.25)]">
              <div className="flex gap-1.5 border-b border-line px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-ink/15" /><span className="h-2 w-2 rounded-full bg-ink/15" /><span className="h-2 w-2 rounded-full bg-ink/15" />
              </div>
              <div className="space-y-2 p-4">
                <p className="text-[10px] uppercase tracking-[0.14em] text-ink/50">Website · freelancer 2</p>
                <div className="h-3 w-3/4 rounded bg-[#1f6f5c]/70" />
                <div className="h-2 w-full rounded bg-ink/10" />
                <div className="h-2 w-5/6 rounded bg-ink/10" />
                <p className="pt-2 text-[12px] text-ink/60">Visitors this week: <b className="text-ink">3</b></p>
              </div>
            </div>
  
            <div className="st-frag absolute bottom-[4%] left-[14%] w-[46%] rotate-[-3deg] rounded-[14px] bg-[#fff3b0] p-4 shadow-[0_20px_40px_-20px_rgba(0,0,0,.25)]">
              <p className="text-[10px] uppercase tracking-[0.14em] text-ink/50">Ads · freelancer 3</p>
              <p className="mt-3 text-[clamp(16px,1.8vw,22px)] font-bold uppercase leading-tight text-[#c2410c]">Big sale!!! Best quality products</p>
              <p className="mt-2 text-[11px] text-ink/50">Contact for more details</p>
            </div>
  
            <div className="st-glow absolute inset-[18%] rounded-full opacity-50 blur-[70px]" style={{ background: "var(--gradient-brand)" }} />
            <svg viewBox={MARK_VIEWBOX} className="absolute inset-[22%] overflow-visible">
              <defs>
                <linearGradient id="st-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ff6b88" />
                  <stop offset="55%" stopColor="#ff214f" />
                  <stop offset="100%" stopColor="#d6103c" />
                </linearGradient>
              </defs>
              {MARK_PARTS.map((d, i) => (
                <path key={i} className="st-part" d={d} fill="url(#st-grad)" fillRule="evenodd" />
              ))}
            </svg>
          </div>
  
          {/* Act 2 headline, laid over the copy column once act 1 clears. */}
          <p
            className={`st-turn text-[clamp(30px,4.4vw,60px)] font-medium leading-[1.02] tracking-[-0.03em] ${
              animated
                ? "pointer-events-none absolute inset-x-[20px] top-[calc(var(--nav-h)+40px)] text-center md:inset-x-auto md:left-[20px] md:top-1/2 md:max-w-[44%] md:-translate-y-1/2 md:text-left"
                : "md:col-span-2"
            }`}
          >
            <span className="line-mask"><span>We built Creatoos</span></span>
            <span className="line-mask"><span>to <em className="cursive not-italic text-gradient-brand text-[1.12em]">close that gap.</em></span></span>
          </p>
        </div>
      </section>
    </div>
  );
}
