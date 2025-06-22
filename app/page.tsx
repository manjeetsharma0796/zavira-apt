import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import VisionMission from "../components/VisionMission";
import Features from "../components/Features";
import StartNow from "../components/StartNow";
import HowWeOperate from "../components/HowWeOperate";
import Footer from "../components/Footer";
export default function Home() {
  return (
    <div className="bg-[linear-gradient(to_bottom,_#EEFFC5,_#D4F1A4,_#7FB069,_#4A7C59)] text-[#2d5016] font-sans mt-20 rounded-3xl">
      <div className="max-w-[1400px] mx-auto px-5 py-4 overflow-y-scroll hide-scrollbar">
        <HeroSection />
        <AboutSection />
        <VisionMission />
        <Features />
        <StartNow />
        <HowWeOperate />
        <Footer />
      </div>
    </div>
  );
}

