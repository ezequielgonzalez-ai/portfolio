"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * ============================================================
 * AI PARTNERS - Logos de las mejores IAs del mercado
 * ============================================================
 */

const aiPartners = [
  {
    name: "OpenAI",
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073z" />
      </svg>
    ),
    description: "GPT-4, DALL-E, Whisper",
  },
  {
    name: "Anthropic",
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-2-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
      </svg>
    ),
    description: "Claude AI",
  },
  {
    name: "Google AI",
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
    description: "Gemini, PaLM",
  },
  {
    name: "Meta AI",
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
      </svg>
    ),
    description: "Llama, Code Llama",
  },
  {
    name: "n8n",
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12 2L4 6v12l8 4 8-4V6l-8-4zm0 2.18L18 7.5v9l-6 3-6-3v-9l6-3.32z" />
      </svg>
    ),
    description: "Workflow Automation",
  },
  {
    name: "LangChain",
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    description: "LLM Framework",
  },
];

const automationTools = [
  { name: "Zapier", description: "15,000+ integrations" },
  { name: "Make", description: "Visual workflows" },
  { name: "Vercel", description: "Edge deployment" },
  { name: "Supabase", description: "Backend as a Service" },
  { name: "Pinecone", description: "Vector Database" },
  { name: "Hugging Face", description: "Model Hub" },
];

export function AIPartnersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 px-4 relative">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-[0.05]"
          style={{
            background: "radial-gradient(ellipse, rgba(139, 92, 246, 1) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-2">
            Tecnologías que utilizamos
          </h3>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Las mejores IAs del mundo, integradas para ti
          </h2>
        </motion.div>

        {/* AI Partners Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {aiPartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index }}
              className="group relative flex flex-col items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all"
            >
              <div className="text-white/40 group-hover:text-white/70 transition-colors">
                {partner.logo}
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                  {partner.name}
                </div>
                <div className="text-xs text-white/30">{partner.description}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Automation Tools */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {automationTools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.05 * index }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 text-sm"
            >
              <span className="text-white/60">{tool.name}</span>
              <span className="text-white/30 text-xs">{tool.description}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default AIPartnersSection;
