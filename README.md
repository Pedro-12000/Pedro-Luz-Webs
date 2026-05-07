# CreadorWebs

Web comercial para presentar servicios de creación y modernización de páginas web para negocios, autónomos, proyectos personales, portfolios, servicios profesionales y pequeñas marcas.

Sitio publicado en:

https://creadorwebs.es

## Web pública

La web pública está en la carpeta `web/`.

Netlify debe publicar únicamente esa carpeta:

```toml
[build]
  publish = "web"
```

## Qué incluye

- Portfolio comercial
- Sección de servicios
- Carrusel de demos por tipo de web
- Caso real publicado
- Páginas de privacidad y cookies
- Preparación para despliegue en Netlify

## Estructura

```text
web/
  index.html
  styles.css
  script.js
  assets/
  privacidad.html
  cookies.html
  demos/
```

## Demos

Las demos están dentro de `web/demos/` y sirven como ejemplos visuales de posibles webs para distintos tipos de proyecto.

Son demos ficticias y están marcadas como `noindex` para que no se indexen como negocios reales.

## Despliegue

El proyecto está preparado para publicarse en Netlify desde GitHub.

Dominio principal:

https://creadorwebs.es
