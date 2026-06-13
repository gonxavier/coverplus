/* ── Reusable Components ────────────────────────────────────────────────────── */

(function () {

  /* ── Logos Carousel ──────────────────────────────────────────────────────── */
  const LOGOS_HTML = `
    <section class="clients section">
      <div class="container section-title text-center" data-aos="fade-up">
        <h2>Trabajamos con las principales aseguradoras del país</h2>
      </div>
      <div class="container">
        <div class="swiper clients-swiper">
          <script type="application/json" class="swiper-config">
            {
              "loop": true,
              "speed": 600,
              "autoplay": { "delay": 5000 },
              "slidesPerView": "auto",
              "pagination": {
                "el": ".swiper-pagination",
                "type": "bullets",
                "clickable": true
              },
              "breakpoints": {
                "320": { "slidesPerView": 2, "spaceBetween": 40 },
                "480": { "slidesPerView": 3, "spaceBetween": 60 },
                "640": { "slidesPerView": 4, "spaceBetween": 80 },
                "992": { "slidesPerView": 5, "spaceBetween": 120 },
                "1200": { "slidesPerView": 6, "spaceBetween": 120 }
              }
            }
          <\/script>
          <div class="swiper-wrapper align-items-center">
            <div class="swiper-slide"><img src="/assets/img/aseguradoras/ot/allianz-logo.svg" class="img-fluid" alt="Logo de la aseguradora Allianz" loading="lazy"></div>
            <div class="swiper-slide"><img src="/assets/img/aseguradoras/ot/gss.svg" class="img-fluid" alt="Logo de la aseguradora GSS" loading="lazy"></div>
            <div class="swiper-slide"><img src="/assets/img/aseguradoras/ot/san cristobal.svg" class="img-fluid" alt="Logo de la aseguradora San Cristóbal" loading="lazy"></div>
            <div class="swiper-slide"><img src="/assets/img/aseguradoras/ot/asociart.svg" class="img-fluid" alt="Logo de la aseguradora Asociart" loading="lazy"></div>
            <div class="swiper-slide"><img src="/assets/img/aseguradoras/ot/Berkley.svg" class="img-fluid" alt="Logo de la aseguradora Berkley" loading="lazy"></div>
            <div class="swiper-slide"><img src="/assets/img/aseguradoras/ot/rus.svg" class="img-fluid" alt="Logo de la aseguradora Río Uruguay Seguros" loading="lazy"></div>
            <div class="swiper-slide"><img src="/assets/img/aseguradoras/ot/allianz-logo.svg" class="img-fluid" alt="Logo de la aseguradora Allianz" loading="lazy"></div>
            <div class="swiper-slide"><img src="/assets/img/aseguradoras/ot/gss.svg" class="img-fluid" alt="Logo de la aseguradora GSS" loading="lazy"></div>
            <div class="swiper-slide"><img src="/assets/img/aseguradoras/ot/san cristobal.svg" class="img-fluid" alt="Logo de la aseguradora San Cristóbal" loading="lazy"></div>
            <div class="swiper-slide"><img src="/assets/img/aseguradoras/ot/asociart.svg" class="img-fluid" alt="Logo de la aseguradora Asociart" loading="lazy"></div>
            <div class="swiper-slide"><img src="/assets/img/aseguradoras/ot/Berkley.svg" class="img-fluid" alt="Logo de la aseguradora Berkley" loading="lazy"></div>
            <div class="swiper-slide"><img src="/assets/img/aseguradoras/ot/rus.svg" class="img-fluid" alt="Logo de la aseguradora Río Uruguay Seguros" loading="lazy"></div>
          </div>
        </div>
      </div>
    </section>`;

  function mountLogosCarousel() {
    document.querySelectorAll('[data-component="logos-carousel"]').forEach(function (el) {
      // Create a temp container, inject HTML, replace placeholder with the actual nodes
      const tmp = document.createElement('div');
      tmp.innerHTML = LOGOS_HTML;
      const section = tmp.firstElementChild;
      el.replaceWith(section);

      // Init Swiper on the newly injected element
      const swiperEl = section.querySelector('.swiper');
      if (swiperEl && window.Swiper) {
        const config = JSON.parse(swiperEl.querySelector('.swiper-config').textContent.trim());
        new window.Swiper(swiperEl, config);
      }
    });
  }

  // Run after Swiper is available (window load), or immediately if already loaded
  if (document.readyState === 'complete') {
    mountLogosCarousel();
  } else {
    window.addEventListener('load', mountLogosCarousel);
  }

})();
