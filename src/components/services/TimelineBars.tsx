"use client";

import { useEffect, useRef, useState } from "react";

type Row = { label: string; time: string };

// Each row as a range in weeks. "7 to 12 days" / "2 to 3 weeks" come from the time; phased plans
// ("Week 1-2 - Strategy") come from the label and start where that phase starts.
function parse(r: Row) {
  const t = r.time.match(/(\d+)\s*to\s*(\d+)\s*(days|weeks)/i);
  if (t) {
    const k = /day/i.test(t[3]) ? 1 / 7 : 1;
    return { start: 0, lo: +t[1] * k, hi: +t[2] * k, note: r.time };
  }
  const w = r.label.match(/Week\s*(\d+)(?:\s*-\s*(\d+))?/i);
  if (w) {
    const a = +w[1], b = +(w[2] ?? w[1]);
    return { start: a - 1, lo: b - a + 1, hi: b - a + 1, note: r.time };
  }
  return null;
}

/**
 * Durations as animated bars on a shared week scale. The solid part is the shortest likely time, the
 * pale part the longest; phased plans render as a Gantt. Falls back to a plain list if a row can't be read.
 */
export default function TimelineBars({ rows }: { rows: Row[] }) {
  const root = useRef<HTMLUListElement>(null);
  const [on, setOn] = useState(false);
  const data = rows.map((r) => ({ r, p: parse(r) }));
  const max = Math.max(...data.map(({ p }) => (p ? p.start + p.hi : 0)), 1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setOn(true);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  const pct = (w: number) => `${(w / max) * 100}%`;
  const phased = data.some(({ p }) => p && p.start > 0);

  return (
    <div>
      <ul ref={root} className="space-y-2">
        {data.map(({ r, p }, i) => {
          // "Week 1-2 - Strategy" splits into the phase name and its weeks.
          const m = phased ? r.label.match(/^(Week\s*\d+(?:-\d+)?)\s*-\s*(.*)$/i) : null;
          const label = m ? m[2] : r.label;
          return (
            <li key={r.label} className="group grid gap-3 rounded-[14px] px-4 py-4 transition-colors hover:bg-haze md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:items-center">
              <span>
                <span className="block text-[18px] leading-tight">{label}</span>
                <span className="mt-1 block text-[14px] text-brand-deep">{m ? `${m[1]} - ${r.time}` : r.time}</span>
              </span>
              {p && (
                <span aria-hidden className="relative block h-8 rounded-full bg-haze group-hover:bg-white">
                  <span
                    className="absolute inset-y-0 rounded-full bg-brand-blush transition-all duration-1000 ease-out"
                    style={{ left: pct(p.start), width: on ? pct(p.hi) : "0%", transitionDelay: `${i * 120}ms` }}
                  />
                  <span
                    className="absolute inset-y-0 rounded-full transition-all duration-1000 ease-out"
                    style={{ left: pct(p.start), width: on ? pct(p.lo) : "0%", background: "var(--gradient-brand)", transitionDelay: `${i * 120 + 150}ms` }}
                  />
                </span>
              )}
            </li>
          );
        })}
      </ul>
      <div aria-hidden className="mt-4 hidden justify-between px-4 text-[12px] text-mute md:ml-[38%] md:flex">
        <span>0</span>
        <span>{Math.round(max)} weeks</span>
      </div>
    </div>
  );
}
