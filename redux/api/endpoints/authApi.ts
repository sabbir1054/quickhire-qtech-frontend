import { baseApi } from "../baseApi";
import type {
  ApiResponse,
  LoginRequest,
  LoginData,
  RegisterRequest,
  RegisterData,
} from "@/types/AuthTypes";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<ApiResponse<RegisterData>, RegisterRequest>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation<ApiResponse<LoginData>, LoginRequest>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
