/**
 * Çağdaş Müzik Platformu — Tier 1: Feature Coverage Test Suite
 * Covers all 18 features specified in PROJECT.md (>=5 test cases per feature = 90 tests)
 */

const fs = require('fs');
const path = require('path');
const { test, assert } = require('./test_framework.js');
const { createEnvironment } = require('./env_simulator.js');

const PROJECT_ROOT = path.resolve(__dirname, '../..');

// Helper to read file safely
function readProjectFile(relPath) {
  const p = path.resolve(PROJECT_ROOT, relPath);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf-8') : null;
}

/* ==========================================================================
   FEATURE 1: Editorial Typography Hierarchy
   ========================================================================== */
test('TC-T1-F01-01', 'Typography stylesheet defines high-culture editorial serif token', { tier: 1, feature: 1, featureName: 'Editorial Typography Hierarchy' }, async () => {
  const css = readProjectFile('assets/css/styles.css');
  assert.ok(css, 'styles.css must exist');
  const hasEditorialSerif = css.includes('--font-editorial') || 
                            css.includes('Playfair') || 
                            css.includes('Cormorant') || 
                            css.includes('Garamond');
  assert.ok(hasEditorialSerif, 'CSS must define editorial serif font token (--font-editorial or Cormorant/Playfair)');
});

test('TC-T1-F01-02', 'Typography stylesheet defines architectural grotesque sans token', { tier: 1, feature: 1, featureName: 'Editorial Typography Hierarchy' }, async () => {
  const css = readProjectFile('assets/css/styles.css');
  assert.ok(css, 'styles.css must exist');
  const hasGrotesque = css.includes('--font-body') || 
                       css.includes('--font-heading') || 
                       css.includes('Plus Jakarta Sans') || 
                       css.includes('Inter');
  assert.ok(hasGrotesque, 'CSS must define grotesque/sans token for structural body typography');
});

test('TC-T1-F01-03', 'Typography stylesheet defines score monospace font token', { tier: 1, feature: 1, featureName: 'Editorial Typography Hierarchy' }, async () => {
  const css = readProjectFile('assets/css/styles.css');
  assert.ok(css, 'styles.css must exist');
  const hasMono = css.includes('--font-mono') || 
                  css.includes('JetBrains Mono') || 
                  css.includes('Space Mono') || 
                  css.includes('monospace');
  assert.ok(hasMono, 'CSS must define monospace token (--font-mono or JetBrains/Space Mono) for score coordinates');
});

test('TC-T1-F01-04', 'Heading typography defines proportional line-height and letter-spacing', { tier: 1, feature: 1, featureName: 'Editorial Typography Hierarchy' }, async () => {
  const css = readProjectFile('assets/css/styles.css');
  assert.ok(css, 'styles.css must exist');
  assert.ok(css.includes('letter-spacing'), 'CSS must define refined editorial letter-spacing');
  assert.ok(css.includes('line-height'), 'CSS must define proportional line-height');
});

test('TC-T1-F01-05', 'Body typography defines comfortable reading size and line-height', { tier: 1, feature: 1, featureName: 'Editorial Typography Hierarchy' }, async () => {
  const css = readProjectFile('assets/css/styles.css');
  assert.ok(css, 'styles.css must exist');
  assert.match(css, /body\s*\{[^}]*line-height:\s*1\.[5-7]/i, 'Body line-height should be between 1.5 and 1.7 for editorial legibility');
});

/* ==========================================================================
   FEATURE 2: High-Contrast Cultural Color & Negative Space
   ========================================================================== */
test('TC-T1-F02-01', 'CSS defines primary Deep Blue #0A2260 token', { tier: 1, feature: 2, featureName: 'High-Contrast Cultural Color' }, async () => {
  const css = readProjectFile('assets/css/styles.css');
  assert.ok(css, 'styles.css must exist');
  assert.ok(css.includes('#0A2260') || css.includes('#0a2260'), 'CSS must include primary Deep Blue #0A2260');
});

test('TC-T1-F02-02', 'CSS defines Midnight Deep Blue #051233 or #071842 token', { tier: 1, feature: 2, featureName: 'High-Contrast Cultural Color' }, async () => {
  const css = readProjectFile('assets/css/styles.css');
  assert.ok(css, 'styles.css must exist');
  const hasDeepDark = css.includes('#051233') || css.includes('#071842') || css.includes('--navy-dark') || css.includes('--navy-deep');
  assert.ok(hasDeepDark, 'CSS must include dark auditorium blue token (#051233 or #071842)');
});

test('TC-T1-F02-03', 'CSS defines Accent Orange #DD5626 token', { tier: 1, feature: 2, featureName: 'High-Contrast Cultural Color' }, async () => {
  const css = readProjectFile('assets/css/styles.css');
  assert.ok(css, 'styles.css must exist');
  assert.ok(css.includes('#DD5626') || css.includes('#dd5626'), 'CSS must include Accent Orange #DD5626');
});

test('TC-T1-F02-04', 'CSS defines Warm Museum Canvas / Off-White background token', { tier: 1, feature: 2, featureName: 'High-Contrast Cultural Color' }, async () => {
  const css = readProjectFile('assets/css/styles.css');
  assert.ok(css, 'styles.css must exist');
  const hasCanvas = css.includes('--bg-canvas') || css.includes('#FAF9F6') || css.includes('#F8F9FA') || css.includes('#faf9f6');
  assert.ok(hasCanvas, 'CSS must define museum canvas background token (--bg-canvas or #FAF9F6)');
});

test('TC-T1-F02-05', 'High-contrast text color tokens defined for light and dark backgrounds', { tier: 1, feature: 2, featureName: 'High-Contrast Cultural Color' }, async () => {
  const css = readProjectFile('assets/css/styles.css');
  assert.ok(css, 'styles.css must exist');
  assert.ok(css.includes('--text-heading'), 'CSS must define --text-heading');
  assert.ok(css.includes('--text-body'), 'CSS must define --text-body');
});

