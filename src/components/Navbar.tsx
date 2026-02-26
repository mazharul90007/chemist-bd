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

  // console.log(session);

  //Logout
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
      setIsScrolled(window.scrollY > 10);
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
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-100 transition-all duration-300 ease-in-out border-b py-4 sm:py-3",
        // 1. Mobile & Scrolled Desktop: White background
        "bg-white shadow-md border-zinc-200",
        // 2. Desktop Top State: Emerald background
        !isScrolled && !isMobileMenuOpen &&
        "lg:bg-emerald-600 lg:border-emerald-500/20 lg:shadow-md lg:dark:bg-zinc-950",
        // 3. Desktop Scrolled State: Blur effect
        (isScrolled || isMobileMenuOpen) &&
        "lg:bg-white/90 lg:backdrop-blur-md lg:shadow-lg lg:dark:bg-zinc-950/90",
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className={cn(
                "p-2 rounded-xl text-white transition-colors shadow-lg",
                (isScrolled || isMobileMenuOpen)
                  ? "bg-emerald-600"
                  : "bg-emerald-600 lg:bg-white lg:text-emerald-600",
              )}
            >
              <Stethoscope size={24} />
            </div>
            <span
              className={cn(
                "text-xl font-bold tracking-tight transition-colors",
                (isScrolled || isMobileMenuOpen)
                  ? "text-zinc-900 dark:text-zinc-50"
                  : "text-zinc-900 lg:text-white dark:text-zinc-50",
              )}
            >
              Chemist
              <span
                className={
                  (isScrolled || isMobileMenuOpen)
                    ? "text-emerald-600"
                    : "text-emerald-600 lg:text-white/80"
                }
              >
                BD
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              // 3. Check if current path matches link href
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors relative py-1",
                    isActive
                      ? (isScrolled || isMobileMenuOpen)
                        ? "text-emerald-600"
                        : "text-emerald-600 lg:text-white"
                      : (isScrolled || isMobileMenuOpen)
                        ? "text-zinc-600 hover:text-emerald-600"
                        : "text-zinc-600 lg:text-white/80 lg:hover:text-white",
                  )}
                >
                  {link.name}
                  {/* Underline indicator for active link */}
                  {isActive && (
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 w-full h-0.5 rounded-full animate-in fade-in zoom-in duration-300",
                        (isScrolled || isMobileMenuOpen)
                          ? "bg-emerald-600"
                          : "bg-emerald-600 lg:bg-white",
                      )}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Search Bar */}
          {/* <div className="hidden md:flex flex-1 max-w-md relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search medicines, health products..."
              className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-2xl py-2.5 pl-10 pr-12 text-sm focus:ring-2 focus:ring-emerald-500/50 transition-all outline-none"
            />
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-1.5 font-mono text-[10px] font-medium text-zinc-400 opacity-100">
                <Command size={10} /> K
              </kbd>
            </div>
          </div> */}

          {/* Action Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center gap-2">
              {session?.user?.role === "CUSTOMER" && (
                <Link href="/cart">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900  ${(isScrolled || isMobileMenuOpen) ? "text-zinc-600" : "text-zinc-600 lg:text-white"} dark:text-zinc-400 relative cursor-pointer`}
                  >
                    <ShoppingBag size={32} />
                    <span
                      className={cn(
                        "absolute top-1 right-1 w-4 h-4 text-[10px] font-bold flex items-center justify-center rounded-full border-2",
                        isScrolled
                          ? "bg-emerald-600 text-white border-white"
                          : "bg-white text-emerald-600 border-emerald-600",
                      )}
                    >
                      {cartItemsCount}
                    </span>
                  </Button>
                </Link>
              )}
            </div>

            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block mx-1" />

            {/* AUTH SECTION */}
            {isPending ? (
              // Loading state while checking session
              <div className="h-10 w-24 bg-zinc-100 animate-pulse rounded-xl" />
            ) : session ? (
              // SHOW THIS IF LOGGED IN
              <div className="flex items-center gap-3">
                <div className="hidden md:flex flex-col items-end mr-1">
                  <span
                    className={`text-xs font-bold  ${(isScrolled || isMobileMenuOpen) ? "text-zinc-900" : "text-zinc-900 lg:text-white"} dark:text-zinc-50`}
                  >
                    {session.user.name}
                  </span>
                  <span
                    className={`text-[10px] ${(isScrolled || isMobileMenuOpen) ? "text-zinc-500" : "text-zinc-500 lg:text-white"} font-black tracking-tighter`}
                  >
                    {session.user.email}
                  </span>
                </div>

                {/* Logout Button (Or you could use a DropdownMenu here) */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 text-zinc-500 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <LogOut
                    size={20}
                    className={(isScrolled || isMobileMenuOpen) ? "text-zinc-500" : "text-zinc-500 lg:text-white"}
                  />
                </Button>
              </div>
            ) : (
              // SHOW THIS IF NOT LOGGED IN
              <Link href="/login">
                <Button
                  variant="outline"
                  className={cn(
                    "hidden sm:flex items-center gap-2 rounded-xl transition-all font-medium cursor-pointer",
                    (isScrolled || isMobileMenuOpen)
                      ? "border-zinc-200 text-zinc-600 hover:bg-emerald-50 hover:text-emerald-600"
                      : "border-zinc-200 text-zinc-600 lg:border-white/40 lg:text-white hover:bg-white hover:text-emerald-600",
                  )}
                >
                  <User size={18} />
                  <span>Login</span>
                </Button>
              </Link>
            )}

            {/* Mobile Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "lg:hidden rounded-xl cursor-pointer",
                (isScrolled || isMobileMenuOpen)
                  ? "text-zinc-600 hover:bg-zinc-100"
                  : "text-zinc-600 lg:text-white hover:bg-zinc-100 lg:hover:bg-emerald-500/20",
              )}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
        session={session}
        onLogout={handleLogout}
        pathname={pathname}
        cartItemsCount={cartItemsCount}
      />
    </nav>
  );
};

export default Navbar;
