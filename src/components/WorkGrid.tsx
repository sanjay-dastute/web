"use client";

import { useState } from "react";

// Projects and clients from the current creatoos.com portfolio and testimonials.
// TODO: add imagery, brief, approach and outcome numbers for each case study.
const projects = [
  { name: "Dheera Goli Soda", tags: ["Branding", "Logo"], tone: "#dfe8f2", line: "A heritage soda brand, made unmistakable on the shelf." },
  { name: "PayFX", tags: ["Web", "Social"], tone: "#e6e3f1", line: "Fintech made approachable across web and social." },
  { name: "Sumangali Jewellers", tags: ["Branding", "Marketing"], tone: "#f1ebe1", line: "A jewellery house with a refreshed identity and campaigns." },
  { name: "Aparajita Ayurveda", tags: ["Branding", "Social"], tone: "#e3eee4", line: "Traditional Ayurveda, modern aesthetics." },
  { name: "The Beehives - Nectar Nest", tags: ["Branding", "Logo"], tone: "#f3eedb", line: "Identity and packaging for a honey brand." },
  { name: "Bakers", tags: ["Branding", "Social"], tone: "#f2e4e0", line: "A bakery brand built to be instantly recognisable." },
  { name: "Movezee Overseas Consultancy", tags: ["Social", "Marketing"], tone: "#e0e9f3", line: "Social media and reels that built an online presence." },
  { name: "We Little", tags: ["Branding"], tone: "#efe6f0", line: "Project details coming soon." },
  { name: "Genoll", tags: ["Branding"], tone: "#e5ecea", line: "Project details coming soon." },
];

const filters = ["All", "Branding", "Logo", "Web", "App", "Marketing", "Social", "SEO"];

export default function WorkGrid() {
  const [f, setF] = useState("All");
  const shown = projects.filter((p) => f === "All" || p.tags.includes(f));

  return (
    <section className="container-air py-[96px]">
      <div className="mb-10 flex flex-wrap gap-2">
        {filters.map((x) => (
          <button key={x} onClick={() => setF(x)}
            className={`pill px-4 py-2 text-[14px] transition-colors ${f === x ? "bg-ink text-white" : "hover:bg-ink/10"}`}>
            {x}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="py-20 text-center text-mute">Projects in this category are coming soon.</p>
      ) : (
        <div className="grid gap-x-6 gap-y-12 md:grid-cols-2">
          {shown.map((p, i) => (
            <article key={p.name} className={`group animate-[fadeSwap_.6s_ease_both] ${i % 2 ? "md:mt-24" : ""}`} style={{ animationDelay: `${i * 60}ms` }}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[11px]" style={{ background: p.tone }}>
                <span className="display absolute inset-0 grid place-items-center px-6 text-center text-[clamp(40px,5.5vw,80px)] text-ink/80 transition-transform duration-700 group-hover:scale-105">
                  {p.name.split(" - ")[0]}
                </span>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {p.tags.map((t) => <span key={t} className="pill bg-white/80">{t}</span>)}
                </div>
              </div>
              <h2 className="mt-4 text-[20px]">{p.name}</h2>
              <p className="text-ink/70">{p.line}</p>
            </article>
          ))}
        </div>
      )}
      <style>{`@keyframes fadeSwap{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
