"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useAllMedicines } from "@/hooks/useMedicine";
import MedicineCard from "@/components/home/MedicineCard";
import MedicineFilters from "@/components/medicines/MedicineFilters";
import MedicineSearch from "@/components/medicines/MedicineSearch";
import {
  Loader2,
  PackageX,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMedicine } from "@/types/medicine.type";

const MedicinesPageContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL State
  const searchTerm = searchParams.get("searchTerm") || "";
  const categoryId = searchParams.get("categoryId") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const popular = searchParams.get("popular") === "true";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 10;

  // Fetching
  const { data, isLoading } = useAllMedicines({
    searchTerm,
    categoryId,
    minPrice,
    maxPrice,
    popular: popular ? "true" : undefined,
    page,
    limit,
  });

  const medicines = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 1;

  // Helpers
  const updateQuery = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    if (!newParams.page) params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950">
      {/* Premium Header */}
      <div className="bg-white dark:bg-zinc-950 py-12 relative overflow-hidden border-b border-zinc-100 dark:border-zinc-900">
        <div className="absolute top-0 right-0 w-125 h-1125 bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-blue-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6">
              <LayoutGrid size={12} />
              The Full Catalog
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-zinc-50 mb-6 tracking-tight">
              Verified <span className="text-emerald-600">Health</span>{" "}
              Solutions
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Browse our collection of pharmaceuticals and healthcare essentials
              from trusted brands worldwide.
            </p>
            <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 p-1 rounded-3xl shadow-2xl shadow-zinc-200/50 dark:shadow-none border border-zinc-200 dark:border-zinc-800">
              <MedicineSearch
                initialValue={searchTerm}
                onSearch={(val) => updateQuery({ searchTerm: val })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Refined Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-28">
            <MedicineFilters
              activeCategory={categoryId}
              onCategoryChange={(id) => updateQuery({ categoryId: id })}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onPriceChange={(min, max) =>
                updateQuery({ minPrice: min, maxPrice: max })
              }
              popularOnly={popular}
              onPopularChange={(val) =>
                updateQuery({ popular: val ? "true" : null })
              }
              onClear={() => router.push(pathname, { scroll: false })}
            />
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-10 px-4 py-4 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Filter size={18} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">
                    Available Products
                  </p>
                  <p className="text-lg font-black text-zinc-900 dark:text-zinc-50">
                    Showing {medicines.length > 0 ? (page - 1) * limit + 1 : 0}{" "}
                    - {Math.min(page * limit, meta?.total || 0)} of{" "}
                    {meta?.total || 0} Results
                  </p>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-40 gap-6">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-600 rounded-full animate-spin" />
                  <Loader2
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-600 animate-pulse"
                    size={24}
                  />
                </div>
                <p className="text-zinc-400 font-black uppercase tracking-widest text-xs animate-pulse">
                  Syncing catalog...
                </p>
              </div>
            ) : medicines.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-40 text-center bg-white dark:bg-zinc-900/40 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <div className="w-24 h-24 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-8 relative">
                  <div className="absolute inset-0 bg-emerald-500/5 rounded-full animate-ping" />
                  <PackageX
                    size={48}
                    className="text-zinc-200 dark:text-zinc-700 relative z-10"
                  />
                </div>
                <h3 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">
                  Empty Results
                </h3>
                <p className="text-zinc-500 max-w-sm mb-12 leading-relaxed">
                  We could not find matches for your current criteria. Broaden
                  your search or reset filters to see more results.
                </p>
                <Button
                  size="lg"
                  className="rounded-2xl font-black px-10 h-14 bg-zinc-900 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-500/20"
                  onClick={() => router.push(pathname, { scroll: false })}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                  {medicines.map((item: IMedicine) => (
                    <MedicineCard
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      category={item.category?.categoryName || "Medicine"}
                      photoUrl={item.photoUrl}
                      discount={item.discount}
                      company={item.company}
                      strength={item.strength}
                      rating={item.rating ?? undefined}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 border-t border-zinc-100 dark:border-zinc-900 mt-8">
                  <div className="flex flex-col">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">
                      Navigation
                    </p>
                    <p className="text-sm font-black text-zinc-900 dark:text-zinc-50">
                      Page {page} of {totalPages}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={page <= 1}
                      onClick={() =>
                        updateQuery({ page: (page - 1).toString() })
                      }
                      className="w-12 h-12 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-zinc-400 hover:text-emerald-600 border border-transparent hover:border-emerald-100 dark:hover:border-emerald-900/30 transition-all cursor-pointer"
                    >
                      <ChevronLeft size={24} />
                    </Button>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() =>
                            updateQuery({ page: (i + 1).toString() })
                          }
                          className={`w-10 h-10 rounded-xl text-sm font-black transition-all duration-300 ${
                            page === i + 1
                              ? "bg-zinc-900 dark:bg-emerald-600 text-white shadow-xl scale-110"
                              : "bg-white dark:bg-zinc-900 text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 border border-zinc-100 dark:border-zinc-800"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={page >= totalPages}
                      onClick={() =>
                        updateQuery({ page: (page + 1).toString() })
                      }
                      className="w-12 h-12 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-zinc-400 hover:text-emerald-600 border border-transparent hover:border-emerald-100 dark:hover:border-emerald-900/30 transition-all cursor-pointer"
                    >
                      <ChevronRight size={24} />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

const MedicinesPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-600 rounded-full animate-spin" />
            <p className="text-zinc-400 font-black uppercase tracking-widest text-[10px]">
              Initializing Catalog...
            </p>
          </div>
        </div>
      }
    >
      <MedicinesPageContent />
    </Suspense>
  );
};

export default MedicinesPage;
