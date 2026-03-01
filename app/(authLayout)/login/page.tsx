"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/api/endpoints/authApi";
import { useAppDispatch } from "@/redux/hooks/reduxHooks";
import { setUser } from "@/redux/slice/authSlice";
import { setAccessToken as setAxiosToken } from "@/axios/axiosInstance";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.email("Please provide a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await login(data).unwrap();

      if (res.success) {
        // Set token in axios memory
        setAxiosToken(res.data.accessToken);

        // Set user and token in Redux store
        dispatch(
          setUser({
            user: { email: data.email, name: data.email.split("@")[0] },
            accessToken: res.data.accessToken,
          })
        );

        toast.success(res.message || "Login successful");
        router.push("/");
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string; errorMessages?: { message: string }[] } };
      const message =
        error?.data?.errorMessages?.[0]?.message ||
        error?.data?.message ||
        "Login failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div>
      <h2
        style={{ fontFamily: "'Clash Display', sans-serif" }}
        className="text-3xl font-semibold text-foreground"
      >
        Welcome Back
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Login to your account to continue
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="h-12 rounded-none border-border bg-background"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="h-12 rounded-none border-border bg-background pr-11"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="h-12 w-full rounded-none text-base font-semibold"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary hover:text-primary/80"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
