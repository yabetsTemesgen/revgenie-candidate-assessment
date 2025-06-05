import Link from "next/link"
import Image from "next/image"

export default function OnboardingWelcome() {
  return (
    <div className="min-h-screen bg-[#5a17d6] text-white">
      <div className="container mx-auto px-4 py-12 md:py-24 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="md:w-1/2 space-y-8">
            <div className="flex items-center justify-center w-full">
              <div className="relative">
                <Image 
                  src="/logo/revgeni-logo.png" 
                  alt="RevGeni Logo" 
                  width={250} 
                  height={80} 
                  priority 
                  className="object-contain"
                />
              </div>
            </div>

            <div className="space-y-6 mt-12">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">Welcome to your GeniVerse</h2>
              <p className="text-xl md:text-2xl text-purple-200">Let's set up your AI-powered growth team</p>

              <div className="pt-8 space-y-4">
                <Link
                  href="/onboarding/initial"
                  className="inline-block bg-white text-[#5a17d6] px-10 py-4 rounded-full text-xl font-semibold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
                >
                  Let the magic begin
                </Link>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center mt-12 md:mt-0 hidden md:flex">
            <div className="relative">
              <Image 
                src="/geni-charakters/main-geni.png" 
                alt="RevGeni Character" 
                width={350} 
                height={350} 
                priority 
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}