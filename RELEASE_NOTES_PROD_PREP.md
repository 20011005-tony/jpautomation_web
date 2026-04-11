# Release Notes — Preparación Producción

## Resumen (sesión actual)

- Se creó `DEPLOY_RUNBOOK.md` con procedimiento operativo de deploy a producción.
- Se incorporó checklist de precondiciones antes de publicar.
- Se documentaron pasos de deploy manual en Netlify y deploy por CLI.
- Se agregó checklist de DNS/dominio, SSL y redirects para evitar errores de publicación.
- Se incluyó checklist post-deploy orientado a operación real:
  - formularios,
  - páginas legales,
  - `hreflang`,
  - `sitemap.xml`,
  - `robots.txt`.
- Se definió plan de monitoreo de las primeras 24 horas con ventanas de control.
- Se creó `ROLLBACK_PLAN.md` con:
  - condiciones de activación,
  - procedimiento rápido de rollback en Netlify,
  - verificación posterior,
  - plantilla de nota de incidente.

## Resultado

Queda disponible un paquete mínimo de documentación operativa para despliegue seguro, reversión rápida y trazabilidad de incidentes en producción.
