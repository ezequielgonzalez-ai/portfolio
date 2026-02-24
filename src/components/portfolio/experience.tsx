"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin, Mail, ArrowRight } from "lucide-react";
import { experiences, siteConfig } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

/**
 * ExperienceCard - Individual experience card in timeline
 */
function ExperienceCard({
  experience,
  index,
  isLast,
}: {
  experience: (typeof experiences)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative pl-8 md:pl-0"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-12 w-px h-full bg-gradient-to-b from-border to-transparent" />
      )}

      {/* Grid layout for desktop */}
      <div className="md:grid md:grid-cols-2 md:gap-8">
        {/* Date - Left side on desktop (only for odd indexes) */}
        <div
          className={cn(
            "hidden md:flex items-start justify-end",
            index % 2 === 0 ? "md:order-1 md:text-right" : "md:order-2"
          )}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.15 + 0.1 }}
            className={cn(
              "flex items-center gap-2 px-4 py-2",
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            )}
          >
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/60">
              {experience.startDate} - {experience.endDate}
            </span>
          </motion.div>
        </div>

        {/* Timeline dot */}
        <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.15 }}
            className={cn(
              "w-6 h-6 rounded-full border-2 border-primary bg-background",
              "flex items-center justify-center"
            )}
          >
            <div className="w-2 h-2 rounded-full bg-primary" />
          </motion.div>
        </div>

        {/* Content card */}
        <div className={cn("md:col-span-1", index % 2 === 0 ? "md:order-2" : "md:order-1")}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.1 }}
            className={cn(
              "group relative bg-card border border-border rounded-2xl p-6",
              "transition-all duration-300",
              "hover:border-primary/30"
            )}
          >
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl">
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `radial-gradient(circle at center, rgba(99, 102, 241, 0.1), transparent 70%)`,
                }}
              />
            </div>

            {/* Mobile date */}
            <div className="flex md:hidden items-center gap-2 mb-4 text-foreground/50">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {experience.startDate} - {experience.endDate}
              </span>
            </div>

            {/* Header */}
            <div className="relative mb-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-border flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {experience.role}
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    {experience.company}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="relative text-foreground/50 text-sm leading-relaxed mb-4">
              {experience.description}
            </p>

            {/* Technologies */}
            <div className="relative flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium bg-foreground/5 text-foreground/60 rounded-full border border-border"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Current badge */}
            {experience.current && (
              <div className="absolute top-4 right-4">
                <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full border border-green-500/20">
                  Actual
                </span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Empty space for even cards on desktop */}
        <div className="hidden md:block md:col-span-1" />
      </div>
    </motion.div>
  );
}

/**
 * ExperienceSection - Vertical timeline of experience
 */
export function ExperienceSection() {
  return (
    <section id="experiencia" className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Experiencia
          </h2>
          <p className="text-lg text-foreground/50 max-w-2xl mx-auto">
            Mi trayectoria profesional, construyendo productos y equipos
            a lo largo de los años.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-8 md:space-y-12">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * ContactSection - Contact form and info
 */
export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contacto" className="py-24 px-4 relative">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.1]">
          <div
            className="w-full h-full"
            style={{
              background: "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.8) 0%, transparent 70%)",
            }}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Contacto
          </h2>
          <p className="text-lg text-foreground/50 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? Me encantaría escucharte.
            Escríbeme y hagamos algo increíble juntos.
          </p>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative bg-card border border-border rounded-2xl p-8 md:p-12 overflow-hidden"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.2), transparent 50%)`,
              }}
            />
          </div>

          <div className="relative">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Hablemos
                </h3>
                <p className="text-foreground/50 mb-6">
                  Estoy disponible para proyectos freelance, colaboraciones
                  y oportunidades de trabajo a tiempo completo.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-foreground/60">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>{siteConfig.location}</span>
                  </div>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-3 text-foreground/60 hover:text-primary transition-colors"
                  >
                    <Mail className="w-5 h-5 text-primary" />
                    <span>{siteConfig.email}</span>
                  </a>
                </div>

                {/* Social Links */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-foreground/40 mb-3">Sígueme en:</p>
                  <div className="flex gap-3">
                    {Object.entries(siteConfig.social).map(([key, value]) => {
                      if (key === "email") return null;
                      return (
                        <motion.a
                          key={key}
                          href={value.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-xl bg-foreground/5 border border-border flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-primary/30 transition-all"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {key === "linkedin" && (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          )}
                          {key === "instagram" && (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          )}
                          {key === "workana" && (
                            <Briefcase className="w-5 h-5" />
                          )}
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col items-start md:items-end justify-center gap-4">
                <div className="text-right">
                  <motion.a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Enviar email
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </div>
                <p className="text-sm text-foreground/40 text-right">
                  Respuesta en menos de 24 horas
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
