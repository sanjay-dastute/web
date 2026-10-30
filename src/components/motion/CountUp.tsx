"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Rolls the number inside a stat ("1.1M+", "INR 50", "< INR 10", "56x") up from zero when it scrolls into view.
 * The server renders the final text, so search engines and no-JS visitors read the real figure.
 */
export default function CountUp({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const m = text.match(/^(\D*?)([\d,]*\.?\d+)(.*)$/);
    if (!el || !m || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, pre, raw, post] = m;
    const end = Number(raw.replace(/,/g, ""));
    const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
    const fmt = (v: number) => pre + (decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-IN")) + post;
    const obj = { v: 0 };
    el.textContent = fmt(0);
    const tween = gsap.to(obj, {
      v: end,
      duration: 1.8,
      ease: "power3.out",
      onUpdate: () => { el.textContent = fmt(obj.v); },
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); el.textContent = text; };
  }, [text]);

  return <span ref={ref} className={className}>{text}</span>;
}
