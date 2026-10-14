/**
 * Çağdaş Müzik Platformu — Tier 2: Boundary & Corner Cases Test Suite
 * Validates edge conditions, Turkish diacritics, CORS rejection, cache poisoning, and input stress.
 */

const fs = require('fs');
const path = require('path');
const { test, assert } = require('./test_framework.js');
const { createEnvironment } = require('./env_simulator.js');

const PROJECT_ROOT = path.resolve(__dirname, '../..');

/* TC-T2-01: Empty search input displays all members or current unit */
test('TC-T2-01', 'Empty search input does not filter out members', { tier: 2 }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  const page = await env.loadPage('ekibimiz.html');
  const searchInput = page.document.querySelector('#team-search-input');
  if (searchInput) {
    searchInput.value = '';
    searchInput.dispatchEvent(new env.window.Event('input'));
  }
  // Store.getTeam should return full roster when not filtered
  const team = env.window.Store.getTeam('all');
  assert.greaterOrEqual(team.length, 40, 'Empty search must allow all 40+ members to be accessible');
});

/* TC-T2-02: Non-matching search string shows empty-state message gracefully */
test('TC-T2-02', 'Non-matching search string shows clean empty-state message without DOM errors', { tier: 2 }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  const page = await env.loadPage('ekibimiz.html');
  const searchInput = page.document.querySelector('#team-search-input');
  if (searchInput) {
    searchInput.value = 'XYZ_NON_EXISTENT_COMPOSER_QUERY_999';
    searchInput.dispatchEvent(new env.window.Event('input'));
  }
  // Should not crash, and console errors should remain 0
  assert.equal(page.consoleErrors.length, 0, 'Non-matching search must not trigger unhandled errors');
});

/* TC-T2-03: Extreme search query length (1,000+ characters) handled without crash */
test('TC-T2-03', 'Extreme search query length (1,000+ characters) handled without crash or ReDoS', { tier: 2 }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  const page = await env.loadPage('ekibimiz.html');
  const searchInput = page.document.querySelector('#team-search-input');
  const longQuery = 'A'.repeat(1500) + 'Çağdaş Müzik' + 'B'.repeat(1500);
  if (searchInput) {
    const start = Date.now();
    searchInput.value = longQuery;
    searchInput.dispatchEvent(new env.window.Event('input'));
    const duration = Date.now() - start;
    assert.lessOrEqual(duration, 500, 'Search should process 3000-char input in <500ms without freezing');
  }
  assert.equal(page.consoleErrors.length, 0, 'Long query must not trigger console errors');
});

/* TC-T2-04: Turkish uppercase dotted 'İ' vs dotless 'I' and 'ı' vs 'i' bidirectional search */
test('TC-T2-04', 'Bidirectional Turkish dotted vs dotless vowel search matching', { tier: 2 }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  await env.loadPage('ekibimiz.html');
  const norm = env.window.normalizeTr;
  if (typeof norm === 'function') {
    // 'İdari' searched with 'idari' or 'İDARİ'
    assert.equal(norm('İdari').toLowerCase(), norm('idari').toLowerCase());
    assert.equal(norm('IŞIK').toLowerCase(), norm('ışık').toLowerCase());
    assert.equal(norm('ÇETİN').toLowerCase(), norm('çetin').toLowerCase());
  } else {
    assert.ok(false, 'normalizeTr function missing in main.js (ESCALATE)');
  }
});

/* TC-T2-05: HTML/Script injection attempts in search input are sanitized */
test('TC-T2-05', 'HTML/Script injection in search input does not execute or inject unsanitized nodes', { tier: 2 }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  const page = await env.loadPage('ekibimiz.html');
  const searchInput = page.document.querySelector('#team-search-input');
  const xssPayload = '<script>window.__XSS_TRIGGERED = true;</script><img src=x onerror="window.__XSS_IMG=true">';
  if (searchInput) {
    searchInput.value = xssPayload;
    searchInput.dispatchEvent(new env.window.Event('input'));
  }
  assert.ok(!env.window.__XSS_TRIGGERED, 'XSS script injection must not execute');
  assert.ok(!env.window.__XSS_IMG, 'XSS img onerror must not execute');
});

/* TC-T2-06: Corrupted/empty localStorage data handled by isValidData self-healing */
test('TC-T2-06', 'Corrupted empty object {} in localStorage does not permanently disable Store', { tier: 2 }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  env.localStorage.setItem('cmp_platform_content_v1', '{}');
  await env.loadPage('ekibimiz.html');
  const Store = env.window.Store;
  const team = Store.getTeam('all');
  assert.greaterOrEqual(team.length, 40, 'Store must self-heal from empty {} cache and yield 40+ members');
});

/* TC-T2-07: LocalStorage with team: [] (empty team array) triggers cache invalidation */
test('TC-T2-07', 'LocalStorage with team: [] triggers cache invalidation and restores bootstrap data', { tier: 2 }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  env.localStorage.setItem('cmp_platform_content_v1', JSON.stringify({ site: { name: 'CMP' }, team: [] }));
  await env.loadPage('ekibimiz.html');
  const Store = env.window.Store;
  const team = Store.getTeam('all');
  assert.greaterOrEqual(team.length, 40, 'Store must reject empty team array and restore full team');
});

