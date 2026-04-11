import { stitch } from '@google/stitch-sdk';
import fs from 'fs';

// ─── CONFIG ─────────────────────────────────────────────────────
const screens = [
  { id: 'ebeaba4520e84169a9ea6eb8cb948f2b', file: 'raw-index.html' },
  { id: 'aceb31ac89034fd080fb96d471f68c42', file: 'raw-servicios.html' },
  { id: '02c3d3dfd2c1468d89a3ec4747e22ac0', file: 'raw-casos.html' },
  { id: 'c58ae83b0b9245d3bd7b4a63e204e934', file: 'raw-metodologia.html' },
  { id: '08d49e0791f24cfea20772cb3fef0bbc', file: 'raw-contacto.html' },
  { id: '5a71d4a2d8dc47bbbfe707aa908d4ca3', file: 'raw-blog.html' },
  { id: '8f1cdb1a9d1648b4b9024bdcd2754a21', file: 'raw-recursos.html' },
];

async function downloadFresh() {
  console.log('📥 Downloading fresh Stitch pages...');
  const project = stitch.project("6031028578477106291");
  const allScreens = await project.screens();
  
  for (const target of screens) {
    const screen = allScreens.find(s => s.id === target.id);
    if (!screen) { console.error(`Screen ${target.id} not found`); continue; }
    
    let html = await screen.getHtml();
    if (html.trim().startsWith("http")) {
      const res = await fetch(html.trim());
      html = await res.text();
    }
    fs.writeFileSync(target.file, html);
    console.log(`  ✅ ${target.file} (${html.length} chars)`);
  }
}

// ─── CONTENT MAPS ───────────────────────────────────────────────
// Each page gets specific text replacements: [search, replace]

const GLOBAL_REPLACEMENTS = [
  ['Nebula AI', 'JP Automation'],
  ['NEBULA AI', 'JP AUTOMATION'],
  ['nebula ai', 'JP Automation'],
  ['Nebula', 'JP Automation'],
  ['NEBULA', 'JP AUTOMATION'],
  ['© 2024 JP Automation. Engineered for the Obsidian Era.', '© 2026 JP Automation. Sistemas de automatización e IA para pymes B2B.'],
  ['Engineered for the Obsidian Era. Secure, scalable, and autonomous.', 'Partner de ejecución para dueños y operadores que necesitan escalar con control en USA y LATAM.'],
  ['Engineered for the Obsidian Era', 'Automatización e IA para pymes B2B'],
  ['ALL SYSTEMS OPERATIONAL', 'TODOS LOS SISTEMAS OPERATIVOS'],
];

