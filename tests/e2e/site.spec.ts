import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { company } from '../../src/config/company';
import { site } from '../../src/config/site';
import { LOCALES, ROUTES, SERVICE_IDS, t, type Locale } from '../../src/i18n';
import { serviceAnchor } from '../../src/data/services';

const WA = 'https://wa.me/34687032956';
const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 1024;

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('requestfailed', (r) => errors.push(`request failed: ${r.url()}`));
  page.on('response', (r) => r.status() >= 400 && errors.push(`${r.status()} ${r.url()}`));
  return errors;
}

async function scrollThrough(page: Page) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 500) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(40);
  }
}

for (const locale of LOCALES) {
  const dict = t(locale);

  test.describe(`home (${locale})`, () => {
    test('renders translated content, metadata and no errors', async ({ page }) => {
      const errors = collectErrors(page);
      await page.goto(ROUTES.home[locale]);

      await expect(page.locator('html')).toHaveAttribute('lang', dict.htmlLang);
      await expect(page).toHaveTitle(dict.meta.title);
      await expect(page.locator('h1')).toHaveText(dict.hero.title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        'content',
        dict.meta.description,
      );
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `${site.url}${ROUTES.home[locale]}`,
      );
      for (const l of LOCALES) {
        await expect(
          page.locator(`link[rel="alternate"][hreflang="${t(l).htmlLang}"]`),
        ).toHaveAttribute('href', `${site.url}${ROUTES.home[l]}`);
      }
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
        'href',
        `${site.url}/`,
      );
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
        'content',
        dict.ogLocale,
      );

      // Every section heading is in the selected language.
      for (const heading of [
        dict.services.title,
        dict.company.title,
        dict.capabilities.title,
        dict.commitments.title,
        dict.contact.title,
      ]) {
        await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
      }
      for (const id of SERVICE_IDS) {
        await expect(page.locator(`#${serviceAnchor(id)}`)).toContainText(
          dict.services.items[id].title,
        );
      }

      // Structured data parses and only uses supplied facts.
      const json = await page.locator('script[type="application/ld+json"]').textContent();
      const data = JSON.parse(json ?? '{}');
      expect(data.legalName).toBe(company.legalName);
      expect(data.taxID).toBe(company.nif);
      expect(data.openingHours).toBeUndefined();
      expect(data.foundingDate).toBeUndefined();

      // Images load (scroll to trigger lazy loading) and all have alt text.
      await scrollThrough(page);
      await expect
        .poll(() =>
          page.evaluate(() =>
            [...document.images]
              .filter((img) => !img.complete || img.naturalWidth === 0)
              .map((img) => img.src),
          ),
        )
        .toEqual([]);
      expect(await page.locator('img:not([alt]), img[alt=""]').count()).toBe(0);

      expect(errors).toEqual([]);
    });

    test('contact links use the correct destinations', async ({ page }) => {
      await page.goto(ROUTES.home[locale]);
      const contact = page.locator(`#${dict.anchors.contact}`);

      for (const [tel] of [['tel:+34624817846'], ['tel:+34672546266']]) {
        await expect(contact.locator(`a[href="${tel}"]`)).toHaveCount(1);
      }
      await expect(contact.locator('a[href="mailto:info@dhp-solar.site"]')).toHaveCount(1);
      await expect(contact.locator('a[href="mailto:gerencia@dhp-solar.site"]')).toHaveCount(1);
      await expect(contact).toContainText('Calle María del Rocío 83 B');
      await expect(contact).toContainText('41130 La Puebla del Río');
      await expect(contact).toContainText(company.nif);

      // Every WhatsApp link targets the company number and opens in a new tab.
      const waLinks = page.locator('a[href^="https://wa.me/"]');
      const count = await waLinks.count();
      expect(count).toBeGreaterThan(SERVICE_IDS.length);
      for (let i = 0; i < count; i++) {
        const link = waLinks.nth(i);
        const href = (await link.getAttribute('href'))!;
        expect(href.startsWith(`${WA}?text=`)).toBe(true);
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', /noopener/);
      }

      // General message on the main CTA; service-specific messages on the contact shortcuts.
      const main = new URL((await contact.locator('a.wa-main').getAttribute('href'))!);
      expect(main.searchParams.get('text')).toBe(dict.contact.whatsappMessage);
      const shortcuts = contact.locator('.shortcuts a');
      await expect(shortcuts).toHaveCount(SERVICE_IDS.length);
      for (const [i, id] of SERVICE_IDS.entries()) {
        await expect(shortcuts.nth(i)).toHaveText(new RegExp(dict.services.items[id].short));
        const href = await shortcuts.nth(i).getAttribute('href');
        expect(new URL(href!).searchParams.get('text')).toBe(dict.services.items[id].whatsapp);
      }

      // WhatsApp buttons are limited to the header, hero, floating button and contact section.
      for (const id of SERVICE_IDS) {
        await expect(page.locator(`#${serviceAnchor(id)} a[href^="${WA}"]`)).toHaveCount(0);
      }
    });

    test('has no form, fake submission or unconfirmed workforce figures', async ({ page }) => {
      await page.goto(ROUTES.home[locale]);
      expect(await page.locator('form, input, textarea, select').count()).toBe(0);
      const text = await page.locator('body').innerText();
      if (!company.team.size.confirmed) expect(text).not.toContain(company.team.size.value);
      if (!company.team.ownSiteManager.confirmed)
        expect(text).not.toContain(dict.company.siteManager);
    });

    test('passes automated accessibility checks (WCAG 2.1 AA)', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(ROUTES.home[locale]);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(
        results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(' | ')}`),
      ).toEqual([]);
    });
  });
}

test('language switcher changes the page content', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText(t('es').hero.title);

  await page
    .locator('header')
    .getByRole('link', { name: /English/ })
    .click();
  await expect(page).toHaveURL(/\/en\/$/);
  await expect(page.locator('h1')).toHaveText(t('en').hero.title);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');

  await page
    .locator('header')
    .getByRole('link', { name: /Français/ })
    .click();
  await expect(page).toHaveURL(/\/fr\/$/);
  await expect(page.locator('h1')).toHaveText(t('fr').hero.title);

  // Current language is marked for assistive technology.
  await expect(page.locator('header a[aria-current="true"]')).toHaveAttribute('hreflang', 'fr');
});

test('language switcher keeps the visitor on the equivalent legal page', async ({ page }) => {
  await page.goto(ROUTES.privacy.es);
  await page
    .locator('header')
    .getByRole('link', { name: /English/ })
    .click();
  await expect(page).toHaveURL(new RegExp(`${ROUTES.privacy.en}$`));
  await expect(page.locator('h1')).toHaveText(t('en').legal.privacy(company).title);
});

test('navigation anchors point to existing sections', async ({ page }) => {
  for (const locale of LOCALES) {
    await page.goto(ROUTES.home[locale]);
    const hrefs = await page
      .locator('a[href^="#"]')
      .evaluateAll((links) => links.map((a) => a.getAttribute('href')!));
    for (const href of new Set(hrefs)) {
      expect(await page.locator(href).count(), `${locale} ${href}`).toBe(1);
    }
  }
});

test('mobile menu opens, closes and is keyboard accessible', async ({ page }) => {
  test.skip(!isMobile(page), 'mobile only');
  await page.goto('/');
  const toggle = page.locator('[data-menu-toggle]');
  const panel = page.locator('#mobile-menu');

  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(panel).toBeHidden();

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(panel).toBeVisible();
  await expect(panel.locator('a').first()).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(panel).toBeHidden();
  await expect(toggle).toBeFocused();

  await toggle.click();
  await panel.getByRole('link', { name: t('es').nav.contact }).click();
  await expect(panel).toBeHidden();
  await expect(page).toHaveURL(/#contacto$/);
});

test('desktop navigation is visible and the floating WhatsApp button appears after the hero', async ({
  page,
}) => {
  test.skip(isMobile(page), 'desktop only');
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: t('es').a11y.primaryNav }).first();
  await expect(nav.getByRole('link', { name: t('es').nav.services })).toBeVisible();

  const float = page.locator('[data-wa-float]');
  await expect(float).toBeHidden();
  await page.locator(`#${t('es').anchors.company}`).scrollIntoViewIfNeeded();
  await expect(float).toBeVisible();
  await page.locator(`#${t('es').anchors.contact}`).scrollIntoViewIfNeeded();
  await expect(float).toBeHidden();
});

