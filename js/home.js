/* ==========================================================================
   Feria Agrícola Melipilla - Inicio (home.js)
   Feed de Instagram (Behold JSON) y Adaptador del Calendario de Actividades
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. Visor y Feed de Instagram
// --------------------------------------------------------------------------
let currentInstagramPosts = [];
let currentModalIndex = 0;
let currentCarouselSubIndex = 0;

window.openInstagramViewer = function (index) {
  if (!currentInstagramPosts || !currentInstagramPosts[index]) return;
  currentModalIndex = index;
  currentCarouselSubIndex = 0;
  renderInstagramModalContent();

  const modal = document.getElementById("instagramModal");
  const backdrop = document.getElementById("backdrop");
  if (modal && backdrop) {
    modal.classList.add("open");
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  }
};

window.closeInstagramViewer = function () {
  const modal = document.getElementById("instagramModal");
  const backdrop = document.getElementById("backdrop");
  if (modal) modal.classList.remove("open");
  if (backdrop) {
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }
  const videoEl = document.querySelector("#instaModalMediaContainer video");
  if (videoEl) videoEl.pause();
};

window.navigateInstagramPost = function (direction) {
  if (!currentInstagramPosts.length) return;
  currentModalIndex = (currentModalIndex + direction + currentInstagramPosts.length) % currentInstagramPosts.length;
  currentCarouselSubIndex = 0;
  renderInstagramModalContent();
};

window.setCarouselSlide = function (subIdx) {
  currentCarouselSubIndex = subIdx;
  renderInstagramModalContent(true);
};

function renderInstagramModalContent(onlyMedia = false) {
  const post = currentInstagramPosts[currentModalIndex];
  if (!post) return;

  const mediaContainer = document.getElementById("instaModalMediaContainer");
  const dotsContainer = document.getElementById("instaModalCarouselDots");
  const captionEl = document.getElementById("instaModalCaption");
  const dateEl = document.getElementById("instaModalDate");
  const directLink = document.getElementById("instaModalDirectLink");
  const counterEl = document.getElementById("instaModalCounter");

  const isAlbum = post.mediaType === "CAROUSEL_ALBUM" && Array.isArray(post.children) && post.children.length > 0;
  const currentItem = isAlbum ? post.children[currentCarouselSubIndex] || post : post;

  if (mediaContainer) {
    mediaContainer.innerHTML = "";
    const isVideo = currentItem.mediaType === "VIDEO" || post.mediaType === "VIDEO";
    const mediaSource = currentItem.mediaUrl || currentItem.sizes?.large?.mediaUrl || currentItem.thumbnailUrl || post.mediaUrl;

    if (isVideo) {
      const video = document.createElement("video");
      video.src = mediaSource;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.className = "max-w-full max-h-[50vh] md:max-h-[85vh] w-auto h-auto object-contain mx-auto";
      mediaContainer.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = mediaSource;
      img.alt = post.caption ? post.caption.slice(0, 50) : "Instagram Feria Melipilla";
      img.className = "max-w-full max-h-[50vh] md:max-h-[85vh] w-auto h-auto object-contain mx-auto";
      mediaContainer.appendChild(img);
    }
  }

  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    if (isAlbum && post.children.length > 1) {
      post.children.forEach((_, idx) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = `w-2 h-2 rounded-full pointer-events-auto transition-all ${idx === currentCarouselSubIndex ? 'bg-lime-400 w-4' : 'bg-white/40 hover:bg-white'}`;
        dot.onclick = (e) => { e.stopPropagation(); window.setCarouselSlide(idx); };
        dotsContainer.appendChild(dot);
      });
    }
  }

  if (onlyMedia) return;

  if (captionEl) {
    captionEl.textContent = post.caption || "Publicación oficial de la Asociación Gremial Feria Melipilla.";
  }

  if (dateEl) {
    if (post.timestamp) {
      try {
        const date = new Date(post.timestamp);
        dateEl.textContent = date.toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
      } catch (e) {
        dateEl.textContent = "Publicado recientemente";
      }
    } else {
      dateEl.textContent = "Publicado recientemente";
    }
  }

  if (counterEl) {
    counterEl.textContent = `${currentModalIndex + 1} de ${currentInstagramPosts.length}`;
  }

  if (directLink) {
    directLink.href = post.permalink || "https://www.instagram.com/asoc.feria.agricola.melipilla";
  }
}

// --------------------------------------------------------------------------
// 2. Control Dinámico del Calendario de Actividades
// --------------------------------------------------------------------------
const CALENDAR_BASE = "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FSantiago&bgcolor=%23ffffff&showTitle=0&showPrint=0&showCalendars=0&showTz=0&showNav=1&showDate=1&src=NGJvaWVoZGV0aHMzNWw3NjE0bWk1dWV2NDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%230B8043";
let currentCalendarMode = 'MONTH';

window.fitCalendarToScreen = function () {
  const container = document.getElementById("calendarScalableContainer");
  const frame = document.getElementById("googleCalendarFrame");
  if (!container || !frame) return;

  const containerWidth = container.offsetWidth;
  const minCalendarWidth = 620;

  if (containerWidth < minCalendarWidth && containerWidth > 0) {
    const scale = containerWidth / minCalendarWidth;
    const targetHeight = currentCalendarMode === 'MONTH' ? 520 : 480;

    frame.style.width = minCalendarWidth + "px";
    frame.style.height = (targetHeight / scale) + "px";
    frame.style.transform = `scale(${scale})`;
    frame.style.transformOrigin = "0 0";
    container.style.height = targetHeight + "px";
  } else {
    frame.style.width = "100%";
    frame.style.height = "100%";
    frame.style.transform = "none";
    frame.style.transformOrigin = "center center";
    container.style.height = currentCalendarMode === 'MONTH' ? "620px" : "540px";
  }
};

window.setCalendarMode = function (mode) {
  currentCalendarMode = mode;
  const frame = document.getElementById("googleCalendarFrame");
  const loader = document.getElementById("calLoader");
  const btnMonth = document.getElementById("btnCalModeMonth");
  const btnAgenda = document.getElementById("btnCalModeAgenda");
  if (!frame) return;

  if (mode === 'MONTH') {
    if (btnMonth) btnMonth.className = "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all bg-white text-green-900 shadow-sm flex items-center gap-1.5";
    if (btnAgenda) btnAgenda.className = "px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition-all flex items-center gap-1.5";
  } else {
    if (btnAgenda) btnAgenda.className = "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all bg-white text-green-900 shadow-sm flex items-center gap-1.5";
    if (btnMonth) btnMonth.className = "px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition-all flex items-center gap-1.5";
  }

  if (loader) loader.classList.remove("opacity-0", "pointer-events-none");
  frame.src = `${CALENDAR_BASE}&mode=${mode}`;

  frame.onload = () => {
    if (loader) loader.classList.add("opacity-0", "pointer-events-none");
    window.fitCalendarToScreen();
  };

  window.fitCalendarToScreen();
};

window.addEventListener("resize", window.fitCalendarToScreen);

// --------------------------------------------------------------------------
// 3. Inicialización en DOMContentLoaded
// --------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  window.fitCalendarToScreen();

  const BEHOLD_FEED_URL = "https://feeds.behold.so/pc0uAVFeRhUmMKNrfREq";
  const grid = document.getElementById("instagram-posts-grid");
  const CACHE_KEY = "feria_behold_feed_cache";
  const CACHE_TIME_KEY = "feria_behold_feed_time";
  const CACHE_DURATION_MS = 15 * 60 * 1000;

  function renderInstagramPosts(posts) {
    if (!grid || !Array.isArray(posts) || posts.length === 0) return;
    currentInstagramPosts = posts.slice(0, 6);
    grid.innerHTML = "";

    currentInstagramPosts.forEach((post, index) => {
      const imgUrl = post.sizes?.medium?.mediaUrl || post.mediaUrl || post.thumbnailUrl;
      const rawCaption = post.caption || "Publicación de Feria Melipilla";
      const shortCaption = rawCaption.length > 70 ? rawCaption.slice(0, 70) + "..." : rawCaption;
      const isVideo = post.mediaType === "VIDEO";
      const isAlbum = post.mediaType === "CAROUSEL_ALBUM";

      let typeBadge = '';
      if (isVideo) {
        typeBadge = '<span class="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center text-[10px]"><i class="fa-solid fa-play ml-0.5"></i></span>';
      } else if (isAlbum) {
        typeBadge = '<span class="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center text-[10px]"><i class="fa-solid fa-layer-group"></i></span>';
      }

      const card = document.createElement("button");
      card.type = "button";
      card.className = "instagram-card group relative block aspect-square rounded-2xl overflow-hidden bg-white/10 border border-white/15 shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-lime-400";
      card.setAttribute("aria-label", "Ver publicación de Instagram");
      card.onclick = () => window.openInstagramViewer(index);
      card.innerHTML = `
        <img src="${imgUrl}" alt="Instagram Feria Melipilla" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
        ${typeBadge}
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end text-white text-[11px]">
          <p class="line-clamp-2 leading-tight text-slate-100 font-normal drop-shadow-sm">${shortCaption}</p>
          <div class="mt-2 flex items-center gap-1.5 text-lime-300 font-extrabold text-[10px] uppercase tracking-wider">
            <i class="fa-solid fa-expand text-xs"></i>
            <span>Ver en la web</span>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  async function loadInstagramFeed() {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
    const now = Date.now();

    if (cachedData && cachedTime && (now - parseInt(cachedTime)) < CACHE_DURATION_MS) {
      try {
        const parsed = JSON.parse(cachedData);
        renderInstagramPosts(parsed);
        return;
      } catch (e) {}
    }

    try {
      const res = await fetch(BEHOLD_FEED_URL);
      if (!res.ok) throw new Error("HTTP Error " + res.status);
      const data = await res.json();
      const posts = Array.isArray(data) ? data : (data.posts || []);

      if (posts && posts.length > 0) {
        localStorage.setItem(CACHE_KEY, JSON.stringify(posts));
        localStorage.setItem(CACHE_TIME_KEY, now.toString());
        renderInstagramPosts(posts);
      } else {
        throw new Error("No posts found");
      }
    } catch (err) {
      console.warn("Error cargando feed de Instagram en vivo:", err);
      if (cachedData) {
        try { renderInstagramPosts(JSON.parse(cachedData)); return; } catch (e) {}
      }
      if (grid) {
        grid.innerHTML = `
          <div class="col-span-full py-8 text-center text-emerald-100">
            <i class="fab fa-instagram text-3xl mb-2 text-lime-300"></i>
            <p class="text-sm font-semibold">Descubre nuestras fotos y videos en Instagram</p>
            <a href="https://www.instagram.com/asoc.feria.agricola.melipilla" target="_blank" class="inline-block mt-3 px-5 py-2 rounded-xl bg-lime-400 hover:bg-lime-300 text-green-950 font-extrabold text-xs transition">
              Abrir @asoc.feria.agricola.melipilla
            </a>
          </div>
        `;
      }
    }
  }

  document.addEventListener("keydown", (e) => {
    const modal = document.getElementById("instagramModal");
    if (!modal || !modal.classList.contains("open")) return;
    if (e.key === "Escape") window.closeInstagramViewer();
    if (e.key === "ArrowLeft") window.navigateInstagramPost(-1);
    if (e.key === "ArrowRight") window.navigateInstagramPost(1);
  });

  loadInstagramFeed();
});