const INDEX_REPLACEMENTS = [
  // Hero
  ['Architecting the', 'Escala tu revenue sin'],
  ['Future of Intelligence', 'escalar tu equipo'],
  ['Scale your operations with autonomous AI agents built on obsidian-era infrastructure. Precision-engineered for high-performance enterprise automation.', 
   'Diseñamos sistemas comerciales y operativos con automatización e IA para dueños de pymes B2B en USA y LATAM. Tu equipo gana foco, velocidad y previsibilidad sin reemplazar todo tu stack.'],
  ['Intelligence Refined', 'Revenue Systems + Ops Automation'],
  ['Initialize Deployment', 'Agendar Diagnóstico'],
  ['View Documentation', 'Ver Casos Reales'],
  // Trust signals
  ['Trusted by the architects of tomorrow', 'Confiado por equipos que no tienen margen para el error'],
  ['QUANTUM', 'HubSpot'],
  ['Aether', 'Salesforce'],
  ['stratum.ai', 'Make.com'],
  ['Vertex', 'Zapier'],
  ['NOVA', 'Notion'],
  // HUD element
  ['AUDIT_STATUS', 'CONVERSION_STATUS'],
  ['100% SECURE', '+24% VENTAS'],
  // Bento Services
  ['The Neural Infrastructure', 'La Infraestructura Operativa'],
  ['Deploying AI is no longer about simple chat. It\'s about systemic integration, technical audits, and high-fidelity automation across your entire stack.',
   'Automatizar no es conectar apps. Es rediseñar tu sistema comercial-operativo completo para que escale sin fricciones, con trazabilidad y control en tiempo real.'],
  ['Autonomous Agents', 'CRM & Sales Automation'],
  ['Self-healing AI systems that learn your workflows and optimize infrastructure in real-time without human intervention.',
   'Implementamos y optimizamos tu CRM conectándolo con pipelines de venta automatizados. Lead scoring, secuencias de follow-up y handoff comercial-operativo sin fricción manual.'],
  ['Deep Security Audits', 'Revenue Operations'],
  ['Continuous AI-driven vulnerability assessments for obsidian-level protection.',
   'Diseñamos el sistema que conecta ventas, operaciones y postventa en un flujo trazable con KPIs semanales y alertas automáticas.'],
  ['Zero-Latency Sync', 'AI Implementation'],
  ['Proprietary data bridges ensuring 99.99% uptime across decentralized clusters.',
   'Agentes conversacionales B2B, scoring predictivo de leads y extracción de datos. Cero humo, implementación utilitaria con ROI medible.'],
  ['Predictive Modeling', 'Diagnóstico de 45 Minutos'],
  ['Anticipate market shifts with 94% accuracy using JP Automation\'s core LLM.',
   'Agendá tu discovery C-Level. Analizamos tus flujos críticos, identificamos fugas en Excel y trazamos un blueprint de ejecución con ROI claro.'],
  ['Run Benchmarks', 'Agendar Ahora'],
  // CTA Section
  ['Final Stage', 'Siguiente Paso'],
  ['Ready to integrate', '¿Listo para escalar con'],
  ['JP Automation?', 'JP Automation?'],
  ['Join the 450+ enterprises building the next era of high-fidelity automation. Your digital architect is waiting.',
   'Cada semana con procesos manuales es plata evaporizada. El diagnóstico de 45 min revela oportunidades con ROI claro para tu pyme B2B.'],
  ['Enter your corporate email', 'Tu email corporativo'],
  ['Start Integration', 'Agendar Diagnóstico'],
  ['Deployment ready in &lt; 2.4 minutes', 'Primeras métricas en 6-10 semanas'],
  // Footer
  ['Product', 'Servicios'],
  ['Audit', 'Casos'],
  ['Security', 'Metodología'],
  ['API', 'Recursos'],
  ['Social', 'Contacto'],
  ['Twitter', 'LinkedIn'],
  ['Legal', 'Legal'],
  ['Privacy', 'Privacidad'],
  ['Terms', 'Términos'],
];

