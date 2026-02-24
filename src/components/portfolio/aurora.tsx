"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * AuroraBackground - Premium animated aurora effect
 * Inspired by Aceternity UI with optimized CSS animations
 */
export function AuroraBackground({
  children,
  className,
  showRadialGradient = true,
}: {
  children?: React.ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col min-h-screen overflow-hidden",
        className
      )}
    >
      {/* Aurora gradient container */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "pointer-events-none absolute -inset-[10px] opacity-50",
            "[--aurora:repeating-linear-gradient(100deg,var(--color-1)_10%,var(--color-2)_15%,var(--color-3)_22%,var(--color-4)_30%,var(--color-5)_38%,var(--color-1)_45%)]",
            "[background-image:var(--aurora)]",
            "[background-size:300%_200%]",
            "[background-position:50%_50%]",
            "filter blur-[100px] saturate-150",
            "animate-aurora",
            // Colors for dark mode
            "dark:[--color-1:rgba(99,102,241,0.3)]",
            "dark:[--color-2:rgba(139,92,246,0.2)]",
            "dark:[--color-3:rgba(236,72,153,0.2)]",
            "dark:[--color-4:rgba(59,130,246,0.2)]",
            "dark:[--color-5:rgba(99,102,241,0.3)]",
            // Colors for light mode
            "[--color-1:rgba(99,102,241,0.15)]",
            "[--color-2:rgba(139,92,246,0.1)]",
            "[--color-3:rgba(236,72,153,0.1)]",
            "[--color-4:rgba(59,130,246,0.1)]",
            "[--color-5:rgba(99,102,241,0.15)]"
          )}
        />
      </div>

      {/* Radial gradient overlay */}
      {showRadialGradient && (
        <div
          className={cn(
            "absolute inset-0",
            "dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,#030303_70%)]",
            "bg-[radial-gradient(ellipse_at_center,transparent_0%,#FAFAFA_70%)]"
          )}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/**
 * AuroraGlow - Smaller aurora glow for sections
 */
export function AuroraGlow({
  className,
  color = "indigo",
}: {
  className?: string;
  color?: "indigo" | "purple" | "pink" | "blue" | "mixed";
}) {
  const colorClasses = {
    indigo: "from-indigo-500/30 via-indigo-500/20 to-transparent",
    purple: "from-purple-500/30 via-purple-500/20 to-transparent",
    pink: "from-pink-500/30 via-pink-500/20 to-transparent",
    blue: "from-blue-500/30 via-blue-500/20 to-transparent",
    mixed: "from-indigo-500/30 via-purple-500/20 to-pink-500/10",
  };

  return (
    <div className={cn("absolute rounded-full blur-3xl opacity-50 animate-pulse-slow", className)}>
      <div
        className={cn(
          "w-full h-full rounded-full bg-gradient-radial",
          colorClasses[color]
        )}
      />
    </div>
  );
}

/**
 * SpotlightEffect - Animated spotlight that follows mouse
 */
export function SpotlightEffect({
  className,
}: {
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ref.current.style.setProperty("--mouse-x", `${x}px`);
      ref.current.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none absolute inset-0 z-30",
        "bg-[radial-gradient(600px_circle_at_var(--mouse-x,_50%)_var(--mouse-y,_50%),rgba(99,102,241,0.06),transparent_40%)]",
        className
      )}
    />
  );
}
