"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowUpDown,
  X,
  Layers,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetJobsQuery } from "@/redux/api/endpoints/jobApi";
import type { Job, JobsQueryParams } from "@/redux/api/endpoints/jobApi";

const CATEGORIES = [
  "Design",
  "Sales",
  "Marketing",
  "Finance",
  "Technology",
  "Engineering",
  "Business",
  "Human_Resource",
];

const LOCATIONS = [
  "Remote",
  "Dhaka",
  "Chittagong",
  "Rajshahi",
  "Khulna",
  "Sylhet",
  "Rangpur",
  "Barishal",
  "Mymensingh",
  "Comilla",
  "Gazipur",
  "Narayanganj",
  "Bogra",
  "Dinajpur",
  "Jessore",
  "Cox_s_Bazar",
  "Brahmanbaria",
  "Narsingdi",
  "Savar",
  "Tongi",
  "Faridpur",
];

const SORT_OPTIONS = [
  { label: "Newest First", sortBy: "createdAt", sortOrder: "desc" as const },
  { label: "Oldest First", sortBy: "createdAt", sortOrder: "asc" as const },
  { label: "Title A-Z", sortBy: "title", sortOrder: "asc" as const },
  { label: "Title Z-A", sortBy: "title", sortOrder: "desc" as const },
];

const ITEMS_PER_PAGE = 9;

