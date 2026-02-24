import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AIMatrixBackground } from "@/components/portfolio/ai-matrix-background";
import { Navigation } from "@/components/portfolio/navigation-cro";
import { Providers } from "@/components/providers/session-provider";

/**
 * ============================================================
 * LAYOUT PERSISTENTE - MG Digital
 * ============================================================
 */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["monospace"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  fallback: ["Georgia", "serif"],
});

export const viewport: Viewport = {
  themeColor: "#030303",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://matiasezequielgonzalez.vercel.app"),
  title: {
    default: "MG Digital | Automatización con IA & Desarrollo Web",
    template: "%s | MG Digital",
  },
  description: "Automatiza tu negocio con IA desde $29 USD. Chatbots, automatizaciones y desarrollo web premium a precios surrealistas. Consulta gratuita.",
  keywords: ["automatización IA", "chatbots", "n8n", "OpenAI", "desarrollo web", "GPT-4"],
  authors: [{ name: "Matias Ezequiel Gonzalez" }],
  creator: "MG Digital",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "MG Digital",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@mezequielgonzalez",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased text-foreground font-sans`}
      >
        <Providers>
          {/* Background animado persistente */}
          <AIMatrixBackground />

          {/* Navigation persistente */}
          <Navigation />

          {/* Contenido principal */}
          <div className="relative z-10">
            {children}
          </div>

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
