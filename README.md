# JP Automation - Sitio estatico multipagina

Sitio web estatico para JP Automation, orientado a conversion, SEO y captacion de leads para pymes de LATAM.

## Como usar

1. Abri `index.html` con doble click, o
2. Levanta Live Server sobre este directorio (`/home/joseperera/Descargas/jpautomation_web`).

No requiere build, framework ni dependencias.

## Estructura

```text
jpautomation_web/
├── index.html
├── servicios.html
├── casos.html
├── blog.html
├── contacto.html
├── metodologia.html
├── recursos.html
├── robots.txt
├── sitemap.xml
├── blog/
│   ├── costo-no-usar-ia-pymes.html
│   ├── procesos-automatizables-pymes.html
│   └── ia-ventas-operaciones-pymes.html
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── main.js
    └── img/
        ├── logo-jp-automation.svg
        └── og-image.svg
```

## Lo implementado

- Sitio completo multi-pagina con navegacion consistente.
- SEO on-page por pagina:
  - `title` y `meta description` unicos.
  - Open Graph y Twitter Cards.
  - Canonical por URL.
  - Estructura semantica con `h1` unico por pagina.
- JSON-LD:
  - `Organization` + `WebSite` en `index.html`.
  - `Article` en cada post del blog.
- Conversion y leads:
  - Hero con propuesta de valor + CTA principal.
  - Formularios front-end con validacion basica (JS).
  - Bloques de prueba social/casos.
  - FAQ de objeciones en home.
  - Lead magnet y formulario en `recursos.html`.
- Blog:
  - Listado en `blog.html`.
  - 3 articulos de nivel estrategico sobre IA aplicada en pymes.
- SEO tecnico:
  - `robots.txt`
  - `sitemap.xml`

## JS (assets/js/main.js)

- Menu mobile (toggle con `aria-expanded`).
- Validacion simple de formularios (`nombre`, `email`, `telefono`).
- FAQ accordion.
- Animaciones de entrada por `IntersectionObserver`.

## Nota de despliegue

El sitio usa canonicals y URLs absolutas de ejemplo bajo `https://comfy-zabaione-3dc4af.netlify.app/`.
Si se publica en otro dominio, conviene actualizar:

- canonicals en cada HTML,
- `og:url`,
- `sitemap.xml`,
- `robots.txt`.
