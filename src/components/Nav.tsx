"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { services, contact } from "@/lib/content";

const links = [
  { label: "Work", href: "/work" },
  { label: "Industries", href: "/industries" },
  { label: "AI Process", href: "/ai-process" },
  { label: "About", href: "/about" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menu ? "bg-white/80 backdrop-blur-xl border-b border-line" : "border-b border-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      onMouseLeave={() => setMenu(false)}
    >
      <nav className="container-air flex h-[var(--nav-h)] items-center gap-8">
        <Link href="/" className="text-[22px] font-medium tracking-tight" aria-label="Creatoos home">
          creatoos<span className="text-twilight-blue">.</span>
        </Link>

        <ul className="hidden items-center gap-6 text-[14px] lg:flex">
          <li>
            <button
              className="flex items-center gap-1 py-6"
              onMouseEnter={() => setMenu(true)}
              onClick={() => setMenu((m) => !m)}
              aria-expanded={menu}
            >
              Services <span className={`text-[10px] transition-transform ${menu ? "rotate-180" : ""}`}>▾</span>
            </button>
          </li>
          {links.map((l) => (
            <li key={l.href} onMouseEnter={() => setMenu(false)}>
              <Link href={l.href} className="opacity-80 hover:opacity-100">{l.label}</Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="text-[14px] opacity-80 hover:opacity-100">
            WhatsApp
          </a>
          <Link href="/contact" className="btn btn-ghost">Book a Free Consultation</Link>
        </div>

        <button className="ml-auto lg:hidden btn btn-ghost" onClick={() => setMobile((m) => !m)} aria-label="Menu">
          {mobile ? "Close" : "Menu"}
        </button>
      </nav>

      {/* Services mega-menu: icon + bold title + tagline, plus a preview card. */}
      <div
        className={`hidden lg:block overflow-hidden transition-[max-height,opacity] duration-500 ${
          menu ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-air grid grid-cols-[1fr_300px] gap-8 pb-8 pt-2">
          <ul className="grid grid-cols-3 gap-1">
            {services.map((s, i) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex gap-3 rounded-lg p-3 transition-colors hover:bg-haze"
                  onClick={() => setMenu(false)}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-haze text-[13px] text-twilight-blue transition-colors group-hover:bg-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[14px]">{s.title}</span>
                    <span className="block text-[13px] text-mute">{s.tagline}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/services" className="sky relative flex flex-col justify-end overflow-hidden rounded-[12px] p-5" onClick={() => setMenu(false)}>
            <span className="cursive text-[32px] leading-none text-twilight-blue">the whole stack</span>
            <span className="mt-2 text-[14px]">Buy one service or all nine. One accountable team. →</span>
          </Link>
        </div>
      </div>

      {mobile && (
        <div className="lg:hidden border-t border-line bg-white px-5 pb-8 pt-4">
          <p className="mb-2 text-[13px] text-mute">Services</p>
          <ul className="mb-6 grid grid-cols-2 gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} onClick={() => setMobile(false)} className="block text-[14px]">{s.title}</Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-3 text-[20px]">
            {links.map((l) => (
              <li key={l.href}><Link href={l.href} onClick={() => setMobile(false)}>{l.label}</Link></li>
            ))}
          </ul>
          <Link href="/contact" onClick={() => setMobile(false)} className="btn btn-ink mt-6">Book a Free Consultation</Link>
        </div>
      )}
    </header>
  );
}
