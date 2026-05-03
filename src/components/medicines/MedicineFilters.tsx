"use client";

import React from "react";
import { useCategories } from "@/hooks/useMedicine";
import { IMedicineCategory } from "@/types/medicine.type";
import { Button } from "../ui/button";
import { Loader2, SlidersHorizontal, ChevronRight } from "lucide-react";

interface MedicineFiltersProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  minPrice: string;
  maxPrice: string;
  onPriceChange: (min: string, max: string) => void;
  popularOnly: boolean;
  onPopularChange: (popular: boolean) => void;
  onClear: () => void;
  initialCategories?: any;
}

const MedicineFilters = ({
  activeCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onPriceChange,
  popularOnly,
  onPopularChange,
  onClear,
  initialCategories,
}: MedicineFiltersProps) => {
  const { data: categoriesData, isLoading } = useCategories(initialCategories);
  const categories = categoriesData?.data || [];

  return (
    <div className="bg-white dark:bg-zinc-950 p-7 rounded-3xl border border-zinc-100 dark:border-zinc-900 shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-fit">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-500/10 rounded-xl">
            <SlidersHorizontal size={18} className="text-emerald-600" />
          </div>
          <h3 className="font-black text-base text-zinc-900 dark:text-zinc-50 uppercase tracking-tighter">
            Filters
          </h3>
        </div>
        {(activeCategory || minPrice || maxPrice || popularOnly) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-8 px-2 text-[10px] font-black uppercase text-zinc-500 bg-zinc-100 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 gap-1 rounded-lg cursor-pointer"
          >
            Reset
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-10">
        <h4 className="font-extrabold text-[11px] mb-5 text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-1">
          Categories
        </h4>
        {isLoading ? (
          <div className="flex items-center gap-2 text-zinc-400 py-2 px-1">
            <Loader2 className="animate-spin" size={14} />
            <span className="text-[11px] font-medium italic">
              Loading categories...
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => onCategoryChange("")}
              className={`group flex items-center justify-between px-4 py-3 rounded-2xl text-[13px] font-bold transition-all duration-300 cursor-pointer ${
                activeCategory === ""
                  ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 translate-x-1 shadow-xl shadow-zinc-900/10 dark:shadow-white/5"
                  : "bg-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5"
              }`}
            >
              All Collection
              <ChevronRight
                size={14}
                className={`transition-transform duration-300 ${activeCategory === "" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
              />
            </button>
            {categories.map((cat: IMedicineCategory) => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`group flex items-center justify-between px-4 py-3 rounded-2xl text-[13px] font-bold transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-emerald-600 text-white translate-x-1 shadow-xl shadow-emerald-600/10"
                    : "bg-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5"
                }`}
              >
                {cat.categoryName}
                <ChevronRight
                  size={14}
                  className={`transition-transform duration-300 ${activeCategory === cat.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-10">
        <h4 className="font-extrabold text-[11px] mb-5 text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-1">
          Budget Range
        </h4>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-zinc-400">
              $
            </span>
            <input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => onPriceChange(e.target.value, maxPrice)}
              className="w-full h-11 pl-6 pr-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-transparent focus:border-emerald-500/20 text-sm font-bold placeholder:text-zinc-300 focus:outline-none transition-all"
            />
          </div>
          <div className="w-2 h-px bg-zinc-200 dark:bg-zinc-800" />
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-zinc-400">
              $
            </span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => onPriceChange(minPrice, e.target.value)}
              className="w-full h-11 pl-6 pr-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-transparent focus:border-emerald-500/20 text-sm font-bold placeholder:text-zinc-300 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Popular Switch */}
      <div className="pt-8 border-t border-zinc-50 dark:border-zinc-900">
        <button
          onClick={() => onPopularChange(!popularOnly)}
          className={`group w-full flex items-center justify-between p-4 rounded-3xl transition-all duration-500 ${
            popularOnly
              ? "bg-emerald-600/5 dark:bg-emerald-500/5 border border-emerald-500/20"
              : "bg-zinc-50 dark:bg-zinc-900/50 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
          }`}
        >
          <div className="flex flex-col text-left">
            <span
              className={`text-[11px] font-black uppercase tracking-tight transition-colors ${popularOnly ? "text-emerald-600" : "text-zinc-800 dark:text-zinc-200"}`}
            >
              Popular
            </span>
            <span className="text-[9px] text-zinc-400 font-medium whitespace-nowrap">
              Trending Picks
            </span>
          </div>
          <div
            className={`w-10 h-5 rounded-full relative transition-colors duration-500 shrink-0 ${popularOnly ? "bg-emerald-600" : "bg-zinc-200 dark:bg-zinc-800"}`}
          >
            <div
              className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-500 ${popularOnly ? "translate-x-5" : "translate-x-0"}`}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default MedicineFilters;
