"use client";

import React from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import AddMedicineForm from "@/components/dashboard/seller/AddMedicineForm";

const AddMedicinePage = () => {
    return (
        <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                <div className="space-y-4">
                    <Link
                        href="/dashboard/seller/medicines"
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-emerald-600 font-bold text-sm transition-colors group"
                    >
                        <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center group-hover:border-emerald-500 group-hover:bg-emerald-50 transition-all">
                            <ArrowLeft size={16} />
                        </div>
                        Back to Inventory
                    </Link>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
                                Expand Your <span className="text-emerald-600">Pharmacy</span>
                            </h1>
                            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                                <Sparkles className="text-emerald-600" size={24} />
                            </div>
                        </div>
                        <p className="text-zinc-500 font-medium max-w-lg">
                            Add new medicines to your storefront. Provide accurate details to help customers find what they need.
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="px-4">
                <AddMedicineForm />
            </div>
        </div>
    );
};

export default AddMedicinePage;
