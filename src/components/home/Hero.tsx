"use client";

import Link from "next/link";
import { Component, useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import { gsap } from "gsap";
import { onIntroDone } from "@/components/Loader";
import { LogoMark } from "@/components/Logo";

class LogoSceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [Glass, setGlass] = useState<ComponentType<{ active?: boolean; onReady?: () => void }> | null>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const markReady = useCallback(() => setSceneReady(true), []);
  const markFailed = useCallback(() => setSceneReady(false), []);
  const [visible, setVisible] = useState(true);

  // Pause the WebGL loop while the hero is off-screen (it otherwise renders every frame behind the pinned scenes).
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  // WebGL scene: desktop with a fine pointer only, loaded once the browser is idle so it never competes with
  // first paint. Phones keep the SVG mark below (three.js costs seconds of CPU on a mid-range phone).
  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    const load = () => import("@/components/GlassScene")
      .then((m) => { if (!cancelled) setGlass(() => m.default); })
      .catch(() => { /* Keep the SVG visible if the 3D bundle cannot load. */ });
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
    const id = idle(load);
    return () => { cancelled = true; (window.cancelIdleCallback ?? window.clearTimeout)(id); };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let off: (() => void) | void;
    const ctx = gsap.context((self) => {
      gsap.set([".hero-line > span", ".hero-fade", ".hero-glass"], { autoAlpha: 0 });

      // Registered on the context so its selectors stay scoped and it reverts with everything else.
      const play = self.add("play", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo(".hero-glass", { autoAlpha: 0, scale: 0.6, rotate: -8 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 2.2 }, 0)
          .fromTo(".hero-line > span", { autoAlpha: 1, yPercent: 110 }, { yPercent: 0, duration: 1.4, stagger: 0.12 }, 0.2)
          .fromTo(".hero-fade", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 0.9);
      });
      off = onIntroDone(play as () => void);

      // Scroll away: camera pushes into the mark while the headline parts.
      const out = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hero-glass", { scale: 1.9, yPercent: 10, ease: "none", scrollTrigger: out });
      gsap.to(".hero-top", { yPercent: -60, autoAlpha: 0, ease: "none", scrollTrigger: out });
      gsap.to(".hero-bottom", { yPercent: 40, autoAlpha: 0, ease: "none", scrollTrigger: out });
    }, root);
    return () => { off?.(); ctx.revert(); };
  }, []);

  return (
    <section ref={root} className="sky relative flex min-h-[100svh] flex-col overflow-hidden pt-[var(--nav-h)]">
      {/* Brand glow behind the glass so the refraction picks up colour. */}

      {/* Mobile: its own slot between headline and copy. Desktop: floats under the headline. */}
      <div className="hero-glass relative order-2 h-[30svh] md:absolute md:inset-x-0 md:top-[38%] md:bottom-[12%] md:h-auto" aria-hidden>
          <div className={`hero-float pointer-events-none absolute inset-0 grid place-items-center ${sceneReady ? "invisible" : ""}`}>
            <LogoMark className="h-[70%] w-auto drop-shadow-[0_20px_40px_rgba(255,33,79,.35)]" gradient />
          </div>
        {Glass && (
          <LogoSceneBoundary onError={markFailed}>
            <Glass active={visible} onReady={markReady} />
          </LogoSceneBoundary>
        )}
      </div>

      <div className="hero-top container-air relative order-1 pt-[clamp(24px,5vh,56px)] text-center">
        <p className="hero-fade pill bg-white/70 backdrop-blur">Creative &amp; technology studio · Coimbatore</p>
        <h1 className="mx-auto mt-6 max-w-[1100px] text-[clamp(36px,6.7vw,102px)] font-medium leading-[0.98] tracking-[-0.035em]">
          <span className="hero-line line-mask"><span>Brands built to be</span></span>
          <span className="hero-line line-mask">
            <span>
              <em className="cursive not-italic text-gradient-brand text-[1.12em]">understood.</em>{" "}
              <span className="display text-[1.05em]">Fast.</span>
            </span>
          </span>
        </h1>
      </div>

      <div className="hero-bottom container-air relative order-3 mt-auto pb-8 text-center">
        <div className="mx-auto max-w-[440px]">
          <p className="hero-fade text-[17px] leading-[1.5] text-ink/75">
            Branding, websites, apps, marketing and search, with AI across our production process so the work ships
            sooner and gets tested harder.
          </p>
          <div className="hero-fade mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn btn-brand">Start a Project →</Link>
            <Link href="/work" className="btn btn-ghost btn-glass">See Our Work</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
