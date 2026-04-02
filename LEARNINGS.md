# Learnings

## Mobile Viewport & Browser UI

### `vh` vs `svh` vs `dvh` vs `lvh`

- **`100vh`** on iOS equals the **large viewport** (browser UI hidden). Fixed, doesn't change dynamically. Causes content to overflow when browser UI is visible.
- **`100svh`** (small viewport height) — viewport with all browser UI **visible**. Fixed and stable. Best for hero sections and layout containers where you don't want resizing.
- **`100dvh`** (dynamic viewport height) — tracks the actual viewport in real-time as browser UI shows/hides. **Causes content jumping** because elements actively resize during scroll. Avoid for layout elements.
- **`100lvh`** (large viewport height) — equivalent to what `100vh` has always meant. Use for modals/overlays that should cover the full screen.

**Rule of thumb:** Use `svh` for layout stability. Use `dvh` only for static app shells. Never use `dvh` on animated or transitioning elements.

### `html { height: 100% }` is dynamic on mobile

On mobile browsers, `height: 100%` on `html` resolves to the **dynamic viewport** — it changes when the URL bar appears/disappears. This propagates down through `body` (`min-height: 100%`) and causes content to jump. Remove percentage-based height chains on `html`/`body` when using `svh`/`dvh` units on the root container.

### The `position: fixed` wrapper trick

To prevent mobile browser UI (URL bar, bottom nav) from hiding/showing during scroll:

```css
#__next {
  position: fixed;
  inset: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
```

The browser only hides/shows its UI based on **document-level scrolling**. Overflow scrolling inside a fixed container is not detected as document scrolling, so the browser UI stays permanently visible. No hiding = no resizing = no content jumping.

**Side effects that must be handled:**

1. **Flex children compress** — Add `flex-shrink: 0` to all direct children (`& > * { flex-shrink: 0; }`) to prevent content from being squeezed into the viewport height.
2. **`window.scrollY` is always 0** — Any scroll detection (e.g., header background on scroll) must listen to the container's `scrollTop` instead of `window.scrollY`.
3. **Scroll position persists across routes** — The browser doesn't auto-reset scroll for non-document containers. Manually reset `container.scrollTop = 0` on route change.
4. **`position: fixed` children still work** — A `position: fixed` parent does NOT create a new containing block for fixed children (unlike `transform` or `filter`). Fixed headers inside the container still position relative to the viewport.

### `overscroll-behavior-y: none`

Prevents rubber-band overscroll on iOS that can reveal the body background below the footer. Supported in iOS Safari 16+. Does NOT prevent the URL bar from hiding/showing — only prevents the bounce effect.

### `viewport-fit=cover` + `env(safe-area-inset-bottom)`

Required for notched iPhones (X and later). `env(safe-area-inset-bottom)` values are always `0px` unless `viewport-fit=cover` is set in the viewport meta tag:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

```css
footer {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
```

---

## Framer Motion Animations

### Negative viewport margins break on small screens

Framer Motion's `viewport={{ margin: "-300px" }}` shrinks the intersection detection zone by 300px on all sides. On an iPhone with ~700-850px viewport height, `-300px` means the element must be 300px inside the viewport before the animation triggers — often 35-40% of the screen. The animation may never fire if the user scrolls past naturally.

**Fix:** Remove negative viewport margins entirely. Use `viewport={{ once: true }}` without a margin. Animations trigger as soon as elements enter the viewport, which works on every screen size.

### `whileInView` with fixed scroll containers

Framer Motion's `whileInView` uses `IntersectionObserver` with the document viewport as root by default. When using the `position: fixed` wrapper trick, the scroll happens inside the container, but elements still move in and out of the document viewport — so `IntersectionObserver` still works correctly.

---

## Lenis Smooth Scroll

### Lenis amplifies content jumping on mobile

Lenis uses `window.innerHeight` for scroll calculations. On mobile, `window.innerHeight` changes dynamically when the browser UI appears/disappears. This causes Lenis to recalculate scroll limits mid-animation, producing visible content jumps.

**Fix:** Disable Lenis on touch devices. Native iOS/Android scrolling is already smooth and handles dynamic browser UI correctly.

```javascript
const isTouch = window.matchMedia("(pointer: coarse)").matches;
if (isTouch) return; // skip Lenis initialization
```

