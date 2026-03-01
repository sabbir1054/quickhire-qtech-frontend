import Image from "next/image";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      {/* Subtle purple gradients */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top right, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0.03) 30%, transparent 60%), linear-gradient(to bottom left, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0.03) 30%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Right Column - Man Image (absolute, pinned to bottom-right) */}
      <div className="pointer-events-none absolute bottom-0 right-100 top-20  hidden w-[45%] max-w-lg lg:block ">
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
          className="relative z-10 ml-auto h-auto w-full object-contain"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto flex min-h-[80vh] w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        {/* Text */}
        <div className="space-y-7 pb-6 pt-20 lg:max-w-[55%] lg:pt-0">
          <h1
            style={{ fontFamily: "'Clash Display', sans-serif" }}
            className="text-5xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Discover{" "}
            <br />
            more than{" "}
            <br />
            <span className="relative inline-block text-[#26A4FF]">
              500+ Jobs
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

        {/* Search Bar */}
        <div className="relative z-30 mt-2 max-w-3xl pb-4">
          <div className="flex flex-col bg-card px-3 py-2 shadow-2xl sm:flex-row sm:items-stretch">
            {/* Job title input */}
            <div className="flex flex-1 flex-col justify-center px-4 py-2">
              <div className="flex items-center gap-3">
                <Search className="h-4.5 w-4.5 shrink-0 text-muted-foreground/70" />
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
  );
}
