import Link from "next/link";
import { ArrowRight } from "lucide-react";

const tagColors: Record<string, string> = {
  "Full-Time": "border-[#56CDAD] text-[#56CDAD]",
  Marketing: "border-[#FF9B26] text-[#FF9B26]",
  Design: "border-[#344054] text-[#344054]",
};

const jobs = [
  {
    logo: (
      <svg viewBox="0 0 40 40" className="h-12 w-12">
        <rect x="4" y="8" width="14" height="14" rx="2" fill="#2AD458" opacity="0.8" transform="rotate(-10 11 15)" />
        <rect x="14" y="12" width="14" height="14" rx="2" fill="#1B9E3E" opacity="0.9" transform="rotate(5 21 19)" />
        <rect x="10" y="18" width="14" height="14" rx="2" fill="#56CDAD" opacity="0.7" transform="rotate(-5 17 25)" />
      </svg>
    ),
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    logo: (
      <svg viewBox="0 0 40 40" className="h-12 w-12">
        <path d="M20 4L36 20L20 36L4 20Z" fill="#32C8C8" opacity="0.3" />
        <path d="M20 10L30 20L20 30L10 20Z" fill="#20A6A6" />
      </svg>
    ),
    title: "Social Media Assistant",
    company: "Netlify",
    location: "Paris, France",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    logo: (
      <svg viewBox="0 0 40 40" className="h-12 w-12">
        <path d="M10 14L20 8L30 14L20 20Z" fill="#0061FF" />
        <path d="M10 20L20 14L30 20L20 26Z" fill="#0061FF" opacity="0.7" />
        <path d="M10 26L20 20L30 26L20 32Z" fill="#0061FF" opacity="0.5" />
      </svg>
    ),
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, USA",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    logo: (
      <svg viewBox="0 0 40 40" className="h-12 w-12">
        <circle cx="20" cy="20" r="16" fill="#344054" />
        <path d="M14 22L20 16L26 22" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Brand Designer",
    company: "Maze",
    location: "San Fransisco, USA",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    logo: (
      <svg viewBox="0 0 40 40" className="h-12 w-12">
        <path d="M20 4L8 20H17L14 36L32 18H22L26 4Z" fill="#7B61FF" opacity="0.15" />
        <path d="M20 6V18H10L20 34V22H30Z" fill="#7B61FF" />
      </svg>
    ),
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    logo: (
      <svg viewBox="0 0 40 40" className="h-12 w-12">
        <circle cx="20" cy="20" r="16" fill="#02B3E4" />
        <path d="M15 16C15 16 17 24 20 24C23 24 25 16 25 16" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    ),
    title: "Interactive Developer",
    company: "Udacity",
    location: "Hamburg, Germany",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    logo: (
      <svg viewBox="0 0 40 40" className="h-12 w-12">
        <path d="M8 8L20 4L20 20L8 16Z" fill="#FF4F4F" />
        <path d="M20 4L32 8L32 24L20 20Z" fill="#FF7A59" />
        <path d="M8 16L20 20L20 36L8 32Z" fill="#C43333" opacity="0.8" />
      </svg>
    ),
    title: "HR Manager",
    company: "Packer",
    location: "Lucern, Switzerland",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    logo: (
      <svg viewBox="0 0 40 40" className="h-12 w-12">
        <circle cx="20" cy="20" r="16" fill="#4353FF" />
        <text x="20" y="26" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="sans-serif">w</text>
      </svg>
    ),
    title: "HR Manager",
    company: "Webflow",
    location: "Lucern, Switzerland",
    tags: ["Full-Time", "Marketing", "Design"],
  },
];

export default function LatestJobsSection() {
  return (
    <section className="relative overflow-hidden bg-background py-16 lg:py-20">
      {/* Decorative geometric lines */}
      <svg
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/3 opacity-[0.07] sm:block"
        viewBox="0 0 300 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M100 0L300 150L200 300L300 450L150 600" stroke="#4640DE" strokeWidth="2" />
        <path d="M150 50L280 180L180 350L280 500" stroke="#4640DE" strokeWidth="1.5" />
        <path d="M200 0L250 100" stroke="#4640DE" strokeWidth="1.5" />
        <path d="M250 400L200 550L280 600" stroke="#4640DE" strokeWidth="1.5" />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <h2
            style={{ fontFamily: "'Clash Display', sans-serif" }}
            className="text-3xl font-semibold text-foreground sm:text-4xl"
          >
            Latest{" "}
            <span className="italic text-[#26A4FF]">jobs open</span>
          </h2>
          <Link
            href="/jobs"
            className="hidden items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 sm:flex"
          >
            Show all jobs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Desktop: 2-column horizontal card grid */}
        <div className="hidden gap-4 sm:grid lg:grid-cols-2">
          {jobs.map((job, index) => (
            <Link
              key={index}
              href="#"
              className="group flex items-start gap-6 border border-border bg-card p-6 transition-all hover:shadow-md"
            >
              <div className="shrink-0">{job.logo}</div>
              <div className="min-w-0 flex-1">
                <h3
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                  className="text-lg font-semibold text-foreground"
                >
                  {job.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {job.company} <span className="mx-1">·</span> {job.location}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full border px-3 py-0.5 text-xs font-medium ${tagColors[tag] || "border-border text-muted-foreground"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile: Single column, vertical cards */}
        <div className="flex flex-col gap-4 sm:hidden">
          {jobs.map((job, index) => (
            <Link
              key={index}
              href="#"
              className="group border border-border bg-card p-5 transition-all hover:shadow-md"
            >
              <div className="mb-4">{job.logo}</div>
              <h3
                style={{ fontFamily: "'Clash Display', sans-serif" }}
                className="text-lg font-semibold text-foreground"
              >
                {job.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {job.company} <span className="mx-1">·</span> {job.location}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full border px-3 py-0.5 text-xs font-medium ${tagColors[tag] || "border-border text-muted-foreground"}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}

          {/* Mobile: Show all jobs link */}
          <Link
            href="/jobs"
            className="mt-2 flex items-center justify-center gap-2 text-sm font-semibold text-primary"
          >
            Show all jobs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
