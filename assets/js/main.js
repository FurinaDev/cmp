/**
 * Çağdaş Müzik Platformu — Ana İstemci Mantığı (main.js)
 * Avangart Editoryal Kültür-Sanat Deneyimi, Çift Protokol Uyumlu
 */

// Türkçe Karakter Normalizasyonu (Arama ve Filtre Toleransı)
function normalizeTr(str) {
  if (!str) return '';
  return String(str)
    .replace(/İ/g, 'i')
    .replace(/I/g, 'ı')
    .replace(/ı/g, 'i')
    .toLowerCase()
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .trim();
}
window.normalizeTr = normalizeTr;

// Toast Bildirim Sistemi
function initToast() {
  if (!document.getElementById('cmp-toast-container')) {
    const container = document.createElement('div');
    container.id = 'cmp-toast-container';
    container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:8px;pointer-events:none;';
    document.body.appendChild(container);
  }
}
window.initToast = initToast;

function showToast(message, type = 'success') {
  initToast();
  const container = document.getElementById('cmp-toast-container');
  const toast = document.createElement('div');
  toast.className = 'cmp-toast';
  toast.style.cssText = `
    padding: 12px 20px;
    background: ${type === 'success' ? '#0A2260' : '#DC2626'};
    color: #FFFFFF;
    font-family: var(--font-heading, sans-serif);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.02em;
    border-left: 3px solid #DD5626;
    box-shadow: 0 10px 25px -5px rgba(10,34,96,0.3);
    border-radius: 2px;
    pointer-events: auto;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    transform: translateY(10px);
    opacity: 0;
  `;
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.transform = 'translateY(10px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
window.showToast = showToast;

// DOM Yüklendiğinde Başlat
document.addEventListener('DOMContentLoaded', async () => {
  initToast();
  initMobileMenu();

  // Store'u başlat
  await Store.init();

  if (document.getElementById('home-events-container') || document.getElementById('season-events-container')) {
    renderHomeEvents();
    renderHomeArchive();
    renderHomeBlogs();
    renderHomeStats();
  }

  if (document.getElementById('team-grid-container')) {
    renderTeamPage();
  }

  if (document.getElementById('events-page-container')) {
    renderEventsPage();
  }

  if (document.getElementById('archive-page-container')) {
    renderArchivePage();
  }

  if (document.getElementById('blogs-page-container')) {
    renderBlogsPage();
  }

  if (document.getElementById('volunteer-form')) {
    initVolunteerForm();
  }

  if (document.getElementById('contact-form')) {
    initContactForm();
  }
});

/* Mobil Menü */
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.main-nav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const isVisible = nav.classList.contains('mobile-active');
      if (isVisible) {
        nav.classList.remove('mobile-active');
        nav.style.display = 'none';
      } else {
        nav.classList.add('mobile-active');
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.background = '#071842';
        nav.style.padding = '20px';
        nav.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        nav.style.boxShadow = '0 15px 30px rgba(0,0,0,0.5)';
      }
    });
  }
}

/* Ana Sayfa: Yaklaşan Etkinlikler */
function renderHomeEvents() {
  const container = document.getElementById('home-events-container') || document.getElementById('season-events-container');
  if (!container) return;

  const events = Store.getEvents('all', 'upcoming').slice(0, 3);
  if (events.length === 0) {
    container.innerHTML = '<div class="text-muted" style="padding:20px; font-family:var(--font-mono, monospace);">[PROGRAM: SEZON PRÖMİYERLERİ HAZIRLANIYOR]</div>';
    return;
  }

  container.innerHTML = events.map((e, idx) => `
    <div class="event-card">
      <div class="event-thumb">
        <img src="${e.poster || 'assets/images/logo-navy-on-white.png'}" alt="${e.title}" onerror="this.src='assets/images/logo-navy-on-white.png'">
        <span class="event-category-badge">${e.type}</span>
        <span class="event-status-badge ${e.isPast ? 'past' : ''}">${e.status || 'Kayıtlar Açık'}</span>
        <span class="score-measure-tag">OP.${idx + 1} // 2025</span>
      </div>
      <div class="event-body">
        <div class="event-meta">
          <span class="event-meta-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            ${e.date}
          </span>
          <span class="event-meta-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${e.time || '20:00'}
          </span>
        </div>
        <h3 class="event-title">${e.title}</h3>
        <p class="event-desc">${e.description || ''}</p>
        <div class="event-footer">
          <span class="event-venue">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            ${e.venue}
          </span>
          <a href="${e.ticketUrl || '#'}" class="btn btn-sm btn-primary" ${e.ticketUrl && e.ticketUrl.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>Detay & Bilet</a>
        </div>
      </div>
    </div>
  `).join('');
}

