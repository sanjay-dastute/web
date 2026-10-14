"use client";

import { useState } from "react";

type Item = { q: string; a: string };

/** Accordion + FAQPage JSON-LD (the copy deck asks for schema on every FAQ block). */
export default function Faq({ items, title = "Questions, answered." }: { items: Item[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })),
  };

  return (
    <section className="container-air grid gap-12 py-[120px] md:grid-cols-[1fr_1.6fr]">
      <h2 className="text-[clamp(32px,4.6vw,56px)] leading-[1.05] tracking-[-0.02em]" data-reveal>{title}</h2>
      <ul data-reveal="0.1">
        {items.map((x, i) => {
          const isOpen = open === i;
          return (
            <li key={x.q} className="border-t border-line last:border-b">
              <button className="flex w-full items-center justify-between gap-6 py-6 text-left text-[20px]" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                {x.q}
                <span className={`text-[24px] font-normal transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-500 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <p className="overflow-hidden pr-10 text-ink/70"><span className="block pb-6">{x.a}</span></p>
              </div>
            </li>
          );
        })}
      </ul>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}
