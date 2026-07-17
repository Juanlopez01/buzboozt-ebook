import UrgencyBar from "@/components/landing/UrgencyBar";
import Hero from "@/components/landing/Hero";
import QualifySection from "@/components/landing/QualifySection";
import LifestyleSection from "@/components/landing/LifestyleSection";
import FeatureSection from "@/components/landing/FeatureSection";
import LearnSection from "@/components/landing/LearnSection";
import PreviewSection from "@/components/landing/PreviewSection";
import BonusesSection from "@/components/landing/BonusesSection";
import UpsellSection from "@/components/landing/UpsellSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FaqSection from "@/components/landing/FaqSection";
import DeviceShowcaseSection from "@/components/landing/DeviceShowcaseSection";
import FinalPriceSection from "@/components/landing/FinalPriceSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <UrgencyBar />
      <Hero />
      <QualifySection />
      <LifestyleSection />
      <FeatureSection />
      <LearnSection />
      <PreviewSection />
      <BonusesSection />
      <UpsellSection />
      <TestimonialsSection />
      <FaqSection />
      <DeviceShowcaseSection />
      <FinalPriceSection />
      <Footer />
    </>
  );
}