/* Ana Sayfa: Dijital Arşiv */
function renderHomeArchive() {
  const container = document.getElementById('home-archive-container');
  if (!container) return;

  const items = Store.getArchive().slice(0, 4);
  container.innerHTML = items.map(item => `
    <div class="archive-card" onclick="openArchiveModal('${item.id}')">
      <div class="archive-thumb">
        <img src="${item.poster || 'assets/images/logo-navy-on-white.png'}" alt="${item.title}" onerror="this.src='assets/images/logo-navy-on-white.png'">
        <div class="archive-play-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        </div>
        <span class="archive-duration">${item.duration || '14:20'}</span>
      </div>
      <div class="archive-body">
        <div class="archive-composer">${item.composer}</div>
        <h4 class="archive-title">${item.title}</h4>
        <div class="archive-performer">${item.performer || 'Topluluk'}</div>
      </div>
    </div>
  `).join('');
}

/* Ana Sayfa: Blog Yazıları */
function renderHomeBlogs() {
  const container = document.getElementById('home-blogs-container');
  if (!container) return;

  const blogs = Store.getBlogs().slice(0, 3);
  container.innerHTML = blogs.map(b => `
    <div class="blog-card">
      <div class="blog-thumb">
        <img src="${b.image || 'assets/images/logo-navy-on-white.png'}" alt="${b.title}" onerror="this.src='assets/images/logo-navy-on-white.png'">
      </div>
      <div class="blog-body">
        <div class="blog-meta">
          <span class="blog-category">${b.category}</span>
          <span>${b.readTime || '5 dk'}</span>
          <span>${b.date}</span>
        </div>
        <h3 class="blog-title"><a href="blog-detay.html?slug=${b.slug}">${b.title}</a></h3>
        <p class="blog-excerpt">${b.excerpt}</p>
        <div class="blog-footer">
          <span class="blog-author">${b.author}</span>
          <a href="blog-detay.html?slug=${b.slug}" class="btn btn-sm btn-ghost">İncele &rarr;</a>
        </div>
      </div>
    </div>
  `).join('');
}

function renderHomeStats() {
  const site = Store.getSite();
  if (!site || !site.stats) return;

  const statVolunteers = document.getElementById('stat-volunteers');
  const statUnits = document.getElementById('stat-units');
  const statConcerts = document.getElementById('stat-concerts');
  const statEmployment = document.getElementById('stat-employment');

  if (statVolunteers) statVolunteers.textContent = site.stats.volunteers || '40+';
  if (statUnits) statUnits.textContent = site.stats.units || '8';
  if (statConcerts) statConcerts.textContent = site.stats.concerts || '25+';
  if (statEmployment) statEmployment.textContent = site.stats.employment || '60+';
}

