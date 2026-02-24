/**
 * Site Configuration - Matias Ezequiel Gonzalez
 * Agencia de Automatización con IA & Desarrollo Web/Apps
 */

// ============================================
// SITE CONFIG - Main configuration object
// ============================================
export const siteConfig = {
  // Personal/Brand Information
  name: "Matias Ezequiel Gonzalez",
  brand: "MG Digital",
  title: "Automatización con IA & Desarrollo Web/Apps",
  headline: "Potencia tu negocio con Inteligencia Artificial",
  description: "Somos una agencia especializada en automatización con IA y desarrollo web/apps. Implementamos chatbots GPT-4, workflows con n8n, y aplicaciones que ahorran horas de trabajo manual. Desde Argentina para el mundo.",
  
  // Contact
  email: "m.ezequiel.gonzalez25@gmail.com",
  phone: "+54 9 11 XXXX-XXXX",
  location: "Argentina 🇦🇷",
  timezone: "America/Buenos_Aires",
  workingHours: "Lun-Vie 9:00-18:00 (GMT-3)",
  
  // SEO & Site
  siteUrl: "https://matiasezequielgonzalez.vercel.app",
  siteName: "MG Digital | Automatización IA & Desarrollo",
  keywords: [
    "Automatización con IA",
    "Desarrollo Web",
    "Chatbots IA",
    "n8n Automation",
    "OpenAI",
    "Desarrollo Apps",
    "Workflows Automatizados",
    "Consultoría IA",
    "Transformación Digital",
    "Inteligencia Artificial Argentina",
    "GPT-4 Integration",
    "Claude AI",
    "WhatsApp Business API",
    "React Native",
    "Next.js Development"
  ],
  
  // Social Links
  social: {
    linkedin: {
      url: "https://www.linkedin.com/in/matiasezequielgonzalez/",
      handle: "@matiasezequielgonzalez",
    },
    instagram: {
      url: "https://www.instagram.com/m.ezequiel.gonzalez/",
      handle: "@m.ezequiel.gonzalez",
    },
    workana: {
      url: "https://www.workana.com/es/talent/profile",
      handle: "Workana Profile",
    },
    email: {
      url: "mailto:m.ezequiel.gonzalez25@gmail.com",
      address: "m.ezequiel.gonzalez25@gmail.com",
    },
  },
} as const;

// ============================================
// PERSONAL INFO
// ============================================
export const personalInfo = {
  name: siteConfig.name,
  email: siteConfig.email,
  location: siteConfig.location,
  description: siteConfig.description,
  title: siteConfig.title,
};

// ============================================
// NAVIGATION
// ============================================
export const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos IA", href: "#proyectos" },
  { label: "Stack IA", href: "#stack" },
  { label: "Contacto", href: "#contacto" },
] as const;

// ============================================
// HERO HOOKS (Benefit-focused taglines)
// ============================================
export const heroHooks = [
  "Automatiza tareas repetitivas con IA",
  "Webs que convierten visitantes en clientes",
  "Chatbots que atienden 24/7 sin descanso",
  "Apps que escalan tu negocio automáticamente",
] as const;

// ============================================
// STATS
// ============================================
export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export const stats: Stat[] = [
  { value: "500", label: "Horas Ahorradas/Mes", suffix: "+" },
  { value: "50", label: "Automatizaciones IA", suffix: "+" },
  { value: "30", label: "Proyectos Web/App", suffix: "+" },
  { value: "95", label: "Satisfacción Cliente", suffix: "%" },
];

// ============================================
// SERVICES (Bento Grid) - Enfoque IA
// ============================================
export interface Service {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  detailedDescription: string;
  icon: string;
  technologies: string[];
  features: string[];
  size: "large" | "medium" | "small";
  color: string;
}

