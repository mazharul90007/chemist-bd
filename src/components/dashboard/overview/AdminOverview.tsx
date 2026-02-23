"use client";

import React from "react";
import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Shield,
} from "lucide-react";
import { useUsers } from "@/hooks/useAdmin";
import { useAllOrders } from "@/hooks/useOrder";
import { useAllCategories } from "@/hooks/useCategory";
import { authClient } from "@/lib/auth-client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  color,
}: {
  title: string;
  value: string | number;
  icon: any;
  trend?: string;
  color: string;
}) => (
  <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] p-8 group hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500">
    <div className="flex justify-between items-start mb-6">
      <div
        className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 shadow-lg",
          color,
        )}
      >
        <Icon size={28} className="text-white" />
      </div>
      {trend && (
        <div className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider">
          {trend}
        </div>
      )}
    </div>
    <div>
      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">
        {title}
      </p>
      <h3 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
        {value}
      </h3>
    </div>
  </div>
);

const AdminOverview = () => {
  const { data: session } = authClient.useSession();
  const { data: usersData } = useUsers();
  const { data: ordersData } = useAllOrders();
  const { data: categoriesData } = useAllCategories();

  const users = usersData?.data || [];
  const orders = ordersData?.data || [];
  const categories = categoriesData?.data || [];

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "PAID")
    .reduce((acc, order) => acc + (order.totalAmount || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "PENDING").length;

  const stats = [
    {
      title: "Total Revenue",
      value: `${totalRevenue.toLocaleString()} TK`,
      icon: TrendingUp,
      color: "bg-emerald-500",
      trend: "Income",
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingCart,
      color: "bg-blue-500",
      trend: `${pendingOrders} Pending`,
    },
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      color: "bg-indigo-500",
      trend: "Active",
    },
    {
      title: "Categories",
      value: categories.length,
      icon: Package,
      color: "bg-purple-500",
      trend: "Organized",
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
              Welcome Back,{" "}
              <span className="text-emerald-600">
                {session?.user.name.split(" ")[0]}
              </span>
            </h1>
            <Badge className="bg-emerald-600/10 text-emerald-600 border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest">
              Administrator
            </Badge>
          </div>
          <p className="text-zinc-500 font-medium">
            Project status and system metrics overview.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex items-center justify-center">
            <Shield className="text-emerald-600" size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">System Health</p>
            <p className="text-sm font-black text-zinc-900 dark:text-zinc-50">Operational</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[3rem] p-10 shadow-2xl shadow-zinc-200/10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                Recent <span className="text-emerald-600">Orders</span>
              </h2>
              <p className="text-zinc-500 text-sm font-medium">
                Latest transactions from all customers.
              </p>
            </div>
            <Link href="/dashboard/orders">
              <Button
                variant="ghost"
                className="rounded-2xl h-12 px-6 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all group/btn"
              >
                View All
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover/btn:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
          </div>

          <div className="space-y-6">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="group flex items-center justify-between p-6 bg-zinc-50/50 dark:bg-zinc-800/20 rounded-[2rem] border border-zinc-50 dark:border-zinc-800/50 hover:border-emerald-500/30 transition-all"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-white dark:bg-zinc-910 rounded-2xl flex items-center justify-center shadow-sm border border-zinc-100 dark:border-zinc-800 group-hover:bg-emerald-500 transition-colors duration-500">
                      <Clock
                        size={24}
                        className="text-zinc-400 group-hover:text-white transition-colors"
                      />
                    </div>
                    <div>
                      <p className="font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-none mb-1.5 uppercase">
                        #{order.orderNo}
                      </p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Users size={12} /> {order.customer?.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-zinc-900 dark:text-zinc-50 tracking-tighter mb-1">
                      {order.totalAmount} TK
                    </p>
                    <div className="flex items-center justify-end gap-1.5">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          order.status === "DELIVERED"
                            ? "bg-emerald-500"
                            : "bg-amber-500",
                        )}
                      />
                      <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                        {order.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center flex flex-col items-center">
                <Package size={40} className="text-zinc-200 mb-4" />
                <p className="text-zinc-400 font-medium">No recent orders found.</p>
              </div>
            )}
          </div>
        </div>

        {/* System & Actions */}
        <div className="space-y-8">
          <div className="bg-zinc-950 dark:bg-black rounded-[3rem] p-10 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
            <h3 className="text-xl font-black tracking-tight mb-8 flex items-center gap-2">
              <AlertCircle size={20} className="text-emerald-500" />
              Admin Portal
            </h3>
            <div className="space-y-4">
              <Link href="/dashboard/admin/users" className="block">
                <Button className="w-full bg-white text-zinc-950 hover:bg-zinc-100 h-14 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.02]">
                  User Management
                </Button>
              </Link>
              <Link href="/dashboard/admin/categories" className="block">
                <Button className="w-full bg-zinc-800 text-white hover:bg-zinc-700 h-14 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.02]">
                  Category Controls
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-emerald-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-emerald-200/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-white/70 uppercase tracking-widest leading-none mb-1">Server Status</p>
                <p className="text-lg font-black tracking-tight leading-none">Healthy</p>
              </div>
            </div>
            <p className="text-xs text-white/80 font-medium leading-relaxed">
              All systems are operational. SSL certificates are active and database replication is successful.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
