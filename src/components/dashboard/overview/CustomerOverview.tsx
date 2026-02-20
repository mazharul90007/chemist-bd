"use client";

import {
  ShoppingBag,
  Wallet,
  ArrowUpRight,
  LayoutDashboard,
  Clock,
  CheckCircle2,
  TrendingUp,
  CreditCard,
  ShoppingBasket,
  ArrowRight,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

import { cn } from "@/lib/utils";
import { useMyOrders } from "@/hooks/useOrder";

import Link from "next/link";

const CustomerOverview = () => {
  const { data: session } = authClient.useSession();
  const { data: ordersResponse, isLoading } = useMyOrders();

  const orders = ordersResponse?.data || [];

  // Calculations
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "PENDING").length;
  const deliveredOrders = orders.filter((o) => o.status === "DELIVERED").length;
  const totalSpent = orders
    .filter(
      (o) =>
        o.status === "DELIVERED" ||
        o.status === "PAID" ||
        o.status === "SHIPPED",
    )
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const stats = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-500/10",
      description: "Lifetime orders placed",
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      icon: Clock,
      color: "text-orange-600 bg-orange-50 dark:bg-orange-500/10",
      description: "Awaiting processing",
    },
    {
      label: "Delivered",
      value: deliveredOrders,
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10",
      description: "Successfully received",
    },
    {
      label: "Total Spent",
      value: totalSpent.toLocaleString(),
      isCurrency: true,
      icon: Wallet,
      color: "text-purple-600 bg-purple-50 dark:bg-purple-500/10",
      description: "Investment in health",
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-10">
        <div className="h-20 w-1/3 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-[2rem]"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex bg-emerald-600 p-2.5 rounded-2xl text-white shadow-xl shadow-emerald-500/20">
              <TrendingUp size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
                Welcome back,{" "}
                <span className="text-emerald-600">
                  {session?.user.name.split(" ")[0]}
                </span>
              </h1>
              <p className="text-zinc-500 font-medium flex items-center gap-2">
                Your health journey at a glance.
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/cart">
            <button className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-50 hover:bg-zinc-50 transition-all shadow-sm cursor-pointer group">
              <ShoppingBasket size={16} className="text-emerald-600" />
              Go to Cart
              <ArrowRight
                size={14}
                className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
              />
            </button>
          </Link>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="group relative bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-[2.5rem] hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-zinc-50 dark:bg-zinc-800/20 rounded-bl-full pointer-events-none -mr-8 -mt-8 group-hover:scale-110 transition-transform duration-500" />

              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className={cn("p-4 rounded-2xl shadow-sm", stat.color)}>
                  <Icon size={22} />
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-zinc-300 group-hover:text-emerald-600 transition-colors"
                />
              </div>

              <div className="relative z-10">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.15em] mb-1">
                  {stat.label}
                </p>
                <div className="flex items-end gap-1 mb-1">
                  {stat.isCurrency && (
                    <span className="text-lg font-black text-emerald-600 mb-0.5">
                      Tk
                    </span>
                  )}
                  <h3 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
                    {stat.value}
                  </h3>
                </div>
                <p className="text-[10px] font-medium text-zinc-400 italic">
                  {stat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main CTA */}
        <div className="lg:col-span-8 bg-zinc-900 dark:bg-zinc-900 rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-bl-[15rem] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-tr-[5rem] pointer-events-none" />

          <div className="relative z-10 max-w-lg space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-xl">
                <LayoutDashboard size={18} className="text-emerald-500" />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-500">
                Member Highlights
              </h3>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9]">
                Your health, <br />
                <span className="text-emerald-500">priority #1.</span>
              </h2>
              <p className="text-zinc-400 font-medium text-lg leading-relaxed">
                Reorder your monthly medications or discover new supplements
                curated just for you.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/medicines">
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 h-14 rounded-2xl font-black text-sm transition-all hover:scale-[1.05] shadow-xl shadow-emerald-500/20 cursor-pointer">
                  Browse Store
                </button>
              </Link>
              <Link href="/dashboard/orders">
                <button className="bg-white/5 hover:bg-white/10 text-white px-10 h-14 rounded-2xl font-black text-sm transition-all backdrop-blur-md border border-white/10 cursor-pointer">
                  Track Orders
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Side Badge Card */}
        <div className="lg:col-span-4 bg-emerald-600 rounded-[3rem] p-10 flex flex-col justify-between text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)] pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="bg-white/20 w-fit p-3 rounded-2xl backdrop-blur-md">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-2xl font-black tracking-tight leading-tight">
              Verified <br />
              Health Partner
            </h3>
          </div>

          <div className="relative z-10 pt-10">
            <p className="text-emerald-100 text-sm font-medium mb-6 leading-relaxed">
              You have successfully completed {deliveredOrders} orders with us.
              Thank you for trusting ChemistBD.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-black/10 w-fit px-4 py-2 rounded-full backdrop-blur-sm">
              <CreditCard size={12} />
              Secure Checkout Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOverview;
