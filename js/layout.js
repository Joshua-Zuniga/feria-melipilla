/**
 * Componentes reutilizables para el sitio web
 * Maneja Header, Footer y Menú Móvil
 */

const HEADER_HTML = `
<header class="bg-primary text-white">
  <div class="border-b border-emerald-700/80">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="index.html" class="flex items-center gap-3">
        <img src="images/logotipo.svg" alt="Feria Agrícola Melipilla" class="h-16 md:h-20">
      </a>

      <nav class="hidden md:flex items-center gap-6" id="desktop-nav">
        <!-- Links se inyectan dinámicamente para active state -->
      </nav>

      <button id="mobileMenuButton"
        class="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-white/30 hover:bg-white/10">
        <i class="fa-solid fa-bars text-lg"></i>
      </button>
    </div>
  </div>

  <!-- Menú móvil -->
  <div id="mobileBackdrop" class="fixed inset-0 bg-black/40 hidden z-40"></div>
  <aside id="mobileMenu"
    class="fixed inset-y-0 left-0 w-64 bg-primary/95 border-r border-emerald-700 transform -translate-x-full transition-all duration-200 z-50">
    
    <div class="px-4 py-4 flex items-center justify-between border-b border-emerald-700">
      <span class="font-semibold">Menú</span>
      <button id="mobileMenuClose" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <nav class="px-3 py-4 space-y-1" id="mobile-nav-content">
      <!-- Links móviles -->
    </nav>
  </aside>
</header>
`;

const FOOTER_HTML = `
<footer class="relative mt-20 text-slate-100">
  <div class="absolute inset-0 bg-gradient-to-br from-primary to-emerald-900 opacity-95"></div>
  <div class="absolute inset-0 opacity-10"
    style="background-image: url('data:image/svg+xml,%3Csvg width=\\'120\\' height=\\'120\\' viewBox=\\'0 0 120 120\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M60 10 C40 40 40 80 60 110 C80 80 80 40 60 10 Z\\' fill=\\'%23ffffff\\'/%3E%3C/svg%3E'); background-size: 180px;">
  </div>

  <div class="relative max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3">
    <div class="space-y-5">
      <a href="index.html" class="flex items-center gap-3 transition-opacity hover:opacity-80">
        <img src="images/logotipo.svg" alt="Logo Feria Agrícola" class="h-20 drop-shadow-lg brightness-110">
      </a>
      <p class="text-sm text-emerald-100 leading-relaxed max-w-sm">
        Somos la Asociación Gremial Feria Agrícola Melipilla, dedicada al fortalecimiento,
        organización y representación de nuestros feriantes y su comunidad.
      </p>
    </div>

    <div class="space-y-5">
      <h4 class="text-sm font-semibold tracking-widest uppercase text-lime-200">Enlaces rápidos</h4>
      <ul class="space-y-2 text-sm">
        <li><a href="Nosotros.html" class="hover:text-white hover:underline">Nosotros</a></li>
        <li><a href="Directiva.html" class="hover:text-white hover:underline">Directiva</a></li>
        <li><a href="Socios.html" class="hover:text-white hover:underline">Socios</a></li>
        <li><a href="Noticias.html" class="hover:text-white hover:underline">Noticias</a></li>
        <li><a href="Galeria.html" class="hover:text-white hover:underline">Galería</a></li>
        <li><a href="Localizanos.html" class="hover:text-white hover:underline">Localízanos</a></li>
      </ul>
    </div>

    <div class="space-y-5">
      <h4 class="text-sm font-semibold tracking-widest uppercase text-lime-200">Síguenos</h4>
      <div class="flex gap-5">
        <a href="https://www.facebook.com/asoc.feria.agricola.melipilla" target="_blank"
          class="w-12 h-12 grid place-items-center rounded-full bg-emerald-700/50 border border-lime-300/30 hover:bg-emerald-600 transition shadow-lg">
          <i class="fa-brands fa-facebook-f text-xl"></i>
        </a>
        <a href="https://www.instagram.com/asoc.feria.agricola.melipilla" target="_blank"
          class="w-12 h-12 grid place-items-center rounded-full bg-emerald-700/50 border border-lime-300/30 hover:bg-emerald-600 transition shadow-lg">
          <i class="fa-brands fa-instagram text-xl"></i>
        </a>
      </div>
      <div class="pt-3">
        <p class="text-sm text-emerald-100">Correo de contacto:</p>
        <a href="mailto:a.g.feria.agricola.m@gmail.com" class="text-lime-200 hover:text-white underline text-sm">
          a.g.feria.agricola.m@gmail.com
        </a>
      </div>
    </div>
  </div>

  <div class="relative border-t border-emerald-700/60 bg-emerald-950/60 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-6 py-4 text-center text-xs text-emerald-300/80">
      © 2025 Asociación Gremial Feria Agrícola Melipilla — Todos los derechos reservados.
    </div>
  </div>
</footer>
`;