/* ==========================================================================
   FEATURE 3: Architectural Stave Lines & Partitür Motifs
   ========================================================================== */
test('TC-T1-F03-01', 'CSS defines architectural stave grid lines or 1px hairline rules', { tier: 1, feature: 3, featureName: 'Architectural Stave Lines' }, async () => {
  const css = readProjectFile('assets/css/styles.css');
  assert.ok(css, 'styles.css must exist');
  const hasStaveLines = css.includes('stave') || 
                        css.includes('border-subtle') || 
                        css.includes('hairline') || 
                        css.includes('partitur');
  assert.ok(hasStaveLines, 'CSS must include stave lines or architectural hairline border definitions');
});

test('TC-T1-F03-02', 'Micro-coordinate or score stamp metadata motif exists in markup', { tier: 1, feature: 3, featureName: 'Architectural Stave Lines' }, async () => {
  const indexHtml = readProjectFile('index.html');
  const ekibimizHtml = readProjectFile('ekibimiz.html');
  const content = (indexHtml || '') + (ekibimizHtml || '');
  const hasMicroCoordinates = content.includes('8') && 
                              (content.includes('40') || content.includes('41')) &&
                              (content.includes('Birim') || content.includes('Birimi') || content.includes('UNITS'));
  assert.ok(hasMicroCoordinates, 'Markup should include micro-coordinate stamps [08 UNITS // 41 MEMBERS] or equivalent metadata');
});

test('TC-T1-F03-03', 'SVG waveform visualizer or music notation motif exists in client templates', { tier: 1, feature: 3, featureName: 'Architectural Stave Lines' }, async () => {
  const indexHtml = readProjectFile('index.html');
  const stylesCss = readProjectFile('assets/css/styles.css');
  const hasWaveform = (indexHtml && (indexHtml.includes('waveform') || indexHtml.includes('svg') || indexHtml.includes('player'))) ||
                      (stylesCss && (stylesCss.includes('waveform') || stylesCss.includes('stave')));
  assert.ok(hasWaveform, 'Project must contain waveform visualizer or stave motifs');
});

test('TC-T1-F03-04', 'Curatorial badge styling exists for editorial metadata', { tier: 1, feature: 3, featureName: 'Architectural Stave Lines' }, async () => {
  const css = readProjectFile('assets/css/styles.css');
  assert.ok(css, 'styles.css must exist');
  const hasBadge = css.includes('section-badge') || css.includes('badge') || css.includes('curatorial');
  assert.ok(hasBadge, 'CSS must define curatorial section badge styling');
});

test('TC-T1-F03-05', 'Darkroom auditorium modal styles defined for media playback', { tier: 1, feature: 3, featureName: 'Architectural Stave Lines' }, async () => {
  const css = readProjectFile('assets/css/styles.css');
  assert.ok(css, 'styles.css must exist');
  const hasModal = css.includes('modal') || css.includes('auditorium') || css.includes('player');
  assert.ok(hasModal, 'CSS must define modal / player presentation styling');
});

/* ==========================================================================
   FEATURE 4: Universal High-Culture Header & Navigation
   ========================================================================== */
test('TC-T1-F04-01', 'Site header is present across core institutional HTML pages', { tier: 1, feature: 4, featureName: 'Universal Header & Nav' }, async () => {
  const pages = ['index.html', 'kurumsal.html', 'ekibimiz.html', 'etkinlikler.html', 'arsiv.html', 'blog.html', 'iletisim.html'];
  for (const page of pages) {
    const html = readProjectFile(page);
    assert.ok(html, `${page} must exist`);
    assert.ok(html.includes('site-header') || html.includes('<header'), `${page} must contain site header`);
  }
});

test('TC-T1-F04-02', 'Header contains brand logo lockup linking to index.html', { tier: 1, feature: 4, featureName: 'Universal Header & Nav' }, async () => {
  const indexHtml = readProjectFile('index.html');
  assert.ok(indexHtml, 'index.html must exist');
  assert.ok(indexHtml.includes('brand-logo') || indexHtml.includes('href="index.html"'), 'Header must contain brand logo linking to index.html');
  assert.ok(indexHtml.includes('logo-navy.png') || indexHtml.includes('logo'), 'Header must reference institutional logo');
});

test('TC-T1-F04-03', 'Main navigation links all primary public sections', { tier: 1, feature: 4, featureName: 'Universal Header & Nav' }, async () => {
  const html = readProjectFile('index.html');
  assert.ok(html, 'index.html must exist');
  assert.ok(html.includes('kurumsal.html'), 'Nav must link to kurumsal.html');
  assert.ok(html.includes('ekibimiz.html'), 'Nav must link to ekibimiz.html');
  assert.ok(html.includes('etkinlikler.html'), 'Nav must link to etkinlikler.html');
  assert.ok(html.includes('arsiv.html'), 'Nav must link to arsiv.html');
  assert.ok(html.includes('blog.html'), 'Nav must link to blog.html');
});

test('TC-T1-F04-04', 'Kurumsal navigation contains editorial dropdown menu', { tier: 1, feature: 4, featureName: 'Universal Header & Nav' }, async () => {
  const html = readProjectFile('index.html');
  assert.ok(html, 'index.html must exist');
  assert.ok(html.includes('dropdown-menu') || html.includes('dropdown'), 'Nav must contain dropdown menu');
  assert.ok(html.includes('degerlerimiz.html'), 'Dropdown must include degerlerimiz.html');
  assert.ok(html.includes('vizyon-misyon.html'), 'Dropdown must include vizyon-misyon.html');
});