`pointer: coarse` targets touch devices (phones/tablets). Laptops with touchscreens still match `pointer: fine` (primary pointer is mouse/trackpad) and get Lenis.

### Lenis CSS overrides

Lenis sets `html.lenis, html.lenis body { height: auto; }` which overrides any `height` set on `html`/`body` in global styles. Be aware of this when debugging height issues.

---

## Resend Email API

### From address must match verified domain exactly

If your Resend domain is `bdcs.me`, you can only send from `*@bdcs.me`. Sending from `*@send.bdcs.me` returns a 403 error — subdomains must be separately verified. The error message explicitly states which domain is unauthorized.

---

## CSS Transitions

### Gradient-to-transparent transitions

`transition: all` on `background` between a `linear-gradient(...)` and `transparent` may not animate smoothly across all browsers. Some browsers fade the gradient smoothly, others snap. For guaranteed smooth transitions, consider using `opacity` on a pseudo-element with the gradient instead of transitioning the gradient itself.

---

## General Mobile Web Development

### Always test on real devices

Chrome DevTools mobile emulation does NOT simulate:
- Dynamic browser UI (URL bar hide/show)
- Safe area insets
- `overscroll-behavior` effects
- Touch-specific scroll behaviors
- Actual viewport height variations across different phone models

### Different phones, different viewport heights

Phone screens vary significantly in height. A viewport margin or min-height that works on an iPhone 15 Pro Max (932px) may fail completely on an older or smaller phone (~700px). Design animations and layouts to work without assumptions about available viewport height.

---

## Performance Optimizations

### Starting Point

- Lighthouse Performance Score: **46/100** (dev mode) -> **96/100** (production build)
- The initial 46 score was misleading — it was measured against `next dev`, which serves unminified bundles

### Root Causes & Fixes

#### 1. Babel Forcing SWC Off (Biggest Impact)

**Problem:** A `.babelrc` file existed solely to configure `babel-plugin-styled-components`. Its presence disabled Next.js's SWC compiler entirely — no SWC minification, no SWC optimizations, producing unminified 5MB+ bundles.

