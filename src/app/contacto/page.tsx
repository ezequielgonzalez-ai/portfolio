import { Metadata } from "next";
import { ContactoPage } from "./page-content";

export const metadata: Metadata = {
  title: "Contacto | MG Digital - Consulta Gratuita",
  description: "Agenda una consulta gratuita de 15 minutos. Te analizamos tu negocio y te proponemos automatizaciones con ROI medible. Respuesta en 24h.",
  keywords: ["contacto", "consulta gratuita", "presupuesto automatización", "cotizar chatbot"],
  openGraph: {
    title: "Contacto | MG Digital",
    description: "Agenda tu consulta gratuita ahora.",
    images: ["/og-contacto.jpg"],
  },
};

export default function Page() {
  return <ContactoPage />;
}