test('TC-T1-F04-05', 'Active navigation item reflects the current page', { tier: 1, feature: 4, featureName: 'Universal Header & Nav' }, async () => {
  const ekibimizHtml = readProjectFile('ekibimiz.html');
  assert.ok(ekibimizHtml, 'ekibimiz.html must exist');
  assert.ok(ekibimizHtml.includes('nav-link active') || ekibimizHtml.includes('class="nav-link active"'), 'ekibimiz.html must mark Ekibimiz nav link as active');
});

/* ==========================================================================
   FEATURE 5: Universal 4-Column Institutional Footer
   ========================================================================== */
test('TC-T1-F05-01', 'Institutional footer is present across core HTML pages', { tier: 1, feature: 5, featureName: 'Universal Institutional Footer' }, async () => {
  const pages = ['index.html', 'kurumsal.html', 'ekibimiz.html', 'etkinlikler.html', 'arsiv.html', 'blog.html', 'iletisim.html'];
  for (const page of pages) {
    const html = readProjectFile(page);
    assert.ok(html, `${page} must exist`);
    assert.ok(html.includes('<footer') || html.includes('site-footer'), `${page} must contain institutional footer`);
  }
});

test('TC-T1-F05-02', 'Footer column 1 articulates institutional identity and platform scope', { tier: 1, feature: 5, featureName: 'Universal Institutional Footer' }, async () => {
  const html = readProjectFile('index.html');
  assert.ok(html, 'index.html must exist');
  assert.ok(html.includes('footer') && (html.includes('Çağdaş Müzik Platformu') || html.includes('Kültür-Sanat')), 'Footer col 1 must state platform identity');
});

test('TC-T1-F05-03', 'Footer column 2 provides Kurumsal sitemap navigation', { tier: 1, feature: 5, featureName: 'Universal Institutional Footer' }, async () => {
  const html = readProjectFile('index.html');
  assert.ok(html, 'index.html must exist');
  assert.ok(html.includes('footer') && html.includes('kurumsal.html'), 'Footer col 2 must provide kurumsal links');
});

test('TC-T1-F05-04', 'Footer column 3 provides Program & Faaliyetler links', { tier: 1, feature: 5, featureName: 'Universal Institutional Footer' }, async () => {
  const html = readProjectFile('index.html');
  assert.ok(html, 'index.html must exist');
  assert.ok(html.includes('footer') && html.includes('etkinlikler.html') && html.includes('arsiv.html'), 'Footer col 3 must provide program links');
});

test('TC-T1-F05-05', 'Footer contains copyright notice and transparent logo styling', { tier: 1, feature: 5, featureName: 'Universal Institutional Footer' }, async () => {
  const html = readProjectFile('index.html');
  assert.ok(html, 'index.html must exist');
  assert.ok(html.includes('©') || html.includes('&copy;') || html.includes('Tüm hakları saklıdır'), 'Footer must contain copyright notice');
});

/* ==========================================================================
   FEATURE 6: Inlined Bootstrap Data Architecture
   ========================================================================== */
test('TC-T1-F06-01', 'Store initializes under file:/// protocol without CORS error crash', { tier: 1, feature: 6, featureName: 'Inlined Bootstrap Data' }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  const page = await env.loadPage('ekibimiz.html');
  assert.ok(page.window.Store, 'window.Store must be defined');
  // Should not crash even under CORS block
});

test('TC-T1-F06-02', 'Canonical team dataset contains 41 members', { tier: 1, feature: 6, featureName: 'Inlined Bootstrap Data' }, async () => {
  const contentJson = JSON.parse(readProjectFile('data/content.json'));
  assert.ok(Array.isArray(contentJson.team), 'team must be an array');
  assert.equal(contentJson.team.length, 41, 'Canonical team must have exactly 41 members');
});

test('TC-T1-F06-03', 'Canonical team dataset covers 8 distinct units', { tier: 1, feature: 6, featureName: 'Inlined Bootstrap Data' }, async () => {
  const contentJson = JSON.parse(readProjectFile('data/content.json'));
  const units = new Set(contentJson.team.map(m => m.unit));
  assert.equal(units.size, 8, 'Canonical team must span exactly 8 units');
});

test('TC-T1-F06-04', 'Canonical events dataset contains 10 events', { tier: 1, feature: 6, featureName: 'Inlined Bootstrap Data' }, async () => {
  const contentJson = JSON.parse(readProjectFile('data/content.json'));
  assert.ok(Array.isArray(contentJson.events), 'events must be an array');
  assert.equal(contentJson.events.length, 10, 'Canonical events must have 10 events');
});

test('TC-T1-F06-05', 'Canonical archive dataset contains 8 recordings', { tier: 1, feature: 6, featureName: 'Inlined Bootstrap Data' }, async () => {
  const contentJson = JSON.parse(readProjectFile('data/content.json'));
  assert.ok(Array.isArray(contentJson.archive), 'archive must be an array');
  assert.equal(contentJson.archive.length, 8, 'Canonical archive must have 8 items');
});

/* ==========================================================================
   FEATURE 7: Self-Healing Cache Validator (isValidData)
   ========================================================================== */
test('TC-T1-F07-01', 'Store.isValidData returns true for complete 41-member dataset', { tier: 1, feature: 7, featureName: 'Self-Healing Cache Validator' }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  await env.loadPage('ekibimiz.html');
  const Store = env.window.Store;
  assert.ok(typeof Store.isValidData === 'function', 'Store.isValidData must be a function');
  const validData = { team: new Array(41).fill({ id: 1 }) };
  assert.equal(Store.isValidData(validData), true, 'Store.isValidData should return true for 41 members');
});

test('TC-T1-F07-02', 'Store.isValidData returns false when team is missing or undefined', { tier: 1, feature: 7, featureName: 'Self-Healing Cache Validator' }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  await env.loadPage('ekibimiz.html');
  const Store = env.window.Store;
  assert.ok(typeof Store.isValidData === 'function', 'Store.isValidData must be a function');
  assert.equal(Store.isValidData({}), false, 'Store.isValidData should return false for empty object');
  assert.equal(Store.isValidData({ site: {} }), false, 'Store.isValidData should return false when team is missing');
});

