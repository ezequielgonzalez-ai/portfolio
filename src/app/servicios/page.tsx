import { Metadata } from "next";
import { ServiciosPage } from "./page-content";

export const metadata: Metadata = {
  title: "Servicios | MG Digital - Automatización IA & Web Apps",
  description: "Catálogo completo de servicios: Chatbots IA, Automatización n8n, Desarrollo Web Next.js, Apps React Native, Consultoría IA. Precios transparentes.",
  keywords: ["servicios automatización", "chatbots precio", "desarrollo web argentina", "consultoría IA"],
  openGraph: {
    title: "Servicios | MG Digital",
    description: "Todo lo que necesitas para automatizar tu negocio con IA.",
    images: ["/og-servicios.jpg"],
  },
};

export default function Page() {
  return <ServiciosPage />;
}
