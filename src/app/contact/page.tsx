import type { Metadata } from "next";
import ContactCta from "@/components/ContactCta";
import Faq from "@/components/Faq";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Creatoos | Creative & Digital Agency, Coimbatore",
  description: "Talk to Creatoos about your branding, website or marketing project. Free 30-minute consultation. Coimbatore, Tamil Nadu.",
};

const faqs = [
  { q: "Do you work with clients outside Coimbatore?", a: "Yes. We work with clients across Tamil Nadu and India, and internationally. Most collaboration happens remotely, with in-person meetings where it helps." },
  { q: "How do I get a quote?", a: "Book a free 30-minute scoping call. We'll understand the requirement, tell you what we'd prioritise, and send a written proposal within two working days." },
  { q: "What happens on the first call?", a: "No pitch deck. We ask about your business, your customers and what's not working. You'll leave with a clear view of what we'd recommend, whether or not you work with us." },
  { q: "Do you sign NDAs?", a: "Yes, before any commercially sensitive discussion." },
];

export default function ContactPage() {
  return (
    <>
      <div className="pt-[var(--nav-h)]" />
      <ContactCta />
      <section className="container-air grid gap-6 py-[96px] md:grid-cols-3">
        {[
          { k: "Studio", v: contact.address },
          { k: "Phone / WhatsApp", v: contact.phone },
          { k: "Hours", v: `${contact.hours}. We reply within one working day.` },
        ].map((x, i) => (
          <div key={x.k} data-reveal={i * 0.08} className="card-haze p-7">
            <p className="text-[13px] text-mute">{x.k}</p>
            <p className="mt-2 text-[18px]">{x.v}</p>
          </div>
        ))}
      </section>
      <Faq items={faqs} />
    </>
  );
}
