"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "@/components/motion/CountUp";
import { proofStats } from "@/lib/proposal";

const [views, leads, cpl, ctr, growth, chat] = proofStats;

// Views bar heights (an easing curve, for shape only) and the arrow traced over their tops.
const bars = Array.from({ length: 11 }, (_, k) => 24 + 116 * Math.pow(k / 10, 1.6));
const pts = bars.map((h, k) => [k * 40 + 12, 160 - h - 18] as const);
const tip = [pts[10][0] + 14, pts[10][1] - 12] as const;
// Leads curve (shape only) drawn as an area chart; the arrowhead points along its last segment.
const leadPts = Array.from({ length: 9 }, (_, k) => [k * 46 + 6, 128 - 108 * Math.pow(k / 8, 1.5) + (k % 2 ? 6 : 0)] as const);
const leadLine = "M" + leadPts.map(([x, y]) => `${x} ${y}`).join(" L");
const [lx, ly] = leadPts[8];
const leadHead = `M${lx - 13} ${ly + 1} L${lx} ${ly} L${lx - 3} ${ly + 13}`;
const arrow = "M" + [...pts, tip].map(([x, y]) => `${x} ${y}`).join(" L");

/**
 * The six proof stats as an infographic. Every visual is drawn to scale from the figure it explains
 * (bars of 100K views, a rising leads curve, 10 lit cells in 100, follower bars to scale), and
 * fills in once the section scrolls into view. Reduced motion shows the finished state.
 */
export default function ProofInfographic() {
  const root = useRef<HTMLDivElement>(null);
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

  // Follower bars, heights proportional to count.
  const gBig = 140;
  const gSmall = Math.max(2, gBig * (50 / 2849));

  return (
    <div ref={root} className="grid gap-4 lg:grid-cols-12">
      {/* Views: bar graph of 11 bars (100K each) with a rising arrow over the tops. */}
      <div className={`${tile} justify-between bg-ink text-white lg:col-span-7`}>
        <div>
          <div className="text-[clamp(48px,6vw,88px)] font-medium leading-none tracking-[-0.03em]"><CountUp text={views.value} /></div>
          <p className="mt-4 text-[18px]">{views.label}</p>
          <div className="mt-1 text-[14px] text-white/60">{views.note}</div>
        </div>
        <div aria-hidden className="mt-10">
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
        </div>
      </div>

      {/* Leads: rising area chart ending in an arrow. */}
      <div className={`${tile} bg-white lg:col-span-5`}>
        <div className={big}><CountUp text={leads.value} /></div>
        <p className="mt-4 text-[18px]">{leads.label}</p>
        <div className="mt-1 text-[14px] text-mute">{leads.note}</div>
        <div aria-hidden className="mt-auto pt-8">
          <svg viewBox="0 0 400 140" className="block w-full overflow-visible">
            <defs>
              <linearGradient id="pi-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff214f" stopOpacity=".35" /><stop offset="100%" stopColor="#ff214f" stopOpacity="0" />
              </linearGradient>
              <clipPath id="pi-reveal"><rect x="0" y="0" height="140" width="400" style={{ transformBox: "fill-box", transformOrigin: "left", transform: on ? "scaleX(1)" : "scaleX(0)", transition: "transform 1.6s ease-out" }} /></clipPath>
            </defs>
            {[35, 70, 105].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="var(--color-line)" strokeDasharray="3 5" />)}
            <line x1="0" y1="138" x2="400" y2="138" stroke="var(--color-line)" />
            <g clipPath="url(#pi-reveal)">
              <path d={`${leadLine} L${leadPts[leadPts.length - 1][0]} 138 L0 138 Z`} fill="url(#pi-area)" />
              <path d={leadLine} fill="none" stroke="var(--color-brand)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <path d={leadHead} fill="none" stroke="var(--color-brand)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: on ? 1 : 0, transition: "opacity .3s 1.5s" }} />
          </svg>
        </div>
      </div>

      {/* CTR: 10 of 100 cells lit. */}
      <div className={`${tile} bg-white lg:col-span-4`}>
        <div className={big}><CountUp text={ctr.value} /></div>
        <p className="mt-4 text-[18px]">{ctr.label}</p>
        <div className="mt-1 text-[14px] text-mute">{ctr.note}</div>
        <div aria-hidden className="mt-auto pt-8">
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
        </div>
      </div>

      {/* Growth: two bars to scale with an arrow between. */}
      <div className={`${tile} bg-white lg:col-span-4`}>
        <div className={big}><CountUp text={growth.value} /></div>
        <p className="mt-4 text-[18px]">{growth.label}</p>
        <div className="mt-1 text-[14px] text-mute">{growth.note}</div>
        <div aria-hidden className="mt-auto pt-8">
          <svg viewBox="0 0 260 170" className="mx-auto block w-full max-w-[300px] overflow-visible">
            <line x1="0" y1="150" x2="260" y2="150" stroke="var(--color-line)" />
            {/* Bars to scale: 50 vs 2,849 followers. */}
            <rect x="30" y={150 - gSmall} width="56" height={gSmall} rx="3" fill="var(--color-ink)" />
            <rect
              x="174" y={150 - gBig} width="56" height={gBig} rx="6" fill="url(#pi-bar)"
              className="transition-transform duration-[1400ms] ease-out"
              style={{ transformBox: "fill-box", transformOrigin: "bottom", transform: on ? "scaleY(1)" : `scaleY(${gSmall / gBig})` }}
            />
            <path d="M92 132 Q130 120 160 30" fill="none" stroke="var(--color-brand)" strokeWidth="3" strokeLinecap="round" pathLength={1} strokeDasharray="1" style={{ strokeDashoffset: on ? 0 : 1, transition: "stroke-dashoffset 1s ease-out .6s" }} />
            <path d="M150 38 L160 30 L163 43" fill="none" stroke="var(--color-brand)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: on ? 1 : 0, transition: "opacity .3s 1.5s" }} />
            <text x="58" y="168" textAnchor="middle" fontSize="12" fill="var(--color-mute)">50</text>
            <text x="202" y="168" textAnchor="middle" fontSize="12" fill="var(--color-mute)">2,849</text>
          </svg>
        </div>
      </div>

      {/* Two cost tiles stacked. */}
      <div className="grid gap-4 lg:col-span-4">
        <div className={`${tile} justify-center bg-white`}>
          <div className={big}><CountUp text={cpl.value} /></div>
          <p className="mt-4 text-[18px]">{cpl.label}</p>
          <div className="mt-1 text-[14px] text-mute">{cpl.note}</div>
        </div>
        <div className={`${tile} relative justify-center overflow-hidden bg-brand-ember`}>
          <svg aria-hidden viewBox="0 0 24 24" className="absolute -right-4 -top-4 h-28 w-28 text-white/15 transition-transform duration-700" style={{ transform: on ? "rotate(0deg) scale(1)" : "rotate(-20deg) scale(.6)" }}>
            <path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
          </svg>
          <div className="relative text-[clamp(40px,5vw,64px)] font-medium leading-none tracking-[-0.03em] text-white"><CountUp text={chat.value} /></div>
          <p className="relative mt-4 text-[18px] text-white">{chat.label}</p>
          <div className="relative mt-1 text-[14px] text-white/85">{chat.note}</div>
        </div>
      </div>
    </div>
  );
}
