export default function ActiveContracts() {
  const activeContracts = [
    {
      id: 1,
      location: 'City Centre, Newtown, Kolkata, West Bengal',
      status: 'In Progress',
      image: '/icons/lampost.jpg'
    },
    {
      id: 2,
      location: 'Newtown, Action Area II, Kolkata West Bengal',
      status: 'In Progress',
      image: '/icons/pthole.jpg'
    }
  ];

  return (
    <div className="bg-[#F8FDF4] rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-bold text-[#2D5016] mb-6 flex items-center font-mono">
        📋 Active Contracts
      </h3>

      <div className="space-y-4">
        {activeContracts.map((contract) => (
          <div key={contract.id} className="border rounded-lg overflow-hidden">
            <div className="relative h-32 bg-[#EEFFC5]">
              <img
                src={contract.image}
                alt="Active contract"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <p className="text-sm text-gray-700 mb-2">{contract.location}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  24 Oct Started
                </span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  {contract.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
