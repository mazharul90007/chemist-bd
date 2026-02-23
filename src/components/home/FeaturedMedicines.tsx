"use client";

import MedicineCard from "./MedicineCard";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight } from "lucide-react";
import { IMedicine } from "@/types/medicine.type";
import { usePopularMedicines } from "@/hooks/useMedicine";
import Link from "next/link";
import LinkableButton from "@/app/shared/LinkableButton";

const FeaturedMedicines = () => {
  const { data, isLoading, error } = usePopularMedicines();

  const medicines = data?.data || [];

  return (
    <section className="py-20 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
          <div className="max-w-xl text-center md:text-left mx-auto md:mx-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider mb-4">
              Trending Products
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              Featured <span className="text-emerald-600">Medicines</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Check out our most popular and effective healthcare products
              currently in demand.
            </p>
          </div>
          <LinkableButton title="View Shop" link="medicines" />
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-emerald-600" size={40} />
            <p className="text-zinc-500 font-medium italic">
              Loading medicines...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-100 dark:border-red-900/20">
            <p className="text-red-500 font-bold mb-4">
              Oops! Failed to fetch medicines.
            </p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        ) : medicines.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-400 font-medium">
              No medicines found at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {medicines.map((medicine: IMedicine) => (
              <MedicineCard
                key={medicine.id}
                id={medicine.id}
                name={medicine.name}
                price={medicine.price}
                category={medicine.category?.categoryName || "Medicine"}
                photoUrl={medicine.photoUrl}
                discount={medicine.discount}
                company={medicine.company}
                strength={medicine.strength}
                rating={medicine.rating}
              />
            ))}
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <Button className="w-full h-14 rounded-2xl bg-zinc-900 hover:bg-emerald-600 text-white font-bold">
            View All Shop Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMedicines;
