/**
 * Componentes reutilizables para el sitio web
 * Ref: Diseño "Green Native Bar" - Legacy Icon Support
 * Fix: Usando nombres de iconos compatibles (FA5/FA6) para evitar las "X".
 */

/* Mismos HTML, solo cambiando IDs si fuera necesario, pero la clave está en el JS config */

const HEADER_HTML = `
<!-- HEADER DESKTOP -->
<header id="desktop-header" class="hidden md:flex fixed top-0 left-0 right-0 w-full z-[9990] justify-center py-6 px-4 transition-all duration-300 pointer-events-none sticky-header-init">
  <div class="pointer-events-auto bg-[#166534] border border-emerald-400/30 shadow-2xl rounded-full pl-6 pr-6 py-1 flex items-center justify-between gap-6 w-full max-w-7xl transition-all duration-300">
    
    <!-- Logo -->
    <a href="index.html" class="flex items-center gap-2 shrink-0 group mr-6 bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors my-1">
      <img src="images/logotipo.svg" alt="Feria Melipilla" class="h-20 w-auto drop-shadow-sm group-hover:scale-105 transition-transform">
    </a>

    <!-- Nav Desktop -->
    <nav class="flex items-center gap-1 justify-center flex-grow" id="desktop-nav">
      <!-- Links injected here -->
    </nav>

    <!-- Login -->
    <div class="flex items-center pl-4">
        <a href="https://feriaagricolaag.vercel.app/"
           class="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-[#166534] bg-white hover:bg-emerald-50 rounded-full transition-all shadow-lg hover:shadow-white/20 transform hover:-translate-y-0.5">
           <i class="fas fa-user"></i>
           <span>Ingresar</span>
        </a>
    </div>
  </div>
</header>
`;

const MOBILE_HTML = `
<!-- MOBILE TOP BAR -->
<div class="md:hidden fixed top-0 left-0 right-0 z-[9000] bg-[#166534] px-4 py-3 shadow-md flex items-center justify-center transition-all duration-300">
    <a href="index.html" class="flex items-center justify-center bg-white/10 rounded-full p-2">
      <img src="images/logotipo.svg" alt="Feria Melipilla" class="h-16 w-auto drop-shadow-md">
    </a>
</div>

<!-- POPUP MENU -->
<div id="mobile-popup-menu" class="hidden md:hidden fixed bottom-28 left-4 right-4 bg-white z-[10000] rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border-2 border-[#166534] p-6 transition-all duration-300 origin-bottom transform scale-90 opacity-0">
     <div class="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
         <h3 class="text-[#166534] font-bold text-lg">Más Secciones</h3>
         <button onclick="togglePopupMenu()" class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200">
            <i class="fas fa-times"></i>
         </button>
     </div>
     <div class="grid grid-cols-2 gap-4" id="popup-content">
        <!-- Extra Links Injected Here -->
     </div>
     <div class="absolute -bottom-3 right-8 w-6 h-6 bg-white border-b-2 border-r-2 border-[#166534] transform rotate-45"></div>
</div>
<div id="menu-backdrop" class="hidden fixed inset-0 z-[9995] bg-black/60 backdrop-blur-sm" onclick="togglePopupMenu()"></div>

<!-- MOBILE BOTTOM NAV -->
<nav id="mobile-bottom-nav" class="md:hidden fixed bottom-0 left-0 right-0 bg-[#166534] z-[9999] border-t-2 border-emerald-500 shadow-[0_-5px_20px_rgba(0,0,0,0.3)] pb-safe pt-2 px-1 flex justify-between items-end h-[85px]">
    <!-- Main Links Injected Here -->
</nav>

<style>
.pb-safe { padding-bottom: env(safe-area-inset-bottom, 10px); }
</style>
`;

