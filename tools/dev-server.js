import { createServer } from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const port = Number.parseInt(process.env.PORT ?? '5173', 10);

const mimeTypes = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.obj': 'text/plain; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml; charset=UTF-8',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.wasm': 'application/wasm',
};

const server = createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url, `http://${req.headers.host}`);
    let requestedPath = requestUrl.pathname;

    if (requestedPath.endsWith('/')) {
      requestedPath += 'index.html';
    }

    const sanitizedPath = path
      .normalize(requestedPath)
      .replace(/^([/\\]*)(\.\.(?:[/\\]|$))+/, '')
      .replace(/^\/+/, '');

    const absolutePath = path.join(root, sanitizedPath);

    const data = await fs.readFile(absolutePath);
    const ext = path.extname(absolutePath).toLowerCase();
    const contentType = mimeTypes[ext] ?? 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('404 - Fichier non trouvé');
      return;
    }

    console.error('Erreur serveur', error);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('500 - Erreur interne du serveur');
  }
});

server.listen(port, () => {
  console.log(`Serveur de développement démarré sur http://localhost:${port}`);
});
