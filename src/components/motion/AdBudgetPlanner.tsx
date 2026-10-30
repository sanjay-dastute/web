"use client";

import { useState } from "react";
import { adBudget } from "@/lib/proposal";

const FEE = 25000;
// Low/high ends of each recommended range; "25,000+" has no ceiling, so show it as 25,000 and up.
const ranges = adBudget.recommended.map((r) => {
  const n = r.budget.match(/[\d,]+/g)!.map((x) => Number(x.replace(/,/g, "")));
  return { lo: n[0], hi: n[1] ?? n[0], open: r.budget.endsWith("+") };
});
const MAX = Math.max(...ranges.map((r) => r.hi)) + FEE;
const inr = (n: number) => `INR ${n.toLocaleString("en-IN")}`;

/**
 * Recommended starting ad budget as a planner: choose a goal and the bar shows the Creatoos fee and the
 * ad spend (paid to the platform) side by side. Every goal and range stays visible as the option list.
 */
export default function AdBudgetPlanner() {
  const [g, setG] = useState(1);
  const r = ranges[g];

  return (
    <div className="rounded-[14px] bg-white p-6">
      <p className="text-[18px]">Recommended starting ad budget</p>
      <p className="mt-1 text-[14px] text-mute">Indicative, per month, based on our past campaign costs. Pick a goal.</p>

      <div role="radiogroup" aria-label="Campaign goal" className="mt-5 space-y-1">
        {adBudget.recommended.map((row, i) => (
            <button
              key={row.goal}
              role="radio"
              aria-checked={g === i}
              onClick={() => setG(i)}
              className={`flex w-full items-center justify-between gap-3 rounded-[10px] px-3 py-3 text-left text-[15px] sm:gap-4 sm:px-4 transition-colors duration-300 ${g === i ? "bg-brand-petal" : "hover:bg-haze"}`}
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className={`h-3 w-3 shrink-0 rounded-full border-2 transition-colors ${g === i ? "border-brand bg-brand" : "border-ink/25"}`} aria-hidden />
                {row.goal}
              </span>
              <span className="whitespace-nowrap text-brand-deep">{row.budget}</span>
            </button>
        ))}
      </div>

      {/* Monthly total: fee + ad spend, bars scaled to the largest combination. */}
      <div className="mt-6" aria-live="polite">
        <div className="flex h-10 w-full overflow-hidden rounded-[10px] bg-haze">
          <div className="h-full transition-[width] duration-700 ease-out" style={{ width: `${(FEE / MAX) * 100}%`, background: "var(--gradient-brand)" }} />
          <div className="h-full bg-ink transition-[width] duration-700 ease-out" style={{ width: `${(r.lo / MAX) * 100}%` }} />
          <div className="h-full bg-ink/30 transition-[width] duration-700 ease-out" style={{ width: `${((r.hi - r.lo) / MAX) * 100}%` }} />
        </div>
        <div className="mt-3 flex flex-wrap justify-between gap-2 text-[13px]">
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: "var(--gradient-brand)" }} />Creatoos fee from {inr(FEE)}</span>
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-ink" />Ad spend {inr(r.lo)}{r.open ? "+" : ` - ${r.hi.toLocaleString("en-IN")}`}</span>
        </div>
        <p className="mt-4 text-[15px]">
          Monthly total from <span className="text-brand-deep">{inr(FEE + r.lo)}</span>
          {!r.open && <> to <span className="text-brand-deep">{inr(FEE + r.hi)}</span></>}, with the ad spend paid straight to Meta / Google.
        </p>
      </div>

      <p className="mt-6 rounded-[10px] border-l-2 border-brand bg-brand-petal p-4 text-[14px] text-ink/80">
        <span className="text-ink">For reference:</span> {adBudget.reference}
      </p>
    </div>
  );
}
