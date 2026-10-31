import Link from "next/link";
import { SectionHead } from "@/components/home/Sections";
import { Accent } from "@/components/PageHero";
import CountUp from "@/components/motion/CountUp";
import GrowthLine from "@/components/motion/GrowthLine";
import Tilt from "@/components/motion/Tilt";
import ServicesOrbit from "@/components/motion/ServicesOrbit";
import ScopeTabs from "@/components/motion/ScopeTabs";
import LaunchTimeline from "@/components/motion/LaunchTimeline";
import PlanSwitcher from "@/components/motion/PlanSwitcher";
import AdBudgetPlanner from "@/components/motion/AdBudgetPlanner";
import {
  adBudget, funnel, idealFor, launchNote, launchPromises,
  nextSteps, objectives, planNote, planRows, plans, proofStats, scopeClarity, terms,
} from "@/lib/proposal";

const eyebrow = "mb-4 text-[13px] uppercase tracking-[0.14em] text-mute";

/** Results from live client accounts. */
export function ProofStats() {
  return (
    <section className="bg-brand-petal py-[120px]">
      <div className="container-air">
        <SectionHead eyebrow="Proof from live client accounts" center={false}>
          Numbers, not <Accent text="*adjectives.*" />
        </SectionHead>
        <dl className="grid gap-px overflow-hidden rounded-[14px] bg-brand-blush sm:grid-cols-2 lg:grid-cols-3">
          {proofStats.map((s, i) => (
            <div key={s.label} data-reveal={(i % 3) * 0.08} className="bg-white p-7">
              <dd className="text-gradient-brand text-[clamp(40px,5vw,64px)] font-medium leading-none tracking-[-0.03em]"><CountUp text={s.value} /></dd>
              <dt className="mt-4 text-[18px]">{s.label}</dt>
              <dd className="mt-1 text-[14px] text-mute">{s.note}</dd>
              {s.value.endsWith("x") && <dd><GrowthLine label={`Follower growth curve: ${s.note}`} /></dd>}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Four objectives and the funnel they cover. */
export function Objectives() {
  return (
    <section className="container-air py-[120px]">
      <SectionHead eyebrow="Objectives" center={false}>What this partnership is built to <Accent text="*achieve*" /></SectionHead>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {objectives.map((o, i) => (
          <div key={o.n} data-reveal={i * 0.08} className="card-haze p-7">
            <span className="text-[13px] text-brand-deep">{o.n}</span>
            <h3 className="mt-6 text-[22px]">{o.title}</h3>
            <p className="mt-2 text-ink/70">{o.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-16 max-w-[720px] text-[18px] text-ink/75" data-reveal>
        We plan content and campaigns for every stage of this funnel, so your marketing builds the brand and brings in enquiries at the same time.
      </p>
      {/* Funnel: each stage narrower than the last. */}
      <ol className="mt-8 space-y-2">
        {funnel.map((f, i) => (
          <li
            key={f.stage}
            data-reveal={i * 0.08}
            className="funnel-flow relative flex flex-wrap items-baseline justify-between gap-2 overflow-hidden rounded-[12px] px-6 py-4 text-white"
            style={{ width: `${100 - i * 12}%`, background: "var(--gradient-brand)", opacity: 1 - i * 0.12 }}
          >
            <span className="text-[20px]">{f.stage}</span>
            <span className="text-[14px] text-white/85">{f.tools}</span>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-[14px] text-mute" data-reveal><span className="text-ink">Ideal for:</span> {idealFor}</p>
    </section>
  );
}

/** The 16 digital marketing services, as a pinned orbit on desktop. */
export function DmServices() {
  return <ServicesOrbit />;
}

/** Scope of work: what each service actually covers, one group at a time. */
export function ScopeOfWork() {
  return (
    <section className="bg-haze py-[120px]">
      <div className="container-air">
        <SectionHead eyebrow="Scope of work" center={false}>What we <Accent text="*support*" /></SectionHead>
        <ScopeTabs />
      </div>
    </section>
  );
}

/** 30-day launch plan and the three working promises. */
export function LaunchPlan() {
  return (
    <section className="container-air py-[120px]">
      <SectionHead eyebrow="How we work" center={false}>From kick-off to results: a clear <Accent text="*30-day*" /> launch plan</SectionHead>
      <LaunchTimeline />
      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {launchPromises.map((p, i) => (
          <div key={p.title} data-reveal={i * 0.08} className="card-haze p-6">
            <h3 className="text-[18px]">{p.title}</h3>
            <p className="mt-2 text-[15px] text-ink/70">{p.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-[15px] text-mute" data-reveal>{launchNote}</p>
    </section>
  );
}

function Cell({ v }: { v: string | boolean | null }) {
  if (v === true) return <span className="text-brand-deep">Included</span>;
  if (v === null || v === false) return <span className="text-ink/35">Not included</span>;
  return <>{v}</>;
}

/** Plan cards plus the full comparison table. */
export function Plans({ compact = false }: { compact?: boolean }) {
  return (
    <section id="plans" className="container-air scroll-mt-[calc(var(--nav-h)+24px)] py-[120px]">
      <SectionHead eyebrow="Investment - project basis" center={false}>Choose the plan that fits your <Accent text="*stage*" /></SectionHead>
      {compact ? (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((p, i) => (
              <div key={p.name} data-reveal={i * 0.08}>
                <Tilt className={`relative flex h-full flex-col rounded-[16px] p-7 ${p.popular ? "glow-ring bg-ink text-white" : "card-haze"}`}>
                  {p.popular && (
                    <span className="absolute -top-3 right-6 rounded-full px-3 py-1 text-[12px] text-white" style={{ background: "var(--gradient-brand)" }}>
                      Most popular
                    </span>
                  )}
                  <p className={`text-[13px] uppercase tracking-[0.14em] ${p.popular ? "text-white/60" : "text-mute"}`}>{p.name}</p>
                  <p className="mt-4 text-[clamp(36px,4vw,52px)] font-medium leading-none tracking-[-0.03em]">{p.price}</p>
                  <p className={`mt-3 text-[14px] ${p.popular ? "text-white/60" : "text-mute"}`}>{p.unit}</p>
                  <Link href="/contact" className={`btn mt-8 justify-center ${p.popular ? "btn-brand" : "btn-ghost"}`}>
                    {p.price === "Custom" ? "Get a quote" : `Start with ${p.name}`}
                  </Link>
                </Tilt>
              </div>
            ))}
          </div>
          <p className="mt-8" data-reveal>
            <Link href="/pricing" className="link-u">Compare every plan, ad budgets and terms</Link>
          </p>
        </>
      ) : (
        <>
        <div data-reveal><PlanSwitcher /></div>
        {/* Full table kept on the page (search engines read it) but folded away until asked for. */}
        <details className="group mt-6 rounded-[14px] border border-line" data-reveal>
          <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-[16px]">
            Compare all plans side by side
            <span className="text-[13px] text-brand-deep transition-transform duration-300 group-open:rotate-45" aria-hidden>+</span>
          </summary>
        <div className="overflow-x-auto border-t border-line">
          <table className="w-full min-w-[640px] text-left text-[15px]">
            <caption className="sr-only">What each plan includes</caption>
            <thead>
              <tr className="bg-ink text-[12px] uppercase tracking-[0.12em] text-white">
                <th scope="col" className="px-5 py-4 font-medium">What&apos;s included</th>
                {plans.map((p) => (
                  <th key={p.name} scope="col" className={`px-5 py-4 text-center font-medium ${p.popular ? "bg-brand-ember" : ""}`}>{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {planRows.map(([label, ...vals]) => (
                <tr key={label} className="border-t border-line">
                  <th scope="row" className="px-5 py-3 font-medium">{label}</th>
                  {vals.map((v, i) => (
                    <td key={i} className={`px-5 py-3 text-center ${plans[i].popular ? "bg-brand-petal" : ""}`}><Cell v={v} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </details>
        </>
      )}
      <p className="mt-6 text-[14px] text-mute" data-reveal>{planNote}</p>
    </section>
  );
}

/** Service fee vs ad spend, how ad accounts work, and recommended starting budgets. */
export function AdBudget() {
  return (
    <section className="bg-haze py-[120px]">
      <div className="container-air">
        <SectionHead eyebrow="Paid promotion - ad budget" center={false}>
          Your ad budget is paid <Accent text="*directly by you,*" /> to the platform
        </SectionHead>
        {/* min-w-0: grid columns otherwise refuse to shrink below their content on 320px phones. */}
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] [&>*]:min-w-0">
          <div className="space-y-6">
            <div className="grid items-stretch gap-4 sm:grid-cols-[1fr_auto_1fr]">
              <div className="rounded-[14px] p-6 text-white" style={{ background: "var(--gradient-brand)" }} data-reveal>
                <p className="text-[12px] uppercase tracking-[0.14em] text-white/80">{adBudget.fee.label}</p>
                <p className="mt-3 text-[32px] font-medium leading-none">{adBudget.fee.value}</p>
                <p className="mt-3 text-[14px] text-white/85">{adBudget.fee.body}</p>
              </div>
              <span className="self-center text-center text-[28px] text-mute" aria-hidden>+</span>
              <div className="rounded-[14px] bg-ink p-6 text-white" data-reveal="0.1">
                <p className="text-[12px] uppercase tracking-[0.14em] text-white/60">{adBudget.spend.label}</p>
                <p className="mt-3 text-[32px] font-medium leading-none">{adBudget.spend.value}</p>
                <p className="mt-3 text-[14px] text-white/75">{adBudget.spend.body}</p>
              </div>
            </div>
            <div className="rounded-[14px] bg-white p-6" data-reveal>
              <p className="text-[18px]">How it works</p>
              <ul className="mt-4 space-y-2 text-[15px] text-ink/75">
                {adBudget.how.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span className="mt-[0.55em] h-[5px] w-[5px] shrink-0 rounded-full bg-brand" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div data-reveal="0.1"><AdBudgetPlanner /></div>
        </div>
      </div>
    </section>
  );
}

/** What's included, what's not, and what we need from the client. */
export function ScopeClarity() {
  return (
    <section className="container-air py-[120px]">
      <SectionHead eyebrow="Scope clarity" center={false}>What&apos;s included, what&apos;s not, and what we <Accent text="*need from you*" /></SectionHead>
      <div className="grid gap-4 md:grid-cols-3">
        {scopeClarity.map((c, i) => (
          <div key={c.title} data-reveal={i * 0.08} className={`rounded-[14px] p-6 ${i === 0 ? "bg-brand-petal" : "card-haze"}`}>
            <h3 className="text-[18px]">{c.title}</h3>
            <ul className="mt-4 space-y-2 text-[15px] text-ink/75">
              {c.items.map((it) => (
                <li key={it} className="flex gap-3">
                  <span className={`mt-[0.55em] h-[5px] w-[5px] shrink-0 rounded-full ${i === 1 ? "bg-ink/30" : "bg-brand"}`} aria-hidden />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Terms & conditions. */
export function Terms() {
  return (
    <section className="bg-haze py-[120px]">
      <div className="container-air">
        <SectionHead eyebrow="Terms & conditions" center={false}>Simple, fair <Accent text="*terms*" /></SectionHead>
        {/* Accordion rows; the text stays in the page for search engines while closed. */}
        <div className="grid items-start gap-x-12 md:grid-cols-2">
          {terms.map((t, i) => (
            <details key={t.title} data-reveal={(i % 2) * 0.06} className="acc group border-t border-line" name="terms">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[18px] transition-colors hover:text-brand-deep">
                {t.title}
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-[15px] text-brand-deep transition-transform duration-300 group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="acc-body pb-5 text-ink/70">{t.body}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Three next steps to get started. */
export function NextSteps() {
  return (
    <section className="container-air py-[120px]">
      <p className={eyebrow} data-reveal>Next steps</p>
      <h2 className="text-[clamp(32px,4.6vw,56px)] leading-[1.05] tracking-[-0.02em]" data-reveal>
        Let&apos;s get your <Accent text="*growth*" /> started.
      </h2>
      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {nextSteps.map((s, i) => (
          <li key={s.n} data-reveal={i * 0.08} className="flex items-center gap-4 rounded-[14px] bg-brand-petal p-6">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white" style={{ background: "var(--gradient-brand)" }}>{s.n}</span>
            <span className="text-[18px]">{s.title}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
