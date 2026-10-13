/* Z Gallery — Main JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initGallery();
  initFeatured();
  initModal();
  initFilters();
  initContactForm();
});

function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.classList.toggle('active');
  });
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('active');
    });
  });
}

function createThumbCard(item) {
  const card = document.createElement('article');
  card.className = 'thumb-card';
  card.dataset.category = item.category;
  const dlName = item.downloadName || 'thumbnail.png';
  card.innerHTML = `
    <div class="thumb-img-wrap" data-preview="${item.file}" data-title="${item.title}" data-download="${dlName}">
      <img src="${item.file}" alt="${item.title}" loading="lazy" width="1280" height="720">
      <div class="thumb-overlay"><span>معاينة كبيرة</span></div>
    </div>
    <div class="thumb-body">
      <span class="thumb-cat">${item.categoryLabel}</span>
      <h3 class="thumb-title">${item.title}</h3>
      <div class="thumb-actions">
        <button class="btn btn-outline btn-sm btn-preview" data-preview="${item.file}" data-title="${item.title}" data-download="${dlName}">معاينة</button>
        <a href="${item.file}" download="${dlName}" class="btn btn-primary btn-sm">تحميل</a>
      </div>
    </div>
  `;
  return card;
}

function initFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid || typeof THUMBNAILS === 'undefined') return;
  THUMBNAILS.slice(0, 6).forEach(item => grid.appendChild(createThumbCard(item)));
}

function initGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid || typeof THUMBNAILS === 'undefined') return;
  THUMBNAILS.forEach(item => grid.appendChild(createThumbCard(item)));
}

function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const grid = document.getElementById('galleryGrid');
  if (!buttons.length || !grid) return;
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      grid.querySelectorAll('.thumb-card').forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
      });
    });
  });
}

function initModal() {
  const modal = document.getElementById('previewModal');
  if (!modal) return;
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDownload = document.getElementById('modalDownload');
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');
  function openModal(src, title, downloadName) {
    modalImg.src = src;
    modalImg.alt = title;
    modalTitle.textContent = title;
    modalDownload.href = src;
    modalDownload.download = downloadName || (src.startsWith('data:') ? 'thumbnail.png' : src.split('/').pop());
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.addEventListener('click', (e) => {
    const previewEl = e.target.closest('[data-preview]');
    if (previewEl) {
      e.preventDefault();
      openModal(previewEl.dataset.preview, previewEl.dataset.title, previewEl.dataset.download);
    }
  });
  if (overlay) overlay.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = document.getElementById('formNote');
    const name = form.name.value.trim();
    note.textContent = `شكرًا ${name}! تم استلام رسالتك وسنرد عليك قريبًا.`;
    note.style.color = '#e6b800';
    form.reset();
    setTimeout(() => { note.textContent = ''; }, 5000);
  });
}