test('skip link moves focus to the main content', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: t('es').a11y.skipToContent });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

test('respects reduced-motion preferences', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const opacities = await page
    .locator('[data-reveal]')
    .evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity));
  expect(opacities.every((o) => o === '1')).toBe(true);
});

test('has no horizontal overflow at small widths', async ({ page }) => {
  for (const width of [320, 375, 768]) {
    await page.setViewportSize({ width, height: 800 });
    for (const locale of LOCALES) {
      await page.goto(ROUTES.home[locale]);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `${locale} @ ${width}px`).toBeLessThanOrEqual(0);
    }
  }
});

test('legal pages exist in every language and are marked as drafts', async ({ page }) => {
  for (const locale of LOCALES as readonly Locale[]) {
    for (const key of ['legalNotice', 'privacy'] as const) {
      const response = await page.goto(ROUTES[key][locale]);
      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', t(locale).htmlLang);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.getByRole('note')).toContainText(t(locale).legal.draftNotice);
      await expect(page.locator('body')).toContainText(company.nif);
    }
  }
});

test('every internal link resolves', async ({ page, request }) => {
  const pages = Object.values(ROUTES).flatMap((r) => Object.values(r));
  const targets = new Set<string>();
  for (const path of pages) {
    await page.goto(path);
    const hrefs = await page
      .locator('a[href^="/"]')
      .evaluateAll((links) => links.map((a) => a.getAttribute('href')!));
    hrefs.forEach((h) => targets.add(h.split('#')[0]));
  }
  for (const target of targets) {
    const res = await request.get(target);
    expect(res.status(), target).toBe(200);
  }
});

test('robots.txt, sitemap and manifest are served', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain(`Sitemap: ${site.url}/sitemap.xml`);

  const sitemap = await (await request.get('/sitemap.xml')).text();
  for (const routes of Object.values(ROUTES)) {
    for (const path of Object.values(routes))
      expect(sitemap).toContain(`<loc>${site.url}${path}</loc>`);
  }
  expect(sitemap).toContain('hreflang="x-default"');

  for (const asset of [
    '/site.webmanifest',
    '/favicon.svg',
    '/favicon.ico',
    '/og-image.jpg',
    '/apple-touch-icon.png',
  ]) {
    expect((await request.get(asset)).status(), asset).toBe(200);
  }
});
