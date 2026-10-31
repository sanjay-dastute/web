"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { LOCKUP_MARK_PATH, LOCKUP_VIEWBOX, LOCKUP_WORD_PATH } from "@/lib/logo";

const SEEN_KEY = "creatoos-intro";

/** Fires once the intro has lifted, so scenes can start their entrance timelines. */
export function onIntroDone(cb: () => void) {
  if (document.documentElement.dataset.intro === "done") return cb();
  window.addEventListener("intro:done", cb, { once: true });
  return () => window.removeEventListener("intro:done", cb);
}

function finish() {
  document.documentElement.dataset.intro = "done";
  window.dispatchEvent(new Event("intro:done"));
}

/** Logo intro: the hexagon strokes draw in, fill with brand red, the wordmark slides out, the curtain lifts.
 *  Plays once per browser session; reduced motion gets a short fade. */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(SEEN_KEY) === "1"; } catch {}
    const markSeen = () => { try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {} };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = root.current!;

    if (seen) { setGone(true); finish(); return; }

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.to(el, { opacity: 0, duration: 0.4, delay: 0.3, onComplete: () => { setGone(true); finish(); } });
        return;
      }
      const stroke = el.querySelector<SVGPathElement>(".intro-stroke")!;
      const len = stroke.getTotalLength();
      gsap.set(stroke, { strokeDasharray: len, strokeDashoffset: len });
      gsap.set(".intro-mark", { x: 706 });
      gsap.set(".intro-svg", { visibility: "visible" });

      gsap.timeline({ defaults: { ease: "expo.inOut" }, onComplete: () => { markSeen(); setGone(true); } })
        .to(stroke, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" })
        .to(".intro-fill", { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.25")
        .to(stroke, { opacity: 0, duration: 0.3 }, "<")
        .to(".intro-mark", { x: 0, duration: 0.9 }, "+=0.05")
        .fromTo(".intro-word", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.9 }, "<0.1")
        .to(el, { yPercent: -100, duration: 1.1, ease: "expo.inOut", onStart: finish }, "+=0.45");
    }, el);
    return () => ctx.revert();
  }, []);

  if (gone) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100] grid place-items-center bg-white" aria-hidden>
      <div className="absolute inset-0" style={{ background: "radial-gradient(60% 50% at 50% 50%, var(--color-brand-petal), #fff 70%)" }} />
      <svg viewBox={LOCKUP_VIEWBOX} className="intro-svg relative w-[min(70vw,520px)] overflow-visible" style={{ visibility: "hidden" }}>
        {/* Mark starts centred over the lock-up, then slides left as the wordmark opens. */}
        <g className="intro-mark">
          <path className="intro-stroke" d={LOCKUP_MARK_PATH} fill="none" stroke="var(--color-brand)" strokeWidth={4} />
          <path className="intro-fill" d={LOCKUP_MARK_PATH} fill="url(#intro-grad)" fillRule="evenodd" opacity={0} />
        </g>
        <path className="intro-word" d={LOCKUP_WORD_PATH} fill="var(--color-ink)" fillRule="evenodd" style={{ clipPath: "inset(0 100% 0 0)" }} />
        <defs>
          <linearGradient id="intro-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff4a4a" />
            <stop offset="55%" stopColor="#ff214f" />
            <stop offset="100%" stopColor="#d6103c" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