const SERVICIOS_REPLACEMENTS = [
  ['Nuestros Servicios', 'Nuestros Servicios'],
  ['Engineering the', 'Diseñamos sistemas que'],
  ['Obsidian Era.', 'escalan tu negocio.'],
  ['Transformamos la infraestructura digital a través de una arquitectura técnica superior, integrando inteligencia autónoma en el núcleo de su flujo de trabajo.',
   'Desde lead capture hasta postventa: rediseñamos procesos críticos, automatizamos tareas repetitivas y dejamos ownership claro por rol en tu equipo.'],
  // Service 1
  ['AI Automation &amp; Workflow Scaling', 'CRM & Automatización Comercial'],
  ['AI Automation & Workflow Scaling', 'CRM & Automatización Comercial'],
  ['No solo automatizamos tareas; rediseñamos procesos completos. Implementamos agentes de IA capaces de orquestar flujos de trabajo complejos, eliminando cuellos de botella humanos en la escala empresarial.',
   'No solo conectamos tu CRM. Rediseñamos todo tu ciclo comercial: desde la captación hasta el cierre y onboarding. Automatizamos follow-ups, scoring de leads y handoffs comercial-operativo para eliminar cuellos de botella.'],
  ['AUTONOMOUS AGENTS', 'HUBSPOT / SALESFORCE'],
  ['WORKFLOW SYNC', 'LEAD SCORING'],
  ['LLM INTEGRATION', 'AUTOMATIZACIÓN'],
  ['EXPLORAR AUTOMATIZACIÓN', 'EXPLORAR CRM'],
  // Service 2
  ['IT Audits &amp; Security', 'Revenue Operations'],
  ['IT Audits & Security', 'Revenue Operations'],
  ['Auditorías técnicas exhaustivas. Identificamos vulnerabilidades antes de que se conviertan en incidentes, asegurando su arquitectura contra las amenazas de la era cuántica.',
   'Conectamos ventas, operaciones y postventa en un solo ecosistema medible. Dashboards semanales, SLAs internos y alertas automáticas para mantener control y visibilidad C-Level.'],
  ['Infra Penetration Testing', 'KPIs Semanales Automáticos'],
  ['Compliance Readiness (SOC2)', 'Pipeline Trazable End-to-End'],
  ['Architecture Debt Analysis', 'Alertas de Riesgo en Tiempo Real'],
  ['Status: Audit Glow Active', 'Status: Revenue Ops Activo'],
  // Service 3
  ['WEB ENGINEERING', 'IMPLEMENTACIÓN IA'],
  ['Digital Systems', 'Sistemas de IA'],
  ['that Breathe Performance.', 'que generan resultados.'],
  ['Desarrollamos ecosistemas web de alta gama. Desde interfaces inmersivas con React hasta backends escalables en el edge, construimos el software que impulsa a los líderes del mercado.',
   'Implementamos agentes conversacionales B2B, scoring predictivo de leads y extracción automática de datos. Sin humo ni promesas vacías: IA utilitaria con ROI medible desde la semana 6.'],
  ['Uptime', 'Menos Bottlenecks'],
  ['99.9%', '-31%'],
  ['Latency', 'Más Conversión'],
  ['&lt;50ms', '+24%'],
  ['Lighthouse Score', 'Primeras Métricas'],
  ['100', '6-10 sem'],
  ['Encryption', 'Sin Lock-in'],
  ['256bit', '100%'],
  // Execution protocols
  ['Protocolos de Ejecución', 'Metodología de Ejecución'],
  ['Discovery &amp; Depth', 'Discovery & Diagnóstico'],
  ['Discovery & Depth', 'Discovery & Diagnóstico'],
  ['Iniciamos cada proyecto con un análisis forense de su infraestructura actual para detectar ineficiencias invisibles.',
   'Arrancamos con un diagnóstico de 45 minutos donde mapeamos tus flujos críticos, identificamos fugas operativas y priorizamos por impacto en caja.'],
  ['Obsidian Integration', 'Implementación Iterativa'],
  ['Implementamos soluciones en entornos oscuros y seguros, garantizando que el flujo de datos nunca se vea comprometido.',
   'Ejecutamos en sprints cortos. Primero quick wins, después escalado controlado. Cada fase termina con métricas, handoff y decisión de siguiente paso.'],
  ['Continuous Evolution', 'Transferencia & Ownership'],
  ['La IA no es estática. Nuestros sistemas aprenden de su comportamiento operativo para optimizarse automáticamente.',
   'No creamos dependencia. Dejamos playbooks, dashboards y ownership claro por rol para que tu equipo opere autónomamente después del delivery.'],
  // CTA
  ['Ready to Architect', '¿Listo para escalar'],
  ['Your Future?', 'tu operación?'],
  ['Conéctate con nuestros ingenieros para una consulta técnica profunda sobre cómo JP Automation puede escalar tu visión.',
   'Agendá tu diagnóstico de 45 minutos. Salís con prioridades claras, quick wins identificados y un estimado de ROI por área.'],
  ['INICIAR CONSULTA', 'AGENDAR DIAGNÓSTICO'],
  ['VER DOCUMENTACIÓN', 'VER METODOLOGÍA'],
];

const CASOS_REPLACEMENTS = [
  ['Case Studies', 'Casos de Éxito'],
  ['battle-tested', 'probados en campo'],
  ['neural systems', 'sistemas de automatización'],
  ['Neural systems', 'Sistemas de automatización'],
  ['NEURAL', 'AUTOMATIZACIÓN'],
  ['neural', 'automatización'],
  ['Obsidian', 'B2B'],
  ['obsidian', 'B2B'],
  ['dark-net', 'operativo'],
  ['quantum', 'comercial'],
  ['Quantum', 'Comercial'],
  ['PROJECT_CLASSIFIED', 'CASO VERIFICADO'],
  ['Autonomous', 'Automatizado'],
  ['autonomous', 'automatizado'],
  ['cyberattack', 'ineficiencia operativa'],
  ['infrastructure vulnerability', 'cuello de botella comercial'],
  ['latency', 'tiempo de respuesta'],
  ['uptime', 'eficiencia operativa'],
  ['99.97%', '-31%'],
  ['breach', 'fuga de información'],
  ['encrypted', 'trazable'],
  ['encryption', 'trazabilidad'],
  ['Confidential', 'Verificado'],
  ['CONFIDENTIAL', 'VERIFICADO'],
  ['View full case study', 'Leer caso completo'],
  ['View Full Case Study', 'Leer Caso Completo'],
  ['VIEW FULL REPORT', 'LEER CASO COMPLETO'],
  ['Request Access', 'Solicitar Acceso'],
  ['Filed under NDA', 'Resultados verificables'],
  ['CLASSIFIED', 'VERIFICADO'],
];

