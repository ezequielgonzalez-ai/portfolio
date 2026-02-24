"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Heart, Instagram, Briefcase, ArrowUp } from "lucide-react";
import { socialLinks, siteConfig, navLinks } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Instagram,
  Briefcase,
};

/**
 * BackToTop - Floating back to top button
 */
function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-8 right-8 z-50",
            "w-12 h-12 rounded-xl",
            "bg-primary text-primary-foreground",
            "flex items-center justify-center",
            "shadow-lg shadow-primary/25",
            "hover:bg-primary/90",
            "transition-all duration-200"
          )}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/**
 * Footer - Site footer with social links and glow effect
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="relative pt-24 pb-8 px-4">
        {/* Bottom glow effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none">
          <div
            className="w-full h-full opacity-[0.15]"
            style={{
              background: `radial-gradient(ellipse at center bottom, rgba(99, 102, 241, 0.6) 0%, transparent 70%)`,
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Top border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <motion.a
                href="#inicio"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#inicio")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-block font-serif text-2xl font-bold mb-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                  {siteConfig.brand}
                  <span className="text-primary">.</span>
                </span>
              </motion.a>
              <p className="text-foreground/50 text-sm leading-relaxed">
                {siteConfig.description}
              </p>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-1">
              <h4 className="text-foreground font-semibold mb-4">Navegación</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .querySelector(link.href)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-foreground/50 hover:text-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="md:col-span-1">
              <h4 className="text-foreground font-semibold mb-4">Conecta</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = iconMap[social.icon] || Github;
                  return (
                    <motion.a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "w-10 h-10 rounded-xl",
                        "bg-foreground/5 border border-border",
                        "flex items-center justify-center",
                        "text-foreground/60 hover:text-foreground",
                        "hover:bg-foreground/10 hover:border-primary/30",
                        "transition-all duration-200"
                      )}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-foreground/40 text-sm">
                © {currentYear} {siteConfig.name}. Todos los derechos reservados.
              </p>
              <p className="flex items-center gap-1.5 text-foreground/40 text-sm">
                Hecho con{" "}
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> en {siteConfig.location}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
}
