import { Fira_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CivicAuthProvider } from "@civic/auth/nextjs";

import type { ReactNode } from "react";

import { ReactQueryProvider } from "@/components/ui/ReactQueryProvider";
import { WalletProvider } from "@/components/ui/WalletProvider";
import { Toast } from "@/components/ui/toast";
import { WrongNetworkAlert } from "@/components/ui/WrongNetworkAlert";
import { Toaster } from "@/components/ui/sonner";

const firaMono = Fira_Mono({
  weight: ["400", "500", "700"],
  variable: "--font-fira-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${firaMono.variable} antialiased`}>
        <WalletProvider>
          <ReactQueryProvider>
            <WrongNetworkAlert />
            <Toaster />''
            <CivicAuthProvider>
              <Navbar />
              {children}
            </CivicAuthProvider>
          </ReactQueryProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