const METODOLOGIA_REPLACEMENTS = [
  ['Our Methodology', 'Nuestra Metodología'],
  ['Protocol', 'Fase'],
  ['PROTOCOL', 'FASE'],
  ['protocol', 'fase'],
  ['Obsidian', 'de Ejecución'],
  ['obsidian', 'de ejecución'],
  ['Neural', 'Operativa'],
  ['neural', 'operativa'],
  ['Dark', 'Ágil'],
  ['dark', 'ágil'],
  ['Quantum', 'Medible'],
  ['quantum', 'medible'],
  ['audit', 'diagnóstico'],
  ['Audit', 'Diagnóstico'],
  ['deploy', 'implementar'],
  ['Deploy', 'Implementar'],
  ['deployment', 'implementación'],
  ['Deployment', 'Implementación'],
  ['infrastructure', 'operaciones'],
  ['Infrastructure', 'Operaciones'],
  ['zero-trust', 'sin lock-in'],
  ['Zero-Trust', 'Sin Lock-in'],
  ['penetration testing', 'mapeo de procesos'],
  ['vulnerability', 'ineficiencia'],
  ['threat detection', 'detección de cuellos de botella'],
  ['encryption', 'automatización'],
  ['firewall', 'flujo operativo'],
];

const CONTACTO_REPLACEMENTS = [
  ['Contact', 'Contacto'],
  ['Get in Touch', 'Hablemos'],
  ['Get In Touch', 'Hablemos'],
  ['Connect with', 'Conectá con'],
  ['our team', 'nuestro equipo'],
  ['Our engineers are ready', 'Nuestro equipo está listo'],
  ['Start your journey', 'Empezá tu transformación'],
  ['Submit', 'Enviar'],
  ['SUBMIT', 'ENVIAR'],
  ['Message', 'Mensaje'],
  ['Full Name', 'Nombre Completo'],
  ['full name', 'nombre completo'],
  ['Email', 'Email Corporativo'],
  ['Company', 'Empresa'],
  ['company', 'empresa'],
  ['Phone', 'Teléfono'],
  ['phone', 'teléfono'],
  ['Subject', 'Asunto'],
  ['How can we help?', '¿Qué querés automatizar?'],
  ['Tell us about your project', 'Contanos qué querés resolver'],
  ['Send Message', 'Enviar Mensaje'],
  ['SEND MESSAGE', 'ENVIAR MENSAJE'],
  ['Schedule a call', 'Agendar llamada'],
  ['Our Response Time', 'Tiempo de Respuesta'],
  ['&lt; 24 hours', '&lt; 24 horas'],
  ['< 24 hours', '< 24 horas'],
  ['Global Offices', 'Cobertura'],
  ['San Francisco', 'USA'],
  ['London', 'LATAM'],
  ['Tokyo', 'Remoto'],
];

const BLOG_REPLACEMENTS = [
  ['The Codex', 'Blog'],
  ['THE CODEX', 'BLOG'],
  ['Technical dispatches', 'Artículos estratégicos sobre'],
  ['from the frontier of', 'automatización, IA y operaciones para'],
  ['autonomous intelligence', 'pymes B2B'],
  ['Read Article', 'Leer Artículo'],
  ['READ ARTICLE', 'LEER ARTÍCULO'],
  ['Read article', 'Leer artículo'],
  ['Featured', 'Destacado'],
  ['FEATURED', 'DESTACADO'],
  ['Latest', 'Recientes'],
  ['LATEST', 'RECIENTES'],
  ['min read', 'min lectura'],
  ['MIN READ', 'MIN LECTURA'],
];

