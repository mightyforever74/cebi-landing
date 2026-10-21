// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Domain kararı kapandı 2026-10-21 (Cem) — cebi-dispatcher.tulipfleet.com
// deseniyle tutarlı, www yok. Bkz. FORK_BASELINE.md.
const SITE = 'https://cebi.tulipfleet.com';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: SITE,
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
});
