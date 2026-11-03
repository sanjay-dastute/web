import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import ContactCta from "@/components/ContactCta";
import { SectionHead } from "@/components/home/Sections";

export const metadata: Metadata = pageMeta("/about", "About Creatoos | Creative Studio in Coimbatore", "Since 2019, Creatoos has helped brands look sharper, speak clearer and grow faster with branding, design, web development and digital marketing from Coimbatore.");

const beliefs = [
  { title: "Research-first", body: "Every design decision is backed by an understanding of your brand." },
  { title: "Beautiful and functional", body: "We design for impact as well as appearance." },
  { title: "Always evolving", body: "Fresh ideas, current trends and constant experimentation." },
  { title: "End-to-end", body: "From your logo to your launch campaign, all under one roof." },
];

const services = [
  { title: "Brand Identity", body: "Logo design, brand books and complete corporate identity." },
  { title: "Print & Stationery", body: "Business cards, envelopes, letterheads, calendars, brochures and flyers." },
  { title: "Packaging Design", body: "Packaging that stands out on the shelf and tells your story." },
  { title: "Graphic Design", body: "Visuals for every platform and purpose." },
  { title: "Web & App Development", body: "Websites and applications that look great and perform well." },
  { title: "Digital Marketing & Social Media", body: "Campaigns and content that build audiences and drive results." },
  { title: "SEO, AEO & GEO", body: "Visibility on search engines and in AI-driven answers." },
];

const stats = [
  { n: "500+", label: "projects delivered" },
  { n: "10+", label: "years in operation" },
  { n: "15", label: "active retainer clients" },
  { n: "15+", label: "industries served" },
];

