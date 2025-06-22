// components/ContractSearchBox.tsx
export function ContractSearchBox() {
  return (
    <div className="flex items-center gap-2 bg-[#2D5016] rounded-lg px-3 py-2 shadow-sm">
      <input
        type="text"
        placeholder="Select By Location or Issue Type..."
        className="flex-1 font-mono text-sm text-[#2d5016] placeholder-[#7fa56f] outline-none"
      />
      <button className="bg-[#2D5016] text-white font-mono text-sm px-4 py-1 rounded-md">Search</button>
    </div>
  );
}
