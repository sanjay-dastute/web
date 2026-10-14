import Hero from "@/components/home/Hero";
import { LogoBar, Pillars, Problem, WorkPreview, Why, Industries } from "@/components/home/Sections";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import AIDifference from "@/components/home/AIDifference";
import Process from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";
import Faq from "@/components/Faq";
import ContactCta from "@/components/ContactCta";
import { faqs } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoBar />
      <Pillars />
      <Problem />
      <ServicesShowcase />
      <AIDifference />
      <Process />
      <WorkPreview />
      <Why />
      <Industries />
      <Testimonials />
      <Faq items={faqs} />
      <ContactCta />
    </>
  );
}
