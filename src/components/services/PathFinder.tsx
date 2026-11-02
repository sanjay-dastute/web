"use client";

import { useState } from "react";

type Path = { title: string; steps: string[] };

/**
 * "Where are you now?" picker. Choosing a situation draws a route through the services we would line up,
 * one stop at a time. All four situations stay in the DOM as the option list; only the route animates.
 */
export default function PathFinder({ paths }: { paths: Path[] }) {
  const [sel, setSel] = useState(0);
  const p = paths[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div role="radiogroup" aria-label="Your situation" className="space-y-2">
        {paths.map((x, i) => (
          <button
            key={x.title}
            role="radio"
            aria-checked={sel === i}
            onClick={() => setSel(i)}
            className={`flex w-full items-center gap-4 rounded-[14px] px-5 py-4 text-left text-[18px] transition-all duration-300 ${sel === i ? "bg-ink text-white" : "bg-white hover:translate-x-1"}`}
          >
            <span className={`text-[13px] ${sel === i ? "text-brand-glow" : "text-mute"}`}>{String(i + 1).padStart(2, "0")}</span>
            {x.title}
          </button>
        ))}
      </div>

      {/* Keyed by selection so the route redraws on every change. */}
      <ol key={sel} className="relative rounded-[20px] bg-white p-8" aria-live="polite">
        <span aria-hidden className="pf-route absolute bottom-12 left-[43px] top-12 w-[2px] origin-top bg-brand-blush" />
        {p.steps.map((s, k) => (
          <li key={s} className="pf-stop relative flex items-center gap-5 py-4" style={{ animationDelay: `${0.15 + k * 0.18}s` }}>
            <span className={`relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full ${k === p.steps.length - 1 ? "bg-brand" : "border-2 border-brand bg-white"}`}>
              {k === p.steps.length - 1 && <span className="h-2 w-2 rounded-full bg-white" />}
            </span>
            <span className="text-[13px] text-mute">Step {k + 1}</span>
            <span className="text-[20px] leading-tight">{s}</span>
          </li>
        ))}
      </ol>
      <style>{`
        .pf-route { animation: pf-route .9s ease-out both; }
        .pf-stop { animation: pf-stop .5s ease-out both; }
        @keyframes pf-route { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes pf-stop { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .pf-route, .pf-stop { animation: none; } }
      `}</style>
    </div>
  );
}
