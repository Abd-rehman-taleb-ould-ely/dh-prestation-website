// @ts-check
import { defineConfig } from 'astro/config';
import { site } from './src/config/site';

// Static output only: no server, database or API. Locale routing is explicit
// (see src/i18n/index.ts), so Astro's i18n router is not needed.
export default defineConfig({
  site: site.url,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  devToolbar: { enabled: false },
});
