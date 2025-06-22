export default function VisionMission() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 h-auto md:h-[400px]">
      {/* Vision */}
      <div className="bg-gradient-to-br from-[#EEFFC5] to-[#7FB069] text-white rounded-3xl p-10 shadow-md flex flex-col justify-start">
        <h3 className="font-mono text-3xl font-bold mb-4 text-[#2D5016] text-center">Our Vision</h3>
        <p className="font-mono text-2xl text-[#2D5016] overflow-y-auto text-center">
          To create self-sustaining communities where every citizen is empowered to identify and solve local problems through decentralized collaboration, ultimately building a world where community issues are addressed swiftly and transparently.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-gradient-to-br from-[#EEFFC5] to-[#7FB069] text-white rounded-3xl p-10 shadow-md flex flex-col justify-start">
        <h3 className="font-mono text-3xl font-bold mb-4 text-[#2D5016] text-center">Our Mission</h3>
        <p className="font-mono text-2xl text-[#2D5016] overflow-y-auto text-center">
          Democratize community problem-solving by providing a blockchain-powered platform that connects citizens, contractors, and validators, ensuring every reported issue gets the attention it deserves while rewarding positive community action.
        </p>
      </div>
    </section>
  );
}
