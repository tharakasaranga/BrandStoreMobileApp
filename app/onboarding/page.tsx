import MobileContainer from "@/components/ui/MobileContainer";

export default function OnboardingPage() {
  return (
    <MobileContainer>
      <div className="p-6">
        {/* Image */}
        <div className="w-full h-[420px] rounded-[36px] overflow-hidden bg-[#f5f5f5]" />

        {/* Text */}
        <div className="mt-8">
          <h2 className="text-[44px] leading-[1.05] font-semibold text-black">
            Find The
            <br />
            Best Collections
          </h2>

          <p className="mt-4 text-[16px] leading-7 text-gray-400">
            Get your dream item easily with FashionHub and get other interesting
            offer
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-10 grid grid-cols-2 gap-4">
          <button className="h-[56px] rounded-full border border-black text-[18px] font-medium">
            Sign Up
          </button>

          <button className="h-[56px] rounded-full bg-[#ff8a00] text-[18px] font-medium text-white">
            Sign In
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
