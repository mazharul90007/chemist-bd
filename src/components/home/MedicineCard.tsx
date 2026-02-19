"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Eye } from "lucide-react";
import Link from "next/link";

interface MedicineProps {
  id: string;
  name: string;
  price: number;
  category: string;
  photoUrl?: string;
  discount?: number;
  company?: string;
  strength?: string;
  rating?: number;
}

const MedicineCard = ({
  id,
  name,
  price,
  category,
  photoUrl,
  discount,
  company,
  strength,
  rating,
}: MedicineProps) => {
  const discountPrice = discount ? price - (price * discount) / 100 : price;
  const displayRating = rating || 0;

  return (
    <div className="group bg-white dark:bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-900 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(16,185,129,0.15)] flex flex-col h-full">
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-50 dark:bg-zinc-900">
        {discount && (
          <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-lg uppercase tracking-wider shadow-xl shadow-red-500/20">
            {discount}% OFF
          </div>
        )}
        <Image
          src={photoUrl || "/assets/images/noImg.jpg"}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex justify-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="rounded-xl h-9 bg-white dark:bg-emerald-600 text-zinc-900 dark:text-white border-none shadow-2xl hover:bg-emerald-500 dark:hover:bg-emerald-500 transition-all duration-300 font-black text-[10px] uppercase tracking-widest px-4"
          >
            View Details
          </Button>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[8px] font-black uppercase tracking-[0.15em] text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">
            {category}
          </span>
          {company && (
            <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-600 truncate max-w-[70px] uppercase tracking-tight">
              {company}
            </span>
          )}
        </div>

        <Link href={`/medicine/${id}`} className="block mb-2">
          <h3 className="font-black text-zinc-900 dark:text-zinc-50 group-hover:text-emerald-600 transition-colors line-clamp-2 text-sm leading-tight tracking-tight">
            {name}{" "}
            {strength && (
              <span className="text-[10px] font-normal text-zinc-400 dark:text-zinc-500 lowercase">
                - {strength}
              </span>
            )}{" "}
          </h3>
        </Link>

        <div className="mt-auto pt-4 border-t border-zinc-50 dark:border-zinc-900/50">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">${discountPrice.toFixed(2)}</span>
              {discount && (
                <span className="text-[10px] text-zinc-400 line-through -mt-1 font-bold">
                  ${price.toFixed(2)}
                </span>
              )}
            </div>
            <Button
              size="icon"
              className="rounded-2xl w-10 h-10 bg-zinc-900 dark:bg-emerald-600/10 dark:text-emerald-500 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-all duration-300 group/btn"
            >
              <ShoppingCart size={18} className="transition-transform group-hover/btn:scale-110" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
