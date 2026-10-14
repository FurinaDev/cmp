# Test Infrastructure: Çağdaş Müzik Platformu (CMP)

## 1. Architectural Overview

The Çağdaş Müzik Platformu (CMP) E2E Test Suite is a high-fidelity, automated, opaque-box testing framework built in native Node.js. It requires **zero third-party npm dependencies** and executes across both local browser file mode (`file:///`) and live server mode (`http://`) with sub-second execution speeds.

```
tests/e2e/
├── runner.js                 # CLI Test Runner entrypoint with flags (--file, --http, --tier, --feature)
├── env_simulator.js          # Headless Browser DOM, Script VM, CORS & Storage Simulator
├── http_helper.js            # PHP 8 built-in server spawn & HTTP client harness
├── test_framework.js         # Assertion library (ok, equal, includes, match) & test registry
├── tier1_features.test.js    # Tier 1: 90 Feature tests covering all 18 PROJECT.md features
├── tier2_boundaries.test.js  # Tier 2: 15 Boundary & corner case tests (diacritics, ReDoS, XSS, cache)
├── tier3_interactions.test.js# Tier 3: 8 Cross-feature interaction tests (protocol switch, search+filter)
└── tier4_journeys.test.js    # Tier 4: 5 Real-world end-to-end user journeys
```

---

## 2. Execution Modes & CLI Interface

The runner provides flexible CLI execution flags for developer feedback, continuous integration, and milestone verification:

| Command | Protocol Tested | Description |
|---|---|---|
| `node tests/e2e/runner.js --file` | `file:///` | Simulates local file browser execution: verifies zero CORS network attempts on `file:`, immediate bootstrap data presence, 41 members, 8 units, Turkish search, and zero console errors. |
| `node tests/e2e/runner.js --http` | `http://` | Spawns PHP 8 built-in server on port 8995 and validates real HTTP responses, CORS headers, API endpoints (`api/data.php`, `api/save.php`, `api/application.php`), and atomic concurrency with `LOCK_EX`. |
| `node tests/e2e/runner.js` | Both (`--all`) | Executes complete 118-test suite across both protocols. |
| `node tests/e2e/runner.js --tier 1` | Filtered | Runs only Tier 1 Feature Coverage tests (90 tests). |
| `node tests/e2e/runner.js --feature 8` | Filtered | Runs only tests for a specific feature (e.g. Feature 8: Turkish Search). |
| `node tests/e2e/runner.js --verbose` | All | Displays per-assertion checkmarks, timing, and full stack traces. |

---

## 3. Core Components

### 3.1. Headless Browser & DOM Simulator (`env_simulator.js`)
- **DOM Engine**: Implements `DOMDocument`, `DOMElement`, `classList` (`DOMTokenList`), attributes, inline styling, event dispatching, and standard hierarchy (`querySelector`, `querySelectorAll`, `getElementById`).
- **Script Evaluation Engine**: Uses Node.js `vm.createContext` to execute client scripts (`assets/js/store.js`, `assets/js/bootstrap-data.js`, `assets/js/main.js`) in their declared order within an authentic global window context.
- **Protocol & CORS Interception**:
  - In `file:` mode, simulates browser CORS security boundaries by throwing authentic Chromium `TypeError: Access to fetch at '...' from origin 'null' has been blocked by CORS policy` when a client script initiates a network fetch from a local file.
  - Spies on all `fetch()` calls to guarantee zero unpermitted network calls in offline mode.
- **Console Spy**: Intercepts `console.log`, `console.warn`, `console.error`, and unhandled promise rejections to verify the **Zero Console Errors** requirement.
- **Storage Simulator**: In-memory `localStorage` implementation for testing caching, self-healing cache purge, and quota limits.

### 3.2. HTTP Server & API Client (`http_helper.js`)
- **PHP 8 Server Spawn**: Automatically spawns `php -S 127.0.0.1:8995 -t .` in background, polls for readiness, and shuts down cleanly on test completion.
- **Real HTTP Network Client**: Issues native `http.request` calls (GET, POST, OPTIONS) verifying status codes, `Cache-Control` headers, and atomic file writes.

### 3.3. Test Framework & Assertions (`test_framework.js`)
- Zero-dependency assertion library providing `assert.ok`, `assert.equal`, `assert.strictEqual`, `assert.includes`, `assert.match`, `assert.greaterOrEqual`, `assert.lessOrEqual`, and `assert.deepStrictEqual`.
- Structured registry indexing tests by `id`, `name`, `tier`, `feature`, and `mode`.

---

## 4. 4-Tier Test Suite Structure

| Tier | Category | Target Scope | Test Count |
|---|---|---|---|
| **Tier 1** | Feature Coverage | >=5 tests per feature across all 18 features in `PROJECT.md` | 90 tests |
| **Tier 2** | Boundary & Corner Cases | Empty states, Turkish diacritics, 1000+ char ReDoS stress, XSS escaping, corrupted cache self-healing, CORS rejection handling, rapid tab clicking | 15 tests |
| **Tier 3** | Cross-Feature Interactions | Protocol switching, unit filter + search interaction, admin export + re-ingestion, event category + modal trigger, volunteer submit + data sync | 8 tests |
| **Tier 4** | Real-World Application Scenarios | Complete end-to-end user journeys (Avant-Garde Visitor, Team Researcher, Concert Goer, Volunteer Applicant, Content Administrator) | 5 journeys |
| **Total** | | Full E2E Test Suite | **118 tests** |

---

## 5. Verification Commands

```powershell
# Run local file mode
node tests/e2e/runner.js --file

# Run HTTP server mode
node tests/e2e/runner.js --http

# Run full test pass
node tests/e2e/runner.js
```
