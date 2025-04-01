import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.BASE || '/',
  
  // SSR-specific configuration
  ssr: {
    target: 'node', // Build for Node environment
    noExternal: [
      'react-dom', // Ensure React DOM is bundled for SSR
      '@tailwindcss/vite' // Bundle Tailwind for SSR
    ]
  },

  build: {
    outDir: 'dist/client', // Client-side assets
    emptyOutDir: true, // Clear directory before build
    rollupOptions: {
      input: {
        main: './index.html', // Main entry point
        'entry-server': './src/entry-server.jsx' // SSR entry
      },
      output: {
        // Ensure proper chunking for SSR
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  },

  // Development server configuration
  server: {
    port: 5173, // Match your server.js port
    strictPort: true
  }
});