/* Ekip Sayfası: 8 Birim Sekmeleri & 41 Kişilik Liste */
function renderTeamPage() {
  const container = document.getElementById('team-grid-container');
  const tabButtons = document.querySelectorAll('.team-tab-btn');
  const searchInput = document.getElementById('team-search-input');

  let currentUnit = 'all';
  let searchTerm = '';

  function render() {
    let list = Store.getTeam(currentUnit);

    if (searchTerm && searchTerm.trim()) {
      const q = normalizeTr(searchTerm);
      list = list.filter(m => {
        const nameNorm = normalizeTr(m.name || '');
        const titleNorm = normalizeTr(m.title || '');
        const unitNorm = normalizeTr(m.unit || '');
        const bioNorm = normalizeTr(m.bio || '');
        return nameNorm.includes(q) || titleNorm.includes(q) || unitNorm.includes(q) || bioNorm.includes(q);
      });
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #FFFFFF; border: 1px solid var(--border-subtle); border-radius: 4px;">
          <div style="font-family: var(--font-mono, monospace); font-size: 13px; color: var(--orange-accent); margin-bottom: 8px;">[KAYIT BULUNAMADI]</div>
          <div style="font-size: 15px; color: var(--navy-dark); font-weight: 600;">Arama kriterlerine uygun ekip üyesi bulunamadı.</div>
          <p style="font-size: 13px; color: var(--text-muted); margin-top: 6px;">Lütfen farklı bir anahtar kelime deneyin veya filtreyi sıfırlayın.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(m => `
      <div class="team-card">
        <div class="team-card-header">
          <img src="${m.avatar || 'assets/images/logo-navy-on-white.png'}" 
               alt="${m.name}" 
               class="team-avatar"
               onerror="this.onerror=null; this.src='assets/images/logo-navy-on-white.png';">
          <div class="team-info">
            <h4 class="team-name">${m.name}</h4>
            <div class="team-unit">${m.unit}</div>
            <div class="team-title">${m.title}</div>
          </div>
        </div>
        <p class="team-bio">${m.bio || 'Çağdaş Müzik Platformu gönüllüsü ve çalışma grubu üyesi.'}</p>
        <div class="team-footer">
          <span class="team-catalog-badge">GÖNÜLLÜ // ${m.id ? m.id.toUpperCase() : 'CMP'}</span>
          <a href="${m.linkedin || 'https://linkedin.com'}" target="_blank" class="team-linkedin" rel="noopener">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            LinkedIn
          </a>
        </div>
      </div>
    `).join('');
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentUnit = btn.dataset.unit || 'all';
      render();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      render();
    });
  }

  render();
}

/* Etkinlikler Sayfası */
function renderEventsPage() {
  const container = document.getElementById('events-page-container');
  if (!container) return;

  const filterBtns = document.querySelectorAll('.event-filter-btn');
  const statusSelect = document.getElementById('event-status-select');

  let currentType = 'all';
  let currentStatus = 'all';

  function render() {
    const list = Store.getEvents(currentType, currentStatus);
    if (list.length === 0) {
      container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 50px; font-family:var(--font-mono, monospace);">[BU KATEGORİDE ETKİNLİK BULUNAMADI]</div>`;
      return;
    }

    container.innerHTML = list.map((e, idx) => `
      <div class="event-card">
        <div class="event-thumb">
          <img src="${e.poster || 'assets/images/logo-navy-on-white.png'}" alt="${e.title}" onerror="this.src='assets/images/logo-navy-on-white.png'">
          <span class="event-category-badge">${e.type}</span>
          <span class="event-status-badge ${e.isPast ? 'past' : ''}">${e.status || (e.isPast ? 'Tamamlandı' : 'Kayıtlar Açık')}</span>
          <span class="score-measure-tag">OP.${idx + 1}</span>
        </div>
        <div class="event-body">
          <div class="event-meta">
            <span class="event-meta-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              ${e.date}
            </span>
            <span class="event-meta-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              ${e.time || '20:00'}
            </span>
          </div>
          <h3 class="event-title">${e.title}</h3>
          <p class="event-desc">${e.description || ''}</p>
          <div class="event-footer">
            <span class="event-venue">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              ${e.venue}
            </span>
            <a href="${e.ticketUrl || '#'}" class="btn btn-sm btn-primary" ${e.ticketUrl && e.ticketUrl.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>${e.isPast ? 'Arşiv Kaydı' : 'Kayıt & Bilet'}</a>
          </div>
        </div>
      </div>
    `).join('');
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentType = btn.dataset.type || 'all';
      render();
    });
  });

  if (statusSelect) {
    statusSelect.addEventListener('change', (e) => {
      currentStatus = e.target.value;
      render();
    });
  }

  render();
}

