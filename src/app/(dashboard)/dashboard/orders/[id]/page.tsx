"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ChevronLeft,
    Printer,
    Package,
    Calendar,
    MapPin,
    Phone,
    User,
    ShieldCheck,
    CheckCircle2,
    AlertCircle,
    Truck,
    CreditCard,
    Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderDetails } from "@/hooks/useOrder";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/types/order.type";
import Link from "next/link";

const statusConfig: Record<OrderStatus, { color: string; label: string }> = {
    PENDING: { color: "text-orange-600 bg-orange-50", label: "Pending" },
    PAID: { color: "text-emerald-600 bg-emerald-50", label: "Paid" },
    SHIPPED: { color: "text-blue-600 bg-blue-50", label: "Shipped" },
    DELIVERED: { color: "text-green-600 bg-green-50", label: "Delivered" },
    CANCELED: { color: "text-red-600 bg-red-50", label: "Canceled" },
};

const OrderDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const { data, isLoading, error } = useOrderDetails(id as string);
    const order = data?.data;

    const handlePrint = () => {
        window.print();
    };

    if (isLoading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-emerald-600" size={40} />
                <p className="text-zinc-500 font-medium animate-pulse">
                    Fetching invoice details...
                </p>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4">
                <div className="bg-red-50 dark:bg-red-900/10 p-10 rounded-[2.5rem] border border-red-100 dark:border-red-900/20 text-center max-w-md">
                    <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-black text-red-600 mb-2">Order Not Found</h2>
                    <p className="text-zinc-500 font-medium mb-8">
                        We couldn't retrieve the details for this order. It may have been
                        removed or you don't have access.
                    </p>
                    <Button
                        onClick={() => router.push("/dashboard/orders")}
                        className="rounded-2xl px-10 h-12 bg-zinc-900 hover:bg-zinc-800 text-white font-bold cursor-pointer"
                    >
                        Back to Orders
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10 md:py-16">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Actions - Hidden on Print */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-10 print:hidden">
                    <Link
                        href="/dashboard/orders"
                        className="group flex items-center gap-2 text-zinc-400 hover:text-emerald-600 transition-all text-xs font-black uppercase tracking-widest"
                    >
                        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to History
                    </Link>
                    <Button
                        onClick={handlePrint}
                        className="rounded-2xl px-8 h-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-800 font-black text-xs uppercase tracking-widest gap-2 shadow-sm cursor-pointer"
                    >
                        <Printer size={18} />
                        Print Invoice
                    </Button>
                </div>

                {/* Invoice Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl shadow-zinc-900/5 dark:shadow-none border border-zinc-100 dark:border-zinc-800 p-8 md:p-14 relative overflow-hidden print:shadow-none print:border-none print:rounded-none">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-bl-[12rem] pointer-events-none" />

                    {/* Invoice Header */}
                    <div className="relative flex flex-col md:flex-row justify-between gap-10 mb-16">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-emerald-600 p-2.5 rounded-2xl text-white shadow-lg shadow-emerald-500/20">
                                    <Package size={28} />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
                                        Official <span className="text-emerald-600">Invoice</span>
                                    </h1>
                                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">ChemistBD Pharmacy</p>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Digital Order ID</p>
                                <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">#{order.orderNo}</h2>
                            </div>
                        </div>

                        <div className="flex flex-col md:items-end gap-6">
                            <Badge className={`rounded-xl px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border-none ${statusConfig[order.status].color}`}>
                                Status: {statusConfig[order.status].label}
                            </Badge>
                            <div className="flex items-center gap-3 text-zinc-500 bg-zinc-50 dark:bg-zinc-800/50 px-5 py-3 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                                <Calendar size={16} />
                                <span className="text-xs font-bold uppercase tracking-wider">
                                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        {/* Customer Details */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-4 bg-emerald-600 rounded-full" />
                                <h3 className="text-[10px] font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-[0.2em]">Customer Information</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <User size={18} className="text-zinc-300 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-black text-zinc-900 dark:text-zinc-50">{order.customer?.name || "Customer"}</p>
                                        <p className="text-xs font-medium text-zinc-500">{order.customer?.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone size={18} className="text-zinc-300 mt-0.5" />
                                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{order.contactNumber}</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin size={18} className="text-zinc-300 mt-0.5" />
                                    <p className="text-sm font-medium text-zinc-500 leading-relaxed max-w-[250px]">{order.shippingAddress}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment & Shipping */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-4 bg-emerald-600 rounded-full" />
                                <h3 className="text-[10px] font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-[0.2em]">Payment & Delivery</h3>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-800/80 space-y-4">
                                <div className="flex items-center gap-3">
                                    <CreditCard size={18} className="text-emerald-600" />
                                    <div>
                                        <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Method</p>
                                        <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Cash on Delivery</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Truck size={18} className="text-blue-600" />
                                    <div>
                                        <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Service</p>
                                        <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Priority Medical Delivery</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-4 bg-emerald-600 rounded-full" />
                            <h3 className="text-[10px] font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-[0.2em]">Transaction Details</h3>
                        </div>
                        <div className="rounded-[2rem] border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-zinc-50 dark:bg-zinc-800/50 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                                        <td className="px-6 py-4">Item Description</td>
                                        <td className="px-6 py-4 text-center">Qty</td>
                                        <td className="px-6 py-4 text-right">Unit Price</td>
                                        <td className="px-6 py-4 text-right">Subtotal</td>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                    {order.orderItems.map((item) => (
                                        <tr key={item.id} className="text-sm">
                                            <td className="px-6 py-5">
                                                <div className="font-bold text-zinc-900 dark:text-zinc-50">{item.medicine.name}</div>
                                                <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight">{item.medicine.company}</div>
                                            </td>
                                            <td className="px-6 py-5 text-center font-bold text-zinc-900 dark:text-zinc-50">{item.quantity}</td>
                                            <td className="px-6 py-5 text-right font-medium text-zinc-500">Tk {item.unitPrice.toFixed(2)}</td>
                                            <td className="px-6 py-5 text-right font-black text-zinc-900 dark:text-zinc-50">Tk {(item.unitPrice * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Totals */}
                    <div className="flex flex-col items-end gap-6">
                        <div className="w-full md:w-80 space-y-4">
                            <div className="flex justify-between text-zinc-500 font-medium text-sm">
                                <span>Gross Subtotal</span>
                                <span>Tk {order.totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                                <span>Shipping Fees</span>
                                <span>FREE</span>
                            </div>
                            <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-2" />
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Net Total</span>
                                <span className="text-3xl font-black text-emerald-600 tracking-tighter flex items-center gap-0.5">
                                    <FaBangladeshiTakaSign size={20} />
                                    {order.totalAmount.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Bar */}
                    <div className="mt-20 pt-10 border-t border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-relaxed text-center sm:text-left">
                            <ShieldCheck size={14} className="text-emerald-600" />
                            This is a computer generated invoice and requires no signature.
                        </div>
                        <div className="flex items-center gap-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                            <span>Thank you for choosing ChemistBD</span>
                        </div>
                    </div>
                </div>

                <div className="mt-10 text-center text-[10px] text-zinc-400 font-bold uppercase tracking-[0.25em] animate-pulse print:hidden">
                    •••
                </div>
            </div>

            <style jsx>{`
        @media print {
          body {
            background: white !important;
            padding: 0 !important;
          }
          main {
            padding: 0 !important;
          }
          .container {
            max-width: 100% !important;
            width: 100% !important;
            padding: 0 !important;
          }
        }
      `}</style>
        </main>
    );
};

export default OrderDetailsPage;
