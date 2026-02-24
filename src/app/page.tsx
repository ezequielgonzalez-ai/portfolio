import { HeroCRO } from "@/components/portfolio/hero-cro";
import { AIPartnersSection } from "@/components/portfolio/ai-partners";
import { FeaturesSection } from "@/components/portfolio/features";
import { SkillsSection, ProjectsSection } from "@/components/portfolio/bento-grid";
import { TechStackSection } from "@/components/portfolio/tech-stack";
import { SocialProofSection } from "@/components/portfolio/social-proof";
import { ExperienceSection, ContactSection } from "@/components/portfolio/experience";
import { Footer } from "@/components/portfolio/footer";

/**
 * ============================================================
 * HOME PAGE - CRO OPTIMIZADO
 * ============================================================
 * 
 * Objetivo: Convertir visitas en leads
 * 
 * Estructura Above the Fold:
 * 1. Hero CRO (H1 magnético + CTA con glow + Social Proof)
 * 
 * Estructura completa:
 * 1. Hero CRO
 * 2. AI Partners (credibilidad instantánea)
 * 3. Services Bento Grid
 * 4. Features (beneficios)
 * 5. Tech Stack
 * 6. Social Proof
 * 7. Projects
 * 8. Experience
 * 9. Contact CTA
 * 10. Footer
 * 
 * LCP Optimizado: Hero carga en <1.2s
 */
export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Above the Fold - Hero CRO */}
      <HeroCRO />

      {/* AI Partners - Credibilidad instantánea */}
      <AIPartnersSection />

      {/* Services/Skills Section (Bento Grid) */}
      <SkillsSection />

      {/* Features - Why choose us */}
      <FeaturesSection />

      {/* Tech Stack - Infinite moving cards */}
      <TechStackSection />

      {/* Social Proof - Build trust with testimonials */}
      <SocialProofSection />

      {/* Projects Section - Proof of work */}
      <ProjectsSection />

      {/* Experience Section (Timeline) */}
      <ExperienceSection />

      {/* Contact Section - Conversion point */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
