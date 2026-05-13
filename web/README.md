# CreadorWebs web

Esta carpeta contiene la web pública de <https://creadorwebs.es>.

Netlify debe publicar únicamente `web/`.

## Contenido

- `index.html`: página principal publicada.
- `webs-para-negocios.html`, `webs-para-autonomos.html`, `webs-para-locales.html` y `webs-para-proyectos.html`: páginas principales para búsquedas generales.
- `webs-para-restaurantes.html`, `webs-para-peluquerias.html`, `webs-para-clinicas.html`, `webs-para-academias.html`, `webs-para-tiendas.html`, `webs-para-autoescuelas.html`, `webs-para-fotografos.html` y `webs-para-servicios-profesionales.html`: páginas SEO por sector.
- `privacidad.html` y `cookies.html`: páginas legales.
- `404.html`: página para enlaces no encontrados.
- `sitemap.xml` y `robots.txt`: archivos básicos para SEO técnico.
- `styles.css` y `script.js`: estilos e interacción de la web.
- `assets/`: favicon e imágenes públicas del portfolio.
- `demos/`: demos ficticias mostradas dentro del portfolio.

## Demos

Las demos de `web/demos/` son ejemplos ficticios. Sirven para enseñar estructura, tono, diseño y contacto en distintos tipos de negocio.

Todas las demos deben mantenerse con `noindex, nofollow` y fuera de `sitemap.xml` para evitar que se indexen como negocios reales.

## Importante

Esta carpeta no debe contener herramientas internas, datos privados, `.env`, credenciales, CSVs privados, bases de datos locales ni logs.
