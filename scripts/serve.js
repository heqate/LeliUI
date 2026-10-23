const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // Enable CORS so AI sandboxes, CodePens, and external sites can fetch leliUI CSS/JS & AI manifests directly
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('X-AI-Discovery', '/llms.txt, /llms-full.txt, /ai-manifest.json');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  let reqPath = decodeURIComponent(req.url.split('?')[0]);

  // Well-known AI plugin & LLM discovery aliases
  if (reqPath === '/.well-known/ai-plugin.json' || reqPath === '/api/ai') {
    reqPath = '/ai-manifest.json';
  } else if (reqPath === '/.well-known/llms.txt') {
    reqPath = '/llms.txt';
  } else if (reqPath === '/robots.txt') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end(
      `User-agent: *\nAllow: /\n\n# AI & LLM Discovery Endpoints\nLLMs-Txt: /llms.txt\nLLMs-Full-Txt: /llms-full.txt\nAI-Manifest: /ai-manifest.json\n`
    );
  } else if (reqPath === '/') {
    reqPath = '/index.html';
  }

  const filePath = path.join(ROOT, reqPath);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (reqPath === '/favicon.ico') {
        const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#f472b6"/><text x="50%" y="54%" font-family="system-ui, sans-serif" font-weight="bold" font-size="20" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">L</text></svg>`;
        res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
        return res.end(svgIcon);
      }
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Not Found: ' + reqPath);
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(content);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n[leliUI] Web & AI Discovery Server running on http://0.0.0.0:${PORT}\n`);
});
