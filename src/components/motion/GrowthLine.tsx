"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Illustrative follower curve, 50 -> 2,849 (shape only; the real figures are in the stat text).
const POINTS = "0,58 14,57 28,55 42,51 56,46 70,38 84,27 100,4";

/** A small curve that draws itself when it scrolls into view - used for the 56x follower stat. */
export default function GrowthLine({ label }: { label: string }) {
  const ref = useRef<SVGPolylineElement>(null);

  useEffect(() => {
    const line = ref.current;
    if (!line || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const len = line.getTotalLength();
    gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
    const tween = gsap.to(line, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", scrollTrigger: { trigger: line, start: "top 90%", once: true } });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  return (
    <svg viewBox="0 0 100 62" className="mt-4 h-12 w-full overflow-visible" role="img" aria-label={label}>
      <line x1="0" y1="60" x2="100" y2="60" stroke="var(--color-line)" />
      <polyline ref={ref} points={POINTS} fill="none" stroke="var(--color-brand)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <circle cx="100" cy="4" r="3" fill="var(--color-brand)" />
    </svg>
  );
}
