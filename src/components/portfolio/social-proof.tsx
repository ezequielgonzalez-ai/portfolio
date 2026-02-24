"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, Quote, Award, CheckCircle, Zap, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { testimonials } from "@/lib/portfolio-data";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  project?: string;
}

/**
 * GlassCard - Glassmorphism card component with dynamic effects
 */
function GlassCard({
  children,
  className,
  isHovered,
}: {
  children: React.ReactNode;
  className?: string;
  isHovered?: boolean;
}) {
  return (
    <motion.div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-white/5 dark:bg-white/5 backdrop-blur-xl",
        "border border-white/10 dark:border-white/10",
        "transition-all duration-500",
        className
      )}
      animate={{
        boxShadow: isHovered
          ? "0 25px 50px -12px rgba(99, 102, 241, 0.25)"
          : "0 8px 32px 0 rgba(0,0,0,0.4)",
      }}
    >
      {/* Glass gradient overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
        }}
      />
      
      {/* Dynamic glow on hover */}
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.5), transparent 60%)",
        }}
      />
      
      <div className="relative">{children}</div>
    </motion.div>
  );
}

/**
 * TestimonialCard - Individual testimonial with glass effect
 */
function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlassCard
        isHovered={isHovered}
        className="p-6 h-full hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 group cursor-pointer"
      >
        {/* Quote icon with animation */}
        <motion.div
          className="absolute top-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity"
          animate={{ rotate: isHovered ? 10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Quote className="w-10 h-10 text-white" />
        </motion.div>

        {/* Rating */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.15 + i * 0.05 }}
            >
              <Star
                className={cn(
                  "w-4 h-4",
                  i < testimonial.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-white/20"
                )}
              />
            </motion.div>
          ))}
        </div>

        {/* Quote with typewriter effect on scroll */}
        <motion.p
          className="text-foreground/70 text-sm leading-relaxed mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </motion.p>

        {/* Author */}
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm"
            whileHover={{ scale: 1.1 }}
          >
            {testimonial.name.charAt(0)}
          </motion.div>
          <div>
            <p className="text-foreground font-medium text-sm">{testimonial.name}</p>
            <p className="text-foreground/50 text-xs">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>

        {/* Project badge */}
        {testimonial.project && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <span className="text-xs text-foreground/40">Proyecto: </span>
            <span className="text-xs text-indigo-400">{testimonial.project}</span>
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}

/**
 * TrustBadge - Individual trust badge with icon
 */
function TrustBadge({
  icon,
  label,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full",
        "bg-white/5 dark:bg-white/5 border border-white/10",
        "text-foreground/60 text-sm",
        "hover:border-primary/30 hover:text-foreground/80",
        "transition-all duration-300"
      )}
    >
      {icon}
      {label}
    </motion.div>
  );
}

/**
 * SocialProofSection - Testimonials with glassmorphism
 */
export function SocialProofSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const trustBadges = [
    { icon: <Award className="w-4 h-4 text-yellow-400" />, label: "Workana Top Rated" },
    { icon: <CheckCircle className="w-4 h-4 text-green-400" />, label: "100% Job Success" },
    { icon: <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />, label: "5 Star Rating" },
    { icon: <Zap className="w-4 h-4 text-blue-400" />, label: "Fast Response" },
    { icon: <Clock className="w-4 h-4 text-purple-400" />, label: "Always On Time" },
  ];

  return (
    <section id="testimonios" className="py-24 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-[0.08]">
          <div
            className="w-full h-full"
            style={{
              background: "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.8) 0%, transparent 70%)",
            }}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Lo que dicen mis clientes
          </h2>
          <p className="text-lg text-foreground/50 max-w-2xl mx-auto">
            La satisfacción de mis clientes es mi mayor recompensa
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial: Testimonial, index: number) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {trustBadges.map((badge, index) => (
            <TrustBadge
              key={badge.label}
              icon={badge.icon}
              label={badge.label}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * AchievementCard - For showcasing milestones
 */
export function AchievementCard({
  value,
  label,
  icon,
  index,
}: {
  value: string;
  label: string;
  icon?: React.ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <GlassCard className="p-6 text-center hover:border-white/20 transition-all duration-300">
        {icon && <div className="text-indigo-400 mb-2">{icon}</div>}
        <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-1">
          {value}
        </div>
        <div className="text-foreground/50 text-sm">{label}</div>
      </GlassCard>
    </motion.div>
  );
}
