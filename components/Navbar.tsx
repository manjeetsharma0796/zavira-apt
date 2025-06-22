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

  const donateInititate = async () => {
    if (!client) {
      return;
    }

    try {
      const committedTransaction = await client.useABI(ZAVIRA_ABI).transfer({
        type_arguments: [],
        arguments: [address, 5000000000],
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


  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[1000px] bg-[#EEFFC5] rounded-3xl px-6 py-4 mt-2 shadow-md flex justify-between items-center z-50">
      <div className=""><Logo /></div>
      <ul className="hidden md:flex gap-8 text-[#6A994E] font-mono">
        <li><Link href="/">Home</Link></li>
        <li><Link href="#about">About Chain</Link></li>
        <li><Link href="#features">Features</Link></li>
        <li><Link href="#operte">How it works</Link></li>
      </ul>
      <WalletSelector />

      <UserButton />
    </nav>
  );
}

