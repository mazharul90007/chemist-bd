"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, User, Menu, Stethoscope, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import { useMyCart } from "@/hooks/useCart";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: session, isPending } = authClient.useSession() as any;
  const { data: cartData } = useMyCart(session?.user?.role === "CUSTOMER");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemsCount = cartData?.data?.cartItems?.length || 0;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Medicines", href: "/medicines" },
    { name: "Blogs", href: "/blogs" },
  ];

  if (session) {
    navLinks.push({ name: "Dashboard", href: "/dashboard" });
  }

  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 sm:py-6 transition-all duration-500">
      <nav
        className={cn(
          "w-full max-w-7xl transition-all duration-500 ease-in-out px-4 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between",
          "rounded-2xl border shadow-[0_8px_30px_rgb(0,0,0,0.06)]",

          isScrolled
            ? "bg-emerald-100/90 dark:bg-zinc-950/80 backdrop-blur-2xl border-emerald-200/50 dark:border-zinc-800/50 scale-[0.98] sm:scale-100"
            : "bg-emerald-100 dark:bg-zinc-900 border-emerald-200 dark:border-zinc-800",
        )}
      >
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full group-hover:bg-emerald-500/30 transition-all duration-500" />
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              <Stethoscope size={22} strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter leading-none">
              Chemist<span className="text-emerald-600">BD</span>
            </span>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] leading-none mt-1">
              Care First
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center bg-white/40 dark:bg-zinc-800/50 p-1.5 rounded-3xl border border-emerald-200/30 dark:border-zinc-700/50">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "px-6 py-2 rounded-2xl text-[13px] font-black transition-all duration-300 relative group",
                  isActive
                    ? "bg-white dark:bg-zinc-700 text-emerald-600 dark:text-white shadow-sm"
                    : "text-zinc-600 dark:text-zinc-300 hover:text-emerald-600",
                )}
              >
                {link.name}
                {!isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {session?.user?.role === "CUSTOMER" && (
            <Link href="/cart" className="relative group">
              <div className="absolute -inset-2 bg-emerald-500/0 group-hover:bg-emerald-500/5 rounded-full transition-all duration-300" />
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl text-zinc-700 dark:text-zinc-400 hover:text-emerald-600 transition-colors relative cursor-pointer"
              >
                <ShoppingBag size={22} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center rounded-lg border-2 border-white dark:border-zinc-900 shadow-lg animate-in zoom-in duration-300">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
          )}

          <div className="hidden sm:block h-8 w-px bg-emerald-200/60 dark:bg-zinc-800/60 mx-1" />

          {isPending ? (
            <div className="h-11 w-28 bg-emerald-200/50 dark:bg-zinc-800 animate-pulse rounded-2xl" />
          ) : session ? (
            <div className="flex items-center gap-3 pl-2">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[11px] font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-tighter">
                  {session.user.name}
                </span>
                <span className="text-[9px] font-bold text-emerald-600/80 uppercase">
                  {session.user.role}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white dark:bg-zinc-800 text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all cursor-pointer"
              >
                <LogOut size={18} />
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button
                className={cn(
                  "h-11 sm:h-12 px-8 sm:px-7 rounded-2xl font-black text-[13px] uppercase tracking-wider transition-all duration-300 group cursor-pointer",
                  "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_10px_30px_-10px_rgba(16,185,129,0.4)]",
                )}
              >
                <User size={16} className="mr-.5 group-hover:scale-110 transition-transform" />
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden w-10 h-10 sm:w-12 sm:h-12 rounded-2xl text-zinc-700 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-800 transition-all cursor-pointer"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </Button>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
        session={session}
        onLogout={handleLogout}
        pathname={pathname}
        cartItemsCount={cartItemsCount}
      />
    </div>
  );
};

export default Navbar;
