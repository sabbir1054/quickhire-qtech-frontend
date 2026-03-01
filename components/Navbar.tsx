"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="absolute left-0 top-0 z-50 w-full border-b border-border/40 bg-transparent">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo + Nav Links */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="QuickHire"
              width={150}
              height={40}
              className="object-contain"
            />
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <Link
              href="/jobs"
              className="text-[15px] text-foreground/80 transition-colors hover:text-foreground"
            >
              Find Jobs
            </Link>
            <Link
              href="/browse-companies"
              className="text-[15px] text-foreground/80 transition-colors hover:text-foreground"
            >
              Browse Companies
            </Link>
          </div>
        </div>

        {/* Desktop: Login + Sign Up */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/login"
            className="text-base font-bold text-primary transition-colors hover:text-primary/80"
          >
            Login
          </Link>
          <Link href="/register">
            <Button size="lg" className="rounded-none px-7 text-sm font-semibold">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile: Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border/40 bg-white px-4 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/jobs"
              onClick={() => setMobileOpen(false)}
              className="text-[15px] text-foreground/80 transition-colors hover:text-foreground"
            >
              Find Jobs
            </Link>
            <Link
              href="/browse-companies"
              onClick={() => setMobileOpen(false)}
              className="text-[15px] text-foreground/80 transition-colors hover:text-foreground"
            >
              Browse Companies
            </Link>
            <div className="mt-2 h-px bg-border/40" />
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-base font-bold text-primary"
            >
              Login
            </Link>
            <Link href="/register" onClick={() => setMobileOpen(false)}>
              <Button className="w-full rounded-none text-sm font-semibold">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
