"use client";

import React, { useMemo } from "react";
import {
  Package,
  Wallet,
  Clock,
  ArrowUpRight,
  LayoutDashboard,
  CheckCircle2,
  Truck,
  XCircle,
  ShoppingBag,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useSellerOrders } from "@/hooks/useOrder";

const SellerOverview = () => {
  const { data: session } = authClient.useSession();
  const { data: ordersData, isLoading } = useSellerOrders();

  const stats = useMemo(() => {
    const orders = ordersData?.data || [];

    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === "PENDING").length;
    const confirmedOrders = orders.filter(o => o.status === "CONFIRMED").length;
    const onTheWayOrders = orders.filter(o => o.status === "ON_THE_WAY").length;
    const deliveredOrders = orders.filter(o => o.status === "DELIVERED").length;
    const canceledOrders = orders.filter(o => o.status === "CANCELED").length;

    return [
      {
        label: "Total Orders",
        value: isLoading ? "..." : totalOrders.toString(),
        icon: ShoppingBag,
        color: "text-blue-600 bg-blue-50"
      },
      {
        label: "Pending Orders",
        value: isLoading ? "..." : pendingOrders.toString(),
        icon: Clock,
        color: "text-orange-600 bg-orange-50"
      },
      {
        label: "Confirmed Orders",
        value: isLoading ? "..." : confirmedOrders.toString(),
        icon: CheckCircle2,
        color: "text-indigo-600 bg-indigo-50"
      },
      {
        label: "On The Way",
        value: isLoading ? "..." : onTheWayOrders.toString(),
        icon: Truck,
        color: "text-purple-600 bg-purple-50"
      },
      {
        label: "Delivered",
        value: isLoading ? "..." : deliveredOrders.toString(),
        icon: Package,
        color: "text-emerald-600 bg-emerald-50"
      },
      {
        label: "Canceled",
        value: isLoading ? "..." : canceledOrders.toString(),
        icon: XCircle,
        color: "text-rose-600 bg-rose-50"
      },
    ];
  }, [ordersData, isLoading]);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
              Hello, <span className="text-emerald-600">{session?.user?.name?.split(" ")[0]}</span>
            </h1>
            <Badge className="bg-emerald-600/10 text-emerald-600 border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest">
              Seller
            </Badge>
          </div>
          <p className="text-zinc-500 font-medium">
            Welcome back to your seller command center.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-[2rem] hover:shadow-xl hover:shadow-zinc-900/5 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn("p-3 rounded-2xl", stat.color)}>
                  <Icon size={24} />
                </div>
                <ArrowUpRight size={20} className="text-zinc-300 group-hover:text-emerald-600 transition-colors" />
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {stat.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-zinc-900 dark:bg-zinc-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-bl-[12rem] pointer-events-none" />
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-2">
            <LayoutDashboard size={18} className="text-emerald-500" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">Seller Actions</h3>
          </div>
          <h2 className="text-3xl font-black tracking-tighter max-w-md">
            Manage your inventory and track your sales growth.
          </h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 h-12 rounded-2xl font-black text-sm transition-all hover:scale-[1.02] cursor-pointer" onClick={() => window.location.href = "/dashboard/seller/add-medicine"}>
              Add New Medicine
            </button>
            <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 h-12 rounded-2xl font-black text-sm transition-all hover:scale-[1.02] cursor-pointer" onClick={() => window.location.href = "/dashboard/seller/medicines"}>
              View Inventory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOverview;
