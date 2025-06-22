"use client";
import { useState } from 'react';

export default function AvailableContracts() {
  const [searchTerm, setSearchTerm] = useState('');

  const contracts = [
    {
      id: 1,
      location: 'City Centre, Newtown, Kolkata, West Bengal',
      stake: 50,
      image: '/icons/sustainability.jpg'
    },
    {
      id: 2,
      location: 'Chingrighata, Kolkata, West Bengal',
      stake: 70,
      image: '/icons/xyz.jpg'
    }
  ];
return (
    <div className="bg-[#F8FDF4] rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold font-mono text-gray-800">
          Available Contracts Near You
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-green-600 font-semibold">💰1,100 ZVR</span>
          <span className="text-gray-500">| 0x7A9...3B2</span>
        </div>
      </div>

      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Select By Location or Issue Type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button className="bg-[#2D5016] hover:bg-green-600 text-white px-6 py-2 rounded-r-lg transition-colors font-mono">
          Search
        </button>
      </div>

      <div className="space-y-4">
        {contracts.map((contract) => (
          <div key={contract.id} className="border rounded-lg overflow-hidden">
            <div className="relative h-48 bg-[#EEFFC5]">
              <img
                src={contract.image}
                alt="Contract location"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-gray-700 mb-3">{contract.location}</p>
              <button className="w-full bg-[#2D5016] hover:bg-green-600 font-mono text-white py-2 rounded-lg transition-colors">
                Take Contract (Stake: {contract.stake} ZVR)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}