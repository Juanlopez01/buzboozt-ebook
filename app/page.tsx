import UrgencyBar from "@/components/landing/UrgencyBar";
import Hero from "@/components/landing/Hero";
import QualifySection from "@/components/landing/QualifySection";
import LifestyleSection from "@/components/landing/LifestyleSection";
import FeatureSection from "@/components/landing/FeatureSection";
import LearnSection from "@/components/landing/LearnSection";
import PreviewSection from "@/components/landing/PreviewSection";
import BonusesSection from "@/components/landing/BonusesSection";
import UpsellSection from "@/components/landing/UpsellSection";
import WebServiceSection from "@/components/landing/WebServiceSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FaqSection from "@/components/landing/FaqSection";
import DeviceShowcaseSection from "@/components/landing/DeviceShowcaseSection";
import FinalPriceSection from "@/components/landing/FinalPriceSection";
import Footer from "@/components/landing/Footer";
import SocialProofPopup from "@/components/landing/SocialProofPopup";
import MobileFloatingCta from "@/components/landing/MobileFloatingCta";

export default function Home() {
  return (
    <>
      <UrgencyBar />
      <Hero />
      <QualifySection />
      <TestimonialsSection />
      <LifestyleSection />
      <FeatureSection />
      <LearnSection />
      <PreviewSection />
      <BonusesSection />
      <UpsellSection />
      <WebServiceSection />
      <FaqSection />
      <DeviceShowcaseSection />
      <FinalPriceSection />
      <Footer />
      <SocialProofPopup />
      <MobileFloatingCta />
    </>
  );
}
