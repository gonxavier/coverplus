/* ── Reusable Components ────────────────────────────────────────────────────── */

(function () {

  /* ── Header / Nav ────────────────────────────────────────────────────────── */
  const HEADER_HTML = `
    <header id="header" class="header d-flex align-items-center fixed-top">
      <div class="container-fluid container-xl position-relative d-flex align-items-center">
        <a href="/" class="logo d-flex align-items-center me-auto">
          <img src="/assets/img/c-header-new.png" alt="Logo de Cover+, asesoramiento en seguros personalizado y digital" loading="lazy">
        </a>
        <nav id="navmenu" class="navmenu">
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/#alt-features">Servicios</a></li>
            <li class="dropdown"><a href="/coberturas/"><span>Coberturas</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
              <ul>
                <li><a href="/coberturas/auto">Auto</a></li>
                <li><a href="/coberturas/hogar">Hogar</a></li>
                <li><a href="/coberturas/moto">Moto</a></li>
              </ul>
            </li>
            <li><a href="/blog/">Blog</a></li>
            <li><a href="/faq">Preguntas Frecuentes</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
          <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>
        <a class="btn-getstarted" href="https://wa.me/5491140275158" target="_blank">Cotizá por WhatsApp</a>
      </div>
    </header>`;

  function mountHeader() {
    document.querySelectorAll('[data-component="header"]').forEach(function (el) {
      const tmp = document.createElement('div');
      tmp.innerHTML = HEADER_HTML;
      const header = tmp.firstElementChild;

      // Set active link based on current path
      const path = window.location.pathname.replace(/\/$/, '') || '/';
      header.querySelectorAll('#navmenu a').forEach(function (link) {
        const href = link.getAttribute('href').replace(/\/$/, '') || '/';
        // Skip hash-only links — scrollspy in main.js handles those
        if (href.startsWith('/#') || href === '#') return;
        if (
          (path === '/' && href === '/') ||
          (path !== '/' && href !== '/' && path.startsWith(href))
        ) {
          link.classList.add('active');
        }
      });

      el.replaceWith(header);
    });
  }

  // Header must mount synchronously so main.js finds the nav on execution
  mountHeader();

  /* ── Logos Carousel ──────────────────────────────────────────────────────── */
  var SWIPER_CONFIG = {
    loop: true,
    speed: 600,
    autoplay: { delay: 5000 },
    slidesPerView: 'auto',
    pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true },
    breakpoints: {
      320: { slidesPerView: 2, spaceBetween: 40 },
      480: { slidesPerView: 3, spaceBetween: 60 },
      640: { slidesPerView: 4, spaceBetween: 80 },
      992: { slidesPerView: 5, spaceBetween: 120 },
      1200: { slidesPerView: 6, spaceBetween: 120 }
    }
  };

  const LOGOS_HTML = `
    <section id="clients-component" class="clients section">
      <div class="container">
        <h2 class="clients-label">Trabajamos con las principales aseguradoras del país</h2>
        <div class="swiper">
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
            <div class="swiper-slide"><img src="/assets/img/aseguradoras/ot/allianz-logo.svg" class="img-fluid" alt="Logo de la aseguradora Allianz" loading="lazy"></div>
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
        new window.Swiper(swiperEl, SWIPER_CONFIG);
      }
    });
  }

  /* ── CTA Parallax ───────────────────────────────────────────────────────────── */
  const CTA_HTML = `
    <section id="call-to-action" class="call-to-action section">
      <img src="/assets/img/cta-bg-pen.jpg" alt="Imagen de un bolígrafo sobre un fondo, utilizada en la sección de llamada a la acción." loading="lazy">
      <div class="container">
        <div class="row" data-aos="zoom-in" data-aos-delay="20">
          <div class="col-xl-9 text-center text-xl-start">
            <h3>Empezá a estar +Seguro</h3>
            <p>Estás a un solo paso de tener tu seguro en las mejores manos.</p>
          </div>
          <div class="col-xl-3 cta-btn-container text-center">
            <a class="cta-btn align-middle" href="https://wa.me/5491140275158" target="_blank">Cotizá tu seguro hoy</a>
          </div>
        </div>
      </div>
    </section>`;

  function mountCTA() {
    document.querySelectorAll('[data-component="cta-parallax"]').forEach(function (el) {
      const tmp = document.createElement('div');
      tmp.innerHTML = CTA_HTML;
      el.replaceWith(tmp.firstElementChild);
    });
  }

  /* ── Footer ─────────────────────────────────────────────────────────────── */
  const FOOTER_HTML = `
    <footer id="footer" class="footer">
      <div class="container footer-top">
        <div class="row gy-4">
          <div class="col-lg-4 col-md-6 footer-about">
            <a href="/" class="d-flex align-items-center">
              <img src="/assets/img/c-header-new.png" alt="Logo de Cover+, asesoramiento en seguros personalizado y digital" width="150px">
            </a>
            <div class="footer-contact pt-3">
              <p>Av. Santa Fe 768</p>
              <p>1059 - Ciudad Autónoma de Buenos Aires</p>
              <p><strong>Email:</strong> <span>info@coverplus.com.ar</span></p>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 footer-links">
            <h4>Coberturas</h4>
            <ul>
              <li><i class="bi bi-chevron-right"></i> <a href="/coberturas/auto">Seguro de Auto</a></li>
              <li><i class="bi bi-chevron-right"></i> <a href="/coberturas/hogar">Seguro de Hogar</a></li>
              <li><i class="bi bi-chevron-right"></i> <a href="/coberturas/moto">Seguro de Moto</a></li>
              <li><i class="bi bi-chevron-right"></i> <a href="/coberturas/">Ver todas</a></li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-3 footer-links">
            <h4>Links de Interés</h4>
            <ul>
              <li><i class="bi bi-chevron-right"></i> <a href="https://www.argentina.gob.ar/superintendencia-de-seguros" rel="noopener noreferrer" target="_blank">SSN</a></li>
              <li><i class="bi bi-chevron-right"></i> <a href="https://www.ssn.gob.ar/storage/registros/productores/productoresactivosfiltro.asp" rel="noopener noreferrer" target="_blank">Consulta de Matrícula</a></li>
              <li><i class="bi bi-chevron-right"></i> <a href="/faq">Preguntas Frecuentes</a></li>
            </ul>
          </div>
          <div class="col-lg-4 col-md-12">
            <h4>Seguinos en redes</h4>
            <p>Para estar al día de todas las novedades</p>
            <div class="social-links d-flex">
              <a href="https://www.instagram.com/coverplus.ar/" target="_blank" aria-label="Instagram de Cover+"><i class="bi bi-instagram"></i></a>
              <a href="https://www.linkedin.com/company/coverplusar/" target="_blank" aria-label="LinkedIn de Cover+"><i class="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div class="container copyright text-center mt-4">
        <p>© <span>Copyright</span> <strong class="px-1 sitename">Gonzalo Javier Domínguez</strong> <br> <span>Productor Asesor de Seguros (Mat SSN N°: 93065)</span></p>
      </div>
    </footer>`;

  function mountFooter() {
    document.querySelectorAll('[data-component="footer"]').forEach(function (el) {
      const tmp = document.createElement('div');
      tmp.innerHTML = FOOTER_HTML;
      el.replaceWith(tmp.firstElementChild);
    });
  }

  function runMounts() {
    try { mountLogosCarousel(); } catch(e) { console.error('mountLogosCarousel failed', e); }
    try { mountCTA(); } catch(e) { console.error('mountCTA failed', e); }
    try { mountFooter(); } catch(e) { console.error('mountFooter failed', e); }
  }

  if (document.readyState === 'complete') {
    runMounts();
  } else {
    window.addEventListener('load', runMounts);
  }

})();
