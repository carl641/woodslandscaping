// ===== Shared Components =====
// Each page sets <body data-base=""> or <body data-base="../"> etc.
const base = document.body.dataset.base || '';

function renderHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  header.innerHTML = `
  <nav class="navbar" id="navbar">
    <div class="container nav-container">
      <a href="${base}" class="nav-logo"><img src="${base}images/woodslogo.png" alt="Woods Landscaping &amp; Dirt Work LLC" class="nav-logo-img"></a>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links" id="navLinks">
        <li class="dropdown">
          <a href="${base}services/" class="dropdown-toggle">Services <span class="caret">&#9662;</span></a>
          <ul class="dropdown-menu">
            <li><a href="${base}services/dirt-grading">Dirt &amp; Grading</a></li>
            <li><a href="${base}services/land-clearing">Land Clearing</a></li>
            <li><a href="${base}services/construction-support">Construction Support</a></li>
            <li><a href="${base}services/underground-utilities">Underground &amp; Utilities</a></li>
            <li><a href="${base}services/surface-materials">Surface Materials</a></li>
            <li><a href="${base}services/lawn-landscaping">Lawn &amp; Landscaping</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle">Service Areas <span class="caret">&#9662;</span></a>
          <ul class="dropdown-menu">
            <li><a href="${base}service-areas/limestone-county">Limestone County</a></li>
            <li><a href="${base}service-areas/limestone-county/athens">&nbsp;&nbsp;Athens, AL</a></li>
            <li><a href="${base}service-areas/morgan-county">Morgan County</a></li>
            <li><a href="${base}service-areas/morgan-county/decatur">&nbsp;&nbsp;Decatur, AL</a></li>
          </ul>
        </li>
        <li><a href="${base}recent-work">Recent Work</a></li>
        <li><a href="${base}gallery">Gallery</a></li>
        <li><a href="${base}contact" class="btn btn-nav">Get a Quote</a></li>
      </ul>
    </div>
  </nav>`;

  // Mobile toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('open');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.classList.remove('open');
    });
  });

  // Mobile dropdown toggles
  if (window.innerWidth <= 768) {
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggle.parentElement.classList.toggle('open');
      });
    });
  }

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
      document.getElementById('navbar').classList.add('scrolled');
    } else {
      document.getElementById('navbar').classList.remove('scrolled');
    }
  });
}

function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;
  footer.innerHTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>Woods Landscaping &amp; Dirt Work LLC</h3>
          <p>Ardmore, AL &mdash; Limestone County</p>
          <a href="tel:+12567143490">(256) 714-3490</a>
          <p class="footer-payment">Cash &bull; Check &bull; Venmo</p>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <a href="${base}services/dirt-grading">Dirt &amp; Grading</a>
          <a href="${base}services/land-clearing">Land Clearing</a>
          <a href="${base}services/construction-support">Construction Support</a>
          <a href="${base}services/underground-utilities">Underground &amp; Utilities</a>
          <a href="${base}services/surface-materials">Surface Materials</a>
          <a href="${base}services/lawn-landscaping">Lawn &amp; Landscaping</a>
        </div>
        <div class="footer-col">
          <h4>Service Areas</h4>
          <a href="${base}service-areas/limestone-county">Limestone County</a>
          <a href="${base}service-areas/limestone-county/athens">Athens, AL</a>
          <a href="${base}service-areas/morgan-county">Morgan County</a>
          <a href="${base}service-areas/morgan-county/decatur">Decatur, AL</a>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="${base}recent-work">Recent Work</a>
          <a href="${base}gallery">Gallery</a>
          <a href="${base}contact">Contact</a>
          <a href="tel:+12567143490">Call Patrick</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Woods Landscaping &amp; Dirt Work LLC. All rights reserved. Fully Licensed &amp; Insured.</p>
      </div>
    </div>
  </footer>`;
}

// ===== Gallery Filter (gallery page) =====
function initGalleryFilters() {
  const filterButtons = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!filterButtons.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

// ===== Contact Form (contact page) =====
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    form.innerHTML = `
      <div style="text-align: center; padding: 40px 20px;">
        <div style="font-size: 3rem; margin-bottom: 16px;"><i class="fa-solid fa-circle-check" style="color: var(--color-primary);"></i></div>
        <h3 style="margin-bottom: 12px;">Thanks, ${name || 'friend'}!</h3>
        <p style="opacity: 0.9;">We received your quote request. Patrick will get back to you soon!</p>
        <p style="margin-top: 16px; opacity: 0.8;">Need it sooner? Call or text <a href="tel:+12567143490" style="color: #f57c00; font-weight: 700;">(256) 714-3490</a></p>
      </div>`;
  });
}

// ===== Hero Image Slider (lazy loaded) =====
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  let current = 0;
  let loaded = 0;

  function loadSlide(index) {
    const slide = slides[index];
    if (slide.style.backgroundImage) return;
    const src = slide.dataset.src;
    if (!src) return;
    const img = new Image();
    img.onload = function () {
      slide.style.backgroundImage = 'url(' + src + ')';
      loaded++;
      if (loaded === 1) startRotation();
    };
    img.src = src;
  }

  function startRotation() {
    setInterval(function () {
      slides[current].classList.remove('active');
      slides[current].setAttribute('aria-hidden', 'true');
      current = (current + 1) % slides.length;
      loadSlide((current + 1) % slides.length);
      slides[current].classList.add('active');
      slides[current].setAttribute('aria-hidden', 'false');
    }, 5000);
  }

  // Defer loading until after the page is interactive
  if ('requestIdleCallback' in window) {
    requestIdleCallback(function () {
      loadSlide(0);
      loadSlide(1);
    });
  } else {
    setTimeout(function () {
      loadSlide(0);
      loadSlide(1);
    }, 200);
  }
}

// ===== Lightbox (gallery page) =====
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const img = document.getElementById('lightboxImg');
  const items = document.querySelectorAll('.gallery-item img');
  if (!items.length) return;

  let current = 0;

  function open(index) {
    current = index;
    img.src = items[current].src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function prev() {
    current = (current - 1 + items.length) % items.length;
    img.src = items[current].src;
  }

  function next() {
    current = (current + 1) % items.length;
    img.src = items[current].src;
  }

  items.forEach(function (item, i) {
    item.closest('.gallery-item').addEventListener('click', function () {
      open(i);
    });
  });

  document.getElementById('lightboxClose').addEventListener('click', close);
  document.getElementById('lightboxPrev').addEventListener('click', prev);
  document.getElementById('lightboxNext').addEventListener('click', next);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
}

// ===== Project Slider (recent work detail pages) =====
function initProjectSlider() {
  const slider = document.getElementById('projectSlider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.project-slide');
  const dots = slider.querySelectorAll('.project-slider-dot');
  const prevBtn = slider.querySelector('.project-slider-prev');
  const nextBtn = slider.querySelector('.project-slider-next');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function show(index) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function next() { show(current + 1); }
  function prev() { show(current - 1); }

  function restart() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restart(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); restart(); });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { show(i); restart(); });
  });

  restart();
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  initGalleryFilters();
  initContactForm();
  initHeroSlider();
  initProjectSlider();
  initLightbox();
});
