import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const port = process.env.PORT || 4000;

export default defineConfig({
  server: {
    port,
  },
  plugins: [react()]
});
