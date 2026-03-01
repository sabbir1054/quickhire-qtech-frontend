import CategorySection from "@/components/CategorySection";
import CompaniesSection from "@/components/CompaniesSection";
import CTASection from "@/components/CTASection";
import FeaturedJobsSection from "@/components/FeaturedJobsSection";
import HeroSection from "@/components/HeroSection";
import LatestJobsSection from "@/components/LatestJobsSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background font-[Epilogue,sans-serif]">
      <Navbar />
      <HeroSection />
      <CompaniesSection />
      <CategorySection />
      <CTASection />
      <FeaturedJobsSection />
      <LatestJobsSection />
    </div>
  );
}
