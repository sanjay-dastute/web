import Link from "next/link";
import { contact, services } from "@/lib/content";
import { Logo } from "@/components/Logo";
import { LOCKUP_WORD_PATH } from "@/lib/logo";

const company = [
  { label: "About Us", href: "/about" },
  { label: "Our Process", href: "/ai-process" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-white pt-[80px]" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <div className="container-air grid gap-10 text-[14px] sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_0.8fr_1.2fr]">
        <div>
          <Logo className="h-[30px] w-auto" />
          <p className="mt-4 max-w-[300px] text-ink/70">
            A creative and technology studio in Coimbatore. We build brands, products and marketing systems for growing businesses - with an AI-assisted process that cuts turnaround without cutting quality.
          </p>
        </div>
        <div>
          <p className="mb-4 text-mute">Services</p>
          <ul className="space-y-2">
            {services.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-brand-deep">{s.title}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="mb-4 text-mute">Company</p>
          <ul className="space-y-2">
            {company.map((c) => <li key={c.href}><Link href={c.href} className="hover:text-brand-deep">{c.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="mb-4 text-mute">Get in touch</p>
          <address className="not-italic text-ink/70">{contact.address}</address>
          <p className="mt-3"><a href={contact.phoneHref}>{contact.phone}</a></p>
          <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
          <p className="mt-3 text-mute">{contact.hours}</p>
          <div className="mt-4 flex gap-4">
            {contact.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link-u text-ink">{s.label}</a>)}
          </div>
        </div>
      </div>

      {/* Oversized wordmark as artwork (the logo path, not text) in a pale tint. */}
      <svg viewBox="300 50 1400 280" className="mx-auto mt-16 block w-[min(92vw,1200px)] select-none" aria-hidden>
        <path d={LOCKUP_WORD_PATH} fill="var(--color-brand-petal)" fillRule="evenodd" />
      </svg>

      <div className="container-air flex flex-wrap justify-between gap-4 border-t border-line py-6 text-[13px] text-mute">
        <span>© {new Date().getFullYear()} Creatoos. All rights reserved. Serving across India.</span>
        <span className="flex gap-6">
          <Link href="/privacy-policy" className="py-1">Privacy Policy</Link>
          <Link href="/terms" className="py-1">Terms of Service</Link>
        </span>
      </div>
    </footer>
  );
}
