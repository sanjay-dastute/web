"use client";

import { useState } from "react";
import { contact } from "@/lib/content";

const needs = ["Branding", "Logo", "Website", "App", "Digital Marketing", "Social Media", "SEO", "AI Search", "Strategy", "Not sure yet"];
const whens = ["Immediately", "Within a month", "Within three months", "Just exploring"];

/** Air-style closing section: calm headline on sky + a light enquiry card. */
export default function ContactCta() {
  const [picked, setPicked] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const field = "w-full rounded-[4px] border border-black/10 bg-haze p-[10px] text-[16px] outline-none focus:border-twilight-blue";

  return (
    <section id="contact" className="sky relative overflow-hidden py-[120px]">
      <div className="container-air grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div data-reveal>
          <h2 className="text-[clamp(40px,6vw,72px)] leading-[1] tracking-[-0.02em]">
            Let&apos;s talk about what you&apos;re <em className="cursive not-italic text-twilight-blue">building.</em>
          </h2>
          <p className="mt-6 max-w-[460px] text-[18px] text-ink/75">
            A 30-minute call, no charge, no pitch deck. Tell us where you are and we&apos;ll tell you honestly what we&apos;d do first - and what we&apos;d leave alone for now.
          </p>
          <div className="mt-8 space-y-1 text-[14px]">
            <p><a href={contact.phoneHref} className="link-u">{contact.phone}</a> <span className="text-mute">· Phone / WhatsApp</span></p>
            <p><a href={`mailto:${contact.email}`} className="link-u">{contact.email}</a></p>
            <p className="pt-2 text-mute">{contact.hours}</p>
          </div>
        </div>

        <form
          data-reveal="0.1"
          className="rounded-[12px] bg-white p-6 md:p-8"
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        >
          {sent ? (
            <div className="py-16 text-center">
              <p className="cursive text-[56px] leading-none text-twilight-blue">Thank you.</p>
              <p className="mt-4">We reply within one working day.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Name" className={field} />
              <input placeholder="Business name" className={field} />
              <input required placeholder="Phone / WhatsApp" className={field} />
              <input type="email" placeholder="Email" className={field} />
              <div className="sm:col-span-2">
                <p className="mb-2 text-[13px] text-mute">What do you need?</p>
                <div className="flex flex-wrap gap-2">
                  {needs.map((n) => {
                    const on = picked.includes(n);
                    return (
                      <button type="button" key={n} onClick={() => setPicked(on ? picked.filter((x) => x !== n) : [...picked, n])}
                        className={`pill transition-colors ${on ? "bg-ink text-white" : "hover:bg-ink/10"}`}>{n}</button>
                    );
                  })}
                </div>
              </div>
              <select defaultValue="" className={`${field} sm:col-span-2`}>
                <option value="" disabled>When do you need it?</option>
                {whens.map((w) => <option key={w}>{w}</option>)}
              </select>
              <textarea rows={3} placeholder="Tell us about the project" className={`${field} sm:col-span-2`} />
              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <button className="btn btn-ink">Send Enquiry →</button>
                <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost">WhatsApp Us</a>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
