import { faqs, services } from "@/lib/content";
import { serviceDetails } from "@/lib/serviceDetails";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

// Long-form companion to /llms.txt: every service summary and FAQ answer as plain text.
export function GET() {
  const strip = (s: string) => s.replace(/\*/g, "");
  const sections = services.map((s) => {
    const d = serviceDetails[s.slug];
    return `## ${s.title}

URL: ${SITE_URL}/services/${s.slug}

${strip(d.h1)}. ${d.sub}

What's included:
${d.included.map((g) => `- ${g.title}: ${g.body}`).join("\n")}

How AI is used: ${d.ai.map((a) => `${a.title} - ${a.body}`).join(" ")}
What stays human: ${d.human}
${d.timeline ? `\nTimelines:\n${d.timeline.map((t) => `- ${t.label}: ${t.time}`).join("\n")}\n` : ""}
FAQ:
${d.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}`;
  });

  const body = `# Creatoos - full reference

Creatoos is a creative and technology studio in Coimbatore, Tamil Nadu, India.

## General FAQ

${faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}

${sections.join("\n\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
