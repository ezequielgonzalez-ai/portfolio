"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { 
  Brain, MessageSquare, Globe, Smartphone, 
  Cpu, Lightbulb, Zap, ArrowRight, Check,
  Bot, Workflow, Code2, Rocket
} from "lucide-react";

/**
 * ============================================================
 * SERVICIOS PAGE - Catálogo Detallado
 * ============================================================
 */

const servicios = [
  {
    id: "automatizacion-ia",
    icon: Brain,
    title: "Automatización con IA",
    subtitle: "Workflows que trabajan 24/7",
    description: "Implementamos automatizaciones inteligentes con n8n, Zapier y OpenAI que eliminan tareas repetitivas de tu negocio.",
    features: [
      "Procesamiento automático de emails",
      "Integración con CRMs y herramientas",
      "Reportes automáticos",
      "Ahorro de 10+ horas semanales",
    ],
    technologies: ["n8n", "OpenAI", "Zapier", "Make"],
    price: "Desde $500 USD",
    popular: true,
  },
  {
    id: "chatbots-ia",
    icon: MessageSquare,
    title: "Chatbots con IA",
    subtitle: "Atención 24/7 sin descanso",
    description: "Asistentes virtuales con GPT-4 y Claude que atienden clientes, responden preguntas y agendan citas automáticamente.",
    features: [
      "Integración WhatsApp Business",
      "Memoria contextual",
      "Lead scoring automático",
      "Manejo de múltiples conversaciones",
    ],
    technologies: ["GPT-4", "Claude", "WhatsApp API", "Telegram"],
    price: "Desde $800 USD",
    popular: true,
  },
  {
    id: "desarrollo-web",
    icon: Globe,
    title: "Desarrollo Web Premium",
    subtitle: "Webs que convierten",
    description: "Sitios web modernos con Next.js, optimizados para SEO, velocidad y conversión. Landing pages y e-commerce.",
    features: [
      "SEO optimizado (90+ Lighthouse)",
      "Diseño responsive",
      "Analytics integrado",
      "Panel de administración",
    ],
    technologies: ["Next.js 15", "React", "TypeScript", "Tailwind"],
    price: "Desde $1,500 USD",
    popular: false,
  },
  {
    id: "apps-moviles",
    icon: Smartphone,
    title: "Apps Multiplataforma",
    subtitle: "iOS + Android en uno",
    description: "Aplicaciones móviles con React Native que funcionan en iOS y Android. Desde apps de productividad hasta marketplaces.",
    features: [
      "Un código, dos plataformas",
      "Push notifications",
      "Modo offline",
      "Actualizaciones OTA",
    ],
    technologies: ["React Native", "Expo", "Firebase", "Supabase"],
    price: "Desde $3,000 USD",
    popular: false,
  },
  {
    id: "integracion-ia",
    icon: Cpu,
    title: "Integración IA en Sistemas",
    subtitle: "Potencia tus herramientas",
    description: "Integramos IA en tus sistemas existentes: análisis de documentos, procesamiento de voz, clasificación automática.",
    features: [
      "RAG Systems (búsqueda inteligente)",
      "Document AI",
      "Voice AI y transcripción",
      "Generación de contenido",
    ],
    technologies: ["LangChain", "Pinecone", "OpenAI API", "Anthropic"],
    price: "Desde $1,200 USD",
    popular: false,
  },
  {
    id: "consultoria",
    icon: Lightbulb,
    title: "Consultoría en IA",
    subtitle: "Estrategia clara",
    description: "Te asesoramos sobre qué herramientas de IA usar, cómo automatizar procesos y qué ROI esperar. Sin tecnicismos.",
    features: [
      "Auditoría de procesos",
      "Roadmap de implementación",
      "Capacitación del equipo",
      "Soporte post-consultoría",
    ],
    technologies: ["Análisis", "Estrategia", "ROI", "Roadmap"],
    price: "Desde $300 USD",
    popular: false,
  },
];

const processSteps = [
  { icon: Bot, title: "Consulta", description: "Analizamos tu negocio y detectamos oportunidades" },
  { icon: Workflow, title: "Propuesta", description: "Diseñamos la solución con presupuesto cerrado" },
  { icon: Code2, title: "Desarrollo", description: "Implementamos con reportes de progreso" },
  { icon: Rocket, title: "Entrega", description: "Lanzamos + 30 días de soporte" },
];

export function ServiciosPage() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  const processInView = useInView(processRef, { once: true, margin: "-100px" });

  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section ref={heroRef} className="max-w-5xl mx-auto px-4 sm:px-6 text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Servicios de
            <span className="block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Automatización & Desarrollo
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto">
            Soluciones completas para transformar tu negocio con IA. 
            Precios transparentes, resultados medibles.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map((servicio, index) => (
            <motion.div
              key={servicio.id}
              initial={{ opacity: 0, y: 30 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className={`relative group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all ${
                servicio.popular ? "ring-2 ring-violet-500/50" : ""
              }`}
            >
              {servicio.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-violet-500 text-white text-xs font-medium rounded-full">
                  Más Popular
                </div>
              )}

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                <servicio.icon className="w-6 h-6 text-violet-400" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-1">{servicio.title}</h3>
              <p className="text-sm text-violet-400 mb-3">{servicio.subtitle}</p>
              <p className="text-sm text-white/50 mb-4">{servicio.description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-4">
                {servicio.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-white/60">
                    <Check className="w-4 h-4 text-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {servicio.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Price */}
              <div className="pt-4 border-t border-white/5">
                <p className="text-lg font-semibold text-white">{servicio.price}</p>
              </div>

              {/* CTA */}
              <Link href="/contacto" className="block mt-4">
                <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  Solicitar
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section ref={processRef} className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={processInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">¿Cómo trabajamos?</h2>
          <p className="text-white/50">Proceso simple y transparente</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 text-white font-bold">
                {index + 1}
              </div>
              <step.icon className="w-6 h-6 text-violet-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-white/50">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ServiciosPage;
