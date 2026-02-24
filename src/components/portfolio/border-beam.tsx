"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

/**
 * BorderBeam - A rotating border beam effect
 * Creates a premium, animated glow effect around elements
 */
export function BorderBeam({
  className,
  size = 200,
  duration = 12,
  borderWidth = 1.5,
  colorFrom = "#6366F1",
  colorTo = "#EC4899",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", className)}>
      {/* The rotating beam */}
      <motion.div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, ${colorFrom} 10%, ${colorTo} 20%, transparent 30%)`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: `${borderWidth}px`,
        }}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Inner glow effect */}
      <div
        className="absolute inset-0 rounded-[inherit] opacity-50"
        style={{
          background: `linear-gradient(135deg, ${colorFrom}10, ${colorTo}05)`,
        }}
      />
    </div>
  );
}

/**
 * GlowButton - A button with border beam and glow effects
 */
interface GlowButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function GlowButton({
  children,
  className,
  onClick,
  href,
}: GlowButtonProps) {
  const baseClasses = cn(
    "group relative inline-flex items-center justify-center px-8 py-4",
    "bg-white/5 border border-white/10 rounded-xl",
    "text-white font-medium text-base",
    "overflow-hidden transition-all duration-300",
    "hover:bg-white/10 hover:border-white/20",
    "focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-[#030303]",
    className
  );

  const content = (
    <>
      <BorderBeam
        size={250}
        duration={8}
        borderWidth={1}
        colorFrom="#6366F1"
        colorTo="#EC4899"
      />
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={baseClasses}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
