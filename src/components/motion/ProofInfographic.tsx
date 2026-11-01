"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "@/components/motion/CountUp";
import { proofStats } from "@/lib/proposal";

const [views, leads, cpl, ctr, growth, chat] = proofStats;

// Views bar heights (an easing curve, for shape only) and the arrow traced over their tops.
const bars = Array.from({ length: 11 }, (_, k) => 24 + 116 * Math.pow(k / 10, 1.6));
const pts = bars.map((h, k) => [k * 40 + 12, 160 - h - 18] as const);
const tip = [pts[10][0] + 14, pts[10][1] - 12] as const;
const arrow = "M" + [...pts, tip].map(([x, y]) => `${x} ${y}`).join(" L");

/**
 * The six proof stats as an infographic. Every visual is drawn to scale from the figure it explains
 * (blocks of 100K views, dots of 10 leads, 10 lit cells in 100, circles sized by follower count), and
 * fills in once the section scrolls into view. Reduced motion shows the finished state.
 */
export default function ProofInfographic() {
  const root = useRef<HTMLDListElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setOn(true);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  // Staggered transition delay for the i-th unit of a visual.
  const d = (i: number, step = 25) => ({ transitionDelay: on ? `${i * step}ms` : "0ms" });
  const tile = "rounded-[18px] p-7 flex flex-col";
  const big = "text-gradient-brand text-[clamp(40px,5vw,64px)] font-medium leading-none tracking-[-0.03em]";

  // Follower circles: area proportional to count, so radius scales with the square root.
  const rBig = 64;
  const rSmall = rBig * Math.sqrt(50 / 2849);

  return (
    <dl ref={root} className="grid gap-4 lg:grid-cols-12">
      {/* Views: bar graph of 11 bars (100K each) with a rising arrow over the tops. */}
      <div className={`${tile} justify-between bg-ink text-white lg:col-span-7`}>
        <div>
          <dd className="text-[clamp(48px,6vw,88px)] font-medium leading-none tracking-[-0.03em]"><CountUp text={views.value} /></dd>
          <dt className="mt-4 text-[18px]">{views.label}</dt>
          <dd className="mt-1 text-[14px] text-white/60">{views.note}</dd>
        </div>
        <dd aria-hidden className="mt-10">
          <svg viewBox="0 0 440 170" className="block w-full overflow-visible">
            <defs>
              <linearGradient id="pi-bar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff6b88" /><stop offset="100%" stopColor="#d6103c" />
              </linearGradient>
            </defs>
            <line x1="0" y1="160" x2="440" y2="160" stroke="rgba(255,255,255,.2)" />
            {bars.map((h, k) => (
              <rect
                key={k} x={k * 40} y={160 - h} width="24" height={h} rx="4" fill="url(#pi-bar)"
                className="transition-transform duration-700 ease-out"
                style={{ transformBox: "fill-box", transformOrigin: "bottom", transform: on ? "scaleY(1)" : "scaleY(0)", ...d(k, 70) }}
              />
            ))}
            {/* Arrow rides just above the bar tops and draws itself once the bars are up. */}
            <path
              d={arrow} pathLength={1} fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="1" style={{ strokeDashoffset: on ? 0 : 1, transition: "stroke-dashoffset 1.4s ease-out .7s" }}
            />
            <path
              d={`M${tip[0] - 14} ${tip[1] - 2} L${tip[0]} ${tip[1]} L${tip[0] - 4} ${tip[1] + 14}`} fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              style={{ opacity: on ? 1 : 0, transition: "opacity .3s 2s" }}
            />
          </svg>
          <p className="mt-3 text-[12px] text-white/50">Each bar = 100K views</p>
        </dd>
      </div>

      {/* Leads: 100 dots of 10. */}
      <div className={`${tile} bg-white lg:col-span-5`}>
        <dd className={big}><CountUp text={leads.value} /></dd>
        <dt className="mt-4 text-[18px]">{leads.label}</dt>
        <dd className="mt-1 text-[14px] text-mute">{leads.note}</dd>
        <dd aria-hidden className="mt-auto pt-8">
          <div className="grid gap-1.5" style={{ gridTemplateColumns: "repeat(20, minmax(0, 1fr))" }}>
            {Array.from({ length: 100 }, (_, i) => (
              <span key={i} className="aspect-square rounded-full bg-brand transition-all duration-500" style={{ opacity: on ? 1 : 0.12, transform: on ? "scale(1)" : "scale(.4)", ...d(i, 12) }} />
            ))}
          </div>
          <p className="mt-3 text-[12px] text-mute">Each dot = 10 leads</p>
        </dd>
      </div>

      {/* CTR: 10 of 100 cells lit. */}
      <div className={`${tile} bg-white lg:col-span-4`}>
        <dd className={big}><CountUp text={ctr.value} /></dd>
        <dt className="mt-4 text-[18px]">{ctr.label}</dt>
        <dd className="mt-1 text-[14px] text-mute">{ctr.note}</dd>
        <dd aria-hidden className="mt-auto pt-8">
          <div className="grid max-w-[220px] gap-1" style={{ gridTemplateColumns: "repeat(10, minmax(0, 1fr))" }}>
            {Array.from({ length: 100 }, (_, i) => {
              const hit = i % 10 === 9 - Math.floor(i / 10) % 10; // one per row, on a diagonal
              return (
                <span
                  key={i}
                  className="aspect-square rounded-[3px] transition-colors duration-500"
                  style={{ background: on && hit ? "var(--color-brand)" : "var(--color-brand-blush)", ...d(hit ? Math.floor(i / 10) : 0, 90) }}
                />
              );
            })}
          </div>
          <p className="mt-3 text-[12px] text-mute">10 in every 100 who saw the ad clicked</p>
        </dd>
      </div>

      {/* Growth: circles sized by follower count. */}
      <div className={`${tile} bg-white lg:col-span-4`}>
        <dd className={big}><CountUp text={growth.value} /></dd>
        <dt className="mt-4 text-[18px]">{growth.label}</dt>
        <dd className="mt-1 text-[14px] text-mute">{growth.note}</dd>
        <dd aria-hidden className="mt-auto flex items-end justify-center gap-6 pt-8">
          <span className="flex flex-col items-center gap-2">
            <svg width={rSmall * 2 + 2} height={rSmall * 2 + 2}><circle cx={rSmall + 1} cy={rSmall + 1} r={rSmall} fill="var(--color-ink)" /></svg>
            <span className="text-[12px] text-mute">50</span>
          </span>
          <span className="text-[12px] text-mute pb-8">to</span>
          <span className="flex flex-col items-center gap-2">
            <svg width={rBig * 2} height={rBig * 2} className="overflow-visible">
              <defs>
                <linearGradient id="pi-g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ff6b88" /><stop offset="50%" stopColor="#ff214f" /><stop offset="100%" stopColor="#d6103c" />
                </linearGradient>
              </defs>
              <circle cx={rBig} cy={rBig} r={rBig} fill="url(#pi-g)" className="origin-center transition-transform duration-[1400ms] ease-out" style={{ transform: on ? "scale(1)" : `scale(${rSmall / rBig})`, transformBox: "fill-box" }} />
            </svg>
            <span className="text-[12px] text-mute">2,849</span>
          </span>
        </dd>
      </div>

      {/* Two cost tiles stacked. */}
      <div className="grid gap-4 lg:col-span-4">
        <div className={`${tile} justify-center bg-white`}>
          <dd className={big}><CountUp text={cpl.value} /></dd>
          <dt className="mt-4 text-[18px]">{cpl.label}</dt>
          <dd className="mt-1 text-[14px] text-mute">{cpl.note}</dd>
        </div>
        <div className={`${tile} relative justify-center overflow-hidden bg-brand-ember`}>
          <svg aria-hidden viewBox="0 0 24 24" className="absolute -right-4 -top-4 h-28 w-28 text-white/15 transition-transform duration-700" style={{ transform: on ? "rotate(0deg) scale(1)" : "rotate(-20deg) scale(.6)" }}>
            <path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
          </svg>
          <dd className="relative text-[clamp(40px,5vw,64px)] font-medium leading-none tracking-[-0.03em] text-white"><CountUp text={chat.value} /></dd>
          <dt className="relative mt-4 text-[18px] text-white">{chat.label}</dt>
          <dd className="relative mt-1 text-[14px] text-white/85">{chat.note}</dd>
        </div>
      </div>
    </dl>
  );
}
