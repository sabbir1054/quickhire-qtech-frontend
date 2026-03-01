"use client";

import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen font-[Epilogue,sans-serif]">
      {/* Left side - Branding */}
      <div className="hidden w-1/2 flex-col justify-between bg-[#202430] p-12 lg:flex">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="QuickHire"
            width={150}
            height={40}
            className="object-contain brightness-0 invert"
          />
        </Link>

        <div className="space-y-6">
          <h1
            style={{ fontFamily: "'Clash Display', sans-serif" }}
            className="text-4xl font-semibold leading-tight text-white xl:text-5xl"
          >
            Find your{" "}
            <span className="italic text-[#26A4FF]">dream job</span>
            <br />
            with QuickHire
          </h1>
          <p className="max-w-md text-base leading-relaxed text-[#D6DDEB]">
            Great platform for the job seeker that passionate about startups.
            Find your dream job easier.
          </p>
        </div>

        {/* Decorative geometric SVG */}
        <svg
          className="w-full max-w-xs opacity-10"
          viewBox="0 0 300 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M0 40L60 10L120 40L180 10L240 40L300 10" stroke="#4640DE" strokeWidth="2" />
          <path d="M0 60L60 30L120 60L180 30L240 60L300 30" stroke="#4640DE" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full flex-col lg:w-1/2">
        {/* Mobile header */}
        <div className="flex items-center justify-between p-6 lg:hidden">
          <Link href="/">
            <Image src="/logo.png" alt="QuickHire" width={120} height={32} className="object-contain" />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-12">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
