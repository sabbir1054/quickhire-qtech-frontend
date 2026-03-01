"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MapPin,
  Briefcase,
  Calendar,
  ArrowLeft,
  Clock,
  Layers,
  Send,
  X,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetJobQuery,
  useSubmitApplicationMutation,
} from "@/redux/api/endpoints/jobApi";
import { toast } from "sonner";

/* ─── Apply Form Schema ─── */
const applySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please provide a valid email"),
  resumeLink: z.url("Please provide a valid URL"),
  coverNote: z.string().min(10, "Cover note must be at least 10 characters"),
});

type ApplyFormData = z.infer<typeof applySchema>;

/* ─── Apply Modal ─── */
function ApplyModal({
  jobId,
  jobTitle,
  onClose,
}: {
  jobId: string;
  jobTitle: string;
  onClose: () => void;
}) {
  const [submitApplication, { isLoading, isSuccess }] = useSubmitApplicationMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplyFormData>({
    resolver: zodResolver(applySchema),
  });

  const onSubmit = async (data: ApplyFormData) => {
    try {
      const res = await submitApplication({ ...data, jobId }).unwrap();
      if (res.success) {
        toast.success(res.message || "Application submitted successfully!");
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string; errorMessages?: { message: string }[] } };
      const message =
        error?.data?.errorMessages?.[0]?.message ||
        error?.data?.message ||
        "Failed to submit application.";
      toast.error(message);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg overflow-hidden bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/50 px-6 py-5">
          <div>
            <h3
              style={{ fontFamily: "'Clash Display', sans-serif" }}
              className="text-xl font-semibold text-foreground"
            >
              Apply for this job
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">{jobTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSuccess ? (
          /* ─── Success State ─── */
          <div className="px-6 py-14 text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-[#56CDAD]" />
            <h4
              style={{ fontFamily: "'Clash Display', sans-serif" }}
              className="mt-5 text-2xl font-semibold text-foreground"
            >
              Application Sent!
            </h4>
            <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
              Your application has been submitted successfully. The company will review and get back to you.
            </p>
            <Button onClick={onClose} className="mt-8 h-11 rounded-none px-8 text-sm font-semibold">
              Close
            </Button>
          </div>
        ) : (
          /* ─── Form ─── */
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-6 py-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="apply-name">Full Name</Label>
              <Input
                id="apply-name"
                placeholder="John Doe"
                className="h-11 rounded-none border-border"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="apply-email">Email Address</Label>
              <Input
                id="apply-email"
                type="email"
                placeholder="john@example.com"
                className="h-11 rounded-none border-border"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Resume Link */}
            <div className="space-y-2">
              <Label htmlFor="apply-resume">Resume Link</Label>
              <Input
                id="apply-resume"
                placeholder="https://resume.com/yourname"
                className="h-11 rounded-none border-border"
                {...register("resumeLink")}
              />
              {errors.resumeLink && (
                <p className="text-xs text-destructive">{errors.resumeLink.message}</p>
              )}
            </div>

            {/* Cover Note */}
            <div className="space-y-2">
              <Label htmlFor="apply-cover">Cover Note</Label>
              <textarea
                id="apply-cover"
                rows={4}
                placeholder="Tell the company why you're a great fit for this role..."
                className="flex w-full border border-border bg-background px-3 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-ring/50 focus:ring-[3px]"
                {...register("coverNote")}
              />
              {errors.coverNote && (
                <p className="text-xs text-destructive">{errors.coverNote.message}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-1">
              <Button
                type="submit"
                disabled={isLoading}
                className="h-11 flex-1 rounded-none text-sm font-semibold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Application
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="h-11 rounded-none px-6 text-sm"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ─── Detail Row ─── */
function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4640DE]/5">
        <Icon className="h-5 w-5 text-[#4640DE]" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}

/* ─── Category Colors ─── */
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

/* ─── Main Page ─── */
export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetJobQuery(id);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const job = data?.data;

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
          <div className="hidden items-center gap-6 md:flex">
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

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-32">
          <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#4640DE] border-t-transparent" />
        </div>
      )}

      {/* Not Found */}
      {!isLoading && !job && (
        <div className="py-32 text-center">
          <Briefcase className="mx-auto h-14 w-14 text-muted-foreground/20" />
          <p
            style={{ fontFamily: "'Clash Display', sans-serif" }}
            className="mt-5 text-xl font-semibold text-foreground"
          >
            Job not found
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            This job may have been removed or the link is incorrect.
          </p>
          <Link href="/jobs">
            <Button className="mt-6 rounded-none text-sm font-semibold">
              Browse all jobs
            </Button>
          </Link>
        </div>
      )}

      {/* Job Detail */}
      {job && (
        <>
          {/* Header Section */}
          <div className="border-b border-border/40 bg-[#F8F8FD]">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
              {/* Back link */}
              <Link
                href="/jobs"
                className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all jobs
              </Link>

              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-5">
                  {/* Company Avatar */}
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#4640DE] text-2xl font-bold text-white">
                    {job.company.charAt(0)}
                  </div>
                  <div>
                    <h1
                      style={{ fontFamily: "'Clash Display', sans-serif" }}
                      className="text-2xl font-semibold text-foreground sm:text-3xl"
                    >
                      {job.title}
                    </h1>
                    <p className="mt-1.5 text-base text-muted-foreground">
                      {job.company} <span className="mx-1.5">·</span> {job.location}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full border px-3 py-0.5 text-xs font-medium ${
                          categoryColor[job.category] || "border-border text-muted-foreground"
                        }`}
                      >
                        {job.category.replace("_", " ")}
                      </span>
                      <span className="rounded-full border border-[#4640DE] px-3 py-0.5 text-xs font-medium text-[#4640DE]">
                        Full Time
                      </span>
                    </div>
                  </div>
                </div>

                {/* Apply Button */}
                <Button
                  onClick={() => setShowApplyModal(true)}
                  className="h-12 shrink-0 rounded-none px-10 text-base font-semibold"
                >
                  <Send className="h-4 w-4" />
                  Apply Now
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Left: Description */}
              <div className="lg:col-span-2">
                <div className="rounded-lg border border-border/40 bg-white p-8">
                  <h2
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                    className="text-xl font-semibold text-foreground"
                  >
                    Job Description
                  </h2>
                  <div className="mt-5 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                    {job.description}
                  </div>
                </div>

                {/* Applications count */}
                {job.applications && job.applications.length > 0 && (
                  <div className="mt-6 rounded-lg border border-border/40 bg-white p-8">
                    <h2
                      style={{ fontFamily: "'Clash Display', sans-serif" }}
                      className="text-xl font-semibold text-foreground"
                    >
                      Applicants
                      <span className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#4640DE]/10 text-sm font-semibold text-[#4640DE]">
                        {job.applications.length}
                      </span>
                    </h2>
                    <div className="mt-5 space-y-4">
                      {job.applications.map((app) => (
                        <div
                          key={app.id}
                          className="flex items-center justify-between border-b border-border/30 pb-4 last:border-0 last:pb-0"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F8F8FD] text-sm font-semibold text-[#4640DE]">
                              {app.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{app.name}</p>
                              <p className="text-xs text-muted-foreground">{app.email}</p>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(app.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Sidebar Info */}
              <div className="space-y-6">
                {/* Job Overview */}
                <div className="rounded-lg border border-border/40 bg-white p-6">
                  <h3
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                    className="mb-5 text-lg font-semibold text-foreground"
                  >
                    Job Overview
                  </h3>
                  <div className="space-y-5">
                    <DetailItem icon={Briefcase} label="Company" value={job.company} />
                    <DetailItem icon={MapPin} label="Location" value={job.location} />
                    <DetailItem icon={Layers} label="Category" value={job.category.replace("_", " ")} />
                    <DetailItem icon={Clock} label="Type" value="Full Time" />
                    <DetailItem
                      icon={Calendar}
                      label="Posted On"
                      value={new Date(job.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    />
                  </div>
                </div>

                {/* CTA card */}
                <div className="rounded-lg bg-[#4640DE] p-6 text-center">
                  <h4
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                    className="text-lg font-semibold text-white"
                  >
                    Interested in this job?
                  </h4>
                  <p className="mt-2 text-sm text-white/70">
                    Submit your application now and take the first step toward your dream career.
                  </p>
                  <Button
                    onClick={() => setShowApplyModal(true)}
                    className="mt-5 h-11 w-full rounded-none bg-white text-sm font-semibold text-[#4640DE] hover:bg-white/90"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Apply Modal */}
          {showApplyModal && (
            <ApplyModal
              jobId={job.id}
              jobTitle={`${job.title} at ${job.company}`}
              onClose={() => setShowApplyModal(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
