/**
 * Çağdaş Müzik Platformu — Merkezi Veri & Durum Yönetimi (Store)
 * Yerel dosya (file:///) ve sunucu (http://) protokolleriyle tam uyumlu,
 * kendini onaran (self-healing) önbellek ve çift katmanlı kalıcılık mimarisi.
 */

var Store = {
  data: null,
  isLoaded: false,
  STORAGE_KEY: 'cmp_platform_content_v1',

  // Veri bütünlüğü doğrulayıcı (Self-Healing Cache Validator)
  isValidData(data) {
    if (!data || typeof data !== 'object') return false;
    if (!Array.isArray(data.team) || data.team.length < 40) return false;
    return true;
  },

  // Veriyi yükle: file:/// ve http:// protokollerine duyarlı
  async init() {
    if (this.isLoaded && this.data && this.isValidData(this.data)) {
      return this.data;
    }

    const isFileProtocol = typeof window !== 'undefined' && 
      window.location && 
      window.location.protocol === 'file:';

    // 1. LocalStorage kontrolü & Self-healing doğrulama
    let localData = null;
    if (typeof localStorage !== 'undefined') {
      try {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (this.isValidData(parsed)) {
            localData = parsed;
          } else {
            console.warn('[CMP Store] Bozuk veya eksik önbellek tespit edildi, temizleniyor...');
            localStorage.removeItem(this.STORAGE_KEY);
          }
        }
      } catch (err) {
        console.warn('[CMP Store] LocalStorage okuma hatası:', err);
        localStorage.removeItem(this.STORAGE_KEY);
      }
    }

    if (localData) {
      this.data = localData;
      this.isLoaded = true;
      return this.data;
    }

    // 2. file:/// protokolünde veya ağ erişimi yokken doğrudan Bootstrap verisini kullan
    const bootstrap = (typeof window !== 'undefined' && window.CMP_BOOTSTRAP_DATA) || 
      (typeof CMP_BOOTSTRAP_DATA !== 'undefined' ? CMP_BOOTSTRAP_DATA : null);

    if (isFileProtocol && bootstrap && this.isValidData(bootstrap)) {
      this.data = JSON.parse(JSON.stringify(bootstrap));
      this.isLoaded = true;
      if (typeof localStorage !== 'undefined') {
        try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data)); } catch(e){}
      }
      return this.data;
    }

    // 3. http:// protokolünde sunucudan (data/content.json veya /api/data.php) oku
    try {
      const isSubDir = typeof window !== 'undefined' && window.location.pathname.includes('/admin');
      const basePath = isSubDir ? '../data/content.json' : 'data/content.json';
      const res = await fetch(basePath + '?t=' + Date.now());
      if (res.ok) {
        const remoteData = await res.json();
        if (this.isValidData(remoteData)) {
          this.data = remoteData;
          this.isLoaded = true;
          if (typeof localStorage !== 'undefined') {
            try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data)); } catch(e){}
          }
          return this.data;
        }
      }
    } catch (netErr) {
      console.info('[CMP Store] Sunucu fetch başarısız veya engellendi, bootstrap verisine geçiliyor.');
    }

    // 4. Son Güvenlik Ağı (Fallback): Bootstrap Verisi
    if (bootstrap && this.isValidData(bootstrap)) {
      this.data = JSON.parse(JSON.stringify(bootstrap));
    } else {
      this.data = this.getDefaultFallbackData();
    }

    this.isLoaded = true;
    if (typeof localStorage !== 'undefined') {
      try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data)); } catch(e){}
    }

    return this.data;
  },

  getAll() {
    return this.data;
  },

  getSite() {
    return this.data ? this.data.site : {};
  },

  getTexts() {
    return this.data ? this.data.texts : {};
  },

  // Ekip üyeleri (İsteğe bağlı birim filtreli)
  getTeam(unitFilter = 'all') {
    if (!this.data || !Array.isArray(this.data.team)) {
      const bootstrap = (typeof window !== 'undefined' && window.CMP_BOOTSTRAP_DATA) || null;
      if (bootstrap && Array.isArray(bootstrap.team)) return bootstrap.team;
      return [];
    }
    if (!unitFilter || unitFilter === 'all') {
      return this.data.team;
    }

    const q = String(unitFilter).trim().toLowerCase();
    return this.data.team.filter(m => {
      const u = String(m.unit || '').trim().toLowerCase();
      const k = String(m.unitKey || '').trim().toLowerCase();
      const id = String(m.unitId || '').trim().toLowerCase();
      return u === q || k === q || id === q || u.includes(q);
    });
  },

  // Etkinlikler
  getEvents(filter = 'all', status = 'all') {
    if (filter === 'upcoming' || filter === 'past') {
      status = filter;
      filter = 'all';
    }
    if (!this.data || !Array.isArray(this.data.events)) {
      const bootstrap = (typeof window !== 'undefined' && window.CMP_BOOTSTRAP_DATA) || null;
      if (bootstrap && Array.isArray(bootstrap.events)) return bootstrap.events;
      return [];
    }
    let items = [...this.data.events];
    if (filter && filter !== 'all') {
      const f = filter.toLowerCase();
      items = items.filter(e => String(e.type || '').toLowerCase() === f);
    }
    if (status === 'upcoming') {
      items = items.filter(e => !e.isPast);
    } else if (status === 'past') {
      items = items.filter(e => !!e.isPast);
    }
    return items;
  },

  // Dijital Arşiv
  getArchive(category = 'all', search = '') {
    if (!this.data || !Array.isArray(this.data.archive)) {
      const bootstrap = (typeof window !== 'undefined' && window.CMP_BOOTSTRAP_DATA) || null;
      if (bootstrap && Array.isArray(bootstrap.archive)) return bootstrap.archive;
      return [];
    }
    let items = [...this.data.archive];
    if (category && category !== 'all') {
      const c = category.toLowerCase();
      items = items.filter(a => {
        const cat = String(a.category || '').toLowerCase();
        if (c.includes('prömiyer') || c.includes('premier')) {
          return cat.includes('prömiyer') || cat.includes('premier');
        }
        return cat.includes(c);
      });
    }
    if (search && search.trim()) {
      const norm = typeof window !== 'undefined' && window.normalizeTr ? 
        window.normalizeTr(search) : search.toLowerCase();
      items = items.filter(a => {
        const titleNorm = typeof window !== 'undefined' && window.normalizeTr ? 
          window.normalizeTr(a.title || '') : (a.title || '').toLowerCase();
        const compNorm = typeof window !== 'undefined' && window.normalizeTr ? 
          window.normalizeTr(a.composer || '') : (a.composer || '').toLowerCase();
        const perfNorm = typeof window !== 'undefined' && window.normalizeTr ? 
          window.normalizeTr(a.performer || '') : (a.performer || '').toLowerCase();
        return titleNorm.includes(norm) || compNorm.includes(norm) || perfNorm.includes(norm);
      });
    }
    return items;
  },

  // Blog yazıları
  getBlogs(category = 'all') {
    if (!this.data || !Array.isArray(this.data.blogs)) {
      const bootstrap = (typeof window !== 'undefined' && window.CMP_BOOTSTRAP_DATA) || null;
      if (bootstrap && Array.isArray(bootstrap.blogs)) return bootstrap.blogs;
      return [];
    }
    let items = [...this.data.blogs];
    if (category && category !== 'all') {
      const c = category.toLowerCase();
      items = items.filter(b => String(b.category || '').toLowerCase().includes(c));
    }
    return items;
  },

  getBlogBySlug(slug) {
    const blogs = (this.data && Array.isArray(this.data.blogs) && this.data.blogs.length > 0)
      ? this.data.blogs
      : ((typeof window !== 'undefined' && window.CMP_BOOTSTRAP_DATA && window.CMP_BOOTSTRAP_DATA.blogs) || []);
    if (!blogs || blogs.length === 0) return null;
    return blogs.find(b => b.slug === slug || b.id === slug) || blogs[0] || null;
  },

  // Gönüllü Başvuru Gönderimi
  async submitApplication(applicationData) {
    if (!this.data) await this.init();

    const newApp = {
      id: 'app-' + Date.now(),
      submittedAt: new Date().toISOString(),
      status: 'Yeni Başvuru',
      ...applicationData
    };

    if (!Array.isArray(this.data.applications)) {
      this.data.applications = [];
    }
    this.data.applications.unshift(newApp);

    if (typeof localStorage !== 'undefined') {
      try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data)); } catch(e){}
    }

    try {
      const isSubDir = typeof window !== 'undefined' && window.location.pathname.includes('/admin');
      const basePath = isSubDir ? '../api/application.php' : 'api/application.php';
      await fetch(basePath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApp)
      });
    } catch (e) {}

    return { success: true, id: newApp.id };
  },

  // Admin tarafında tüm veriyi kaydet (Dual Persistence)
  async saveAll(newData) {
    if (!this.isValidData(newData)) {
      return { success: false, message: 'Geçersiz veri şeması.' };
    }

    this.data = newData;
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newData));
        localStorage.setItem('cmp_content_data', JSON.stringify(newData));
      } catch(e){}
    }

    let phpSaved = false;
    try {
      const isSubDir = typeof window !== 'undefined' && window.location.pathname.includes('/admin');
      const apiPath = isSubDir ? '../api/save.php' : 'api/save.php';
      const res = await fetch(apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
      if (res.ok) {
        const json = await res.json();
        phpSaved = !!json.success;
      }
    } catch (e) {
      phpSaved = false;
    }

    return { success: true, phpSaved };
  },

  // JSON Dışa Aktar (Hostinger FTP / public_html için)
  exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "content.json");
    dlAnchorElem.click();
  },

  resetToDefaults() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem('cmp_content_data');
    }
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  },

  getDefaultFallbackData() {
    if (typeof window !== 'undefined' && window.CMP_BOOTSTRAP_DATA) {
      return window.CMP_BOOTSTRAP_DATA;
    }
    if (typeof CMP_BOOTSTRAP_DATA !== 'undefined') {
      return CMP_BOOTSTRAP_DATA;
    }
    return {
      site: { name: "Çağdaş Müzik Platformu" },
      team: [],
      events: [],
      archive: [],
      blogs: []
    };
  }
};

if (typeof window !== 'undefined') {
  window.Store = Store;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Store;
}
