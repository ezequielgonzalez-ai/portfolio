# ============================================
# REGLAS DE ORO - MGDIGITAL WEB
# LEER ANTES DE CADA CAMBIO
# ============================================

## 🔒 DOMINIO FIJO (NUNCA CAMBIAR)
```
PRODUCCIÓN: https://mgdigital.vercel.app
```

### URLs para Google OAuth:
- Origen autorizado: `https://mgdigital.vercel.app`
- Redirect URI: `https://mgdigital.vercel.app/api/auth/callback/google`

---

## 📋 CHECKLIST ANTES DE CADA CAMBIO

1. [ ] Verificar que NEXTAUTH_URL = `https://mgdigital.vercel.app`
2. [ ] Usar siempre `git push origin master:main --force`
3. [ ] NO cambiar rama (trabajar en master, pushear a main)
4. [ ] NO crear nuevos dominios de Vercel
5. [ ] NO subir tokens/secrets al repositorio

---

## 🎨 ESTILO VISUAL ACTUAL

### Colores
- Background: #030303 (dark profundo)
- Primary: #8b5cf6 (violet neón)
- Accent: #06b6d4 (cyan eléctrico)
- Text: #fafafa (blanco)

### Sistema de Diseño
- Tailwind CSS 4.0+
- Glassmorphism cards
- Mesh gradient animado
- Botones con shimmer effect

---

## 🚀 COMANDOS PARA SUBIR CAMBIOS

```bash
# Commit
git add -A && git commit -m "mensaje"

# Push (SIEMPRE usar este)
git push origin master:main --force

# Si no hay remote
git remote add origin <repo-url>
```

---

## ⚠️ PROBLEMAS COMUNES

### Error: redirect_uri_mismatch
→ Verificar Google Cloud Console tenga las URLs correctas

### Error: src refspec main does not match
→ Usar: `git push origin master:main --force`

### Dominio cambió
→ El dominio correcto es mgdigital.vercel.app

---

## 🔐 CREDENCIALES (ver .env local)
- GitHub Token: ver variables de entorno
- Vercel Token: ver variables de entorno  
- Google OAuth: ver variables de entorno