**Fix:**
- Deleted `.babelrc`
- Added `compiler.styledComponents` to `next.config.js` (SWC's built-in equivalent)
- Enabled `swcMinify: true`
- Removed `babel-plugin-styled-components` from dependencies

**Result:** Bundle sizes dropped ~93% (main.js: 1,259KB -> 32.9KB, _app.js: 802KB -> 65KB)

#### 2. Team Images in Shared Bundle

**Problem:** `lib/constants.tsx` statically imported 39 team member WebP photos (5.6MB total). Because it also exported `QUERIES` and `WHY_CHOOSE_US` used by other pages, all 39 images got bundled into the shared `_app.js` chunk — loading on every page.

**Fix:**
- Created `lib/team-data.ts` with the image imports and `OUR_TEAM` export
- Cleaned `constants.tsx` to only contain `WHY_CHOOSE_US`
- Removed dead exports (`QUERIES` duplicated in `lib/theme.ts`, `ABOUT_US` never imported)

#### 3. ES5 TypeScript Target

**Problem:** `tsconfig.json` targeted `es5`, generating unnecessary polyfills for async/await, classes, generators, etc. Lighthouse identified 11KB of legacy JavaScript.

**Fix:** Changed `"target": "es5"` to `"target": "es2017"` in `tsconfig.json`

#### 4. Render-Blocking Google Fonts

**Problem:** Google Fonts loaded via a `<link>` stylesheet in `_document.tsx`, blocking rendering for 807ms while the browser fetched CSS from Google's servers.

**Fix:** Self-hosted the Alexandria font files:
- Downloaded woff2 files to `public/fonts/`
- Created `styles/fonts.css` with `@font-face` declarations
- Imported `fonts.css` in `_app.tsx` (Next.js handles this synchronously in dev and prod)
- Added `<link rel="preload">` for the latin woff2 in `_document.tsx`
- Removed the Google Fonts `<link>` tags from `_document.tsx`

**Important learning:** `next/font/google` was initially attempted but has fundamental issues with styled-components in the Pages Router:
- `next/font` generates hashed font-family names (e.g. `__Alexandria_1cd4ef`) incompatible with styled-components' static theme references
- In dev mode, `next/font` injects `@font-face` rules via JavaScript (not SSR), causing font flash
- The CSS variable approach (`var(--font-alexandria)`) didn't work because styled-components' `createGlobalStyle` sets `font-family` on `body`, but the variable was only defined on a child element

The plain CSS file approach (`styles/fonts.css` imported in `_app.tsx`) works identically in dev and prod because Next.js processes CSS imports synchronously in both modes.

#### 5. Legacy Image Component

**Problem:** All pages used `next/legacy/image` (deprecated) instead of `next/image`.

**Fix:** Migrated 6 files from `next/legacy/image` to `next/image`:
- `layout="fill" objectFit="cover"` -> `fill style={{ objectFit: "cover" }}`
- `layout="responsive"` -> `sizes="..." style={{ width: "100%", height: "auto" }}`

#### 6. Dynamic Import for TeamMemberModal

**Problem:** `TeamMemberModal` imports framer-motion's `AnimatePresence` and `motion`, adding to the our-team page's initial bundle even though the modal only opens on click.

**Fix:** Used `next/dynamic` with `{ ssr: false }` to lazy-load the modal component.

### Build Results

| Metric | Before | After |
|--------|--------|-------|
| First Load JS (shared) | ~2,100+ KB | **145 KB** |
| `main.js` | 1,259 KB | **32.9 KB** |
| `_app.js` | 802 KB | **65.4 KB** |
| Home page total | ~2,100+ KB | **153 KB** |

### Files Changed

- `.babelrc` — deleted
- `next.config.js` — added `compiler.styledComponents`, enabled `swcMinify`
- `package.json` — removed `babel-plugin-styled-components`
- `tsconfig.json` — target `es5` -> `es2017`
- `lib/constants.tsx` — removed image imports, dead exports; only contains `WHY_CHOOSE_US`
- `lib/team-data.ts` — new file with team image imports and `OUR_TEAM` export
- `lib/theme.ts` — no changes (font family stayed as `'Alexandria', sans-serif`)
- `lib/globalStyles.tsx` — no changes (font loaded via CSS file instead)
- `styles/fonts.css` — new file with self-hosted `@font-face` declarations
- `public/fonts/alexandria-latin.woff2` — self-hosted font file (latin subset)
- `public/fonts/alexandria-latin-ext.woff2` — self-hosted font file (latin-ext subset)
- `pages/_app.tsx` — imports `fonts.css`, removed `next/font/google`
- `pages/_document.tsx` — removed Google Fonts `<link>`, added font preload
- `pages/index.tsx` — `next/image` migration
- `pages/about/index.tsx` — `next/image` migration
- `pages/our-team/index.tsx` — `next/image` migration, team-data import, dynamic TeamMemberModal
- `pages/why-choose-us/index.tsx` — `next/image` migration
- `components/Header.tsx` — `next/image` migration
- `components/TeamMemberModal.tsx` — `next/image` migration

---

## Testing Recommendations

### Always Benchmark Against Production Builds

**Never run Lighthouse against `next dev`.** Dev mode serves unminified bundles (often 10-15x larger), includes React development warnings, HMR code, and `react-refresh` — all of which destroy performance scores.

```bash
# Correct way to benchmark
next build && next start
# Then run Lighthouse against localhost:3000
```

In this project, the same code scored **46** in dev mode vs **96** in production. The difference:
- Dev: `main.js` = 1,189 KB, `_app.js` = 800 KB (unminified, with dev tooling)
- Prod: `main.js` = 32.9 KB, `_app.js` = 65.1 KB (minified by SWC)

### How to Spot Dev Mode in Lighthouse Reports

Look for these signs in the Lighthouse JSON:
- URLs with `?ts=` query parameters (Next.js dev cache-busting)
- `scheduler.development.js` in bootup-time breakdown
- `react-refresh.js` in network requests
- Transfer sizes matching unminified bundle sizes (hundreds of KB per chunk)

### Lighthouse Scoring Weights (v13)

| Metric | Weight | What it measures |
|--------|--------|------------------|
| TBT | 30% | Main thread blocking (JS parse/eval) |
| LCP | 25% | Largest visible element render time |
| CLS | 25% | Visual stability |
| SI | 10% | How quickly content is visually populated |
| FCP | 10% | First paint of any content |

TBT + LCP account for 55% of the score — both are dominated by JavaScript bundle size on throttled connections.
