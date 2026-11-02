"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/content";
import Tilt from "@/components/motion/Tilt";

gsap.registerPlugin(ScrollTrigger);

/**
 * The nine services as a horizontal reel. On wide screens the section pins and vertical scroll drives the
 * reel sideways, with a progress bar and the big tag word drifting on each card. Phones and reduced motion
 * get a native swipe strip instead.
 */
export default function ServiceDeck() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const track = root.current!.querySelector<HTMLElement>(".deck-track")!;
      const dist = () => track.scrollWidth - window.innerWidth + 80;
      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
      });
      gsap.to(".deck-bar", { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${dist()}`, scrub: true } });
      // The tag word on each card drifts against the scroll for depth.
      gsap.utils.toArray<HTMLElement>(".deck-word").forEach((w) => {
        gsap.fromTo(w, { xPercent: 20 }, { xPercent: -20, ease: "none", scrollTrigger: { trigger: w, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
      });
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
    return () => mm.revert();
  }, []);

  return (
    // Outer div stays React's own while GSAP wraps the pinned section in a spacer.
    <div>
      <section ref={root} className="overflow-hidden bg-ink text-white">
        <div className="flex min-h-[100svh] flex-col justify-center py-[96px] lg:py-0">
          <div className="container-air mb-10 flex w-full items-end justify-between gap-6">
            <div>
              <p className="mb-4 text-[13px] uppercase tracking-[0.14em] text-white/75">Nine service lines</p>
              <h2 className="text-[clamp(32px,4.6vw,56px)] leading-[1.05] tracking-[-0.02em]">
                Pick one. Or <em className="cursive not-italic text-brand-glow">the whole stack.</em>
              </h2>
            </div>
            <p className="hidden text-[14px] text-white/75 lg:block">Scroll to move through</p>
          </div>

          <ol className="deck-track flex snap-x snap-mandatory scroll-px-[max(20px,4vw)] gap-5 overflow-x-auto px-[max(20px,4vw)] pb-4 lg:w-max lg:snap-none lg:overflow-visible lg:pb-0">
            {services.map((s, i) => (
              <li key={s.slug} className="w-[82vw] shrink-0 snap-start sm:w-[420px] lg:w-[440px]">
                <Tilt className="h-full">
                  <Link
                    href={`/services/${s.slug}`}
                    className="group relative flex h-[440px] flex-col justify-between overflow-hidden rounded-[20px] bg-white/[0.06] p-8 ring-1 ring-white/10 transition-colors duration-500 hover:bg-brand-deep"
                  >
                    <span aria-hidden className="deck-word display pointer-events-none absolute -right-6 top-16 whitespace-nowrap text-[120px] leading-none text-white/[0.07] transition-colors duration-500 group-hover:text-white/20">{s.icon}</span>
                    <span className="relative flex items-center justify-between text-[13px] text-white/80">
                      <span>{String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</span>
                      <span className="cursive text-[24px] text-brand-glow transition-colors group-hover:text-white">{s.tagline}</span>
                    </span>
                    <span className="relative">
                      <span className="block text-[32px] leading-[1.1] tracking-[-0.02em]">{s.title}</span>
                      <span className="mt-3 block text-[15px] text-white/70 group-hover:text-white/90">{s.blurb}</span>
                      <span className="mt-6 inline-flex items-center gap-3 text-[14px]">
                        Explore
                        <span aria-hidden className="relative block h-[2px] w-6 bg-current transition-all duration-500 group-hover:w-10 after:absolute after:-right-px after:-top-[4px] after:h-[10px] after:w-[10px] after:rotate-45 after:border-r-2 after:border-t-2 after:border-current after:content-['']" />
                      </span>
                    </span>
                  </Link>
                </Tilt>
              </li>
            ))}
          </ol>

          <div className="container-air mt-10 hidden w-full lg:block" aria-hidden>
            <div className="h-[2px] w-full bg-white/10">
              <div className="deck-bar h-full origin-left scale-x-0" style={{ background: "var(--gradient-brand)" }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
