# Preflight checks

Script liviano para correr chequeos repetibles antes de deploy.

## Archivo

- `scripts/preflight.sh`

## Qué valida

1. Que haya un servidor local respondiendo en `http://127.0.0.1:8080` (no lo inicia).
2. Que rutas clave respondan `200` (incluye `404.html` como ruta estática que también debe responder `200`).
3. Que no existan `href="#"` en páginas productivas HTML (excluye `design-home-proposal.html`).
4. Que existan páginas legales y `netlify.toml`.
5. Muestra resumen claro `PASS/FAIL` y sale con código `0`/`1`.

## Uso

Desde la raíz del proyecto:

```bash
chmod +x scripts/preflight.sh
./scripts/preflight.sh
```

## Códigos de salida

- `0`: todos los checks pasaron.
- `1`: uno o más checks fallaron.

## Nota

Si falla el primer check, levantá tu server local en `127.0.0.1:8080` y volvé a ejecutar el script.
