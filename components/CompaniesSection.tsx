import Image from "next/image";

export default function CompaniesSection() {
  return (
    <section className="border-t border-border/40 bg-background py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-sm font-medium text-muted-foreground">
          Companies we helped grow
        </p>
        <div className="flex items-center gap-8 overflow-x-auto pb-2 sm:justify-between sm:gap-0 sm:overflow-visible sm:pb-0">
          <Image
            src="/images/company/vodafone-2017-logo.png"
            alt="Vodafone"
            width={140}
            height={36}
            className="h-7 w-auto shrink-0 object-contain opacity-40 grayscale"
          />
          <Image
            src="/images/company/intel-3.png"
            alt="Intel"
            width={80}
            height={36}
            className="h-7 w-auto shrink-0 object-contain opacity-40 grayscale"
          />
          <Image
            src="/images/company/tesla-9 1.png"
            alt="Tesla"
            width={120}
            height={36}
            className="h-5 w-auto shrink-0 object-contain opacity-40 grayscale"
          />
          <Image
            src="/images/company/amd-logo-1.png"
            alt="AMD"
            width={100}
            height={36}
            className="h-7 w-auto shrink-0 object-contain opacity-40 grayscale"
          />
          <Image
            src="/images/company/talkit 1.png"
            alt="Talkit"
            width={100}
            height={36}
            className="h-7 w-auto shrink-0 object-contain opacity-40 grayscale"
          />
        </div>
      </div>
    </section>
  );
}
