"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  generateHoneypotConfig,
  validateHoneypot,
  sanitizeInput,
  isValidEmail,
  detectSpamPatterns,
  generateCsrfToken,
} from "@/lib/security";

/**
 * ============================================================
 * SECURE CONTACT FORM - Anti-Spam sin CAPTCHA
 * ============================================================
 */

interface FormData {
  name: string;
  email: string;
  message: string;
  website?: string; // Honeypot field
}

// Valores iniciales calculados una sola vez
const INITIAL_HONEYPOT = generateHoneypotConfig();
const INITIAL_CSRF = generateCsrfToken();
const INITIAL_TIME = Date.now();

export function SecureContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  
  const honeypotConfig = useMemo(() => INITIAL_HONEYPOT, []);
  const formLoadTime = useMemo(() => INITIAL_TIME, []);
  const csrfToken = useMemo(() => INITIAL_CSRF, []);
  
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validar honeypot (si tiene valor, es un bot)
    const honeypotValidation = validateHoneypot(
      formData.website || "",
      formLoadTime
    );

    if (!honeypotValidation.isValid) {
      setStatus("success"); // Fingir éxito al bot
      return;
    }

    // 2. Validar email
    if (!isValidEmail(formData.email)) {
      setStatus("error");
      setErrorMessage("Por favor, ingresa un email válido.");
      return;
    }

    // 3. Detectar patrones de spam
    if (detectSpamPatterns(formData.message)) {
      setStatus("error");
      setErrorMessage("El mensaje contiene contenido no permitido.");
      return;
    }

    // 4. Sanitizar inputs
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      message: sanitizeInput(formData.message),
      _csrf: csrfToken,
    };

    // 5. Enviar formulario
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", website: "" });
      } else {
        setStatus("error");
        setErrorMessage("Hubo un error al enviar el mensaje.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Error de conexión. Intenta de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field - Invisible para humanos */}
      <div
        className="absolute -left-[9999px] opacity-0 pointer-events-none"
        aria-hidden="true"
        tabIndex={-1}
      >
        <label htmlFor={honeypotConfig.fieldName}>No llenar</label>
        <input
          type="text"
          id={honeypotConfig.fieldName}
          name="website"
          value={formData.website}
          onChange={handleChange}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      <input type="hidden" name="_csrf" value={csrfToken} />

      {/* Nombre */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#00f5ff]/50 focus:outline-none transition-colors"
          placeholder="Tu nombre"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#00f5ff]/50 focus:outline-none transition-colors"
          placeholder="tu@email.com"
        />
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#00f5ff]/50 focus:outline-none transition-colors resize-none"
          placeholder="¿En qué puedo ayudarte?"
        />
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={status === "sending"}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Enviando..." : "Enviar Mensaje"}
      </motion.button>

      {/* Status */}
      {status === "success" && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-400 text-center"
        >
          ¡Mensaje enviado con éxito!
        </motion.p>
      )}

      {status === "error" && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-center"
        >
          {errorMessage}
        </motion.p>
      )}
    </form>
  );
}

/**
 * SECURE EMAIL LINK - Email ofuscado contra scrapers
 */
export function SecureEmailLink({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${email}`;
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className={className}
      style={{ unicodeBidi: "bidi-override", direction: "rtl" }}
    >
      {email.split("").reverse().join("")}
    </a>
  );
}
