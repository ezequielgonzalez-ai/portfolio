#!/bin/bash

echo "============================================"
echo "🚀 SUBIENDO A GITHUB"
echo "============================================"
echo ""
echo "📋 Tu repositorio: https://github.com/ezequielgonzalez-ai/portfolio.git"
echo ""

# Verificar si gh está instalado
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI detectado"
    gh auth status
else
    echo "⚠️  GitHub CLI no está instalado"
fi

echo ""
echo "============================================"
echo "📝 COMANDOS PARA SUBIR MANUALMENTE:"
echo "============================================"
echo ""
echo "Opción A - Con Personal Access Token:"
echo "--------------------------------------"
echo "1. Ve a: https://github.com/settings/tokens"
echo "2. Crea un token con permisos 'repo'"
echo "3. Ejecuta:"
echo ""
echo "   git remote set-url origin https://TU_TOKEN@github.com/ezequielgonzalez-ai/portfolio.git"
echo "   git push -u origin main"
echo ""
echo "Opción B - Con GitHub CLI:"
echo "--------------------------------------"
echo "   gh auth login"
echo "   git push -u origin main"
echo ""
echo "Opción C - Subir manualmente:"
echo "--------------------------------------"
echo "   1. Ve a: https://github.com/ezequielgonzalez-ai/portfolio"
echo "   2. Click en 'uploading an existing files'"
echo "   3. Arrastra todos los archivos del proyecto"
echo ""