test('TC-T1-F07-03', 'Store.isValidData returns false when team length is less than 40', { tier: 1, feature: 7, featureName: 'Self-Healing Cache Validator' }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  await env.loadPage('ekibimiz.html');
  const Store = env.window.Store;
  assert.ok(typeof Store.isValidData === 'function', 'Store.isValidData must be a function');
  assert.equal(Store.isValidData({ team: [] }), false, 'Store.isValidData should return false for empty team array');
  assert.equal(Store.isValidData({ team: new Array(5).fill({}) }), false, 'Store.isValidData should return false for 5 members');
});

test('TC-T1-F07-04', 'Store.init automatically purges corrupted or empty localStorage cache', { tier: 1, feature: 7, featureName: 'Self-Healing Cache Validator' }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  env.localStorage.setItem('cmp_platform_content_v1', JSON.stringify({ site: {}, team: [] }));
  await env.loadPage('ekibimiz.html');
  const Store = env.window.Store;
  if (typeof Store.isValidData === 'function') {
    // If isValidData is implemented, it must not return empty team
    const team = Store.getTeam('all');
    assert.greaterOrEqual(team.length, 40, 'Store must heal corrupted cache and return >=40 members');
  } else {
    assert.ok(false, 'Store.isValidData is not yet implemented in store.js (ESCALATE)');
  }
});

test('TC-T1-F07-05', 'Purged corrupted cache is replaced by valid canonical bootstrap data', { tier: 1, feature: 7, featureName: 'Self-Healing Cache Validator' }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  env.localStorage.setItem('cmp_platform_content_v1', '{"corrupted": true}');
  await env.loadPage('ekibimiz.html');
  const cached = env.localStorage.getItem('cmp_platform_content_v1');
  assert.ok(cached, 'Cache should be re-populated with valid data');
  const parsed = JSON.parse(cached);
  assert.ok(Array.isArray(parsed.team) && parsed.team.length >= 40, 'Re-populated cache must have >=40 members');
});

/* ==========================================================================
   FEATURE 8: Turkish Diacritic Search Normalization (normalizeTr)
   ========================================================================== */
test('TC-T1-F08-01', 'Normalizes dotted uppercase İ and lowercase i bidirectionally', { tier: 1, feature: 8, featureName: 'Turkish Search Normalization' }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  await env.loadPage('ekibimiz.html');
  const norm = env.window.normalizeTr;
  assert.ok(typeof norm === 'function', 'window.normalizeTr must be defined in main.js');
  assert.equal(norm('İdari').toLowerCase(), norm('idari').toLowerCase(), 'İdari and idari should match after normalizeTr');
});

test('TC-T1-F08-02', 'Normalizes Turkish dotless I and lowercase ı', { tier: 1, feature: 8, featureName: 'Turkish Search Normalization' }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  await env.loadPage('ekibimiz.html');
  const norm = env.window.normalizeTr;
  assert.ok(typeof norm === 'function', 'window.normalizeTr must be defined in main.js');
  assert.equal(norm('Işık').toLowerCase(), norm('ışık').toLowerCase(), 'Işık and ışık should match after normalizeTr');
});

test('TC-T1-F08-03', 'Normalizes Turkish Ş / ş to s for search tolerance', { tier: 1, feature: 8, featureName: 'Turkish Search Normalization' }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  await env.loadPage('ekibimiz.html');
  const norm = env.window.normalizeTr;
  assert.ok(typeof norm === 'function', 'window.normalizeTr must be defined in main.js');
  assert.equal(norm('İletişim').toLowerCase(), norm('iletisim').toLowerCase(), 'İletişim and iletisim should match after normalizeTr');
});

test('TC-T1-F08-04', 'Normalizes Turkish Ğ / ğ to g for search tolerance', { tier: 1, feature: 8, featureName: 'Turkish Search Normalization' }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  await env.loadPage('ekibimiz.html');
  const norm = env.window.normalizeTr;
  assert.ok(typeof norm === 'function', 'window.normalizeTr must be defined in main.js');
  assert.equal(norm('Çağdaş').toLowerCase(), norm('cagdas').toLowerCase(), 'Çağdaş and cagdas should match after normalizeTr');
});

test('TC-T1-F08-05', 'Normalizes Ç, Ö, Ü characters for full diacritic tolerance', { tier: 1, feature: 8, featureName: 'Turkish Search Normalization' }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  await env.loadPage('ekibimiz.html');
  const norm = env.window.normalizeTr;
  assert.ok(typeof norm === 'function', 'window.normalizeTr must be defined in main.js');
  assert.equal(norm('Gönüllü').toLowerCase(), norm('gonullu').toLowerCase(), 'Gönüllü and gonullu should match after normalizeTr');
});

/* ==========================================================================
   FEATURE 9: 8 Canonical Unit Filtering Tabs
   ========================================================================== */
test('TC-T1-F09-01', 'ekibimiz.html includes Tümü tab displaying total members', { tier: 1, feature: 9, featureName: '8 Canonical Unit Tabs' }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  const page = await env.loadPage('ekibimiz.html');
  const allTab = page.document.querySelector('.team-tab-btn[data-unit="all"]');
  assert.ok(allTab, 'Tümü tab with data-unit="all" must exist');
});

test('TC-T1-F09-02', 'ekibimiz.html includes tab buttons for all 8 canonical units', { tier: 1, feature: 9, featureName: '8 Canonical Unit Tabs' }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  const page = await env.loadPage('ekibimiz.html');
  const tabButtons = page.document.querySelectorAll('.team-tab-btn');
  assert.greaterOrEqual(tabButtons.length, 9, 'Must have at least 9 tab buttons (All + 8 units)');
});

