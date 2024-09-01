import { defineConfig } from 'vite';

import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  optimizeDeps: {
    include: ['pdfjs-dist/build/pdf', 'pdfjs-dist/build/pdf.worker.entry']
  },
  build: {
    commonjsOptions: {
      include: [/pdfjs-dist/]
    }
  }
});
