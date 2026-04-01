// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Gallery Filter
const filterButtons = document.querySelectorAll('.gallery-filter');
const galleryItems = document.querySelectorAll('.gallery-item');

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

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get('name');

  // Show confirmation message
  const formContainer = contactForm;
  formContainer.innerHTML = `
    <div style="text-align: center; padding: 40px 20px;">
      <div style="font-size: 3rem; margin-bottom: 16px;">&#9989;</div>
      <h3 style="margin-bottom: 12px;">Thanks, ${name || 'friend'}!</h3>
      <p style="opacity: 0.9;">We received your quote request. Patrick will get back to you soon!</p>
      <p style="margin-top: 16px; opacity: 0.8;">Need it sooner? Call or text <a href="tel:+12567143490" style="color: #f57c00; font-weight: 700;">(256) 714-3490</a></p>
    </div>
  `;
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
  } else {
    navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
  }

  lastScroll = currentScroll;
});
