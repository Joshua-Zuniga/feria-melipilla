/* ==========================================================================
   Feria Agrícola Melipilla - Detalle de Noticia (detalle-noticia.js)
   Carga de Artículo Individual desde Supabase y Función de Compartir
   ========================================================================== */

import { supabase } from './supabase-client.js';

async function loadNews() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    window.location.href = 'noticias.html';
    return;
  }

  try {
    const { data, error } = await supabase
      .from('web_news')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) throw new Error("Noticia no encontrada");

    document.title = `${data.title} | Feria Agrícola Melipilla`;

    const imgEl = document.getElementById('news-image');
    if (imgEl) imgEl.src = data.image_url || "images/Banner_1.webp";

    const dateObj = new Date(data.published_at || data.created_at);
    const fechaStr = dateObj.toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const dateEl = document.getElementById('news-date');
    if (dateEl) dateEl.innerText = fechaStr;

    const titleEl = document.getElementById('news-title');
    if (titleEl) titleEl.innerText = data.title;

    let cleanContent = data.content || "";
    const bodyMatch = cleanContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyMatch && bodyMatch[1]) cleanContent = bodyMatch[1];
    cleanContent = cleanContent.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "");
    cleanContent = cleanContent.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gim, "");
    cleanContent = cleanContent.replace(/<\/?html[^>]*>/gi, "").replace(/<\/?head[^>]*>/gi, "");

    const contentEl = document.getElementById('news-content');
    if (contentEl) contentEl.innerHTML = cleanContent || "<p>Sin contenido.</p>";

    const authorEl = document.getElementById('news-author');
    if (data.author && authorEl) authorEl.innerText = data.author;

  } catch (err) {
    console.error(err);
    const contentEl = document.getElementById('news-content');
    if (contentEl) {
      contentEl.innerHTML = `
        <div class="text-center py-12">
          <p class="text-red-500 font-bold text-lg mb-4">No se pudo cargar la noticia solicitada.</p>
          <a href="noticias.html" class="inline-flex px-6 py-2.5 bg-green-800 text-white rounded-full font-bold text-xs hover:bg-green-700 transition">Volver a Noticias</a>
        </div>
      `;
    }
    const titleEl = document.getElementById('news-title');
    if (titleEl) titleEl.innerText = "Aviso";
  }
}

window.compartir = function () {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      url: window.location.href
    }).catch(console.error);
  } else {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      if (window.showToast) window.showToast('Enlace copiado al portapapeles');
    } else {
      if (window.showToast) window.showToast('Copia este enlace: ' + window.location.href, 'info');
    }
  }
};

loadNews();