const team = [
  { name: "Jeyenth Jayaraman", role: "Founder & CEO", background: "#ffe3e9", shirt: "#d6103c", hair: "#29232b" },
  { name: "Mohammed Shifan", role: "Creative Visualiser", background: "#e9e4fa", shirt: "#66549a", hair: "#342a29" },
  { name: "Rajakumar", role: "Digital Marketer", background: "#e0efeb", shirt: "#3b7668", hair: "#252a30" },
  { name: "Jaideep", role: "Creative Visual Photographer", background: "#fff0d9", shirt: "#b47740", hair: "#6e4434" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "About", path: "/about" }])} />
      <PageHero
        eyebrow="About Us"
        title="Make Digital Stunning & *Striking* with CREATOOS"
        sub="Since 2019, Creatoos has been helping brands look sharper, speak clearer and grow faster in the digital world. From our studio in Coimbatore, we have created hundreds of business designs, solutions and campaigns that leave a lasting impact."
      />

      <section className="container-air py-[80px]">
        <div className="mx-auto max-w-[900px] space-y-6 text-[18px] text-ink/75" data-reveal>
          <p>We connect businesses to a vast digital market. Whether you are launching a new brand or scaling an established one, we help you build a strong brand and corporate identity that puts you firmly on the digital marketing radar. At Creatoos, we go beyond thoughts and ideas. We turn them into designs you will be proud of, the designs of your dreams.</p>
        </div>
      </section>

      <section className="container-air grid gap-12 py-[120px] md:grid-cols-[1fr_1.3fr]">
        <h2 className="text-[clamp(32px,4.6vw,56px)] leading-[1.05] tracking-[-0.02em]" data-reveal>
          Curating Innovative &amp; <em className="cursive not-italic text-brand-deep">Creative</em> Frames
        </h2>
        <div className="space-y-6 text-[18px] text-ink/75" data-reveal="0.1">
          <p>This is the principle behind everything we do for you on the digital platform.</p>
          <p>Every story we tell, every brand we promote and every interaction we start is built to be both beautiful and functional. Good design should do more than catch the eye. It should work for your business.</p>
          <p>That is why every project begins with in-depth brand research. We study your audience, your market and your goals, and then shape our designs, content and campaigns to strengthen and grow the brand in hand. We love to explore and innovate, and our work reflects the latest ideas and trends.</p>
        </div>
      </section>

      <section className="overflow-hidden bg-haze py-[120px]">
        <div className="container-air">
          <SectionHead>Why Creatoos</SectionHead>
          <ul>
            {beliefs.map((b, i) => (
              <li key={b.title} data-reveal={i * 0.05} className="group grid gap-2 border-t border-line py-8 md:grid-cols-[1fr_1fr] md:items-baseline">
                <h3 className="text-[clamp(24px,3vw,40px)] leading-[1.1] transition-colors group-hover:text-brand-deep">{b.title}</h3>
                <p className="text-[18px] text-ink/70">{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-air py-[120px]">
        <SectionHead>What We Do</SectionHead>
        <p className="mx-auto mb-12 max-w-[760px] text-center text-[18px] text-ink/75" data-reveal>We take an imaginative approach to designing and visualising your ideas. Our expertise covers:</p>
        <ul className="grid gap-6 sm:grid-cols-2">
          {services.map((service, i) => (
            <li key={service.title} data-reveal={i * 0.05} className="rounded-[11px] border border-line p-8">
              <h3 className="text-[24px] leading-[1.2]">{service.title}</h3>
              <p className="mt-4 text-[18px] text-ink/70">{service.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-air py-20 md:py-24">
        <SectionHead eyebrow="The team">The people behind the <em className="cursive not-italic text-brand-deep">ideas.</em></SectionHead>
        <div className="mx-auto grid max-w-[1000px] gap-4 md:grid-cols-2 md:gap-6">
          {team.map((person, i) => (
            <article key={person.name} data-reveal={i * 0.08} className="group flex items-center gap-5 rounded-[24px] border border-line bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-brand/25 hover:shadow-[0_12px_36px_-24px_rgba(27,27,27,0.25)] sm:gap-7 sm:p-7">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full sm:h-32 sm:w-32" style={{ background: person.background }}>
                <svg viewBox="0 0 240 280" className="absolute inset-x-0 bottom-0 h-full w-full origin-bottom scale-110 transition-transform duration-500 group-hover:scale-[1.16]" role="img" aria-label={`Illustrated avatar placeholder for ${person.name}`}>
                  <circle cx="120" cy="122" r="82" fill="white" opacity="0.4" />
                  {i === 3 && <path d="M73 117C62 47 175 39 170 119L181 200H61Z" fill={person.hair} />}
                  <path d="M34 280v-34c0-45 38-68 86-68s86 23 86 68v34" fill={person.shirt} />
                  <path d="M103 160h34v32c-9 15-25 15-34 0Z" fill="#ce9677" />
                  <ellipse cx="120" cy="124" rx="43" ry="53" fill="#e9b595" />
                  <path d={i === 1 ? "M77 118V94c0-51 88-48 87 4v24l-14-31-51 8-17 27Z" : "M77 122V96c0-47 83-57 88-5l-4 29-14-31c-20 17-43 9-52 14l-13 25Z"} fill={person.hair} />
                  <circle cx="104" cy="125" r="3" fill="#342a29" />
                  <circle cx="136" cy="125" r="3" fill="#342a29" />
                  <path d="M110 147q10 9 20 0" fill="none" stroke="#9a564c" strokeWidth="3" strokeLinecap="round" />
                  {i === 1 && <g fill="none" stroke={person.hair} strokeWidth="3"><rect x="90" y="116" width="28" height="20" rx="7" /><rect x="123" y="116" width="28" height="20" rx="7" /><path d="M118 123h5" /></g>}
                  <path d="m92 190 28 25 28-25" fill="none" stroke="white" strokeOpacity="0.5" strokeWidth="3" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-[21px] font-medium leading-[1.25] tracking-[-0.025em] sm:text-[25px]">
                  <span className="block">{person.name.split(" ")[0]}</span>
                  <span className="block">{person.name.split(" ").slice(1).join(" ")}</span>
                </h3>
                <span className="my-3 block h-[2px] w-6 bg-brand/60 transition-[width] duration-300 group-hover:w-10" aria-hidden />
                <p className="text-[12px] leading-[1.5] text-mute sm:text-[13px]">{person.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line">
        <div className="container-air grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} data-reveal={i * 0.08} className="border-line py-12 text-center [&:not(:last-child)]:md:border-r">
              <p className="display text-[clamp(56px,7vw,96px)] text-brand-deep">{s.n}</p>
              <p className="mt-2 text-[14px] text-mute">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <ContactCta />
    </>
  );
}
