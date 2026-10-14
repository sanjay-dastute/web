import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { ...pageMeta("/privacy-policy", "Privacy Policy - Creatoos", "Creatoos privacy policy."), robots: { index: true, follow: true } };

export default function Privacy() {
  return (
    <>
    <JsonLd data={breadcrumbLd([{ name: "Privacy Policy", path: "/privacy-policy" }])} />
    <LegalPage
      title="Privacy Policy"
      sections={[
        { h: "What we collect", p: "When you fill in our enquiry form or contact us, we collect the details you provide: your name, business name, phone number, email address and project information." },
        { h: "How we use it", p: "We use your details only to respond to your enquiry, prepare proposals and deliver the services you engage us for. We do not sell your information." },
        { h: "Cookies and analytics", p: "We may use analytics tools to understand how visitors use this website. These collect anonymised usage data." },
        { h: "Confidential material", p: "We do not feed confidential client material into public AI tools." },
        { h: "Your rights", p: "You can ask us to see, correct or delete the personal information we hold about you at any time." },
      ]}
    />
  </>
  );
}
