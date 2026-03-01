"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/reduxHooks";
import { logout, selectCurrentUser } from "@/redux/slice/authSlice";
import { clearAccessToken } from "@/axios/axiosInstance";

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/jobs", label: "All Jobs", icon: Briefcase },
  { href: "/dashboard/create-job", label: "Create Job", icon: PlusCircle },
  { href: "/dashboard/applications", label: "Applications", icon: FileText },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleLogout = () => {
    clearAccessToken();
    dispatch(logout());
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#F8F8FD] font-[Epilogue,sans-serif]">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#202430] transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between px-6">
          <Link href="/dashboard">
            <Image
              src="/logo.png"
              alt="QuickHire"
              width={130}
              height={36}
              className="object-contain brightness-0 invert"
            />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white/60 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="mt-4 flex-1 space-y-1 px-3">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#4640DE] text-white"
                    : "text-[#D6DDEB] hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-white/10 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[#D6DDEB] transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Bar */}
        <header className="flex h-20 items-center justify-between border-b border-border/40 bg-white px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-foreground lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="hidden lg:block">
            <h1
              style={{ fontFamily: "'Clash Display', sans-serif" }}
              className="text-xl font-semibold text-foreground"
            >
              {sidebarLinks.find((l) => l.href === pathname)?.label || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4640DE] text-sm font-bold text-white">
              {user.name?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
