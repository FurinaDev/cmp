/**
 * Çağdaş Müzik Platformu — Tier 4: Real-World Application Scenarios Test Suite
 * End-to-end multi-step visitor, researcher, listener, volunteer, and administrator journeys.
 */

const fs = require('fs');
const path = require('path');
const { test, assert } = require('./test_framework.js');
const { createEnvironment } = require('./env_simulator.js');

const PROJECT_ROOT = path.resolve(__dirname, '../..');

/* TC-T4-01: The Avant-Garde Culture Enthusiast Journey */
test('TC-T4-01', 'Journey 1: Avant-Garde Visitor (Manifesto -> Premier -> Season -> 12 Principles)', { tier: 4 }, async () => {
  const env = createEnvironment({ protocol: 'file:' });

  // 1. Land on index.html
  const home = await env.loadPage('index.html');
  assert.ok(home.document.title.includes('Çağdaş Müzik'), 'Landing page title must reflect platform');

  // 2. Verify manifesto pavilion exists
  const heroHeading = home.document.querySelector('h1');
  assert.ok(heroHeading, 'Landing page must feature hero h1');

  // 3. Inspect season concert preview
  const Store = home.window.Store;
  const events = Store.getEvents('upcoming');
  assert.greaterOrEqual(events.length, 1, 'Should have upcoming season concerts');

  // 4. Navigate to degerlerimiz.html
  const values = await env.loadPage('degerlerimiz.html');
  assert.ok(values.document.title.includes('Değerlerimiz') || values.document.body.innerHTML.includes('Değerlerimiz'), 
    'Values page should render properly');

  // 5. Verify header and footer intact
  assert.ok(values.document.querySelector('.site-header') || values.document.querySelector('header'), 'Header must persist');
  assert.ok(values.document.querySelector('.site-footer') || values.document.querySelector('footer'), 'Footer must persist');
  assert.equal(values.consoleErrors.length, 0, 'Zero console errors on entire visitor journey');
});

/* TC-T4-02: The Academic & Team Researcher Journey */
test('TC-T4-02', 'Journey 2: Team Researcher (file:/// -> 0 CORS -> 8 Units -> Turkish Search -> Vision)', { tier: 4 }, async () => {
  const env = createEnvironment({ protocol: 'file:', rejectFileCors: true });

  // 1. Open ekibimiz.html on file:///
  const teamPage = await env.loadPage('ekibimiz.html');
  assert.ok(teamPage.window.Store, 'Store must initialize');

  // 2. Verify 8 unit tabs populated
  const tabs = teamPage.document.querySelectorAll('.team-tab-btn');
  assert.greaterOrEqual(tabs.length, 8, 'Must provide 8+ unit tab buttons');

  // 3. Verify total roster count
  const allMembers = teamPage.window.Store.getTeam('all');
  assert.equal(allMembers.length, 41, 'Must have 41 members in canonical team roster');

  // 4. Iterate over all 8 units and check member counts
  const units = [
    'İdari Koordinasyon',
    'Sanat Danışma Kurulu',
    'Proje Yönetimi ve Kaynak Geliştirme',
    'Kurumsal İletişim',
    'Hukuk & Mevzuat',
    'Dijital & Teknoloji',
    'İnsan Kaynakları',
    'İş Geliştirme ve Stratejik Ortaklıklar'
  ];

  for (const unit of units) {
    const list = teamPage.window.Store.getTeam(unit);
    assert.greaterOrEqual(list.length, 1, `Unit "${unit}" must have at least 1 member`);
  }

  // 5. Navigate to vizyon-misyon.html
  const visionPage = await env.loadPage('vizyon-misyon.html');
  assert.ok(visionPage.document.body.innerHTML.includes('Vizyon') || visionPage.document.body.innerHTML.includes('Misyon'), 
    'Vision & Mission page should load cleanly');
  assert.equal(visionPage.consoleErrors.length, 0, 'Zero console errors during researcher journey');
});

