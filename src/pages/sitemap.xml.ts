import type { APIRoute } from 'astro';
import { LOCALES, ROUTES, absoluteUrl, alternatesFor, type PageKey } from '../i18n';

/** Sitemap with hreflang alternates for every localised page in the route map. */
export const GET: APIRoute = () => {
  const urls = (Object.keys(ROUTES) as PageKey[]).flatMap((page) =>
    LOCALES.map((locale) => {
      const links = alternatesFor(page)
        .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`)
        .join('\n');
      return `  <url>\n    <loc>${absoluteUrl(ROUTES[page][locale])}</loc>\n${links}\n  </url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