const NAV_LINKS = [
  { href: 'index.html', label: 'Inicio' },
  { href: 'Nosotros.html', label: 'Nosotros' },
  { href: 'Directiva.html', label: 'Directiva' },
  { href: 'Socios.html', label: 'Socios' },
  { href: 'Noticias.html', label: 'Noticias' },
  { href: 'Galeria.html', label: 'Galería' },
  { href: 'Localizanos.html', label: 'Localízanos' }
];

const LOGIN_BTN = `
<a href="https://feriaagricolaag.vercel.app/"
  class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/20 ml-2">
  <i class="fa-solid fa-user text-xs"></i>
  <span>Ingresar</span>
</a>
`;

const LOGIN_BTN_MOBILE = `
<div class="pt-4 mt-2 border-t border-emerald-800">
  <a href="https://feriaagricolaag.vercel.app/"
    class="block py-2 px-4 text-emerald-100 hover:bg-white/10 rounded-lg font-semibold flex items-center gap-3">
    <i class="fa-solid fa-user"></i>
    Ingresar
  </a>
</div>
`;

function renderLayout(activePage) {
  // Inyectar HTML base
  const headerContainer = document.getElementById('main-header');
  const footerContainer = document.getElementById('main-footer');
  if (headerContainer) headerContainer.innerHTML = HEADER_HTML;
  if (footerContainer) footerContainer.innerHTML = FOOTER_HTML;

  // Generar Menú Desktop
  const desktopNav = document.getElementById('desktop-nav');
  if (desktopNav) {
    let html = '';
    NAV_LINKS.forEach(link => {
      const isActive = link.label === activePage;
      const classes = isActive 
        ? "text-sm font-medium text-white hover:text-white transition-colors border-b-2 border-white"
        : "text-sm text-white/80 hover:text-white transition-colors";
      html += `<a href="${link.href}" class="${classes}">${link.label}</a>`;
    });
    html += LOGIN_BTN; // Agregar botón login
    desktopNav.innerHTML = html;
  }

  // Generar Menú Mobile
  const mobileNav = document.getElementById('mobile-nav-content');
  if (mobileNav) {
    let html = '';
    NAV_LINKS.forEach(link => {
       const isActive = link.label === activePage;
       const classes = isActive 
         ? "block py-2 px-4 bg-white/10 rounded-lg"
         : "block py-2 px-4 hover:bg-white/10 rounded-lg";
       html += `<a href="${link.href}" class="${classes}">${link.label}</a>`;
    });
    html += LOGIN_BTN_MOBILE;
    mobileNav.innerHTML = html;
  }

  // Activar lógica del menú móvil
  const mobileBtn = document.getElementById('mobileMenuButton');
  const mobileClose = document.getElementById('mobileMenuClose');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileBackdrop = document.getElementById('mobileBackdrop');

  if (mobileBtn && mobileMenu && mobileBackdrop) {
    const openMenu = () => {
      mobileMenu.classList.remove('-translate-x-full');
      mobileBackdrop.classList.remove('hidden');
    };
    const closeMenu = () => {
      mobileMenu.classList.add('-translate-x-full');
      mobileBackdrop.classList.add('hidden');
    };

    mobileBtn.addEventListener('click', openMenu);
    mobileClose.addEventListener('click', closeMenu);
    mobileBackdrop.addEventListener('click', closeMenu);
  }
}
