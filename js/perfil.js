/* ==========================================================================
   Feria Agrícola Melipilla - Perfil de Socio (perfil.js)
   Carga de Ficha de Socio desde Supabase y Enlace de WhatsApp
   ========================================================================== */

import { supabase } from './supabase-client.js';

async function loadProfile() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    window.location.href = 'socios.html';
    return;
  }

  try {
    const { data, error } = await supabase
      .from('members')
      .select('id, name, stall, section, profile_image, public_profiles(whatsapp_number)')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Socio no encontrado');

    document.title = `${data.name} | Feria Agrícola Melipilla`;
    const breadcrumbName = document.getElementById('breadcrumb-name');
    const heroTitle = document.getElementById('hero-title');
    const cardName = document.getElementById('card-name');
    const socioStall = document.getElementById('socio-stall');
    const socioSection = document.getElementById('socio-section');

    if (breadcrumbName) breadcrumbName.textContent = data.name;
    if (heroTitle) heroTitle.textContent = data.name;
    if (cardName) cardName.textContent = data.name;
    if (socioStall) socioStall.textContent = data.stall ? `Puesto ${data.stall}` : 'Sin asignar';
    if (socioSection) socioSection.textContent = data.section || 'General';

    const imgEl = document.getElementById('socio-image');
    const initialEl = document.getElementById('socio-avatar-initial');
    const initialChar = document.getElementById('initial-char');

    if (data.profile_image) {
      if (imgEl) {
        imgEl.src = data.profile_image;
        imgEl.classList.remove('hidden');
      }
      if (initialEl) initialEl.classList.add('hidden');
    } else {
      if (initialChar) initialChar.textContent = data.name.charAt(0).toUpperCase();
    }

    let profile = null;
    if (Array.isArray(data.public_profiles)) {
      profile = data.public_profiles[0];
    } else {
      profile = data.public_profiles;
    }

    if (profile && profile.whatsapp_number) {
      const cleanNumber = profile.whatsapp_number.replace(/\D/g, '');
      if (cleanNumber.length >= 8) {
        const waLink = document.getElementById('whatsapp-link');
        const waContainer = document.getElementById('whatsapp-container');
        if (waLink) waLink.href = `https://wa.me/${cleanNumber}?text=Hola,%20te%20contacto%20desde%20la%20web%20de%20la%20Feria%20Agrícola%20Melipilla.`;
        if (waContainer) waContainer.classList.remove('hidden');
      }
    }

    const skeleton = document.getElementById('profile-skeleton');
    const content = document.getElementById('profile-content');
    if (skeleton) skeleton.classList.add('hidden');
    if (content) content.classList.remove('hidden');

  } catch (err) {
    console.error('Error fetching member:', err);
    const skeleton = document.getElementById('profile-skeleton');
    if (skeleton) {
      skeleton.innerHTML = `
        <div class="py-8">
          <i class="fa-solid fa-circle-exclamation text-4xl text-amber-500 mb-3"></i>
          <h3 class="text-xl font-bold text-slate-800">No se pudo cargar el perfil</h3>
          <p class="text-sm text-slate-500 mt-2">El socio no fue encontrado o no está activo.</p>
          <a href="socios.html" class="inline-block mt-4 px-6 py-2.5 bg-green-800 text-white rounded-full text-xs font-bold hover:bg-green-700 transition">
            Volver a Socios
          </a>
        </div>
      `;
    }
  }
}

loadProfile();
