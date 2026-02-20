"use client";

import React from "react";
import {
    X,
    CreditCard,
    Truck,
    Phone,
    MapPin,
    ShoppingBag,
    ArrowRight,
    Loader2,
    Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { ICartItem } from "@/types/cart.type";
import { useCreateOrder } from "@/hooks/useOrder";
import { useRouter } from "next/navigation";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedItems: ICartItem[];
    totalPrice: number;
}

const CheckoutModal = ({
    isOpen,
    onClose,
    selectedItems,
    totalPrice,
}: CheckoutModalProps) => {
    const router = useRouter();
    const { mutate: createOrder, isPending } = useCreateOrder();
    const [formData, setFormData] = React.useState({
        shippingAddress: "",
        contactNumber: "",
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.shippingAddress || !formData.contactNumber) return;

        createOrder(
            {
                cartItemIds: selectedItems.map((item) => item.id),
                shippingAddress: formData.shippingAddress,
                contactNumber: formData.contactNumber,
            },
            {
                onSuccess: () => {
                    onClose();
                    router.push("/dashboard/orders");
                },
            },
        );
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 animate-in zoom-in-95 duration-300">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-bl-[8rem] pointer-events-none" />

                <div className="relative flex flex-col max-h-[90vh]">
                    {/* Header */}
                    <div className="flex items-center justify-between p-8 pb-4">
                        <div>
                            <h2 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
                                Finalize <span className="text-emerald-600">Order</span>
                            </h2>
                            <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm mt-1">
                                Complete your details to place the order
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-2xl h-11 w-11 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                            onClick={onClose}
                        >
                            <X size={24} />
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
                            {/* Summary Section */}
                            <div className="space-y-6">
                                <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-800/50">
                                    <div className="flex items-center gap-2 mb-4">
                                        <ShoppingBag size={18} className="text-emerald-600" />
                                        <h3 className="font-black text-zinc-900 dark:text-zinc-50 uppercase text-[10px] tracking-widest">
                                            Order Summary
                                        </h3>
                                    </div>

                                    <div className="space-y-4 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                        {selectedItems.map((item) => (
                                            <div key={item.id} className="flex justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50 truncate">
                                                        {item.medicine.name}
                                                    </p>
                                                    <p className="text-[10px] text-zinc-500 font-bold">
                                                        Qty: {item.quantity} x Tk {(item.medicine.price ?? 0).toFixed(2)}
                                                    </p>
                                                </div>
                                                <span className="text-sm font-black text-zinc-900 dark:text-zinc-50 shrink-0">
                                                    Tk {((item.medicine.price ?? 0) * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="h-px bg-zinc-200 dark:bg-zinc-700 my-4" />

                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                            Total Amount
                                        </span>
                                        <span className="text-2xl font-black text-emerald-600 tracking-tighter flex items-center gap-0.5">
                                            <FaBangladeshiTakaSign size={18} />
                                            {totalPrice.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-emerald-500/5 dark:bg-emerald-500/10 rounded-2xl p-5 border border-emerald-500/20 flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0">
                                        <CreditCard size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">
                                            Payment Method
                                        </h4>
                                        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                                            Cash on Delivery
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Form Section */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">
                                            <MapPin size={12} className="text-emerald-600" />
                                            Shipping Address
                                        </label>
                                        <textarea
                                            required
                                            className="w-full min-h-[100px] bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                                            placeholder="Enter your full street address, apartment, etc."
                                            value={formData.shippingAddress}
                                            onChange={(e) =>
                                                setFormData({ ...formData, shippingAddress: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">
                                            <Phone size={12} className="text-emerald-600" />
                                            Contact Number
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full h-12 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                            placeholder="+880 1XXXXXXXXX"
                                            value={formData.contactNumber}
                                            onChange={(e) =>
                                                setFormData({ ...formData, contactNumber: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="bg-blue-500/5 rounded-2xl p-4 border border-blue-500/10 flex gap-3">
                                    <Truck size={18} className="text-blue-500 shrink-0" />
                                    <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wide leading-relaxed">
                                        Standard Delivery within 24-48 hours. Items will be
                                        delivered to your doorstep.
                                    </p>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg shadow-xl shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-95 group cursor-pointer disabled:opacity-50"
                                >
                                    {isPending ? (
                                        <Loader2 className="animate-spin mr-2" size={24} />
                                    ) : (
                                        <>
                                            Place Order
                                            <Package size={20} className="ml-2 group-hover:rotate-12 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #34d39966;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
      `}</style>
        </div>
    );
};

export default CheckoutModal;
