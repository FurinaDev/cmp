/**
 * Çağdaş Müzik Platformu — E2E Headless Browser & DOM Environment Simulator
 * Zero-dependency pure Node.js VM harness supporting file:/// and http:// protocols.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const http = require('http');

// Helper: Selector matcher (supports #id, .class, tag, [attr=val], [attr*="val"], and combinations)
function matchesSelector(element, selector) {
  if (!selector || !element) return false;
  selector = selector.trim();

  // Multi-selectors separated by comma
  if (selector.includes(',')) {
    return selector.split(',').some(s => matchesSelector(element, s.trim()));
  }

  // Descendant selector (e.g. ".team-card img" or "header nav a")
  if (selector.includes(' ')) {
    const parts = selector.split(/\s+/).filter(Boolean);
    const lastPart = parts[parts.length - 1];
    if (!matchesSimpleSelector(element, lastPart)) return false;
    let curr = element.parentElement;
    let partIdx = parts.length - 2;
    while (curr && partIdx >= 0) {
      if (matchesSimpleSelector(curr, parts[partIdx])) {
        partIdx--;
      }
      curr = curr.parentElement;
    }
    return partIdx < 0;
  }

  return matchesSimpleSelector(element, selector);
}

function matchesSimpleSelector(element, selector) {
  if (!selector || !element) return false;
  selector = selector.trim();

  // Tag with class or id, e.g. "div.card", "button[data-unit]", etc.
  const tagMatch = selector.match(/^[a-zA-Z0-9_-]+/);
  if (tagMatch) {
    if (element.tagName.toLowerCase() !== tagMatch[0].toLowerCase()) {
      return false;
    }
    selector = selector.slice(tagMatch[0].length);
  }

  // ID match (#id)
  const idMatch = selector.match(/#([a-zA-Z0-9_-]+)/);
  if (idMatch) {
    if (element.id !== idMatch[1]) return false;
    selector = selector.replace(idMatch[0], '');
  }

  // Class matches (.class)
  const classMatches = selector.matchAll(/\.([a-zA-Z0-9_-]+)/g);
  for (const cm of classMatches) {
    if (!element.classList.contains(cm[1])) return false;
    selector = selector.replace(cm[0], '');
  }

  // Attribute matches ([attr=val], [attr*="val"], [attr])
  const attrMatches = selector.matchAll(/\[([a-zA-Z0-9_-]+)(?:([*~^$]?=)(?:"|')?([^"']*)(?:"|')?)?\]/g);
  for (const am of attrMatches) {
    const attrName = am[1];
    const op = am[2];
    const expectedVal = am[3];
    if (!element.hasAttribute(attrName)) return false;
    if (op) {
      const actualVal = element.getAttribute(attrName);
      if (op === '=' && actualVal !== expectedVal) return false;
      if (op === '*=' && !actualVal.includes(expectedVal)) return false;
      if (op === '^=' && !actualVal.startsWith(expectedVal)) return false;
      if (op === '$=' && !actualVal.endsWith(expectedVal)) return false;
    }
  }

  return true;
}

class DOMTokenList {
  constructor(element) {
    this.element = element;
    this._tokens = new Set();
    const cls = element.getAttribute('class');
    if (cls) {
      cls.split(/\s+/).filter(Boolean).forEach(c => this._tokens.add(c));
    }
  }

  add(...tokens) {
    tokens.forEach(t => this._tokens.add(t));
    this._sync();
  }

  remove(...tokens) {
    tokens.forEach(t => this._tokens.delete(t));
    this._sync();
  }

  toggle(token, force) {
    if (force !== undefined) {
      if (force) this.add(token);
      else this.remove(token);
      return force;
    }
    if (this._tokens.has(token)) {
      this._tokens.delete(token);
      this._sync();
      return false;
    } else {
      this._tokens.add(token);
      this._sync();
      return true;
    }
  }

  contains(token) {
    return this._tokens.has(token);
  }

  _sync() {
    this.element._attributes['class'] = Array.from(this._tokens).join(' ');
  }

  toString() {
    return Array.from(this._tokens).join(' ');
  }
}

class DOMElement {
  constructor(tagName = 'div', ownerDocument = null) {
    this.tagName = tagName.toUpperCase();
    this.ownerDocument = ownerDocument;
    this.parentElement = null;
    this.children = [];
    this._attributes = {};
    this.classList = new DOMTokenList(this);
    this.style = {};
    this._listeners = {};
    this._textContent = '';
    this.value = '';
    this.checked = false;
  }

  get id() {
    return this.getAttribute('id') || '';
  }

  set id(val) {
    this.setAttribute('id', val);
  }

  get className() {
    return this.getAttribute('class') || '';
  }

  set className(val) {
    this.setAttribute('class', val);
    this.classList = new DOMTokenList(this);
  }

  getAttribute(name) {
    return this._attributes[name.toLowerCase()] ?? null;
  }

  setAttribute(name, val) {
    const key = name.toLowerCase();
    this._attributes[key] = String(val);
    if (key === 'class') {
      this.classList = new DOMTokenList(this);
    }
  }

  removeAttribute(name) {
    delete this._attributes[name.toLowerCase()];
    if (name.toLowerCase() === 'class') {
      this.classList = new DOMTokenList(this);
    }
  }

  hasAttribute(name) {
    return Object.prototype.hasOwnProperty.call(this._attributes, name.toLowerCase());
  }

  appendChild(child) {
    if (!child) return;
    if (child.parentElement) {
      child.parentElement.removeChild(child);
    }
    child.parentElement = this;
    child.ownerDocument = this.ownerDocument;
    this.children.push(child);
    return child;
  }

  removeChild(child) {
    const idx = this.children.indexOf(child);
    if (idx !== -1) {
      this.children.splice(idx, 1);
      child.parentElement = null;
    }
    return child;
  }

  replaceChild(newChild, oldChild) {
    const idx = this.children.indexOf(oldChild);
    if (idx !== -1) {
      if (newChild.parentElement) {
        newChild.parentElement.removeChild(newChild);
      }
      this.children[idx] = newChild;
      newChild.parentElement = this;
      oldChild.parentElement = null;
    }
    return oldChild;
  }

  remove() {
    if (this.parentElement) {
      this.parentElement.removeChild(this);
    }
  }

  get textContent() {
    if (this.children.length === 0) {
      return this._textContent;
    }
    return this.children.map(c => c.textContent).join('');
  }

  set textContent(text) {
    this.children = [];
    this._textContent = String(text);
  }

  get innerHTML() {
    if (this.children.length === 0) {
      return escapeHtml(this._textContent);
    }
    return this.children.map(c => c.outerHTML).join('');
  }

  set innerHTML(htmlString) {
    this.children = [];
    this._textContent = '';
    parseHtmlFragment(htmlString, this, this.ownerDocument);
  }

  get outerHTML() {
    const tag = this.tagName.toLowerCase();
    const attrs = Object.entries(this._attributes)
      .map(([k, v]) => ` ${k}="${escapeAttr(v)}"`)
      .join('');
    if (['img', 'input', 'br', 'hr', 'meta', 'link'].includes(tag)) {
      return `<${tag}${attrs}>`;
    }
    return `<${tag}${attrs}>${this.innerHTML}</${tag}>`;
  }

  querySelector(selector) {
    for (const child of this.children) {
      if (matchesSelector(child, selector)) {
        return child;
      }
      const found = child.querySelector(selector);
      if (found) return found;
    }
    return null;
  }

  querySelectorAll(selector) {
    const results = [];
    function traverse(el) {
      for (const child of el.children) {
        if (matchesSelector(child, selector)) {
          results.push(child);
        }
        traverse(child);
      }
    }
    traverse(this);
    return results;
  }

  getElementsByClassName(name) {
    return this.querySelectorAll(`.${name}`);
  }

  getElementsByTagName(name) {
    return this.querySelectorAll(name);
  }

  addEventListener(type, listener) {
    if (!this._listeners[type]) this._listeners[type] = [];
    this._listeners[type].push(listener);
  }

  removeEventListener(type, listener) {
    if (!this._listeners[type]) return;
    this._listeners[type] = this._listeners[type].filter(l => l !== listener);
  }

  dispatchEvent(event) {
    event.target = this;
    event.currentTarget = this;
    if (this._listeners[event.type]) {
      for (const listener of this._listeners[event.type]) {
        try {
          const ret = listener.call(this, event);
          if (ret && typeof ret.catch === 'function') {
            ret.catch(err => {
              if (this.ownerDocument && this.ownerDocument.defaultView) {
                this.ownerDocument.defaultView.console.error(err.message || String(err));
              }
            });
          }
        } catch (err) {
          if (this.ownerDocument && this.ownerDocument.defaultView) {
            this.ownerDocument.defaultView.console.error(err.message || String(err));
          }
        }
      }
    }
    // Also trigger on<event> property if defined
    const propHandler = this[`on${event.type}`];
    if (typeof propHandler === 'function') {
      try {
        const ret = propHandler.call(this, event);
        if (ret && typeof ret.catch === 'function') {
          ret.catch(err => {
            if (this.ownerDocument && this.ownerDocument.defaultView) {
              this.ownerDocument.defaultView.console.error(err.message || String(err));
            }
          });
        }
      } catch (err) {
        if (this.ownerDocument && this.ownerDocument.defaultView) {
          this.ownerDocument.defaultView.console.error(err.message || String(err));
        }
      }
    }
    return !event.defaultPrevented;
  }

  click() {
    this.dispatchEvent(new Event('click'));
  }

  submit() {
    this.dispatchEvent(new Event('submit'));
  }

  cloneNode(deep = false) {
    const clone = new DOMElement(this.tagName, this.ownerDocument);
    clone._attributes = { ...this._attributes };
    clone.classList = new DOMTokenList(clone);
    clone._textContent = this._textContent;
    clone.value = this.value;
    if (deep) {
      for (const child of this.children) {
        clone.appendChild(child.cloneNode(true));
      }
    }
    return clone;
  }
}

class Event {
  constructor(type, init = {}) {
    this.type = type;
    this.bubbles = init.bubbles ?? false;
    this.cancelable = init.cancelable ?? false;
    this.defaultPrevented = false;
    this.target = null;
    this.currentTarget = null;
  }

  preventDefault() {
    if (this.cancelable) this.defaultPrevented = true;
  }

  stopPropagation() {}
}

class CustomEvent extends Event {
  constructor(type, init = {}) {
    super(type, init);
    this.detail = init.detail ?? null;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;');
}

// Lightweight HTML string parser into DOM nodes
function parseHtmlFragment(html, parentNode, ownerDocument) {
  if (!html) return;
  // Simple token regex for tags vs text
  const tagRegex = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z0-9:-]+)((?:\s+[a-zA-Z0-9_:-]+(?:=(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>|([^<]+)/g;
  let match;
  let current = parentNode;
  const selfClosing = new Set(['img', 'input', 'br', 'hr', 'meta', 'link']);

  while ((match = tagRegex.exec(html)) !== null) {
    if (match[0].startsWith('<!--')) {
      // Comment, skip
      continue;
    } else if (match[5]) {
      // Text node
      const text = match[5];
      if (text.trim() || current.children.length === 0) {
        current._textContent += text;
      }
    } else if (match[1] === '/') {
      // Closing tag
      const closeTag = match[2].toUpperCase();
      if (current.parentElement && current.tagName === closeTag) {
        current = current.parentElement;
      }
    } else {
      // Opening tag
      const tagName = match[2];
      const attrStr = match[3];
      const isAutoClose = match[4] === '/' || selfClosing.has(tagName.toLowerCase());

      const el = new DOMElement(tagName, ownerDocument);

      // Parse attributes
      if (attrStr) {
        const attrRegex = /([a-zA-Z0-9_:-]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
        let am;
        while ((am = attrRegex.exec(attrStr)) !== null) {
          const k = am[1];
          const v = am[2] !== undefined ? am[2] : (am[3] !== undefined ? am[3] : (am[4] !== undefined ? am[4] : ''));
          el.setAttribute(k, v);
        }
      }

      current.appendChild(el);

      if (!isAutoClose) {
        current = el;
      }
    }
  }
}

class DOMDocument extends DOMElement {
  constructor() {
    super('#document', null);
    this.ownerDocument = this;
    this.defaultView = null;
    this.head = new DOMElement('head', this);
    this.body = new DOMElement('body', this);
    this.documentElement = new DOMElement('html', this);
    this.documentElement.appendChild(this.head);
    this.documentElement.appendChild(this.body);
    this.appendChild(this.documentElement);
  }

  createElement(tagName) {
    return new DOMElement(tagName, this);
  }

  getElementById(id) {
    return this.querySelector(`#${id}`);
  }
}

class LocalStorageMock {
  constructor() {
    this._store = new Map();
  }

  getItem(key) {
    return this._store.has(key) ? this._store.get(key) : null;
  }

  setItem(key, value) {
    this._store.set(key, String(value));
  }

  removeItem(key) {
    this._store.delete(key);
  }

  clear() {
    this._store.clear();
  }

  get length() {
    return this._store.size;
  }

  key(index) {
    return Array.from(this._store.keys())[index] ?? null;
  }
}

/**
 * Creates an execution context for either 'file' or 'http' protocol.
 */
