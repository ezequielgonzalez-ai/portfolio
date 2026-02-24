"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Layout,
  Palette,
  Server,
  Cloud,
  Smartphone,
  Briefcase,
  ExternalLink,
  Github,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { services, projects, type Service } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layout,
  Palette,
  Server,
  Cloud,
  Smartphone,
  Briefcase,
};

/**
 * TiltCard - Card with 3D tilt effect on mouse move
 */
function useTilt(strength: number = 20) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { rotateX, rotateY, handleMouseMove, handleMouseLeave };
}

/**
 * ServiceCard - Interactive bento card with multiple info levels
 * Level 1: Icon + Title (default)
 * Level 2: Description + Technologies (hover)
 * Level 3: Features (expanded)
 */
function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt(8);
  
  const Icon = iconMap[service.icon] || Layout;
  
  // Grid size classes
  const sizeClasses = {
    large: "md:col-span-2 md:row-span-2",
    medium: "md:col-span-1 md:row-span-2",
    small: "md:col-span-1 md:row-span-1",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn(
        "group relative bg-card border border-border rounded-2xl overflow-hidden",
        "transition-all duration-300",
        "hover:border-primary/30",
        sizeClasses[service.size]
      )}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        className="relative h-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          setIsHovered(true);
          handleMouseMove(e);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseLeave();
        }}
      >
        {/* Animated border gradient */}
        <motion.div
          className="absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-500"
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{
            background: `linear-gradient(135deg, 
              rgba(99, 102, 241, 0.8) 0%, 
              rgba(139, 92, 246, 0.4) 25%, 
              transparent 50%,
              rgba(236, 72, 153, 0.4) 75%,
              rgba(99, 102, 241, 0.8) 100%
            )`,
          }}
        />

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl transition-opacity duration-500"
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.15), transparent 60%)`,
          }}
        />

        <div className="relative p-6 h-full flex flex-col bg-card rounded-2xl">
          {/* Icon */}
          <div className="relative mb-4">
            <motion.div
              className={cn(
                "inline-flex items-center justify-center rounded-xl",
                service.size === "large" ? "w-14 h-14" : "w-12 h-12",
                "bg-gradient-to-br from-primary/20 to-purple-500/20",
                "border border-border"
              )}
              animate={isHovered ? { scale: 1.05, rotate: 5 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Icon
                className={cn(
                  service.size === "large" ? "w-7 h-7" : "w-6 h-6",
                  "text-primary"
                )}
              />
            </motion.div>
          </div>

          {/* Content */}
          <div className="relative flex-1">
            <h3
              className={cn(
                "font-bold text-foreground mb-2",
                service.size === "large" ? "text-2xl" : "text-xl"
              )}
            >
              {service.title}
            </h3>
            
            {/* Description - visible on hover or always for large cards */}
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={isHovered || service.size === "large" ? { opacity: 1, height: "auto" } : {}}
              transition={{ duration: 0.3 }}
              className={cn(
                "text-foreground/60 mb-4 overflow-hidden",
                service.size === "small" ? "text-sm" : "text-base"
              )}
            >
              {service.description}
            </motion.p>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isHovered ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-wrap gap-2"
            >
              {service.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium bg-foreground/5 text-foreground/70 rounded-full border border-border"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* Features (Expanded) */}
            {isExpanded && service.features && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-border"
              >
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Expand button for large cards */}
          {service.size === "large" && service.features && (
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
              whileHover={{ x: 2 }}
            >
              {isExpanded ? (
                <>
                  Ver menos <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Ver más <ChevronDown className="w-4 h-4" />
                </>
              )}
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * SkillsSection - Bento grid of services
 */
export function SkillsSection() {
  return (
    <section id="servicios" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Servicios
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Soluciones digitales completas para llevar tu proyecto al siguiente nivel
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * ProjectCard - Individual project card with hover effects
 */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt(5);
  
  const isFeatured = project.featured;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group relative bg-card border border-border rounded-2xl overflow-hidden",
        "transition-all duration-300",
        "hover:border-primary/30",
        isFeatured ? "md:col-span-2" : "md:col-span-1"
      )}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="h-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          setIsHovered(true);
          handleMouseMove(e);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseLeave();
        }}
      >
        {/* Animated border gradient */}
        <motion.div
          className="absolute -inset-[1px] rounded-2xl opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{
            background: `linear-gradient(135deg, 
              rgba(99, 102, 241, 0.8) 0%, 
              rgba(139, 92, 246, 0.4) 25%, 
              transparent 50%,
              rgba(236, 72, 153, 0.4) 75%,
              rgba(99, 102, 241, 0.8) 100%
            )`,
          }}
        />

        {/* Project Image Placeholder */}
        <div
          className={cn(
            "relative overflow-hidden rounded-t-2xl",
            isFeatured ? "h-64 md:h-80" : "h-48"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/20" />
          <div className="absolute inset-0 bg-card/60" />
          
          {/* Animated pattern */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={isHovered ? { opacity: 0.15 } : { opacity: 0.1 }}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          
          {/* Featured badge */}
          {isFeatured && (
            <motion.div
              className="absolute top-4 left-4"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <span className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                Destacado
              </span>
            </motion.div>
          )}

          {/* Year badge */}
          <div className="absolute top-4 right-4">
            <span className="px-2 py-1 text-xs font-medium bg-foreground/10 text-foreground/60 rounded-full">
              {project.year}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 bg-card rounded-b-2xl">
          <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
          <p className="text-foreground/60 mb-4 text-sm line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium bg-foreground/5 text-foreground/70 rounded-full border border-border"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="w-4 h-4" />
                Ver sitio
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="w-4 h-4" />
                Código
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * ProjectsSection - Grid of projects
 */
export function ProjectsSection() {
  return (
    <section id="proyectos" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Proyectos
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Una selección de trabajos recientes que demuestran mi experiencia
            en desarrollo y diseño
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