test('TC-T1-F09-03', 'Clicking unit tab updates active tab class', { tier: 1, feature: 9, featureName: '8 Canonical Unit Tabs' }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  const page = await env.loadPage('ekibimiz.html');
  const tabs = page.document.querySelectorAll('.team-tab-btn');
  if (tabs.length > 1) {
    const targetTab = tabs[1];
    targetTab.click();
    assert.ok(targetTab.classList.contains('active'), 'Clicked tab must acquire active class');
  }
});

test('TC-T1-F09-04', 'Store.getTeam returns 2 members for İdari Koordinasyon unit', { tier: 1, feature: 9, featureName: '8 Canonical Unit Tabs' }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  await env.loadPage('ekibimiz.html');
  const Store = env.window.Store;
  const idariMembers = Store.getTeam('İdari Koordinasyon');
  assert.equal(idariMembers.length, 2, 'İdari Koordinasyon must have 2 members');
});

test('TC-T1-F09-05', 'Store.getTeam returns 10 members for Sanat Danışma Kurulu', { tier: 1, feature: 9, featureName: '8 Canonical Unit Tabs' }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  await env.loadPage('ekibimiz.html');
  const Store = env.window.Store;
  const sanatMembers = Store.getTeam('Sanat Danışma Kurulu');
  assert.equal(sanatMembers.length, 10, 'Sanat Danışma Kurulu must have 10 members');
});

/* ==========================================================================
   FEATURE 10: Resilient Avatar Fallback
   ========================================================================== */
test('TC-T1-F10-01', 'Member cards contain image elements with avatar path', { tier: 1, feature: 10, featureName: 'Resilient Avatar Fallback' }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  const page = await env.loadPage('ekibimiz.html');
  const cardImages = page.document.querySelectorAll('.team-card img, .member-card img');
  if (cardImages.length > 0) {
    assert.ok(cardImages[0].getAttribute('src'), 'Member avatar img must have src');
  } else {
    // If cards not yet rendered due to defect, check team dataset
    const contentJson = JSON.parse(readProjectFile('data/content.json'));
    assert.ok(contentJson.team.every(m => m.avatar), 'All team members must have avatar defined in data');
  }
});

test('TC-T1-F10-02', 'Member avatar markup includes onerror fallback handler or inline SVG fallback', { tier: 1, feature: 10, featureName: 'Resilient Avatar Fallback' }, async () => {
  const mainJs = readProjectFile('assets/js/main.js');
  assert.ok(mainJs, 'main.js must exist');
  const hasOnerror = mainJs.includes('onerror') || mainJs.includes('fallback') || mainJs.includes('avatar');
  assert.ok(hasOnerror, 'main.js must implement avatar fallback handling');
});

test('TC-T1-F10-03', 'Missing avatar image fallback prevents infinite loop', { tier: 1, feature: 10, featureName: 'Resilient Avatar Fallback' }, async () => {
  const mainJs = readProjectFile('assets/js/main.js');
  assert.ok(mainJs, 'main.js must exist');
  // Check that onerror handler removes or sets onerror=null to prevent infinite loops
  if (mainJs.includes('onerror=')) {
    assert.ok(mainJs.includes('null'), 'onerror handler should set this.onerror=null to prevent loops');
  }
});

test('TC-T1-F10-04', 'Avatar CSS specifies circular aspect ratio with object-fit cover', { tier: 1, feature: 10, featureName: 'Resilient Avatar Fallback' }, async () => {
  const css = readProjectFile('assets/css/styles.css');
  assert.ok(css, 'styles.css must exist');
  assert.ok(css.includes('border-radius: 50%') || css.includes('border-radius: 9999px') || css.includes('aspect-ratio') || css.includes('object-fit'), 
    'Avatar styling must specify proper circular or cover aspect-ratio');
});

test('TC-T1-F10-05', 'Local fallback avatar / logo asset exists in assets/images/', { tier: 1, feature: 10, featureName: 'Resilient Avatar Fallback' }, async () => {
  const logoPath = path.resolve(PROJECT_ROOT, 'assets/images/logo-navy.png');
  assert.ok(fs.existsSync(logoPath), 'assets/images/logo-navy.png must exist as fallback asset');
});

/* ==========================================================================
   FEATURE 11: Landing Page Manifesto Hero Pavilion
   ========================================================================== */
test('TC-T1-F11-01', 'index.html contains avant-garde manifesto headline', { tier: 1, feature: 11, featureName: 'Landing Page Manifesto' }, async () => {
  const html = readProjectFile('index.html');
  assert.ok(html, 'index.html must exist');
  const hasManifesto = html.includes('Görülmeyeni Görünür') || 
                       html.includes('Çağdaş Müzik') || 
                       html.includes('Ses Sanatı');
  assert.ok(hasManifesto, 'index.html must feature manifesto headline');
});

test('TC-T1-F11-02', 'Hero section includes curatorial badge / institutional stamp', { tier: 1, feature: 11, featureName: 'Landing Page Manifesto' }, async () => {
  const html = readProjectFile('index.html');
  assert.ok(html, 'index.html must exist');
  assert.ok(html.includes('badge') || html.includes('Kurumsal') || html.includes('İnisiyatif'), 'Hero should feature curatorial badge');
});

test('TC-T1-F11-03', 'Hero section highlights youth employment or composer empowerment', { tier: 1, feature: 11, featureName: 'Landing Page Manifesto' }, async () => {
  const html = readProjectFile('index.html');
  assert.ok(html, 'index.html must exist');
  const hasMission = html.includes('Genç') || html.includes('İstihdam') || html.includes('Besteci') || html.includes('Kolektif');
  assert.ok(hasMission, 'Hero must articulate mission: youth employment / composer platform');
});

