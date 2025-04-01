import { promises as fs } from 'fs';
import express from 'express';

// Constants
const isProduction = process.env.PROD === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

// Create http server
const app = express();

// Production middlewares
if (isProduction) {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  
  app.use(compression());
  
  // Serve static assets first
  app.use(
    base,
    sirv('./dist/client', {
      extensions: [],
      setHeaders: (res) => {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    })
  );
} else {
  // Development Vite server
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });
  app.use(vite.middlewares);
}

// Read template once in production
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : '';

// API routes would go here (before the catch-all)
// app.use('/api', apiRouter);

// SSR catch-all route
app.get('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '');
    
    let template;
    let render;
    
    if (!isProduction) {
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
    } else {
      template = templateHtml;
      render = (await import('./dist/server/entry-server.js')).render;
    }

    const rendered = await render(url);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '');

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (e) {
    console.error('SSR Error:', e);
    
    // In production, fall back to client-side rendering
    if (isProduction) {
      try {
        const fallbackHtml = await fs.readFile('./dist/client/index.html', 'utf-8');
        return res.status(200).set({ 'Content-Type': 'text/html' }).end(fallbackHtml);
      } catch (err) {
        return res.status(500).end('Server Error');
      }
    }
    
    res.status(500).end(isProduction ? 'Server Error' : e.stack);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}${base}`);
});