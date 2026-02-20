"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  PlusCircle,
  Users,
  Layers,
  Settings,
  User,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

interface SidebarLink {
  name: string;
  href: string;
  icon: React.ElementType;
  roles: string[];
}

const navLinks: SidebarLink[] = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["CUSTOMER", "SELLER", "ADMIN"],
  },
  // Customer Links
  {
    name: "My Orders",
    href: "/dashboard/orders",
    icon: ShoppingBag,
    roles: ["CUSTOMER"],
  },
  // Seller Links
  {
    name: "Manage Medicines",
    href: "/dashboard/seller/medicines",
    icon: Package,
    roles: ["SELLER"],
  },
  {
    name: "Add Medicine",
    href: "/dashboard/seller/add-medicine",
    icon: PlusCircle,
    roles: ["SELLER"],
  },
  {
    name: "Seller Orders",
    href: "/dashboard/seller/orders",
    icon: Package,
    roles: ["SELLER"],
  },
  // Admin Links
  {
    name: "Manage Categories",
    href: "/dashboard/admin/categories",
    icon: Layers,
    roles: ["ADMIN"],
  },
  {
    name: "Manage Users",
    href: "/dashboard/admin/users",
    icon: Users,
    roles: ["ADMIN"],
  },
  // Shared
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
    roles: ["CUSTOMER", "SELLER", "ADMIN"],
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    roles: ["CUSTOMER", "SELLER", "ADMIN"],
  },
];

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userRole = (session?.user as any)?.role || "CUSTOMER";

  const filteredLinks = navLinks.filter((link) =>
    link.roles.includes(userRole),
  );

  return (
    <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-800 flex flex-col h-[calc(100vh-5rem)] sticky top-20">
      <div className="p-6">
        <div className="bg-emerald-500/5 rounded-2xl p-4 border border-emerald-500/10">
          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">
            Logged in as
          </p>
          <p className="text-sm font-black text-zinc-900 dark:text-zinc-50 truncate">
            {session?.user.name}
          </p>
          <Badge className="mt-2 bg-emerald-600 text-[9px] font-black">
            {userRole}
          </Badge>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar pt-2">
        {filteredLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                  : "text-zinc-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10",
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={20}
                  className={cn(
                    isActive ? "text-white" : "group-hover:text-emerald-600",
                  )}
                />
                <span className="text-sm font-bold">{link.name}</span>
              </div>
              {isActive && <ChevronRight size={14} className="text-white/70" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
        <button
          onClick={() => authClient.signOut()}
          className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all font-bold text-sm cursor-pointer"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

import { Badge } from "@/components/ui/badge";

export default DashboardSidebar;