function createEnvironment(options = {}) {
  const protocol = options.protocol || 'file:';
  const projectRoot = options.projectRoot || path.resolve(__dirname, '../..');
  const serverPort = options.serverPort || 8999;
  const rejectFileCors = options.rejectFileCors !== false; // true by default

  const doc = new DOMDocument();
  const localStorage = options.localStorage || new LocalStorageMock();
  const consoleLogs = [];
  const consoleWarnings = [];
  const consoleErrors = [];
  const fetchCalls = [];

  const window = {
    location: {
      protocol: protocol,
      pathname: protocol === 'file:' ? `${projectRoot}/index.html` : '/index.html',
      href: protocol === 'file:' ? `file:///${projectRoot.replace(/\\/g, '/')}/index.html` : `http://127.0.0.1:${serverPort}/index.html`,
      host: protocol === 'file:' ? '' : `127.0.0.1:${serverPort}`,
      origin: protocol === 'file:' ? 'null' : `http://127.0.0.1:${serverPort}`,
      reload: () => {}
    },
    document: doc,
    localStorage: localStorage,
    console: {
      log: (...args) => consoleLogs.push(args.join(' ')),
      warn: (...args) => consoleWarnings.push(args.join(' ')),
      error: (...args) => consoleErrors.push(args.join(' ')),
      info: (...args) => consoleLogs.push(args.join(' '))
    },
    Event: Event,
    CustomEvent: CustomEvent,
    setTimeout: (fn, delay = 0) => setTimeout(fn, delay),
    clearTimeout: (id) => clearTimeout(id),
    setInterval: (fn, delay = 0) => setInterval(fn, delay),
    clearInterval: (id) => clearInterval(id),
    alert: (msg) => consoleLogs.push(`[ALERT] ${msg}`),
    addEventListener: (type, fn) => doc.addEventListener(type, fn),
    removeEventListener: (type, fn) => doc.removeEventListener(type, fn),
    dispatchEvent: (ev) => doc.dispatchEvent(ev)
  };

  doc.defaultView = window;
  window.window = window;

  // Setup Fetch Spy / Mock
  window.fetch = async (url, fetchOptions = {}) => {
    fetchCalls.push({ url, options: fetchOptions, timestamp: Date.now() });

    if (protocol === 'file:' && rejectFileCors) {
      // Simulate real Chromium/WebKit CORS failure on file: protocol fetching local files
      const err = new TypeError(
        `Access to fetch at '${url}' from origin 'null' has been blocked by CORS policy: ` +
        `Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, chrome-untrusted, https, isolated-app.`
      );
      throw err;
    }

    // In HTTP mode or when fetch is allowed
    const requestUrl = url.startsWith('http') ? url : `http://127.0.0.1:${serverPort}/${url.replace(/^\//, '')}`;
    return new Promise((resolve, reject) => {
      const parsedUrl = new URL(requestUrl);
      const req = http.request(parsedUrl, {
        method: fetchOptions.method || 'GET',
        headers: fetchOptions.headers || {}
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            statusText: res.statusMessage,
            headers: {
              get: (headerName) => res.headers[headerName.toLowerCase()]
            },
            text: async () => body,
            json: async () => JSON.parse(body)
          });
        });
      });

      req.on('error', reject);
      if (fetchOptions.body) {
        req.write(typeof fetchOptions.body === 'string' ? fetchOptions.body : JSON.stringify(fetchOptions.body));
      }
      req.end();
    });
  };

  const context = vm.createContext(window);

  async function loadPage(relativeHtmlPath) {
    const fullPath = path.resolve(projectRoot, relativeHtmlPath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found: ${fullPath}`);
    }

    const htmlContent = fs.readFileSync(fullPath, 'utf-8');
    window.location.pathname = protocol === 'file:' ? fullPath : `/${relativeHtmlPath.replace(/\\/g, '/')}`;
    window.location.href = protocol === 'file:' ? `file:///${fullPath.replace(/\\/g, '/')}` : `http://127.0.0.1:${serverPort}/${relativeHtmlPath.replace(/\\/g, '/')}`;

    // Reset doc body and head
    doc.head.children = [];
    doc.body.children = [];
    doc.documentElement.children = [doc.head, doc.body];

    // Extract title
    const titleMatch = htmlContent.match(/<title>([^<]*)<\/title>/i);
    if (titleMatch) doc.title = titleMatch[1];

    // Parse full HTML into body
    parseHtmlFragment(htmlContent, doc.body, doc);

    // Extract scripts
    const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
    let sm;
    const scriptsToRun = [];

    while ((sm = scriptRegex.exec(htmlContent)) !== null) {
      const attrStr = sm[1];
      const inlineCode = sm[2];
      const srcMatch = attrStr.match(/src=["']([^"']+)["']/i);
      if (srcMatch) {
        const src = srcMatch[1];
        // Resolve script path relative to current html file
        const scriptAbsPath = path.resolve(path.dirname(fullPath), src);
        if (fs.existsSync(scriptAbsPath)) {
          scriptsToRun.push({ path: scriptAbsPath, code: fs.readFileSync(scriptAbsPath, 'utf-8') });
        }
      } else if (inlineCode && inlineCode.trim()) {
        scriptsToRun.push({ path: `inline-${scriptsToRun.length}.js`, code: inlineCode });
      }
    }

    // Execute scripts in order
    for (const s of scriptsToRun) {
      try {
        vm.runInContext(s.code, context, { filename: s.path });
      } catch (err) {
        consoleErrors.push(`[Script Error in ${s.path}] ${err.message}`);
      }
    }

    // Trigger DOMContentLoaded
    const domLoadedEv = new Event('DOMContentLoaded');
    doc.dispatchEvent(domLoadedEv);

    // Allow any microtasks / async store.init to resolve
    await new Promise(r => setTimeout(r, 60));

    return {
      window,
      document: doc,
      context,
      consoleLogs,
      consoleWarnings,
      consoleErrors,
      fetchCalls,
      localStorage
    };
  }

  return {
    window,
    document: doc,
    context,
    localStorage,
    consoleLogs,
    consoleWarnings,
    consoleErrors,
    fetchCalls,
    loadPage
  };
}

module.exports = {
  createEnvironment,
  DOMElement,
  DOMDocument,
  matchesSelector,
  LocalStorageMock
};
