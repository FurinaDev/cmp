# Project: Çağdaş Müzik Platformu (CMP) — Avant-Garde Editorial Transformation

## Architecture
- **Frontend Architecture**: Multi-page editorial culture-art platform (14 HTML pages), static & server dual-compatible (`file:///` and `http://`).
- **Styling Layer**: `assets/css/styles.css` — High-culture editorial design system (Playfair Display / Cormorant Garamond serif + Plus Jakarta Sans grotesque + JetBrains / Space Mono score stamps; architectural stave grid lines; deep navy `#0A2260` / `#051233` and vibrant accent orange `#DD5626`; darkroom auditorium modals).
- **Data & State Layer**: `assets/js/store.js` + `assets/js/bootstrap-data.js` — Protocol-aware Store (`file:` uses instant embedded bootstrap data, `http:` uses fetch with cache-busting), `isValidData` self-healing cache validator, zero CORS console errors.
- **Client Interactions**: `assets/js/main.js` — Architectural team renderer with Turkish diacritic normalization (`normalizeTr`), dynamic unit filtering across 8 units, premier audio/video modals, responsive navigation, contact/application forms.
- **Admin & Hostinger Backend**: `/admin/index.html`, `admin/admin.js`, `api/*.php`, `data/content.json` — 8-module administration dashboard, PHP atomic save with `LOCK_EX`, dual-persistence (PHP server + browser localStorage).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Editorial Typography Hierarchy | Replace generic Poppins/Montserrat with 3-tier typography: Editorial Serif (Playfair/Cormorant) + Architectural Grotesque + Score Monospace | M1 (R1) | Survey E1 |
| 2 | High-Contrast Cultural Color & Negative Space | Balance Deep Blue (#0A2260 / #051233) and Accent Orange (#DD5626) with warm museum canvas (#FAF9F6) and asymmetric tension | M1 (R1) | Survey E1 |
| 3 | Architectural Stave Lines & Partitür Motifs | 1px architectural grid lines, SVG waveforms, micro-coordinates (`[08 UNITS // 41 MEMBERS]`, `♩ = 72`), and notation hairpins | M1 (R1) | Survey E1 |
| 4 | Universal High-Culture Header & Navigation | Frosted glass architectural header, clean uppercase navigation with orange score indicator, fixed brand lockup without title redundancy | M1 (R1) | Survey E1 |
| 5 | Universal 4-Column Institutional Footer | Unify footer across all 14 pages with complete sitemap, accreditation, copyright, and transparent white logo contrast fix | M1 (R1) | Survey E1 |
| 6 | Inlined Bootstrap Data Architecture | Embed complete canonical 41-member, 8-unit, 10-event, 8-archive dataset so `file:///` loads instantly with zero network calls and zero CORS errors | M2 (R2) | Survey E2 |
| 7 | Self-Healing Cache Validator (`isValidData`) | Detect and purge empty/corrupted localStorage cache to guarantee 40+ members always render | M2 (R2) | Survey E2 |
| 8 | Turkish Diacritic Search Normalization | Implement `normalizeTr()` in `main.js` so searches for "idari", "iletisim", "is", "ayse" correctly match Turkish characters | M2 (R2) | Survey E2 |
| 9 | 8 Canonical Unit Filtering Tabs | Synchronize tab buttons and filter logic in `ekibimiz.html` across all 8 canonical units with live badge counters | M2 (R2) | Survey E2 |
| 10 | Resilient Avatar Fallback | Add local inline SVG / logo image fallback (`onerror`) to prevent broken avatar images in offline mode | M2 (R2) | Survey E2 |
| 11 | Landing Page Manifesto Hero Pavilion | Asymmetric monumental hero ("Görülmeyeni Görünür Kılan," young employment, premier recordings) with curatorial badge | M3 (R3) | Survey E3 |
| 12 | Premier Listening/Watching Media Module | Dedicated high-culture showcase with audio waveform visualizer and darkroom auditorium modal | M3 (R3) | Survey E3 |
| 13 | Interactive Season Program Timeline | Interactive concert and event timeline with category filters and modal details on index and etkinlikler | M3 (R3) | Survey E3 |
| 14 | Editorial Subpage Spread Redesign | Transform `kurumsal.html`, `vizyon-misyon.html`, `degerlerimiz.html` (12 values spread), `arsiv.html`, and `blog.html` into art-monograph layouts | M3 (R3) | Survey E3 |
| 15 | Dedicated `hakkimizda.html` Alias | Create `hakkimizda.html` pointing to corporate institutional content to satisfy direct link access | M3 (R3) | Survey E3 |
| 16 | Admin Panel 8-Unit Synchronization | Update `admin.js` and `admin/index.html` dropdowns and dashboard stats to match the canonical 8 units and 41 members | M4 (R4) | Survey E3 |
| 17 | Hostinger PHP API Preservation | Ensure `api/save.php`, `api/data.php`, `api/application.php` maintain 100% schema compatibility with `data/content.json` | M4 (R4) | Survey E3 |
| 18 | Dual-Protocol Headless & E2E Test Suite | Comprehensive 4-tier requirement-driven test suite verifying both `file:///` and `http://` with zero console errors | M5 (Final) | Survey E3 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | R1: Sanatsal & Editoryal UI/UX Revizyonu | Design system, typography tokens, architectural staves, header/footer unification across all pages, CSS overhaul | none | IN_PROGRESS |
| M2 | R2: Ekip Modülü Onarımı & Dual-Protocol Data Layer | `store.js` protocol guard, bootstrap data architecture, `main.js` Turkish search & 8-unit tabs in `ekibimiz.html` | none | PLANNED |
| M3 | R3: Landing Page & Alt Sayfaların Zenginleştirilmesi | `index.html` manifesto hero & premier player, `degerlerimiz.html` 12-principle spread, `arsiv.html` modal, `blog.html`, `hakkimizda.html` | M1, M2 | PLANNED |
| M4 | R4: Admin Paneli & Data Yapısı Korunumu | `admin/admin.js`, `admin/index.html` 8-unit alignment, `data/content.json` schema preservation, PHP syntax checks | M2 | PLANNED |
| M5 | R5: Dual-Track E2E Test Pass & Adversarial Hardening | 100% pass of E2E test suite (Tiers 1-4) on both `file:///` and `http://`, followed by Tier 5 adversarial testing | M1, M2, M3, M4 | PLANNED |

## Interface Contracts
### Data Store ↔ Client Pages (`assets/js/store.js` ↔ `assets/js/main.js`)
- `Store.init()`: Returns `Promise<Object>` resolving to the root data object `{ site, texts, team, events, archive, blogs, partners, applications }`. On `window.location.protocol === 'file:'`, immediately resolves from bootstrap data without initiating a network request.
- `Store.getTeam(unitFilter)`: Returns `Array<Member>` where each member has `{ id, name, unit, unitKey, title, bio, avatar, linkedin }`. If `unitFilter === 'all'`, returns all 41 members. Otherwise filters by `m.unit === unitFilter || m.unitKey === unitFilter || m.unitId === unitFilter`.
- `Store.getEvents(category)`: Returns `Array<Event>` matching category or all 10 events.
- `Store.getArchive(category)`: Returns `Array<ArchiveItem>` matching category or all 8 archive recordings.
- `Store.getBlogs()`: Returns `Array<Blog>` (6 articles).
- `Store.isValidData(data)`: Returns `boolean` verifying `Array.isArray(data.team) && data.team.length >= 40`.

### Admin Console ↔ PHP API / LocalStorage (`admin/admin.js` ↔ `api/save.php`)
- Payload format: JSON object with keys `site`, `texts`, `team`, `events`, `archive`, `blogs`, `partners`, `applications`.
- `api/save.php`: Accepts `POST` with JSON body, writes to `data/content.json` using `LOCK_EX`.
- `api/data.php`: Returns `data/content.json` with `Cache-Control: no-cache`.

## Code Layout
- `assets/css/styles.css`: Core design system, typography, components, layouts. Owned by Milestone R1 Worker.
- `assets/js/store.js` & `assets/js/bootstrap-data.js`: Data store and bootstrap data. Owned by Milestone R2 Worker.
- `assets/js/main.js`: Client DOM logic, search, filters, modals. Shared between M2 and M3 with clear function boundaries.
- `ekibimiz.html`: Team roster page. Owned by Milestone R2 Worker.
- `index.html`, `kurumsal.html`, `hakkimizda.html`, `vizyon-misyon.html`, `degerlerimiz.html`, `baskan.html`, `arsiv.html`, `etkinlikler.html`, `blog.html`, `blog-detay.html`, `destekciler.html`, `gonullu.html`, `iletisim.html`: Page templates. Owned by Milestone R3 Worker.
- `admin/index.html`, `admin/admin.js`, `api/*.php`: Administration interface and backend endpoints. Owned by Milestone R4 Worker.
- `tests/e2e/`: Automated E2E test suite. Owned exclusively by E2E Testing Track.
