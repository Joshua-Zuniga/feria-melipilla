const path = require('path');
const fs = require('fs');

const sociosDir = path.join(__dirname, 'socios');

// Configuración de rutas relativas para las páginas de socios (están un nivel abajo)
// En layout.js normal, los links son "index.html", aquí deben ser "../index.html"
const RELATIVE_PREFIX = "../";

// Script para inyectar en cada página de socio
const LAYOUT_SCRIPT_INJECTION = `
  <!-- Layout Script (Modificado para funcionar desde subdirectorio) -->
  <script>
    // Sobreescribir rutas del layout.js para que funcionen desde /socios/
    const IS_SUBDIR = true; 
  </script>
  <script src="../js/layout.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      AOS.init({ duration: 800, once: true, offset: 80 });
      renderLayout("Socios", true); // true indica que estamos en subdirectorio
    });
  </script>
`;

function processSocioFile(filePath, fileName) {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Extraer nombre del socio para el título SEO
    const nameMatch = content.match(/data-nombre="([^"]+)"/); // A veces no está, hay que buscar otra estrategia si falla
    let socioName = "Socio";

    // Estrategia alternativa: Buscar h1
    if (!nameMatch) {
        const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/i);
        if (h1Match) {
            socioName = h1Match[1].trim();
        } else {
            // Fallback: usar nombre del archivo
            socioName = fileName.replace(/-/g, ' ').replace('.html', '');
            // Capitalizar
            socioName = socioName.replace(/\b\w/g, l => l.toUpperCase());
        }
    } else {
        socioName = nameMatch[1];
    }

    // 2. Generar Meta Description
    const metaDescription = `Conoce a ${socioName}, socio de la Feria Agrícola Melipilla. Descubre sus productos y contacto. Apoya a los productores locales.`;

    // 3. Reemplazar Header y Footer antiguos con los placeholders
    // Eliminar todo desde <header> hasta </header> y reemplazar con <div id="main-header"></div>
    // PERO CUIDADO: El header actual tiene el HERO integrado. En las páginas de socios, el título "Socios" se repite.
    // Vamos a mantener un Hero simplificado o usar el del layout si se adapta.
    // En las páginas de socios actuales (ver adriana-ruminao-munoz.html), hay un Header > Div > Hero.

    // Paso 3.1: Eliminar Header completo
    content = content.replace(/<header[\s\S]*?<\/header>/i, '<!-- Header Placeholder -->\n  <div id="main-header"></div>');

    // Paso 3.2: Eliminar Footer completo
    content = content.replace(/<footer[\s\S]*?<\/footer>/i, '<!-- Footer Placeholder -->\n  <div id="main-footer"></div>');

    // Paso 3.3: Eliminar scripts de menú móvil antiguos si quedan sueltos
    content = content.replace(/<script>\s*\/\/ Menú móvil slide-in[\s\S]*?<\/script>/i, '');
    content = content.replace(/<div id="mobileBackdrop"[\s\S]*?<\/aside>/i, ''); // A veces queda fuera del header

    // 4. Inyectar mejoras SEO en <head>
    // Reemplazar <title>...</title>
    const newTitle = `<title>${socioName} - Socio Feria Agrícola Melipilla</title>`;
    content = content.replace(/<title>.*<\/title>/i, newTitle);

    // Agregar meta description si no existe, o reemplazarla
    if (content.includes('<meta name="description"')) {
        content = content.replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${metaDescription}">`);
    } else {
        content = content.replace(/<\/title>/i, `</title>\n  <meta name="description" content="${metaDescription}">`);
    }

    // 5. Inyectar script de layout antes de cerrar body
    // Eliminar bloque de script AOS init antiguo si existe para no duplicar
    content = content.replace(/<script>\s*document\.addEventListener\('DOMContentLoaded', \(\) => \{\s*AOS\.init[\s\S]*?\}\);\s*<\/script>/i, '');

    // Insertar nuevo script al final del body
    content = content.replace('</body>', `${LAYOUT_SCRIPT_INJECTION}\n</body>`);

    // 6. Arreglar rutas de CSS/JS en head (subir un nivel)
    // Ya están con ../ en el archivo de ejemplo, pero asegurarnos.
    // El archivo de ejemplo tiene: <link href="../images/favicon.webp" ...> lo cual es CORRCTO.
    // Pero el nuevo layout.js inyectará imágenes con rutas absolutas o relativas desde root.
    // NECESITAMOS MODIFICAR LAYOUT.JS para soportar prefijos.

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Processed: ${fileName}`);
}

// Leer todos los archivos html en socios/
fs.readdir(sociosDir, (err, files) => {
    if (err) {
        console.error("Error reading directory:", err);
        return;
    }

    files.forEach(file => {
        if (path.extname(file) === '.html') {
            processSocioFile(path.join(sociosDir, file), file);
        }
    });
});
