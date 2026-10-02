/* ==========================================================================
   Feria Agrícola Melipilla - Galería (galeria.js)
   Engine de Alto Rendimiento, Caché Inmediato, Supabase REST y LightGallery
   ========================================================================== */

const SUPABASE_URL = 'https://dpqbvcyeylhxnvkeqakp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwcWJ2Y3lleWxoeG52a2VxYWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0OTIwOTgsImV4cCI6MjA4MTA2ODA5OH0.VsIBv3l5u_X9fFsdUFmN5SrpI9oRTPSFiQKen4WfAGg';
const CACHE_KEY = 'feria_galeria_data_v3';

// Datos semilla para render instantáneo en 0 milisegundos desde la primera visita
const SEED_GALLERY = [
  {"id":8,"title":"Entrega de Utiles Escolares","description":"Jornada solidaria de entrega escolar para familias asociadas.","image_url":"https://dpqbvcyeylhxnvkeqakp.supabase.co/storage/v1/object/public/gallery/2026-02/1772325695711_1000206564.mp4"},
  {"id":7,"title":"Campaña de entrega de útiles escolares (6)","description":"","image_url":"https://dpqbvcyeylhxnvkeqakp.supabase.co/storage/v1/object/public/gallery/2026-02/1772323285054_1000206360.png"},
  {"id":6,"title":"Campaña de entrega de útiles escolares (5)","description":"","image_url":"https://dpqbvcyeylhxnvkeqakp.supabase.co/storage/v1/object/public/gallery/2026-02/1772323282763_1000206361.png"},
  {"id":5,"title":"Campaña de entrega de útiles escolares (4)","description":"","image_url":"https://dpqbvcyeylhxnvkeqakp.supabase.co/storage/v1/object/public/gallery/2026-02/1772323280859_1000206362.png"},
  {"id":4,"title":"Campaña de entrega de útiles escolares (3)","description":"","image_url":"https://dpqbvcyeylhxnvkeqakp.supabase.co/storage/v1/object/public/gallery/2026-02/1772323279035_1000206363.png"},
  {"id":3,"title":"Campaña de entrega de útiles escolares (2)","description":"","image_url":"https://dpqbvcyeylhxnvkeqakp.supabase.co/storage/v1/object/public/gallery/2026-02/1772323276130_1000206364.png"},
  {"id":2,"title":"Campaña de entrega de útiles escolares (1)","description":"","image_url":"https://dpqbvcyeylhxnvkeqakp.supabase.co/storage/v1/object/public/gallery/2026-02/1772323272453_1000206365.png"},
  {"id":1,"title":"Paseo 2025 Playa Los Enamorado (Quintero)","description":"Paseo comunitario de la Asociación Gremial.","image_url":"https://dpqbvcyeylhxnvkeqakp.supabase.co/storage/v1/object/public/gallery/1770407057450.jpg"}
];

let lgInstance = null;

// Extracción asíncrona de póster de video totalmente no bloqueante
function extractVideoPosterAsync(videoUrl, imgId, placeholderId) {
  if (!videoUrl) return;
  const key = 'vpost_' + videoUrl.split('/').pop().replace(/\W/g, '');
  const cached = localStorage.getItem(key);
  if (cached) {
    applyPoster(imgId, placeholderId, cached);
    return;
  }

  const v = document.createElement('video');
  v.crossOrigin = 'anonymous';
  v.muted = true;
  v.preload = 'metadata';
  let done = false;
  const timer = setTimeout(() => { done = true; v.src = ''; }, 2500);

  v.onloadedmetadata = () => {
    if (done) return;
    try { v.currentTime = Math.min(1.0, (v.duration || 3) * 0.1); } catch(e){}
  };

  v.onseeked = () => {
    if (done) return;
    done = true;
    clearTimeout(timer);
    try {
      const c = document.createElement('canvas');
      c.width = v.videoWidth || 640;
      c.height = v.videoHeight || 360;
      c.getContext('2d').drawImage(v, 0, 0);
      const dataUrl = c.toDataURL('image/jpeg', 0.8);
      try { localStorage.setItem(key, dataUrl); } catch(e){}
      applyPoster(imgId, placeholderId, dataUrl);
    } catch(e){}
  };

  v.onerror = () => { clearTimeout(timer); done = true; };
  v.src = videoUrl;
}