const FOOTER_HTML = `
<footer class="relative mt-20 text-slate-100 mb-24 md:mb-0">
  <div class="absolute inset-0 bg-gradient-to-br from-[#166534] to-emerald-900 opacity-95"></div>
  <div class="absolute inset-0 opacity-10"
    style="background-image: url('data:image/svg+xml,%3Csvg width=\\'120\\' height=\\'120\\' viewBox=\\'0 0 120 120\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M60 10 C40 40 40 80 60 110 C80 80 80 40 60 10 Z\\' fill=\\'%23ffffff\\'/%3E%3C/svg%3E'); background-size: 180px;">
  </div>
  <div class="relative max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
    
    <!-- Col 1: Brand -->
    <div class="space-y-5 md:col-span-1">
      <a href="index.html" class="flex items-center gap-3 transition-opacity hover:opacity-80">
        <img src="images/logotipo.svg" alt="Logo Feria Agrícola" class="h-24 drop-shadow-lg filter-none">
      </a>
      <p class="text-sm text-emerald-100 leading-relaxed max-w-sm">
        Asociación Gremial Feria Agrícola Melipilla. <br>
        <span class="opacity-70 text-xs">Juntos construyendo comunidad.</span>
      </p>
    </div>

    <!-- Col 2: Navigation -->
    <div class="space-y-5">
      <h4 class="text-sm font-semibold tracking-widest uppercase text-lime-300">Navegación</h4>
      <ul class="space-y-2 text-sm">
        <li><a href="Nosotros.html" class="hover:text-white hover:underline text-emerald-50 transition">Nosotros</a></li>
        <li><a href="Socios.html" class="hover:text-white hover:underline text-emerald-50 transition">Socios</a></li>
        <li><a href="Noticias.html" class="hover:text-white hover:underline text-emerald-50 transition">Noticias</a></li>
        <li><a href="Localizanos.html" class="hover:text-white hover:underline text-emerald-50 transition">Mapa / Ubicación</a></li>
      </ul>
    </div>

    <!-- Col 3: Legal -->
    <div class="space-y-5">
      <h4 class="text-sm font-semibold tracking-widest uppercase text-lime-300">Legal</h4>
      <ul class="space-y-2 text-sm">
        <li><a href="terminos.html" class="hover:text-white hover:underline text-emerald-50 transition">Términos y Condiciones</a></li>
        <li><a href="privacidad.html" class="hover:text-white hover:underline text-emerald-50 transition">Política de Privacidad</a></li>
      </ul>
    </div>

    <!-- Col 4: Contact -->
    <div class="space-y-5">
      <h4 class="text-sm font-semibold tracking-widest uppercase text-lime-300">Contacto</h4>
      
      <div class="space-y-3">
        <!-- Socials -->
        <div class="flex gap-4">
          <a href="https://www.facebook.com/asoc.feria.agricola.melipilla" target="_blank"
            class="w-10 h-10 grid place-items-center rounded-full bg-emerald-700/50 border border-lime-300/30 hover:bg-emerald-600 transition shadow-lg text-white group">
            <i class="fab fa-facebook-f text-lg group-hover:scale-110 transition-transform"></i>
          </a>
          <a href="https://www.instagram.com/asoc.feria.agricola.melipilla" target="_blank"
            class="w-10 h-10 grid place-items-center rounded-full bg-emerald-700/50 border border-lime-300/30 hover:bg-emerald-600 transition shadow-lg text-white group">
            <i class="fab fa-instagram text-lg group-hover:scale-110 transition-transform"></i>
          </a>
        </div>

        <!-- Mail -->
        <a href="mailto:a.g.feria.agricola.m@gmail.com" class="flex items-center gap-3 text-emerald-50 hover:text-white group">
             <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition">
                 <i class="fas fa-envelope text-lime-300"></i>
            </div>
            <span class="text-xs break-all">a.g.feria.agricola.m@gmail.com</span>
        </a>
      </div>
    </div>

  </div>

  <!-- Bottom Bar -->
  <div class="relative border-t border-emerald-700/60 bg-emerald-950/60 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-emerald-300/80 gap-4">
      <div class="text-center md:text-left">
        © ${new Date().getFullYear()} Asociación Gremial Feria Agrícola Melipilla. <br class="md:hidden"> Todos los derechos reservados.
      </div>
      <div class="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity">
        <i class="fas fa-leaf"></i>
        <span>Melipilla, Región Metropolitana</span>
      </div>
    </div>
  </div>
</footer>
`;

