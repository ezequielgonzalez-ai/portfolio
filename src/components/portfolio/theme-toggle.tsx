"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

// Use useLayoutEffect for SSR compatibility
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * ThemeToggleSimple - Simple sun/moon toggle
 * Uses localStorage for persistence and defaults to dark mode
 */
export function ThemeToggleSimple({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Initialize on client side only
  useIsomorphicLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = savedTheme === "dark" || 
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newIsDark);
  };

  // Prevent hydration mismatch - show placeholder during SSR
  if (!mounted) {
    return (
      <div className={cn("w-10 h-10 rounded-full bg-foreground/5 border border-border", className)} />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        "relative w-10 h-10 rounded-full flex items-center justify-center",
        "bg-foreground/5 border border-border",
        "hover:bg-foreground/10 hover:border-foreground/20",
        "transition-all duration-300",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-5 h-5 text-foreground/80" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-5 h-5 text-yellow-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/**
 * ThemeToggle - Full theme toggle with system option
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useIsomorphicLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      // Default to dark
      document.documentElement.classList.add("dark");
    }
    setMounted(true);
  }, []);

  const handleThemeChange = (newTheme: "dark" | "light") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  if (!mounted) {
    return (
      <div className={cn("w-24 h-10 rounded-full bg-foreground/5 border border-border", className)} />
    );
  }

  return (
    <div className={cn("flex items-center gap-1 p-1 rounded-full bg-foreground/5 border border-border", className)}>
      {/* Dark mode button */}
      <button
        onClick={() => handleThemeChange("dark")}
        className={cn(
          "relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
          theme === "dark" ? "bg-foreground/10" : "hover:bg-foreground/5"
        )}
        aria-label="Modo oscuro"
      >
        <Moon className="w-4 h-4 text-foreground/80" />
        {theme === "dark" && (
          <motion.div
            layoutId="theme-indicator"
            className="absolute inset-0 rounded-full border border-primary/50"
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
      </button>

      {/* Light mode button */}
      <button
        onClick={() => handleThemeChange("light")}
        className={cn(
          "relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
          theme === "light" ? "bg-foreground/10" : "hover:bg-foreground/5"
        )}
        aria-label="Modo claro"
      >
        <Sun className="w-4 h-4 text-foreground/80" />
        {theme === "light" && (
          <motion.div
            layoutId="theme-indicator"
            className="absolute inset-0 rounded-full border border-primary/50"
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
      </button>
    </div>
  );
}
