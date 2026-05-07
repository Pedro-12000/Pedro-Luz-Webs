# FisioNorte Madrid

Demo ficticia de una landing premium para un centro local de fisioterapia. Está pensada para enseñarse como ejemplo comercial de una web final para cliente: clara, responsive, prudente en el mensaje sanitario y con contacto visible.

No usa backend, base de datos, frameworks ni imágenes externas. Todo funciona con HTML, CSS y JavaScript puro.

El favicon de `assets/favicon.svg` debe mostrar el monograma circular `FN`, coherente con el logo visible en el header.

## Cómo abrirla con Live Server

1. Abre la carpeta del proyecto en VS Code.
2. Entra en `demos/demo-fisioterapia/`.
3. Haz clic derecho sobre `index.html`.
4. Selecciona `Open with Live Server`.
5. Revisa escritorio, tablet y móvil desde las herramientas del navegador.

También se puede abrir directamente `index.html` en el navegador, aunque Live Server es más cómodo para revisar cambios.

## Qué cambiar para un cliente real

- Sustituir nombre, dirección, teléfono, WhatsApp y email por datos reales.
- Cambiar textos de ejemplo por textos validados con el centro.
- Reemplazar la ilustración o recursos visuales por fotos reales o recursos con licencia.
- Añadir equipo real, titulaciones, colegiación si procede y especialidades reales.
- Sustituir reseñas ficticias por reseñas reales verificables.
- Revisar condiciones de primera visita, seguros, precios y horarios.
- Conectar el formulario a email, WhatsApp, CRM ligero o sistema de reservas.
- Ajustar SEO local: `title`, meta description, Schema.org, URL y textos por zona.
- Revisar textos legales con los datos reales del negocio.

## Checklist antes de publicar

- `index.html` enlaza correctamente `styles.css`, `script.js` y `assets/favicon.svg`.
- El favicon carga bien en el navegador y muestra `FN`.
- El menú móvil abre, cierra y navega correctamente.
- El scroll suave funciona en todos los enlaces internos.
- Los botones de WhatsApp usan el número correcto y abren el enlace esperado.
- Los botones de llamada usan el número correcto.
- Los enlaces externos incluyen `target="_blank"` y `rel="noopener noreferrer"`.
- Las reseñas indican "Reseña ficticia para demo" si todavía no son reales.
- No hay promesas médicas ni resultados garantizados.
- El formulario muestra el aviso visual al enviarse.
- La web se ve bien en móvil, tablet y escritorio.
- El contraste, foco visible y navegación por teclado son correctos.
- No hay rutas rotas ni dependencias externas innecesarias.

## Publicación estática

Se puede publicar en GitHub Pages, Netlify o Vercel sin comando de build. Si se publica solo esta demo, configura `demos/demo-fisioterapia` como carpeta raíz de publicación o mueve estos archivos a la raíz del despliegue.
