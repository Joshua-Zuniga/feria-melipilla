/**
 * Componentes reutilizables para el sitio web
 * Maneja Header, Footer y Menú Móvil
 */

const HEADER_HTML = `
<header class="relative bg-primary text-white z-[500]">
  <div class="border-b border-emerald-700/80">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="index.html" class="flex items-center gap-3">
        <img src="images/logotipo.svg" alt="Feria Agrícola Melipilla" class="h-16 md:h-20">
      </a>

      <nav class="hidden md:flex items-center gap-6" id="desktop-nav">
        <!-- Links se inyectan dinámicamente -->
      </nav>

      <button id="mobileMenuButton"
        class="md:hidden w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all shadow-sm">
        <i class="fa-solid fa-bars text-lg"></i>
      </button>
    </div>
  </div>
</header>

<!-- Menú móvil (Fuera del header para evitar problemas de z-index) -->
<div id="mobileBackdrop" class="fixed inset-0 bg-black/70 hidden z-[9998] backdrop-blur-md transition-opacity duration-300 opacity-0"></div>
<aside id="mobileMenu"
  class="fixed inset-y-0 left-0 w-80 bg-[#166534] border-r border-emerald-800 transform -translate-x-full transition-transform duration-300 ease-out z-[9999] flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
  
  <div class="px-6 py-6 flex items-center justify-between border-b border-white/10">
    <div class="flex items-center gap-3">
      <img src="images/logotipo.svg" alt="Logo" class="h-10 brightness-110">
      <span class="font-bold text-white tracking-tight">Menú</span>
    </div>
    <button id="mobileMenuClose" class="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all">
      <i class="fa-solid fa-xmark text-lg"></i>
    </button>
  </div>

  <nav class="flex-grow flex flex-col px-4 py-8 overflow-y-auto space-y-2" id="mobile-nav-content">
    <!-- Links móviles -->
  </nav>

  <div class="p-6 border-t border-white/5 bg-black/20">
    <p class="text-[10px] text-emerald-300/40 uppercase font-black tracking-[0.2em] text-center">Asociación Gremial</p>
  </div>
</aside>
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
<div class="pt-6 mt-6 border-t border-emerald-800/50">
  <p class="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-3 pl-4">Acceso Usuarios</p>
  <a href="https://feriaagricolaag.vercel.app/"
    class="flex items-center gap-3 py-4 px-4 bg-white text-primary rounded-xl font-bold shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]">
    <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <i class="fa-solid fa-user"></i>
    </div>
    Ingresar a la Intranet
  </a>
</div>
`;

function renderLayout(activePage, isSubDir = false) {
  const prefix = isSubDir ? "../" : "";

  // Ajustar imágenes en Header y Footer
  let headerHtml = HEADER_HTML.replace(/src="images\//g, `src="${prefix}images/`).replace(/href="index.html"/g, `href="${prefix}index.html"`);
  let footerHtml = FOOTER_HTML.replace(/src="images\//g, `src="${prefix}images/`).replace(/href="index.html"/g, `href="${prefix}index.html"`);

  // Ajustar enlaces estáticos en Footer (están hardcodados en la constante FOOTER_HTML)
  // Reemplazar href="X.html" por href="../X.html" si es subdir
  if (isSubDir) {
    // Links rápidos footer
    footerHtml = footerHtml.replace(/href="Nosotros.html"/g, 'href="../Nosotros.html"');
    footerHtml = footerHtml.replace(/href="Directiva.html"/g, 'href="../Directiva.html"');
    footerHtml = footerHtml.replace(/href="Socios.html"/g, 'href="../Socios.html"');
    footerHtml = footerHtml.replace(/href="Noticias.html"/g, 'href="../Noticias.html"');
    footerHtml = footerHtml.replace(/href="Galeria.html"/g, 'href="../Galeria.html"');
    footerHtml = footerHtml.replace(/href="Localizanos.html"/g, 'href="../Localizanos.html"');
  }

  // 1. Inyectar CSS Global de Animaciones
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = prefix + 'css/animations.css';
  document.head.appendChild(link);

  // 2. Inyectar HTML base
  const headerContainer = document.getElementById('main-header');
  const footerContainer = document.getElementById('main-footer');
  if (headerContainer) {
    headerContainer.innerHTML = headerHtml;
    // Mover portal del menú al body para garantizar z-index superior
    const menu = document.getElementById('mobileMenu');
    const backdrop = document.getElementById('mobileBackdrop');
    if (menu) document.body.appendChild(menu);
    if (backdrop) document.body.appendChild(backdrop);
  }
  if (footerContainer) footerContainer.innerHTML = footerHtml;

  // 3. Inyectar Botón Scroll Top
  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'scrollTopBtn';
  scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  document.body.appendChild(scrollBtn);

  // Lógica Scroll Top
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Generar Menú Desktop
  const desktopNav = document.getElementById('desktop-nav');
  if (desktopNav) {
    let html = '';
    NAV_LINKS.forEach(link => {
      const isActive = link.label === activePage;
      const href = prefix + link.href;
      const classes = isActive
        ? "text-sm font-medium text-white hover:text-white transition-colors border-b-2 border-white"
        : "text-sm text-white/80 hover:text-white transition-colors";
      html += `<a href="${href}" class="${classes}">${link.label}</a>`;
    });
    html += LOGIN_BTN; // Login es externo, no necesita prefix
    desktopNav.innerHTML = html;
  }

  // Generar Menú Mobile (Simplificado para usar CSS robusto)
  const mobileNav = document.getElementById('mobile-nav-content');
  if (mobileNav) {
    let html = '';
    NAV_LINKS.forEach(link => {
      const href = prefix + link.href;
      html += `<a href="${href}">${link.label}</a>`;
    });
    html += LOGIN_BTN_MOBILE;
    mobileNav.innerHTML = html;
  }

  // Activar lógica del menú móvil (Estrategia de Portal + CSS robusto)
  const mobileBtn = document.getElementById('mobileMenuButton');
  const mobileClose = document.getElementById('mobileMenuClose');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileBackdrop = document.getElementById('mobileBackdrop');

  if (mobileBtn && mobileMenu && mobileBackdrop) {
    const openMenu = () => {
      mobileMenu.classList.remove('-translate-x-full');
      mobileBackdrop.classList.remove('hidden');
      setTimeout(() => {
        mobileBackdrop.classList.remove('opacity-0');
        document.body.classList.add('menu-open');
      }, 10);
    };

    const closeMenu = () => {
      mobileMenu.classList.add('-translate-x-full');
      mobileBackdrop.classList.add('opacity-0');
      setTimeout(() => {
        mobileBackdrop.classList.add('hidden');
        document.body.classList.remove('menu-open');
      }, 300);
    };

    mobileBtn.addEventListener('click', openMenu);
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    mobileBackdrop.addEventListener('click', closeMenu);

    // Cerrar al clickear un link
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }
}
