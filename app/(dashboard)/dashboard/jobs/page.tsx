"use client";

import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Calendar,
  Trash2,
  PlusCircle,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useGetJobsQuery,
  useDeleteJobMutation,
  type Job,
} from "@/redux/api/endpoints/jobApi";
import { toast } from "sonner";

function JobCard({ job, onDelete }: { job: Job; onDelete: (id: string) => void }) {
  const appCount = job.applications?.length || 0;

  return (
    <div className="flex flex-col justify-between rounded-lg border border-border/40 bg-white p-6 transition-shadow hover:shadow-md sm:flex-row sm:items-center">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-semibold text-foreground">{job.title}</h3>
          <span className="rounded-full border border-[#4640DE]/20 bg-[#4640DE]/5 px-3 py-0.5 text-xs font-medium text-[#4640DE]">
            {job.category}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5" />
            {job.company}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {job.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(job.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            {appCount} applicant{appCount !== 1 ? "s" : ""}
          </span>
        </div>
        <p className="mt-2 line-clamp-1 text-sm text-muted-foreground/70">
          {job.description}
        </p>
      </div>

      <div className="mt-4 flex shrink-0 items-center gap-2 sm:ml-6 sm:mt-0">
        <button
          onClick={() => onDelete(job.id)}
          className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    </div>
  );
}

export default function AllJobsPage() {
  const { data, isLoading } = useGetJobsQuery({});
  const [deleteJob] = useDeleteJobMutation();

  const jobs = data?.data || [];

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteJob(id).unwrap();
      if (res.success) {
        toast.success(res.message || "Job deleted successfully");
      }
    } catch {
      toast.error("Failed to delete job");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            style={{ fontFamily: "'Clash Display', sans-serif" }}
            className="text-2xl font-semibold text-foreground"
          >
            All Jobs
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {jobs.length} job{jobs.length !== 1 ? "s" : ""} posted
          </p>
        </div>
        <Link href="/dashboard/create-job">
          <Button className="h-10 rounded-none text-sm font-semibold">
            <PlusCircle className="h-4 w-4" />
            Post Job
          </Button>
        </Link>
      </div>

      {/* Job List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#4640DE] border-t-transparent" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="rounded-lg border border-border/40 bg-white py-20 text-center">
          <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <p className="mt-4 text-sm text-muted-foreground">No jobs yet.</p>
          <Link href="/dashboard/create-job">
            <Button className="mt-4 rounded-none text-sm font-semibold">
              Post Your First Job
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
