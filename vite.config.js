import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
    port: 5173,
    // Only use proxy in development
    ...(process.env.NODE_ENV !== 'production' && {
      proxy: {
        '/proxy-api': {
          target: 'https://eren-world.onrender.com/api/v1',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/proxy-api/, ''),
          configure: (proxy, options) => {
            proxy.on('error', (err, req, res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            });
          },
        }
      }
    })
  }
});
