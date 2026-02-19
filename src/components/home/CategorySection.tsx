"use client";

import { useCategories } from "@/hooks/useMedicine";
import { IMedicineCategory } from "@/types/medicine.type";
import { Button } from "@/components/ui/button";
import {
  Pill,
  Baby,
  HeartPulse,
  Dna,
  Activity,
  Sparkles,
  Stethoscope,
  ChevronRight,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";

// Icon \u0026 Style mapping for dynamic categories
const categoryConfig: Record<string, { icon: LucideIcon; color: string }> = {
  Prescription: {
    icon: Pill,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  "Baby Care": {
    icon: Baby,
    color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
  },
  "Personal Care": {
    icon: Sparkles,
    color:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  },
  Nutrition: {
    icon: Activity,
    color:
      "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  },
  Devices: {
    icon: HeartPulse,
    color:
      "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  },
  Wellness: {
    icon: Dna,
    color: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
  },
  Default: {
    icon: Stethoscope,
    color:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
};

const CategorySection = () => {
  const { data: categoriesData, isLoading } = useCategories();
  const categories = categoriesData?.data || [];

  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-950/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4">
              <Activity size={12} />
              Specialized Care
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-50 mb-6 tracking-tight">
              Shop by <span className="text-emerald-600">Category</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">
              Discover our wide selection of healthcare products organized by
              specialty to help you find exactly what you need.
            </p>
          </div>
          <Link href="/medicines">
            <Button
              variant="outline"
              className="rounded-2xl font-black border-zinc-200 dark:border-zinc-800 hover:border-emerald-600 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all h-12 px-6"
            >
              Browse All Products
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 h-48 border border-zinc-100 dark:border-zinc-800"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category: IMedicineCategory) => {
              const config =
                categoryConfig[category.categoryName] || categoryConfig.Default;
              const Icon = config.icon;

              return (
                <Link
                  key={category.id}
                  href={`/medicines?categoryId=${category.id}`}
                  className="group flex flex-col items-center p-6 bg-white dark:bg-zinc-900 rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(16,185,129,0.15)] hover:-translate-y-2 border border-zinc-100 dark:border-zinc-800 hover:border-emerald-500/30"
                >
                  <div
                    className={`p-5 rounded-3xl ${config.color} mb-6 group-hover:scale-110 transition-all duration-500 shadow-sm group-hover:shadow-lg`}
                  >
                    <Icon size={32} />
                  </div>
                  <h3 className="font-black text-zinc-900 dark:text-zinc-50 text-center tracking-tight transition-colors group-hover:text-emerald-600 line-clamp-1">
                    {category.categoryName}
                  </h3>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    View Products <ChevronRight size={10} />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
