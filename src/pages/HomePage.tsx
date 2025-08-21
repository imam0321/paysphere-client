import Contact from "@/components/modules/Home/Contact";
import Faq from "@/components/modules/Home/Faq";
import Features from "@/components/modules/Home/Features";
import Hero from "@/components/modules/Home/Hero";
import Pricing from "@/components/modules/Home/Pricing";
import StatsStrip from "@/components/modules/Home/StatsStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <StatsStrip />
      <Faq />
      <Contact />
    </>
  );
}