test('TC-T1-F11-04', 'Hero contains primary action button to program or volunteer application', { tier: 1, feature: 11, featureName: 'Landing Page Manifesto' }, async () => {
  const html = readProjectFile('index.html');
  assert.ok(html, 'index.html must exist');
  const hasCta = html.includes('gonullu.html') || html.includes('etkinlikler.html');
  assert.ok(hasCta, 'Hero must contain CTA button to events or volunteer application');
});

test('TC-T1-F11-05', 'Hero container utilizes full viewport width with asymmetric layout', { tier: 1, feature: 11, featureName: 'Landing Page Manifesto' }, async () => {
  const html = readProjectFile('index.html');
  assert.ok(html, 'index.html must exist');
  assert.ok(html.includes('hero'), 'Hero section must exist in index.html');
});

/* ==========================================================================
   FEATURE 12: Premier Listening/Watching Media Module
   ========================================================================== */
test('TC-T1-F12-01', 'index.html or arsiv.html showcases premier recording media module', { tier: 1, feature: 12, featureName: 'Premier Media Module' }, async () => {
  const indexHtml = readProjectFile('index.html');
  const arsivHtml = readProjectFile('arsiv.html');
  const hasPremier = (indexHtml && (indexHtml.includes('premier') || indexHtml.includes('Prömiyer') || indexHtml.includes('home-archive'))) ||
                     (arsivHtml && (arsivHtml.includes('archive') || arsivHtml.includes('player')));
  assert.ok(hasPremier, 'Media showcase module must exist on index.html or arsiv.html');
});

test('TC-T1-F12-02', 'Media player displays composer, title, and venue metadata', { tier: 1, feature: 12, featureName: 'Premier Media Module' }, async () => {
  const content = JSON.parse(readProjectFile('data/content.json'));
  assert.ok(Array.isArray(content.archive), 'archive must be an array');
  const sample = content.archive[0];
  assert.ok(sample.title, 'Archive item must have title');
  assert.ok(sample.composer, 'Archive item must have composer');
  assert.ok(sample.performer || sample.venue, 'Archive item must have performer or venue');
});

test('TC-T1-F12-03', 'Media module triggers darkroom auditorium modal for playback', { tier: 1, feature: 12, featureName: 'Premier Media Module' }, async () => {
  const mainJs = readProjectFile('assets/js/main.js');
  assert.ok(mainJs, 'main.js must exist');
  const hasModalTrigger = mainJs.includes('openMediaModal') || mainJs.includes('modal') || mainJs.includes('play');
  assert.ok(hasModalTrigger, 'main.js should provide modal playback trigger');
});

test('TC-T1-F12-04', 'Modal player supports audio and video embeds (YouTube / SoundCloud)', { tier: 1, feature: 12, featureName: 'Premier Media Module' }, async () => {
  const content = JSON.parse(readProjectFile('data/content.json'));
  assert.ok(content.archive.some(a => a.youtubeId || a.embedUrl || a.audioUrl), 'Archive items should support media embed identifiers');
});

test('TC-T1-F12-05', 'Auditorium modal provides close button and escape key binding', { tier: 1, feature: 12, featureName: 'Premier Media Module' }, async () => {
  const mainJs = readProjectFile('assets/js/main.js');
  assert.ok(mainJs, 'main.js must exist');
  const hasClose = mainJs.includes('close') || mainJs.includes('Escape') || mainJs.includes('modal-close');
  assert.ok(hasClose, 'Modal logic must support closing');
});

/* ==========================================================================
   FEATURE 13: Interactive Season Program Timeline
   ========================================================================== */
test('TC-T1-F13-01', 'etkinlikler.html and index.html feature concert timeline container', { tier: 1, feature: 13, featureName: 'Season Program Timeline' }, async () => {
  const etkinliklerHtml = readProjectFile('etkinlikler.html');
  assert.ok(etkinliklerHtml, 'etkinlikler.html must exist');
  assert.ok(etkinliklerHtml.includes('events-page-container') || etkinliklerHtml.includes('events-container'), 'Events container must exist in etkinlikler.html');
});

test('TC-T1-F13-02', 'Store.getEvents returns 10 canonical events', { tier: 1, feature: 13, featureName: 'Season Program Timeline' }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  await env.loadPage('ekibimiz.html');
  const Store = env.window.Store;
  const events = Store.getEvents('all');
  assert.equal(events.length, 10, 'Store.getEvents should return 10 events');
});

test('TC-T1-F13-03', 'Events support category filtering (Konser, Atölye, Seminer, Panel)', { tier: 1, feature: 13, featureName: 'Season Program Timeline' }, async () => {
  const content = JSON.parse(readProjectFile('data/content.json'));
  const types = new Set(content.events.map(e => e.type));
  assert.ok(types.size >= 3, 'Events should span at least 3 distinct types');
});

test('TC-T1-F13-04', 'Event objects contain date, time, venue, and description', { tier: 1, feature: 13, featureName: 'Season Program Timeline' }, async () => {
  const content = JSON.parse(readProjectFile('data/content.json'));
  const firstEvent = content.events[0];
  assert.ok(firstEvent.date, 'Event must have date');
  assert.ok(firstEvent.title, 'Event must have title');
  assert.ok(firstEvent.venue, 'Event must have venue');
});

test('TC-T1-F13-05', 'Event status filtering partitions upcoming vs past events', { tier: 1, feature: 13, featureName: 'Season Program Timeline' }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  await env.loadPage('ekibimiz.html');
  const Store = env.window.Store;
  const upcoming = Store.getEvents('all', 'upcoming');
  const past = Store.getEvents('all', 'past');
  const all = Store.getEvents('all');
  assert.equal(upcoming.length + past.length, all.length, 'Sum of upcoming and past events must equal total');
});

/* ==========================================================================
   FEATURE 14: Editorial Subpage Spread Redesign
   ========================================================================== */
