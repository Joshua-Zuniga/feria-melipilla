/* ==========================================================================
   Feria Agrícola Melipilla - Localízanos (localizanos.js)
   Configuración de Mapas por Día, Pestañas Interactivas y Formulario de Contacto
   ========================================================================== */

const MAP_CONFIG = [
  {
    day: "Martes",
    title: "Feria de Martes: Trazado habitual en Melipilla",
    embed: "https://www.google.com/maps/d/embed?mid=1AkVO8siqXth9BmK8SZR8IYQxmvAeaVE&ehbc=2E312F&noprof=1",
    viewer: "https://www.google.com/maps/d/viewer?mid=1AkVO8siqXth9BmK8SZR8IYQxmvAeaVE"
  },
  {
    day: "Miércoles",
    title: "Feria de Miércoles: Recorrido y sectores habilitados",
    embed: "https://www.google.com/maps/d/embed?mid=1C6TYGzuZ9W7-K8Zufh_cZh1tDiWsOz0&ehbc=2E312F&noprof=1",
    viewer: "https://www.google.com/maps/d/viewer?mid=1C6TYGzuZ9W7-K8Zufh_cZh1tDiWsOz0"
  },
  {
    day: "Viernes",
    title: "Feria de Viernes: Instalación y accesos peatonales",
    embed: "https://www.google.com/maps/d/u/0/embed?mid=1axqoDjc8INs1StOl0yYyzMCvP3a1Dgg&ehbc=2E312F&noprof=1",
    viewer: "https://www.google.com/maps/d/u/0/viewer?mid=1axqoDjc8INs1StOl0yYyzMCvP3a1Dgg"
  },
  {
    day: "Sábado",
    title: "Feria de Sábado: Calles comerciales y sectores familiares",
    embed: "https://www.google.com/maps/d/embed?mid=14Ej2qbdxc_hEbvZbY__VIDy0Fur3Xks&ehbc=2E312F&noprof=1",
    viewer: "https://www.google.com/maps/d/viewer?mid=14Ej2qbdxc_hEbvZbY__VIDy0Fur3Xks"
  },
  {
    day: "Domingo",
    title: "Feria de Domingo: Circuito principal y gran convocatoria",
    embed: "https://www.google.com/maps/d/embed?mid=1-rGV0L51XRuUuIrNH0bx97_yZ5sL4XQ&ehbc=2E312F&noprof=1",
    viewer: "https://www.google.com/maps/d/viewer?mid=1-rGV0L51XRuUuIrNH0bx97_yZ5sL4XQ"
  }
];

window.cambiarMapa = function (index) {
  const iframe = document.getElementById('mapa-frame');
  const skeleton = document.getElementById('map-skeleton');
  const currentDayTitle = document.getElementById('currentDayTitle');
  const btnExternalMap = document.getElementById('btnExternalMap');

  if (!iframe) return;

  iframe.classList.remove('transition-opacity', 'duration-500');
  if (skeleton) skeleton.classList.remove('transition-opacity', 'duration-300');
  iframe.classList.add('opacity-0');
  if (skeleton) skeleton.classList.remove('opacity-0', 'pointer-events-none');

  void iframe.offsetWidth;

  requestAnimationFrame(() => {
    iframe.classList.add('transition-opacity', 'duration-500');
    if (skeleton) skeleton.classList.add('transition-opacity', 'duration-300');
  });

  const selected = MAP_CONFIG[index];
  iframe.src = selected.embed;
  if (currentDayTitle) currentDayTitle.textContent = selected.title;
  if (btnExternalMap) btnExternalMap.href = selected.viewer;

  for (let i = 0; i < MAP_CONFIG.length; i++) {
    const btn = document.getElementById('tab-' + i);
    if (!btn) continue;
    const badge = btn.querySelector('.badge');
    if (i === index) {
      btn.className = "tab-btn active px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2";
      if (badge) badge.className = "badge text-[10px] px-1.5 py-0.5 rounded-md font-extrabold bg-[#bef264] text-[#14532d]";
    } else {
      btn.className = "tab-btn px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 bg-white text-slate-700 border border-slate-200 hover:bg-slate-100";
      if (badge) badge.className = "badge text-[10px] px-1.5 py-0.5 rounded-md font-extrabold bg-slate-100 text-slate-600";
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const iframe = document.getElementById('mapa-frame');
  const skeleton = document.getElementById('map-skeleton');

  if (iframe) {
    iframe.onload = () => {
      if (skeleton) skeleton.classList.add('opacity-0', 'pointer-events-none');
      iframe.classList.remove('opacity-0');
    };
  }

  const mainContactForm = document.getElementById('mainContactForm');
  if (mainContactForm) {
    mainContactForm.addEventListener('submit', function () {
      const btn = document.getElementById('btnSubmitContact');
      if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin text-xs mr-2"></i> Enviando...';
      }
    });
  }
});