const RECURSOS_REPLACEMENTS = [
  ['Resources', 'Recursos'],
  ['RESOURCES', 'RECURSOS'],
  ['Resource Hub', 'Centro de Recursos'],
  ['RESOURCE HUB', 'CENTRO DE RECURSOS'],
  ['Documentation', 'Documentación'],
  ['DOCUMENTATION', 'DOCUMENTACIÓN'],
  ['Download', 'Descargar'],
  ['DOWNLOAD', 'DESCARGAR'],
  ['Whitepaper', 'Guía'],
  ['WHITEPAPER', 'GUÍA'],
  ['whitepaper', 'guía'],
  ['Guide', 'Guía'],
  ['Technical deep-dives', 'Guías prácticas'],
  ['deep-dive', 'guía práctica'],
  ['toolkit', 'herramientas'],
  ['Toolkit', 'Herramientas'],
  ['framework', 'framework'],
  ['Blueprint', 'Plantilla'],
  ['blueprint', 'plantilla'],
  ['Case Study', 'Caso de Éxito'],
  ['case study', 'caso de éxito'],
  ['Webinar', 'Webinar'],
  ['webinar', 'webinar'],
];

// ─── PAGE DEFINITIONS ───────────────────────────────────────────
const pagesDef = [
  { raw: 'raw-index.html', out: 'index.html', enOut: 'en/index.html',
    title: 'JP Automation | Automatización e IA para pymes B2B',
    enTitle: 'JP Automation | Automation & AI for B2B SMBs',
    desc: 'Diseñamos sistemas comerciales y operativos con automatización e IA para dueños y operadores de pymes en USA y LATAM.',
    enDesc: 'We design commercial and operations systems with automation and AI for SMB owners in the US and LATAM.',
    canonical: 'https://jpautomation.com/', enCanonical: 'https://jpautomation.com/en/index.html',
    activeEs: 'Inicio', activeEn: 'Home',
    replacements: INDEX_REPLACEMENTS },
  { raw: 'raw-servicios.html', out: 'servicios.html', enOut: 'en/services.html',
    title: 'Servicios | JP Automation', enTitle: 'Services | JP Automation',
    desc: 'CRM, Revenue Ops, automatización e IA para pymes B2B en USA y LATAM.',
    enDesc: 'CRM, Revenue Ops, automation and AI for B2B SMBs in the US and LATAM.',
    canonical: 'https://jpautomation.com/servicios.html', enCanonical: 'https://jpautomation.com/en/services.html',
    activeEs: 'Servicios', activeEn: 'Services',
    replacements: SERVICIOS_REPLACEMENTS },
  { raw: 'raw-casos.html', out: 'casos.html', enOut: 'en/cases.html',
    title: 'Casos de Éxito | JP Automation', enTitle: 'Case Studies | JP Automation',
    desc: 'Resultados reales en equipos B2B que necesitaban escalar sin perder control operativo.',
    enDesc: 'Real results from B2B teams that needed to scale without losing operational control.',
    canonical: 'https://jpautomation.com/casos.html', enCanonical: 'https://jpautomation.com/en/cases.html',
    activeEs: 'Casos', activeEn: 'Cases',
    replacements: CASOS_REPLACEMENTS },
  { raw: 'raw-metodologia.html', out: 'metodologia.html', enOut: 'en/methodology.html',
    title: 'Metodología | JP Automation', enTitle: 'Methodology | JP Automation',
    desc: 'Discovery corto, priorización dura y sprints de ejecución para pymes B2B.',
    enDesc: 'Short discovery, strict prioritization and execution sprints for B2B SMBs.',
    canonical: 'https://jpautomation.com/metodologia.html', enCanonical: 'https://jpautomation.com/en/methodology.html',
    activeEs: 'Metodología', activeEn: 'Methodology',
    replacements: METODOLOGIA_REPLACEMENTS },
  { raw: 'raw-contacto.html', out: 'contacto.html', enOut: 'en/contact.html',
    title: 'Contacto | JP Automation', enTitle: 'Contact | JP Automation',
    desc: 'Agendá tu diagnóstico de 45 minutos con ROI claro.',
    enDesc: 'Book your 45-minute assessment with clear ROI.',
    canonical: 'https://jpautomation.com/contacto.html', enCanonical: 'https://jpautomation.com/en/contact.html',
    activeEs: 'Contacto', activeEn: 'Contact',
    replacements: CONTACTO_REPLACEMENTS },
  { raw: 'raw-blog.html', out: 'blog.html', enOut: 'en/blog.html',
    title: 'Blog | JP Automation', enTitle: 'Blog | JP Automation',
    desc: 'Artículos sobre automatización, IA y operaciones para pymes B2B.',
    enDesc: 'Articles on automation, AI and operations for B2B SMBs.',
    canonical: 'https://jpautomation.com/blog.html', enCanonical: 'https://jpautomation.com/en/blog.html',
    activeEs: 'Blog', activeEn: 'Blog',
    replacements: BLOG_REPLACEMENTS },
  { raw: 'raw-recursos.html', out: 'recursos.html', enOut: 'en/resources.html',
    title: 'Recursos | JP Automation', enTitle: 'Resources | JP Automation',
    desc: 'Guías, plantillas y herramientas para automatizar tu pyme B2B.',
    enDesc: 'Guides, templates and tools to automate your B2B SMB.',
    canonical: 'https://jpautomation.com/recursos.html', enCanonical: 'https://jpautomation.com/en/resources.html',
    activeEs: 'Recursos', activeEn: 'Resources',
    replacements: RECURSOS_REPLACEMENTS },
];

