/**
 * ============================================================
 * SECURITY UTILITIES 2026
 * ============================================================
 * 
 * Funciones de seguridad:
 * - Ofuscación de emails/teléfonos (anti-scraping)
 * - Sistema Honeypot (anti-spam forms)
 * - Sanitización de inputs
 * - Generación de tokens CSRF
 */

// ============================================
// 1. OFUSCACIÓN DE DATOS (Anti-Scraping)
// ============================================

/**
 * Codifica un email en formato hexadecimal para evitar scrapers
 * El email se muestra normal en el navegador pero es ilegible para bots
 */
export function obfuscateEmail(email: string): string {
  return email
    .split("")
    .map((char) => `&#${char.charCodeAt(0)};`)
    .join("");
}

/**
 * Codifica un teléfono en formato hexadecimal
 */
export function obfuscatePhone(phone: string): string {
  return phone
    .split("")
    .map((char) => `&#${char.charCodeAt(0)};`)
    .join("");
}

/**
 * Genera un link mailto ofuscado que funciona al hacer click
 * pero es difícil de scrapear
 */
export function createSecureMailto(email: string): {
  href: string;
  display: string;
} {
  const [localPart, domain] = email.split("@");
  
  // Mezclar el email en el DOM con JavaScript
  const href = `javascript:void(0)`; // Se maneja con onClick
  
  return {
    href,
    display: email, // Se renderiza con obfuscateEmail()
  };
}

/**
 * Decodifica email ofuscado (para uso interno en click handlers)
 */
export function decodeEmail(encoded: string): string {
  return encoded.replace(/&#(\d+);/g, (_, code) => 
    String.fromCharCode(parseInt(code, 10))
  );
}

// ============================================
// 2. HONEYPOT SYSTEM (Anti-Spam)
// ============================================

/**
 * Campo honeypot para formularios
 * Los bots llenan todos los campos, incluyendo los ocultos
 * Los usuarios reales nunca ven estos campos
 */
export interface HoneypotConfig {
  fieldName: string;           // Nombre del campo trampa
  fieldNameReal: string;       // Nombre del campo real (ofuscado)
  timeThreshold: number;       // Tiempo mínimo en ms (bots son instantáneos)
}

/**
 * Genera configuración de honeypot única por sesión
 */
export function generateHoneypotConfig(): HoneypotConfig {
  // Nombres de campos que parecen legítimos pero son trampas
  const trapNames = [
    "website",
    "url",
    "email_confirm",
    "phone_secondary",
    "company_name",
  ];
  
  // Nombres reales ofuscados
  const realNames = [
    "field_a7b3",
    "field_x9k2",
    "field_m4p8",
    "field_q1w5",
  ];
  
  return {
    fieldName: trapNames[Math.floor(Math.random() * trapNames.length)],
    fieldNameReal: realNames[Math.floor(Math.random() * realNames.length)],
    timeThreshold: 2000, // 2 segundos mínimo
  };
}

/**
 * Valida si un formulario fue enviado por un bot
 */
export function validateHoneypot(
  honeypotValue: string,
  formLoadTime: number
): { isValid: boolean; reason?: string } {
  // Si el campo honeypot tiene valor, es un bot
  if (honeypotValue && honeypotValue.length > 0) {
    return { isValid: false, reason: "Honeypot field filled" };
  }
  
  // Si el formulario se envió muy rápido, probablemente es un bot
  const submissionTime = Date.now() - formLoadTime;
  if (submissionTime < 2000) {
    return { isValid: false, reason: "Submission too fast" };
  }
  
  return { isValid: true };
}

// ============================================
// 3. SANITIZACIÓN DE INPUTS
// ============================================

/**
 * Sanitiza texto de usuario para prevenir XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

/**
 * Valida formato de email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Detecta patrones de spam en mensajes
 */
export function detectSpamPatterns(message: string): boolean {
  const spamPatterns = [
    /\[url=/i,
    /\[link=/i,
    /https?:\/\/[^\s]+/gi,  // URLs en el mensaje
    /viagra|casino|lottery|winner/i,
    /\b\d{10,}\b/,  // Números de teléfono largos
  ];
  
  return spamPatterns.some((pattern) => pattern.test(message));
}

// ============================================
// 4. CSRF PROTECTION
// ============================================

/**
 * Genera un token CSRF simple
 */
export function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => 
    byte.toString(16).padStart(2, "0")
  ).join("");
}

/**
 * Valida token CSRF
 */
export function validateCsrfToken(
  token: string,
  storedToken: string
): boolean {
  return token === storedToken && token.length === 64;
}

// ============================================
// 5. RATE LIMITING HELPERS
// ============================================

/**
 * Configuración para rate limiting en Vercel
 * Ver documentación: https://vercel.com/docs/concepts/limits/overview
 */
export const RATE_LIMIT_CONFIG = {
  // Límites sugeridos para portfolio personal
  GLOBAL_LIMIT: "1000 requests per 1 minute",
  API_LIMIT: "10 requests per 1 minute per IP",
  CONTACT_FORM_LIMIT: "3 requests per 1 hour per IP",
};

// ============================================
// 6. PRIVACY HELPERS
// ============================================

/**
 * Configuración de privacidad
 */
export const PRIVACY_CONFIG = {
  // No cargar cookies de rastreo
  disableTracking: true,
  
  // No usar localStorage para datos sensibles
  sensitiveStorageKeys: ["token", "session", "auth", "password"],
  
  // Consentimiento requerido para funcionalidades
  requireConsent: {
    analytics: false, // No usamos analytics externos
    cookies: false,   // No usamos cookies de rastreo
  },
};

/**
 * Limpia datos sensibles del localStorage
 */
export function clearSensitiveData(): void {
  if (typeof window === "undefined") return;
  
  PRIVACY_CONFIG.sensitiveStorageKeys.forEach((key) => {
    localStorage.removeItem(key);
  });
}

// ============================================
// 7. COMPONENT HELPERS
// ============================================

/**
 * Props para componente de email seguro
 */
export interface SecureEmailProps {
  email: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Props para formulario con honeypot
 */
export interface SecureFormProps {
  onSubmit: (data: FormData) => void;
  children: React.ReactNode;
  className?: string;
}
