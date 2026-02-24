"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * ============================================================
 * GLOW BUTTON - CTA con efecto de borde luminoso
 * ============================================================
 * 
 * Características:
 * - Border beam animation
 * - Mouse-following glow
 * - Hover scale effect
 * - Gradient shimmer
 */

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

export function GlowButton({
  children,
  onClick,
  href,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
}: GlowButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for gradient follow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse follow
  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Transform for background gradient position
  const backgroundX = useTransform(x, (v) => `${v}px`);
  const backgroundY = useTransform(y, (v) => `${v}px`);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl",
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-lg shadow-violet-500/25",
    secondary: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
    ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/5",
  };

  const buttonContent = (
    <motion.button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative group overflow-hidden font-semibold transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-background",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {/* Primary gradient background */}
      {variant === "primary" && (
        <>
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-cyan-500 to-violet-600 opacity-100" />
          
          {/* Animated border beam */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
            }}
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Mouse-following glow */}
          <motion.div
            className="absolute w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
              x: backgroundX,
              y: backgroundY,
              translateX: "-50%",
              translateY: "-50%",
            }}
          />

          {/* Shimmer effect */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)",
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: ["200% 0", "-200% 0"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* Glow ring on hover */}
          <motion.div
            className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md -z-10"
            style={{
              background: "linear-gradient(90deg, #8b5cf6, #06b6d4, #8b5cf6)",
            }}
            animate={{
              opacity: isHovered ? 0.5 : 0,
            }}
          />
        </>
      )}

      {/* Secondary variant effects */}
      {variant === "secondary" && (
        <>
          {/* Border glow on hover */}
          <div className="absolute inset-0 rounded-xl border border-white/10 group-hover:border-violet-500/50 transition-colors duration-300" />
          
          {/* Gradient shine */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.1) 0%, transparent 50%)",
            }}
          />
        </>
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {buttonContent}
      </Link>
    );
  }

  return buttonContent;
}

/**
 * GlowBorder - Componente para añadir borde luminoso a cualquier elemento
 */
export function GlowBorder({
  children,
  className,
  glowColor = "violet",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: "violet" | "cyan" | "emerald" | "amber";
}) {
  const colorMap = {
    violet: "from-violet-500 to-purple-600",
    cyan: "from-cyan-500 to-blue-600",
    emerald: "from-emerald-500 to-teal-600",
    amber: "from-amber-500 to-orange-600",
  };

  return (
    <div className={cn("relative group", className)}>
      {/* Glow effect */}
      <div
        className={cn(
          "absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-75 transition-opacity duration-500 blur-sm",
          `bg-gradient-to-r ${colorMap[glowColor]}`
        )}
      />
      
      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
}

/**
 * BorderBeam - Animated border beam effect
 */
export function BorderBeam({
  className,
  size = 200,
  duration = 12,
  borderWidth = 1.5,
  colorFrom = "#8b5cf6",
  colorTo = "#06b6d4",
}: {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden rounded-xl pointer-events-none", className)}>
      <motion.div
        className="absolute"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(from 0deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: "var(--background)",
            margin: borderWidth,
          }}
        />
      </motion.div>
    </div>
  );
}

// Add Link import at the top
import Link from "next/link";

export default GlowButton;
