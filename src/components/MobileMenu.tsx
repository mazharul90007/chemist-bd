"use client";

import Link from "next/link";
import { X, ShoppingBag, User, Stethoscope, LogOut, ChevronRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { name: string; href: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
  onLogout: () => Promise<void>;
  pathname: string;
  cartItemsCount: number;
}

const MobileMenu = ({
  isOpen,
  onClose,
  links,
  session,
  onLogout,
  pathname,
  cartItemsCount,
}: MobileMenuProps) => {
  return (
    <>
      {/* Premium Backdrop with Blur */}
      <div
        className={cn(
          "fixed inset-0 bg-zinc-950/40 backdrop-blur-sm z-[60] transition-all duration-500 lg:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Modern Menu Drawer */}
      <div
        className={cn(
          "fixed top-4 right-4 bottom-4 w-[calc(100%-2rem)] max-w-[380px] bg-emerald-100 dark:bg-zinc-950 z-[70] p-8 shadow-2xl rounded-[2.5rem] border border-emerald-200 dark:border-zinc-800 transition-all duration-500 ease-in-out lg:hidden overflow-y-auto",
          isOpen ? "translate-x-0 rotate-0" : "translate-x-[110%] rotate-6",
        )}
      >
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-xl text-white shadow-lg">
              <Stethoscope size={22} />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl text-zinc-900 dark:text-zinc-50 tracking-tighter leading-none">
                Chemist<span className="text-emerald-600">BD</span>
              </span>
              <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mt-1">
                Care First
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="w-11 h-11 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-zinc-800 hover:text-red-500 transition-all"
            >
              <X size={24} />
            </Button>
          </div>
        </div>

        {/* Links Navigation */}
        <div className="flex flex-col gap-2 mb-12">
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4 ml-4">Main Menu</p>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-between p-5 rounded-[1.5rem] transition-all group",
                  isActive
                    ? "bg-emerald-600 text-white shadow-xl shadow-emerald-600/20 translate-x-1"
                    : "bg-white/80 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:shadow-md hover:translate-x-1",
                )}
              >
                <span className="font-black text-base uppercase tracking-tight">{link.name}</span>
                <ChevronRight 
                   size={18} 
                   className={cn(
                     "transition-all duration-300",
                     isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
                   )} 
                />
              </Link>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="pt-8 border-t border-emerald-200 dark:border-zinc-900 space-y-6">
           {session && (
             <div className="flex items-center gap-4 p-5 bg-white/80 dark:bg-zinc-900/50 rounded-[2rem] border border-emerald-200 dark:border-zinc-800">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-600">
                  <User size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-zinc-900 dark:text-zinc-50 truncate">
                    {session.user.name}
                  </p>
                  <p className="text-[10px] font-bold text-zinc-500 truncate uppercase tracking-tighter">
                    {session.user.email}
                  </p>
                </div>
             </div>
           )}

           <div className="grid grid-cols-2 gap-4">
              {session?.user?.role === "CUSTOMER" && (
                <Link href="/cart" onClick={onClose} className="col-span-2">
                  <Button
                    variant="outline"
                    className="w-full h-16 rounded-[1.5rem] border-emerald-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900 font-black text-zinc-900 dark:text-zinc-50 gap-3 text-base group cursor-pointer"
                  >
                    <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                    Cart ({cartItemsCount})
                  </Button>
                </Link>
              )}

              {session ? (
                <Button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="col-span-2 h-16 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/40 text-red-600 rounded-[1.5rem] font-black text-base flex items-center justify-center gap-3 transition-all border border-red-100 dark:border-red-900/30 cursor-pointer"
                >
                  <LogOut size={20} />
                  Sign Out
                </Button>
              ) : (
                <Link href="/login" onClick={onClose} className="col-span-2">
                  <Button className="w-full h-16 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[1.5rem] font-black text-base shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 cursor-pointer">
                    <User size={20} />
                    Sign In Now
                  </Button>
                </Link>
              )}
           </div>

           <div className="flex items-center justify-center gap-2 pt-4">
              <Activity size={14} className="text-emerald-600 animate-pulse" />
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Always at your service</span>
           </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
