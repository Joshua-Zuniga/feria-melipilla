/* ==========================================================================
   Feria Agrícola Melipilla - Noticias (noticias.js)
   Carga desde Supabase, Formateo de Fechas, Resúmenes y Tarjetas de Noticias
   ========================================================================== */

import { supabase } from './supabase-client.js';

window.noticiasData = [];

async function fetchNoticias() {
  const contenedor = document.getElementById('grilla-noticias');
  if (!contenedor) return;

  try {
    const { data: noticias, error } = await supabase
      .from('web_news')
      .select('id, title, summary, content, image_url, published_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (error) throw error;

    if (!noticias || noticias.length === 0) {
      contenedor.innerHTML = '<div class="col-span-full text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-500">No hay noticias publicadas aún.</div>';
      return;
    }

    window.noticiasData = noticias;
    renderNoticias(noticias);

  } catch (err) {
    console.error('Error Supabase:', err);
    contenedor.innerHTML = '<div class="col-span-full text-center py-16 text-red-500 font-semibold">Error al cargar noticias. Por favor intente más tarde.</div>';
  }
}

function renderNoticias(lista) {
  const contenedor = document.getElementById('grilla-noticias');
  if (!contenedor) return;
  let html = '';

  lista.forEach((item) => {
    const dateObj = new Date(item.published_at);
    const dia = dateObj.toLocaleDateString('es-CL', { day: '2-digit' });
    const mes = dateObj.toLocaleDateString('es-CL', { month: 'short' }).toUpperCase().replace('.', '');

    const imagenUrl = item.image_url || "images/Banner_1.webp";

    let rawSummary = item.summary || item.content || "";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = rawSummary;

    const scripts = tempDiv.querySelectorAll('script, style');
    scripts.forEach(s => s.remove());

    let cleanSummary = tempDiv.textContent || tempDiv.innerText || "";
    cleanSummary = cleanSummary.replace(/\s+/g, " ").trim();
    let resumen = cleanSummary.length > 140 ? cleanSummary.substring(0, 140) + "..." : cleanSummary;

    html += `
        <a href="detalle-noticia.html?id=${item.id}" class="news-card group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-200/80 flex flex-col h-full overflow-hidden hover:-translate-y-2 cursor-pointer isolate relative max-w-sm mx-auto w-full">
            
            <!-- Imagen con Overlay y Badge de Fecha -->
            <div class="relative h-56 md:h-60 overflow-hidden rounded-t-3xl bg-slate-100">
                <img src="${imagenUrl}" alt="${item.title}" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
            </div>

            <!-- Contenido -->
            <div class="p-6 md:p-7 flex flex-col flex-grow relative bg-white rounded-b-3xl">
                <!-- Badge Fecha -->
                <div class="absolute -top-10 left-6 bg-white px-3.5 py-1.5 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center min-w-[3.5rem] z-10 transition-transform group-hover:-translate-y-1 duration-300">
                    <span class="text-xl font-black text-slate-800 leading-none">${dia}</span>
                    <span class="text-[9px] font-bold text-green-700 tracking-widest uppercase mt-0.5">${mes}</span>
                </div>

                <!-- Categoría -->
                <div class="mb-3 mt-3">
                    <span class="inline-block bg-emerald-50 text-green-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">
                        Feria Informa
                    </span>
                </div>

                <h3 class="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-green-800 transition-colors line-clamp-2">
                    ${item.title}
                </h3>
                
                <p class="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 font-normal flex-grow">
                    ${resumen || ''}
                </p>

                <!-- Footer Card -->
                <div class="pt-4 border-t border-slate-100 mt-auto flex items-center justify-between">
                    <span class="text-xs font-bold text-slate-400 group-hover:text-green-800 transition-colors uppercase tracking-wider">Leer artículo</span>
                    <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-green-800 group-hover:text-white transition-all transform group-hover:scale-110 shadow-sm">
                        <i class="fa-solid fa-arrow-right text-xs"></i>
                    </div>
                </div>
            </div>
        </a>
    `;
  });

  contenedor.innerHTML = html;
}

if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", fetchNoticias);
} else {
  fetchNoticias();
}
