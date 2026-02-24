"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Send, Clock, MapPin, Mail, Phone, 
  CheckCircle, Sparkles, Zap, MessageSquare
} from "lucide-react";

/**
 * ============================================================
 * CONTACTO PAGE - Formulario de Alta Velocidad
 * ============================================================
 * 
 * Optimizado para:
 * - Máxima conversión
 * - Velocidad de carga
 * - Validación en tiempo real
 * - Honeypot anti-spam
 */

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "m.ezequiel.gonzalez25@gmail.com",
    href: "mailto:m.ezequiel.gonzalez25@gmail.com",
  },
  {
    icon: Phone,
    title: "WhatsApp",
    value: "+54 9 11 XXXX-XXXX",
    href: "https://wa.me/54XXXXXXXXXX",
  },
  {
    icon: MapPin,
    title: "Ubicación",
    value: "Argentina (GMT-3)",
    href: "#",
  },
  {
    icon: Clock,
    title: "Horario",
    value: "Lun-Vie 9:00-18:00",
    href: "#",
  },
];

const services = [
  "Automatización con IA",
  "Chatbots Inteligentes",
  "Desarrollo Web",
  "Apps Móviles",
  "Consultoría IA",
  "Otro",
];

const budgets = [
  "Menos de $500 USD",
  "$500 - $1,500 USD",
  "$1,500 - $5,000 USD",
  "Más de $5,000 USD",
];

export function ContactoPage() {
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: "-50px" });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
    website: "", // Honeypot
  });
  
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formLoadTime] = useMemo(() => [Date.now()], []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.website) {
      setStatus("success"); // Fake success for bots
      return;
    }

    // Time check (too fast = bot)
    if (Date.now() - formLoadTime < 3000) {
      setStatus("success");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", service: "", budget: "", message: "", website: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-300">Respuesta en menos de 24h</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Agenda tu
            <span className="block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Consulta Gratuita
            </span>
          </h1>
          
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Te analizamos tu negocio y te proponemos automatizaciones con ROI medible. Sin compromiso.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">Información de contacto</h3>
              <div className="space-y-4">
                {contactMethods.map((method) => (
                  <a
                    key={method.title}
                    href={method.href}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                      <method.icon className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white/50">{method.title}</p>
                      <p className="text-white group-hover:text-violet-400 transition-colors">
                        {method.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border border-violet-500/20">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-violet-400" />
                ¿Qué incluye la consulta?
              </h3>
              <ul className="space-y-3">
                {[
                  "Análisis de tus procesos actuales",
                  "Identificación de automatizaciones",
                  "Estimación de ROI potencial",
                  "Propuesta sin compromiso",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/70">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 30 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5">
              {/* Honeypot */}
              <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-white/60 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-violet-500/50 focus:outline-none transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-white/60 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-violet-500/50 focus:outline-none transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="company" className="block text-sm text-white/60 mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-violet-500/50 focus:outline-none transition-colors"
                    placeholder="Tu empresa"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm text-white/60 mb-2">
                    Servicio de interés
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-violet-500/50 focus:outline-none transition-colors"
                  >
                    <option value="" className="bg-[#0a0a0a]">Selecciona...</option>
                    {services.map((s) => (
                      <option key={s} value={s} className="bg-[#0a0a0a]">{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="budget" className="block text-sm text-white/60 mb-2">
                  Presupuesto aproximado
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-violet-500/50 focus:outline-none transition-colors"
                >
                  <option value="" className="bg-[#0a0a0a]">Selecciona...</option>
                  {budgets.map((b) => (
                    <option key={b} value={b} className="bg-[#0a0a0a]">{b}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm text-white/60 mb-2">
                  Cuéntanos sobre tu proyecto *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-violet-500/50 focus:outline-none transition-colors resize-none"
                  placeholder="¿Qué quieres automatizar o desarrollar?"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-lg shadow-lg shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === "sending" ? (
                  "Enviando..."
                ) : (
                  <>
                    <MessageSquare className="w-5 h-5" />
                    Enviar Solicitud
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center"
                >
                  ¡Mensaje enviado! Te responderemos en menos de 24 horas.
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-center"
                >
                  Hubo un error. Intenta de nuevo o contáctanos por email.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

export default ContactoPage;
