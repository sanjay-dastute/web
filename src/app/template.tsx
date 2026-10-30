"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { LogoMark } from "@/components/Logo";

// The logo intro covers the first page; the wipe only plays on later navigations.
let firstMount = true;

/** Page transition: on each navigation a brand-red panel with the mark lifts away to reveal the new page. */
export default function Template({ children }: { children: React.ReactNode }) {
  const wipe = useRef<HTMLDivElement>(null);
  // Decided once per mount (state initialiser), so React's dev double-effect can't replay it on first load.
  // On navigations the panel is in the very first paint, so the new page never flashes before the wipe;
  // the first mount is server-rendered with it hidden, so hydration matches.
  const [play] = useState(
    () => !firstMount && typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    firstMount = false;
    const el = wipe.current!;
    if (!play) return;
    el.style.display = "grid";
    const tl = gsap.timeline({ onComplete: () => { el.style.display = "none"; } })
      .fromTo(".pt-mark", { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.35, ease: "back.out(2)" })
      .to(".pt-mark", { scale: 1.4, autoAlpha: 0, duration: 0.3, ease: "power2.in" }, "+=0.1")
      .fromTo(el, { clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)" }, { clipPath: "polygon(0 0,100% 0,100% 0,0 0)", duration: 0.7, ease: "expo.inOut" }, "-=0.15");
    return () => { tl.kill(); el.style.display = "none"; };
  }, [play]);

  return (
    <>
      <div
        ref={wipe}
        className="pointer-events-none fixed inset-0 z-[90] place-items-center"
        style={{ background: "var(--gradient-brand)", display: play ? "grid" : "none" }}
        aria-hidden
      >
        <span className="pt-mark grid h-24 w-24 place-items-center rounded-[28px] bg-white">
          <LogoMark className="h-12 w-auto" />
        </span>
      </div>
      {children}
    </>
  );
}
