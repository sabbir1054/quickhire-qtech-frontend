import Image from "next/image";

export default function CompaniesSection() {
  return (
    <section className="border-t border-border/40 bg-background py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-sm font-medium text-muted-foreground">
          Companies we helped grow
        </p>
        <div className="flex items-center justify-between gap-y-6">
          <Image
            src="/images/company/vodafone-2017-logo.png"
            alt="Vodafone"
            width={140}
            height={36}
            className="h-7 w-auto object-contain opacity-40 grayscale"
          />
          <Image
            src="/images/company/intel-3.png"
            alt="Intel"
            width={80}
            height={36}
            className="h-7 w-auto object-contain opacity-40 grayscale"
          />
          <Image
            src="/images/company/tesla-9 1.png"
            alt="Tesla"
            width={120}
            height={36}
            className="h-5 w-auto object-contain opacity-40 grayscale"
          />
          <Image
            src="/images/company/amd-logo-1.png"
            alt="AMD"
            width={100}
            height={36}
            className="h-7 w-auto object-contain opacity-40 grayscale"
          />
          <Image
            src="/images/company/talkit 1.png"
            alt="Talkit"
            width={100}
            height={36}
            className="h-7 w-auto object-contain opacity-40 grayscale"
          />
        </div>
      </div>
    </section>
  );
}
