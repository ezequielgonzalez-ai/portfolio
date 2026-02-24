"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { damping: 30, stiffness: 400 });
  const glowY = useSpring(mouseY, { damping: 30, stiffness: 400 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  const sizeClasses = { sm: "px-4 py-2 text-sm rounded-lg", md: "px-6 py-3 text-base rounded-xl", lg: "px-8 py-4 text-lg rounded-xl" };
  const variantClasses = {
    primary: "bg-gradient-to-br from-violet-600 via-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/20",
    secondary: "bg-white/[0.03] border border-white/10 text-white/80 hover:text-white",
    ghost: "bg-transparent text-white/60 hover:text-white",
  };

  const buttonContent = (
    <motion.button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn("relative group overflow-hidden font-semibold transition-all duration-300 focus:outline-none disabled:opacity-50", sizeClasses[size], variantClasses[variant], className)}
      style={{ willChange: 'transform' }}
    >
      {variant === "primary" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-violet-500 to-cyan-500" />
          <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }} animate={{ x: isHovered ? ["-100%", "100%"] : "-100%" }} transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0, ease: "linear" }} />
          <motion.div className="absolute w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)", x: useTransform(glowX, (v) => `${v}px`), y: useTransform(glowY, (v) => `${v}px`), translateX: "-50%", translateY: "-50%" }} />
        </>
      )}
      <span className="relative z-10 flex items-center justify-center gap-2 tracking-tight">{children}</span>
    </motion.button>
  );

  return href ? <Link href={href} className="inline-block">{buttonContent}</Link> : buttonContent;
}

export default GlowButton;
