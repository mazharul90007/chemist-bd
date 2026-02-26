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
        // Base state: Solid background for mobile/tablet
        "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-md",
        // Desktop (lg) state: Transparent until scroll or menu
        !isScrolled &&
          !isMobileMenuOpen &&
          "lg:bg-transparent lg:border-transparent lg:shadow-none",
        // Desktop (lg) state: Scrolled/Active (blur)
        (isScrolled || isMobileMenuOpen) &&
          "lg:bg-white/80 lg:dark:bg-zinc-950/80 lg:backdrop-blur-md",
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-emerald-600 p-2 rounded-xl text-white group-hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-500/20">
              <Stethoscope size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Chemist<span className="text-emerald-600">BD</span>
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
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-zinc-600 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400",
                  )}
                >
                  {link.name}
                  {/* Underline indicator for active link */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full animate-in fade-in zoom-in duration-300" />
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
                    className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 relative cursor-pointer"
                  >
                    <ShoppingBag size={28} />
                    {
                      <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-zinc-950">
                        {cartItemsCount ? cartItemsCount : 0}
                      </span>
                    }
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
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">
                    {session.user.name}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-black tracking-tighter">
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
                  <LogOut size={20} />
                </Button>
              </div>
            ) : (
              // SHOW THIS IF NOT LOGGED IN
              <Link href="/login">
                <Button
                  variant="outline"
                  className="hidden sm:flex items-center gap-2 rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all font-medium cursor-pointer"
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
              className="lg:hidden rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
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
