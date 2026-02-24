"use client";

import { cn } from "@/lib/utils";

/**
 * GrainBackground - A subtle noise/grain effect overlay
 * Creates a premium, textured feel for dark backgrounds
 */
export function GrainBackground({
  className,
  opacity = 0.03,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      className={cn("pointer-events-none fixed inset-0 z-50", className)}
      style={{ opacity }}
    >
      <svg className="h-full w-full">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}

/**
 * GradientBackground - A grainy gradient background
 * Creates a subtle gradient with noise overlay
 */
export function GradientBackground({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("fixed inset-0 -z-10 overflow-hidden", className)}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[#030303]" />
      
      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Subtle radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-[0.08]"
        style={{
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, rgba(139, 92, 246, 0.4) 40%, transparent 70%)",
        }}
      />
      
      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.05]"
        style={{
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.6) 0%, rgba(139, 92, 246, 0.3) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}
