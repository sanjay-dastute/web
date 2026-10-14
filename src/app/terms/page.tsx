import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { ...pageMeta("/terms", "Terms of Service - Creatoos", "Creatoos terms of service."), robots: { index: true, follow: true } };

export default function Terms() {
  return (
    <>
    <JsonLd data={breadcrumbLd([{ name: "Terms of Service", path: "/terms" }])} />
    <LegalPage
      title="Terms of Service"
      sections={[
        { h: "Scope of work", p: "Every project is delivered against a written scope and delivery calendar agreed before work begins." },
        { h: "Revisions", p: "Two revision rounds are included at each stage unless the written scope says otherwise." },
        { h: "Ownership", p: "Full intellectual property, source files, code and admin access transfer to you on final payment." },
        { h: "Retainers", p: "Retainer engagements have a minimum term of three months. Advertising spend is paid directly by the client to the platform." },
        { h: "Confidentiality", p: "We sign NDAs before any commercially sensitive discussion and treat all client material as confidential." },
      ]}
    />
  </>
  );
}
