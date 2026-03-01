"use client";

import Link from "next/link";
import {
  Briefcase,
  Users,
  TrendingUp,
  PlusCircle,
  Trash2,
  MapPin,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useGetJobsQuery,
  useDeleteJobMutation,
  type Job,
} from "@/redux/api/endpoints/jobApi";
import { toast } from "sonner";

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  bg,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  bg: string;
}) {
  return (
    <div className="flex items-center gap-5 rounded-lg border border-border/40 bg-white p-6">
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: bg }}
      >
        <Icon className="h-6 w-6" style={{ color }} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p
          style={{ fontFamily: "'Clash Display', sans-serif" }}
          className="mt-1 text-2xl font-semibold text-foreground"
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function JobRow({ job, onDelete }: { job: Job; onDelete: (id: string) => void }) {
  return (
    <div className="flex items-center justify-between border-b border-border/30 px-6 py-4 last:border-0">
      <div className="min-w-0 flex-1">
        <h4 className="text-sm font-semibold text-foreground">{job.title}</h4>
        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Briefcase className="h-3 w-3" />
            {job.company}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(job.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="rounded-full border border-[#4640DE]/20 bg-[#4640DE]/5 px-3 py-1 text-xs font-medium text-[#4640DE]">
          {job.category}
        </span>
        {job.applications && (
          <span className="rounded-full border border-[#56CDAD]/20 bg-[#56CDAD]/5 px-3 py-1 text-xs font-medium text-[#56CDAD]">
            {job.applications.length} applicant{job.applications.length !== 1 ? "s" : ""}
          </span>
        )}
        <button
          onClick={() => onDelete(job.id)}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data, isLoading } = useGetJobsQuery({});
  const [deleteJob] = useDeleteJobMutation();

  const jobs = data?.data || [];
  const totalJobs = data?.meta?.total || jobs.length;
  const totalApplications = jobs.reduce(
    (sum, job) => sum + (job.applications?.length || 0),
    0
  );
  const categories = new Set(jobs.map((j) => j.category)).size;

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
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Jobs"
          value={totalJobs}
          icon={Briefcase}
          color="#4640DE"
          bg="#4640DE12"
        />
        <StatCard
          label="Total Applications"
          value={totalApplications}
          icon={Users}
          color="#56CDAD"
          bg="#56CDAD12"
        />
        <StatCard
          label="Categories"
          value={categories}
          icon={TrendingUp}
          color="#FF9B26"
          bg="#FF9B2612"
        />
        <Link href="/dashboard/create-job" className="block">
          <div className="flex h-full items-center gap-5 rounded-lg border-2 border-dashed border-[#4640DE]/30 bg-[#4640DE]/5 p-6 transition-colors hover:border-[#4640DE]/50 hover:bg-[#4640DE]/10">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#4640DE]">
              <PlusCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quick Action</p>
              <p
                style={{ fontFamily: "'Clash Display', sans-serif" }}
                className="mt-1 text-lg font-semibold text-[#4640DE]"
              >
                Post a Job
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Jobs */}
      <div className="rounded-lg border border-border/40 bg-white">
        <div className="flex items-center justify-between border-b border-border/30 px-6 py-5">
          <h2
            style={{ fontFamily: "'Clash Display', sans-serif" }}
            className="text-lg font-semibold text-foreground"
          >
            Recent Job Posts
          </h2>
          <Link href="/dashboard/create-job">
            <Button className="h-9 rounded-none text-sm font-semibold">
              <PlusCircle className="h-4 w-4" />
              New Job
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#4640DE] border-t-transparent" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="py-16 text-center">
            <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/30" />
            <p className="mt-4 text-sm text-muted-foreground">
              No jobs posted yet.
            </p>
            <Link href="/dashboard/create-job">
              <Button className="mt-4 rounded-none text-sm font-semibold">
                Post Your First Job
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            {jobs.map((job) => (
              <JobRow key={job.id} job={job} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
