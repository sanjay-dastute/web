import Hero from "@/components/home/Hero";
import { LogoBar, WorkPreview, Why, Industries } from "@/components/home/Sections";
import Story from "@/components/home/Story";
import { Plans, ProofStats } from "@/components/Marketing";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import AIDifference from "@/components/home/AIDifference";
import Process from "@/components/home/Process";
import IdeaFunnel from "@/components/home/IdeaFunnel";
import Finale from "@/components/home/Finale";
import Testimonials from "@/components/home/Testimonials";
import Faq from "@/components/Faq";
import ContactCta from "@/components/ContactCta";
import { faqs } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />
      <Story />
      <ProofStats />
      <LogoBar />
      <ServicesShowcase />
      <AIDifference />
      <IdeaFunnel />
      <Process />
      <WorkPreview />
      <Why />
      <Industries />
      <Testimonials />
      <Plans compact />
      <Faq items={faqs} />
      <Finale />
      <ContactCta />
    </>
  );
}
