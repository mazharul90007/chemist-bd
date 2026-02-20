"use client";

import {
  Users,
  Wallet,
  ShoppingBag,
  ArrowUpRight,
  LayoutDashboard,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const AdminOverview = () => {
  const { data: session } = authClient.useSession();

  const stats = [
    {
      label: "Total Users",
      value: "1.2k",
      icon: Users,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Active Revenue",
      value: "Tk 245k",
      icon: Wallet,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Total Orders",
      value: "852",
      icon: ShoppingBag,
      color: "text-purple-600 bg-purple-50",
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
              Hello,{" "}
              <span className="text-emerald-600">
                {session?.user.name.split(" ")[0]}
              </span>
            </h1>
            <Badge className="bg-emerald-600/10 text-emerald-600 border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest">
              Administrator
            </Badge>
          </div>
          <p className="text-zinc-500 font-medium">
            System health and platform overview.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <ArrowUpRight
                  size={20}
                  className="text-zinc-300 group-hover:text-emerald-600 transition-colors"
                />
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
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">
              Admin Controls
            </h3>
          </div>
          <h2 className="text-3xl font-black tracking-tighter max-w-md">
            Complete platform management at your fingertips.
          </h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 h-12 rounded-2xl font-black text-sm transition-all hover:scale-[1.02] cursor-pointer">
              System Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
