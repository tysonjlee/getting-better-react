import HeroSection from "./HeroSection"
import MissionSection from "./MissionSection"

function Landing() {
  return (
    <div className="flex flex-col justify-center items-center py-4 gap-5">
      <HeroSection />
      <MissionSection />
    </div>
  )
}

export default Landing