export const services: Service[] = [
  {
    id: "ai-automation",
    title: "Automatización con IA",
    shortTitle: "IA Automation",
    description: "Workflows inteligentes que trabajan 24/7 por ti",
    detailedDescription: "Implemento automatizaciones con n8n, Zapier y OpenAI que eliminan tareas repetitivas, responden emails, procesan datos y conectan tus herramientas automáticamente.",
    icon: "Brain",
    technologies: ["n8n", "OpenAI", "Zapier", "Make"],
    features: ["Workflows 24/7", "Sin código", "Ahorra 10+ hrs/semana", "ROI medible"],
    size: "large",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "ai-chatbots",
    title: "Chatbots con IA",
    shortTitle: "Chatbots",
    description: "Asistentes virtuales que entienden y responden",
    detailedDescription: "Chatbots inteligentes con GPT-4 y Claude que atienden clientes, responden preguntas frecuentes, agendan citas y venden automáticamente en WhatsApp, Web o Telegram.",
    icon: "MessageSquare",
    technologies: ["GPT-4", "Claude", "WhatsApp API", "Telegram"],
    features: ["Atención 24/7", "Multi-plataforma", "Memoria contextual", "Lead scoring"],
    size: "large",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "web-development",
    title: "Desarrollo Web Premium",
    shortTitle: "Web Dev",
    description: "Sitios web que convierten y posicionan",
    detailedDescription: "Webs modernas con Next.js optimizadas para SEO, velocidad y conversión. Landing pages, e-commerce, dashboards y aplicaciones web completas.",
    icon: "Globe",
    technologies: ["Next.js 15", "React", "TypeScript", "Tailwind"],
    features: ["SEO Optimizado", "90+ Lighthouse", "Responsive", "Analytics"],
    size: "medium",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "app-development",
    title: "Apps Multiplataforma",
    shortTitle: "Apps",
    description: "Apps para iOS y Android con un solo código",
    detailedDescription: "Aplicaciones móviles con React Native/Expo que funcionan en iOS y Android. Desde apps de productividad hasta marketplaces completos.",
    icon: "Smartphone",
    technologies: ["React Native", "Expo", "Firebase", "Supabase"],
    features: ["iOS + Android", "Push notifications", "Offline mode", "Updates OTA"],
    size: "medium",
    color: "from-orange-500 to-red-500",
  },
  {
    id: "ai-integration",
    title: "Integración IA en tu Negocio",
    shortTitle: "IA Integration",
    description: "Potencia tus sistemas con inteligencia artificial",
    detailedDescription: "Integro IA en tus sistemas existentes: análisis de documentos, procesamiento de voz, generación de contenido, clasificación automática y más.",
    icon: "Cpu",
    technologies: ["OpenAI API", "Anthropic", "LangChain", "Pinecone"],
    features: ["RAG Systems", "Document AI", "Voice AI", "Content Gen"],
    size: "small",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "consulting",
    title: "Consultoría en IA",
    shortTitle: "Consultoría",
    description: "Estrategia para implementar IA correctamente",
    detailedDescription: "Te asesoro sobre qué herramientas de IA usar, cómo automatizar procesos y qué ROI esperar. Sin técnico, solo resultados claros.",
    icon: "Lightbulb",
    technologies: ["Análisis", "Estrategia", "ROI", "Roadmap"],
    features: ["Auditoría procesos", "Roadmap IA", "Capacitación", "Soporte"],
    size: "small",
    color: "from-amber-500 to-yellow-600",
  },
];

// ============================================
// TECH STACK
// ============================================
export interface Tech {
  name: string;
  icon: string;
  category: "ai" | "automation" | "frontend" | "backend" | "tools";
  proficiency: number;
}

