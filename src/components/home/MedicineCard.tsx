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
  photoUrl?: string; // Changed from image
  discount?: number;
  company?: string;
  strength?: string;
  rating?: number; // Added rating
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
  rating, // Destructured rating
}: MedicineProps) => {
  const discountPrice = discount ? price - (price * discount) / 100 : price;
  const displayRating = rating || 0; // Fallback to 0 if null

  return (
    <div className="group bg-white dark:bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:border-emerald-200 transition-all hover:shadow-2xl">
      <div className="relative aspect-square overflow-hidden bg-zinc-50 dark:bg-zinc-900">
        {discount && (
          <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
            {discount}% OFF
          </div>
        )}
        <Image
          src={photoUrl || "/assets/images/noImg.jpg"}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white/90 backdrop-blur shadow-lg hover:bg-white scale-90 group-hover:scale-100 transition-all duration-300"
          >
            <Eye size={18} className="text-zinc-900" />
          </Button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
            {category}
          </span>
          {company && (
            <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 truncate max-w-100px">
              {company}
            </span>
          )}
        </div>

        <Link href={`/medicine/${id}`}>
          <h3 className="font-bold text-zinc-900 dark:text-zinc-50 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
            {name}{" "}
            {strength && (
              <span className="text-xs font-normal text-zinc-400">
                ({strength})
              </span>
            )}{" "}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={12}
              className={`${s <= displayRating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-zinc-300 dark:text-zinc-700"
                }`}
            />
          ))}
          <span className="text-[10px] text-zinc-400 font-medium ml-1">
            ({displayRating.toFixed(1)})
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50">
              ${discountPrice.toFixed(2)}
            </span>
            {discount && (
              <span className="text-xs text-zinc-400 line-through ml-2">
                ${price.toFixed(2)}
              </span>
            )}
          </div>
          <Button
            size="icon"
            className="rounded-xl bg-zinc-900 hover:bg-emerald-600 dark:bg-zinc-800 dark:hover:bg-emerald-600 text-white transition-all shadow-lg hover:shadow-emerald-500/20"
          >
            <ShoppingCart size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
