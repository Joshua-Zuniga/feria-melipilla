/* ==========================================================================
   Feria Agrícola Melipilla - Lógica Global (global.js)
   Modales, Navegación Móvil, Portal Socios y Notificaciones Toast
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const backdrop = document.getElementById('backdrop');
    const moreSheet = document.getElementById('moreSheet');
    const moreButton = document.getElementById('moreButton');
    const closeMore = document.getElementById('closeMore');
    const moreIcon = document.getElementById('moreIcon');
    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');

    // Función universal para mostrar notificaciones toast
    window.showToast = function (message, type = 'success') {
      if (!toast || !toastMessage || !toastIcon) {
        console.log(`[Toast ${type}]:`, message);
        return;
      }
      toastMessage.textContent = message;
      if (type === 'success') {
        toastIcon.className = "w-7 h-7 rounded-full bg-lime-400 text-green-950 flex items-center justify-center shrink-0";
        toastIcon.innerHTML = '<i class="fa-solid fa-check text-xs"></i>';
      } else if (type === 'info') {
        toastIcon.className = "w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0";
        toastIcon.innerHTML = '<i class="fa-solid fa-info text-xs"></i>';
      } else if (type === 'error') {
        toastIcon.className = "w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0";
        toastIcon.innerHTML = '<i class="fa-solid fa-xmark text-xs"></i>';
      }
      toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
      toast.classList.add('translate-y-0', 'opacity-100');
      setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
        toast.classList.remove('translate-y-0', 'opacity-100');
      }, 3500);
    };

    // Apertura y Cierre de Panel Móvil 'Más'
    window.openMorePanel = function () {
      window.closeAllModals();
      if (moreSheet) moreSheet.classList.add('open');
      if (backdrop) backdrop.classList.add('open');
      if (moreIcon) moreIcon.classList.replace('fa-bars', 'fa-xmark');
      document.body.style.overflow = 'hidden';
    };

    window.closeMorePanel = function () {
      if (moreSheet) moreSheet.classList.remove('open');
      if (backdrop) {
        const memberModal = document.getElementById('memberModal') || document.getElementById('memberDetailModal');
        const instaModal = document.getElementById('instagramModal');
        if ((!memberModal || !memberModal.classList.contains('open')) &&
            (!instaModal || !instaModal.classList.contains('open'))) {
          backdrop.classList.remove('open');
          document.body.style.overflow = '';
        }
      }
      if (moreIcon) moreIcon.classList.replace('fa-xmark', 'fa-bars');
    };

    if (moreButton) moreButton.addEventListener('click', window.openMorePanel);
    if (closeMore) closeMore.addEventListener('click', window.closeMorePanel);

    // Cerrar todas las ventanas emergentes activas
    window.closeAllModals = function () {
      if (moreSheet) moreSheet.classList.remove('open');
      
      const memberModal = document.getElementById('memberModal') || document.getElementById('memberDetailModal');
      if (memberModal) memberModal.classList.remove('open');

      const instaModal = document.getElementById('instagramModal');
      if (instaModal) instaModal.classList.remove('open');
      const videoEl = document.querySelector("#instaModalMediaContainer video");
      if (videoEl) videoEl.pause();

      if (backdrop) backdrop.classList.remove('open');
      document.body.style.overflow = '';
      if (moreIcon) moreIcon.classList.replace('fa-xmark', 'fa-bars');
    };

    if (backdrop) backdrop.addEventListener('click', window.closeAllModals);
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', window.closeAllModals);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') window.closeAllModals();
    });
  });
})();
