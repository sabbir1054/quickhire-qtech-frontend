import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Purple inner box with diagonal cut on top-left and bottom-right */}
        <div
          className="relative overflow-visible px-8 py-16 sm:px-12 lg:px-16 lg:py-20"
          style={{
            backgroundColor: "#4640DE",
            clipPath:
              "polygon(10% 0%, 100% 0%, 100% 85%, 90% 100%, 0% 100%, 0% 15%)",
          }}
        >
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Left Column - Text */}
            <div className="space-y-6">
              <h2
                style={{ fontFamily: "'Clash Display', sans-serif" }}
                className="text-4xl font-semibold leading-tight text-white sm:text-5xl"
              >
                Start posting
                <br />
                jobs today
              </h2>
              <p className="text-lg text-white/70">
                Start posting jobs for only $10.
              </p>
              <Button className="mt-2 h-12 rounded-none bg-white px-8 text-base font-semibold text-[#4640DE] hover:bg-white/90">
                Sign Up For Free
              </Button>
            </div>

            {/* Right Column - Dashboard Image (overflows the purple box) */}
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
