"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Zap, ArrowRight, Clock, Users, TrendingUp, Sparkles } from "lucide-react";
import { GlowButton, BorderBeam } from "./glow-button";

/**
 * ============================================================
 * HERO CRO-OPTIMIZADO - ABOVE THE FOLD
 * ============================================================
 * 
 * Objetivo: Convertir visitas en leads
 * 
 * Optimizaciones LCP:
 * - Sin imágenes pesadas en above the fold
 * - Animaciones con will-change
 * - CSS crítico inline
 * - Fuentes preloaded en layout
 * 
 * Elementos CRO:
 * - H1 magnético con beneficio principal
 * - Badge de urgencia/escasez
 * - CTA con border glow animado
 * - Social proof instantáneo
 * - Stats impactantes
 */

// Logos de tecnologías (texto para evitar carga de imágenes)
const trustedBrands = [
  { name: "OpenAI", color: "text-emerald-400" },
  { name: "Anthropic", color: "text-orange-400" },
  { name: "n8n", color: "text-pink-400" },
  { name: "Vercel", color: "text-white" },
  { name: "Supabase", color: "text-green-400" },
];

// Stats impactantes con ROI claro
const heroStats = [
  { icon: Clock, value: "40+", label: "Horas ahorradas/semana", color: "text-violet-400" },
  { icon: Users, value: "50+", label: "Clientes activos", color: "text-cyan-400" },
  { icon: TrendingUp, value: "300%", label: "ROI promedio", color: "text-emerald-400" },
];

// Beneficios clave para el copy
const benefits = [
  "Sin configuración compleja",
  "Soporte en español",
  "ROI garantizado en 90 días",
];

export function HeroCRO() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Variantes de animación optimizadas
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  }), []);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background glow elements - Optimizado con will-change */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl will-change-transform" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl will-change-transform" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet-500/5 to-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-4 sm:px-6 text-center"
      >
        {/* Badge de urgencia/escasez */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <span className="text-sm text-violet-300">
              Consultas gratuitas disponibles
            </span>
          </div>
        </motion.div>

        {/* H1 Magnético - Beneficio principal + Palabras clave SEO */}
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

        {/* Subtítulo con keywords y beneficios */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-6 leading-relaxed"
        >
          Implementamos <span className="text-white font-medium">chatbots GPT-4 que atienden 24/7</span> y 
          <span className="text-white font-medium"> automatizaciones con n8n</span> que trabajan mientras duermes.
        </motion.p>

        {/* Beneficios rápidos */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-2 text-sm text-white/50"
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              {benefit}
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs con Border Glow mejorado */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          {/* Primary CTA - Con todos los efectos */}
          <GlowButton
            href="/contacto"
            size="lg"
            variant="primary"
            className="min-w-[200px]"
          >
            <Zap className="w-5 h-5" />
            Agendar Consulta Gratis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </GlowButton>

          {/* Secondary CTA */}
          <div className="relative group">
            <BorderBeam />
            <Link href="/servicios">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                Ver Servicios
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Social Proof - Tecnologías que integramos */}
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
                key={brand.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.08 }}
                whileHover={{ scale: 1.1 }}
                className={`${brand.color} text-sm font-medium hover:opacity-100 opacity-60 transition-opacity cursor-default`}
              >
                {brand.name}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Impactantes - ROI claro */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
        >
          {heroStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="relative group text-center p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/0 to-cyan-500/0 group-hover:from-violet-500/5 group-hover:to-cyan-500/5 transition-colors" />
              
              <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-white/40">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
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
