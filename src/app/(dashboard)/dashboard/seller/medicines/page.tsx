"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MedicineListTable from "@/components/dashboard/seller/MedicineListTable";

const SellerMedicinesPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
            Manage <span className="text-emerald-600">Inventory</span>
          </h1>
          <p className="text-zinc-500 font-medium">
            List, update, and monitor your medicine listings.
          </p>
        </div>
        <Link href={"/dashboard/seller/add-medicine"}>
          <Button className="rounded-2xl h-14 bg-zinc-900 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold px-8 cursor-pointer shadow-xl shadow-emerald-500/20 active:scale-95 transition-all">
            <Plus size={20} className="mr-2" />
            Add New Medicine
          </Button>
        </Link>
      </div>

      <div className="px-4">
        <MedicineListTable />
      </div>
    </div>
  );
};

export default SellerMedicinesPage;
