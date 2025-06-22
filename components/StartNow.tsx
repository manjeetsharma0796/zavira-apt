import StartCard from './StartCard';
const cardData = [
  {
    title: 'Upload a picture',
    text: 'Share your waste management needs and let our AI-powered system analyze the best solutions for your specific requirements.',
    href: '/uploadSection',
    icon: '/icons/upload.svg'
  },
  {
    title: 'Become a contractor',
    text: 'Complete our comprehensive sustainability assessment to identify opportunities and create your personalized action plan.',
    href: '/contractor',
    icon: '/icons/contract.svg'
  },
  {
    title: 'Become a Dao Member',
    text: 'Join our community of environmental champions and access exclusive resources, Vote ,earn ,tools, and expert support.',
    href: 'https://discord.gg/4cTQZquY',
    icon: '/icons/ZaviraDao.svg'
  }
];

export default function StartNow() {
  return (
    <section className="mb-10">
      <h2 className="text-3xl font-bold text-[#2d5016] mb-6 font-mono">Start Your Journey</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardData.map((card, index) => (
          <StartCard
            key={index}
            title={card.title}
            text={card.text}
            href={card.href}
            icon={card.icon}
          />
        ))}
      </div>
    </section>
  );
}
