export default function HowWeOperate() {
  const steps = [
    {
      title: 'Issue Reporting & AI Verification',
      description:
        'Citizens upload issue photos. AI analyzes authenticity and posts verified problems.',
    },
    {
      title: 'Contractor Discovery & Commitment',
      description:
        'Contractors find nearby tasks and stake tokens to ensure accountability.',
    },
    {
      title: 'Work Completion & Documentation',
      description:
        'Contractors fix issues and upload before/after photos as completion proof.',
    },
    {
      title: 'DAO Validation & Reward Distribution',
      description:
        'DAO validates completed work and distributes crypto rewards to contractors.',
    },
  ];

  return (
    <section id="operate" className=" p-12 rounded-3xl shadow-2xs mb-10">
      <h2 className="font-mono text-4xl font-bold text-[#2D5016] mb-12">How We Operate</h2>
      <div className="flex flex-col gap-8 relative">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative flex items-center gap-6 bg-gradient-to-r from-[#EEFFC5] to-[#DDF9B2] rounded-full px-8 py-6 shadow-md"
          >
            {/* Number circle */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#A5D86E] to-[#7FB069] text-[#2D5016] font-mono text-3xl font-bold shadow-inner">
              {index + 1}
            </div>

            {/* Text content */}
            <div className="text-left">
              <h3 className="font-mono text-xl font-bold text-[#2D5016]">{step.title}</h3>
              <p className="font-mono text-md text-[#2D5016]">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
