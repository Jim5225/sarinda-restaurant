import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'api-chat-dev-middleware',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', (chunk: any) => { body += chunk; });
              req.on('end', async () => {
                if (env.GEMINI_API_KEY) {
                  process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
                }
                const { default: handler } = await import('./api/chat.js');
                const mockRes = {
                  setHeader(k: string, v: string) { res.setHeader(k, v); },
                  status(code: number) {
                    res.statusCode = code;
                    return {
                      json(data: any) {
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(data));
                      },
                      end() { res.end(); }
                    };
                  }
                };
                try {
                  await handler({ ...req, body }, mockRes);
                } catch (e: any) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: e.message }));
                }
              });
            } else {
              res.statusCode = 200;
              res.end('OK');
            }
          });
        }
      }
    ],
    server: {
      port: 5173,
      open: false,
      host: true
    }
  };
});
