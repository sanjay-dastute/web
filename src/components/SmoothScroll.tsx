"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Lenis smooth scroll + a global `[data-reveal]` fade-up for every page. */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Reduced motion: leave content in place rather than hiding it until it scrolls into view.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      // Headings marked [data-split]: words rise out of a mask one after another, and the cursive accent
      // word is "written" on with a left-to-right wipe. Only used on server-rendered headings that React
      // never patches, so swapping their text nodes for word spans is safe.
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((h) => {
        if (!h.dataset.splitDone) {
          h.dataset.splitDone = "1";
          const walk = (node: Node) => {
            [...node.childNodes].forEach((c) => {
              if (c.nodeType === Node.TEXT_NODE) {
                const frag = document.createDocumentFragment();
                (c.textContent ?? "").split(/(\s+)/).forEach((w) => {
                  if (!w) return;
                  if (/^\s+$/.test(w)) { frag.append(w); return; }
                  const mask = document.createElement("span");
                  mask.className = "split-mask";
                  const inner = document.createElement("span");
                  inner.className = "split-word";
                  inner.textContent = w;
                  mask.append(inner);
                  frag.append(mask);
                });
                c.replaceWith(frag);
              } else if (c instanceof HTMLElement && !c.classList.contains("cursive")) {
                walk(c);
              }
            });
          };
          walk(h);
        }
        const tl = gsap.timeline({ scrollTrigger: { trigger: h, start: "top 85%" } });
        tl.from(h.querySelectorAll(".split-word"), { yPercent: 110, duration: 0.9, stagger: 0.05, ease: "expo.out" });
        const accents = h.querySelectorAll(".cursive");
        if (accents.length) tl.fromTo(accents, { clipPath: "inset(-20% 100% -20% 0)" }, { clipPath: "inset(-20% 0% -20% 0)", duration: 0.9, ease: "power2.inOut" }, "-=0.5");
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: Number(el.dataset.reveal) || 0,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [pathname]);

  return null;
}
