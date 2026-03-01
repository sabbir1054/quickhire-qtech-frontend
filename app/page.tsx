import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="flex min-h-[80vh] items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-6">
            {/* Left Column */}
            <div className="space-y-8 pt-20 lg:pt-0">
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
                  {/* Hand-drawn squiggle underline */}
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

              {/* Search Bar */}
              <div className="flex max-w-2xl flex-col gap-0 rounded-xl bg-card p-2.5 shadow-xl ring-1 ring-border/50 sm:flex-row sm:items-center">
                {/* Job title input */}
                <div className="flex flex-1 items-center gap-3 px-4 py-3">
                  <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    aria-label="Job title or keyword"
                    className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
                  />
                </div>

                {/* Dividers */}
                <div className="hidden h-10 w-px bg-border sm:block" />
                <div className="h-px w-full bg-border sm:hidden" />

                {/* Location input */}
                <div className="flex flex-1 items-center gap-3 px-4 py-3">
                  <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Florence, Italy"
                    aria-label="Location"
                    className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
                  />
                </div>

                {/* Search button */}
                <Button size="lg" className="shrink-0 px-8 text-base">
                  Search my job
                </Button>
              </div>

              {/* Popular Tags */}
              <p className="text-base text-muted-foreground">
                <span className="font-semibold text-foreground">Popular : </span>
                UI Designer, UX Researcher, Android, Admin
              </p>
            </div>

            {/* Right Column */}
            <div className="relative hidden items-end justify-center lg:flex lg:justify-end">
              {/* Decorative geometric SVG */}
              <svg
                className="absolute right-0 top-1/2 h-full w-full -translate-y-1/2"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Isometric cube wireframe */}
                <path
                  d="M200 40 L360 140 L360 300 L200 400 L40 300 L40 140 Z"
                  stroke="#818cf8"
                  strokeWidth="1.5"
                  opacity="0.15"
                />
                <path
                  d="M200 40 L200 200 M360 140 L200 200 M40 140 L200 200"
                  stroke="#818cf8"
                  strokeWidth="1.5"
                  opacity="0.15"
                />
                <path
                  d="M200 200 L200 400 M200 200 L360 300 M200 200 L40 300"
                  stroke="#818cf8"
                  strokeWidth="1.5"
                  opacity="0.12"
                />
                {/* Additional angular lines */}
                <path
                  d="M100 70 L300 70 L370 170"
                  stroke="#818cf8"
                  strokeWidth="1"
                  opacity="0.12"
                />
                <path
                  d="M30 230 L100 340 L300 340"
                  stroke="#818cf8"
                  strokeWidth="1"
                  opacity="0.12"
                />
                <path
                  d="M280 60 L380 120"
                  stroke="#818cf8"
                  strokeWidth="1"
                  opacity="0.1"
                />
                <path
                  d="M20 280 L80 370"
                  stroke="#818cf8"
                  strokeWidth="1"
                  opacity="0.1"
                />
                <path
                  d="M200 120 L280 200 L200 280 L120 200 Z"
                  stroke="#818cf8"
                  strokeWidth="1"
                  opacity="0.08"
                />
              </svg>

              {/* Person Image */}
              <Image
                src="/images/Hero/man.png"
                alt="Professional job seeker"
                width={550}
                height={620}
                className="relative z-10 h-auto w-full max-w-lg object-contain"
                priority
              />
            </div>
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
