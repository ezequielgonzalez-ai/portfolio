import type { Metadata } from "next";

/**
 * ============================================================
 * METADATA DINÁMICO POR PÁGINA - SEO OPTIMIZADO
 * ============================================================
 */

export const homeMetadata: Metadata = {
  title: "MG Digital | Automatización con IA & Desarrollo Web",
  description: "Ahorra 40+ horas semanales con chatbots IA y automatizaciones. Implementamos GPT-4, n8n y workflows que trabajan 24/7. Consulta gratuita disponible.",
  keywords: ["automatización IA", "chatbots", "n8n", "OpenAI", "desarrollo web", "GPT-4"],
  openGraph: {
    title: "MG Digital | Automatización con IA",
    description: "Chatbots que atienden 24/7, automatizaciones que trabajan por ti. ROI garantizado.",
    images: ["/og-image.jpg"],
  },
};

export const serviciosMetadata: Metadata = {
  title: "Servicios | MG Digital - Automatización IA & Web Apps",
  description: "Catálogo completo de servicios: Chatbots IA, Automatización n8n, Desarrollo Web Next.js, Apps React Native, Consultoría IA. Precios transparentes.",
  keywords: ["servicios automatización", "chatbots precio", "desarrollo web argentina", "consultoría IA"],
  openGraph: {
    title: "Servicios | MG Digital",
    description: "Todo lo que necesitas para automatizar tu negocio con IA.",
    images: ["/og-servicios.jpg"],
  },
};

export const contactoMetadata: Metadata = {
  title: "Contacto | MG Digital - Consulta Gratuita",
  description: "Agenda una consulta gratuita de 15 minutos. Te analizamos tu negocio y te proponemos automatizaciones con ROI medible. Respuesta en 24h.",
  keywords: ["contacto", "consulta gratuita", "presupuesto automatización", "cotizar chatbot"],
  openGraph: {
    title: "Contacto | MG Digital",
    description: "Agenda tu consulta gratuita ahora.",
    images: ["/og-contacto.jpg"],
  },
};

export const blogMetadata: Metadata = {
  title: "Blog | MG Digital - Guías de Automatización IA",
  description: "Guías prácticas sobre automatización con IA, n8n, OpenAI y desarrollo web. Aprende a ahorrar tiempo y escalar tu negocio.",
  keywords: ["blog automatización", "tutoriales n8n", "guías OpenAI", "artículos IA"],
};
