"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight, Zap, Mail, Sparkles } from "lucide-react";
import { siteConfig, stats, heroHooks } from "@/lib/portfolio-data";
import { TextGenerateEffectGradient } from "./text-generate";
import { MagneticButton, MagneticButtonOutline } from "./magnetic-button";
import { cn } from "@/lib/utils";

/**
 * HeroSection - CRO optimized hero with Aurora effect
 * Features: TextGenerateEffect, Magnetic Buttons, Rotating Hooks, Aurora Background
 */
export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
    >
      {/* Aurora Background Effect */}
      <AuroraHero />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
        >
          <Zap className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-sm font-medium text-foreground/80">Disponible para proyectos freelance</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        </motion.div>

        {/* Main Title with Text Generate Effect */}
        <div className="mb-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="block text-foreground/60 text-xl sm:text-2xl md:text-3xl font-sans font-normal mb-4"
          >
            Hola, soy
          </motion.span>
          
          <TextGenerateEffectGradient
            words={siteConfig.name}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            duration={0.6}
          />
        </div>

        {/* Role/Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl sm:text-2xl md:text-3xl text-foreground/60 mb-4 font-light"
        >
          {siteConfig.title}
        </motion.p>

        {/* Rotating Benefit Hook */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="h-8 mb-8"
        >
          <RotatingHook />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg text-foreground/50 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {siteConfig.description}
        </motion.p>

        {/* CTA Buttons with Magnetic Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <MagneticButton href="#contacto" className="group flex items-center gap-2">
            Iniciar Proyecto
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
          
          <MagneticButtonOutline href="#proyectos" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Ver Proyectos
          </MagneticButtonOutline>
        </motion.div>

        {/* Stats with Counter Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={stat.label}
              stat={stat}
              index={index}
              delay={0.8 + index * 0.1}
            />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() =>
            document.querySelector("#servicios")?.scrollIntoView({ behavior: "smooth" })
          }
          className="flex flex-col items-center gap-2 text-foreground/40 hover:text-foreground/60 transition-colors group"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-label="Scroll down"
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4 group-hover:text-primary transition-colors" />
        </motion.button>
      </motion.div>
    </section>
  );
}

/**
 * AuroraHero - Premium aurora background effect for hero
 */
function AuroraHero() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Main aurora gradient */}
      <div
        className="absolute inset-0 opacity-40 animate-aurora"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.3), transparent),
            radial-gradient(ellipse 60% 40% at 80% 50%, rgba(139, 92, 246, 0.2), transparent),
            radial-gradient(ellipse 50% 30% at 20% 80%, rgba(236, 72, 153, 0.15), transparent),
            radial-gradient(ellipse 70% 40% at 70% 80%, rgba(59, 130, 246, 0.15), transparent)
          `,
          backgroundSize: "200% 200%, 200% 200%, 200% 200%, 200% 200%",
        }}
      />
      
      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.8), transparent 70%)",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -5,
        }}
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.6), transparent 70%)",
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.6), transparent 60%)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
    </div>
  );
}

/**
 * RotatingHook - Cycles through benefit-focused hooks with smooth animation
 */
function RotatingHook() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroHooks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-8 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
          className="absolute inset-0 text-lg sm:text-xl text-primary font-medium"
        >
          {heroHooks[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/**
 * StatCounter - Animated stat with counter effect
 */
function StatCounter({
  stat,
  index,
  delay,
}: {
  stat: typeof stats[0];
  index: number;
  delay: number;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Animate counter
      const target = parseInt(stat.value);
      const duration = 1500;
      const steps = 30;
      const increment = target / steps;
      let current = 0;
      
      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [stat.value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      className="text-center group"
    >
      <div className="relative inline-block">
        <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent mb-1 group-hover:scale-105 transition-transform">
          {isVisible ? count : 0}{stat.suffix}
        </div>
        <div className="absolute -inset-2 bg-primary/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
      </div>
      <div className="text-sm text-foreground/50 group-hover:text-foreground/70 transition-colors">
        {stat.label}
      </div>
    </motion.div>
  );
}
