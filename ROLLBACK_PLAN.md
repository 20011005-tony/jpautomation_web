# Plan de Rollback (Producción)

## 1) Condiciones que disparan rollback

Ejecutar rollback si ocurre cualquiera de estas condiciones y no se puede resolver rápido con hotfix seguro:

- Error crítico de disponibilidad (sitio caído o inestable).
- Formularios de contacto dejan de funcionar (pérdida de leads).
- Redirecciones rotas que afectan navegación principal.
- Errores severos en páginas legales, home o rutas clave.
- Problema SEO técnico grave post-deploy (robots bloqueando, sitemap corrupto, hreflang roto masivo).

> Regla operativa: si el impacto es alto y la mitigación supera 15-30 min, rollback primero, análisis después.

---

## 2) Procedimiento rápido de rollback en Netlify

1. Entrar a **Netlify > Site > Deploys**.
2. Identificar el último deploy estable previo al incidente.
3. Abrir opciones del deploy estable y seleccionar **Publish deploy**.
4. Esperar confirmación de publicación.
5. Forzar refresh y validar dominio de producción.

### Si el problema es de configuración

- Revisar variables de entorno y `netlify.toml`.
- Restaurar configuración previa conocida.
- Evitar nuevos cambios en paralelo hasta estabilizar.

---

## 3) Verificación post-rollback

- [ ] Home y navegación principal operativas.
- [ ] Formularios vuelven a enviar correctamente.
- [ ] Páginas legales accesibles (`privacidad`, `terminos`).
- [ ] `https` y redirects canónicos funcionando.
- [ ] `robots.txt` y `sitemap.xml` responden correctamente.
- [ ] No hay errores críticos en consola/logs inmediatos.

Si todo está OK, declarar servicio **estabilizado** y abrir análisis de causa raíz.

---

## 4) Plantilla de nota de incidente

```md
# Incidente de Producción

## Resumen
- Fecha/hora inicio:
- Fecha/hora mitigación:
- Responsable on-call:
- Severidad:

## Impacto
- Qué se rompió:
- Usuarios/negocio afectados:

## Detección
- Cómo se detectó (monitoring, reporte, QA):

## Acción tomada
- Rollback aplicado a deploy:
- Hora exacta del rollback:
- Verificaciones ejecutadas:

## Estado actual
- [ ] Estable
- [ ] Monitoreo reforzado
- [ ] Pendiente fix definitivo

## Próximos pasos
- Causa raíz:
- Acción correctiva:
- Acción preventiva:
```
