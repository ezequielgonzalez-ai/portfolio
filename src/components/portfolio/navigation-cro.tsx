"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { siteConfig, navLinks, homeSections } from "@/lib/portfolio-data";
import { GoogleLogin } from "./google-login";
import { cn } from "@/lib/utils";

/**
 * ============================================================
 * NAVBAR - MG Digital con Logo y Google Login
 * ============================================================
 */

export function Navigation() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("inicio");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (isHomePage) {
        const sections = homeSections.map((link) => link.href.replace("#", ""));
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
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

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
        {/* Logo con imagen */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3"
          >
            {/* Logo Image */}
            <div className="relative w-10 h-10">
              <Image
                src="/logo.png"
                alt="MG Digital Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-white">
                {siteConfig.brand}
              </span>
              <span className="text-violet-400">.</span>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = link.isPage
              ? (link.href === "/" ? isHomePage : pathname === link.href)
              : (isHomePage && activeSection === link.href.replace("#", ""));

            return (
              <Link
                key={link.href}
                href={link.href}
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

        {/* Right side: Google Login + CTA */}
        <div className="flex items-center gap-3">
          {/* Google Login */}
          <GoogleLogin />

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
              {navLinks.map((link) => {
                const isActive = link.isPage
                  ? (link.href === "/" ? isHomePage : pathname === link.href)
                  : (isHomePage && activeSection === link.href.replace("#", ""));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-xl transition-colors",
                      isActive
                        ? "text-white bg-white/5"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navigation;
