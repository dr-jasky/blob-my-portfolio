import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Expose API_KEY to client code (ensure this is set in Netlify build environment variables)
    // Vite will replace process.env.API_KEY with the actual value during build.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  build: {
    // Optional: If you want to ensure Tailwind JIT works with all classes
    // you might consider other build tool integrations for Tailwind if problems persist,
    // but with CDN and inline config, this might not be strictly necessary.
    // sourcemap: true, // Enable source maps for easier debugging if needed
  }
});