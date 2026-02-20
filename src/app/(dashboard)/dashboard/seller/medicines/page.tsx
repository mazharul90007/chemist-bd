"use client";

import React from "react";
import { Package, Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const SellerMedicinesPage = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
                        Manage <span className="text-emerald-600">Medicines</span>
                    </h1>
                    <p className="text-zinc-500 font-medium">
                        List, update, and monitor your medicine inventory.
                    </p>
                </div>
                <Button className="rounded-2xl h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 cursor-pointer">
                    <Plus size={18} className="mr-2" />
                    Add New Medicine
                </Button>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-3xl flex items-center justify-center mb-6">
                    <Package size={32} className="text-zinc-300" />
                </div>
                <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mb-2">
                    No Medicines Found
                </h2>
                <p className="text-zinc-500 font-medium max-w-xs mx-auto mb-8">
                    You haven't listed any medicines yet. Click the button above to start selling!
                </p>
            </div>
        </div>
    );
};

export default SellerMedicinesPage;