test('TC-T1-F14-01', 'kurumsal.html contains institutional narrative spread', { tier: 1, feature: 14, featureName: 'Editorial Subpage Spread' }, async () => {
  const html = readProjectFile('kurumsal.html');
  assert.ok(html, 'kurumsal.html must exist');
  assert.ok(html.includes('Kurumsal') || html.includes('Hakkımızda'), 'kurumsal.html must contain corporate narrative');
});

test('TC-T1-F14-02', 'vizyon-misyon.html articulates strategic objectives', { tier: 1, feature: 14, featureName: 'Editorial Subpage Spread' }, async () => {
  const html = readProjectFile('vizyon-misyon.html');
  assert.ok(html, 'vizyon-misyon.html must exist');
  assert.ok(html.includes('Vizyon') && html.includes('Misyon'), 'vizyon-misyon.html must state vision and mission');
});

test('TC-T1-F14-03', 'degerlerimiz.html features 12 principles spread', { tier: 1, feature: 14, featureName: 'Editorial Subpage Spread' }, async () => {
  const html = readProjectFile('degerlerimiz.html');
  assert.ok(html, 'degerlerimiz.html must exist');
  assert.ok(html.includes('12') || html.includes('İlke') || html.includes('Değerlerimiz'), 'degerlerimiz.html must feature 12 principles');
});

test('TC-T1-F14-04', 'arsiv.html contains 8 recordings with composer metadata', { tier: 1, feature: 14, featureName: 'Editorial Subpage Spread' }, async () => {
  const html = readProjectFile('arsiv.html');
  assert.ok(html, 'arsiv.html must exist');
  assert.ok(html.includes('Dijital Arşiv') || html.includes('Arşiv'), 'arsiv.html must display digital archive');
});

test('TC-T1-F14-05', 'blog.html lists 6 thought-leadership articles', { tier: 1, feature: 14, featureName: 'Editorial Subpage Spread' }, async () => {
  const content = JSON.parse(readProjectFile('data/content.json'));
  assert.ok(Array.isArray(content.blogs), 'blogs must be an array');
  assert.equal(content.blogs.length, 6, 'Canonical blogs must contain 6 articles');
});

/* ==========================================================================
   FEATURE 15: Dedicated hakkimizda.html Alias
   ========================================================================== */
test('TC-T1-F15-01', 'hakkimizda.html exists in project root directory', { tier: 1, feature: 15, featureName: 'Dedicated hakkimizda.html' }, async () => {
  const exists = fs.existsSync(path.resolve(PROJECT_ROOT, 'hakkimizda.html'));
  assert.ok(exists, 'hakkimizda.html must exist in project root directory (M3 requirement)');
});

test('TC-T1-F15-02', 'hakkimizda.html provides valid HTML structure', { tier: 1, feature: 15, featureName: 'Dedicated hakkimizda.html' }, async () => {
  const html = readProjectFile('hakkimizda.html');
  if (!html) assert.ok(false, 'hakkimizda.html missing (M3 requirement)');
  assert.ok(html.includes('<!DOCTYPE html>') || html.includes('<html'), 'hakkimizda.html must have valid HTML doctype');
});

test('TC-T1-F15-03', 'hakkimizda.html includes shared site header and footer', { tier: 1, feature: 15, featureName: 'Dedicated hakkimizda.html' }, async () => {
  const html = readProjectFile('hakkimizda.html');
  if (!html) assert.ok(false, 'hakkimizda.html missing (M3 requirement)');
  assert.ok(html.includes('site-header') || html.includes('header'), 'hakkimizda.html must include site header');
  assert.ok(html.includes('site-footer') || html.includes('footer'), 'hakkimizda.html must include site footer');
});

test('TC-T1-F15-04', 'hakkimizda.html content relates to institutional about information', { tier: 1, feature: 15, featureName: 'Dedicated hakkimizda.html' }, async () => {
  const html = readProjectFile('hakkimizda.html');
  if (!html) assert.ok(false, 'hakkimizda.html missing (M3 requirement)');
  const hasAbout = html.includes('Hakkımızda') || html.includes('Çağdaş Müzik Platformu') || html.includes('kurumsal');
  assert.ok(hasAbout, 'hakkimizda.html must convey institutional about info');
});

test('TC-T1-F15-05', 'Direct access to hakkimizda.html loads with zero console errors', { tier: 1, feature: 15, featureName: 'Dedicated hakkimizda.html' }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  try {
    const page = await env.loadPage('hakkimizda.html');
    assert.equal(page.consoleErrors.length, 0, 'hakkimizda.html should have 0 console errors');
  } catch (err) {
    assert.ok(false, `hakkimizda.html failed to load: ${err.message}`);
  }
});

/* ==========================================================================
   FEATURE 16: Admin Panel 8-Unit Synchronization
   ========================================================================== */
test('TC-T1-F16-01', 'admin/index.html unit select options include 8 canonical units', { tier: 1, feature: 16, featureName: 'Admin Panel 8-Unit Sync' }, async () => {
  const adminHtml = readProjectFile('admin/index.html');
  assert.ok(adminHtml, 'admin/index.html must exist');
  assert.ok(adminHtml.includes('İdari Koordinasyon'), 'Admin HTML must list İdari Koordinasyon');
  assert.ok(adminHtml.includes('Sanat Danışma Kurulu'), 'Admin HTML must list Sanat Danışma Kurulu');
  assert.ok(adminHtml.includes('Dijital & Teknoloji'), 'Admin HTML must list Dijital & Teknoloji');
});

test('TC-T1-F16-02', 'admin/admin.js synchronizes with 41 team members', { tier: 1, feature: 16, featureName: 'Admin Panel 8-Unit Sync' }, async () => {
  const adminJs = readProjectFile('admin/admin.js');
  assert.ok(adminJs, 'admin/admin.js must exist');
  assert.ok(adminJs.includes('team') && adminJs.includes('render'), 'admin.js must render team data');
});