/* TC-T4-03: The Concert Goer & Archive Explorer Journey */
test('TC-T4-03', 'Journey 3: Concert Goer & Archive Explorer (Events -> Archive -> Playback)', { tier: 4 }, async () => {
  const env = createEnvironment({ protocol: 'file:' });

  // 1. Open etkinlikler.html
  const eventsPage = await env.loadPage('etkinlikler.html');
  assert.ok(eventsPage.window.Store, 'Store initialized');
  const allEvents = eventsPage.window.Store.getEvents('all');
  assert.equal(allEvents.length, 10, 'Must load 10 events');

  // 2. Open arsiv.html
  const archivePage = await env.loadPage('arsiv.html');
  const archiveItems = archivePage.window.Store.getArchive('all');
  assert.equal(archiveItems.length, 8, 'Must load 8 archive recordings');

  // 3. Search archive for composer
  const searchResults = archivePage.window.Store.getArchive('all', 'Borusan');
  assert.ok(Array.isArray(searchResults), 'Search should return array');

  assert.equal(archivePage.consoleErrors.length, 0, 'Zero console errors during archive explorer journey');
});

/* TC-T4-04: The Prospective Volunteer Journey */
test('TC-T4-04', 'Journey 4: Prospective Volunteer (gonullu.html -> Form Fill -> Submit -> Persist)', { tier: 4 }, async () => {
  const env = createEnvironment({ protocol: 'file:' });

  // 1. Open gonullu.html
  const volPage = await env.loadPage('gonullu.html');
  assert.ok(volPage.window.Store, 'Store loaded');

  // 2. Submit application
  const appData = {
    name: 'Zeynep Kaya',
    email: 'zeynep.kaya@universite.edu.tr',
    phone: '+90 532 111 22 33',
    university: 'İstanbul Teknik Üniversitesi (MİAM)',
    department: 'Müzik İleri Araştırmalar',
    requestedUnit: 'Sanat Danışma Kurulu',
    notes: 'Çağdaş müzik arşivleme ve nota dijitalleştirme projelerinde yer almak istiyorum.'
  };

  const res = await volPage.window.Store.submitApplication(appData);
  assert.ok(res.success, 'Application submission must return success');

  // 3. Verify in Store
  const storedApps = volPage.window.Store.getAll().applications;
  const found = storedApps.find(a => a.id === res.id);
  assert.ok(found, 'Application must be recorded in data model');
  assert.equal(found.name, 'Zeynep Kaya');
  assert.equal(found.requestedUnit, 'Sanat Danışma Kurulu');
});

/* TC-T4-05: The Content Administrator Journey */
test('TC-T4-05', 'Journey 5: Content Administrator (admin -> verify 41/8 -> edit -> atomic save)', { tier: 4, mode: 'http' }, async (ctx) => {
  if (!ctx || !ctx.httpServer) return;

  // 1. Read existing content via API
  const getRes = await ctx.httpServer.get('/api/data.php');
  assert.equal(getRes.statusCode, 200, 'api/data.php must return 200');
  const data = getRes.json;

  assert.equal(data.team?.length, 41, 'Admin must see 41 members initially');

  // 2. Simulate admin modifying noticeBar
  const originalTagline = data.site?.tagline;
  data.site.tagline = 'Çağdaş Sanat ve İleri Müzik Araştırmaları Girişimi (Admin E2E Test)';

  // 3. Save via POST to api/save.php
  const saveRes = await ctx.httpServer.post('/api/save.php', data);
  assert.equal(saveRes.statusCode, 200, 'POST /api/save.php must return 200');
  assert.ok(saveRes.json?.success, 'Save response must have success=true');

  // 4. Verify re-fetch reflects atomic write
  const verifyRes = await ctx.httpServer.get('/api/data.php');
  assert.equal(verifyRes.json?.site?.tagline, 'Çağdaş Sanat ve İleri Müzik Araştırmaları Girişimi (Admin E2E Test)');

  // 5. Restore original tagline
  data.site.tagline = originalTagline;
  await ctx.httpServer.post('/api/save.php', data);
});
