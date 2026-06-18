import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import FeatureGrid from "@/components/FeatureGrid";
import FeaturedSection from "@/components/FeaturedSection";
import HeadlinesSection from "@/components/HeadlinesSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <FeatureGrid />
      <FeaturedSection />
      <HeadlinesSection />
      <ContactSection />
    </>
  );
}
