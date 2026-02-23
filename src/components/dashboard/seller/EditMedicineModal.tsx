"use client";

import React, { useState, useEffect } from "react";
import {
    X,
    Loader2,
    Save,
    Pill,
    Activity,
    Building2,
    Zap,
    Tag,
    AlignLeft,
    DollarSign,
    Box,
    Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCategories, useUpdateMedicine } from "@/hooks/useMedicine";
import { IMedicine, IMedicineCreate } from "@/types/medicine.type";
import { cn } from "@/lib/utils";

interface EditMedicineModalProps {
    medicine: IMedicine;
    isOpen: boolean;
    onClose: () => void;
}

const EditMedicineModal = ({ medicine, isOpen, onClose }: EditMedicineModalProps) => {
    const { data: categoriesData } = useCategories();
    const { mutate: updateMedicine, isPending } = useUpdateMedicine();

    const [formData, setFormData] = useState<Partial<IMedicineCreate>>({
        name: medicine.name ?? "",
        generic_name: medicine.generic_name ?? "",
        strength: medicine.strength ?? "",
        company: medicine.company ?? "",
        photoUrl: medicine.photoUrl ?? "",
        quantity: medicine.quantity ?? 0,
        price: medicine.price ?? 0,
        type: medicine.type ?? "TABLET",
        categoryId: medicine.categoryId ?? "",
        dosage: medicine.dosage ?? "",
        side_effects: medicine.side_effects ?? "",
        warnings: medicine.warnings ?? "",
        Indications: medicine.Indications ?? "",
        Pharmacology: medicine.Pharmacology ?? "",
    });


    if (!isOpen) return null;

    const categories = categoriesData?.data || [];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name as keyof IMedicineCreate]: name === "price" || name === "quantity" ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateMedicine({ id: medicine.id, data: formData }, {
            onSuccess: () => onClose()
        });
    };

    const inputClasses = "w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800 rounded-xl py-3 px-10 text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 outline-none transition-all placeholder:text-zinc-400 font-medium";
    const labelClasses = "text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1 mb-1 block";
    const iconClasses = "absolute top-1/2 -translate-y-1/2 left-3.5 text-zinc-400 group-focus-within:text-emerald-500 transition-colors";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl border border-zinc-100 dark:border-zinc-800 animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
                <div className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-8 py-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">Edit <span className="text-emerald-600">Medicine</span></h2>
                        <p className="text-sm font-medium text-zinc-500">Update details for {medicine.name}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-rose-500 hover:border-rose-200 transition-all cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className={labelClasses}>Medicine Name *</label>
                            <div className="relative group">
                                <Pill className={iconClasses} size={16} />
                                <input
                                    name="name"
                                    required
                                    className={inputClasses}
                                    value={formData.name ?? ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className={labelClasses}>Generic Name</label>
                            <div className="relative group">
                                <Activity className={iconClasses} size={16} />
                                <input
                                    name="generic_name"
                                    className={inputClasses}
                                    value={formData.generic_name ?? ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className={labelClasses}>Company *</label>
                            <div className="relative group">
                                <Building2 className={iconClasses} size={16} />
                                <input
                                    name="company"
                                    required
                                    className={inputClasses}
                                    value={formData.company ?? ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className={labelClasses}>Strength</label>
                            <div className="relative group">
                                <Zap className={iconClasses} size={16} />
                                <input
                                    name="strength"
                                    className={inputClasses}
                                    value={formData.strength ?? ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className={labelClasses}>Category *</label>
                            <div className="relative group">
                                <Tag className={iconClasses} size={16} />
                                <select
                                    name="categoryId"
                                    required
                                    className={cn(inputClasses, "appearance-none cursor-pointer")}
                                    value={formData.categoryId ?? ""}
                                    onChange={handleChange}
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.categoryName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className={labelClasses}>Medicine Type *</label>
                            <div className="relative group">
                                <AlignLeft className={iconClasses} size={16} />
                                <select
                                    name="type"
                                    required
                                    className={cn(inputClasses, "appearance-none cursor-pointer")}
                                    value={formData.type ?? "TABLET"}
                                    onChange={handleChange}
                                >
                                    <option value="TABLET">Tablet</option>
                                    <option value="CAPSULE">Capsule</option>
                                    <option value="SYRUP">Syrup</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className={labelClasses}>Price (TK) *</label>
                            <div className="relative group">
                                <DollarSign className={iconClasses} size={16} />
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    min="0"
                                    step="0.01"
                                    className={inputClasses}
                                    value={formData.price ?? 0}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className={labelClasses}>Quantity *</label>
                            <div className="relative group">
                                <Box className={iconClasses} size={16} />
                                <input
                                    type="number"
                                    name="quantity"
                                    required
                                    min="0"
                                    className={inputClasses}
                                    value={formData.quantity ?? 0}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-1">
                            <label className={labelClasses}>Photo URL</label>
                            <div className="relative group">
                                <ImageIcon className={iconClasses} size={16} />
                                <input
                                    name="photoUrl"
                                    className={inputClasses}
                                    value={formData.photoUrl ?? ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-1">
                            <label className={labelClasses}>Dosage</label>
                            <textarea
                                name="dosage"
                                className={cn(inputClasses, "h-24 py-3 px-4")}
                                value={formData.dosage ?? ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="md:col-span-2 space-y-1">
                            <label className={labelClasses}>Side Effects</label>
                            <textarea
                                name="side_effects"
                                className={cn(inputClasses, "h-24 py-3 px-4")}
                                value={formData.side_effects ?? ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="md:col-span-2 space-y-1">
                            <label className={labelClasses}>Warnings</label>
                            <textarea
                                name="warnings"
                                className={cn(inputClasses, "h-24 py-3 px-4")}
                                value={formData.warnings ?? ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="md:col-span-2 space-y-1">
                            <label className={labelClasses}>Indications</label>
                            <textarea
                                name="Indications"
                                className={cn(inputClasses, "h-24 py-3 px-4")}
                                value={formData.Indications ?? ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="md:col-span-2 space-y-1">
                            <label className={labelClasses}>Pharmacology</label>
                            <textarea
                                name="Pharmacology"
                                className={cn(inputClasses, "h-24 py-3 px-4")}
                                value={formData.Pharmacology ?? ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4 pb-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="h-12 px-8 rounded-xl border-zinc-200 dark:border-zinc-800 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="h-12 px-10 rounded-xl bg-zinc-900 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold transition-all disabled:opacity-70 cursor-pointer shadow-lg shadow-emerald-500/20"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={18} />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2" size={18} />
                                    Update Medicine
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditMedicineModal;
