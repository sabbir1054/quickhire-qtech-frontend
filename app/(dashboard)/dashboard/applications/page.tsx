"use client";

import { useState } from "react";
import {
  FileText,
  Briefcase,
  MapPin,
  Calendar,
  Mail,
  Link2,
  User,
  X,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetApplicationsQuery } from "@/redux/api/endpoints/jobApi";
import type { ApplicationResponse } from "@/redux/api/endpoints/jobApi";

/* ─── Application Detail Modal ─── */
function ApplicationModal({
  app,
  onClose,
}: {
  app: ApplicationResponse;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg overflow-hidden bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/50 px-6 py-5">
          <h3
            style={{ fontFamily: "'Clash Display', sans-serif" }}
            className="text-xl font-semibold text-foreground"
          >
            Application Details
          </h3>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          {/* Applicant Info */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#4640DE] text-xl font-bold text-white">
              {app.name.charAt(0)}
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">{app.name}</p>
              <p className="text-sm text-muted-foreground">{app.email}</p>
            </div>
          </div>

          {/* Job Applied For */}
          {app.job && (
            <div className="rounded-lg bg-[#F8F8FD] p-4">
              <p className="text-xs font-medium text-muted-foreground">Applied for</p>
              <p className="mt-1 text-sm font-semibold text-foreground">{app.job.title}</p>
              <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  {app.job.company}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {app.job.location}
                </span>
              </div>
            </div>
          )}

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <a
                  href={`mailto:${app.email}`}
                  className="text-sm font-medium text-[#4640DE] hover:underline"
                >
                  {app.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Link2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Resume</p>
                <a
                  href={app.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm font-medium text-[#4640DE] hover:underline"
                >
                  View Resume
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Cover Note</p>
                <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-foreground">
                  {app.coverNote}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Applied On</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(app.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <a href={`mailto:${app.email}`} className="flex-1">
              <Button className="h-10 w-full rounded-none text-sm font-semibold">
                <Mail className="h-4 w-4" />
                Send Email
              </Button>
            </a>
            <Button
              variant="outline"
              onClick={onClose}
              className="h-10 rounded-none px-6 text-sm"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function ApplicationsPage() {
  const { data, isLoading } = useGetApplicationsQuery();
  const [selectedApp, setSelectedApp] = useState<ApplicationResponse | null>(null);
  const [filterJobTitle, setFilterJobTitle] = useState("");

  const applications = data?.data || [];

  // Sort by newest first
  const sorted = [...applications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Get unique job titles for filter
  const jobTitles = [...new Set(applications.map((a) => a.job?.title).filter(Boolean))];

  // Filter
  const filtered = filterJobTitle
    ? sorted.filter((app) => app.job?.title === filterJobTitle)
    : sorted;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2
            style={{ fontFamily: "'Clash Display', sans-serif" }}
            className="text-2xl font-semibold text-foreground"
          >
            Applications
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {applications.length} total application{applications.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Job filter */}
        {jobTitles.length > 1 && (
          <select
            value={filterJobTitle}
            onChange={(e) => setFilterJobTitle(e.target.value)}
            className="h-10 border border-border bg-white px-3 text-sm text-foreground outline-none focus:border-[#4640DE]"
          >
            <option value="">All Jobs</option>
            {jobTitles.map((title) => (
              <option key={title} value={title!}>
                {title}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Application List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#4640DE] border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-border/40 bg-white py-20 text-center">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground/20" />
          <p className="mt-4 text-sm text-muted-foreground">
            {applications.length === 0
              ? "No applications received yet."
              : "No applications match the selected filter."}
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-border/40 bg-white">
          {/* Table Header */}
          <div className="hidden grid-cols-[2fr_2fr_1.5fr_1fr_auto] items-center gap-4 border-b border-border/30 px-6 py-3.5 sm:grid">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Applicant</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Job</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Resume</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Action</span>
          </div>

          {/* Rows */}
          {filtered.map((app) => (
            <div
              key={app.id}
              className="grid grid-cols-1 gap-3 border-b border-border/20 px-6 py-4 last:border-0 sm:grid-cols-[2fr_2fr_1.5fr_1fr_auto] sm:items-center sm:gap-4"
            >
              {/* Applicant */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4640DE]/10 text-sm font-semibold text-[#4640DE]">
                  {app.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{app.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{app.email}</p>
                </div>
              </div>

              {/* Job */}
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {app.job?.title || "—"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {app.job ? `${app.job.company} · ${app.job.location}` : "—"}
                </p>
              </div>

              {/* Resume */}
              <a
                href={app.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-[#4640DE] hover:underline"
              >
                <Link2 className="h-3.5 w-3.5" />
                <span className="truncate">View Resume</span>
              </a>

              {/* Date */}
              <span className="text-sm text-muted-foreground">
                {new Date(app.createdAt).toLocaleDateString()}
              </span>

              {/* Action */}
              <Button
                variant="outline"
                onClick={() => setSelectedApp(app)}
                className="h-9 rounded-none text-xs font-medium"
              >
                <User className="h-3.5 w-3.5" />
                Details
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedApp && (
        <ApplicationModal
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}
    </div>
  );
}
