"use client";

import Link from "next/link";
import {
  X,
  Search,
  Heart,
  ShoppingBag,
  User,
  Stethoscope,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 z-60 transition-opacity duration-300 lg:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Menu Content */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 w-300px bg-white dark:bg-zinc-950 z-70 p-6 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-1.5 rounded-lg text-white">
              <Stethoscope size={20} />
            </div>
            <span className="font-bold text-zinc-900 dark:text-zinc-50">
              ChemistBD
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            <X size={24} />
          </Button>
        </div>

        {/* Mobile Search */}
        {/* <div className="mb-8 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none"
          />
        </div> */}

        {/* Links */}
        <div className="flex flex-col gap-1 mb-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "flex items-center p-3 rounded-xl font-medium transition-all",
                  isActive
                    ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900",
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="border-t border-zinc-100 dark:border-zinc-900 pt-6 flex flex-col gap-4">
          <div className="flex items-center justify-around">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-zinc-600 dark:text-zinc-400 relative"
            >
              <ShoppingBag size={24} />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-zinc-950">
                {cartItemsCount ? cartItemsCount : 0}
              </span>
            </Button>
          </div>
          {/* Dynamic auth section for mobile */}
          {session ? (
            <div className="space-y-3">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  {session.user.name}
                </p>
                <p className="text-xs text-zinc-500 truncate">
                  {session.user.email}
                </p>
              </div>
              <Button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                variant="outline"
                className="w-full border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl py-6 font-semibold flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login" onClick={onClose}>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-6 font-semibold shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
                <User size={18} />
                Login / Signup
              </Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
