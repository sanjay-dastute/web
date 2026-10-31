"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MARK_PARTS, MARK_VIEWBOX } from "@/lib/logo";

gsap.registerPlugin(ScrollTrigger);

// Where each stroke drifts to as the page scrolls away (SVG units).
const exits = [
  { x: -260, y: -140, rotate: -35 },
  { x: 280, y: -60, rotate: 30 },
  { x: 40, y: 320, rotate: 60 },
];

/**
 * Inner-page hero motif: the logo's three strokes assemble on load, float independently, lean toward the
 * pointer, and fly apart as you scroll away while the hero copy lifts out. Decorative only.
 */
export default function HeroMark() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    const section = el.closest("section")!;
    const ctx = gsap.context(() => {
      const parts = gsap.utils.toArray<SVGPathElement>(".hm-part", el);
      // Assemble on load, then a slow independent float per stroke.
      gsap.from(parts, { x: (i) => exits[i].x * 0.6, y: (i) => exits[i].y * 0.6, rotate: (i) => exits[i].rotate, autoAlpha: 0, transformOrigin: "50% 50%", duration: 1.6, stagger: 0.1, ease: "expo.out", delay: 0.2 });
      parts.forEach((p, i) => gsap.to(p, { y: `+=${10 + i * 6}`, rotate: `+=${i % 2 ? 4 : -4}`, duration: 3 + i, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.8 }));

      // Scroll away: strokes part, copy lifts out.
      const out = { trigger: section, start: "top top", end: "bottom top", scrub: true };
      const groups = parts.map((p) => p.parentElement!);
      ScrollTrigger.create({
        ...out,
        onUpdate: (st) => groups.forEach((g, i) => gsap.set(g, { x: exits[i].x * st.progress, y: exits[i].y * st.progress, rotate: exits[i].rotate * st.progress, transformOrigin: "50% 50%" })),
      });
      gsap.to(section.querySelector(".ph-copy"), { yPercent: -18, autoAlpha: 0, ease: "none", scrollTrigger: out });
    }, el);

    // Lean toward the pointer (mouse only).
    const tilt = gsap.quickTo(el, "rotationY", { duration: 0.8, ease: "power3.out" });
    const tiltX = gsap.quickTo(el, "rotationX", { duration: 0.8, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tilt((e.clientX / innerWidth - 0.5) * 18);
      tiltX(-(e.clientY / innerHeight - 0.5) * 14);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { window.removeEventListener("pointermove", move); ctx.revert(); };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute right-[3%] top-1/2 hidden aspect-square w-[min(34vw,440px)] -translate-y-1/2 [perspective:900px] md:block"
      aria-hidden
    >
      <div className="absolute inset-[18%] rounded-full opacity-50 blur-[70px]" style={{ background: "var(--gradient-brand)" }} />
      <svg viewBox={MARK_VIEWBOX} className="absolute inset-[16%] overflow-visible">
        <defs>
          <linearGradient id="hm-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff6b88" />
            <stop offset="55%" stopColor="#ff214f" />
            <stop offset="100%" stopColor="#d6103c" />
          </linearGradient>
        </defs>
        {/* Group per stroke: the scroll-apart moves the group, the float moves the path inside it. */}
        {MARK_PARTS.map((d, i) => (
          <g key={i}><path className="hm-part" d={d} fill="url(#hm-grad)" fillRule="evenodd" /></g>
        ))}
      </svg>
    </div>
  );
}
