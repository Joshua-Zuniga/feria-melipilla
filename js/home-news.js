import { supabase } from './supabase-client.js';

async function fetchHomeNoticias() {
  const contenedor = document.getElementById('home-noticias-grid');
  if (!contenedor) return;

  try {
    const { data: noticias, error } = await supabase
      .from('web_news')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(3);

    if (error) throw error;

    if (!noticias || noticias.length === 0) {
      contenedor.innerHTML = '<div class="col-span-full text-center py-10 text-slate-500">No hay noticias recientes para mostrar.</div>';
      return;
    }

    let html = "";

    noticias.forEach(item => {
      const fechaRaw = new Date(item.published_at || item.created_at);
      const mes = fechaRaw.toLocaleString('es-CL', { month: 'short' }).toUpperCase();
      const dia = fechaRaw.getDate();

      const imagenUrl = item.image_url || "images/Banner_1.webp";

      // Generar resumen limpio
      let rawSummary = item.summary || item.content || "";
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = rawSummary;

      // Quitar scripts y estilos
      const scripts = tempDiv.querySelectorAll('script');
      scripts.forEach(s => s.remove());
      const styles = tempDiv.querySelectorAll('style');
      styles.forEach(s => s.remove());

      let cleanSummary = tempDiv.textContent || tempDiv.innerText || "";
      cleanSummary = cleanSummary.replace(/\s+/g, " ").trim();
      let resumen = cleanSummary.length > 100 ? cleanSummary.substring(0, 100) + "..." : cleanSummary;

      html += `
            <a href="detalle-noticia.html?id=${item.id}" class="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full overflow-hidden hover:-translate-y-2 cursor-pointer isolate relative max-w-sm mx-auto w-full">
                
                <!-- Imagen con Overlay y Badge de Fecha -->
                <div class="relative h-48 md:h-56 overflow-hidden rounded-t-3xl">
                    <img src="${imagenUrl}" alt="${item.title}" class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                </div>

                <!-- Contenido -->
                <div class="p-6 flex flex-col flex-grow relative bg-white rounded-b-3xl">
                    <!-- Badge Fecha -->
                    <div class="absolute -top-10 left-6 bg-white px-3 py-1.5 rounded-2xl shadow-lg border border-slate-50 flex flex-col items-center min-w-[3rem] z-10 transition-transform group-hover:-translate-y-1 duration-300">
                        <span class="text-xl font-black text-slate-800 leading-none">${dia}</span>
                        <span class="text-[9px] font-bold text-primary tracking-widest uppercase mt-0.5">${mes}</span>
                    </div>

                    <!-- Categoría (Visual) -->
                    <div class="mb-3 mt-2">
                        <span class="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100/50">
                            Feria Informa
                        </span>
                    </div>

                    <h3 class="text-lg font-bold text-slate-800 mb-2 leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        ${item.title}
                    </h3>
                    
                    <p class="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3 font-normal opacity-90 group-hover:opacity-100 transition-opacity flex-grow">
                        ${resumen || ''}
                    </p>

                    <!-- Footer Card -->
                    <div class="pt-4 border-t border-slate-100 mt-auto flex items-center justify-between">
                        <span class="text-[11px] font-bold text-slate-400 group-hover:text-primary transition-colors tracking-widest uppercase">Leer noticia</span>
                        <div class="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:scale-110 shadow-sm group-hover:shadow-emerald-200">
                            <i class="fa-solid fa-arrow-right text-xs"></i>
                        </div>
                    </div>
                </div>
            </a>
      `;
    });

    contenedor.innerHTML = html;

  } catch (err) {
    console.error('Error fetching home news:', err);
    contenedor.innerHTML = '<div class="col-span-full text-center py-6 text-red-400 text-sm">No se pudieron cargar las noticias recientes.</div>';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchHomeNoticias();
});
