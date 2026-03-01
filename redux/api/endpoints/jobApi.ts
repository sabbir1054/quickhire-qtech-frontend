import { baseApi } from "../baseApi";
import type { ApiResponse } from "@/types/AuthTypes";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  createdAt: string;
  applications?: Application[];
}

export interface Application {
  id: string;
  jobId: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  createdAt: string;
}

export interface CreateJobRequest {
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
}

export interface JobsQueryParams {
  searchTerm?: string;
  company?: string;
  location?: string;
  category?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedJobsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: Job[];
}

export interface SubmitApplicationRequest {
  jobId: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
}

export interface ApplicationResponse {
  id: string;
  jobId: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  createdAt: string;
  job?: Job;
}

const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<PaginatedJobsResponse, JobsQueryParams | void>({
      query: (params) => {
        const queryParams: Record<string, string> = {};
        if (params) {
          if (params.searchTerm) queryParams.searchTerm = params.searchTerm;
          if (params.company) queryParams.company = params.company;
          if (params.location) queryParams.location = params.location;
          if (params.category) queryParams.category = params.category;
          if (params.page) queryParams.page = String(params.page);
          if (params.limit) queryParams.limit = String(params.limit);
          if (params.sortBy) queryParams.sortBy = params.sortBy;
          if (params.sortOrder) queryParams.sortOrder = params.sortOrder;
        }
        return {
          url: "/jobs",
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: ["Jobs"],
    }),
    getJob: builder.query<ApiResponse<Job>, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "GET",
      }),
      providesTags: ["Jobs"],
    }),
    createJob: builder.mutation<ApiResponse<Job>, CreateJobRequest>({
      query: (data) => ({
        url: "/jobs",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    deleteJob: builder.mutation<ApiResponse<Job>, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),
    submitApplication: builder.mutation<ApiResponse<ApplicationResponse>, SubmitApplicationRequest>({
      query: (data) => ({
        url: "/applications",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Jobs"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobQuery,
  useCreateJobMutation,
  useDeleteJobMutation,
  useSubmitApplicationMutation,
} = jobApi;
