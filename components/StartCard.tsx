"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function StartCard({ title, text, href, icon }: { title: string; text: string; href: string; icon: string }) {
  return (
    <Link href={href}>
      <div className="bg-white p-8 text-center rounded-3xl shadow-md hover:-translate-y-1 transition-all border-2 border-transparent hover:border-[#7fb069] cursor-pointer">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#d4f1a4] text-3xl mx-auto mb-6">
          <Image src={icon} alt="icon" width={24} height={20} />
        </div>
        <h3 className="text-xl font-bold text-[#2d5016] mb-2 font-mono ">{title}</h3>
        <p className="text-sm text-[#4a7c59] font-mono">{text}</p>
      </div>
    </Link>
  );
}
