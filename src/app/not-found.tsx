import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Page not found - Creatoos", robots: { index: false } };

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title="This page has gone *missing.*"
      sub="The link may be old or mistyped. Everything we do is still one click away."
      primary={{ label: "Back to home", href: "/" }}
      secondary={{ label: "See our services", href: "/services" }}
    />
  );
}
