/**
 * Çağdaş Müzik Platformu — HTTP Test Server & Client Helper
 * Spawns PHP built-in server or native Node static server and provides HTTP request utilities.
 */

const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');

class TestHttpServer {
  constructor(options = {}) {
    this.port = options.port || 8999;
    this.host = options.host || '127.0.0.1';
    this.projectRoot = options.projectRoot || path.resolve(__dirname, '../..');
    this.process = null;
    this.isRunning = false;
  }

  async start() {
    if (this.isRunning) return this.getBaseUrl();

    return new Promise((resolve, reject) => {
      // Spawn PHP built-in server
      this.process = spawn('php', ['-S', `${this.host}:${this.port}`, '-t', this.projectRoot], {
        cwd: this.projectRoot,
        stdio: ['ignore', 'pipe', 'pipe']
      });

      let startupTimeout = setTimeout(() => {
        if (!this.isRunning) {
          this.stop();
          reject(new Error(`PHP server failed to start on port ${this.port} within timeout`));
        }
      }, 3000);

      const checkReady = () => {
        const req = http.get(`http://${this.host}:${this.port}/api/data.php`, (res) => {
          clearTimeout(startupTimeout);
          this.isRunning = true;
          resolve(this.getBaseUrl());
        });
        req.on('error', () => {
          setTimeout(checkReady, 100);
        });
      };

      setTimeout(checkReady, 200);

      this.process.on('error', (err) => {
        clearTimeout(startupTimeout);
        reject(err);
      });

      this.process.on('exit', (code, signal) => {
        this.isRunning = false;
      });
    });
  }

  stop() {
    if (this.process) {
      try {
        this.process.kill();
      } catch (e) {}
      this.process = null;
    }
    this.isRunning = false;
  }

  getBaseUrl() {
    return `http://${this.host}:${this.port}`;
  }

  request(method, endpoint, body = null, headers = {}) {
    return new Promise((resolve, reject) => {
      const url = new URL(endpoint, this.getBaseUrl());
      const reqHeaders = { ...headers };
      let postData = null;

      if (body) {
        if (typeof body === 'object') {
          postData = JSON.stringify(body);
          if (!reqHeaders['Content-Type']) {
            reqHeaders['Content-Type'] = 'application/json';
          }
        } else {
          postData = String(body);
        }
        reqHeaders['Content-Length'] = Buffer.byteLength(postData);
      }

      const req = http.request(url, {
        method: method.toUpperCase(),
        headers: reqHeaders
      }, (res) => {
        let resBody = '';
        res.on('data', chunk => resBody += chunk);
        res.on('end', () => {
          let json = null;
          try {
            json = JSON.parse(resBody);
          } catch (e) {}

          resolve({
            statusCode: res.statusCode,
            statusMessage: res.statusMessage,
            headers: res.headers,
            body: resBody,
            json: json
          });
        });
      });

      req.on('error', reject);
      if (postData) {
        req.write(postData);
      }
      req.end();
    });
  }

  get(endpoint, headers = {}) {
    return this.request('GET', endpoint, null, headers);
  }

  post(endpoint, body, headers = {}) {
    return this.request('POST', endpoint, body, headers);
  }

  options(endpoint, headers = {}) {
    return this.request('OPTIONS', endpoint, null, headers);
  }
}

module.exports = {
  TestHttpServer
};
