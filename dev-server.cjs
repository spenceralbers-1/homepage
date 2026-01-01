const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const root = process.cwd();
const clients = new Set();

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

const sendReload = () => {
  clients.forEach((res) => {
    res.write(`event: reload\ndata: ${Date.now()}\n\n`);
  });
};

const server = http.createServer((req, res) => {
  if (req.url === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    res.write('retry: 1000\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  const parsed = url.parse(req.url).pathname || '/';
  const safePath = decodeURIComponent(parsed);
  const resolvedPath = path.join(root, safePath === '/' ? '/index.html' : safePath);

  if (!resolvedPath.startsWith(root)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(resolvedPath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const ext = path.extname(resolvedPath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
    fs.createReadStream(resolvedPath).pipe(res);
  });
});

fs.watch(root, { recursive: true }, (event, filename) => {
  if (!filename || filename.startsWith('.git')) {
    return;
  }
  sendReload();
});

const port = 8080;
server.listen(port, () => {
  console.log(`Dev server running at http://localhost:${port}`);
});