// USANDO CLASES DE ICONOS COMPATIBLES (Legacy v5)
// Esto asegura que se vean incluso si se carga una versión anterior de FontAwesome por tu 'kit' antiguo
const NAV_ITEMS = [
  { href: 'index.html', label: 'Inicio', icon: 'fas fa-home', main: true },
  { href: 'Socios.html', label: 'Socios', icon: 'fas fa-store', main: true },
  { href: 'Noticias.html', label: 'Noticias', icon: 'far fa-newspaper', main: true }, // 'far' a veces es mas seguro para newspaper
  { href: 'Localizanos.html', label: 'Mapa', icon: 'fas fa-map-marker-alt', main: true }, // fa-map-location-dot -> fa-map-marker-alt

  // Popup
  { href: 'Nosotros.html', label: 'Nosotros', icon: 'fas fa-users', main: false },
  { href: 'Directiva.html', label: 'Directiva', icon: 'fas fa-file-alt', main: false }, // fa-file-signature -> fa-file-alt
  { href: 'Galeria.html', label: 'Galería', icon: 'fas fa-images', main: false }, // fa-camera -> fa-images
];

function renderLayout(activePage, isSubDir = false) {
  const prefix = isSubDir ? "../" : "";

  // IMPORTANT: Inject FA 6 as Backup, but relying on Legacy Names helps bridging
  const faLink = document.createElement('link');
  faLink.rel = 'stylesheet';
  faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
  document.head.appendChild(faLink);

  const animLink = document.createElement('link');
  animLink.rel = 'stylesheet';
  animLink.href = prefix + 'css/animations.css';
  document.head.appendChild(animLink);

  // 2. HTML Injection
  const headerContainer = document.getElementById('main-header');
  const footerContainer = document.getElementById('main-footer');

  if (headerContainer) {
    let hHtml = HEADER_HTML.replace(/src="images\//g, `src="${prefix}images/`).replace(/href="index.html"/g, `href="${prefix}index.html"`);
    let mHtml = MOBILE_HTML.replace(/src="images\//g, `src="${prefix}images/`).replace(/href="index.html"/g, `href="${prefix}index.html"`);

    if (isSubDir) {
      hHtml = hHtml.replace(/href="([^"]+)\.html"/g, `href="../$1.html"`);
      mHtml = mHtml.replace(/href="([^"]+)\.html"/g, `href="../$1.html"`);
    }

    headerContainer.innerHTML = hHtml;
    const mobileContainer = document.createElement('div');
    mobileContainer.innerHTML = mHtml;
    document.body.appendChild(mobileContainer);

    const nextEl = headerContainer.nextElementSibling;
    if (nextEl && nextEl.tagName !== 'SCRIPT' && !document.body.classList.contains('no-header-padding')) {
      nextEl.classList.add('pt-24', 'md:pt-48');
    }
  }

  if (footerContainer) {
    let fHtml = FOOTER_HTML.replace(/src="images\//g, `src="${prefix}images/`).replace(/href="index.html"/g, `href="${prefix}index.html"`);
    if (isSubDir) fHtml = fHtml.replace(/href="([^"]+)\.html"/g, `href="../$1.html"`);
    footerContainer.innerHTML = fHtml;
  }

  // 3. Logic - Desktop Nav
  const desktopNav = document.getElementById('desktop-nav');
  if (desktopNav) {
    let html = '';
    NAV_ITEMS.forEach(item => {
      const href = prefix + item.href;
      const isActive = item.label === activePage || (item.label === 'Mapa' && activePage === 'Localízanos');
      const baseClass = "text-sm font-medium px-4 py-2 rounded-full transition-colors duration-200 tracking-wide";
      const activeClass = isActive ? "text-[#166534] bg-white font-bold shadow-sm" : "text-emerald-100 hover:text-white hover:bg-white/10";
      html += `<a href="${href}" class="${baseClass} ${activeClass}">${item.label}</a>`;
    });
    desktopNav.innerHTML = html;
  }

  // 4. Logic - Mobile Bottom Nav
  const mobileBottomNav = document.getElementById('mobile-bottom-nav');
  const popupContent = document.getElementById('popup-content');

  if (mobileBottomNav) {
    let html = '';

    NAV_ITEMS.filter(i => i.main).forEach(item => {
      const href = prefix + item.href;
      const isActive = item.label === activePage || (item.label === 'Mapa' && activePage === 'Localízanos');
      const colorClass = isActive ? "text-white scale-105" : "text-emerald-300 hover:text-emerald-100";
      const bgClass = isActive ? "bg-white/10 rounded-xl shadow-inner border border-white/10" : "";

      html += `
            <a href="${href}" class="flex flex-col items-center justify-center gap-1 w-full h-[65px] ${colorClass} ${bgClass} active:bg-white/20 transition-all rounded-xl">
               <i class="${item.icon} text-3xl mb-1"></i>
               <span class="text-[11px] font-bold tracking-wide">${item.label}</span>
            </a>
            `;
    });

    // "Más" Button (Using fa-th-large for generic grid)
    html += `
        <button onclick="togglePopupMenu()" class="flex flex-col items-center justify-center gap-1 w-full h-[65px] text-emerald-300 hover:text-emerald-100 active:text-white active:bg-white/20 transition-all rounded-xl">
           <i class="fas fa-th-large text-3xl mb-1"></i>
           <span class="text-[11px] font-bold tracking-wide">Más</span>
        </button>
        `;

    mobileBottomNav.innerHTML = html;
  }

  // Popup Content
  if (popupContent) {
    let pHtml = '';
    NAV_ITEMS.filter(i => !i.main).forEach(item => {
      const href = prefix + item.href;
      pHtml += `
             <a href="${href}" class="flex flex-col items-center justify-center gap-3 p-4 bg-emerald-50 hover:bg-emerald-100 rounded-2xl transition-all border border-emerald-100 group">
                <div class="w-12 h-12 bg-[#166534] text-white rounded-full flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform">
                   <i class="${item.icon}"></i>
                </div>
                <span class="font-bold text-[#166534] text-sm">${item.label}</span>
             </a>
             `;
    });

    pHtml += `
             <a href="https://feriaagricolaag.vercel.app/" class="flex flex-col items-center justify-center gap-3 p-4 bg-[#166534] hover:bg-emerald-900 rounded-2xl transition-all border border-emerald-600 shadow-xl group">
                <div class="w-12 h-12 bg-white text-[#166534] rounded-full flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                   <i class="fas fa-sign-in-alt"></i>
                </div>
                <span class="font-bold text-white text-sm">Ingresar</span>
             </a>
        `;
    popupContent.innerHTML = pHtml;
  }

  // 5. Sticky Header Effect
  const header = document.getElementById('desktop-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('py-2');
        header.classList.remove('py-6');
        header.firstElementChild.classList.add('bg-[#166534]/90', 'backdrop-blur-md', 'shadow-xl');
        header.firstElementChild.classList.remove('bg-[#166534]');
      } else {
        header.classList.remove('py-2');
        header.classList.add('py-6');
        header.firstElementChild.classList.remove('bg-[#166534]/90', 'backdrop-blur-md', 'shadow-xl');
        header.firstElementChild.classList.add('bg-[#166534]');
      }
    });
  }

  window.togglePopupMenu = function () {
    const popup = document.getElementById('mobile-popup-menu');
    const backdrop = document.getElementById('menu-backdrop');
    const btn = document.querySelector('button[onclick="togglePopupMenu()"] i');

    if (popup.classList.contains('hidden')) {
      popup.classList.remove('hidden');
      backdrop.classList.remove('hidden');
      requestAnimationFrame(() => {
        popup.classList.remove('scale-90', 'opacity-0');
        popup.classList.add('scale-100', 'opacity-100');
        if (btn) {
          btn.classList.remove('fa-th-large');
          btn.classList.add('fa-times');
        }
      });
    } else {
      popup.classList.remove('scale-100', 'opacity-100');
      popup.classList.add('scale-90', 'opacity-0');
      if (btn) {
        btn.classList.remove('fa-times');
        btn.classList.add('fa-th-large');
      }

      setTimeout(() => {
        popup.classList.add('hidden');
        backdrop.classList.add('hidden');
      }, 200);
    }
  };
}
