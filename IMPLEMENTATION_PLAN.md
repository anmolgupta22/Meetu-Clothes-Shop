# Meetu Clothes — React redesign plan

## Goal

Create a modern, responsive clothing showcase that helps visitors understand the shop's clothing range, explore designs, contact the shop and get directions. Preserve the owner's decision to sell in the physical shop: no cart, checkout or online payments.

The current site is static HTML/CSS with illustrative photos and contact information. Replace it with a React application while retaining the verified shop information below.

## Confirmed shop information

- Shop: Meetu Clothes, Bithoor, Kanpur.
- Address supplied by owner: Maharshi Balmiki Nagar, Subedar Nagar, Uttar Pradesh 209217.
- Phone: +91 81760 91991.
- Location: 26.601928, 80.272251.
- Instagram: https://www.instagram.com/meetu_clothes/.
- Categories: women's suits, girls' wear, shirts, jeans and trousers, innerwear and everyday essentials.
- Opening hours, individual products, prices and live stock have not been supplied.
- Use the number for calls. Add WhatsApp only after the owner confirms that the number supports it.

## Visual direction

Use a fashion editorial layout with warm ivory backgrounds, charcoal text, a restrained deep green accent, large typography, generous spacing and strong clothing photography. Give mobile visitors clear category choices and readily accessible contact and directions actions.

The hero will feature a small interactive 3D display with floating fashion image panels, soft lighting and gentle movement. Use this as a display of style inspiration, rather than suggesting that a stock image or model represents an item currently available in the shop. Collection cards will use restrained CSS depth and hover effects. Touch devices must not depend on hovering. Keep text and navigation in accessible HTML outside the 3D canvas.

Load the 3D scene separately from the main page. Limit scene complexity and pixel density, stop rendering when offscreen, and provide a static image fallback for reduced motion, unsupported WebGL or failed loading. Avoid autoplay video, forced scrolling and continuous animation throughout the site.

## Visitor experience

1. **Home:** shop introduction, 3D hero, clothing categories, a featured style gallery and clear Explore / Visit actions.
2. **Collection:** image grid with category filters and a search box. Filters operate on real available content, with useful empty states and an accessible reset action.
3. **Category views:** dedicated views for suits, girls' wear, shirts, denim/trousers and essentials, with descriptions and an image gallery. Clearly distinguish inspiration from verified shop photos.
4. **Image details:** accessible gallery dialog with larger images, previous/next controls, keyboard support and a contact action referencing the selected design. Include sizes, fabrics or prices only if supplied by the shop.
5. **Our shop:** local introduction and a place for actual storefront/interior photographs.
6. **Visit and contact:** full address, call link, Instagram link, lazy-loaded map and Google Maps directions using the supplied coordinates. Invite visitors to call for hours until hours are confirmed.
7. **Navigation:** mobile menu, clear active states, working browser back/forward navigation, footer and useful unknown-route handling.

Start with English copy and familiar category labels. Structure content so Hindi translations can be added without rewriting the components.

## Technical implementation

- React and Vite for development and production builds.
- React Router for shareable collection/category and contact routes.
- Plain CSS with shared design tokens, Grid/Flexbox layouts and responsive breakpoints.
- Three.js, React Three Fiber and Drei for the small lazy-loaded hero scene.
- Use CSS transitions and IntersectionObserver for simple entrance effects; avoid a second animation framework unless a concrete feature needs it.
- Store shop information and collection content in separate local data modules. Include image source, alt text, category and whether an image is inspiration or verified inventory.
- Serve optimized images with responsive sizes; prioritize the hero image and lazy-load later images and the map.
- No database, account system or admin dashboard is needed for the initial showcase. Document the process for updating content.
- Add page metadata, social sharing metadata and truthful local business structured data. Include confirmed opening hours only when supplied.

## Implementation sequence

1. **Foundation:** scaffold React/Vite, add scripts and lockfile, define routes and data modules, establish CSS tokens and responsive layout primitives.
2. **Core website:** build navigation, homepage, category browsing, gallery details, shop introduction and contact/map page. Confirm all interactions work before adding animation.
3. **3D and polish:** build the hero scene and static fallback, add subtle card depth and entrance motion, optimize mobile layout and reduced-motion behavior.
4. **Validation:** run the production build and preview; test search/filter/reset, category routing, browser back navigation, gallery keyboard controls, mobile menu, telephone and map targets. Check mobile overflow, missing images, console errors, keyboard navigation, color contrast and 3D fallbacks. Browser testing requires an installed browser; the earlier download was blocked by network policy.
5. **Handoff:** update README and cloud startup instructions for Vite, verify the saved commands, and prepare the production output for static hosting. Public deployment is a separate step and needs the chosen hosting destination.

## Completion criteria

- Visitors can identify every confirmed clothing category and browse its content.
- Contact and directions are available on desktop and mobile.
- Pages remain usable while 3D or external images are unavailable.
- No invented prices, stock availability, opening hours, reviews or business claims.
- Product imagery remains visibly illustrative until actual inventory photos are supplied.
- Production build succeeds and functional checks are completed with any remaining test limitations reported.
- Setup and startup documentation reflect React rather than the former static server.

## Content to add when available

Actual clothing photos, shop exterior/interior photos, logo and confirmed opening hours. These can improve the finished website without blocking the React implementation. Confirm WhatsApp before presenting it as a contact method. The React redesign is now implemented. See README.md for the current workflow and content update instructions.
