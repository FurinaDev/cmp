/**
 * Çağdaş Müzik Platformu — E2E Test Suite Framework & Assertion Library
 */

class AssertionError extends Error {
  constructor(message, expected, actual) {
    super(message);
    this.name = 'AssertionError';
    this.expected = expected;
    this.actual = actual;
  }
}

const assert = {
  ok(value, message = 'Expected truthy value') {
    if (!value) {
      throw new AssertionError(message, true, value);
    }
  },

  equal(actual, expected, message) {
    if (actual != expected) {
      throw new AssertionError(
        message || `Expected ${JSON.stringify(actual)} to equal ${JSON.stringify(expected)}`,
        expected,
        actual
      );
    }
  },

  strictEqual(actual, expected, message) {
    if (actual !== expected) {
      throw new AssertionError(
        message || `Expected ${JSON.stringify(actual)} to strictly equal ${JSON.stringify(expected)}`,
        expected,
        actual
      );
    }
  },

  notStrictEqual(actual, expected, message) {
    if (actual === expected) {
      throw new AssertionError(
        message || `Expected ${JSON.stringify(actual)} NOT to strictly equal ${JSON.stringify(expected)}`,
        `NOT ${expected}`,
        actual
      );
    }
  },

  includes(haystack, needle, message) {
    if (typeof haystack === 'string') {
      if (!haystack.includes(needle)) {
        throw new AssertionError(
          message || `Expected string to include ${JSON.stringify(needle)}`,
          needle,
          haystack.slice(0, 200)
        );
      }
    } else if (Array.isArray(haystack)) {
      if (!haystack.includes(needle)) {
        throw new AssertionError(
          message || `Expected array to include ${JSON.stringify(needle)}`,
          needle,
          haystack
        );
      }
    } else {
      throw new AssertionError('haystack must be string or array', 'string or array', typeof haystack);
    }
  },

  notIncludes(haystack, needle, message) {
    if (typeof haystack === 'string') {
      if (haystack.includes(needle)) {
        throw new AssertionError(
          message || `Expected string NOT to include ${JSON.stringify(needle)}`,
          `NOT ${needle}`,
          haystack.slice(0, 200)
        );
      }
    } else if (Array.isArray(haystack)) {
      if (haystack.includes(needle)) {
        throw new AssertionError(
          message || `Expected array NOT to include ${JSON.stringify(needle)}`,
          `NOT ${needle}`,
          haystack
        );
      }
    }
  },

  match(text, regex, message) {
    if (!regex.test(text)) {
      throw new AssertionError(
        message || `Expected ${JSON.stringify(text)} to match ${regex}`,
        regex.toString(),
        text ? text.slice(0, 200) : text
      );
    }
  },

  greaterOrEqual(actual, expected, message) {
    if (actual < expected) {
      throw new AssertionError(
        message || `Expected ${actual} to be >= ${expected}`,
        expected,
        actual
      );
    }
  },

  lessOrEqual(actual, expected, message) {
    if (actual > expected) {
      throw new AssertionError(
        message || `Expected ${actual} to be <= ${expected}`,
        expected,
        actual
      );
    }
  },

  deepStrictEqual(actual, expected, message) {
    const actStr = JSON.stringify(actual);
    const expStr = JSON.stringify(expected);
    if (actStr !== expStr) {
      throw new AssertionError(
        message || `Expected deep equality:\nActual:   ${actStr}\nExpected: ${expStr}`,
        expected,
        actual
      );
    }
  }
};

class TestRegistry {
  constructor() {
    this.tests = [];
  }

  register(id, name, meta, fn) {
    if (typeof meta === 'function') {
      fn = meta;
      meta = {};
    }
    this.tests.push({
      id,
      name,
      tier: meta.tier || 1,
      feature: meta.feature || null,
      featureName: meta.featureName || null,
      mode: meta.mode || 'all', // 'file', 'http', or 'all'
      fn,
      skip: !!meta.skip
    });
  }
}

const defaultRegistry = new TestRegistry();

function test(id, name, meta, fn) {
  defaultRegistry.register(id, name, meta, fn);
}

module.exports = {
  assert,
  AssertionError,
  TestRegistry,
  defaultRegistry,
  test
};
