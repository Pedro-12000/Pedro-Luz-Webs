# CreadorWebs

CreadorWebs es la web comercial de un servicio de creación y modernización de páginas web para negocios, autónomos, proyectos personales, portfolios, servicios profesionales y pequeñas marcas.

El objetivo es explicar de forma clara qué tipo de webs puedo preparar, enseñar ejemplos visuales mediante demos ficticias y facilitar el contacto por WhatsApp, email, teléfono o Instagram.

Sitio publicado: <https://creadorwebs.es>

## Qué incluye

- Página principal comercial.
- Páginas para negocios, autónomos, locales y proyectos.
- Páginas sectoriales para restaurantes, peluquerías, clínicas, academias, tiendas, autoescuelas, fotógrafos y servicios profesionales.
- Demos ficticias dentro del portfolio.
- Caso real publicado como referencia visual y técnica.
- Proceso de trabajo, preguntas frecuentes y contacto.
- Páginas legales de privacidad y cookies.
- `sitemap.xml` y `robots.txt` para SEO básico.
- Página `404.html` personalizada.

## Páginas principales

- `web/index.html`
- `web/webs-para-negocios.html`
- `web/webs-para-autonomos.html`
- `web/webs-para-locales.html`
- `web/webs-para-proyectos.html`

## Páginas por sector

- `web/webs-para-restaurantes.html`
- `web/webs-para-peluquerias.html`
- `web/webs-para-clinicas.html`
- `web/webs-para-academias.html`
- `web/webs-para-tiendas.html`
- `web/webs-para-autoescuelas.html`
- `web/webs-para-fotografos.html`
- `web/webs-para-servicios-profesionales.html`

## Demos

Las demos están en `web/demos/` y son ejemplos ficticios para mostrar estructura, tono y experiencia de contacto.

Deben mantenerse siempre:

- Fuera de `web/sitemap.xml`.
- Marcadas con `noindex, nofollow`.
- Presentadas como demos, no como negocios reales.

## Publicación

Netlify debe publicar únicamente la carpeta `web/`.

No hay backend público, base de datos, build, frameworks, analytics ni cookies analíticas. La web está pensada para publicarse como sitio estático en Netlify, GitHub Pages o Vercel.

## SEO básico

Las páginas públicas indexables incluyen title, meta description, canonical, Open Graph, Twitter Card, headings claros, enlaces internos, `sitemap.xml` y `robots.txt`.

Las demos y la página 404 no deben aparecer en el sitemap.

## Privado

`tools/`, `comercial/`, `operaciones/`, entornos virtuales, `.env`, logs, CSVs privados, bases de datos locales y credenciales no forman parte de la web pública y no deben subirse como contenido publicado.
