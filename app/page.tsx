import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CompaniesSection from "@/components/CompaniesSection";
import CategorySection from "@/components/CategorySection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background font-[Epilogue,sans-serif]">
      <Navbar />
      <HeroSection />
      <CompaniesSection />
      <CategorySection />
      <CTASection />
    </div>
  );
}
