import Image from "next/image";
import Link from "next/link";

const aboutLinks = ["Companies", "Pricing", "Terms", "Advice", "Privacy Policy"];
const resourceLinks = ["Help Docs", "Guide", "Updates", "Contact Us"];

const socialIcons = [
  {
    name: "Facebook",
    path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
  },
  {
    name: "Instagram",
    path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01",
    rect: true,
  },
  {
    name: "Dribbble",
    path: "M12 2a10 10 0 1010 10A10 10 0 0012 2zm6.84 4.56a8.5 8.5 0 011 3.22c-1.6-.32-3.35-.39-5-.21a16 16 0 00-.78-1.77 13.6 13.6 0 004.78-1.24zM12 3.5a8.46 8.46 0 015.28 1.84 12.14 12.14 0 01-4.38 1.15A40 40 0 0010 2.82 8.5 8.5 0 0112 3.5zM8.56 3.37a38.3 38.3 0 012.91 3.63 20.5 20.5 0 01-6.8.92 8.5 8.5 0 013.89-4.55z",
  },
  {
    name: "LinkedIn",
    path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z",
  },
  {
    name: "Twitter",
    path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#202430]">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
          {/* Logo + Description */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="QuickHire" width={150} height={40} />
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-[#D6DDEB]">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>

          {/* About */}
          <div>
            <h4
              style={{ fontFamily: "'Clash Display', sans-serif" }}
              className="text-lg font-semibold text-white"
            >
              About
            </h4>
            <ul className="mt-5 space-y-3">
              {aboutLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-[#D6DDEB] transition-colors hover:text-white"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4
              style={{ fontFamily: "'Clash Display', sans-serif" }}
              className="text-lg font-semibold text-white"
            >
              Resources
            </h4>
            <ul className="mt-5 space-y-3">
              {resourceLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-[#D6DDEB] transition-colors hover:text-white"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              style={{ fontFamily: "'Clash Display', sans-serif" }}
              className="text-lg font-semibold text-white"
            >
              Get job notifications
            </h4>
            <p className="mt-5 text-sm leading-relaxed text-[#D6DDEB]">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="mt-5 flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
                className="h-11 flex-1 border border-[#363A48] bg-transparent px-4 text-sm text-white outline-none placeholder:text-[#A0AAC8] focus:border-[#4640DE]"
              />
              <button className="h-11 shrink-0 bg-[#4640DE] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#3530C9]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 h-px bg-[#363A48]" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-[#A0AAC8]">
            2021 @ QuickHire. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialIcons.map((icon) => (
              <Link
                key={icon.name}
                href="#"
                aria-label={icon.name}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#363A48] transition-colors hover:bg-[#4640DE]"
              >
                <svg
                  className="h-4 w-4 text-[#D6DDEB]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {icon.rect && (
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  )}
                  <path d={icon.path} />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
