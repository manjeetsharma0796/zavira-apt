// components/WelcomeSection.js
export default function WelcomeSection() {
  return (
    <div className="bg-[#F8FDF4] rounded-lg p-6 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold font-mono text-[2D5016] mb-2">
            Welcome back, Contractor
          </h2>
          <p className="text-[#2D5016] font-mono flex items-center">
            <span className="mr-2 ">📍</span>
            Newtown, Kolkata 700034
          </p>
        </div>
        
        <div className="flex space-x-4 mt-4 md:mt-0">
          <div className="bg-[#6A994E] text-white font-mono px-4 py-2 rounded-lg text-center">
            <div className="font-bold text-lg">23</div>
            <div className="text-sm">Contracts Completed</div>
          </div>
          <div className="bg-[#6A994E] text-white px-4 py-2 rounded-lg text-center">
            <div className="font-bold text-lg">03</div>
            <div className="text-sm">Active Contracts</div>
          </div>
          <div className="bg-[#6A994E] text-white px-4 py-2 rounded-lg text-center">
            <div className="font-bold text-lg">4.9</div>
            <div className="text-sm">Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}