// ─── NAVBAR ─────────────────────────────────────────────────────
function navbar(activeLabel, isEn, page) {
  const esLinks = [
    { l: 'Inicio', h: 'index.html' }, { l: 'Servicios', h: 'servicios.html' },
    { l: 'Casos', h: 'casos.html' }, { l: 'Metodología', h: 'metodologia.html' },
    { l: 'Recursos', h: 'recursos.html' }, { l: 'Blog', h: 'blog.html' },
    { l: 'Contacto', h: 'contacto.html' },
  ];
  const enLinks = [
    { l: 'Home', h: 'index.html' }, { l: 'Services', h: 'services.html' },
    { l: 'Cases', h: 'cases.html' }, { l: 'Methodology', h: 'methodology.html' },
    { l: 'Resources', h: 'resources.html' }, { l: 'Blog', h: 'blog.html' },
    { l: 'Contact', h: 'contact.html' },
  ];
  const links = isEn ? enLinks : esLinks;
  const navHtml = links.map(l => {
    const cls = l.l === activeLabel
      ? 'text-purple-400 border-b border-purple-500/50 pb-1 hover:text-purple-300'
      : 'text-zinc-400 hover:text-purple-300';
    return `<a class="${cls} transition-colors duration-300" href="${l.h}">${l.l}</a>`;
  }).join('\n');

  const esHref = isEn ? `../${page.out}` : page.out;
  const enHref = isEn ? page.enOut.replace('en/','') : `en/${page.enOut.replace('en/','')}`;

  return `<nav class="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-xl shadow-[0_0_20px_rgba(168,85,247,0.15)]">
<div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
<a href="${isEn ? 'index.html' : 'index.html'}" class="text-2xl font-bold tracking-tighter text-white uppercase">JP Automation</a>
<div class="hidden md:flex items-center space-x-8 tracking-tight font-medium">
${navHtml}
<div class="flex items-center gap-2 ml-4 pl-4 border-l border-zinc-700">
<a class="${isEn ? '' : 'text-purple-400'} text-xs font-bold uppercase tracking-widest hover:text-purple-300 transition-colors" href="${esHref}">ES</a>
<span class="text-zinc-600">|</span>
<a class="${isEn ? 'text-purple-400' : ''} text-xs font-bold uppercase tracking-widest hover:text-purple-300 transition-colors" href="${enHref}">EN</a>
</div>
</div>
<a class="bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed px-6 py-2.5 rounded-lg font-bold hover:scale-95 active:scale-90 transition-transform" href="${isEn ? 'contact.html' : 'contacto.html'}">${isEn ? 'Get Started' : 'Empezar'}</a>
</div>
</nav>`;
}

