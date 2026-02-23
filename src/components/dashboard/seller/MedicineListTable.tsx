"use client";

import React, { useState, useEffect } from "react";
import {
  Edit,
  Trash2,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader2,
  PackageSearch,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSellerMedicines, useDeleteMedicine } from "@/hooks/useMedicine";
import { IMedicine } from "@/types/medicine.type";
import Image from "next/image";
import EditMedicineModal from "./EditMedicineModal";

const MedicineListTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [editingMedicine, setEditingMedicine] = useState<IMedicine | null>(
    null,
  );

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchValue);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const { data, isLoading } = useSellerMedicines({
    searchTerm,
    page,
    limit: 10,
  });

  const { mutate: deleteMedicine } = useDeleteMedicine();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleDelete = (id: string, name: string) => {
    if (
      confirm(
        `Are you sure you want to delete ${name}? This action cannot be undone.`,
      )
    ) {
      deleteMedicine(id);
    }
  };

  const medicines = data?.data || [];
  const meta = data?.meta;


  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl shadow-zinc-200/20 dark:shadow-none">
        <div className="relative w-full md:max-w-md group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name, generic, or company..."
            className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800 rounded-2xl py-3 pl-12 pr-12 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all font-medium"
            value={searchValue}
            onChange={handleSearch}
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-200/50 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-rose-500 transition-all cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mr-2">
            Total Listing:{" "}
            <span className="text-zinc-900 dark:text-zinc-50">
              {meta?.total || 0}
            </span>
          </p>
          <Button
            variant="outline"
            className="rounded-xl h-10 border-zinc-200 dark:border-zinc-800"
          >
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {isLoading && page === 1 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] shadow-xl shadow-zinc-200/20 dark:shadow-none">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl flex items-center justify-center">
            <Loader2 className="animate-spin text-emerald-600" size={32} />
          </div>
          <p className="text-zinc-500 font-bold tracking-tight">
            Loading Inventory...
          </p>
        </div>
      ) : medicines.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center shadow-xl shadow-zinc-200/20 dark:shadow-none">
          <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl flex items-center justify-center mb-6">
            <PackageSearch size={32} className="text-emerald-600" />
          </div>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mb-2">
            No Records Found
          </h2>
          <p className="text-zinc-500 font-medium max-w-xs mx-auto">
            We could not find any medicines matching your search criteria.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-xl shadow-zinc-200/20 dark:shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-50 dark:border-zinc-800">
                  <th className="px-6 py-4 text-xs font-black text-zinc-400 uppercase tracking-widest">
                    Product
                  </th>
                  <th className="px-6 py-4 text-xs font-black text-zinc-400 uppercase tracking-widest">
                    Category
                  </th>
                  <th className="px-6 py-4 text-xs font-black text-zinc-400 uppercase tracking-widest">
                    Price
                  </th>
                  <th className="px-6 py-4 text-xs font-black text-zinc-400 uppercase tracking-widest">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-xs font-black text-zinc-400 uppercase tracking-widest text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
                {medicines.map((medicine) => (
                  <tr
                    key={medicine.id}
                    className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden flex items-center justify-center shrink-0 border border-zinc-200 dark:border-zinc-700">
                          {medicine.photoUrl ? (
                            <Image
                              src={medicine.photoUrl}
                              alt={medicine.name}
                              width={56}
                              height={56}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <ImageIcon className="text-zinc-300" size={24} />
                          )}
                        </div>
                        <div>
                          <p className="font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-none mb-1">
                            {medicine.name}
                          </p>
                          <p className="text-xs font-bold text-zinc-400 tracking-tight italic">
                            {medicine.generic_name || "N/A"}
                          </p>
                          <p className="text-[10px] text-zinc-500 font-medium mt-1">
                            {medicine.company}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] font-black uppercase tracking-wider rounded-lg border border-zinc-200 dark:border-zinc-700">
                        {medicine.category?.categoryName || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-black text-emerald-600 tracking-tight">
                        {medicine.price}{" "}
                        <span className="text-[10px] ml-0.5">TK</span>
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span>{medicine.quantity}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingMedicine(medicine)}
                          className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 border border-blue-100 dark:border-blue-900/30 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(medicine.id, medicine.name)
                          }
                          className="w-9 h-9 flex items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 border border-rose-100 dark:border-rose-900/30 hover:bg-rose-600 hover:text-white transition-all cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {meta && meta.total > meta.limit && (
            <div className="px-8 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/50 flex items-center justify-between">
              <p className="text-xs font-bold text-zinc-400">
                Showing {medicines.length} of {meta.total} products
              </p>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-lg h-8 border-zinc-200 dark:border-zinc-800"
                >
                  <ChevronLeft size={16} />
                </Button>
                <div className="flex items-center gap-1 px-2">
                  <span className="text-xs font-black text-zinc-900 dark:text-zinc-50">
                    {page}
                  </span>
                  <span className="text-[10px] font-bold text-zinc-400">
                    / {Math.ceil(meta.total / meta.limit)}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= Math.ceil(meta.total / meta.limit)}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-lg h-8 border-zinc-200 dark:border-zinc-800"
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {editingMedicine && (
        <EditMedicineModal
          key={editingMedicine.id}
          medicine={editingMedicine}
          isOpen={!!editingMedicine}
          onClose={() => setEditingMedicine(null)}
        />
      )}
    </div>
  );
};

export default MedicineListTable;
