"use client";

import React from "react";
import {
    ShoppingBag,
    Timer,
    CheckCircle2,
    CircleDollarSign,
    Loader2,
    PackageX
} from "lucide-react";
import { useSellerOrders } from "@/hooks/useOrder";
import OrderListTable from "@/components/dashboard/seller/OrderListTable";

const SellerOrdersPage = () => {
    const { data, isLoading } = useSellerOrders();
    const orders = data?.data || [];

    // Summary Stats
    const stats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'PENDING').length,
        completed: orders.filter(o => o.status === 'DELIVERED').length,
        revenue: orders
            .filter(o => o.status !== 'CANCELED')
            .reduce((acc, curr) => acc + curr.totalAmount, 0)
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl flex items-center justify-center">
                    <Loader2 className="animate-spin text-emerald-600" size={32} />
                </div>
                <p className="text-zinc-500 font-bold tracking-tight">Syncing Orders...</p>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4">
                        <ShoppingBag size={12} />
                        Sales Management
                    </div>
                    <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
                        Seller <span className="text-emerald-600">Orders</span>
                    </h1>
                    <p className="text-zinc-500 font-medium">
                        Manage your medicine sales and track customer fulfillment.
                    </p>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Orders", value: stats.total, icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
                    { label: "Pending", value: stats.pending, icon: Timer, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
                    { label: "Delivered", value: stats.completed, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                    { label: "Revenue (TK)", value: stats.revenue.toLocaleString(), icon: CircleDollarSign, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/20 dark:shadow-none hover:scale-[1.02] transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg)}>
                                <stat.icon size={22} className={stat.color} />
                            </div>
                        </div>
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Order Table */}
            <div>
                <div className="flex items-center justify-between mb-6 px-2">
                    <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">Recent Sales</h2>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                        Total Listings: <span className="text-zinc-900 dark:text-zinc-50">{orders.length}</span>
                    </p>
                </div>
                <OrderListTable orders={orders} />
            </div>
        </div>
    );
};

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(" ");

export default SellerOrdersPage;
