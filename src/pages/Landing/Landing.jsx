import HeroSection from "./HeroSection"
import MissionSection from "./MissionSection"
import FeaturesSection from "./FeaturesSection"
import Footer from "./Footer"

function Landing() {
  return (
    <div className="flex flex-col justify-center items-center py-4 gap-5">
      <HeroSection />
      <MissionSection />
      <FeaturesSection />
      <Footer />
    </div>
  )
}

export default Landing