import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Navbar() {
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
              className=" object-contain"
            />
            
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <Link
              href="/find-jobs"
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

        {/* Login + Sign Up */}
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-base font-bold text-primary transition-colors hover:text-primary/80"
          >
            Login
          </Link>
          <Button size="lg" className="rounded-lg px-7 text-sm font-semibold">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
}
