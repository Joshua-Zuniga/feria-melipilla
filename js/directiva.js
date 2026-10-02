/* ==========================================================================
   Feria Agrícola Melipilla - Directiva (directiva.js)
   Modal de Funciones de Miembros y Enlace Rápido de Contacto
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const memberModal = document.getElementById('memberModal') || document.getElementById('memberDetailModal');
  const backdrop = document.getElementById('backdrop');

  window.openMemberDetails = function (name, role, desc) {
    const nameEl = document.getElementById('modalMemberName');
    const roleEl = document.getElementById('modalMemberRole');
    const descEl = document.getElementById('modalMemberDesc');

    if (nameEl) nameEl.textContent = name;
    if (roleEl) roleEl.textContent = role;
    if (descEl) descEl.textContent = desc;

    if (memberModal) memberModal.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  document.querySelectorAll('.btn-member-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = btn.getAttribute('data-name');
      const role = btn.getAttribute('data-role');
      const desc = btn.getAttribute('data-desc');
      window.openMemberDetails(name, role, desc);
    });
  });

  document.querySelectorAll('.btn-contact-prompt').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-target') || 'la Directiva';
      if (window.closeAllModals) window.closeAllModals();
      if (window.showToast) {
        window.showToast(`Acceso a contacto para ${target}. Puedes escribirnos en la sección Contacto.`);
      }
    });
  });
});
