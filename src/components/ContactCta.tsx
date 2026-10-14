"use client";

import { useState } from "react";
import { contact } from "@/lib/content";

const needs = ["Branding", "Logo", "Website", "App", "Digital Marketing", "Social Media", "SEO", "AI Search", "Strategy", "Not sure yet"];
const whens = ["Immediately", "Within a month", "Within three months", "Just exploring"];

function Step({ n, title, hint, children }: { n: string; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-4 flex w-full items-baseline gap-3">
        <span className="text-[12px] text-twilight-blue">{n}</span>
        <span className="text-[17px]">{title}</span>
        {hint && <span className="ml-auto text-[12px] text-mute">{hint}</span>}
      </legend>
      {children}
    </fieldset>
  );
}

type FieldProps = { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; textarea?: boolean };

/** Underlined input with a floating label and an animated focus line. */
function Field({ label, value, onChange, type = "text", required, textarea }: FieldProps) {
  const cls = "peer block w-full resize-none border-0 border-b border-ink/20 bg-transparent pb-2 pt-6 text-[16px] outline-none placeholder-transparent";
  return (
    <label className="group relative block">
      {textarea ? (
        <textarea rows={3} placeholder=" " value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      ) : (
        <input type={type} required={required} placeholder=" " value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
      <span className="pointer-events-none absolute left-0 top-6 text-[16px] text-ink/50 transition-all duration-300 peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-twilight-blue peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[12px]">
        {label}{required && " *"}
      </span>
      <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-twilight-blue transition-transform duration-500 peer-focus:scale-x-100" />
    </label>
  );
}

/** Air-style closing section: calm headline on sky + a light enquiry card. */
export default function ContactCta() {
  const [picked, setPicked] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [biz, setBiz] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [when, setWhen] = useState("");
  const [msg, setMsg] = useState("");

  const progress = [name && phone, picked.length > 0, when, msg].filter(Boolean).length / 4;

  return (
    <section id="contact" className="sky relative overflow-hidden py-[120px]">
      <div className="container-air grid gap-12">
        {/* Heading row above a full-width form, so the card reads square rather than tall. */}
        <div data-reveal>
          <h2 className="max-w-[900px] text-[clamp(40px,6vw,72px)] leading-[1] tracking-[-0.02em]">
            Let&apos;s talk about what you&apos;re <em className="cursive not-italic text-twilight-blue">building.</em>
          </h2>
          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-[560px] text-[18px] text-ink/75">
            A 30-minute call, no charge, no pitch deck. Tell us where you are and we&apos;ll tell you honestly what we&apos;d do first - and what we&apos;d leave alone for now.
          </p>
          <dl className="grid shrink-0 grid-cols-2 gap-x-10 gap-y-5 text-[15px] sm:grid-cols-[auto_auto_auto] lg:pb-1">
            <div>
              <dt className="mb-1 text-[12px] text-mute">Call / WhatsApp</dt>
              <dd><a href={contact.phoneHref} className="whitespace-nowrap hover:text-twilight-blue">{contact.phone}</a></dd>
            </div>
            <div>
              <dt className="mb-1 text-[12px] text-mute">Email</dt>
              <dd><a href={`mailto:${contact.email}`} className="hover:text-twilight-blue">{contact.email}</a></dd>
            </div>
            <div>
              <dt className="mb-1 text-[12px] text-mute">Hours</dt>
              <dd className="whitespace-nowrap">Mon-Sat, 9:30-6:30 IST</dd>
            </div>
          </dl>
          </div>
        </div>

        <form
          data-reveal="0.1"
          className="relative overflow-hidden rounded-[14px] border border-white/90 bg-white/55 p-6 shadow-[0_30px_80px_-30px_rgba(66,97,136,.45)] backdrop-blur-2xl md:p-10"
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        >
          {/* Progress hairline fills as steps are completed. */}
          <div className="absolute inset-x-0 top-0 h-[3px] bg-ink/5">
            <div className="h-full bg-twilight-blue transition-[width] duration-700 ease-out" style={{ width: `${progress * 100}%` }} />
          </div>

          {sent ? (
            <div className="py-20 text-center animate-[fadeSwap_.7s_ease]">
              <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-ink text-[28px] text-white">✓</div>
              <p className="cursive text-[56px] leading-none text-twilight-blue">Thank you{name ? `, ${name.split(" ")[0]}` : ""}.</p>
              <p className="mt-4 text-ink/75">We&apos;ll be in touch within one working day.</p>
            </div>
          ) : (
            <div className="grid gap-x-14 gap-y-10 lg:grid-cols-2">
              <Step n="01" title="About you">
                <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                  <Field label="Your name" required value={name} onChange={setName} />
                  <Field label="Business name" value={biz} onChange={setBiz} />
                  <Field label="Phone / WhatsApp" type="tel" required value={phone} onChange={setPhone} />
                  <Field label="Email" type="email" value={email} onChange={setEmail} />
                </div>
              </Step>

              <Step n="02" title="What do you need?" hint="Pick as many as you like">
                <div className="flex flex-wrap gap-2">
                  {needs.map((n) => {
                    const on = picked.includes(n);
                    return (
                      <button type="button" key={n} aria-pressed={on}
                        onClick={() => setPicked(on ? picked.filter((x) => x !== n) : [...picked, n])}
                        className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] transition-all duration-300 ${
                          on ? "border-ink bg-ink text-white" : "border-ink/15 bg-white/70 hover:border-ink/40"
                        }`}>
                        <span className={`grid h-4 w-4 place-items-center rounded-full text-[10px] transition-all ${on ? "bg-white text-ink" : "border border-ink/30 text-transparent"}`}>✓</span>
                        {n}
                      </button>
                    );
                  })}
                </div>
              </Step>

              <Step n="03" title="When do you need it?">
                <div className="grid grid-cols-2 gap-1 rounded-[10px] bg-ink/5 p-1 sm:grid-cols-4">
                  {whens.map((w) => (
                    <button type="button" key={w} onClick={() => setWhen(w)} aria-pressed={when === w}
                      className={`rounded-[8px] px-3 py-2.5 text-[13px] transition-all duration-300 ${
                        when === w ? "bg-white text-ink shadow-[0_2px_10px_rgba(0,0,0,.08)]" : "text-ink/60 hover:text-ink"
                      }`}>
                      {w}
                    </button>
                  ))}
                </div>
              </Step>

              <Step n="04" title="Tell us about the project">
                <Field label="A few lines is plenty - goals, links, anything useful" textarea value={msg} onChange={setMsg} />
              </Step>

              <div className="flex flex-col gap-4 border-t border-ink/10 pt-8 sm:flex-row sm:items-center lg:col-span-2">
                <p className="text-[12px] text-mute sm:order-first sm:mr-auto">Free 30-minute call · Reply within one working day · NDA on request</p>
                <button className="group relative inline-flex items-center justify-between gap-10 overflow-hidden rounded-[8px] bg-ink px-6 py-4 text-[15px] text-white">
                  <span className="absolute inset-0 -translate-x-full bg-twilight-blue transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  <span className="relative">Send Enquiry</span>
                  <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
                <a href={contact.whatsapp} target="_blank" rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-ink/20 bg-white/70 px-6 py-4 text-[15px] transition-colors hover:border-ink">
                  <span className="h-2 w-2 rounded-full bg-[#25D366]" /> WhatsApp Us
                </a>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
