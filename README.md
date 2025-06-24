# feria-melipilla

Este repositorio contiene el sitio web de la **Asociación Gremial Feria Agrícola Melipilla**. Su objetivo es difundir información sobre la feria, la directiva, los socios y la localización, además de un calendario de actividades. Todas las páginas están construidas con HTML, CSS y JavaScript estáticos.

## Visualización en un servidor estático

Puedes servir el sitio localmente con cualquier servidor de archivos estáticos. Por ejemplo, utilizando Python 3 desde la raíz del proyecto:

```bash
python3 -m http.server
```

Luego abre `http://localhost:8000/` en tu navegador y navega hasta `index.html`. También es posible publicar la carpeta en un hosting estático como GitHub Pages o Netlify.

## Recomendaciones de optimización

- **Imágenes**: Comprimir los archivos PNG y JPEG para reducir su tamaño. Usar formatos como WebP ayuda a disminuir aún más el peso manteniendo la calidad.
- **Minificación**: Unir y minificar los archivos CSS y JavaScript con herramientas como `cssnano` o `uglify-js`. Esto reduce las peticiones y acelera la carga.
- **Cacheo**: Configurar cabeceras de caché o emplear un service worker para almacenar los recursos en el navegador.
- **Carga diferida**: Colocar `loading="lazy"` en las etiquetas `<img>` y diferir la ejecución de scripts no esenciales mediante `defer` o `async`.
- **Eliminación de código no utilizado**: Revisar las hojas de estilo y los JavaScript para eliminar reglas o funciones sin uso.

Con estas prácticas el sitio cargará más rápido y consumirá menos ancho de banda.
