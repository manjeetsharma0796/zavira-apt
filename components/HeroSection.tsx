import GetStartedButton from "./GetStartedButton";

export default function HeroSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 h-auto mt-12 mb-10 pt-6">
      {/* Left side: text content */}
      <div className="col-span-2 bg-gradient-to-br from-[#EEFFC5] to-[#BBD9A2] rounded-3xl p-12 shadow-md relative overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-[#a7c957]/30 to-transparent z-0" />
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-[#2d5016] mb-4 font-mono leading-tight">
            Building Better <br /> Communities Together
          </h1>
          <p className="text-2xl text-[#2d5016] font-mono mb-6">
            Empowering citizens to report community issues and connecting them with contractors
            through blockchain technology. Create positive change while earning crypto rewards.
          </p>
          <GetStartedButton />
        </div>
      </div>

      <div className="overflow-hidden col-span-1">
      </div>
    </section>
  );
}
