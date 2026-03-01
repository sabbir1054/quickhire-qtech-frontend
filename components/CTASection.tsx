import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Purple inner box - no clip-path on mobile, diagonal cuts on sm+ via .cta-clip */}
        <div className="cta-clip relative overflow-visible bg-[#4640DE] px-6 py-12 sm:px-12 lg:px-16 lg:py-20">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-8">
            {/* Left Column - Text */}
            <div className="space-y-6 text-center sm:text-left">
              <h2
                style={{ fontFamily: "'Clash Display', sans-serif" }}
                className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl"
              >
                Start posting
                <br />
                jobs today
              </h2>
              <p className="text-base text-white/70 sm:text-lg">
                Start posting jobs for only $10.
              </p>
              <Button className="mt-2 h-12 rounded-none bg-white px-8 text-base font-semibold text-[#4640DE] hover:bg-white/90">
                Sign Up For Free
              </Button>
            </div>

            {/* Right Column - Dashboard Image */}
            <div className="relative flex justify-center lg:justify-end">
              <Image
                src="/images/dashboard/dashoard.png"
                alt="QuickHire Dashboard"
                width={700}
                height={460}
                className="relative h-auto w-full max-w-2xl shadow-2xl lg:-mr-8 lg:-mt-8 lg:mb-[-3rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
