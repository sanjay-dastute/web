"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Desktop pointer layer:
 * - a small hexagon follower that grows over links and buttons,
 * - magnetic buttons: any `.btn` leans toward the pointer and springs back on leave.
 * Off for touch devices and reduced motion; the native cursor is never hidden.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const el = dot.current!;
    el.style.display = "block";
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    let magnet: HTMLElement | null = null;

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const target = e.target as Element | null;
      const hot = target?.closest("a, button, summary, [role=tab], [role=radio]");
      el.classList.toggle("is-hot", !!hot);

      const btn = target?.closest<HTMLElement>(".btn") ?? null;
      if (magnet && magnet !== btn) { gsap.to(magnet, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" }); magnet = null; }
      if (btn) {
        magnet = btn;
        const r = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4, ease: "power3.out" });
      }
    };
    const leave = () => el.classList.add("is-out");
    const enter = () => el.classList.remove("is-out");

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
      if (magnet) gsap.set(magnet, { x: 0, y: 0 });
    };
  }, []);

  return (
    <div ref={dot} className="cursor-hex" style={{ display: "none" }} aria-hidden>
      <svg viewBox="0 0 100 100"><polygon points="50,4 90,27 90,73 50,96 10,73 10,27" /></svg>
    </div>
  );
}
