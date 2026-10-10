const { chromium, expect } = require('@playwright/test');
const { existsSync, mkdirSync } = require('node:fs');
const path = require('node:path');

const baseURL = process.env.TEST_BASE_URL || 'http://127.0.0.1:3001';
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);
const output = path.resolve('test-results');
mkdirSync(output, { recursive: true });

(async () => {
  const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox', '--enable-unsafe-swiftshader'] });
  let passed = 0;
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on('pageerror', error => errors.push(error.message));
  const check = async (name, callback) => { await callback(); passed++; console.log(`PASS ${passed}: ${name}`); };
  const noOverflow = async target => expect(await target.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const scrollImages = async target => {
    await target.evaluate(async () => {
      const height = document.body.scrollHeight;
      for (let y = 0; y < height; y += 600) { window.scrollTo(0, y); await new Promise(resolve => setTimeout(resolve, 90)); }
      window.scrollTo(0, 0);
    });
    await expect.poll(() => target.locator('img').evaluateAll(images => images.every(img => img.complete && img.naturalWidth > 0))).toBe(true);
  };
  try {
    await check('Home and genuine WebGL display render', async () => {
      await page.goto(baseURL, { waitUntil: 'networkidle' });
      await expect(page.getByRole('heading', { level: 1 })).toContainText('A little style.');
      await expect(page.locator('.hero-still')).toHaveClass(/scene-ready/, { timeout: 15000 });
      await expect(page.locator('.hero-canvas canvas')).toHaveCount(1);
      await noOverflow(page);
      await scrollImages(page);
      await page.screenshot({ path: path.join(output, 'home-desktop.png'), fullPage: true });
    });
    await check('Collection navigation and six styles', async () => {
      await page.getByRole('link', { name: 'Explore the collection', exact: true }).click();
      await expect(page).toHaveURL(/\/collection$/);
      await expect(page.locator('.collection-results .style-card')).toHaveCount(6);
    });
    await check('Search, empty state and reset', async () => {
      const search = page.getByRole('searchbox', { name: 'Search clothing styles' });
      await search.fill('shirt');
      await expect(page.locator('.collection-results .style-card')).toHaveCount(2);
      await search.fill('no-such-outfit');
      await expect(page.getByRole('heading', { name: 'No styles found just yet.' })).toBeVisible();
      await page.getByRole('link', { name: 'Reset filters' }).click();
      await expect(search).toHaveValue('');
      await expect(page.locator('.collection-results .style-card')).toHaveCount(6);
    });
    await check('Shareable category routes, refresh and browser back', async () => {
      await page.getByRole('navigation', { name: 'Clothing categories' }).getByRole('link', { name: 'Jeans & trousers', exact: true }).click();
      await expect(page).toHaveURL(/\/collection\/denim$/);
      await page.reload();
      await expect(page.getByRole('heading', { level: 1, name: 'Jeans & trousers' })).toBeVisible();
      await expect(page.locator('.style-card')).toHaveCount(1);
      await page.goBack();
      await expect(page).toHaveURL(/\/collection$/);
      await expect(page.locator('.style-card')).toHaveCount(6);
    });
    await check('Gallery, keyboard next/previous, Escape and focus restoration', async () => {
      const opener = page.getByRole('button', { name: 'View An easy shirt day' });
      await opener.click();
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole('heading', { level: 2 })).toHaveText('An easy shirt day');
      await page.keyboard.press('ArrowRight');
      await expect(dialog.getByRole('heading', { level: 2 })).toHaveText('Denim, day after day');
      await page.keyboard.press('ArrowLeft');
      await expect(dialog.getByRole('heading', { level: 2 })).toHaveText('An easy shirt day');
      await expect(dialog.getByRole('link', { name: /Ask the shop/ })).toHaveAttribute('href', 'tel:+918176091991');
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
      await expect(opener).toBeFocused();
    });
    await check('All six categories have content and unknown routes recover', async () => {
      for (const slug of ['suits', 'girls-wear', 'shirts', 'denim', 'innerwear', 'basics']) {
        await page.goto(`${baseURL}/collection/${slug}`);
        await expect(page.locator('.style-card')).toHaveCount(1);
      }
      await page.goto(`${baseURL}/collection/unknown`);
      await expect(page.getByRole('heading', { level: 1 })).toContainText('way back.');
      await page.goto(`${baseURL}/missing-page`);
      await expect(page).toHaveTitle(/Page not found/);
    });
    await check('Shop page and verified contact/map targets', async () => {
      await page.goto(`${baseURL}/our-shop`);
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Your neighbourhood.');
      await page.goto(`${baseURL}/visit`);
      await expect(page.locator('address')).toContainText('Maharshi Balmiki Nagar');
      await expect(page.locator('address')).toContainText('209217');
      await expect(page.locator('.contact-phone')).toHaveAttribute('href', 'tel:+918176091991');
      await expect(page.getByRole('link', { name: 'Get directions', exact: true }).first()).toHaveAttribute('href', 'https://www.google.com/maps/dir/?api=1&destination=26.601928%2C80.272251');
      await expect(page.locator('iframe')).toHaveAttribute('src', /26\.601928,80\.272251/);
      await expect(page.locator('.contact-instagram a')).toHaveAttribute('href', 'https://www.instagram.com/meetu_clothes/');
      await page.screenshot({ path: path.join(output, 'visit-desktop.png'), fullPage: true });
    });
    await check('Address copy provides feedback', async () => {
      await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
      await page.getByRole('button', { name: 'Copy address' }).click();
      await expect(page.getByRole('status')).toHaveText('Address copied');
      expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('26.601928, 80.272251');
    });
    await check('Mobile navigation, Escape and same-route dismissal', async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(baseURL);
      await page.getByRole('button', { name: 'Open menu' }).click();
      await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
      await page.getByRole('button', { name: 'Open menu' }).click();
      await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Collection' }).click();
      await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
      await page.getByRole('button', { name: 'Open menu' }).click();
      await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Collection' }).click();
      await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
    });
    await check('Responsive home, collection and visit layouts', async () => {
      for (const width of [360, 390, 768, 1280]) {
        await page.setViewportSize({ width, height: 900 });
        for (const route of ['/', '/collection', '/visit']) {
          await page.goto(`${baseURL}${route}`);
          await noOverflow(page);
        }
      }
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(baseURL);
      await scrollImages(page);
      await page.screenshot({ path: path.join(output, 'home-mobile.png'), fullPage: true });
    });
    await check('Reduced motion uses a complete static hero', async () => {
      const reduced = await browser.newPage({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
      await reduced.goto(baseURL, { waitUntil: 'networkidle' });
      await reduced.waitForTimeout(900);
      await expect(reduced.locator('.hero-canvas canvas')).toHaveCount(0);
      await expect(reduced.locator('.hero-still')).toBeVisible();
      await expect(reduced.locator('.still-model img')).toHaveAttribute('src', '/images/hero-photo.jpg');
      await reduced.close();
    });
    await check('Failed clothing photos fall back to local illustrations', async () => {
      const fallback = await browser.newPage();
      await fallback.route('**/images/*.jpg', route => route.abort());
      await fallback.goto(`${baseURL}/collection`, { waitUntil: 'networkidle' });
      await scrollImages(fallback);
      const sources = await fallback.locator('.style-image img').evaluateAll(images => images.map(img => img.currentSrc));
      expect(sources.every(src => src.endsWith('.svg'))).toBe(true);
      await fallback.close();
    });
    await check('Unsupported WebGL retains a usable homepage', async () => {
      const fallback = await browser.newPage();
      await fallback.addInitScript(() => {
        const original = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (type, ...args) {
          if (String(type).includes('webgl')) return null;
          return original.call(this, type, ...args);
        };
      });
      await fallback.goto(baseURL, { waitUntil: 'networkidle' });
      await fallback.waitForTimeout(1000);
      await expect(fallback.locator('.hero-still')).toBeVisible();
      await expect(fallback.getByRole('link', { name: 'Explore the collection', exact: true })).toBeVisible();
      await fallback.close();
    });
    await check('No uncaught application errors', async () => { expect(errors).toEqual([]); });
    console.log(`\n${passed} browser checks passed. Screenshots: ${output}`);
    console.log('Google Maps iframe/network response is external; tests verify location targets rather than map service availability.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
