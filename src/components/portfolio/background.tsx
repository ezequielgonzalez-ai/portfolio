"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * ============================================================
 * PREMIUM BACKGROUND COMPONENT
 * ============================================================
 * 
 * Efectos incluidos:
 * - Glassmorphism Noise (textura orgánica)
 * - Mesh Gradients animados (Lava Lamp style)
 * - Spotlight que sigue el cursor
 * - Optimizado para 60fps
 */

// Componente de esfera de luz animada
function MeshSphere({
  color,
  initialX,
  initialY,
  size,
  duration,
}: {
  color: string;
  initialX: number;
  initialY: number;
  size: number;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(100px)",
        width: size,
        height: size,
        left: initialX,
        top: initialY,
        willChange: "transform",
      }}
      animate={{
        x: [0, 100, -50, 0],
        y: [0, -80, 60, 0],
        scale: [1, 1.2, 0.9, 1],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  );
}

// Componente de Spotlight que sigue el cursor
function CursorSpotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  const background = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) =>
      `radial-gradient(800px circle at ${x}px ${y}px, rgba(99, 102, 241, 0.06), transparent 50%)`
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
      className="fixed inset-0 pointer-events-none"
      style={{
        background,
        zIndex: 1,
      }}
    />
  );
}

// Componente de ruido estático (Grainy Texture)
function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 2,
        opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}

// Componente principal de Background
export function Background() {
  // Esferas con colores Cyber-Pastel más visibles
  const spheres = [
    { color: "rgba(79, 70, 229, 0.5)", x: 10, y: 20, size: 600, duration: 25 }, // Violeta
    { color: "rgba(6, 182, 212, 0.45)", x: 70, y: 60, size: 550, duration: 30 }, // Cian
    { color: "rgba(16, 185, 129, 0.4)", x: 50, y: 10, size: 500, duration: 22 }, // Esmeralda
    { color: "rgba(139, 92, 246, 0.45)", x: 20, y: 70, size: 580, duration: 28 }, // Violeta claro
  ];

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        background: "#030303",
        zIndex: 0,
      }}
    >
      {/* Mesh Gradients animados (Lava Lamp) */}
      <div className="absolute inset-0 overflow-hidden">
        {spheres.map((sphere, index) => (
          <MeshSphere
            key={index}
            color={sphere.color}
            initialX={sphere.x}
            initialY={sphere.y}
            size={sphere.size}
            duration={sphere.duration}
          />
        ))}
      </div>

      {/* Spotlight que sigue el cursor */}
      <CursorSpotlight />

      {/* Capa de ruido (Grainy Texture) */}
      <NoiseOverlay />

      {/* Viñeta en los bordes */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 100%)",
          zIndex: 3,
        }}
      />
    </div>
  );
}

export default Background;
