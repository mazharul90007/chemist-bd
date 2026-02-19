"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

interface MedicineSearchProps {
  initialValue: string;
  onSearch: (value: string) => void;
}

const MedicineSearch = ({ initialValue, onSearch }: MedicineSearchProps) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className="relative group w-full">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-all duration-300">
        <Search size={18} className="group-focus-within:scale-110" />
      </div>
      <input
        type="text"
        placeholder="Find medicine, company or generic formula..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full h-12 pl-12 pr-12 bg-transparent border-none text-lg font-bold text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-300 dark:placeholder:text-zinc-700 focus:outline-none transition-all"
      />
      {value && (
        <button
          onClick={() => setValue("")}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300"
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
};

export default MedicineSearch;
