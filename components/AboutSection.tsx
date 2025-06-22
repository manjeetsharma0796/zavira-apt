import ViewDocsButton from './ViewDocsButton';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="h-auto snap-start bg-[#FBFFF0] rounded-3xl p-12 shadow-md mb-10"
    >
      <h2 className="font-mono text-4xl font-bold mb-6 text-[#2D5016]">About Zavira Chain</h2>
      <p className="font-mono text-2xl text-[#2D5016] max-w-4xl leading-relaxed">
        Zavira is a revolutionary Web3 community platform that bridges the gap between citizens,
        contractors, and governance. Using blockchain technology and AI verification, we create a
        transparent ecosystem where community issues are reported, verified, and resolved
        efficiently while rewarding responsible participation.
      </p>
      <ViewDocsButton />
    </section>
  );
}
