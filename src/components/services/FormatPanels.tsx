"use client";

import { useState } from "react";

type Format = { title: string; body: string };

/**
 * Engagement formats as expanding panels: the active panel widens and shows its detail, the rest
 * collapse to their title. Hover or focus opens a panel on desktop; tap on phones, where they stack.
 */
export default function FormatPanels({ formats }: { formats: Format[] }) {
  const [open, setOpen] = useState(0);

  return (
    <ul className="flex flex-col gap-3 lg:h-[380px] lg:flex-row">
      {formats.map((f, i) => {
        const on = open === i;
        return (
          <li
            key={f.title}
            onMouseEnter={() => setOpen(i)}
            className={`relative overflow-hidden rounded-[20px] transition-[flex-grow,background-color] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] lg:flex-1 ${on ? "bg-brand-deep text-white lg:grow-[3]" : "bg-haze lg:grow"}`}
          >
            <button onClick={() => setOpen(i)} onFocus={() => setOpen(i)} aria-expanded={on} className="flex h-full w-full flex-col justify-between p-7 text-left">
              <span className="flex items-center justify-between">
                <span className={`text-[13px] ${on ? "text-white" : "text-mute"}`}>{String(i + 1).padStart(2, "0")}</span>
              </span>
              <span>
                <span className="block text-[clamp(22px,2vw,30px)] leading-[1.1] tracking-[-0.02em]">{f.title}</span>
                <span className={`block max-w-[420px] overflow-hidden text-[16px] transition-all duration-700 ${on ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>{f.body}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
