"use client";

import React, { useState } from "react";
import {
  Package,
  Tag,
  Building2,
  DollarSign,
  Box,
  Stethoscope,
  ShieldAlert,
  FileText,
  Image as ImageIcon,
  Loader2,
  PlusCircle,
  Pill,
  AlignLeft,
  Flame,
  Activity,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAddMedicine, useCategories } from "@/hooks/useMedicine";
import { IMedicineCreate } from "@/types/medicine.type";
import { cn } from "@/lib/utils";

const AddMedicineForm = () => {
  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();
  const { mutate: addMedicine, isPending } = useAddMedicine();

  const [formData, setFormData] = useState<IMedicineCreate>({
    name: "",
    generic_name: "",
    strength: "",
    company: "",
    photoUrl: "",
    quantity: 0,
    price: 0,
    Indications: "",
    Pharmacology: "",
    type: "TABLET",
    categoryId: "",
    dosage: "",
    side_effects: "",
    warnings: "",
  });

  const categories = categoriesData?.data || [];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMedicine(formData);
  };

  const inputClasses =
    "w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800 rounded-2xl py-4 px-12 text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 outline-none transition-all placeholder:text-zinc-400 font-medium";
  const labelClasses =
    "text-xs font-black text-zinc-400 uppercase tracking-widest ml-1 mb-2 block";
  const iconClasses =
    "absolute top-1/2 -translate-y-1/2 left-4 text-zinc-400 group-focus-within:text-emerald-500 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-12 pb-20">
      {/* Basic Inventory Section */}
      <section className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-10 border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/20 dark:shadow-none">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center">
            <Package className="text-blue-600" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
              Basic Information
            </h3>
            <p className="text-sm font-medium text-zinc-500">
              Essential details for your product listing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className={labelClasses}>Medicine Name *</label>
            <div className="relative group">
              <Pill className={iconClasses} size={18} />
              <input
                name="name"
                required
                className={inputClasses}
                placeholder="e.g. Napa Extra"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClasses}>Generic Name</label>
            <div className="relative group">
              <Activity className={iconClasses} size={18} />
              <input
                name="generic_name"
                className={inputClasses}
                placeholder="e.g. Paracetamol + Caffeine"
                value={formData.generic_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClasses}>Company *</label>
            <div className="relative group">
              <Building2 className={iconClasses} size={18} />
              <input
                name="company"
                required
                className={inputClasses}
                placeholder="e.g. Beximco Pharma"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClasses}>Strength</label>
            <div className="relative group">
              <Zap className={iconClasses} size={18} />
              <input
                name="strength"
                className={inputClasses}
                placeholder="e.g. 500mg"
                value={formData.strength}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClasses}>Category *</label>
            <div className="relative group">
              <Tag className={iconClasses} size={18} />
              <select
                name="categoryId"
                required
                className={cn(inputClasses, "appearance-none cursor-pointer")}
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClasses}>Medicine Type *</label>
            <div className="relative group">
              <AlignLeft className={iconClasses} size={18} />
              <select
                name="type"
                required
                className={cn(inputClasses, "appearance-none cursor-pointer")}
                value={formData.type}
                onChange={handleChange}
              >
                <option value="TABLET">Tablet</option>
                <option value="CAPSULE">Capsule</option>
                <option value="SYRUP">Syrup</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Inventory Section */}
      <section className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-10 border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/20 dark:shadow-none">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center">
            <DollarSign className="text-emerald-600" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
              Pricing & Stock
            </h3>
            <p className="text-sm font-medium text-zinc-500">
              Set your price and inventory levels.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className={labelClasses}>Price (TK) *</label>
            <div className="relative group">
              <DollarSign className={iconClasses} size={18} />
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                className={inputClasses}
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClasses}>Quantity in this Price *</label>
            <div className="relative group">
              <Box className={iconClasses} size={18} />
              <input
                type="number"
                name="quantity"
                required
                min="0"
                className={inputClasses}
                placeholder="0"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className={labelClasses}>Photo URL</label>
            <div className="relative group">
              <ImageIcon className={iconClasses} size={18} />
              <input
                name="photoUrl"
                className={inputClasses}
                placeholder="https://example.com/image.jpg"
                value={formData.photoUrl}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Medical Information Section */}
      <section className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-10 border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/20 dark:shadow-none">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center">
            <Stethoscope className="text-purple-600" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
              Medical Details
            </h3>
            <p className="text-sm font-medium text-zinc-500">
              Detailed medical information for customers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-2">
            <label className={labelClasses}>Indications</label>
            <div className="relative group">
              <Flame
                className={cn(iconClasses, "top-6 translate-y-0")}
                size={18}
              />
              <textarea
                name="Indications"
                className={cn(inputClasses, "h-32 pt-5 resize-none")}
                placeholder="What is this medicine used for?"
                value={formData.Indications}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClasses}>Pharmacology</label>
            <div className="relative group">
              <Activity
                className={cn(iconClasses, "top-6 translate-y-0")}
                size={18}
              />
              <textarea
                name="Pharmacology"
                className={cn(inputClasses, "h-32 pt-5 resize-none")}
                placeholder="How does this medicine work?"
                value={formData.Pharmacology}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className={labelClasses}>Dosage</label>
              <div className="relative group">
                <FileText className={iconClasses} size={18} />
                <input
                  name="dosage"
                  className={inputClasses}
                  placeholder="e.g. 1 tablet twice daily"
                  value={formData.dosage}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className={labelClasses}>Side Effects</label>
              <div className="relative group">
                <ShieldAlert className={iconClasses} size={18} />
                <input
                  name="side_effects"
                  className={inputClasses}
                  placeholder="e.g. Dizziness, Nausea"
                  value={formData.side_effects}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClasses}>Warnings</label>
            <div className="relative group text-rose-500">
              <ShieldAlert
                className={cn(iconClasses, "top-6 translate-y-0")}
                size={18}
              />
              <textarea
                name="warnings"
                className={cn(
                  inputClasses,
                  "h-24 pt-5 resize-none border-rose-100 dark:border-rose-900/30 focus:border-rose-500/50 focus:ring-rose-500/20",
                )}
                placeholder="Crucial safety warnings..."
                value={formData.warnings}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Submit Button */}
      <div className="flex items-center justify-end max-w-4xl mx-auto px-4">
        <Button
          type="submit"
          disabled={isPending}
          className="h-16 px-12 rounded-[2rem] bg-zinc-900 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-black text-lg transition-all active:scale-95 shadow-2xl shadow-emerald-500/20 group relative overflow-hidden disabled:opacity-70 cursor-pointer"
        >
          {isPending ? (
            <div className="flex items-center gap-3">
              <Loader2 className="animate-spin" size={24} />
              <span>Creating Medicine...</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <PlusCircle size={24} />
              <span>List Medicine</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddMedicineForm;
