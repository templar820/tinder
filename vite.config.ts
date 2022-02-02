import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const port = process.env.VITE_FRONTEND_PORT;

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

  return defineConfig({
    server: {
      port,
    },
    plugins: [react()],
    define: {
      PORT: String(process.env.VITE_BACKEND_PORT),
    }
  });
};