// ─── FOOTER ─────────────────────────────────────────────────────
function footer(isEn) {
  if (isEn) return `<footer class="bg-black w-full border-t border-zinc-900">
<div class="max-w-7xl mx-auto px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-12 text-sm">
<div class="col-span-2 md:col-span-1 space-y-6">
<div class="text-lg font-black text-white uppercase">JP Automation</div>
<p class="text-zinc-500">Execution partner for owners scaling B2B SMB teams in the US and LATAM.</p>
</div>
<div class="flex flex-col gap-4">
<h4 class="text-white font-bold mb-2 uppercase tracking-widest text-xs">Explore</h4>
<a class="text-zinc-500 hover:text-purple-400 transition-colors" href="services.html">Services</a>
<a class="text-zinc-500 hover:text-purple-400 transition-colors" href="cases.html">Cases</a>
<a class="text-zinc-500 hover:text-purple-400 transition-colors" href="blog.html">Blog</a>
</div>
<div class="flex flex-col gap-4">
<h4 class="text-white font-bold mb-2 uppercase tracking-widest text-xs">Next Step</h4>
<a class="text-zinc-500 hover:text-purple-400 transition-colors" href="contact.html">Book Assessment</a>
<a class="text-zinc-500 hover:text-purple-400 transition-colors" href="methodology.html">Methodology</a>
<a class="text-zinc-500 hover:text-purple-400 transition-colors" href="resources.html">Resources</a>
</div>
<div class="flex flex-col gap-4">
<h4 class="text-white font-bold mb-2 uppercase tracking-widest text-xs">Legal</h4>
<a class="text-zinc-500 hover:text-purple-400 transition-colors" href="#">Privacy</a>
<a class="text-zinc-500 hover:text-purple-400 transition-colors" href="#">Terms</a>
</div>
</div>
<div class="max-w-7xl mx-auto px-8 pb-8 flex flex-col md:flex-row justify-between items-center border-t border-zinc-900/50 pt-8 gap-4">
<p class="text-zinc-500 text-[10px]">© 2026 JP Automation. Automation & AI systems for SMB B2B.</p>
<div class="flex gap-6 items-center"><span class="w-2 h-2 rounded-full bg-emerald-500"></span>
<span class="text-zinc-500 text-[10px]">ALL SYSTEMS OPERATIONAL</span></div>
</div>
</footer>`;

  return `<footer class="bg-black w-full border-t border-zinc-900">
<div class="max-w-7xl mx-auto px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-12 text-sm">
<div class="col-span-2 md:col-span-1 space-y-6">
<div class="text-lg font-black text-white uppercase">JP Automation</div>
<p class="text-zinc-500">Partner de ejecución para dueños y operadores que escalan pymes B2B en USA y LATAM.</p>
</div>
<div class="flex flex-col gap-4">
<h4 class="text-white font-bold mb-2 uppercase tracking-widest text-xs">Explorar</h4>
<a class="text-zinc-500 hover:text-purple-400 transition-colors" href="servicios.html">Servicios</a>
<a class="text-zinc-500 hover:text-purple-400 transition-colors" href="casos.html">Casos</a>
<a class="text-zinc-500 hover:text-purple-400 transition-colors" href="blog.html">Blog</a>
</div>
<div class="flex flex-col gap-4">
<h4 class="text-white font-bold mb-2 uppercase tracking-widest text-xs">Siguiente Paso</h4>
<a class="text-zinc-500 hover:text-purple-400 transition-colors" href="contacto.html">Agendar Diagnóstico</a>
<a class="text-zinc-500 hover:text-purple-400 transition-colors" href="metodologia.html">Metodología</a>
<a class="text-zinc-500 hover:text-purple-400 transition-colors" href="recursos.html">Recursos</a>
</div>
<div class="flex flex-col gap-4">
<h4 class="text-white font-bold mb-2 uppercase tracking-widest text-xs">Legal</h4>
<a class="text-zinc-500 hover:text-purple-400 transition-colors" href="#">Privacidad</a>
<a class="text-zinc-500 hover:text-purple-400 transition-colors" href="#">Términos</a>
</div>
</div>
<div class="max-w-7xl mx-auto px-8 pb-8 flex flex-col md:flex-row justify-between items-center border-t border-zinc-900/50 pt-8 gap-4">
<p class="text-zinc-500 text-[10px]">© 2026 JP Automation. Sistemas de automatización e IA para pymes B2B.</p>
<div class="flex gap-6 items-center"><span class="w-2 h-2 rounded-full bg-emerald-500"></span>
<span class="text-zinc-500 text-[10px]">TODOS LOS SISTEMAS OPERATIVOS</span></div>
</div>
</footer>`;
}

