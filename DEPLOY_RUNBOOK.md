# Runbook de Deploy a Producción

## 1) Checklist de precondiciones

- [ ] Cambios aprobados y validados en entorno previo (staging o equivalente).
- [ ] Backup/export de contenido crítico disponible (si aplica).
- [ ] `netlify.toml` revisado (redirects, headers, build settings).
- [ ] Variables de entorno de producción cargadas en Netlify.
- [ ] DNS del dominio principal y secundarios documentados.
- [ ] Responsables de guardia definidos (quién deploya y quién monitorea).
- [ ] Ventana de despliegue confirmada (evitar horarios de alto tráfico si hay riesgo).

---

## 2) Deploy en Netlify

### A. Manual (UI de Netlify)

1. Entrar a **Netlify > Site** correcto.
2. Ir a **Deploys**.
3. Verificar que el último deploy exitoso corresponde al commit/release esperado.
4. Ejecutar deploy:
   - Si hay integración con Git: **Trigger deploy** (clear cache solo si es necesario).
   - Si es drag-and-drop/manual: subir artefacto correcto.
5. Esperar estado **Published**.
6. Abrir URL de producción y validar home + páginas críticas.

### B. CLI (Netlify CLI)

> Requiere autenticación previa con `netlify login`.

1. Verificar site linkeado:

```bash
netlify status
```

2. Deploy de producción (directo a prod):

```bash
netlify deploy --prod
```

3. Si se usa carpeta de publish explícita:

```bash
netlify deploy --prod --dir=<carpeta_publicada>
```

4. Confirmar URL publicada en salida de CLI y validar en navegador.

---

## 3) Checklist de DNS y dominio

- [ ] Dominio principal apunta al sitio correcto en Netlify.
- [ ] `www` configurado (CNAME/ALIAS) según estrategia definida.
- [ ] Dominio canónico definido (ej: sin `www` o con `www`).
- [ ] TTL razonable durante ventana de cambios críticos.
- [ ] No hay registros DNS obsoletos de proveedores anteriores.

---

## 4) Validaciones de SSL y redirects

- [ ] Certificado SSL activo en Netlify (estado válido, no vencido).
- [ ] Acceso por `https://` funciona en dominio principal.
- [ ] `http://` redirige a `https://`.
- [ ] Redirección `www` ↔ raíz funciona según canonical definido.
- [ ] No hay loops de redirección.
- [ ] Rutas legales (`/privacidad.html`, `/terminos.html`) responden 200.

---

## 5) Checklist post-deploy (funcional + SEO técnico)

### Formularios
- [ ] Formulario de contacto envía correctamente.
- [ ] Llegan notificaciones/mails esperados.
- [ ] Validaciones cliente/servidor responden correctamente ante errores.

### Páginas legales
- [ ] Política de privacidad accesible y actualizada.
- [ ] Términos y condiciones accesibles y actualizados.

### Internacionalización / hreflang
- [ ] Etiquetas `hreflang` presentes y correctas entre versiones de idioma.
- [ ] URLs de idioma no retornan 404.

### Sitemap y robots
- [ ] `https://<dominio>/sitemap.xml` responde 200 y contiene URLs válidas.
- [ ] `https://<dominio>/robots.txt` responde 200 y no bloquea secciones críticas por error.

### Smoke general
- [ ] Home carga sin errores visuales severos.
- [ ] Navegación principal funciona.
- [ ] Páginas clave (servicios, contacto, blog, recursos) responden 200.

---

## 6) Monitoreo primeras 24h

### 0-1 hora
- Revisar errores 4xx/5xx en logs/analytics.
- Confirmar envíos reales de formularios.
- Verificar Core Web Vitals básicos y tiempos de respuesta iniciales.

### 1-6 horas
- Monitorear picos de error o caídas de conversiones.
- Revisar rastreo básico (Search Console si ya está integrado).
- Confirmar que redirects críticos siguen estables.

### 6-24 horas
- Validar estabilidad general del sitio (sin degradación).
- Revisar incidencias reportadas por usuarios/equipo comercial.
- Cerrar ventana de observación con estado: **OK** o **requiere rollback/hotfix**.

---

## Escalación rápida

- Si hay caída total, errores masivos o pérdida de leads: ejecutar `ROLLBACK_PLAN.md` inmediatamente.
