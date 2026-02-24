import type { NextConfig } from "next";

/**
 * ============================================================
 * NEXT.JS SECURITY CONFIGURATION 2026
 * ============================================================
 * 
 * Headers de seguridad implementados:
 * - CSP (Content Security Policy): Anti-XSS
 * - HSTS: Fuerza HTTPS
 * - X-Content-Type-Options: Anti-MIME sniffing
 * - Referrer-Policy: Privacidad de referencias
 * - Permissions-Policy: Bloquea cámara/micrófono/geolocalización
 */

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  
  // Headers de seguridad
  async headers() {
    return [
      {
        // Aplicar a todas las rutas
        source: "/(.*)",
        headers: [
          // Content Security Policy - Previene XSS
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://va.vercel-scripts.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
            ].join("; "),
          },
          // HTTP Strict Transport Security - Fuerza HTTPS
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Previene MIME type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Previene clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Protección XSS legacy (para navegadores antiguos)
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Control de referrer para privacidad
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Bloquea permisos innecesarios
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=()",
              "payment=()",
              "usb=()",
              "magnetometer=()",
              "gyroscope=()",
              "accelerometer=()",
            ].join(", "),
          },
          // Evita información del servidor
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
