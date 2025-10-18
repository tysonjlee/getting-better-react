import HeroSection from "./HeroSection"
import MissionSection from "./MissionSection"
import FeaturesSection from "./FeaturesSection"

function Landing() {
  return (
    <div className="flex flex-col justify-center items-center py-4 gap-5">
      <HeroSection />
      <MissionSection />
      <FeaturesSection />
    </div>
  )
}

export default Landing