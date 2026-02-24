"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * ============================================================
 * AI MATRIX BACKGROUND - Fondo animado estilo coding + IA
 * ============================================================
 * 
 * Efectos:
 * - Código cayendo tipo Matrix pero con código IA
 * - Partículas de conexión neural
 * - Cursor spotlight
 * - Grid de coding sutil
 */

// Códigos de IA/programming que aparecen en el fondo
const AI_CODE_SNIPPETS = [
  "import openai",
  "const response = await gpt-4.chat()",
  "model.fit(X_train, y_train)",
  "async function generateAI() {",
  "const embedding = await pinecone.query()",
  "from langchain import Chain",
  "workflow.connect(n8n, slack)",
  "await claude.messages.create()",
  "const vector = embed(text)",
  "model = AutoModel.from_pretrained()",
  "def predict(input): return model(input)",
  "const tokens = tokenize(prompt)",
  "attention_weights = softmax(Q @ K.T)",
  "function automate() { return ai.run() }",
  "const context = rag.retrieve(query)",
  "agent.execute(task_sequence)",
  "pip install transformers",
  "const workflow = new Automation()",
  "output = model.generate(max_tokens=1024)",
  "import { Anthropic } from '@anthropic-ai/sdk'",
];

// Código cayendo estilo Matrix
function FallingCode({ delay = 0 }: { delay?: number }) {
  const code = useMemo(() => {
    return AI_CODE_SNIPPETS[Math.floor(Math.random() * AI_CODE_SNIPPETS.length)];
  }, []);

  const left = useMemo(() => Math.random() * 100, []);
  const duration = useMemo(() => 15 + Math.random() * 20, []);
  const size = useMemo(() => 10 + Math.random() * 4, []);

  return (
    <motion.div
      className="absolute text-[#00f5ff]/20 font-mono pointer-events-none select-none whitespace-nowrap"
      style={{
        left: `${left}%`,
        fontSize: `${size}px`,
        textShadow: "0 0 10px rgba(0, 245, 255, 0.3)",
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: ["0vh", "120vh"],
        opacity: [0, 0.6, 0.6, 0],
      }}
      transition={{
        duration,
        delay: delay + Math.random() * 10,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {code}
    </motion.div>
  );
}

// Partículas flotantes de conexión neural
function NeuralParticle({ index }: { index: number }) {
  const size = useMemo(() => 2 + Math.random() * 4, []);
  const initialX = useMemo(() => Math.random() * 100, []);
  const initialY = useMemo(() => Math.random() * 100, []);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${initialX}%`,
        top: `${initialY}%`,
        background: index % 3 === 0 
          ? "radial-gradient(circle, rgba(0, 245, 255, 0.8), transparent)"
          : index % 3 === 1
          ? "radial-gradient(circle, rgba(139, 92, 246, 0.8), transparent)"
          : "radial-gradient(circle, rgba(34, 211, 238, 0.8), transparent)",
        boxShadow: `0 0 ${size * 2}px currentColor`,
      }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay: index * 0.1,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Conexiones entre partículas (líneas)
function NeuralConnection({ particles }: { particles: { x: number; y: number }[] }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
      {particles.slice(0, 10).map((p1, i) => 
        particles.slice(i + 1, i + 3).map((p2, j) => (
          <motion.line
            key={`${i}-${j}`}
            x1={`${p1.x}%`}
            y1={`${p1.y}%`}
            x2={`${p2.x}%`}
            y2={`${p2.y}%`}
            stroke="url(#gradient)"
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{
              duration: 4,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          />
        ))
      )}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f5ff" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Cursor spotlight con efecto de código
function CodingSpotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

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
        background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
          rgba(0, 245, 255, 0.03) 0%, 
          rgba(139, 92, 246, 0.02) 25%, 
          transparent 50%)`,
      }}
    >
      <motion.div
        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: spotlightX,
          top: spotlightY,
          background: "radial-gradient(circle, rgba(0, 245, 255, 0.02), transparent 70%)",
        }}
      />
    </motion.div>
  );
}

// Grid de coding sutil
function CodingGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.02]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 245, 255, 0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 245, 255, 0.5) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    />
  );
}

// Ruido/grain
function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none opacity-[0.015]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

// Logo AI animado central
function AILogoGlow() {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0, 245, 255, 0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

// Componente principal
export function AIMatrixBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #030303 0%, #050510 50%, #030308 100%)",
        zIndex: 0,
      }}
    >
      {/* Grid base */}
      <CodingGrid />

      {/* Logo glow central */}
      <AILogoGlow />

      {/* Código cayendo */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <FallingCode key={i} delay={i * 2} />
        ))}
      </div>

      {/* Partículas neurales */}
      {Array.from({ length: 20 }).map((_, i) => (
        <NeuralParticle key={i} index={i} />
      ))}

      {/* Conexiones neurales */}
      <NeuralConnection particles={particles} />

      {/* Spotlight que sigue el cursor */}
      <CodingSpotlight />

      {/* Ruido/grain */}
      <GrainOverlay />

      {/* Viñeta */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 100%)",
        }}
      />
    </div>
  );
}

export default AIMatrixBackground;
