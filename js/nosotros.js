/* ==========================================================================
   Feria Agrícola Melipilla - Nosotros (nosotros.js)
   Animación de Contadores Numéricos de Impacto Gremial
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length) return;

  const speed = 70;

  const startCounting = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const inc = Math.max(1, Math.floor(target / speed));

    const updateCount = () => {
      count += inc;
      if (count < target) {
        counter.innerText = count;
        setTimeout(updateCount, 25);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });

  counters.forEach(counter => observer.observe(counter));
});
