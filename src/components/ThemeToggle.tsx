"use client";

import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <div className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      )}
    </Button>
  );
};
