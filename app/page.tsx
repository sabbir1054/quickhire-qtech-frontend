import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background font-[Epilogue,sans-serif]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] flex-col justify-center overflow-hidden">
        {/* Subtle purple gradients */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top right, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0.03) 30%, transparent 60%), linear-gradient(to bottom left, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0.03) 30%, transparent 60%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Two column grid */}
          <div className="grid grid-cols-1 items-end lg:grid-cols-[1fr_auto]">
            {/* Left Column - Text */}
            <div className="relative z-20 space-y-7 pb-6 pt-20 lg:pt-0">
              <h1
                style={{ fontFamily: "'Clash Display', sans-serif" }}
                className="text-5xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
              >
                Discover{" "}
                <br />
                more than{" "}
                <br />
                <span className="relative inline-block text-primary">
                  5000+ Jobs
                  <svg
                    className="absolute -bottom-2 left-0 w-full sm:-bottom-3"
                    viewBox="0 0 230 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 8.5C30 2 60 2 95 6C130 10 160 10.5 190 7C205 5.5 218 3.5 228 2"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="max-w-lg text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Great platform for the job seeker that searching for new career
                heights and passionate about startups.
              </p>
            </div>

            {/* Right Column - Man Image */}
            <div className="relative hidden pt-24 lg:block">
              {/* Decorative geometric SVG */}
              <svg
                className="absolute right-0 top-1/2 h-full w-full -translate-y-1/2"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M200 40 L360 140 L360 300 L200 400 L40 300 L40 140 Z" stroke="#818cf8" strokeWidth="1.5" opacity="0.15" />
                <path d="M200 40 L200 200 M360 140 L200 200 M40 140 L200 200" stroke="#818cf8" strokeWidth="1.5" opacity="0.15" />
                <path d="M200 200 L200 400 M200 200 L360 300 M200 200 L40 300" stroke="#818cf8" strokeWidth="1.5" opacity="0.12" />
                <path d="M100 70 L300 70 L370 170" stroke="#818cf8" strokeWidth="1" opacity="0.12" />
                <path d="M30 230 L100 340 L300 340" stroke="#818cf8" strokeWidth="1" opacity="0.12" />
                <path d="M280 60 L380 120" stroke="#818cf8" strokeWidth="1" opacity="0.1" />
                <path d="M20 280 L80 370" stroke="#818cf8" strokeWidth="1" opacity="0.1" />
                <path d="M200 120 L280 200 L200 280 L120 200 Z" stroke="#818cf8" strokeWidth="1" opacity="0.08" />
              </svg>

              <Image
                src="/images/Hero/man.png"
                alt="Professional job seeker"
                width={420}
                height={480}
                className="relative z-10 ml-auto h-auto w-full max-w-sm object-contain"
                priority
              />
            </div>
          </div>

          {/* Search Bar - overlaps into right side */}
          <div className="relative z-30 -mt-6 mb-4 max-w-3xl">
            <div className="flex flex-col bg-card px-3 py-2 shadow-2xl sm:flex-row sm:items-stretch">
              {/* Job title input */}
              <div className="flex flex-1 flex-col justify-center px-4 py-2">
                <div className="flex items-center gap-3">
                  <Search className="h-[18px] w-[18px] shrink-0 text-muted-foreground/70" />
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    aria-label="Job title or keyword"
                    className="w-full bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60"
                  />
                </div>
                <div className="mt-2 h-[1.5px] rounded-full bg-primary/30" />
              </div>

              {/* Location input */}
              <div className="flex flex-1 flex-col justify-center px-4 py-2">
                <div className="flex items-center gap-3">
                  <MapPin className="h-[18px] w-[18px] shrink-0 text-muted-foreground" />
                  <span className="flex-1 text-[15px] text-foreground">
                    Florence, Italy
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                </div>
                <div className="mt-2 h-[1.5px] rounded-full bg-primary/30" />
              </div>

              {/* Search button */}
              <div className="flex shrink-0 items-center px-1 pt-2 sm:pt-0">
                <Button className="h-10 w-full rounded-none px-8 text-sm font-semibold sm:w-auto">
                  Search my job
                </Button>
              </div>
            </div>

            {/* Popular Tags */}
            <p className="mt-5 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Popular : </span>
              UI Designer, UX Researcher, Android, Admin
            </p>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="border-t border-border/40 bg-background py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-sm font-medium text-muted-foreground">
            Companies we helped grow
          </p>
          <div className="flex flex-wrap items-center gap-x-12 gap-y-6 sm:gap-x-16">
            <Image
              src="/images/company/vodafone-2017-logo.png"
              alt="Vodafone"
              width={140}
              height={36}
              className="h-7 w-auto object-contain opacity-40 grayscale"
            />
            <Image
              src="/images/company/intel-3.png"
              alt="Intel"
              width={80}
              height={36}
              className="h-7 w-auto object-contain opacity-40 grayscale"
            />
            <Image
              src="/images/company/tesla-9 1.png"
              alt="Tesla"
              width={120}
              height={36}
              className="h-5 w-auto object-contain opacity-40 grayscale"
            />
            <Image
              src="/images/company/amd-logo-1.png"
              alt="AMD"
              width={100}
              height={36}
              className="h-7 w-auto object-contain opacity-40 grayscale"
            />
            <Image
              src="/images/company/talkit 1.png"
              alt="Talkit"
              width={100}
              height={36}
              className="h-7 w-auto object-contain opacity-40 grayscale"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