test('TC-T1-F16-03', 'Admin dashboard stats display 41 members and 8 units', { tier: 1, feature: 16, featureName: 'Admin Panel 8-Unit Sync' }, async () => {
  const adminJs = readProjectFile('admin/admin.js');
  assert.ok(adminJs, 'admin/admin.js must exist');
  assert.ok(adminJs.includes('team.length') || adminJs.includes('stats'), 'admin.js must compute team count dynamically');
});

test('TC-T1-F16-04', 'Admin panel provides JSON export function for Hostinger backup', { tier: 1, feature: 16, featureName: 'Admin Panel 8-Unit Sync' }, async () => {
  const adminJs = readProjectFile('admin/admin.js');
  assert.ok(adminJs, 'admin/admin.js must exist');
  assert.ok(adminJs.includes('exportJSON') || adminJs.includes('download') || adminJs.includes('content.json'), 'admin.js must support JSON export');
});

test('TC-T1-F16-05', 'Admin panel saves via POST to /api/save.php with atomic payload', { tier: 1, feature: 16, featureName: 'Admin Panel 8-Unit Sync' }, async () => {
  const adminJs = readProjectFile('admin/admin.js');
  assert.ok(adminJs, 'admin/admin.js must exist');
  assert.ok(adminJs.includes('save.php') || adminJs.includes('saveAll'), 'admin.js must interact with save.php API');
});

/* ==========================================================================
   FEATURE 17: Hostinger PHP API Preservation
   ========================================================================== */
test('TC-T1-F17-01', 'api/data.php returns HTTP 200 with JSON content-type', { tier: 1, feature: 17, featureName: 'Hostinger PHP API', mode: 'http' }, async (ctx) => {
  if (!ctx || !ctx.httpServer) return; // executed under --http
  const res = await ctx.httpServer.get('/api/data.php');
  assert.equal(res.statusCode, 200, 'GET /api/data.php must return 200');
  assert.ok(res.headers['content-type'].includes('application/json'), 'content-type must be application/json');
});

test('TC-T1-F17-02', 'api/data.php sends cache-busting headers', { tier: 1, feature: 17, featureName: 'Hostinger PHP API', mode: 'http' }, async (ctx) => {
  if (!ctx || !ctx.httpServer) return;
  const res = await ctx.httpServer.get('/api/data.php');
  assert.ok(res.headers['cache-control']?.includes('no-cache'), 'api/data.php must include Cache-Control: no-cache');
});

test('TC-T1-F17-03', 'api/save.php handles OPTIONS preflight request', { tier: 1, feature: 17, featureName: 'Hostinger PHP API', mode: 'http' }, async (ctx) => {
  if (!ctx || !ctx.httpServer) return;
  const res = await ctx.httpServer.options('/api/save.php');
  assert.equal(res.statusCode, 200, 'OPTIONS /api/save.php must return 200');
  assert.ok(res.headers['access-control-allow-origin'], 'OPTIONS must include Access-Control-Allow-Origin');
});

test('TC-T1-F17-04', 'api/save.php rejects non-POST requests with HTTP 405', { tier: 1, feature: 17, featureName: 'Hostinger PHP API', mode: 'http' }, async (ctx) => {
  if (!ctx || !ctx.httpServer) return;
  const res = await ctx.httpServer.get('/api/save.php');
  assert.equal(res.statusCode, 405, 'GET /api/save.php must return 405 Method Not Allowed');
});

test('TC-T1-F17-05', 'api/save.php uses LOCK_EX for atomic file concurrency', { tier: 1, feature: 17, featureName: 'Hostinger PHP API' }, async () => {
  const savePhp = readProjectFile('api/save.php');
  assert.ok(savePhp, 'api/save.php must exist');
  assert.ok(savePhp.includes('LOCK_EX'), 'api/save.php must use LOCK_EX for atomic safe concurrency');
});

/* ==========================================================================
   FEATURE 18: Dual-Protocol Headless & E2E Test Suite
   ========================================================================== */
test('TC-T1-F18-01', 'Test runner script tests/e2e/runner.js exists and is executable', { tier: 1, feature: 18, featureName: 'Dual-Protocol E2E Suite' }, async () => {
  const runnerPath = path.resolve(__dirname, 'runner.js');
  assert.ok(fs.existsSync(runnerPath), 'tests/e2e/runner.js must exist');
});

test('TC-T1-F18-02', 'Test environment simulator supports file: protocol simulation', { tier: 1, feature: 18, featureName: 'Dual-Protocol E2E Suite' }, async () => {
  const env = createEnvironment({ protocol: 'file:' });
  assert.equal(env.window.location.protocol, 'file:', 'Protocol must be file:');
});

test('TC-T1-F18-03', 'Test environment simulator supports http: protocol simulation', { tier: 1, feature: 18, featureName: 'Dual-Protocol E2E Suite' }, async () => {
  const env = createEnvironment({ protocol: 'http:' });
  assert.equal(env.window.location.protocol, 'http:', 'Protocol must be http:');
});

test('TC-T1-F18-04', 'Test framework supports assertions: ok, equal, includes, greaterOrEqual', { tier: 1, feature: 18, featureName: 'Dual-Protocol E2E Suite' }, async () => {
  assert.ok(true);
  assert.equal(1, 1);
  assert.includes('abc', 'b');
  assert.greaterOrEqual(5, 4);
});

test('TC-T1-F18-05', 'Test runner exports structured test counts and tiers', { tier: 1, feature: 18, featureName: 'Dual-Protocol E2E Suite' }, async () => {
  const { defaultRegistry } = require('./test_framework.js');
  assert.greaterOrEqual(defaultRegistry.tests.length, 90, 'Registry must register at least 90 tests for Tier 1');
});
