import Link from "next/link";
import { ArrowRight } from "lucide-react";

const tagColors: Record<string, string> = {
  Marketing: "border-[#FF9B26] text-[#FF9B26]",
  Design: "border-[#EDAB00] text-[#EDAB00]",
  Business: "border-[#344054] text-[#344054]",
  Technology: "border-[#56CDAD] text-[#56CDAD]",
};

const jobs = [
  {
    logo: "R",
    logoBg: "#1C1C1C",
    logoText: "text-white",
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    type: "Full Time",
    description: "Revolut is looking for Email Marketing to help team ma ...",
    tags: ["Marketing", "Design"],
  },
  {
    logo: "✦",
    logoBg: "#0061FF",
    logoText: "text-white",
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, US",
    type: "Full Time",
    description: "Dropbox is looking for Brand Designer to help the team t ...",
    tags: ["Design", "Business"],
  },
  {
    logo: "P",
    logoBg: "#2D2D2D",
    logoText: "text-white",
    title: "Email Marketing",
    company: "Pitch",
    location: "Berlin, Germany",
    type: "Full Time",
    description: "Pitch is looking for Customer Manager to join marketing t ...",
    tags: ["Marketing"],
  },
  {
    logo: "●",
    logoBg: "#2AD458",
    logoText: "text-white",
    title: "Visual Designer",
    company: "Blinklist",
    location: "Granada, Spain",
    type: "Full Time",
    description: "Blinklist is looking for Visual Designer to help team desi ...",
    tags: ["Design"],
  },
  {
    logo: "∞",
    logoBg: "#1A6AFF",
    logoText: "text-white",
    title: "Product Designer",
    company: "ClassPass",
    location: "Manchester, UK",
    type: "Full Time",
    description: "ClassPass is looking for Product Designer to help us...",
    tags: ["Marketing", "Design"],
  },
  {
    logo: "C",
    logoBg: "#7CCFCF",
    logoText: "text-white",
    title: "Lead Designer",
    company: "Canva",
    location: "Ontario, Canada",
    type: "Full Time",
    description: "Canva is looking for Lead Engineer to help develop n ...",
    tags: ["Design", "Business"],
  },
  {
    logo: "G",
    logoBg: "#1BADA2",
    logoText: "text-white",
    title: "Brand Strategist",
    company: "GoDaddy",
    location: "Marseille, France",
    type: "Full Time",
    description: "GoDaddy is looking for Brand Strategist to join the team...",
    tags: ["Marketing"],
  },
  {
    logo: "𝕏",
    logoBg: "#1DA1F2",
    logoText: "text-white",
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    type: "Full Time",
    description: "Twitter is looking for Data Analyst to help team desi ...",
    tags: ["Technology"],
  },
];

function JobCard({ job }: { job: (typeof jobs)[number] }) {
  return (
    <Link
      href="#"
      className="group flex min-w-[260px] flex-col justify-between border border-border bg-card p-6 transition-all hover:shadow-md sm:min-w-0"
    >
      {/* Top: Logo + Badge */}
      <div>
        <div className="mb-5 flex items-center justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold"
            style={{ backgroundColor: job.logoBg }}
          >
            <span className={job.logoText}>{job.logo}</span>
          </div>
          <span className="rounded-sm border border-[#4640DE] px-3 py-1 text-xs font-medium text-[#4640DE]">
            {job.type}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{ fontFamily: "'Clash Display', sans-serif" }}
          className="text-lg font-semibold text-foreground"
        >
          {job.title}
        </h3>

        {/* Company + Location */}
        <p className="mt-1 text-sm text-muted-foreground">
          {job.company} <span className="mx-1">·</span> {job.location}
        </p>

        {/* Description */}
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground/70">
          {job.description}
        </p>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
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
  );
}

export default function FeaturedJobsSection() {
  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <h2
            style={{ fontFamily: "'Clash Display', sans-serif" }}
            className="text-3xl font-semibold text-foreground sm:text-4xl"
          >
            Featured <span className="italic text-[#26A4FF]">jobs</span>
          </h2>
          <Link
            href="/jobs"
            className="hidden items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 sm:flex"
          >
            Show all jobs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile: Horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 sm:hidden" style={{ scrollSnapType: "x mandatory" }}>
          {jobs.map((job, index) => (
            <div key={index} className="shrink-0" style={{ width: "75%", scrollSnapAlign: "start" }}>
              <JobCard job={job} />
            </div>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>

        {/* Mobile: Show all jobs link */}
        <div className="mt-6 flex justify-center sm:hidden">
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Show all jobs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
