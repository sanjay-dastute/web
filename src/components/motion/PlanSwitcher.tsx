"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { planRows, plans } from "@/lib/proposal";

type V = string | boolean | null;

const priceNum = (p: string) => Number(p.replace(/\D/g, "")) || 0;

/** Pick a plan; the price rolls to the new figure and features flip between included and not included. */
export default function PlanSwitcher() {
  const [sel, setSel] = useState(plans.findIndex((p) => p.popular));
  const root = useRef<HTMLDivElement>(null);
  const price = useRef<HTMLSpanElement>(null);
  const prev = useRef(sel);

  useEffect(() => {
    const from = prev.current;
    prev.current = sel;
    if (from === sel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const a = priceNum(plans[from].price), b = priceNum(plans[sel].price);
      if (a && b && price.current) {
        const o = { v: a };
        gsap.to(o, { v: b, duration: 0.7, ease: "power3.out", onUpdate: () => { price.current!.textContent = `INR ${Math.round(o.v).toLocaleString("en-IN")}`; } });
      } else {
        gsap.from(".ps-price", { yPercent: 40, autoAlpha: 0, duration: 0.5, ease: "expo.out" });
      }
      gsap.from(".ps-changed", { x: -10, autoAlpha: 0, duration: 0.45, stagger: 0.04, ease: "power2.out" });
    }, root);
    return () => ctx.revert();
  }, [sel]);

  const p = plans[sel];
  const changedFrom = prev.current;

  return (
    <div ref={root} className="grid gap-6 rounded-[20px] bg-ink p-6 text-white md:grid-cols-[0.9fr_1.1fr] md:p-10">
      <div className="flex flex-col">
        <div role="radiogroup" aria-label="Choose a plan" className="inline-flex w-fit rounded-full bg-white/10 p-1">
          {plans.map((pl, i) => (
            <button
              key={pl.name}
              role="radio"
              aria-checked={sel === i}
              onClick={() => setSel(i)}
              className={`relative rounded-full px-4 py-2 text-[14px] transition-colors duration-300 md:px-5 ${sel === i ? "text-white" : "text-white/60 hover:text-white"}`}
              style={sel === i ? { background: "var(--gradient-brand)" } : undefined}
            >
              {pl.name}
            </button>
          ))}
        </div>
        {p.popular && <p className="mt-6 text-[13px] uppercase tracking-[0.14em] text-brand-glow">Most popular</p>}
        <p className={`ps-price text-[clamp(48px,6vw,80px)] font-medium leading-none tracking-[-0.04em] ${p.popular ? "mt-2" : "mt-6"}`}>
          {/* Keyed so React swaps the node instead of patching text GSAP has rewritten. */}
          <span key={sel} ref={price}>{p.price}</span>
        </p>
        <p className="mt-3 text-[14px] text-white/60">{p.unit}</p>
        <Link href="/contact" className="btn btn-brand mt-10 w-fit">
          {p.price === "Custom" ? "Get a quote" : `Start with ${p.name}`} →
        </Link>
      </div>

      <ul className="divide-y divide-white/10" aria-live="polite">
        {planRows.map(([label, ...vals]) => {
          const v = vals[sel] as V;
          const changed = JSON.stringify(vals[changedFrom]) !== JSON.stringify(v);
          const off = v === null || v === false;
          return (
            <li key={label} className="flex items-baseline justify-between gap-4 py-2.5 text-[15px]">
              <span className={off ? "text-white/35 line-through decoration-white/30" : "text-white/85"}>{label}</span>
              <span key={`${label}-${sel}`} className={`${changed ? "ps-changed" : ""} shrink-0 text-right ${off ? "text-white/35" : v === true ? "text-brand-glow" : "text-white"}`}>
                {v === true ? "Included" : off ? "Not included" : v}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
