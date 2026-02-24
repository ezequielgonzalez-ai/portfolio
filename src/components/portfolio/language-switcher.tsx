"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ============================================================
 * LANGUAGE SWITCHER - Selector de idiomas profesional
 * ============================================================
 */

type Language = "es" | "en" | "pt";

const languages: Record<Language, { name: string; flag: string }> = {
  es: { name: "Español", flag: "🇦🇷" },
  en: { name: "English", flag: "🇺🇸" },
  pt: { name: "Português", flag: "🇧🇷" },
};

interface LanguageSwitcherProps {
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export function LanguageSwitcher({ 
  currentLang = "es", 
  onLanguageChange 
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Language>(currentLang);

  const handleSelect = (lang: Language) => {
    setSelected(lang);
    setIsOpen(false);
    onLanguageChange?.(lang);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
      >
        <span className="text-lg">{languages[selected].flag}</span>
        <span className="text-sm text-white/70 hidden sm:inline">
          {languages[selected].name}
        </span>
        <svg
          className={`w-4 h-4 text-white/50 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-2 py-2 w-40 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl z-50"
          >
            {(Object.keys(languages) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => handleSelect(lang)}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-white/5 transition-colors ${
                  selected === lang ? "text-[#00f5ff]" : "text-white/70"
                }`}
              >
                <span className="text-lg">{languages[lang].flag}</span>
                <span className="text-sm">{languages[lang].name}</span>
                {selected === lang && (
                  <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageSwitcher;