// ─── HEAD BUILDER ───────────────────────────────────────────────
function buildHead(page, isEn) {
  const t = isEn ? page.enTitle : page.title;
  const d = isEn ? page.enDesc : page.desc;
  const c = isEn ? page.enCanonical : page.canonical;
  const esUrl = `https://jpautomation.com/${page.out}`;
  const enUrl = `https://jpautomation.com/${page.enOut}`;
  return `<!DOCTYPE html>
<html class="dark" lang="${isEn ? 'en' : 'es'}">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>${t}</title>
<meta name="description" content="${d}"/>
<link rel="canonical" href="${c}"/>
<link rel="alternate" hreflang="es" href="${esUrl}"/>
<link rel="alternate" hreflang="en" href="${enUrl}"/>
<link rel="alternate" hreflang="x-default" href="${esUrl}"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="${t}"/>
<meta property="og:description" content="${d}"/>
<meta property="og:url" content="${c}"/>
<meta property="og:image" content="https://jpautomation.com/assets/img/og-image.svg"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${t}"/>
<meta name="twitter:description" content="${d}"/>`;
}

// ─── TRANSFORM ──────────────────────────────────────────────────
function transform(page, isEn) {
  const raw = fs.readFileSync(page.raw, 'utf8');

  // Extract head resources (tailwind, fonts, styles)
  const twScript = raw.match(/<script src="https:\/\/cdn\.tailwindcss[^"]*"><\/script>/)?.[0] || '';
  const twConfig = raw.match(/<script id="tailwind-config">[\s\S]*?<\/script>/)?.[0] || '';
  const styleBlock = raw.match(/<style>[\s\S]*?<\/style>/)?.[0] || '';
  const fontLinks = raw.match(/<link[^>]*fonts\.googleapis[^>]*\/>/g)?.join('\n') || '';

  // Extract main
  const mainMatch = raw.match(/<main[\s\S]*?<\/main>/i);
  if (!mainMatch) { console.error(`No <main> in ${page.raw}`); return; }
  let main = mainMatch[0];

  // Apply global replacements
  for (const [s, r] of GLOBAL_REPLACEMENTS) {
    main = main.split(s).join(r);
  }
  // Apply page-specific replacements
  for (const [s, r] of page.replacements) {
    main = main.split(s).join(r);
  }

  // Fix image paths for EN
  if (isEn) {
    main = main.replace(/src="assets\//g, 'src="../assets/');
  }

  const activeLabel = isEn ? page.activeEn : page.activeEs;
  const jsPath = isEn ? '../assets/js/main.js' : 'assets/js/main.js';

  const fullHtml = `${buildHead(page, isEn)}
${fontLinks}
${twScript}
${twConfig}
${styleBlock}
</head>
<body class="bg-background text-on-surface selection:bg-primary selection:text-on-primary">
${navbar(activeLabel, isEn, page)}
${main}
${footer(isEn)}
<script src="${jsPath}"></script>
</body>
</html>`;

  const outFile = isEn ? page.enOut : page.out;
  fs.writeFileSync(outFile, fullHtml);
  console.log(`  ✅ ${outFile}`);
}

// ─── MAIN ───────────────────────────────────────────────────────
async function main() {
  // Step 1: Download fresh
  await downloadFresh();

  // Step 2: Ensure en/ directory
  if (!fs.existsSync('en')) fs.mkdirSync('en', { recursive: true });

  // Step 3: Transform each page (ES + EN)
  console.log('\n🔧 Adapting content...');
  for (const page of pagesDef) {
    transform(page, false); // ES
    transform(page, true);  // EN
  }

  // Step 4: Clean raw files
  for (const s of screens) {
    if (fs.existsSync(s.file)) fs.unlinkSync(s.file);
  }

  console.log('\n🎉 Done! 14 pages adapted to JP Automation.');
  console.log('   7 ES pages + 7 EN pages with full SEO, nav, and business content.');
}

main().catch(console.error);