export const techStack: Tech[] = [
  // AI & LLMs
  { name: "OpenAI GPT-4", icon: "openai", category: "ai", proficiency: 95 },
  { name: "Claude AI", icon: "claude", category: "ai", proficiency: 92 },
  { name: "LangChain", icon: "langchain", category: "ai", proficiency: 88 },
  { name: "Pinecone", icon: "pinecone", category: "ai", proficiency: 85 },
  // Automation
  { name: "n8n", icon: "n8n", category: "automation", proficiency: 95 },
  { name: "Zapier", icon: "zapier", category: "automation", proficiency: 90 },
  { name: "Make", icon: "make", category: "automation", proficiency: 88 },
  // Frontend
  { name: "Next.js", icon: "nextjs", category: "frontend", proficiency: 95 },
  { name: "React", icon: "react", category: "frontend", proficiency: 95 },
  { name: "TypeScript", icon: "typescript", category: "frontend", proficiency: 90 },
  // Backend
  { name: "Node.js", icon: "nodejs", category: "backend", proficiency: 88 },
  { name: "Python", icon: "python", category: "backend", proficiency: 85 },
  { name: "Supabase", icon: "supabase", category: "backend", proficiency: 90 },
  // Tools
  { name: "Vercel", icon: "vercel", category: "tools", proficiency: 95 },
  { name: "Docker", icon: "docker", category: "tools", proficiency: 80 },
];

// ============================================
// TESTIMONIALS
// ============================================
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
  rating: number;
  project?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Carlos M.",
    role: "CEO",
    company: "E-commerce Startup",
    quote: "Implementó un chatbot con IA que maneja el 80% de nuestras consultas. Ahorramos más de 40 horas semanales en atención al cliente. Increíble ROI.",
    rating: 5,
    project: "Chatbot IA WhatsApp",
  },
  {
    id: "t2",
    name: "Andrea L.",
    role: "Directora de Operaciones",
    company: "Agencia Marketing",
    quote: "Las automatizaciones con n8n que creó para nosotros procesan 500+ leads diarios automáticamente. Nuestro equipo ahora se enfoca en cerrar ventas, no en tareas repetitivas.",
    rating: 5,
    project: "Automatización Lead Management",
  },
  {
    id: "t3",
    name: "Roberto S.",
    role: "Founder",
    company: "SaaS Startup",
    quote: "Desarrolló nuestra web y app en tiempo récord. El dashboard con IA que integró analiza datos y genera reportes automáticamente. Juego cambiador.",
    rating: 5,
    project: "Web + App + Dashboard IA",
  },
];

// ============================================
// PROJECTS - Enfoque IA y Automatización
// ============================================
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: "ai" | "automation" | "web" | "app";
  year: string;
  results?: string;
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Chatbot IA WhatsApp Business",
    description: "Asistente virtual que atiende, cualifica y agenda clientes 24/7",
    longDescription: "Chatbot con GPT-4 integrado a WhatsApp Business que responde consultas, cualifica leads, agenda citas y envía recordatorios automáticos. Maneja 1000+ conversaciones diarias.",
    image: "/projects/chatbot.png",
    technologies: ["OpenAI GPT-4", "WhatsApp API", "n8n", "Supabase"],
    liveUrl: "#",
    featured: true,
    category: "ai",
    year: "2025",
    results: "80% consultas automatizadas, 40hrs/semana ahorradas",
  },
  {
    id: "project-2",
    title: "Automatización Lead Management",
    description: "Sistema que captura, cualifica y distribuye leads automáticamente",
    longDescription: "Pipeline automatizado que captura leads de múltiples fuentes (web, ads, redes), los cualifica con IA, los asigna al vendedor correcto y genera seguimientos automáticos.",
    image: "/projects/automation.png",
    technologies: ["n8n", "OpenAI", "HubSpot", "Slack"],
    liveUrl: "#",
    featured: true,
    category: "automation",
    year: "2025",
    results: "500+ leads/día procesados, 60% más conversiones",
  },
  {
    id: "project-3",
    title: "Dashboard IA para E-commerce",
    description: "Panel inteligente con análisis predictivo y automatizaciones",
    longDescription: "Dashboard web que conecta con Shopify/MercadoLibre, analiza ventas con IA, predice demanda y genera reportes automáticos con insights accionables.",
    image: "/projects/dashboard.png",
    technologies: ["Next.js", "OpenAI", "PostgreSQL", "Chart.js"],
    liveUrl: "#",
    featured: true,
    category: "web",
    year: "2024",
    results: "30% mejora en gestión de inventario",
  },
  {
    id: "project-4",
    title: "App de Productividad con IA",
    description: "App móvil que organiza tareas y genera contenido automáticamente",
    longDescription: "App multiplataforma con IA que transcribe reuniones, genera resúmenes, crea tareas automáticamente y sugiere prioridades basadas en patrones de uso.",
    image: "/projects/app.png",
    technologies: ["React Native", "Expo", "OpenAI Whisper", "GPT-4"],
    liveUrl: "#",
    featured: false,
    category: "app",
    year: "2024",
    results: "2000+ usuarios activos, 4.8★ en stores",
  },
  {
    id: "project-5",
    title: "Generador de Contenido IA",
    description: "Sistema que crea y publica contenido para redes sociales",
    longDescription: "Automatización con IA que genera contenido para Instagram, LinkedIn y Twitter, revisa con el equipo vía Slack, y programa automáticamente en horarios óptimos.",
    image: "/projects/content.png",
    technologies: ["GPT-4", "DALL-E", "n8n", "Buffer API"],
    liveUrl: "#",
    featured: false,
    category: "automation",
    year: "2024",
    results: "50+ posts/mes automatizados",
  },
];

