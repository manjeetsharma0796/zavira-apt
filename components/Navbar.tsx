"use client";

import { UserButton } from "@civic/auth/react";
import Logo from "./Logo";
import Link from "next/link";
import { WalletSelector } from "@/components/ui/WalletSelector";
import { aptosClient } from "@/app/utils/aptosClient"
import { ZAVIRA_ABI } from "@/app/utils/zavira"
import { toast } from "../components/ui/use-toast"
import { useWalletClient } from "@thalalabs/surf/hooks";
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { useState, useEffect } from "react"


export default function Navbar() {
  const { account, connected, disconnect, wallet } = useWallet();
  // Uncomment and use the wallet client hook to get the client instance
  const { client } = useWalletClient();
  const address = "0x5a5d125b5d1c3b57cc8b0901196139bff53c53d7d27dc8c27edea4190fa7f381";

  const mintInititate = async () => {
    if (!client) {
      return;
    }

    try {
      const committedTransaction = await client.useABI(ZAVIRA_ABI).mint({
        type_arguments: [],
        arguments: [account?.address.toString(), 10000000000],
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

  // Track last claim time in localStorage
  const handleDailyClaim = async () => {
    const lastClaim = localStorage.getItem("zavira_last_daily_claim");
    const now = Date.now();
    if (lastClaim && now - parseInt(lastClaim, 10) < 24 * 60 * 60 * 1000) {
      // toast({
      //   title: "Daily Claim",
      //   description: "You can only claim once every 24 hours.",
      // });
      alert("You can only claim once every 24 hours.");
      return;
    }
    await mintInititate();
    localStorage.setItem("zavira_last_daily_claim", now.toString());
  };


  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[1000px] bg-[#EEFFC5] rounded-3xl px-6 py-4 mt-2 shadow-md flex justify-between items-center z-50">
      <div className=""><Logo /></div>
      <ul className="hidden md:flex gap-4 text-[#6A994E] font-mono">
        <li><Link className="border-b-2 border-transparent hover:border-[#6A994E] transition" href="/">Home</Link></li>
        <li><Link className="border-b-2 border-transparent hover:border-[#6A994E] transition" href="#about">About Chain</Link></li>
        <li><Link className="border-b-2 border-transparent hover:border-[#6A994E] transition" href="#features">Features</Link></li>
        <li><Link className="border-b-2 border-transparent hover:border-[#6A994E] transition" href="#operte">How it works</Link></li>
        <li>
          <button
            className="border-b-2 border-transparent hover:border-[#6A994E] transition focus:outline-none bg-transparent text-inherit font-inherit cursor-pointer"
            onClick={handleDailyClaim}
            type="button"
          >
            Daily Claim
          </button>
        </li>
      </ul>
      <WalletSelector />

      <UserButton />
    </nav>
  );
}

