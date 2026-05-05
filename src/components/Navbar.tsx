"use client";

import { useState, useEffect } from "react";
import {
  ShoppingBag,
  User,
  Menu,
  Stethoscope,
  LogOut,
  Search,
} from "lucide-react";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaYoutube
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import { useMyCart } from "@/hooks/useCart";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: session, isPending } = authClient.useSession() as any;
  const { data: cartData } = useMyCart(session?.user?.role === "CUSTOMER");
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

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Medicines", href: "/medicines" },
    { name: "Blogs", href: "/blogs" },
  ];

  if (session) {
    navLinks.push({ name: "Dashboard", href: "/dashboard" });
  }

  return (
    <header className="w-full z-50">
      {/* Top Bar - Dynamic Background */}
      <div className="bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 py-4 px-6 sm:px-12 transition-colors duration-300">
        <div className="container mx-auto flex items-center justify-between">
          {/* Social Icons - Using React Icons (Font Awesome 6) */}
          <div className="hidden lg:flex items-center gap-6 text-zinc-400">
            <FaFacebookF size={16} className="hover:text-emerald-600 transition-colors cursor-pointer" />
            <FaXTwitter size={16} className="hover:text-emerald-600 transition-colors cursor-pointer" />
            <FaInstagram size={18} className="hover:text-emerald-600 transition-colors cursor-pointer" />
            <FaYoutube size={18} className="hover:text-emerald-600 transition-colors cursor-pointer" />
          </div>

          {/* Logo - Centered */}
          <Link href="/" className="flex items-center gap-2 group lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <span className="text-3xl font-black text-zinc-900 dark:text-white tracking-tighter transition-colors">
              Chemist<span className="text-emerald-600">BD</span>
            </span>
          </Link>

          {/* Action Icons */}
          <div className="flex items-center gap-4 sm:gap-6 text-zinc-700">
            <Link href="/login" className="hidden sm:block">
              <User size={22} className="hover:text-emerald-600 dark:text-zinc-300 dark:hover:text-emerald-400 transition-colors cursor-pointer" />
            </Link>
            <Link href="/medicines" className="hidden sm:block">
              <Search size={22} className="hover:text-emerald-600 dark:text-zinc-300 dark:hover:text-emerald-400 transition-colors cursor-pointer" />
            </Link>
            <ThemeToggle />
            <Link href={session ? "/cart" : "/login"} className="relative cursor-pointer group">
              <ShoppingBag size={22} className="hover:text-emerald-600 transition-colors" />
              <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-8 w-8 text-zinc-900 dark:text-zinc-100"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Navigation - Emerald Green Bar */}
      <div className="bg-emerald-600 hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-8 py-4 text-sm font-bold tracking-wide transition-all",
                    isActive
                      ? "bg-emerald-800 text-white"
                      : "text-emerald-50 hover:bg-emerald-500 hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
        session={session}
        onLogout={handleLogout}
        pathname={pathname}
        cartItemsCount={cartItemsCount}
      />
    </header>
  );
};

export default Navbar;
