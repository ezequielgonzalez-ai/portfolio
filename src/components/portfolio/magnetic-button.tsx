"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
}

/**
 * MagneticButton - Button with magnetic cursor effect
 * Creates a premium interactive feel for CTAs
 */
export function MagneticButton({
  children,
  className,
  strength = 0.3,
  onClick,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const Component = href ? motion.a : motion.button;
  
  const buttonContent = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ x: springX, y: springY }}
      className={cn(
        "relative group",
        className
      )}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{
          background: "radial-gradient(circle at center, rgba(99, 102, 241, 0.4), transparent 70%)",
          filter: "blur(15px)",
        }}
        animate={isHovered ? { scale: 1.5 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Border beam animation */}
      <motion.div
        className="absolute inset-0 rounded-xl overflow-hidden -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="absolute inset-[-100%] animate-rotate"
          style={{
            background: "conic-gradient(from 0deg, transparent 0 340deg, white 360deg)",
          }}
        />
        <div className="absolute inset-[1px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl" />
      </motion.div>
      
      <Component
        href={href}
        onClick={onClick}
        className={cn(
          "relative px-8 py-4 rounded-xl font-semibold text-white",
          "bg-gradient-to-r from-indigo-500 to-purple-500",
          "hover:from-indigo-600 hover:to-purple-600",
          "transition-all duration-300",
          "flex items-center justify-center gap-2",
          "cursor-pointer"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </Component>
    </motion.div>
  );

  return buttonContent;
}

/**
 * MagneticButtonOutline - Outline variant with magnetic effect
 */
export function MagneticButtonOutline({
  children,
  className,
  strength = 0.3,
  onClick,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const Component = href ? motion.a : motion.button;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ x: springX, y: springY }}
      className={cn("relative group", className)}
    >
      <Component
        href={href}
        onClick={onClick}
        className={cn(
          "relative px-8 py-4 rounded-xl font-semibold",
          "border border-white/20 text-white/80 hover:text-white",
          "hover:border-white/40 hover:bg-white/5",
          "transition-all duration-300",
          "flex items-center justify-center gap-2",
          "cursor-pointer"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </Component>
    </motion.div>
  );
}

/**
 * GlowButton - Simple glow button for backward compatibility
 */
export function GlowButton({ 
  children, 
  className, 
  href,
  onClick 
}: MagneticButtonProps) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={cn(
        "relative px-8 py-4 rounded-xl font-semibold text-white",
        "bg-gradient-to-r from-indigo-500 to-purple-500",
        "hover:from-indigo-600 hover:to-purple-600",
        "transition-all duration-300",
        "flex items-center justify-center gap-2",
        "overflow-hidden group",
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow effect */}
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.2), transparent 60%)",
        }}
      />
      <span className="relative">{children}</span>
    </motion.a>
  );
}