function applyPoster(imgId, placeholderId, dataUrl) {
  const img = document.getElementById(imgId);
  const ph = document.getElementById(placeholderId);
  if (img && dataUrl) {
    img.src = dataUrl;
    img.classList.remove('hidden');
    img.classList.add('loaded');
  }
  if (ph) {
    ph.classList.add('hidden');
  }
  const parentLink = img ? img.closest('a') : null;
  if (parentLink && dataUrl) {
    parentLink.setAttribute('data-poster', dataUrl);
  }
}

// Inicializador resiliente de LightGallery
function initLightGallery() {
  const contenedor = document.getElementById("galeria");
  if (!contenedor) return;

  const runInit = () => {
    if (window.lightGallery) {
      if (lgInstance) {
        try { lgInstance.destroy(); } catch(e){}
      }
      lgInstance = window.lightGallery(contenedor, {
        selector: 'a.gallery-item',
        download: false,
        zoom: true,
        thumbnail: true,
        animateThumb: true,
        showThumbByDefault: false,
        speed: 350,
        plugins: [window.lgZoom, window.lgThumbnail, window.lgVideo].filter(Boolean)
      });
    } else {
      setTimeout(runInit, 100);
    }
  };
  runInit();
}

// Render de galería instantáneo
function renderGallery(images) {
  const contenedor = document.getElementById("galeria");
  if (!contenedor || !images || images.length === 0) return;

  let html = '';
  images.forEach((item, index) => {
    const title = item.title || 'Actividad Ferial';
    const imageUrl = item.image_url || '';
    const description = item.description || '';
    const isVideoMatch = imageUrl.match(/\.(mp4|webm|ogg|mov)($|\?)/i);
    const isVideo = Boolean(isVideoMatch);
    const videoType = isVideoMatch ? `video/${isVideoMatch[1].toLowerCase()}` : 'video/mp4';
    const isYouTube = Boolean(imageUrl.includes('youtube.com') || imageUrl.includes('youtu.be'));
    const subHtml = `<h4 class='font-bold text-lg mb-1'>${title}</h4>${description ? `<p class='text-sm opacity-90'>${description}</p>` : ''}`;
    const isHighPriority = index < 2;

    let mediaHtml = '';
    let playIconHtml = '';
    let anchorAttrs = '';

    if (isVideo) {
      const videoJson = JSON.stringify({
        source: [{ src: imageUrl, type: videoType }],
        attributes: { preload: false, controls: true }
      });
      const imgId = `vimg_${item.id || index}`;
      const phId = `vph_${item.id || index}`;
      const key = 'vpost_' + imageUrl.split('/').pop().replace(/\W/g, '');
      const cachedPoster = localStorage.getItem(key);

      anchorAttrs = `data-video='${videoJson}' ${cachedPoster ? `data-poster="${cachedPoster}"` : ''} data-sub-html="${subHtml}"`;

      mediaHtml = `
        <div id="${phId}" class="${cachedPoster ? 'hidden' : ''} w-full aspect-video min-h-[190px] bg-gradient-to-br from-green-950 via-[#0a3820] to-[#042012] flex flex-col items-center justify-center gap-2.5 p-6 text-center relative overflow-hidden">
          <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#84cc16_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div class="w-14 h-14 rounded-full bg-lime-400 text-green-950 flex items-center justify-center text-xl shadow-xl shadow-lime-400/25 group-hover:scale-110 transition-transform z-10">
            <i class="fa-solid fa-play ml-1"></i>
          </div>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-lime-300 text-[11px] font-bold tracking-wider uppercase z-10">
            <i class="fa-solid fa-video text-[10px]"></i> Video Gremial
          </span>
        </div>
        <img id="${imgId}" src="${cachedPoster || ''}" alt="${title}" class="${cachedPoster ? '' : 'hidden'} gallery-img w-full h-auto block object-cover transform group-hover:scale-105" loading="lazy" decoding="async" onload="this.classList.add('loaded')">
      `;

      playIconHtml = `<div class="w-12 h-12 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center text-lg shadow-lg group-hover:scale-110 transition-transform"><i class="fa-solid fa-play ml-0.5 text-lime-300"></i></div>`;

      if (!cachedPoster) {
        setTimeout(() => extractVideoPosterAsync(imageUrl, imgId, phId), 150);
      }

    } else if (isYouTube) {
      anchorAttrs = `data-src="${imageUrl}" data-sub-html="${subHtml}"`;
      const ytId = imageUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      const ytImg = ytId ? `https://img.youtube.com/vi/${ytId[1]}/hqdefault.jpg` : '';
      mediaHtml = `<img src="${ytImg || imageUrl}" alt="${title}" class="gallery-img w-full h-auto object-cover transform group-hover:scale-105" loading="${isHighPriority ? 'eager' : 'lazy'}" decoding="async" onload="this.classList.add('loaded')">`;
      playIconHtml = `<div class="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center text-lg shadow-lg group-hover:scale-110 transition-transform"><i class="fa-brands fa-youtube"></i></div>`;

    } else {
      anchorAttrs = `data-src="${imageUrl}" data-sub-html="${subHtml}"`;
      mediaHtml = `<img src="${imageUrl}" alt="${title}" class="gallery-img w-full h-auto object-cover transform group-hover:scale-105" loading="${isHighPriority ? 'eager' : 'lazy'}" ${isHighPriority ? 'fetchpriority="high"' : ''} decoding="async" onload="this.classList.add('loaded')" onerror="this.classList.add('loaded')">`;
    }

    html += `
      <a ${anchorAttrs}
         class="gallery-item group relative block w-full mb-4 rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-xl transition-all duration-300 cursor-pointer isolate bg-white">
          ${mediaHtml}
          ${playIconHtml ? `<div class="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">${playIconHtml}</div>` : ''}
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none rounded-2xl flex flex-col justify-end p-5">
            <p class="text-white font-bold text-sm leading-tight drop-shadow-md">${title}</p>
            ${description ? `<p class="text-emerald-100/90 text-xs mt-1 line-clamp-2">${description}</p>` : ''}
            <div class="mt-2.5 flex items-center gap-1.5 text-lime-300 text-[11px] font-extrabold uppercase tracking-wider">
              <i class="fa-solid fa-expand"></i>
              <span>Ampliar</span>
            </div>
          </div>
      </a>`;
  });

  contenedor.innerHTML = html;
  initLightGallery();
}

// Sincronización con Supabase vía REST nativo
async function syncFreshGallery() {
  try {
    const url = `${SUPABASE_URL}/rest/v1/gallery_images?select=id,title,image_url,description,created_at&order=created_at.desc`;
    const res = await fetch(url, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
    if (!res.ok) return;
    const fresh = await res.json();
    if (fresh && fresh.length > 0) {
      const freshStr = JSON.stringify(fresh);
      const currentCached = localStorage.getItem(CACHE_KEY);
      if (freshStr !== currentCached) {
        localStorage.setItem(CACHE_KEY, freshStr);
        renderGallery(fresh);
      }
    }
  } catch(err) {
    console.warn('Sync galería en segundo plano omitido:', err);
  }
}

// Inicio inmediato de render
document.addEventListener('DOMContentLoaded', () => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      renderGallery(JSON.parse(cached));
    } catch(e) {
      renderGallery(SEED_GALLERY);
    }
  } else {
    renderGallery(SEED_GALLERY);
  }
  syncFreshGallery();
});
