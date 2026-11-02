"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Group = { title: string; body: string };

/**
 * The AI steps on a vertical track: a gradient line fills as you scroll, and each step's node and text
 * light up and settle as the line reaches it. Reduced motion shows every step lit.
 */
export default function AiTrack({ steps }: { steps: Group[] }) {
  const root = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".ai-fill", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 60%", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".ai-step").forEach((s) => {
        gsap.fromTo(s, { x: 14 }, { x: 0, duration: 0.5, scrollTrigger: { trigger: s, start: "top 62%", toggleActions: "play none none reverse" } });
        const dot = s.querySelector(".ai-dot");
        gsap.fromTo(dot, { scale: 0.5, backgroundColor: "#ffffff" }, { scale: 1, backgroundColor: "#ff214f", duration: 0.4, scrollTrigger: { trigger: s, start: "top 62%", toggleActions: "play none none reverse" } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <ol ref={root} className="relative pl-12">
      <span aria-hidden className="absolute bottom-3 left-[11px] top-3 w-[2px] bg-line" />
      <span aria-hidden className="ai-fill absolute bottom-3 left-[11px] top-3 w-[2px] origin-top" style={{ background: "var(--gradient-brand)" }} />
      {steps.map((a, i) => (
        <li key={a.title} className="ai-step relative py-6">
          <span aria-hidden className="ai-dot absolute -left-12 top-7 h-6 w-6 rounded-full border-2 border-brand bg-brand" />
          <span className="text-[13px] text-mute">Step {String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-1 text-[22px] leading-[1.3]">{a.title}</h3>
          <p className="mt-2 text-ink/70">{a.body}</p>
        </li>
      ))}
    </ol>
  );
}
