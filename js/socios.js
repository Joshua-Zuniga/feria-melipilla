/* ==========================================================================
   Feria Agrícola Melipilla - Socios (socios.js)
   Carga desde Supabase, Orden Alfabético por Apellido y Búsqueda en Vivo
   ========================================================================== */

import { supabase } from './supabase-client.js';

function getSurname(fullName) {
  if (!fullName) return '';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length <= 2) return parts[parts.length - 1];
  return parts[parts.length - 2];
}

async function fetchAndRenderSocios() {
  const grid = document.getElementById('socios-grid');
  if (!grid) return;

  try {
    const { data: members, error } = await supabase
      .from('members')
      .select('id, name, profile_image')
      .eq('is_active', true);

    if (error) throw error;

    if (!members || members.length === 0) {
      grid.innerHTML = '<div class="col-span-full text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-500">No se encontraron socios registrados actualmente.</div>';
      return;
    }

    members.sort((a, b) => {
      const surA = getSurname(a.name).toLowerCase();
      const surB = getSurname(b.name).toLowerCase();
      return surA.localeCompare(surB);
    });

    grid.innerHTML = '';
    members.forEach((member) => {
      const card = document.createElement('a');
      card.href = `perfil.html?id=${member.id}`;
      card.className = "tarjeta-socio member-card bg-white border border-slate-200/80 rounded-3xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer block hover:border-green-600/40";
      card.setAttribute('data-name', member.name.toLowerCase());
      card.setAttribute('data-nombre', member.name);

      const initial = member.name ? member.name.charAt(0).toUpperCase() : 'S';

      let avatarHtml = '';
      if (member.profile_image) {
        avatarHtml = `
          <div class="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm mx-auto mb-4 group-hover:scale-105 transition-transform">
            <img src="${member.profile_image}" alt="${member.name}" loading="lazy" decoding="async" class="w-full h-full object-cover" onerror="this.parentElement.innerHTML='<div class=\\'w-full h-full bg-slate-100 flex items-center justify-center text-green-900 font-extrabold text-2xl\\'>${initial}</div>'">
          </div>
        `;
      } else {
        avatarHtml = `
          <div class="w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center text-green-900 font-extrabold text-2xl shadow-sm mx-auto mb-4 group-hover:scale-105 transition-transform border border-green-200/50">
            ${initial}
          </div>
        `;
      }

      card.innerHTML = `
        ${avatarHtml}
        <h3 class="font-bold text-slate-800 text-sm sm:text-base group-hover:text-green-800 transition line-clamp-2 leading-tight">${member.name}</h3>
        <span class="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full mt-2 border border-green-100">
          <i class="fa-solid fa-circle-check text-[9px]"></i> Socio Activo
        </span>
        <div class="mt-4 pt-3 border-t border-slate-100 w-full flex items-center justify-between text-xs text-slate-400 group-hover:text-green-800 transition font-medium">
          <span>Ver Ficha y Puesto</span>
          <i class="fa-solid fa-arrow-right text-[10px] transform group-hover:translate-x-1 transition-transform"></i>
        </div>
      `;

      grid.appendChild(card);
    });

  } catch (err) {
    console.error('Error fetching socios:', err);
    grid.innerHTML = '<div class="col-span-full text-center py-16 bg-white rounded-3xl border border-slate-200 text-red-500 font-semibold">Error al cargar socios. Por favor intente más tarde.</div>';
  }
}

// Búsqueda en tiempo real con soporte de tildes
window.filtrarSocios = function () {
  const input = document.getElementById('buscadorSocios');
  if (!input) return;
  const filter = input.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  const cards = document.querySelectorAll('#socios-grid .tarjeta-socio');

  cards.forEach(card => {
    const rawName = card.getAttribute('data-nombre') || card.getAttribute('data-name') || '';
    const name = rawName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (name.includes(filter)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
};

const searchInput = document.getElementById('buscadorSocios');
if (searchInput) {
  searchInput.addEventListener('input', window.filtrarSocios);
}

document.addEventListener('DOMContentLoaded', fetchAndRenderSocios);