/* Dijital Arşiv Sayfası */
function renderArchivePage() {
  const container = document.getElementById('archive-page-container');
  if (!container) return;

  const searchInput = document.getElementById('archive-search');
  const categorySelect = document.getElementById('archive-category');

  let currentCategory = 'all';
  let searchTerm = '';

  function render() {
    const list = Store.getArchive(currentCategory, searchTerm);
    if (list.length === 0) {
      container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 50px; font-family:var(--font-mono, monospace);">[ARŞİVDE EŞLEŞEN KAYIT BULUNAMADI]</div>`;
      return;
    }

    container.innerHTML = list.map(item => `
      <div class="archive-card" onclick="openArchiveModal('${item.id}')">
        <div class="archive-thumb">
          <img src="${item.poster || 'assets/images/logo-navy-on-white.png'}" alt="${item.title}" onerror="this.src='assets/images/logo-navy-on-white.png'">
          <div class="archive-play-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
          <span class="archive-duration">${item.duration || '12:30'}</span>
        </div>
        <div class="archive-body">
          <div class="archive-composer">${item.composer}</div>
          <h4 class="archive-title">${item.title}</h4>
          <div class="archive-performer">${item.performer || 'Topluluk'} ${item.conductor && item.conductor !== '—' ? `· Şef: ${item.conductor}` : ''}</div>
          <div style="font-family: var(--font-mono, monospace); font-size: 11px; color: var(--text-light); margin-top: 6px;">
            ${item.date || '2025'} // ${item.venue || 'İstanbul'}
          </div>
        </div>
      </div>
    `).join('');
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      render();
    });
  }

  if (categorySelect) {
    categorySelect.addEventListener('change', (e) => {
      currentCategory = e.target.value;
      render();
    });
  }

  render();
}

/* Blog Sayfası */
function renderBlogsPage() {
  const container = document.getElementById('blogs-page-container');
  if (!container) return;

  const blogs = Store.getBlogs();
  container.innerHTML = blogs.map(b => `
    <div class="blog-card">
      <div class="blog-thumb">
        <img src="${b.image || 'assets/images/logo-navy-on-white.png'}" alt="${b.title}" onerror="this.src='assets/images/logo-navy-on-white.png'">
      </div>
      <div class="blog-body">
        <div class="blog-meta">
          <span class="blog-category">${b.category}</span>
          <span>${b.readTime || '6 dk'}</span>
          <span>${b.date}</span>
        </div>
        <h3 class="blog-title"><a href="blog-detay.html?slug=${b.slug}">${b.title}</a></h3>
        <p class="blog-excerpt">${b.excerpt}</p>
        <div class="blog-footer">
          <span class="blog-author">${b.author}</span>
          <a href="blog-detay.html?slug=${b.slug}" class="btn btn-sm btn-ghost">Makaleyi Oku &rarr;</a>
        </div>
      </div>
    </div>
  `).join('');
}

