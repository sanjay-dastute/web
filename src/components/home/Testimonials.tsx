"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/lib/content";
import { SectionHead } from "./Sections";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const n = testimonials.length;

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % n), 6000);
    return () => clearInterval(id);
  }, [i, n]);

  const t = testimonials[i];
  return (
    <section className="bg-haze py-[120px]">
      <div className="container-air">
        <SectionHead split={false} eyebrow="What clients say">
          In their <em className="cursive not-italic text-brand-deep">words.</em>
        </SectionHead>
        <figure className="mx-auto max-w-[860px] text-center" data-reveal>
          <blockquote key={i} className="animate-[fadeSwap_.7s_ease] text-[clamp(24px,3vw,32px)] leading-[1.3]">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-8 text-[14px]">
            {t.name} <span className="text-mute">· {t.role}</span>
          </figcaption>
        </figure>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button className="btn btn-ghost" onClick={() => setI((i - 1 + n) % n)} aria-label="Previous testimonial">←</button>
          <div className="flex">
            {testimonials.map((_, k) => (
              // 24px tap area around a small visible dot.
              <button key={k} onClick={() => setI(k)} aria-label={`Testimonial ${k + 1}`} aria-current={k === i} className="grid h-6 min-w-6 place-items-center">
                <span className={`block h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-ink" : "w-1.5 bg-ink/25"}`} />
              </button>
            ))}
          </div>
          <button className="btn btn-ghost" onClick={() => setI((i + 1) % n)} aria-label="Next testimonial">→</button>
        </div>
      </div>
      <style>{`@keyframes fadeSwap{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
