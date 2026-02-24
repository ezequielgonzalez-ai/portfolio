#!/bin/bash

# ============================================
# 🚀 SCRIPT DE DESPLIEGUE A GITHUB
# Portfolio - Matias Ezequiel Gonzalez
# ============================================

set -e

echo ""
echo "============================================"
echo "🚀 PREPARANDO PROYECTO PARA GITHUB"
echo "============================================"
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Limpiar archivos de desarrollo
echo -e "${BLUE}📦 Limpiando archivos de desarrollo...${NC}"
rm -rf .next/ node_modules/.cache 2>/dev/null || true
rm -f dev.log server.log 2>/dev/null || true
echo -e "${GREEN}✅ Limpieza completada${NC}"
echo ""

# 2. Inicializar Git si no existe
if [ ! -d .git ]; then
    echo -e "${BLUE}📋 Inicializando repositorio Git...${NC}"
    git init
    echo -e "${GREEN}✅ Git inicializado${NC}"
else
    echo -e "${YELLOW}⚠️  Git ya está inicializado${NC}"
fi
echo ""

# 3. Configurar Git (reemplaza con tus datos)
echo -e "${BLUE}⚙️  Configurando Git...${NC}"
git config user.email "m.ezequiel.gonzalez25@gmail.com" 2>/dev/null || true
git config user.name "Matias Ezequiel Gonzalez" 2>/dev/null || true
echo -e "${GREEN}✅ Git configurado${NC}"
echo ""

# 4. Agregar todos los archivos
echo -e "${BLUE}📁 Agregando archivos al staging...${NC}"
git add .
echo -e "${GREEN}✅ Archivos agregados${NC}"
echo ""

# 5. Mostrar archivos listos para commit
echo -e "${BLUE}📊 Archivos listos para commit:${NC}"
git status --short | head -20
echo ""
TOTAL=$(git diff --cached --numstat | wc -l)
echo -e "${GREEN}Total: $TOTAL archivos preparados${NC}"
echo ""

# 6. Crear commit
echo -e "${BLUE}💾 Creando commit...${NC}"
git commit -m "🚀 Initial commit - Portfolio Matias Ezequiel Gonzalez

✨ Features:
- Dark/Light mode with localStorage persistence
- Text Generate Effect animations
- Magnetic buttons with cursor follow
- Infinite scroll tech stack
- Glassmorphism cards
- Aurora animated background
- Responsive design
- SEO optimized (sitemap, robots.txt)

🛠️ Stack:
- Next.js 16 + TypeScript
- Tailwind CSS 4
- Framer Motion
- shadcn/ui"

echo -e "${GREEN}✅ Commit creado${NC}"
echo ""

# 7. Instrucciones para GitHub
echo ""
echo "============================================"
echo "🎯 SIGUIENTES PASOS"
echo "============================================"
echo ""
echo -e "${YELLOW}1. Crea un repositorio en GitHub:${NC}"
echo "   👉 https://github.com/new"
echo "   Nombre sugerido: portfolio"
echo ""
echo -e "${YELLOW}2. Conecta y sube el código:${NC}"
echo ""
echo -e "   ${GREEN}git branch -M main${NC}"
echo -e "   ${GREEN}git remote add origin https://github.com/TU_USUARIO/portfolio.git${NC}"
echo -e "   ${GREEN}git push -u origin main${NC}"
echo ""
echo -e "${YELLOW}3. Despliega en Vercel:${NC}"
echo "   👉 https://vercel.com/new"
echo "   Importa tu repositorio de GitHub"
echo ""
echo "============================================"
echo "✅ ¡PROYECTO LISTO PARA SUBIR!"
echo "============================================"
