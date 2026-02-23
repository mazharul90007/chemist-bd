"use client";

import React, { useState } from "react";
import { Layers, Plus, Search, RefreshCw, X, LayoutGrid, Info, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAllCategories, useCreateCategory } from "@/hooks/useCategory";
import { cn } from "@/lib/utils";

const AdminCategoriesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        categoryName: "",
        categoryDetails: "",
        categoryStatus: "ACTIVE"
    });

    const { data: categoriesData, isLoading, refetch } = useAllCategories();
    const { mutate: createCategory, isPending: isCreating } = useCreateCategory();

    const categories = categoriesData?.data || [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createCategory(formData, {
            onSuccess: () => {
                setIsModalOpen(false);
                setFormData({ categoryName: "", categoryDetails: "", categoryStatus: "ACTIVE" });
            }
        });
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
                        Manage <span className="text-emerald-600">Categories</span>
                    </h1>
                    <p className="text-zinc-500 font-medium">
                        Define and organize medicine categories for the platform.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="h-14 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-200/50 transition-all hover:scale-[1.02] cursor-pointer"
                    >
                        <Plus size={20} className="mr-2" />
                        New Category
                    </Button>
                    <Button
                        onClick={() => refetch()}
                        className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 flex items-center justify-center transition-all hover:rotate-180 duration-500 shadow-sm cursor-pointer"
                    >
                        <RefreshCw size={20} />
                    </Button>
                </div>
            </div>

            {/* Content Section */}
            {isLoading ? (
                <div className="min-h-[400px] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[3.5rem] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <RefreshCw className="animate-spin text-emerald-600" size={32} />
                        <p className="text-zinc-500 font-black text-[10px] uppercase tracking-widest animate-pulse">Scanning categories...</p>
                    </div>
                </div>
            ) : categories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <div key={category.id} className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] p-8 group hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 transition-colors duration-500">
                                    <Layers size={24} className="text-zinc-400 group-hover:text-white transition-colors" />
                                </div>
                                <div className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                                    {category.categoryStatus || "ACTIVE"}
                                </div>
                            </div>
                            <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight mb-2 uppercase">
                                {category.categoryName}
                            </h3>
                            <p className="text-zinc-500 text-sm font-medium leading-relaxed line-clamp-2">
                                {category.categoryDetails || "No details provided for this category."}
                            </p>
                            <div className="mt-8 pt-6 border-t border-zinc-50 dark:border-zinc-800/50 flex justify-between items-center">
                                <div className="flex items-center gap-1.5 text-[10px] font-black text-zinc-400 uppercase tracking-[0.15em]">
                                    <LayoutGrid size={12} />
                                    Medicines
                                </div>
                                <Button variant="ghost" className="h-8 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-50">
                                    Edit
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[3.5rem] p-20 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-zinc-50 dark:bg-zinc-800 rounded-[2rem] flex items-center justify-center mb-8">
                        <Layers size={40} className="text-zinc-200" />
                    </div>
                    <h2 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">Expand the Catalog</h2>
                    <p className="text-zinc-500 font-medium max-w-sm mx-auto mb-10 leading-relaxed">
                        Start by creating your first category to help users find their medicines more efficiently.
                    </p>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="h-14 px-10 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-widest"
                    >
                        Create Your First Category
                    </Button>
                </div>
            )}

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
                    <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white">
                                        <Plus size={24} />
                                    </div>
                                    <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">Create Category</h2>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Category Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.categoryName}
                                        onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                                        placeholder="e.g., Antibiotics"
                                        className="w-full h-14 px-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-50 dark:border-zinc-700/50 focus:outline-none focus:border-emerald-500 transition-all font-bold text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Details</label>
                                    <textarea
                                        rows={4}
                                        value={formData.categoryDetails}
                                        onChange={(e) => setFormData({ ...formData, categoryDetails: e.target.value })}
                                        placeholder="Brief description of this category..."
                                        className="w-full p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-50 dark:border-zinc-700/50 focus:outline-none focus:border-emerald-500 transition-all font-bold text-sm resize-none"
                                    />
                                </div>
                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        disabled={isCreating}
                                        className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-200/50 transition-all"
                                    >
                                        {isCreating ? (
                                            <div className="flex items-center gap-2">
                                                <RefreshCw className="animate-spin" size={18} />
                                                Processing...
                                            </div>
                                        ) : "Finalize Category"}
                                    </Button>
                                    <p className="text-center mt-6 text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
                                        <Info size={12} />
                                        System will validate entries automatically
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCategoriesPage;
