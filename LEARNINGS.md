# Learnings

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
