"use client";

import { useEffect, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * ============================================================
 * HYBRID BACKGROUND - "The Ultimate 2026 Hybrid Background"
 * ============================================================
 * 
 * 4 Capas combinadas:
 * 1. Dynamic Mesh - Esferas de gradiente animadas
 * 2. Grainy Aurora - Textura de ruido orgánico
 * 3. Mouse Spotlight - Foco que sigue el cursor
 * 4. Subtle Grid - Cuadrícula que se ilumina
 * 
 * Optimizado para <5% CPU
 */

// ============================================
// CAPA 1: DYNAMIC MESH (Esferas animadas)
// ============================================
function DynamicMesh() {
  const spheres = [
    { color: "#1d4ed8", x: 15, y: 25, size: 650, duration: 28 }, // Azul
    { color: "#7c3aed", x: 70, y: 55, size: 700, duration: 32 }, // Violeta
    { color: "#0ea5e9", x: 40, y: 75, size: 600, duration: 25 }, // Cian oscuro
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {spheres.map((sphere, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${sphere.color} 0%, transparent 70%)`,
            filter: "blur(140px)",
            opacity: 0.2,
            width: sphere.size,
            height: sphere.size,
            left: `${sphere.x}%`,
            top: `${sphere.y}%`,
            transform: "translate(-50%, -50%)",
            willChange: "transform",
          }}
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 80, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: sphere.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: index * 3,
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// CAPA 2: GRAINY AURORA (Textura de ruido)
// ============================================
function GrainyAurora() {
  return (
    <>
      {/* Ruido estático */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.60' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
      
      {/* Aurora sutil animada */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          background: `linear-gradient(45deg, 
            transparent 0%, 
            rgba(124, 58, 237, 0.3) 25%, 
            transparent 50%, 
            rgba(29, 78, 216, 0.3) 75%, 
            transparent 100%)`,
          backgroundSize: "400% 400%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </>
  );
}

// ============================================
// CAPA 3: MOUSE SPOTLIGHT (Foco interactivo)
// ============================================
function MouseSpotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring suave para movimiento fluido
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  // Gradiente que sigue el cursor (Cian)
  const background = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(34, 211, 238, 0.07), transparent 50%)`
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background,
      }}
    />
  );
}

// ============================================
// CAPA 4: SUBTLE GRID (Cuadrícula interactiva)
// ============================================
function SubtleGrid() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const gridX = useSpring(mouseX, springConfig);
  const gridY = useSpring(mouseY, springConfig);

  // Máscara que ilumina el grid donde pasa el cursor
  const maskImage = useTransform(
    [gridX, gridY],
    ([x, y]) =>
      `radial-gradient(300px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.08), transparent 60%)`
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Grid base visible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      
      {/* Grid que se ilumina con el cursor */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      />
    </>
  );
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export function HybridBackground() {
  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#030303",
        zIndex: 0,
      }}
    >
      {/* Capa 1: Dynamic Mesh */}
      <DynamicMesh />

      {/* Capa 2: Grainy Aurora */}
      <GrainyAurora />

      {/* Capa 3: Mouse Spotlight */}
      <MouseSpotlight />

      {/* Capa 4: Subtle Grid */}
      <SubtleGrid />

      {/* Viñeta en bordes */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.3) 100%),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.15) 0%, transparent 15%, transparent 85%, rgba(0, 0, 0, 0.2) 100%)
          `,
        }}
      />
    </div>
  );
}

export default HybridBackground;
