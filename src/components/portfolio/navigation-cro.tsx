"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Zap } from "lucide-react";
import { siteConfig, navLinks } from "@/lib/portfolio-data";
import { LanguageSwitcher } from "./language-switcher";
import { cn } from "@/lib/utils";

/**
 * ============================================================
 * NAVBAR CRO-OPTIMIZADO
 * ============================================================
 * 
 * Características:
 * - Transparente al inicio, sólido al scroll
 * - CTA siempre visible
 * - Animaciones sutiles
 * - Layout persistente
 */

export function Navigation() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-2" : "py-4"
      )}
    >
      <nav
        className={cn(
          "mx-auto max-w-6xl px-4 sm:px-6",
          "flex items-center justify-between",
          "rounded-2xl transition-all duration-300",
          isScrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20"
            : "bg-transparent border border-transparent"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                MG
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            </div>
            <span className="hidden sm:block text-xl font-bold text-white">
              {siteConfig.brand}
              <span className="text-violet-400">.</span>
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.slice(0, 4).map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith("#")) {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }
                }}
                className={cn(
                  "text-sm font-medium transition-colors relative",
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side: CTA + Language */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          {/* CTA Button */}
          <Link href="/contacto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-sm font-medium shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow"
            >
              <Zap className="w-4 h-4" />
              <span>Consulta Gratis</span>
            </motion.button>
          </Link>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
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
            className="md:hidden fixed inset-x-4 top-20 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith("#")) {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }
                  }}
                  className="block px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="p-4 border-t border-white/10">
              <Link href="/contacto" className="block">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-medium">
                  <Zap className="w-4 h-4" />
                  Consulta Gratis
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navigation;
