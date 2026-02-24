"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/portfolio-data";
import { ThemeToggleSimple } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { cn } from "@/lib/utils";

/**
 * Navigation - Floating navigation with backdrop blur
 * Includes: active section detection, mobile menu, theme toggle
 */
export function Navigation() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll for nav background and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scroll
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-3" : "py-6"
      )}
    >
      <nav
        className={cn(
          "mx-auto max-w-5xl px-4",
          "flex items-center justify-between",
          "rounded-2xl transition-all duration-300",
          isScrolled
            ? "glass-card bg-background/80 backdrop-blur-xl border border-border shadow-2xl"
            : "bg-transparent"
        )}
      >
        {/* Logo */}
        <motion.a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#inicio");
          }}
          className="relative z-10 font-serif text-xl sm:text-2xl font-bold tracking-tight"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            {siteConfig.brand}
            <span className="text-indigo-500">.</span>
          </span>
        </motion.a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-1 p-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <motion.a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-xl transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-foreground/60 hover:text-foreground"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-foreground/10 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </motion.a>
              </li>
            );
          })}
        </ul>

        {/* Right side: Language + Theme toggle + Mobile menu */}
        <div className="flex items-center gap-2">
          {/* Language Switcher - Desktop */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Theme Toggle - Desktop */}
          <div className="hidden md:block">
            <ThemeToggleSimple />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-10 p-2 rounded-lg bg-foreground/5 border border-border"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-4 top-20 z-40 bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            <ul className="p-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className={cn(
                        "block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                        isActive
                          ? "bg-foreground/10 text-foreground"
                          : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            
            {/* Theme toggle in mobile menu */}
            <div className="p-4 pt-0 border-t border-border mt-2">
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm text-foreground/60">Tema</span>
                <ThemeToggleSimple />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