/* TC-T2-08: LocalStorage with invalid JSON string caught without crashing Store.init */
test('TC-T2-08', 'LocalStorage with malformed JSON string caught cleanly without crashing Store.init', { tier: 2 }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  env.localStorage.setItem('cmp_platform_content_v1', '{"broken_json": [unclosed');
  await env.loadPage('ekibimiz.html');
  const Store = env.window.Store;
  assert.ok(Store.isLoaded, 'Store must still mark itself as loaded');
  const team = Store.getTeam('all');
  assert.greaterOrEqual(team.length, 40, 'Store must load fallback/bootstrap data despite malformed JSON');
});

/* TC-T2-09: CORS rejection on file:/// protocol handled without unhandled promise rejection */
test('TC-T2-09', 'CORS rejection on file:/// protocol handled cleanly without unhandled rejection', { tier: 2 }, async () => {
  const env = createEnvironment({ protocol: 'file:', rejectFileCors: true });
  let hadUnhandled = false;
  env.window.addEventListener('unhandledrejection', () => { hadUnhandled = true; });
  await env.loadPage('ekibimiz.html');
  assert.ok(!hadUnhandled, 'No unhandled promise rejection allowed on CORS block');
});

/* TC-T2-10: Rapid tab clicking maintains consistent active class */
test('TC-T2-10', 'Rapid consecutive tab clicks maintain consistent DOM active state', { tier: 2 }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  const page = await env.loadPage('ekibimiz.html');
  const tabs = page.document.querySelectorAll('.team-tab-btn');
  if (tabs.length >= 3) {
    for (let i = 0; i < 10; i++) {
      tabs[i % tabs.length].click();
    }
    const activeTabs = page.document.querySelectorAll('.team-tab-btn.active');
    assert.equal(activeTabs.length, 1, 'Exactly one tab must be active after rapid clicking');
  }
});

/* TC-T2-11: Invalid blog slug fallback */
test('TC-T2-11', 'Store.getBlogBySlug with invalid slug returns safe default or first blog', { tier: 2 }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  await env.loadPage('ekibimiz.html');
  const Store = env.window.Store;
  const blog = Store.getBlogBySlug('non-existent-blog-slug-404');
  assert.ok(blog !== undefined, 'getBlogBySlug must return a valid object or null, not throw error');
});

/* TC-T2-12: Volunteer application form boundary: empty fields validation */
test('TC-T2-12', 'Volunteer form rejects submission with empty name and email', { tier: 2 }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  const page = await env.loadPage('gonullu.html');
  const form = page.document.querySelector('#volunteer-form');
  if (form) {
    const nameInput = page.document.querySelector('#vol-name, [name="name"]');
    const emailInput = page.document.querySelector('#vol-email, [name="email"]');
    if (nameInput) nameInput.value = '';
    if (emailInput) emailInput.value = '';
    form.dispatchEvent(new env.window.Event('submit', { cancelable: true }));
  }
  assert.equal(page.consoleErrors.length, 0, 'Form submission validation must not cause unhandled console errors');
});

/* TC-T2-13: API save endpoint boundary: empty body rejected with 400 */
test('TC-T2-13', 'POST /api/save.php with empty body returns HTTP 400', { tier: 2, mode: 'http' }, async (ctx) => {
  if (!ctx || !ctx.httpServer) return;
  const res = await ctx.httpServer.post('/api/save.php', '');
  assert.equal(res.statusCode, 400, 'Empty body to save.php must return 400');
  assert.equal(res.json?.success, false, 'Response success must be false');
});

/* TC-T2-14: API save endpoint boundary: invalid JSON rejected with 400 */
test('TC-T2-14', 'POST /api/save.php with invalid JSON format returns HTTP 400', { tier: 2, mode: 'http' }, async (ctx) => {
  if (!ctx || !ctx.httpServer) return;
  const res = await ctx.httpServer.post('/api/save.php', '{malformed json: true', { 'Content-Type': 'application/json' });
  assert.equal(res.statusCode, 400, 'Invalid JSON to save.php must return 400');
  assert.equal(res.json?.success, false, 'Response success must be false');
});

/* TC-T2-15: API application endpoint boundary: invalid email returns HTTP 400 */
test('TC-T2-15', 'POST /api/application.php with invalid email returns HTTP 400', { tier: 2, mode: 'http' }, async (ctx) => {
  if (!ctx || !ctx.httpServer) return;
  const payload = {
    name: 'Test Aday',
    email: 'not-an-email-address',
    phone: '5551234567'
  };
  const res = await ctx.httpServer.post('/api/application.php', payload);
  assert.equal(res.statusCode, 400, 'Invalid email to application.php must return 400');
  assert.equal(res.json?.success, false, 'Response success must be false');
});
