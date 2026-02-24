"use client";

import { useRef, useMemo } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Zap, ArrowRight, Clock, Users, TrendingUp, Sparkles, ChevronDown } from "lucide-react";
import { GlowButton } from "./glow-button";

const trustedBrands = [
  { name: "OpenAI", color: "text-emerald-400" },
  { name: "Anthropic", color: "text-orange-400" },
  { name: "n8n", color: "text-pink-400" },
  { name: "Vercel", color: "text-white" },
  { name: "Supabase", color: "text-green-400" },
];

const heroStats = [
  { icon: Clock, value: "40+", label: "Horas ahorradas/semana", color: "text-violet-400" },
  { icon: Users, value: "50+", label: "Clientes activos", color: "text-cyan-400" },
  { icon: TrendingUp, value: "300%", label: "ROI promedio", color: "text-emerald-400" },
];

const benefits = ["Sin configuración compleja", "Soporte en español", "ROI garantizado"];

function MouseFollower() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const y = useSpring(mouseY, { damping: 25, stiffness: 200 });
  
  return (
    <div onMouseMove={(e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); }} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          x: useTransform(x, (v) => v - 300),
          y: useTransform(y, (v) => v - 300),
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(6, 182, 212, 0.04) 30%, transparent 60%)",
        }}
      />
    </div>
  );
}

export function HeroCRO() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  }), []);

  return (
    <section ref={ref} id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10 mesh-gradient-bg" />
      <MouseFollower />
      <div className="absolute inset-0 -z-5 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <span className="text-sm text-violet-300 font-medium tracking-tight">Consultas gratuitas disponibles</span>
          </div>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
          <span className="block">Automatiza tu negocio</span>
          <span className="block text-gradient-animated mt-2">con Inteligencia Artificial</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-8 leading-relaxed tracking-tight">
          Implementamos <span className="text-white/80 font-medium">chatbots GPT-4 que atienden 24/7</span> y{' '}
          <span className="text-white/80 font-medium">automatizaciones con n8n</span> que trabajan mientras duermes.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-6 mb-10">
          {benefits.map((benefit, index) => (
            <motion.div key={benefit} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + index * 0.08 }} className="flex items-center gap-2 text-sm text-white/40">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="tracking-tight">{benefit}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <GlowButton href="/contacto" size="lg" variant="primary" className="min-w-[220px]">
            <Zap className="w-5 h-5" />Agendar Consulta Gratis<ArrowRight className="w-5 h-5" />
          </GlowButton>
          <Link href="/servicios">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-secondary min-w-[180px] tracking-tight">Ver Servicios</motion.button>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-16">
          <p className="text-xs text-white/30 mb-4 uppercase tracking-wider">Tecnologías que integramos</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {trustedBrands.map((brand, index) => (
              <motion.div key={brand.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + index * 0.06 }} whileHover={{ scale: 1.08 }} className={`${brand.color} text-sm font-medium opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default tracking-tight`}>
                {brand.name}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {heroStats.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 + index * 0.08 }} className="glass-card p-5 text-center group hover:border-violet-500/30 transition-colors">
              <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-3`} />
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{stat.value}</div>
              <div className="text-xs sm:text-sm text-white/40 mt-1 tracking-tight">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2 text-white/20">
            <span className="text-xs tracking-wider">Descubre más</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroCRO;
