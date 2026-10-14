import { contact } from "@/lib/content";

export default function LegalPage({ title, sections }: { title: string; sections: { h: string; p: string }[] }) {
  return (
    <section className="container-air max-w-[820px] pt-[calc(var(--nav-h)+80px)] pb-[120px]">
      <h1 className="text-[clamp(40px,6vw,64px)] leading-[1.05] tracking-[-0.02em]">{title}</h1>
      <p className="mt-4 text-[14px] text-mute">Draft - to be reviewed by a legal advisor before publishing.</p>
      <div className="mt-12 space-y-10">
        {sections.map((s) => (
          <div key={s.h}>
            <h2 className="text-[20px]">{s.h}</h2>
            <p className="mt-3 text-ink/75">{s.p}</p>
          </div>
        ))}
        <div>
          <h2 className="text-[20px]">Contact</h2>
          <p className="mt-3 text-ink/75">Creatoos, {contact.address}. Email: {contact.email}. Phone: {contact.phone}.</p>
        </div>
      </div>
    </section>
  );
}