/* Arşiv Oynatıcı Modalı (Darkroom Auditorium) */
function openArchiveModal(id) {
  const items = Store.getArchive();
  const item = items.find(a => a.id === id) || items[0];
  if (!item) return;

  let modal = document.getElementById('archive-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'archive-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-box darkroom-modal">
      <div class="modal-header" style="background:#051233; color:#FFFFFF; border-bottom:1px solid rgba(255,255,255,0.1);">
        <div class="modal-title" style="color:#FFFFFF; font-family:var(--font-heading);">
          <span style="color:var(--orange-accent); font-family:var(--font-mono); font-size:11px; display:block;">[DİJİTAL PRÖMİYER BELLEĞİ]</span>
          ${item.title}
        </div>
        <button class="modal-close" onclick="closeArchiveModal()" style="color:#FFFFFF;">&times;</button>
      </div>
      <div class="modal-body" style="background:#071842; color:#E2E8F0;">
        <div style="background:#000000; border:1px solid rgba(255,255,255,0.1); border-radius:2px; overflow:hidden; margin-bottom:16px; position:relative; padding-top:56.25%;">
          <iframe 
            style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" 
            src="${item.embedUrl || 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'}" 
            title="${item.title}" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;gap:16px;">
          <div>
            <h3 style="color:#FFFFFF;font-size:16px;font-family:var(--font-heading);margin-bottom:4px;">${item.title}</h3>
            <div style="color:var(--orange-accent);font-weight:600;font-size:13px;font-family:var(--font-mono);">BESTECİ: ${item.composer}</div>
          </div>
          <span style="background:rgba(221,86,38,0.2);color:#DD5626;border:1px solid rgba(221,86,38,0.4);font-size:11px;font-weight:700;padding:4px 8px;border-radius:2px;font-family:var(--font-mono);">
            ${item.category || 'Dünya Prömiyeri'}
          </span>
        </div>
        <p style="font-size:13px;color:#94A3B8;line-height:1.6;margin-bottom:16px;">
          ${item.notes || 'Çağdaş Müzik Platformu Dijital Arşiv Fonu kapsamında yüksek çözünürlüklü ses ve görüntü teknolojisiyle kaydedilmiştir.'}
        </p>
        <div style="background:#051233;border:1px solid rgba(255,255,255,0.08);padding:14px;font-size:12px;display:grid;grid-template-columns:1fr 1fr;gap:10px;font-family:var(--font-mono);">
          <div><span style="color:#64748B;">İCRACI:</span> ${item.performer || 'Topluluk'}</div>
          <div><span style="color:#64748B;">ŞEF:</span> ${item.conductor || '—'}</div>
          <div><span style="color:#64748B;">TARİH:</span> ${item.date || '2025'}</div>
          <div><span style="color:#64748B;">MEKÂN:</span> ${item.venue || 'İstanbul'}</div>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeArchiveModal();
  });
}
window.openArchiveModal = openArchiveModal;

function closeArchiveModal() {
  const modal = document.getElementById('archive-modal');
  if (modal) modal.classList.remove('active');
}
window.closeArchiveModal = closeArchiveModal;

/* Gönüllü Başvuru Formu Mantığı */
function initVolunteerForm() {
  const form = document.getElementById('volunteer-form');
  const alertBox = document.getElementById('volunteer-alert');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullNameInput = form.querySelector('[name="fullName"]') || document.getElementById('fullName');
    const emailInput = form.querySelector('[name="email"]') || document.getElementById('email');

    const fullName = fullNameInput ? fullNameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';

    if (!fullName || !email) {
      showToast('Lütfen ad soyad ve e-posta alanlarını doldurunuz.', 'error');
      return;
    }

    const formData = new FormData(form);
    const data = {
      fullName,
      email,
      phone: formData.get('phone') || '',
      city: formData.get('city') || '',
      education: formData.get('education') || '',
      unit: formData.get('unit') || '',
      weeklyHours: formData.get('weeklyHours') || '',
      linkedin: formData.get('linkedin') || '',
      experience: formData.get('experience') || '',
      motivation: formData.get('motivation') || ''
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Başvurunuz İşleniyor...';
    }

    const result = await Store.submitApplication(data);

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Başvuruyu Gönder';
    }

    if (result.success) {
      form.reset();
      if (alertBox) {
        alertBox.style.display = 'block';
        alertBox.className = 'alert alert-success';
        alertBox.innerHTML = `<strong>Başvurunuz Başarıyla Kaydedildi.</strong><br>İnsan Kaynakları ve Gönüllü Yönetimi Birimi başvurunuzu inceledikten sonra sizinle iletişime geçecektir.`;
      }
      showToast('Gönüllü başvurunuz başarıyla alındı.');
    }
  });
}

/* İletişim Formu */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.reset();
    showToast('Mesajınız ilgili koordinasyon birimine iletildi.');
  });
}
