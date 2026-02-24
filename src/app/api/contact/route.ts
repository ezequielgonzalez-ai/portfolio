import { NextRequest, NextResponse } from "next/server";
import { sanitizeInput, isValidEmail, detectSpamPatterns } from "@/lib/security";

/**
 * ============================================================
 * SECURE CONTACT API ROUTE
 * ============================================================
 * 
 * Endpoint seguro para formulario de contacto:
 * - Validación de inputs
 * - Rate limiting (configurado en Vercel)
 * - Spam detection
 * 
 * RATE LIMITING EN VERCEL:
 * ========================
 * Vercel tiene rate limiting automático en planes Pro.
 * Configúralo en: vercel.com > Project > Settings > Security
 * 
 * Para rate limiting avanzado, usa Upstash:
 * npm install @upstash/rate-limit @upstash/redis
 */

// Cache simple para rate limiting
const submissionCache = new Map<string, { count: number; lastTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const MAX_SUBMISSIONS = 3;

export async function POST(request: NextRequest) {
  try {
    // 1. Obtener IP del cliente
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || 
               request.headers.get("x-real-ip") || 
               "unknown";

    // 2. Rate limiting simple
    const now = Date.now();
    const cached = submissionCache.get(ip);
    
    if (cached && now - cached.lastTime < RATE_LIMIT_WINDOW) {
      if (cached.count >= MAX_SUBMISSIONS) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }
      cached.count++;
    } else {
      submissionCache.set(ip, { count: 1, lastTime: now });
    }

    // 3. Parsear body
    const body = await request.json();
    const { name, email, message } = body;

    // 4. Validar campos requeridos
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // 5. Validar email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // 6. Detectar spam
    if (detectSpamPatterns(message)) {
      console.warn(`Spam detected from IP: ${ip}`);
      return NextResponse.json(
        { error: "Message could not be sent" },
        { status: 400 }
      );
    }

    // 7. Sanitizar inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      message: sanitizeInput(message),
    };

    // 8. Enviar email (implementar con tu servicio preferido)
    // await sendEmail(sanitizedData);
    console.log("Contact form submission:", sanitizedData);

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
