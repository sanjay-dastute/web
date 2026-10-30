"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LogoMark } from "@/components/Logo";
import { dmServices } from "@/lib/proposal";

gsap.registerPlugin(ScrollTrigger);

const N = dmServices.length;

/**
 * The 16 digital marketing services as a pinned orbit: badges circle the logo mark, scrolling turns the
 * ring, and the badge at the front (left, next to the copy) is the one described. All 16 descriptions stay
 * in the DOM. Phones and reduced motion get a plain grid instead.
 */
export default function ServicesOrbit() {
  const root = useRef<HTMLElement>(null);
  const [orbit, setOrbit] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    const on = () => setOrbit(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (!orbit) return;
    const ring = root.current!.querySelector<HTMLElement>(".orb-ring")!;
    const badges = gsap.utils.toArray<HTMLElement>(".orb-badge", root.current);
    let last = -1;

    // Place badge i on the circle; the badge at angle PI (far left) is the "front" one.
    const place = (p: number) => {
      const R = ring.offsetWidth / 2;
      const turn = p * (N - 1);
      badges.forEach((b, i) => {
        const a = Math.PI + ((i - turn) / N) * Math.PI * 2;
        const near = Math.max(0, 1 - Math.abs(((i - turn + N / 2) % N + N) % N - N / 2));
        gsap.set(b, { x: Math.cos(a) * R, y: Math.sin(a) * R * 0.82, scale: 0.8 + near * 0.55, zIndex: Math.round(near * 10), opacity: 0.8 + near * 0.2 });
      });
      const idx = Math.round(turn);
      if (idx !== last) { last = idx; setActive(idx); }
    };

    const ctx = gsap.context(() => {
      place(0);
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: `+=${N * 110}`,
        pin: true,
        scrub: 0.6,
        onUpdate: (st) => place(st.progress),
        onRefresh: (st) => place(st.progress),
      });
    }, root);
    // Created a render after the triggers below it; restore page order and recompute.
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [orbit]);

  const head = (
    <>
      <p className="mb-4 text-[13px] uppercase tracking-[0.14em] text-mute">Our services</p>
      <h2 className="text-[clamp(32px,4.2vw,56px)] leading-[1.05] tracking-[-0.02em]">
        16 digital marketing services under <em className="cursive not-italic text-brand-deep">one roof</em>
      </h2>
    </>
  );

  if (!orbit) {
    return (
      <section className="container-air py-[120px]">
        <div className="mb-12">{head}</div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {dmServices.map((s) => (
            <li key={s.code} className="card-haze flex gap-4 p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-white text-[13px] font-medium text-brand-deep">{s.code}</span>
              <span>
                <span className="block text-[16px] leading-[1.3]">{s.title}</span>
                <span className="mt-1 block text-[13px] text-ink/65">{s.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  // Outer div stays React's own while GSAP wraps the pinned section in a spacer.
  return (
    <div>
      <section ref={root} className="relative overflow-hidden bg-brand-petal">
        <div className="container-air grid min-h-[100svh] grid-cols-[0.9fr_1.1fr] items-center gap-10 py-[calc(var(--nav-h)+24px)]">
          <div>
            {head}
            <p className="mt-10 text-[13px] text-mute" aria-hidden>
              {String(active + 1).padStart(2, "0")} / {N}
            </p>
            {/* Every description is rendered; only the front one is shown. */}
            <ul className="relative mt-3 min-h-[150px]">
              {dmServices.map((s, i) => (
                <li
                  key={s.code}
                  aria-current={i === active}
                  className={`absolute inset-x-0 top-0 transition-all duration-500 ${i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
                >
                  <p className="text-[clamp(28px,3vw,40px)] leading-[1.1] tracking-[-0.02em]">{s.title}</p>
                  <p className="mt-3 text-[18px] text-ink/70">{s.body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 h-[3px] w-full max-w-[360px] overflow-hidden rounded-full bg-brand-blush" aria-hidden>
              <div className="h-full rounded-full transition-[width] duration-300" style={{ width: `${((active + 1) / N) * 100}%`, background: "var(--gradient-brand)" }} />
            </div>
          </div>

          <div className="orb-ring relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden>
            <div className="absolute inset-[6%] rounded-full border border-dashed border-brand/25" />
            <div className="absolute inset-[30%] rounded-full opacity-60 blur-[50px]" style={{ background: "var(--gradient-brand)" }} />
            <LogoMark className="absolute left-1/2 top-1/2 h-[26%] w-auto -translate-x-1/2 -translate-y-1/2" />
            {dmServices.map((s, i) => (
              <span
                key={s.code}
                className={`orb-badge absolute left-1/2 top-1/2 -ml-7 -mt-7 grid h-14 w-14 place-items-center rounded-[16px] text-[14px] font-medium shadow-[0_10px_30px_-12px_rgba(255,33,79,.5)] transition-colors duration-300 ${
                  i === active ? "text-white" : "bg-white text-brand-ember"
                }`}
                style={i === active ? { background: "var(--gradient-brand)" } : undefined}
              >
                {s.code}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
