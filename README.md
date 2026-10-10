# Meetu Clothes

A complete React clothing showcase for Meetu Clothes in Bithoor, Kanpur. The site helps visitors browse clothing categories, explore style inspiration and visit/contact the physical shop. There is no cart, checkout, payment integration, account system or database.

## Requirements and setup

Install Node.js 24 (24.19.0 is pinned in `.nvmrc`) and Git, then run these commands on your computer:

```sh
git clone https://github.com/anmolgupta22/Meetu-Clothes-Shop.git
cd Meetu-Clothes-Shop
npm ci
npm run dev -- --strictPort
```

Keep the terminal open and open the local address printed by Vite in your browser. The development server listens on port 3001. Stop an existing server only if you started it and have verified it belongs to this project. To use another port, run `npm run dev -- --port 3002 --strictPort`. See [LOCAL_START.md](LOCAL_START.md) for more details.

## Build and production preview

```sh
npm run build
npm run preview -- --strictPort
```

Stop your development server before starting the preview on the same port. The production output is `dist/`. Deploy it on a static host with an SPA fallback: requests for application routes such as `/collection/denim` must return `index.html`, while existing image, font and script assets must be served normally. Public deployment has not been performed.

## Browser checks

With a development or preview server already running:

```sh
npm run test:e2e
```

The checks use `/usr/bin/chromium` when available, otherwise Playwright's installed Chromium. On a different machine, install Playwright's browser through `npx playwright install chromium`, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to a compatible installed Chromium executable. Set `TEST_BASE_URL` when testing a different server/port. Do not disable TLS verification to access external services.

The suite exercises home/3D rendering, search, empty states/reset, all category routes, refresh/back navigation, gallery keyboard controls and focus restoration, contact/directions targets, address copying, mobile menu behavior, responsive widths (360, 390, 768, 1280 pixels), reduced motion, failed-image fallbacks and unavailable WebGL. Screenshots are saved in the ignored `test-results/` directory. The suite validates Google Maps URLs and coordinates; it does not establish the external map service's availability.

## Website structure

- `/`: home, layered 3D fashion display, categories, featured styles and shop introduction.
- `/collection`: searchable style gallery with category navigation.
- `/collection/:slug`: suits, girls-wear, shirts, denim, innerwear or basics.
- `/our-shop`: the local shop introduction.
- `/visit`: address, phone, Instagram, Google Maps and directions.
- Unknown routes show a helpful recovery page.

React Router handles navigation. React Three Fiber/Three.js render the lazy-loaded hero with local image textures. The scene pauses offscreen and when the tab is hidden. A static display remains available for reduced motion, unsupported WebGL and scene-loading errors. Fonts, photographs and fallback illustrations are bundled locally. Smaller image variants serve category cards and mobile layouts. The map and outbound contact links require the visitor's internet connection.

## Updating shop content

Edit `src/data/shop.js` for the phone, address, Instagram and map coordinates. Keep the structured business data in that file consistent with those changes. The confirmed phone number is +91 81760 91991. Opening hours and WhatsApp availability have not been supplied, so the site invites visitors to call and does not advertise WhatsApp.

Edit `src/data/collection.js` for categories and gallery entries. Each style has a stable ID, category, title, description/tags, image, thumbnail, image width, fallback illustration and image source. Keep thumbnails' width descriptors accurate when replacing files. Place actual shop-owned clothing photos under `public/images/`, then update the corresponding data entries. For owner-supplied inventory photos, also update the inspiration labels and notice in `StyleCard.jsx`, `Gallery.jsx`, `Home.jsx` and `Collection.jsx` to accurately describe the new content. Do not invent prices, sizes, availability or opening hours.

The existing pictures are stock style inspiration, not verified inventory or shop photographs. See `ASSET_CREDITS.md` for their sources. Innerwear uses an original garment illustration. The contact page can be used without the map iframe by opening the directions link or calling the shop.

## Cloud environment

Use this existing checkout; cloud tasks are already isolated and do not need a Git worktree. Dependencies and build outputs can be retained in the environment snapshot, but the Vite server must restart in new tasks. Reusable installation and startup instructions are saved separately in the cloud environment draft. Saving a draft does not publish the environment or deploy the website.

For this cloud workspace, install dependencies from `/workspace/Meetu-Clothes-Shop` with `NPM_CONFIG_CACHE=/tmp/meetu-npm npm ci --no-audit --no-fund`, then use the same development command above.
