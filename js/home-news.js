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
        <a href="detalle-noticia.html?id=${item.id}" class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer border border-slate-100 flex flex-col h-full">
          <div class="relative h-48 overflow-hidden">
            <img src="${imagenUrl}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
            <div class="absolute inset-0 bg-black/10 transition-colors"></div>
            <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-800 rounded-lg px-3 py-1 flex flex-col items-center shadow-lg border border-white/50">
              <span class="text-[10px] font-bold uppercase text-primary tracking-widest">${mes}</span>
              <span class="text-xl font-bold leading-none">${dia}</span>
            </div>
          </div>
          <div class="p-6 flex flex-col flex-grow">
            <div class="mb-3">
               <span class="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded text-xs uppercase tracking-wide">Feria Informa</span>
            </div>
            <h3 class="text-lg font-bold text-slate-800 mb-3 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                ${item.title}
            </h3>
            <p class="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow font-medium leading-relaxed">
                ${resumen}
            </p>
            <div class="pt-4 border-t border-slate-50 mt-auto flex items-center justify-between text-primary text-xs font-bold uppercase tracking-wider">
              <span>Leer completa</span>
              <i class="fa-solid fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
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
