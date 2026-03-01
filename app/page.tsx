import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CompaniesSection from "@/components/CompaniesSection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background font-[Epilogue,sans-serif]">
      <Navbar />
      <HeroSection />
      <CompaniesSection />
    </div>
  );
}
