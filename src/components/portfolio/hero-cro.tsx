"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Zap, ArrowRight, Sparkles, Clock, Users, TrendingUp } from "lucide-react";

/**
 * ============================================================
 * HERO CRO-OPTIMIZADO - ABOVE THE FOLD
 * ============================================================
 * 
 * Objetivo: Convertir visitas en leads
 * 
 * Elementos:
 * - H1 magnético con beneficio principal
 * - Subtítulo de confianza
 * - CTA con border glow
 * - Social proof instantáneo
 * - Stats impactantes
 */

// Logos de empresas que confían (placeholder)
const trustedBrands = [
  "OpenAI", "Anthropic", "n8n", "Vercel", "Supabase"
];

// Stats impactantes
const heroStats = [
  { icon: Clock, value: "40+", label: "Horas ahorradas/semana", suffix: "hrs" },
  { icon: Users, value: "50+", label: "Clientes activos", suffix: "" },
  { icon: TrendingUp, value: "300%", label: "ROI promedio", suffix: "" },
];

export function HeroCRO() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background glow elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-4 sm:px-6 text-center"
      >
        {/* Badge de urgencia */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <span className="text-sm text-violet-300">
              Consultas gratuitas disponibles este mes
            </span>
          </div>
        </motion.div>

        {/* H1 Magnético - Beneficio principal */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          <span className="block">
            Automatiza tu negocio
          </span>
          <span className="block bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            con Inteligencia Artificial
          </span>
        </motion.h1>

        {/* Subtítulo de confianza */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Implementamos <span className="text-white font-medium">chatbots que atienden 24/7</span> y 
          automatizaciones que trabajan mientras duermes. 
          <span className="text-white font-medium"> Sin complicaciones, con ROI medible.</span>
        </motion.p>

        {/* CTAs con Border Glow */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          {/* Primary CTA - Border Glow */}
          <Link href="/contacto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-lg shadow-2xl shadow-violet-500/30 overflow-hidden"
            >
              {/* Border beam animation */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
                  }}
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
              <span className="relative flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Agendar Consulta Gratis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </Link>

          {/* Secondary CTA */}
          <Link href="/servicios">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-lg hover:bg-white/10 transition-colors"
            >
              Ver Servicios
            </motion.button>
          </Link>
        </motion.div>

        {/* Social Proof - Logos */}
        <motion.div
          variants={itemVariants}
          className="mb-12"
        >
          <p className="text-sm text-white/40 mb-4">
            Tecnologías que integramos
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {trustedBrands.map((brand, index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-white/30 hover:text-white/60 transition-colors text-sm font-medium"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Impactantes */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
        >
          {heroStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5"
            >
              <stat.icon className="w-5 h-5 text-violet-400 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {stat.value}
                <span className="text-violet-400">{stat.suffix}</span>
              </div>
              <div className="text-xs sm:text-sm text-white/40">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/30"
          >
            <span className="text-xs">Descubre más</span>
            <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-white/50 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroCRO;
