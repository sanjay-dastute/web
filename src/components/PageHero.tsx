import Link from "next/link";

type Props = {
  eyebrow: string;
  /** Headline; wrap the accent word in *asterisks* to render it in the cursive face. */
  title: string;
  sub: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function Accent({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, i) =>
        part.startsWith("*") ? (
          <em key={i} className="cursive not-italic text-twilight-blue">{part.slice(1, -1)}</em>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/** Shared inner-page hero: light sky, Air-style headline with one cursive accent word. */
export default function PageHero({ eyebrow, title, sub, primary, secondary }: Props) {
  return (
    <section className="sky relative overflow-hidden pt-[calc(var(--nav-h)+96px)] pb-[96px]">
      <div className="clouds" aria-hidden>
        <span style={{ width: 560, height: 170, top: "20%", left: "55%", animationDuration: "70s" }} />
        <span style={{ width: 420, height: 130, top: "60%", left: "5%", animationDuration: "85s", animationDirection: "reverse" }} />
      </div>
      <div className="container-air relative">
        <p className="pill mb-6 bg-white/60 backdrop-blur" data-reveal>{eyebrow}</p>
        <h1 className="max-w-[900px] text-[clamp(40px,6.4vw,80px)] font-normal leading-[1.02] tracking-[-0.02em]" data-reveal>
          <Accent text={title} />
        </h1>
        <p className="mt-6 max-w-[620px] text-[18px] text-ink/75" data-reveal="0.1">{sub}</p>
        {(primary || secondary) && (
          <div className="mt-8 flex flex-wrap gap-3" data-reveal="0.2">
            {primary && <Link href={primary.href} className="btn btn-ink">{primary.label} →</Link>}
            {secondary && <Link href={secondary.href} className="btn btn-ghost btn-glass">{secondary.label}</Link>}
          </div>
        )}
      </div>
    </section>
  );
}