/* ─── Custom Select Dropdown ─── */
function SelectDropdown({
  value,
  onChange,
  options,
  placeholder,
  icon: Icon,
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
  icon: React.ElementType;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = options.filter((o) =>
    o.replace(/_/g, " ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => { setOpen(!open); setSearch(""); }}
        className={`flex h-12 w-full items-center gap-2.5 border bg-white px-4 text-sm transition-colors ${
          open ? "border-[#4640DE] ring-[3px] ring-[#4640DE]/10" : "border-border hover:border-border/80"
        } ${value ? "text-foreground" : "text-muted-foreground"}`}
      >
        <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="flex-1 truncate text-left">
          {value ? value.replace(/_/g, " ") : placeholder}
        </span>
        {value ? (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onChange(""); }}
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : (
          <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1.5 w-full overflow-hidden border border-border bg-white shadow-xl">
          {/* Search inside dropdown */}
          <div className="border-b border-border/50 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${placeholder.toLowerCase()}...`}
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-56 overflow-y-auto py-1">
            {/* All option */}
            <button
              type="button"
              onClick={() => { onChange(""); setOpen(false); }}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-[#4640DE]/5 ${
                !value ? "font-medium text-[#4640DE]" : "text-muted-foreground"
              }`}
            >
              All {placeholder}s
              {!value && <Check className="h-4 w-4 text-[#4640DE]" />}
            </button>

            {filtered.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-[#4640DE]/5 ${
                  value === opt ? "font-medium text-[#4640DE]" : "text-foreground"
                }`}
              >
                {opt.replace(/_/g, " ")}
                {value === opt && <Check className="h-4 w-4 text-[#4640DE]" />}
              </button>
            ))}

            {filtered.length === 0 && (
              <p className="px-4 py-3 text-center text-sm text-muted-foreground">No results</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Job Card ─── */
function JobCard({ job }: { job: Job }) {
  const categoryColor: Record<string, string> = {
    Design: "border-[#EDAB00] text-[#EDAB00] bg-[#EDAB00]/5",
    Engineering: "border-[#56CDAD] text-[#56CDAD] bg-[#56CDAD]/5",
    Marketing: "border-[#FF9B26] text-[#FF9B26] bg-[#FF9B26]/5",
    Technology: "border-[#4640DE] text-[#4640DE] bg-[#4640DE]/5",
    Finance: "border-[#0EA5E9] text-[#0EA5E9] bg-[#0EA5E9]/5",
    Sales: "border-[#E11D48] text-[#E11D48] bg-[#E11D48]/5",
    Business: "border-[#344054] text-[#344054] bg-[#344054]/5",
    Human_Resource: "border-[#7C3AED] text-[#7C3AED] bg-[#7C3AED]/5",
  };

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="group flex flex-col justify-between border border-border bg-card p-6 transition-all hover:border-[#4640DE]/30 hover:shadow-lg"
    >
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4640DE] text-lg font-bold text-white">
            {job.company.charAt(0)}
          </div>
          <span className="rounded-sm border border-[#4640DE] px-3 py-1 text-xs font-medium text-[#4640DE]">
            Full Time
          </span>
        </div>

        <h3
          style={{ fontFamily: "'Clash Display', sans-serif" }}
          className="text-lg font-semibold text-foreground group-hover:text-[#4640DE]"
        >
          {job.title}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5" />
            {job.company}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {job.location}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground/70">
          {job.description}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full border px-3 py-0.5 text-xs font-medium ${
            categoryColor[job.category] || "border-border text-muted-foreground"
          }`}
        >
          {job.category.replace("_", " ")}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {new Date(job.createdAt).toLocaleDateString()}
        </span>
      </div>
    </Link>
  );
}

/* ─── Main Page ─── */
export default function JobsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTerm") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get("location") || "");
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [sortIndex, setSortIndex] = useState(0);

  const queryParams: JobsQueryParams = {
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    sortBy: SORT_OPTIONS[sortIndex].sortBy,
    sortOrder: SORT_OPTIONS[sortIndex].sortOrder,
  };
  if (searchTerm.trim()) queryParams.searchTerm = searchTerm.trim();
  if (selectedCategory) queryParams.category = selectedCategory;
  if (selectedLocation) queryParams.location = selectedLocation;

  const { data, isLoading, isFetching } = useGetJobsQuery(queryParams);

  const jobs = data?.data || [];
  const meta = data?.meta || { total: 0, page: 1, limit: ITEMS_PER_PAGE };
  const totalPages = Math.ceil(meta.total / meta.limit) || 1;

  const updateURL = useCallback(
    (params: Record<string, string>) => {
      const urlParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) urlParams.set(key, value);
      });
      const query = urlParams.toString();
      router.push(`/jobs${query ? `?${query}` : ""}`, { scroll: false });
    },
    [router]
  );

  useEffect(() => {
    updateURL({
      searchTerm: searchTerm.trim(),
      category: selectedCategory,
      location: selectedLocation,
      page: currentPage > 1 ? String(currentPage) : "",
    });
  }, [searchTerm, selectedCategory, selectedLocation, currentPage, updateURL]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedLocation("");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm || selectedCategory || selectedLocation;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-background font-[Epilogue,sans-serif]">
      {/* Navbar */}
      <nav className="border-b border-border/40 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="QuickHire" width={150} height={40} className="object-contain" />
            </Link>
            <div className="hidden items-center gap-7 md:flex">
              <Link href="/jobs" className="text-[15px] font-medium text-[#4640DE]">
                Find Jobs
              </Link>
              <Link href="/" className="text-[15px] text-foreground/80 transition-colors hover:text-foreground">
                Browse Companies
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-base font-bold text-primary transition-colors hover:text-primary/80">
              Login
            </Link>
            <Link href="/register">
              <Button size="lg" className="rounded-none px-7 text-sm font-semibold">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Centered Page Header ── */}
      <div className="border-b border-border/40 bg-[#F8F8FD]">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <h1
            style={{ fontFamily: "'Clash Display', sans-serif" }}
            className="text-4xl font-semibold text-foreground sm:text-5xl"
          >
            Find your <span className="italic text-[#26A4FF]">dream job</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            Search and filter through hundreds of job listings to find the perfect role for you
          </p>

          {/* ── Search + Filter Bar ── */}
          <form
            onSubmit={handleSearch}
            className="mx-auto mt-8 flex max-w-4xl flex-col gap-3 sm:flex-row"
          >
            {/* Search Input */}
            <div className="flex flex-1 items-center gap-3 border border-border bg-white px-4">
              <Search className="h-4.5 w-4.5 shrink-0 text-muted-foreground/60" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Job title, keyword, or company"
                className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
              />
              {searchTerm && (
                <button type="button" onClick={() => { setSearchTerm(""); setCurrentPage(1); }}>
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="w-full sm:w-48">
              <SelectDropdown
                value={selectedCategory}
                onChange={(val) => { setSelectedCategory(val); setCurrentPage(1); }}
                options={CATEGORIES}
                placeholder="Category"
                icon={Layers}
              />
            </div>

            {/* Location Dropdown */}
            <div className="w-full sm:w-48">
              <SelectDropdown
                value={selectedLocation}
                onChange={(val) => { setSelectedLocation(val); setCurrentPage(1); }}
                options={LOCATIONS}
                placeholder="Location"
                icon={MapPin}
              />
            </div>

            {/* Search Button */}
            <Button type="submit" className="h-12 shrink-0 rounded-none px-8 text-sm font-semibold">
              Search
            </Button>
          </form>
        </div>
      </div>

      {/* ── Results Section ── */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">{meta.total}</span>{" "}
              result{meta.total !== 1 ? "s" : ""}
            </p>

            {/* Active Filter Tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2">
                {searchTerm && (
                  <span className="flex items-center gap-1.5 rounded-full border border-[#4640DE]/20 bg-[#4640DE]/5 px-3 py-1 text-xs font-medium text-[#4640DE]">
                    &ldquo;{searchTerm}&rdquo;
                    <button onClick={() => { setSearchTerm(""); setCurrentPage(1); }}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="flex items-center gap-1.5 rounded-full border border-[#4640DE]/20 bg-[#4640DE]/5 px-3 py-1 text-xs font-medium text-[#4640DE]">
                    {selectedCategory.replace("_", " ")}
                    <button onClick={() => { setSelectedCategory(""); setCurrentPage(1); }}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedLocation && (
                  <span className="flex items-center gap-1.5 rounded-full border border-[#4640DE]/20 bg-[#4640DE]/5 px-3 py-1 text-xs font-medium text-[#4640DE]">
                    {selectedLocation.replace(/_/g, " ")}
                    <button onClick={() => { setSelectedLocation(""); setCurrentPage(1); }}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <select
              value={sortIndex}
              onChange={(e) => {
                setSortIndex(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-border bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-[#4640DE]"
            >
              {SORT_OPTIONS.map((opt, i) => (
                <option key={i} value={i}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Jobs Grid */}
        {isLoading || isFetching ? (
          <div className="flex items-center justify-center py-24">
            <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#4640DE] border-t-transparent" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-lg border border-border bg-white py-24 text-center">
            <Briefcase className="mx-auto h-14 w-14 text-muted-foreground/20" />
            <p
              style={{ fontFamily: "'Clash Display', sans-serif" }}
              className="mt-5 text-xl font-semibold text-foreground"
            >
              No jobs found
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
            {hasActiveFilters && (
              <Button
                onClick={clearFilters}
                variant="outline"
                className="mt-5 rounded-none text-sm"
              >
                Clear all filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-1.5">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="flex h-10 items-center gap-1.5 rounded-lg border border-border px-3 text-sm text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, i) =>
                page === "..." ? (
                  <span key={`dots-${i}`} className="px-2 text-sm text-muted-foreground">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page as number)}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-[#4640DE] text-white"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="flex h-10 items-center gap-1.5 rounded-lg border border-border px-3 text-sm text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