// ============================================
// EXPERIENCE TIMELINE
// ============================================
export interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  achievements: string[];
  startDate: string;
  endDate: string;
  technologies: string[];
  current?: boolean;
  type: "work" | "freelance" | "education";
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "MG Digital Studio",
    role: "Founder & AI Developer",
    description: "Agencia especializada en automatización con IA y desarrollo web/app. Ayudo a negocios a implementar soluciones inteligentes que ahorran tiempo y escalan operaciones.",
    achievements: [
      "50+ automatizaciones con IA implementadas",
      "Chatbots que manejan 10,000+ conversaciones/mes",
      "Clientes en 8+ países",
      "ROI promedio de 300% en 3 meses",
    ],
    startDate: "2023",
    endDate: "Presente",
    technologies: ["OpenAI", "n8n", "Next.js", "React Native"],
    current: true,
    type: "freelance",
  },
  {
    id: "exp-2",
    company: "Freelance - Workana",
    role: "Desarrollador Full Stack",
    description: "Desarrollo de aplicaciones web y móviles para clientes internacionales. Especialización progresiva en soluciones con IA y automatización.",
    achievements: [
      "30+ proyectos completados",
      "Rating 5 estrellas sostenido",
      "Clientes recurrentes del 80%",
      "Especialización en IA y automatización",
    ],
    startDate: "2021",
    endDate: "2023",
    technologies: ["React", "Node.js", "PostgreSQL", "Python"],
    current: false,
    type: "freelance",
  },
  {
    id: "exp-3",
    company: "Formación Continua",
    role: "Especialización en IA & Automatización",
    description: "Certificaciones y proyectos intensivos en Inteligencia Artificial, Machine Learning y Automatización de procesos con herramientas modernas.",
    achievements: [
      "Certificación en OpenAI & LLMs",
      "Especialización en n8n Automation",
      "Proyectos personales con GPT-4 y Claude",
      "Comunidad activa de AI developers",
    ],
    startDate: "2020",
    endDate: "2021",
    technologies: ["Python", "TensorFlow", "OpenAI", "n8n"],
    current: false,
    type: "education",
  },
];

// ============================================
// SOCIAL LINKS
// ============================================
export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  color?: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/matiasezequielgonzalez/",
    icon: "Linkedin",
    color: "#0A66C2",
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/m.ezequiel.gonzalez/",
    icon: "Instagram",
    color: "#E4405F",
  },
  {
    id: "workana",
    name: "Workana",
    url: "https://www.workana.com/es/talent/profile",
    icon: "Briefcase",
    color: "#2D9CDB",
  },
  {
    id: "email",
    name: "Email",
    url: "mailto:m.ezequiel.gonzalez25@gmail.com",
    icon: "Mail",
    color: "#EA4335",
  },
];

// ============================================
// CTA CONFIGURATION
// ============================================
export const ctaConfig = {
  primary: {
    text: "Agendar Consulta IA",
    href: "#contacto",
  },
  secondary: {
    text: "Ver Casos de Éxito",
    href: "#proyectos",
  },
} as const;
