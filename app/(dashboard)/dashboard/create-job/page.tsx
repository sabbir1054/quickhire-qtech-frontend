"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateJobMutation } from "@/redux/api/endpoints/jobApi";
import { toast } from "sonner";

const categories = [
  "Design",
  "Sales",
  "Marketing",
  "Finance",
  "Technology",
  "Engineering",
  "Business",
  "Human Resource",
];

const jobSchema = z.object({
  title: z.string().min(2, "Job title must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type JobFormData = z.infer<typeof jobSchema>;

export default function CreateJobPage() {
  const router = useRouter();
  const [createJob, { isLoading }] = useCreateJobMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
  });

  const onSubmit = async (data: JobFormData) => {
    try {
      const res = await createJob(data).unwrap();
      if (res.success) {
        toast.success(res.message || "Job created successfully");
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string; errorMessages?: { message: string }[] } };
      const message =
        error?.data?.errorMessages?.[0]?.message ||
        error?.data?.message ||
        "Failed to create job. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-lg border border-border/40 bg-white">
        {/* Header */}
        <div className="border-b border-border/30 px-8 py-6">
          <h2
            style={{ fontFamily: "'Clash Display', sans-serif" }}
            className="text-2xl font-semibold text-foreground"
          >
            Post a New Job
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill in the details below to create a new job listing
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-8 py-8">
          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              placeholder="e.g. Frontend Developer"
              className="h-12 rounded-none border-border bg-background"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* Company */}
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              placeholder="e.g. QTech"
              className="h-12 rounded-none border-border bg-background"
              {...register("company")}
            />
            {errors.company && (
              <p className="text-xs text-destructive">{errors.company.message}</p>
            )}
          </div>

          {/* Location & Category row */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g. Dhaka, Bangladesh"
                className="h-12 rounded-none border-border bg-background"
                {...register("location")}
              />
              {errors.location && (
                <p className="text-xs text-destructive">{errors.location.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="flex h-12 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-ring focus:ring-ring/50 focus:ring-[3px]"
                defaultValue=""
                {...register("category")}
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-xs text-destructive">{errors.category.message}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <textarea
              id="description"
              rows={5}
              placeholder="Describe the role, responsibilities, and requirements..."
              className="flex w-full border border-border bg-background px-3 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-ring/50 focus:ring-[3px]"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 rounded-none px-8 text-base font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Job"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="h-12 rounded-none px-8 text-base"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
