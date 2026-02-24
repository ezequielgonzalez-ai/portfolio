# -*- coding: utf-8 -*-
"""
Guía completa para el Workflow n8n - AI Agent
"""

from reportlab.lib.pagesizes import letter
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, 
    PageBreak, Image, ListFlowable, ListItem
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, cm
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
import os

# Registrar fuentes
pdfmetrics.registerFont(TTFont('SimHei', '/usr/share/fonts/truetype/chinese/SimHei.ttf'))
pdfmetrics.registerFont(TTFont('Microsoft YaHei', '/usr/share/fonts/truetype/chinese/msyh.ttf'))
pdfmetrics.registerFont(TTFont('Times New Roman', '/usr/share/fonts/truetype/english/Times-New-Roman.ttf'))

# Registrar familias de fuentes para habilitar negritas
registerFontFamily('Microsoft YaHei', normal='Microsoft YaHei', bold='Microsoft YaHei')
registerFontFamily('SimHei', normal='SimHei', bold='SimHei')
registerFontFamily('Times New Roman', normal='Times New Roman', bold='Times New Roman')

def create_pdf():
    # Configuración del documento
    output_path = "/home/z/my-project/download/n8n_workflow_guide.pdf"
    
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=72,
        leftMargin=72,
        topMargin=72,
        bottomMargin=72,
        title="n8n Workflow AI Agent Guide",
        author='Z.ai',
        creator='Z.ai',
        subject='Guía completa para configurar y mejorar el workflow de AI Agent en n8n'
    )
    
    # Estilos
    styles = getSampleStyleSheet()
    
    # Estilos personalizados
    cover_title_style = ParagraphStyle(
        name='CoverTitle',
        fontName='Microsoft YaHei',
        fontSize=36,
        leading=44,
        alignment=TA_CENTER,
        spaceAfter=24
    )
    
    cover_subtitle_style = ParagraphStyle(
        name='CoverSubtitle',
        fontName='SimHei',
        fontSize=18,
        leading=26,
        alignment=TA_CENTER,
        spaceAfter=36
    )
    
    heading1_style = ParagraphStyle(
        name='CustomHeading1',
        fontName='Microsoft YaHei',
        fontSize=20,
        leading=28,
        alignment=TA_LEFT,
        spaceBefore=24,
        spaceAfter=12,
        textColor=colors.HexColor('#1F4E79')
    )
    
    heading2_style = ParagraphStyle(
        name='CustomHeading2',
        fontName='Microsoft YaHei',
        fontSize=16,
        leading=22,
        alignment=TA_LEFT,
        spaceBefore=18,
        spaceAfter=8,
        textColor=colors.HexColor('#2E75B6')
    )
    
    heading3_style = ParagraphStyle(
        name='CustomHeading3',
        fontName='SimHei',
        fontSize=13,
        leading=18,
        alignment=TA_LEFT,
        spaceBefore=12,
        spaceAfter=6,
        textColor=colors.HexColor('#404040')
    )
    
    body_style = ParagraphStyle(
        name='CustomBody',
        fontName='SimHei',
        fontSize=11,
        leading=18,
        alignment=TA_LEFT,
        spaceBefore=4,
        spaceAfter=8,
        firstLineIndent=20,
        wordWrap='CJK'
    )
    
    body_no_indent = ParagraphStyle(
        name='BodyNoIndent',
        fontName='SimHei',
        fontSize=11,
        leading=18,
        alignment=TA_LEFT,
        spaceBefore=4,
        spaceAfter=8,
        wordWrap='CJK'
    )
    
    code_style = ParagraphStyle(
        name='CodeStyle',
        fontName='Times New Roman',
        fontSize=10,
        leading=14,
        alignment=TA_LEFT,
        spaceBefore=6,
        spaceAfter=6,
        leftIndent=20,
        backColor=colors.HexColor('#F5F5F5'),
        borderColor=colors.HexColor('#E0E0E0'),
        borderWidth=1,
        borderPadding=8
    )
    
    table_header_style = ParagraphStyle(
        name='TableHeader',
        fontName='Microsoft YaHei',
        fontSize=11,
        leading=14,
        textColor=colors.white,
        alignment=TA_CENTER
    )
    
    table_cell_style = ParagraphStyle(
        name='TableCell',
        fontName='SimHei',
        fontSize=10,
        leading=14,
        alignment=TA_LEFT,
        wordWrap='CJK'
    )
    
    table_cell_center = ParagraphStyle(
        name='TableCellCenter',
        fontName='SimHei',
        fontSize=10,
        leading=14,
        alignment=TA_CENTER,
        wordWrap='CJK'
    )
    
    note_style = ParagraphStyle(
        name='NoteStyle',
        fontName='SimHei',
        fontSize=10,
        leading=16,
        alignment=TA_LEFT,
        spaceBefore=8,
        spaceAfter=8,
        leftIndent=20,
        borderColor=colors.HexColor('#FFC000'),
        borderWidth=2,
        borderPadding=10,
        backColor=colors.HexColor('#FFF8E1'),
        wordWrap='CJK'
    )
    
    story = []
    
    # === PORTADA ===
    story.append(Spacer(1, 120))
    story.append(Paragraph("<b>Guía Completa de Workflow n8n</b>", cover_title_style))
    story.append(Spacer(1, 24))
    story.append(Paragraph("AI Agent con Gemini, Clima y Noticias RSS", cover_subtitle_style))
    story.append(Spacer(1, 48))
    story.append(Paragraph("Análisis, Requisitos y Mejoras Propuestas", ParagraphStyle(
        name='CoverDesc',
        fontName='SimHei',
        fontSize=14,
        leading=20,
        alignment=TA_CENTER
    )))
    story.append(Spacer(1, 72))
    story.append(Paragraph("Creado por: Z.ai", ParagraphStyle(
        name='CoverAuthor',
        fontName='SimHei',
        fontSize=12,
        leading=18,
        alignment=TA_CENTER
    )))
    story.append(Paragraph("Versión 1.0 - Enero 2025", ParagraphStyle(
        name='CoverDate',
        fontName='SimHei',
        fontSize=12,
        leading=18,
        alignment=TA_CENTER
    )))
    story.append(PageBreak())
    
    # === ÍNDICE ===
    story.append(Paragraph("<b>Índice de Contenidos</b>", heading1_style))
    story.append(Spacer(1, 12))
    
    toc_items = [
        ("1. Resumen del Workflow", "Arquitectura y componentes principales"),
        ("2. Requisitos Previos", "Todo lo necesario antes de implementar"),
        ("3. Configuración Paso a Paso", "Guía detallada de instalación"),
        ("4. Análisis de Componentes", "Descripción de cada nodo"),
        ("5. Mejoras Propuestas", "Optimizaciones y nuevas funcionalidades"),
        ("6. Solución de Problemas", "Errores comunes y soluciones"),
        ("7. Workflow Mejorado", "JSON optimizado listo para importar")
    ]
    
    for title, desc in toc_items:
        story.append(Paragraph(f"<b>{title}</b>", body_no_indent))
        story.append(Paragraph(f"   {desc}", ParagraphStyle(
            name='TOCDesc',
            fontName='SimHei',
            fontSize=10,
            leading=14,
            alignment=TA_LEFT,
            textColor=colors.HexColor('#666666'),
            leftIndent=20,
            wordWrap='CJK'
        )))
        story.append(Spacer(1, 4))
    
    story.append(PageBreak())
    
    # === SECCIÓN 1: RESUMEN DEL WORKFLOW ===
    story.append(Paragraph("<b>1. Resumen del Workflow</b>", heading1_style))
    
    story.append(Paragraph(
        "Este workflow de n8n implementa un agente de inteligencia artificial conversacional capaz de interactuar con usuarios a través de un chat público. El agente utiliza Google Gemini como modelo de lenguaje y está equipado con herramientas para obtener información del clima en tiempo real y noticias RSS de diversas fuentes internacionales. La arquitectura del workflow sigue el patrón de diseño de LangChain, integrando memoria de conversación para mantener el contexto de las interacciones.",
        body_style
    ))
    
    story.append(Paragraph("<b>1.1 Arquitectura General</b>", heading2_style))
    
    story.append(Paragraph(
        "El workflow está compuesto por 6 nodos funcionales principales y 6 notas adhesivas de documentación. La arquitectura sigue un flujo lineal donde el usuario interactúa con el chat, el agente procesa la solicitud utilizando las herramientas disponibles, y la respuesta se devuelve al usuario. La memoria de conversación permite que el agente recuerde mensajes anteriores dentro de una ventana de contexto de 30 mensajes.",
        body_style
    ))
    
    # Tabla de nodos principales
    nodes_data = [
        [Paragraph('<b>Nodo</b>', table_header_style), 
         Paragraph('<b>Tipo</b>', table_header_style), 
         Paragraph('<b>Función</b>', table_header_style)],
        [Paragraph('Example Chat', table_cell_style), 
         Paragraph('Chat Trigger', table_cell_style), 
         Paragraph('Interfaz de chat público para usuarios', table_cell_style)],
        [Paragraph('Your First AI Agent', table_cell_style), 
         Paragraph('LangChain Agent', table_cell_style), 
         Paragraph('Agente IA que coordina herramientas', table_cell_style)],
        [Paragraph('Connect Gemini', table_cell_style), 
         Paragraph('Google Gemini', table_cell_style), 
         Paragraph('Modelo de lenguaje (LLM)', table_cell_style)],
        [Paragraph('Conversation Memory', table_cell_style), 
         Paragraph('Memory Buffer', table_cell_style), 
         Paragraph('Memoria de 30 mensajes', table_cell_style)],
        [Paragraph('Get Weather', table_cell_style), 
         Paragraph('HTTP Request Tool', table_cell_style), 
         Paragraph('Obtener clima via Open-Meteo API', table_cell_style)],
        [Paragraph('Get News', table_cell_style), 
         Paragraph('RSS Feed Tool', table_cell_style), 
         Paragraph('Obtener noticias RSS', table_cell_style)]
    ]
    
    nodes_table = Table(nodes_data, colWidths=[2*inch, 1.5*inch, 2.8*inch])
    nodes_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1F4E79')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, -1), 'SimHei'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('BACKGROUND', (0, 1), (-1, 1), colors.white),
        ('BACKGROUND', (0, 2), (-1, 2), colors.HexColor('#F5F5F5')),
        ('BACKGROUND', (0, 3), (-1, 3), colors.white),
        ('BACKGROUND', (0, 4), (-1, 4), colors.HexColor('#F5F5F5')),
        ('BACKGROUND', (0, 5), (-1, 5), colors.white),
        ('BACKGROUND', (0, 6), (-1, 6), colors.HexColor('#F5F5F5')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    
    story.append(Spacer(1, 12))
    story.append(nodes_table)
    story.append(Paragraph("<b>Tabla 1.</b> Componentes principales del workflow", ParagraphStyle(
        name='Caption',
        fontName='SimHei',
        fontSize=10,
        alignment=TA_CENTER,
        spaceBefore=6,
        spaceAfter=12,
        textColor=colors.HexColor('#666666')
    )))
    
    # === SECCIÓN 2: REQUISITOS PREVIOS ===
    story.append(Paragraph("<b>2. Requisitos Previos</b>", heading1_style))
    
    story.append(Paragraph(
        "Antes de implementar este workflow en tu instancia de n8n, es necesario cumplir con una serie de requisitos técnicos y configuraciones previas. Estos requisitos aseguran el correcto funcionamiento de todas las herramientas y la comunicación fluida entre los diferentes componentes del sistema.",
        body_style
    ))
    
    story.append(Paragraph("<b>2.1 Requisitos de Software</b>", heading2_style))
    
    story.append(Paragraph(
        "Para ejecutar este workflow necesitas tener una instancia de n8n funcionando. n8n puede instalarse de múltiples formas: mediante npm (Node Package Manager), usando Docker para una instalación containerizada, o a través de servicios en la nube como n8n.cloud que ofrece una solución managed sin necesidad de configuración de servidor. La versión mínima recomendada de n8n es la 1.0 o superior, ya que incluye soporte nativo para los nodos de LangChain.",
        body_style
    ))
    
    software_data = [
        [Paragraph('<b>Componente</b>', table_header_style), 
         Paragraph('<b>Requisito</b>', table_header_style), 
         Paragraph('<b>Notas</b>', table_header_style)],
        [Paragraph('n8n', table_cell_style), 
         Paragraph('Versión 1.0+', table_cell_style), 
         Paragraph('Soporte nativo para LangChain', table_cell_style)],
        [Paragraph('Node.js', table_cell_style), 
         Paragraph('Versión 18+', table_cell_style), 
         Paragraph('Solo para instalación self-hosted', table_cell_style)],
        [Paragraph('Docker', table_cell_style), 
         Paragraph('Opcional', table_cell_style), 
         Paragraph('Recomendado para producción', table_cell_style)],
        [Paragraph('Navegador', table_cell_style), 
         Paragraph('Chrome/Firefox moderno', table_cell_style), 
         Paragraph('Para acceder a la interfaz web', table_cell_style)]
    ]
    
    software_table = Table(software_data, colWidths=[2*inch, 1.5*inch, 2.8*inch])
    software_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1F4E79')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, -1), 'SimHei'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('BACKGROUND', (0, 1), (-1, 1), colors.white),
        ('BACKGROUND', (0, 2), (-1, 2), colors.HexColor('#F5F5F5')),
        ('BACKGROUND', (0, 3), (-1, 3), colors.white),
        ('BACKGROUND', (0, 4), (-1, 4), colors.HexColor('#F5F5F5')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ]))
    
    story.append(Spacer(1, 12))
    story.append(software_table)
    story.append(Paragraph("<b>Tabla 2.</b> Requisitos de software", ParagraphStyle(
        name='Caption',
        fontName='SimHei',
        fontSize=10,
        alignment=TA_CENTER,
        spaceBefore=6,
        spaceAfter=12,
        textColor=colors.HexColor('#666666')
    )))
    
    story.append(Paragraph("<b>2.2 API Keys y Credenciales</b>", heading2_style))
    
    story.append(Paragraph(
        "El componente más crítico para el funcionamiento del workflow es la API Key de Google AI Studio para acceder a Gemini. Sin esta credencial, el agente no podrá procesar las solicitudes de los usuarios. A continuación se detallan los pasos para obtenerla:",
        body_style
    ))
    
    story.append(Paragraph("<b>Pasos para obtener la API Key de Gemini:</b>", heading3_style))
    
    steps_text = """
    <b>Paso 1:</b> Accede a Google AI Studio en la URL: https://aistudio.google.com/app/apikey<br/><br/>
    <b>Paso 2:</b> Inicia sesión con tu cuenta de Google (preferiblemente una cuenta personal, no corporativa)<br/><br/>
    <b>Paso 3:</b> Haz clic en "Create API Key" o "Crear clave de API"<br/><br/>
    <b>Paso 4:</b> Selecciona "Create API Key in new project" para crear un nuevo proyecto<br/><br/>
    <b>Paso 5:</b> Copia la clave generada y guárdala en un lugar seguro (no se mostrará de nuevo)<br/><br/>
    <b>Paso 6:</b> La API de Gemini tiene un nivel gratuito generoso: 15 RPM (solicitudes por minuto) y 1 millón de tokens por día
    """
    story.append(Paragraph(steps_text, body_no_indent))
    
    story.append(Spacer(1, 12))
    story.append(Paragraph(
        "<b>Nota importante:</b> Las APIs de clima (Open-Meteo) y las fuentes RSS no requieren autenticación, lo que simplifica significativamente la configuración inicial del workflow.",
        note_style
    ))
    
    # === SECCIÓN 3: CONFIGURACIÓN PASO A PASO ===
    story.append(Paragraph("<b>3. Configuración Paso a Paso</b>", heading1_style))
    
    story.append(Paragraph(
        "La implementación del workflow requiere seguir una secuencia específica de pasos para asegurar que todos los componentes estén correctamente configurados y puedan comunicarse entre sí. A continuación se detalla el proceso completo de configuración.",
        body_style
    ))
    
    story.append(Paragraph("<b>3.1 Importar el Workflow</b>", heading2_style))
    
    story.append(Paragraph(
        "El primer paso es importar el archivo JSON del workflow en tu instancia de n8n. Para ello, accede a tu instancia de n8n y navega hasta la sección de workflows. Haz clic en el menú de tres puntos en la esquina superior derecha y selecciona 'Import from File' o pega directamente el JSON en la opción 'Import from URL/JSON'. Una vez importado, verás todos los nodos y sus conexiones en el canvas de trabajo.",
        body_style
    ))
    
    story.append(Paragraph("<b>3.2 Configurar Credenciales de Gemini</b>", heading2_style))
    
    story.append(Paragraph(
        "Después de importar el workflow, el nodo 'Connect Gemini' mostrará un indicador de error porque no tiene credenciales configuradas. Para solucionar esto, abre el nodo haciendo doble clic y busca el campo 'Credential to connect with'. Haz clic en 'Create New' para crear una nueva credencial. En el formulario que aparece, pega tu API Key de Google AI Studio en el campo correspondiente. Asigna un nombre descriptivo a la credencial (por ejemplo, 'Gemini API Key') y haz clic en 'Save'. Una vez guardada, el indicador del nodo debería cambiar a verde, indicando que la conexión está lista.",
        body_style
    ))
    
    story.append(Paragraph("<b>3.3 Verificar Herramientas</b>", heading2_style))
    
    story.append(Paragraph(
        "Las herramientas 'Get Weather' y 'Get News' utilizan APIs públicas que no requieren autenticación. Sin embargo, es importante verificar que funcionen correctamente. La herramienta de clima utiliza la API de Open-Meteo, un servicio gratuito y de código abierto que proporciona datos meteorológicos globales. La herramienta de noticias RSS puede conectarse a múltiples fuentes, incluyendo BBC World, Al Jazeera, CNN, TechCrunch, y Hacker News entre otras.",
        body_style
    ))
    
    story.append(Paragraph("<b>3.4 Activar el Workflow</b>", heading2_style))
    
    story.append(Paragraph(
        "Una vez configuradas las credenciales, puedes activar el workflow haciendo clic en el interruptor 'Active' en la esquina superior derecha del canvas. Cuando el workflow está activo, el chat público se vuelve accesible a través de una URL única. Puedes encontrar esta URL en el nodo 'Example Chat' - haz clic en él y busca la sección 'Production URL' o 'Test URL'. La URL de producción es la que debes compartir con otros usuarios para que interactúen con tu agente.",
        body_style
    ))
    
    # === SECCIÓN 4: ANÁLISIS DE COMPONENTES ===
    story.append(Paragraph("<b>4. Análisis Detallado de Componentes</b>", heading1_style))
    
    story.append(Paragraph(
        "Cada nodo del workflow cumple una función específica dentro del ecosistema del agente. Comprender el propósito y las capacidades de cada componente es fundamental para realizar modificaciones y mejoras efectivas.",
        body_style
    ))
    
    story.append(Paragraph("<b>4.1 Chat Trigger (Example Chat)</b>", heading2_style))
    
    story.append(Paragraph(
        "El nodo Chat Trigger es el punto de entrada del workflow. Implementa una interfaz de chat web que puede ser pública o privada. La configuración actual establece el chat como público, lo que significa que cualquier persona con la URL puede interactuar con el agente sin necesidad de autenticación. El título configurado es 'Your first AI Agent' con el subtítulo 'This is for demo purposes. Try me out!'. El mensaje inicial de bienvenida es 'Hi there!' y el campo de entrada tiene un placeholder personalizado. Este nodo utiliza responseMode 'lastNode', lo que significa que la respuesta se enviará al usuario solo cuando el último nodo del flujo haya completado su ejecución.",
        body_style
    ))
    
    story.append(Paragraph("<b>4.2 AI Agent Node</b>", heading2_style))
    
    story.append(Paragraph(
        "El nodo AI Agent es el cerebro del workflow. Implementa un agente de LangChain configurado con un System Message extenso que define su personalidad, capacidades y limitaciones. El agente está diseñado para ser amigable, educativo y entusiasta sobre la automatización. El System Message incluye instrucciones detalladas sobre cómo debe comportarse el agente, qué herramientas tiene disponibles, y cómo debe interactuar con los usuarios. La temperatura del modelo está configurada en 0, lo que produce respuestas más determinísticas y consistentes.",
        body_style
    ))
    
    story.append(Paragraph("<b>4.3 Conversation Memory</b>", heading2_style))
    
    story.append(Paragraph(
        "La memoria de conversación implementa un Buffer Window Memory con un contexto de 30 mensajes. Esto significa que el agente puede recordar los últimos 30 intercambios de la conversación actual. Esta capacidad es esencial para mantener la coherencia en diálogos extendidos, permitiendo que el agente haga referencia a información mencionada anteriormente por el usuario. Sin esta memoria, cada mensaje sería tratado como una interacción independiente, perdiendo todo el contexto de la conversación.",
        body_style
    ))
    
    story.append(Paragraph("<b>4.4 Get Weather Tool</b>", heading2_style))
    
    story.append(Paragraph(
        "La herramienta de clima implementa un HTTP Request Tool que consulta la API de Open-Meteo. Esta API es completamente gratuita y no requiere autenticación. La configuración incluye múltiples parámetros que el agente puede inferir automáticamente: latitud y longitud (calculadas a partir del nombre de la ciudad), variables climáticas actuales (temperatura, humedad, velocidad del viento, etc.), datos horarios y diarios, rango de fechas, y unidad de temperatura. El agente está instruido para no preguntar información que puede inferir automáticamente.",
        body_style
    ))
    
    story.append(Paragraph("<b>4.5 Get News Tool</b>", heading2_style))
    
    story.append(Paragraph(
        "La herramienta de noticias es un RSS Feed Read Tool configurado con una lista predefinida de fuentes RSS. Las fuentes incluyen BBC World para noticias globales, Al Jazeera para cobertura internacional en profundidad, CNN World para noticias de última hora, TechCrunch para noticias de tecnología y startups, Hacker News para noticias de la comunidad tech, el blog de n8n para tutoriales y actualizaciones, Bon Appétit para recetas, ENDS Report para noticias ambientales, y MedlinePlus para información de salud. El agente puede seleccionar automáticamente la fuente más apropiada basándose en el contexto de la consulta del usuario.",
        body_style
    ))
    
    # === SECCIÓN 5: MEJORAS PROPUESTAS ===
    story.append(Paragraph("<b>5. Mejoras Propuestas</b>", heading1_style))
    
    story.append(Paragraph(
        "El workflow actual es funcional pero puede mejorarse significativamente para ofrecer una experiencia más robusta y profesional. A continuación se presentan las mejoras organizadas por prioridad y complejidad de implementación.",
        body_style
    ))
    
    story.append(Paragraph("<b>5.1 Mejoras de Seguridad (Alta Prioridad)</b>", heading2_style))
    
    security_improvements = [
        ("Rate Limiting", "Implementar límites de tasa para prevenir abuso del chat público. n8n permite configurar límites de ejecución que pueden proteger tu instancia de solicitudes excesivas."),
        ("Input Validation", "Sanitizar las entradas del usuario antes de procesarlas. Esto previene inyecciones de prompts maliciosas y asegura que el agente no sea manipulado para revelar información sensible."),
        ("API Key Rotation", "Configurar rotación automática de API keys para Gemini. Esto es especialmente importante si el chat va a tener uso frecuente o si múltiples usuarios accederán simultáneamente."),
        ("Error Handling", "Implementar manejo de errores robusto para que el agente pueda comunicar problemas de manera elegante en lugar de mostrar errores técnicos al usuario.")
    ]
    
    for title, desc in security_improvements:
        story.append(Paragraph(f"<b>• {title}:</b> {desc}", body_no_indent))
        story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>5.2 Mejoras de Funcionalidad (Media Prioridad)</b>", heading2_style))
    
    story.append(Paragraph(
        "Existen múltiples oportunidades para expandir las capacidades del agente mediante la adición de nuevas herramientas y mejoras en las existentes. Estas mejoras aumentarían significativamente la utilidad del agente para los usuarios finales.",
        body_style
    ))
    
    functionality_improvements = [
        ("Gmail Integration", "Agregar capacidad de enviar correos electrónicos directamente desde el chat. Esto sería útil para tareas como enviar resúmenes, notificaciones, o confirmaciones."),
        ("Google Calendar", "Permitir al agente consultar eventos próximos del calendario del usuario. Requiere configuración de OAuth2 con Google."),
        ("Web Search", "Integrar capacidades de búsqueda web para obtener información actualizada que no esté disponible en las fuentes RSS configuradas."),
        ("Calculator/Math Tool", "Agregar una herramienta de cálculo para operaciones matemáticas complejas que el modelo de lenguaje pueda no ejecutar con precisión."),
        ("Translation Tool", "Implementar traducción automática para usuarios que prefieran interactuar en otros idiomas.")
    ]
    
    for title, desc in functionality_improvements:
        story.append(Paragraph(f"<b>• {title}:</b> {desc}", body_no_indent))
        story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>5.3 Mejoras de UX (Baja Prioridad)</b>", heading2_style))
    
    ux_improvements = [
        ("Welcome Screen", "Configurar una pantalla de bienvenida con instrucciones claras y ejemplos de preguntas que el agente puede responder."),
        ("Typing Indicators", "Implementar indicadores visuales mientras el agente procesa la solicitud del usuario."),
        ("Message Formatting", "Mejorar el formato de las respuestas con soporte para markdown, listas, y enlaces clickeables."),
        ("Conversation History", "Mostrar historial de conversación visible en la interfaz de chat.")
    ]
    
    for title, desc in ux_improvements:
        story.append(Paragraph(f"<b>• {title}:</b> {desc}", body_no_indent))
        story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>5.4 Mejoras Técnicas</b>", heading2_style))
    
    story.append(Paragraph(
        "Desde la perspectiva técnica, el workflow puede optimizarse en varios aspectos para mejorar su rendimiento, mantenibilidad y escalabilidad. Estas mejoras son particularmente importantes si el workflow va a tener uso intensivo o si se planea desplegar en un entorno de producción.",
        body_style
    ))
    
    tech_improvements = [
        ("Persistent Memory", "Reemplazar el memory buffer por una memoria persistente que guarde las conversaciones en una base de datos. Esto permite que los usuarios continúen conversaciones en sesiones diferentes."),
        ("Caching Layer", "Implementar caché para respuestas frecuentes como el clima de ciudades populares o las noticias más solicitadas."),
        ("Logging & Analytics", "Agregar nodos de logging para rastrear el uso del agente, preguntas frecuentes, y errores."),
        ("A/B Testing", "Configurar múltiples versiones del System Message para evaluar cuál produce mejores respuestas."),
        ("Fallback Model", "Configurar un modelo alternativo en caso de que Gemini no esté disponible.")
    ]
    
    for title, desc in tech_improvements:
        story.append(Paragraph(f"<b>• {title}:</b> {desc}", body_no_indent))
        story.append(Spacer(1, 4))
    
    # === SECCIÓN 6: SOLUCIÓN DE PROBLEMAS ===
    story.append(Paragraph("<b>6. Solución de Problemas</b>", heading1_style))
    
    story.append(Paragraph(
        "Durante la implementación y uso del workflow, puedes encontrar varios problemas comunes. A continuación se presenta una guía de diagnóstico y solución para los errores más frecuentes.",
        body_style
    ))
    
    problems_data = [
        [Paragraph('<b>Problema</b>', table_header_style), 
         Paragraph('<b>Causa Probable</b>', table_header_style), 
         Paragraph('<b>Solución</b>', table_header_style)],
        [Paragraph('El agente no responde', table_cell_style), 
         Paragraph('API Key de Gemini inválida o expirada', table_cell_style), 
         Paragraph('Verificar y regenerar la API Key en Google AI Studio', table_cell_style)],
        [Paragraph('Error en clima', table_cell_style), 
         Paragraph('Ubicación no reconocida o API de Open-Meteo no disponible', table_cell_style), 
         Paragraph('Usar nombres de ciudades en inglés o coordenadas específicas', table_cell_style)],
        [Paragraph('Error en noticias', table_cell_style), 
         Paragraph('Fuente RSS no disponible o formato incorrecto', table_cell_style), 
         Paragraph('Verificar que la URL del feed RSS sea accesible', table_cell_style)],
        [Paragraph('Respuestas lentas', table_cell_style), 
         Paragraph('Límite de rate de la API de Gemini alcanzado', table_cell_style), 
         Paragraph('Esperar o actualizar a plan de pago de Gemini', table_cell_style)],
        [Paragraph('Chat no accesible', table_cell_style), 
         Paragraph('Workflow no activado o URL incorrecta', table_cell_style), 
         Paragraph('Activar workflow y verificar la URL de producción', table_cell_style)]
    ]
    
    problems_table = Table(problems_data, colWidths=[1.8*inch, 2*inch, 2.5*inch])
    problems_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1F4E79')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, -1), 'SimHei'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('BACKGROUND', (0, 1), (-1, 1), colors.white),
        ('BACKGROUND', (0, 2), (-1, 2), colors.HexColor('#F5F5F5')),
        ('BACKGROUND', (0, 3), (-1, 3), colors.white),
        ('BACKGROUND', (0, 4), (-1, 4), colors.HexColor('#F5F5F5')),
        ('BACKGROUND', (0, 5), (-1, 5), colors.white),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ]))
    
    story.append(Spacer(1, 12))
    story.append(problems_table)
    story.append(Paragraph("<b>Tabla 3.</b> Guía de solución de problemas", ParagraphStyle(
        name='Caption',
        fontName='SimHei',
        fontSize=10,
        alignment=TA_CENTER,
        spaceBefore=6,
        spaceAfter=12,
        textColor=colors.HexColor('#666666')
    )))
    
    # === SECCIÓN 7: WORKFLOW MEJORADO ===
    story.append(Paragraph("<b>7. Recomendaciones para el Workflow Mejorado</b>", heading1_style))
    
    story.append(Paragraph(
        "Basándome en el análisis completo del workflow proporcionado, te presento un resumen de las mejoras más importantes que deberías implementar. El workflow actual es funcional y bien estructurado, pero tiene oportunidades de mejora significativas que aumentarían su robustez y utilidad.",
        body_style
    ))
    
    story.append(Paragraph("<b>7.1 Cambios Inmediatos Recomendados</b>", heading2_style))
    
    story.append(Paragraph(
        "El primer cambio que recomiendo es mejorar el System Message del agente para incluir instrucciones más específicas sobre manejo de errores y casos edge. El mensaje actual es extenso y bien estructurado, pero podría beneficiarse de secciones adicionales que guíen al agente sobre cómo comportarse cuando las herramientas fallan o cuando el usuario hace preguntas fuera del alcance.",
        body_style
    ))
    
    story.append(Paragraph(
        "El segundo cambio recomendado es agregar un nodo de manejo de errores después del agente. Este nodo capturaría cualquier error y proporcionaría una respuesta amigable al usuario en lugar de mostrar el error técnico. Esto mejoraría significativamente la experiencia del usuario cuando algo sale mal.",
        body_style
    ))
    
    story.append(Paragraph(
        "El tercer cambio es expandir las fuentes RSS de noticias. La lista actual es buena pero podría complementarse con fuentes adicionales en español para usuarios hispanohablantes, como El País, BBC Mundo, o CNN en Español.",
        body_style
    ))
    
    story.append(Paragraph("<b>7.2 Checklist de Implementación</b>", heading2_style))
    
    checklist_items = [
        "Obtener API Key de Google AI Studio desde https://aistudio.google.com/app/apikey",
        "Importar el workflow JSON en n8n",
        "Configurar credenciales de Gemini en el nodo 'Connect Gemini'",
        "Verificar que el nodo muestre indicador verde (conexión exitosa)",
        "Activar el workflow con el interruptor 'Active'",
        "Probar el chat con preguntas de ejemplo: clima, noticias, ideas",
        "Compartir la URL de producción con usuarios (opcional)"
    ]
    
    for i, item in enumerate(checklist_items, 1):
        story.append(Paragraph(f"<b>{i}.</b> {item}", body_no_indent))
        story.append(Spacer(1, 4))
    
    story.append(Spacer(1, 24))
    story.append(Paragraph(
        "<b>Recursos adicionales:</b> Para más información sobre n8n y LangChain, consulta la documentación oficial en https://docs.n8n.io y https://python.langchain.com/docs. El video tutorial mencionado en el workflow está disponible en https://youtu.be/laHIzhsz12E.",
        note_style
    ))
    
    # Generar el PDF
    doc.build(story)
    print(f"PDF generado exitosamente: {output_path}")
    return output_path

if __name__ == '__main__':
    create_pdf()
