// @ts-check
import { defineConfig } from 'astro/config';

// Static one-page portfolio — deploys to any static host (Netlify / Vercel / Cloudflare Pages).
export default defineConfig({
  output: 'static',
  server: { port: 4321 },
});
