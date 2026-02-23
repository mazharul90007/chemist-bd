"use client";

import { useCategories } from "@/hooks/useMedicine";
import { IMedicineCategory } from "@/types/medicine.type";
import Link from "next/link";
import LinkableButton from "@/app/shared/LinkableButton";
import { Activity } from "lucide-react";

const CategorySection = () => {
  const { data: categoriesData, isLoading } = useCategories();
  const categories = categoriesData?.data || [];

  return (
    <section className="py-16 bg-zinc-50 dark:bg-zinc-950/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
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
          <LinkableButton title="Browse All Products" link="medicines" />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-white dark:bg-zinc-900 rounded-[2.5rem] p-6 h-48 border border-zinc-100 dark:border-zinc-800"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {categories.map((category: IMedicineCategory) => {
              return (
                <Link
                  key={category.id}
                  href={`/medicines?categoryId=${category.id}`}
                  className="py-2 px-6 bg-emerald-50 dark:bg-zinc-700 rounded-full transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(16,185,129,0.15)] hover:-translate-y-2 border border-zinc-300 dark:border-zinc-800 hover:border-emerald-500/30"
                >
                  <h3 className="font-black text-zinc-900 dark:text-zinc-50 text-center tracking-tight transition-colors group-hover:text-emerald-600 line-clamp-1">
                    {category.categoryName}
                  </h3>
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
