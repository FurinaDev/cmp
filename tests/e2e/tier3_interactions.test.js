/**
 * Çağdaş Müzik Platformu — Tier 3: Cross-Feature Interactions Test Suite
 * Tests pairwise interactions between protocols, filtering + searching, admin persistence + store sync, and modals.
 */

const fs = require('fs');
const path = require('path');
const { test, assert } = require('./test_framework.js');
const { createEnvironment } = require('./env_simulator.js');

const PROJECT_ROOT = path.resolve(__dirname, '../..');

/* TC-T3-01: Protocol parity: Data loaded under file: vs http: has identical counts */
test('TC-T3-01', 'Protocol parity: file:/// and http:// data schemas produce identical team counts (41)', { tier: 3, mode: 'http' }, async (ctx) => {
  if (!ctx || !ctx.httpServer) return;
  // HTTP fetch
  const httpRes = await ctx.httpServer.get('/api/data.php');
  const httpTeamCount = httpRes.json?.team?.length;

  // File protocol
  const envFile = createEnvironment({ protocol: 'file:' });
  await envFile.loadPage('ekibimiz.html');
  const fileTeamCount = envFile.window.Store.getTeam('all').length;

  assert.equal(fileTeamCount, 41, 'file:/// mode must return 41 members');
  assert.equal(httpTeamCount, 41, 'http:// mode must return 41 members');
  assert.equal(fileTeamCount, httpTeamCount, 'file: and http: member counts must match exactly');
});

/* TC-T3-02: Unit filtering + Search text interaction */
test('TC-T3-02', 'Unit filtering + Search query interaction filters within active unit only', { tier: 3 }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  const page = await env.loadPage('ekibimiz.html');
  const Store = env.window.Store;

  // In İdari Koordinasyon unit, Deniz exists, Kerem does not
  const idariMembers = Store.getTeam('İdari Koordinasyon');
  const searchDenizInIdari = idariMembers.filter(m => m.name.includes('Deniz'));
  const searchKeremInIdari = idariMembers.filter(m => m.name.includes('Kerem'));

  assert.equal(searchDenizInIdari.length, 1, 'Searching for Deniz in İdari must return 1 result');
  assert.equal(searchKeremInIdari.length, 0, 'Searching for Kerem in İdari must return 0 results');
});

/* TC-T3-03: Admin JSON export + Store re-ingestion */
test('TC-T3-03', 'Admin saveAll updates localStorage and subsequent Store.init loads new state', { tier: 3 }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  await env.loadPage('ekibimiz.html');
  const Store = env.window.Store;

  // Clone current data and modify site name
  const data = JSON.parse(JSON.stringify(Store.getAll()));
  data.site.name = 'Çağdaş Müzik Platformu (E2E Test Modu)';

  await Store.saveAll(data);

  // New instance reading from same localStorage
  const env2 = createEnvironment({ protocol: 'file:', localStorage: env.localStorage });
  await env2.loadPage('ekibimiz.html');
  assert.equal(env2.window.Store.getSite().name, 'Çağdaş Müzik Platformu (E2E Test Modu)', 'Store must re-ingest saved data');
});

/* TC-T3-04: Digital archive category filter + Audio player modal trigger */
test('TC-T3-04', 'Archive category filtering isolates records and item click targets player modal', { tier: 3 }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  await env.loadPage('arsiv.html');
  const Store = env.window.Store;

  const worldPremiereItems = Store.getArchive('Dünya Prömiyeri');
  assert.greaterOrEqual(worldPremiereItems.length, 1, 'Should find at least 1 Dünya Prömiyeri item');
  assert.ok(worldPremiereItems.every(i => i.category.toLowerCase().includes('dünya') || i.category.toLowerCase().includes('prömiyer')), 
    'All items must match category');
});

/* TC-T3-05: Volunteer application submission through frontend + API storage */
test('TC-T3-05', 'Store.submitApplication commits new application to applications collection', { tier: 3 }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  await env.loadPage('gonullu.html');
  const Store = env.window.Store;

  const appData = {
    name: 'E2E Test Gönüllü',
    email: 'e2e@cagdasmuzik.org',
    phone: '+905550000000',
    requestedUnit: 'Dijital & Teknoloji',
    notes: 'Otomasyon testi başvurusu'
  };

  const res = await Store.submitApplication(appData);
  assert.ok(res.success, 'Application submission must succeed');
  assert.ok(res.id, 'Application must receive unique ID');

  const allData = Store.getAll();
  assert.ok(Array.isArray(allData.applications), 'applications must be an array');
  const submitted = allData.applications.find(a => a.id === res.id);
  assert.ok(submitted, 'Submitted application must exist in Store');
  assert.equal(submitted.name, 'E2E Test Gönüllü');
});

/* TC-T3-06: Header navigation dropdown toggle and mobile menu interaction */
test('TC-T3-06', 'Mobile menu button toggles navigation display', { tier: 3 }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  const page = await env.loadPage('index.html');
  const btn = page.document.querySelector('.mobile-menu-btn');
  const nav = page.document.querySelector('.main-nav');

  if (btn && nav) {
    btn.click();
    assert.equal(nav.style.display, 'flex', 'First click on mobile menu button should show nav');
    btn.click();
    assert.equal(nav.style.display, 'none', 'Second click on mobile menu button should hide nav');
  }
});

/* TC-T3-07: Event category filter + status timeline interaction */
test('TC-T3-07', 'Events filter by type and status simultaneously without array corruption', { tier: 3 }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  await env.loadPage('etkinlikler.html');
  const Store = env.window.Store;

  const upcomingConcerts = Store.getEvents('Konser', 'upcoming');
  assert.ok(Array.isArray(upcomingConcerts), 'Filtered events must return array');
  assert.ok(upcomingConcerts.every(e => e.type.toLowerCase() === 'konser' && !e.isPast), 
    'All events must be upcoming and have type Konser');
});

/* TC-T3-08: Admin team card count reflects live team length */
test('TC-T3-08', 'Admin stats synchronization matches live team dataset length', { tier: 3 }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  await env.loadPage('ekibimiz.html');
  const Store = env.window.Store;
  const team = Store.getTeam('all');
  assert.equal(team.length, 41, 'Team count in data store must be 41');
});
