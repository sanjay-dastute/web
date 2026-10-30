"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { scopeOfWork } from "@/lib/proposal";

/** Scope of work as three tabs; switching tabs ticks the items in. Inactive panels stay in the DOM (hidden). */
export default function ScopeTabs() {
  const [tab, setTab] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(`#scope-panel-${tab} .scope-col`, { y: 30, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: "expo.out" });
      gsap.from(`#scope-panel-${tab} li`, { x: -12, autoAlpha: 0, duration: 0.4, stagger: 0.025, delay: 0.15, ease: "power2.out" });
    }, root);
    return () => ctx.revert();
  }, [tab]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (tab + (e.key === "ArrowRight" ? 1 : scopeOfWork.length - 1)) % scopeOfWork.length;
    setTab(next);
    document.getElementById(`scope-tab-${next}`)?.focus();
  };

  return (
    <div ref={root}>
      <div role="tablist" aria-label="Scope of work" className="mb-8 inline-flex flex-wrap gap-1 rounded-full bg-white p-1" onKeyDown={onKey} data-reveal>
        {scopeOfWork.map((g, i) => (
          <button
            key={g.group}
            id={`scope-tab-${i}`}
            role="tab"
            aria-selected={tab === i}
            aria-controls={`scope-panel-${i}`}
            tabIndex={tab === i ? 0 : -1}
            onClick={() => setTab(i)}
            className={`rounded-full px-5 py-2.5 text-[14px] transition-colors duration-300 ${tab === i ? "text-white" : "text-ink/70 hover:text-ink"}`}
            style={tab === i ? { background: "var(--gradient-brand)" } : undefined}
          >
            {g.group}
          </button>
        ))}
      </div>

      {scopeOfWork.map((g, gi) => (
        <div key={g.group} id={`scope-panel-${gi}`} role="tabpanel" aria-labelledby={`scope-tab-${gi}`} hidden={tab !== gi} className="grid gap-4 md:grid-cols-3">
          {g.columns.map((c) => (
            <div key={c.code} className="scope-col rounded-[12px] bg-white p-6">
              <p className="flex items-center gap-3 text-[17px]">
                <span className="grid h-8 w-8 place-items-center rounded-[8px] bg-brand-petal text-[12px] text-brand-deep">{c.code}</span>
                {c.title}
              </p>
              <ul className="mt-4 space-y-2 text-[15px] text-ink/75">
                {c.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <span className="mt-[0.55em] h-[5px] w-[5px] shrink-0 rounded-full bg-brand" aria-hidden />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
