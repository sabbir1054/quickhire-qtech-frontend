import {
  PenTool,
  BarChart3,
  Megaphone,
  Wallet,
  Monitor,
  Code2,
  Briefcase,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "Design", jobs: 235, icon: PenTool },
  { name: "Sales", jobs: 756, icon: BarChart3 },
  { name: "Marketing", jobs: 140, icon: Megaphone },
  { name: "Finance", jobs: 325, icon: Wallet },
  { name: "Technology", jobs: 436, icon: Monitor },
  { name: "Engineering", jobs: 542, icon: Code2 },
  { name: "Business", jobs: 211, icon: Briefcase },
  { name: "Human Resource", jobs: 346, icon: Users },
];

export default function CategorySection() {
  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <h2
            style={{ fontFamily: "'Clash Display', sans-serif" }}
            className="text-3xl font-semibold text-foreground sm:text-4xl"
          >
            Explore by <span className="text-[#26A4FF]">category</span>
          </h2>
          <Link
            href="/jobs"
            className="hidden items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 sm:flex"
          >
            Show all jobs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={`/jobs?category=${category.name.replace(" ", "_")}`}
                className="group flex flex-col justify-between rounded-sm border border-border bg-card p-8 text-foreground transition-all duration-300 hover:border-[#4640DE] hover:bg-[#4640DE] hover:text-white"
              >
                <div>
                  <Icon
                    className="mb-6 h-10 w-10 text-[#4640DE] transition-colors duration-300 group-hover:text-white"
                    strokeWidth={1.5}
                  />
                  <h3
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                    className="text-xl font-semibold"
                  >
                    {category.name}
                  </h3>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-white/80">
                    {category.jobs} jobs available
                  </span>
                  <ArrowRight className="h-4 w-4 text-foreground transition-colors duration-300 group-hover:text-white" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
