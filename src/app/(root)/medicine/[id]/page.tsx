"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Loader2,
  ChevronLeft,
  ShoppingCart,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Store,
  Info,
  AlertCircle,
} from "lucide-react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useMedicineById } from "@/hooks/useMedicine";
import { useAddToCart } from "@/hooks/useCart";
import { Badge } from "@/components/ui/badge";

const MedicineDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data, isLoading, error } = useMedicineById(id as string);
  const { mutate: addToCart, isPending: isAdding } = useAddToCart();

  const medicine = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white dark:bg-zinc-950">
        <Loader2 className="animate-spin text-emerald-600" size={48} />
        <p className="text-zinc-500 font-medium animate-pulse">
          Fetching medicine details...
        </p>
      </div>
    );
  }

  if (error || !medicine) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white dark:bg-zinc-950 px-4">
        <div className="bg-red-50 dark:bg-red-900/10 p-8 rounded-3xl border border-red-100 dark:border-red-900/20 text-center max-w-md">
          <p className="text-red-500 font-bold text-lg mb-2">
            Medicine Not Found
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            We could not find the medicine you are looking for. It might have
            been removed or the link is broken.
          </p>
          <Button
            variant="outline"
            onClick={() => router.push("/medicines")}
            className="rounded-xl font-bold"
          >
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  const discountPrice = medicine.discount
    ? medicine.price - (medicine.price * medicine.discount) / 100
    : medicine.price;

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/medicines"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-emerald-600 transition-colors text-sm font-bold uppercase tracking-wider group"
          >
            <ChevronLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Medicines
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Image Section */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow group">
              {medicine.discount && (
                <div className="absolute top-6 left-6 z-10 bg-red-500 text-white text-xs font-black px-4 py-1.5 rounded-xl uppercase tracking-widest shadow-xl shadow-red-500/20">
                  {medicine.discount}% OFF
                </div>
              )}
              <Image
                src={medicine.photoUrl || "/assets/images/noImg.jpg"}
                alt={medicine.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col items-center text-center gap-2">
                <ShieldCheck className="text-emerald-600" size={24} />
                <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-tight">
                  100% Genuine
                </span>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col items-center text-center gap-2">
                <Truck className="text-blue-600" size={24} />
                <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-tight">
                  Fast Delivery
                </span>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col items-center text-center gap-2">
                <RotateCcw className="text-orange-600" size={24} />
                <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-tight">
                  Easy Returns
                </span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="rounded-lg px-3 py-1 border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/5 text-emerald-600 font-bold uppercase text-[10px] tracking-widest"
                >
                  {medicine.category?.categoryName || "Healthcare"}
                </Badge>
                {medicine.type && (
                  <Badge
                    variant="outline"
                    className="rounded-lg px-3 py-1 border-blue-500/20 bg-blue-50/50 dark:bg-blue-500/5 text-blue-600 font-bold uppercase text-[10px] tracking-widest"
                  >
                    {medicine.type}
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter leading-tight">
                {medicine.name}
              </h1>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < (medicine.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-zinc-200 dark:text-zinc-800"
                      }
                    />
                  ))}
                  <span className="ml-2 text-sm font-bold text-zinc-500">
                    ({medicine.rating || 0}.0)
                  </span>
                </div>
                <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                    Manufacturer:
                  </span>
                  <span className="text-sm font-black text-emerald-600 uppercase tracking-tight">
                    {medicine.company || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-8 mb-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-[5rem]" />

              <div className="flex flex-col gap-6">
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter flex items-center gap-1">
                    <FaBangladeshiTakaSign
                      size={28}
                      className="text-emerald-600"
                    />
                    {discountPrice.toFixed(2)}
                  </span>
                  {medicine.discount && (
                    <span className="text-xl text-zinc-400 line-through font-bold mb-1">
                      Tk {medicine.price.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                    Status:{" "}
                    <span
                      className={
                        medicine.quantity && medicine.quantity > 0
                          ? "text-emerald-600 font-bold"
                          : "text-red-500 font-bold"
                      }
                    >
                      {medicine.quantity && medicine.quantity > 0
                        ? "In Stock"
                        : "Out of Stock"}
                    </span>
                  </p>
                  <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                    Strength:{" "}
                    <span className="text-zinc-900 dark:text-zinc-50 font-bold">
                      {medicine.strength || "N/A"}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <Button
                    onClick={() => addToCart(medicine.id)}
                    disabled={
                      isAdding || !(medicine.quantity && medicine.quantity > 0)
                    }
                    className="flex-1 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg transition-all shadow-xl shadow-zinc-900/10 hover:shadow-emerald-600/20 group cursor-pointer"
                  >
                    {isAdding ? (
                      <Loader2 className="animate-spin mr-2" />
                    ) : (
                      <ShoppingCart
                        size={20}
                        className="mr-2 group-hover:scale-110 transition-transform"
                      />
                    )}
                    Add to Cart
                  </Button>
                  {/* <Button
                    variant="outline"
                    className="flex-1 h-14 rounded-2xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 font-bold text-lg cursor-pointer"
                  >
                    Order Now
                  </Button> */}
                </div>
              </div>
            </div>

            {/* Seller Info */}
            {medicine.seller && (
              <div className="bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6 mb-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0">
                  <Store size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-0.5">
                    Verified Seller
                  </p>
                  <h4 className="font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                    {medicine.seller.name}
                  </h4>
                </div>
              </div>
            )}

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Info size={18} className="text-emerald-600" />
                  <h3 className="font-black text-zinc-900 dark:text-zinc-50 uppercase text-xs tracking-widest">
                    Indications
                  </h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  {medicine.Indications ||
                    "Consult a healthcare professional for specific usage instructions and indications for this product."}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <AlertCircle size={18} className="text-red-500" />
                  <h3 className="font-black text-zinc-900 dark:text-zinc-50 uppercase text-xs tracking-widest">
                    Side Effects
                  </h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  {medicine.side_effects ||
                    "Common side effects may vary. If you experience any unusual symptoms, discontinue use and consult a doctor."}
                </p>
              </div>
              <div className="flex flex-col gap-3 md:col-span-2 mt-4 pt-6 border-t border-zinc-100 dark:border-zinc-900">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-900 text-orange-600 text-[10px] font-bold uppercase tracking-tighter"
                  >
                    Warning
                  </Badge>
                  <h3 className="font-black text-zinc-900 dark:text-zinc-50 uppercase text-xs tracking-widest">
                    Precaution & Warnings
                  </h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  {medicine.warnings ||
                    "Keep out of reach of children. Store in a cool, dry place away from direct sunlight. Do not exceed the recommended dose."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MedicineDetailsPage;
