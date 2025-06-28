"use client";
import { useState } from 'react';
import { ZAVIRA_ABI } from "@/app/utils/zavira";
import { useWalletClient } from "@thalalabs/surf/hooks";
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { aptosClient } from "@/app/utils/aptosClient"


export default function AvailableContracts() {
  const [searchTerm, setSearchTerm] = useState('');
  const { account, connected, disconnect, wallet } = useWallet();
  // Uncomment and use the wallet client hook to get the client instance
  const { client } = useWalletClient();
  const address = "0x5a5d125b5d1c3b57cc8b0901196139bff53c53d7d27dc8c27edea4190fa7f381";

  const mintInititate = async (stakeAmount: number) => {
    if (!client) {
      return;
    }

    try {
      const committedTransaction = await client.useABI(ZAVIRA_ABI).transfer({
        type_arguments: [],
        arguments: [address, stakeAmount * 100000000], // Convert ZVR to microZVR
      });
      const executedTransaction = await aptosClient().waitForTransaction({
        transactionHash: committedTransaction.hash,
      });
      // queryClient.invalidateQueries({
      //   queryKey: ["message-content"],
      // });
      toast({
        title: "Success",
        description: `Transaction succeeded, hash: ${executedTransaction.hash}`,
      });
    } catch (error) {
      console.error(error);
    }
  };
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

  // Mock function for taking contract
  const handleTakeContract = (stakeAmount: number) => {
    mintInititate(stakeAmount);
    // alert(`Mock: Taking contract with stake of ${stakeAmount} ZVR`);
  };

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
              <button
                className="w-full bg-[#2D5016] hover:bg-green-600 font-mono text-white py-2 rounded-lg transition-colors"
                onClick={() => handleTakeContract(contract.stake)}
              >
                Take Contract (Stake: {contract.stake} ZVR)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}