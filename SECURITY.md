# 🔒 Security & Privacy Configuration 2026

## HTTP Security Headers

Los siguientes headers están configurados en `next.config.ts`:

| Header | Valor | Propósito |
|--------|-------|-----------|
| Content-Security-Policy | Configurado | Previene ataques XSS |
| Strict-Transport-Security | max-age=63072000 | Fuerza HTTPS siempre |
| X-Content-Type-Options | nosniff | Previene MIME sniffing |
| X-Frame-Options | DENY | Previene clickjacking |
| Referrer-Policy | strict-origin-when-cross-origin | Privacidad de referencias |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | Bloquea permisos innecesarios |

---

## Rate Limiting en Vercel

### Opción 1: Vercel Native (Pro Plan)
1. Ve a tu dashboard: vercel.com > Project > Settings > Security
2. Habilita "Rate Limiting"
3. Configura límites por endpoint

### Opción 2: Upstash Rate Limiting (Recomendado)

```bash
npm install @upstash/rate-limit @upstash/redis
```

```typescript
import { Ratelimit } from "@upstash/rate-limit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

const { success } = await ratelimit.limit(ip);
```

### Opción 3: Vercel Edge Config

```typescript
import { get } from '@vercel/edge-config';
const limits = await get('rateLimits');
```

---

## Anti-Spam System (Honeypot)

El formulario de contacto usa un sistema de **Honeypot**:

1. **Campo invisible**: Un campo que los bots llenan pero los humanos no ven
2. **Validación de tiempo**: Los bots envían instantáneamente (< 2 segundos)
3. **Detección de patrones**: Bloquea mensajes con URLs o palabras spam

---

## Email Obfuscation

Los emails están ofuscados para evitar scrapers:

```typescript
import { obfuscateEmail } from "@/lib/security";

// En el componente:
<span dangerouslySetInnerHTML={{ __html: obfuscateEmail(email) }} />
```

---

## Privacidad

- ✅ Sin cookies de rastreo
- ✅ Sin analytics externos
- ✅ Sin localStorage sensible
- ✅ Compatible con GDPR/CCPA

---

## Archivos de Seguridad

```
src/
├── lib/
│   └── security.ts          # Utilidades de seguridad
├── components/portfolio/
│   └── secure-contact.tsx   # Formulario anti-spam
├── app/api/contact/
│   └── route.ts             # API con rate limiting
└── next.config.ts           # Headers de seguridad
```

---

## Checklist de Seguridad

- [x] Content-Security-Policy configurado
- [x] HSTS habilitado (HTTPS forzado)
- [x] X-Frame-Options: DENY
- [x] Permisos de cámara/micrófono bloqueados
- [x] Formulario con Honeypot anti-spam
- [x] Email ofuscado contra scrapers
- [x] Rate limiting en API routes
- [x] Input sanitization
- [x] Sin cookies de rastreo
