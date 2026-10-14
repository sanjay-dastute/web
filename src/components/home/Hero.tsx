"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { gsap } from "gsap";

const clouds = [
  { w: 520, h: 160, top: "12%", left: "4%", dur: 60 },
  { w: 420, h: 130, top: "26%", left: "58%", dur: 75 },
  { w: 680, h: 200, top: "62%", left: "-6%", dur: 90 },
  { w: 560, h: 170, top: "70%", left: "52%", dur: 70 },
  { w: 300, h: 100, top: "42%", left: "30%", dur: 55 },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [Glass, setGlass] = useState<ComponentType | null>(null);

  // WebGL scene loads client-side only, after first paint.
  useEffect(() => {
    import("@/components/GlassScene").then((m) => setGlass(() => m.default));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-line > span", { yPercent: 110, duration: 1.4, stagger: 0.12, delay: 0.15 })
        .from(".hero-fade", { opacity: 0, y: 20, duration: 1, stagger: 0.1 }, "-=0.9")
        .from(".hero-glass", { opacity: 0, scale: 0.85, duration: 2 }, 0);

      // Parallax out on scroll: sculpture drifts up, copy fades.
      gsap.to(".hero-glass", { yPercent: -25, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-copy", { yPercent: 30, opacity: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="sky relative flex min-h-[100svh] items-center overflow-hidden pt-[var(--nav-h)]">
      <div className="clouds" aria-hidden>
        {clouds.map((c, i) => (
          <span key={i} style={{ width: c.w, height: c.h, top: c.top, left: c.left, animationDuration: `${c.dur}s`, animationDirection: i % 2 ? "reverse" : "normal" }} />
        ))}
      </div>

      <div className="hero-glass absolute inset-0 md:left-[30%]" aria-hidden>
        {Glass && <Glass />}
      </div>

      <div className="hero-copy container-air relative w-full py-20">
        <p className="hero-fade pill mb-6 bg-white/60 backdrop-blur">Creative & technology studio · Coimbatore</p>
        <h1 className="max-w-[820px] text-[clamp(44px,7vw,88px)] font-normal leading-[1] tracking-[-0.02em]">
          <span className="hero-line line-mask"><span>Brands built</span></span>
          <span className="hero-line line-mask">
            <span>to be <em className="cursive not-italic text-twilight-blue text-[1.15em]">understood.</em></span>
          </span>
          <span className="hero-line line-mask"><span className="display text-[1.35em] leading-[0.9]">Fast.</span></span>
        </h1>
        <p className="hero-fade mt-8 max-w-[520px] text-[18px] leading-[1.5] text-ink/75">
          Branding, websites, apps, marketing and search - with AI across our production process, so the work ships
          sooner and gets tested harder.
        </p>
        <div className="hero-fade mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-ink">Start a Project →</Link>
          <Link href="/work" className="btn btn-ghost btn-glass">See Our Work</Link>
        </div>
      </div>

      <div className="hero-fade absolute inset-x-0 bottom-6">
        <div className="container-air flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-ink/70">
          {/* TODO: replace bracketed figures with verified numbers. */}
          <span>[ X ]+ projects delivered</span>
          <span>[ X ] years in operation</span>
          <span>Coimbatore-based, serving all of India</span>
        </div>
      </div>
    </section>
  );
}
