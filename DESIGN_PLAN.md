# Design Implementation Plan: Footer

## Summary
- **Scope:** Component redesign
- **Target:** `components/Footer.tsx`
- **Winner variant:** E (Expressive Brand — full hero treatment)
- **Key improvements:** Dark gradient background matching hero, SVG texture + gold radial overlays, decorative BDCS watermark, 4-column grid with gold section labels, social media links (LinkedIn + Instagram), scroll-triggered fade-up animations, bottom bar with locations and copyright

## Design Direction
The footer becomes a natural extension of the homepage hero — same dark gradient, texture overlays, and gold accents. A large decorative "BDCS" watermark adds brand depth. The 4-column grid provides clear information hierarchy (Company, Services, Pages, Contact), while a bottom bar cleanly separates social links, locations, and copyright.

## Files to Change
- [ ] `components/Footer.tsx` — Complete rewrite with new design

## Implementation Steps

### 1. Footer Wrapper & Background Layers
- Replace current `rgba(1,24,73,0.95)` backdrop-filter background with full gradient: `linear-gradient(180deg, ${colors.primary.darker} 0%, ${colors.primary.main} 50%, ${colors.primary.dark} 100%)`
- Add SVG cross-hatch texture overlay at 2.5% opacity (absolute positioned, pointer-events: none)
- Add radial gradient gold overlay: `radial-gradient(ellipse at 50% 0%, rgba(174,151,81,0.06) 0%, transparent 70%)`
- Add decorative "BDCS" watermark: 18rem font, 3% opacity, positioned bottom-right, `aria-hidden="true"`
  - Responsive: 12rem on tablet, 7rem on mobile
- Add full-width 2px gold gradient line at top: `linear-gradient(90deg, transparent 0%, complimentary.main 20%, complimentary.light 50%, complimentary.main 80%, transparent 100%)`
- Set `overflow: hidden` on footer wrapper

### 2. Row 1: 4-Column Information Grid
- Max-width 1280px container, centered, padding `spacing[16]` top (spacing[12] on tablet)
- Grid: `1.3fr 1fr 1fr 1.2fr`, gap `spacing[10]`
  - Tablet: `1fr 1fr`, gap `spacing[8]`
  - Mobile: `1fr`, gap `spacing[10]`

**Column 1 — Company:**
- Gold section label: "Company" (uppercase, xs, semibold, widest tracking, `colors.complimentary.main`)
- Company name: 2xl, bold, white, tight line-height
- Tagline: sm, relaxed line-height, `gray400`, max-width 320px

**Column 2 — Services:**
- Gold section label: "Services"
- Link list: Audit & Assurance, Accounting Outsourcing, International Standards
- Links: sm, white, hover → `complimentary.light`

**Column 3 — Pages:**
- Gold section label: "Pages"
- Link list: Home, About Us, Why Choose Us, Our Team, Contact
- Same link styling as Services

**Column 4 — Contact:**
- Gold section label: "Contact"
- Email: sm, `complimentary.main`, hover → `complimentary.light`, margin-bottom spacing[4]
- Phone numbers: each with 2px gold left border (`complimentary.dark`), padding-left spacing[3]
- Phone links: sm, white, hover → `complimentary.light`

### 3. Row 2: Bottom Bar
- Separated by `border-top: 1px solid rgba(174,151,81,0.15)`
- Margin-top `spacing[12]`
- Flex row: social icons (left) | locations (center) | copyright (right)
  - Tablet/mobile: stack vertically, centered

**Social icons:**
- Inline SVG (LinkedIn + Instagram), 20x20px, fill: `complimentary.main`
- Hover: color → `complimentary.light`, scale 1.12
- Tap: scale 0.95
- Links: `target="_blank"`, `rel="noopener noreferrer"`, `aria-label` for each
- URLs: LinkedIn → `https://www.linkedin.com/company/bd-corporate-services/`, Instagram → `https://www.instagram.com/bd_corporate_services/`

**Locations:**
- "Podgorica, Montenegro" · gold dot · "Sarajevo, Bosnia and Herzegovina"
- xs size, `gray400`, wide letter-spacing

**Copyright:**
- xs size, `gray500`

### 4. Animations
- Each grid column: `motion.div` with `whileInView="visible"` and staggered custom delay (`custom={0}` through `custom={3}`)
- fadeUp variant: `{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: [0.4, 0, 0.2, 1] } } }`
- `viewport={{ once: true, amount: 0.3 }}`
- Social icons: `motion.a` with `whileHover={{ scale: 1.12 }}`, `whileTap={{ scale: 0.95 }}`

## SEO Considerations
- Use semantic `<footer>` element
- Keep all navigation links for crawlability
- Email with `mailto:` href for structured data
- Phone numbers with `tel:` hrefs
- Social links with proper `rel="noopener noreferrer"`
- Company name, locations, and services visible to crawlers (not hidden behind interactions)

## Accessibility Checklist
- [ ] Semantic `<footer>` element
- [ ] Decorative elements (`aria-hidden="true"`): watermark, texture overlay, gold overlays
- [ ] Social links have `aria-label` (e.g., "LinkedIn", "Instagram")
- [ ] Focus states: 2px solid `accent.main` with offset on all interactive elements
- [ ] Color contrast: white on #1A1849 = 14.7:1 (exceeds WCAG AAA)
- [ ] Gold on dark: `complimentary.main` #AE9751 on #1A1849 = 4.8:1 (meets WCAG AA)
- [ ] Touch targets: minimum 44x44px on social icon links
- [ ] Keyboard navigation: all links and social icons focusable and operable
- [ ] `prefers-reduced-motion`: respect by skipping framer-motion animations

## Design Tokens Used
All from existing `lib/theme.ts` — no new tokens needed:
- **Colors:** `primary.main/dark/darker`, `complimentary.main/light/dark`, `neutral.white/gray300-gray500`
- **Typography:** Alexandria font, `fontSize.xs/sm/2xl`, `fontWeight.semibold/bold`, `letterSpacing.widest/wide`, `lineHeight.tight/relaxed`
- **Spacing:** `spacing[2-16]`
- **Transitions:** `transitions.duration.fast`, `transitions.easing.easeInOut`
- **Media queries:** `mobileAndDown`, `tabletAndDown`

## Testing Checklist
- [ ] Visual comparison against Variant E design
- [ ] Responsive at mobile (375px), tablet (768px), laptop (1024px), desktop (1440px)
- [ ] Scroll animations trigger correctly
- [ ] Social link hover/tap effects work
- [ ] Link hover → gold transition on all links
- [ ] No horizontal overflow on any viewport
- [ ] Watermark doesn't overflow or cause scrollbar
- [ ] All links navigate correctly
- [ ] Lighthouse accessibility score >= 90

---

*Generated by Design Variations plugin*

---

# Design Implementation Plan: Navigation Bar

## Summary
- **Scope:** Component redesign
- **Target:** `components/Header.tsx`, `components/Menu.tsx`, `components/Burger.tsx`
- **Winner variant:** A (Hierarchy + CTA)
- **Key improvements:** Prominent "Get in Touch" CTA button, solid gold underline active page indicator, refined typography with letter-spacing, clear separation between navigation links and call-to-action, enhanced scroll state with stronger backdrop blur

## Design Direction
Variant A follows a Stripe-inspired information hierarchy approach. Navigation links sit in the center with subtle, letter-spaced typography. The active page gets a solid gold underline bar and semibold weight. A prominent accent-colored CTA button ("Get in Touch") is separated to the right, giving visitors a clear path to contact. The scroll transition uses stronger blur (12px) and the CTA adapts to complimentary gold tones.

## Files to Change
- [ ] `components/Header.tsx` — Refactor desktop nav with CTA separation, active indicator, and refined typography
- [ ] `components/Menu.tsx` — Update mobile menu to include CTA button and active state indicator
- [ ] `components/Burger.tsx` — No major changes needed, minor style tweaks if any

## Implementation Steps

### 1. Header — Desktop Navigation Refactoring

**Nav link styling:**
- Font size: `typography.fontSize.sm` (was `1rem`)
- Font weight: `typography.fontWeight.medium` (default), `semibold` for active
- Letter spacing: `typography.letterSpacing.wide`
- Color on transparent: `colors.neutral.gray600` (inactive), `colors.primary.main` (active)
- Color on scrolled: `rgba(255,255,255,0.8)` (inactive), `colors.neutral.white` (active)

**Active page indicator:**
- `::after` pseudo-element on each `ListItem`
- 2px height bar, positioned at bottom
- Color: `colors.accent.main` (transparent state), `colors.complimentary.main` (scrolled state)
- `transform: scaleX(1)` when active, `scaleX(0)` when inactive
- `transform-origin: center` for centered animation
- On hover: `scaleX(1)` with `transition: transform 0.25s ease-out`

**Determining active state:**
- Use `useRouter()` from `next/router` to get `router.pathname`
- Compare against each nav link's `href`
- Pass `$active` transient prop to `ListItem`

### 2. Header — CTA Button

**Separate "Contact" from nav links:**
- Remove "Contact" from the regular nav link list
- Add a styled CTA button to the right side: `<Button variant="accent">Get in Touch</Button>`
- Or create a dedicated `CTAButton` styled component:
  - `padding: spacing[2] spacing[5]`
  - `border-radius: borderRadius.lg`
  - `background-color`: `colors.accent.main` (transparent), `colors.complimentary.main` (scrolled)
  - `color: colors.neutral.white`
  - `font-weight: typography.fontWeight.semibold`
  - `font-size: typography.fontSize.sm`
  - Hover: lighter background + `shadows.accentGlow`
  - Motion: `whileHover={{ scale: 1.03 }}`, `whileTap={{ scale: 0.97 }}`
  - Min-height: 40px
  - `focus-visible`: 2px solid accent outline with 3px offset

**Layout restructure:**
- Wrapper keeps `justify-content: space-between`
- Left: Logo
- Center: Nav links (Home, About Us, Why Choose Us, Our Team)
- Right: CTA button + mobile burger (wrapped in a flex container with `gap: spacing[4]`)

### 3. Header — Scroll State Enhancements

- Increase backdrop blur: `blur(12px) saturate(180%)` (was `blur(10px) saturate(180%)`)
- Background: `rgba(1, 24, 73, 0.97)` (was `0.95` — slightly more opaque)
- Transition timing: `all 0.35s ease-in-out` (was `0.3s`)

### 4. Mobile Menu — CTA & Active State

**Add CTA to mobile menu:**
- Add "Get in Touch" button at the bottom of the mobile menu link list
- Style as full-width accent button with `spacing[4]` top margin
- Links to `/contact`

**Add active state to mobile links:**
- Use `useRouter()` to determine active page
- Active link: `colors.complimentary.main` color, `fontWeight.semibold`
- Inactive: existing white + medium weight

### 5. Hide Contact from Desktop Nav Links Only

- Keep all 5 links in mobile menu (Home, About Us, Why Choose Us, Our Team, Contact)
- Desktop shows 4 links + CTA button
- The CTA button links to `/contact`, so the dedicated Contact link is not needed on desktop

## Component API (unchanged)
- **Header:** No props, self-contained with internal scroll and menu state
- **Menu:** `{ open: boolean; setOpen: (open: boolean) => void }`
- **Burger:** `{ open: boolean; setOpen: (open: boolean) => void; isScrolled?: boolean }`

## Required UI States
- **Default (transparent):** Dark text on transparent background
- **Scrolled:** White text on blurred dark background, gold CTA adapts
- **Active page:** Gold underline bar + semibold weight
- **Hover:** Link color brightens, underline scales in, CTA background lightens
- **Focus-visible:** 2px solid accent outline with offset
- **Mobile open:** Full-screen overlay with CTA at bottom
- **Mobile closed:** Burger icon visible

## Accessibility Checklist
- [ ] Active page indicator visible (not color-only — uses underline bar)
- [ ] CTA button has `focus-visible` ring
- [ ] All nav links keyboard focusable and operable
- [ ] Mobile menu Escape key handling (already exists)
- [ ] `aria-current="page"` on active nav link
- [ ] Touch targets: 44px minimum (CTA min-height 40px + padding)
- [ ] Color contrast: gold #695517 on white meets 4.5:1

## Design Tokens Used
All from existing `lib/theme.ts` — no new tokens needed:
- **Colors:** `primary.main`, `accent.main/light`, `complimentary.main/light`, `neutral.white/gray600`
- **Typography:** `fontSize.sm`, `fontWeight.medium/semibold`, `letterSpacing.wide`
- **Spacing:** `spacing[2-8]`
- **Shadows:** `shadows.accentGlow`
- **Border radius:** `borderRadius.lg`
- **Transitions:** `transitions.fast`

## Testing Checklist
- [ ] Active page indicator shows on each page
- [ ] CTA button hover/tap animations work
- [ ] Scroll transition smooth (transparent → filled)
- [ ] Responsive: CTA hidden on mobile, nav links hidden on tablet-down
- [ ] Mobile menu includes all 5 links + CTA
- [ ] No layout shift during scroll transition
- [ ] All links navigate correctly
- [ ] Keyboard navigation through all items works

---

*Generated by Design Variations plugin*

---

# Design Implementation Plan: Our Team Page

## Summary
- **Scope:** Full page + modal redesign
- **Target:** `pages/our-team/index.tsx`, `components/TeamMemberModal.tsx`
- **Winner variant:** B (Image Overlay)
- **Key improvements:** Immersive dark hero section, full-bleed image cards with dark gradient overlay and name/role text, 3-column grid for larger visual impact, scroll-triggered animations, premium modal redesign matching site's editorial feel

## Design Direction
Variant B uses full-bleed images as the primary visual element. Each card fills entirely with the member's photo, and a persistent dark gradient overlay from the bottom reveals name and role. On hover, the image subtly scales. The 3-column layout (vs current 4) gives each member more visual presence — appropriate for a 40-person team that values individual visibility. The page gains an immersive dark hero matching About and Why Choose Us pages.

## Files to Change
- [ ] `pages/our-team/index.tsx` — Complete rewrite with new design
- [ ] `components/TeamMemberModal.tsx` — Redesign to match premium editorial feel

## Implementation Steps

### 1. Page Structure — Replace Layout Wrapper with PageWrapper

Replace the `<Layout>` wrapper with a `PageWrapper` matching other redesigned pages:

```
PageWrapper = styled(motion.main)
  - width: 100%
  - overflow-x: hidden
  - font-family: typography.fontFamily.primary
  - margin-top: -112px (negate #__next padding-top)
  - @768px: margin-top: -96px
  - @550px: margin-top: -72px
```

Add `motion` page fade-in: `initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}`

### 2. Hero Section — Immersive Dark Background

Follow the same pattern as About and Why Choose Us pages:

**HeroSection:**
- `position: relative`, `width: 100%`, `height: 100vh`, `min-height: 600px`
- `display: flex`, `align-items: flex-end`
- `background: colors.primary.darker`
- Mobile: `min-height: 500px`, `height: 100svh`

**Optional hero image:** Use an existing asset (e.g., `carousel4.webp` or `about.webp`) or a dark gradient-only hero. If using an image:
- `HeroImageWrapper`: absolute inset, z-index 0
- `next/legacy/image` with `layout="fill"`, `objectFit="cover"`, `priority`

**HeroOverlay:**
- Dark gradient: `linear-gradient(180deg, rgba(10,8,25,0.55) 0%, rgba(10,8,25,0.65) 40%, rgba(10,8,25,0.82) 75%, rgba(10,8,25,0.94) 100%)`
- z-index 1

**HeroGoldGlow:**
- Radial gradient overlay: `radial-gradient(ellipse 60% 50% at 70% 60%, rgba(174,151,81,0.06) 0%, transparent 70%)`
- z-index 2, pointer-events none

**HeroTexture:**
- SVG cross-plus pattern at 2.5% opacity
- z-index 2, pointer-events none

**HeroContent (bottom-left):**
- z-index 3, `padding: 0 spacing[12] spacing[12]`
- Gold line: 80px x 2px, `colors.complimentary.main`, scaleX animation
- Heading: `clamp(2.5rem, 5.5vw, fontSize.7xl)`, bold, white, max-width 700px
- Tagline: `fontSize.lg`, light weight, `gray300`, max-width 520px
  - Text: "40+ professionals with Big 4 expertise, dedicated to delivering excellence."

**Animations:**
- `useRef` + `useInView` on HeroSection
- Heading: fadeUp variant
- Gold line: scaleX from 0, delay 0.2
- Tagline: fadeUp with delay 0.25

### 3. Team Grid — Full-Bleed Image Overlay Cards

**Grid container:**
```
TeamGrid = styled.div
  - display: grid
  - grid-template-columns: repeat(3, 1fr)
  - gap: spacing[5]
  - max-width: 1200px
  - margin: 0 auto
  - padding: spacing[24] spacing[8]
  - @tabletAndDown: repeat(2, 1fr), padding: spacing[16] spacing[6]
  - @mobileAndDown: display: none (replaced by mobile list)
```

**TeamCard:**
```
TeamCard = styled.div
  - position: relative
  - border-radius: borderRadius.lg
  - overflow: hidden
  - aspect-ratio: 3 / 4
  - cursor: pointer
  - background: colors.neutral.gray100

  &:hover .card-img { transform: scale(1.05) }
```

**Card image wrapper:**
```
CardImageWrap = styled.div
  - position: absolute, inset: 0
  - transition: transform 0.5s ease
  img { object-position: top center !important }
```

**Card overlay (always visible):**
```
CardOverlay = styled.div
  - position: absolute, inset: 0
  - display: flex, flex-direction: column, justify-content: flex-end
  - padding: spacing[6]
  - background: linear-gradient(180deg, transparent 50%, rgba(10,8,25,0.7) 100%)
```

**Card text:**
- Name: `fontSize.lg`, bold, white, `fontFamily.heading`
- Role: `fontSize.xs`, medium weight, `colors.complimentary.light`, uppercase, `letterSpacing.wider`

### 4. Mobile List — Keep Existing Pattern

Preserve the existing mobile-only `TeamList` component with rows:
- Hidden on desktop/tablet (`display: none`, shown on `mobileAndDown`)
- Rows with name + role + chevron icon
- Hover state: dark background, white name, gold role
- Same click-to-modal behavior

### 5. Team Grid Animations

**Stagger container on grid:**
```
staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}
```

**Each card:**
- `motion.div` with fadeUp variant
- `whileInView="visible"`, `viewport={{ once: true, margin: "-50px" }}`

### 6. Modal Redesign — Premium Editorial Feel

**Backdrop:** Keep existing dark overlay (`rgba(0,0,0,0.75)`)

**ModalContainer redesign:**
- Background: `colors.neutral.white`
- `max-width: 960px`, `border-radius: borderRadius["2xl"]`
- Remove 3xl radius (too rounded for editorial feel)

**Modal layout — Side-by-side with image focus:**
- Grid: `400px 1fr` (desktop), `1fr` (tablet/mobile)
- Image takes up full left column, no rounded corners inside modal (flush with container left edge)
- Image aspect ratio: portrait (auto height, min-height 100%)

**Image section:**
- No border-radius (flush with modal left edge)
- `object-fit: cover`, `object-position: top center`
- Full height of modal content area

**Info section:**
- `padding: spacing[10] spacing[8]` (desktop), `spacing[6]` (mobile)
- Name: `fontSize["3xl"]`, bold, `colors.primary.main`
- Role: `fontSize.base`, medium, `colors.complimentary.dark`, italic
- Gold divider: 40px x 2px, `colors.complimentary.main`, `margin: spacing[5] 0`
- Bio: `fontSize.base`, `lineHeight.relaxed`, `colors.neutral.gray600`
- Contact section: keep existing layout but update to match theme

**Close button:**
- Move to top-right of info section (not overlapping image)
- Subtle circle: `40px`, `colors.neutral.gray100` bg, hover -> `gray200`
- No shadow

**Navigation:**
- Keep prev/next buttons
- Restyle: ghost buttons with border, gold hover state
- `border: 1px solid colors.neutral.gray200`
- Hover: `border-color: colors.complimentary.main`, `color: colors.complimentary.main`
- Position: bottom of modal, flex space-between

### 7. Animation Helpers

Reuse across the page:
```javascript
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};
```

## Required UI States
- **Card default:** Image visible, gradient overlay with name/role
- **Card hover:** Image scales 1.05, subtle transform
- **Mobile row default:** White background, dark text
- **Mobile row hover:** Dark background, white name, gold role
- **Modal open:** Smooth spring animation in
- **Modal close:** Fade + scale out
- **Modal nav:** Prev/next with disabled state at boundaries

## Accessibility Checklist
- [ ] Hero section: `aria-label="Team page hero"`
- [ ] Team grid: `aria-label="Team members"`
- [ ] Cards: `role="button"`, `tabIndex={0}`, `onKeyDown` for Enter/Space
- [ ] Card images: meaningful `alt` text (member name)
- [ ] Overlay text: sufficient contrast (white on dark gradient)
- [ ] Mobile rows: keyboard focusable
- [ ] Modal: focus trap, Escape to close, arrow key navigation
- [ ] Touch targets: cards are large (entire card clickable), mobile rows 44px+ height
- [ ] `prefers-reduced-motion`: respect by disabling scale/stagger animations

## Design Tokens Used
All from existing `lib/theme.ts` — no new tokens needed:
- **Colors:** `primary.main/dark/darker`, `complimentary.main/light/dark`, `neutral.white/gray100-gray600`
- **Typography:** Alexandria font, `fontSize.xs/base/lg/3xl/7xl`, `fontWeight.light/medium/semibold/bold`, `letterSpacing.tight/wide/wider`
- **Spacing:** `spacing[1-24]`
- **Shadows:** `shadows.base/lg/2xl`
- **Border radius:** `borderRadius.lg/2xl`
- **Transitions:** `transitions.default`, custom 0.5s ease for image scale
- **Media queries:** `mobileAndDown`, `tabletAndDown`

## Testing Checklist
- [ ] Hero section renders with dark gradient + gold accents
- [ ] 3-column grid on desktop, 2-column on tablet, list on mobile
- [ ] Card hover: image scales, no layout shift
- [ ] Card click opens modal with correct member
- [ ] Modal shows image flush-left, info right
- [ ] Modal prev/next navigation works + arrow keys
- [ ] Modal Escape closes
- [ ] Scroll animations trigger once
- [ ] Responsive at 375px, 550px, 768px, 1100px, 1440px
- [ ] No horizontal overflow on any viewport
- [ ] All team members (40) render correctly

---

*Generated by Design Variations plugin*

---

# Design Implementation Plan: Contact Page

## Summary
- **Scope:** Full page redesign
- **Target:** `pages/contact/index.tsx`
- **Winner variant:** D (Full Dark + Form Card)
- **Key improvements:** Immersive dark gradient background with cross-hatch texture, two-column layout with contact info left and white form card right, gold accent labels, consistent with site's premium editorial feel

## Design Direction
Variant D wraps the entire contact section in the site's signature dark gradient background (primary.darker to primary.main to primary.dark) with cross-hatch texture overlay. Contact information sits on the left with gold section labels and white text, while a white form card floats on the right with generous shadow. This creates a bold, immersive experience matching the hero sections of other pages.

## Files to Change
- [ ] `pages/contact/index.tsx` — Complete rewrite with new design

## Implementation Steps

### 1. Page Structure — Replace Layout Wrapper with PageWrapper

Replace the `<Layout>` wrapper with a `PageWrapper` matching other redesigned pages:

```
PageWrapper = styled(motion.main)
  - width: 100%
  - overflow-x: hidden
  - font-family: typography.fontFamily.primary
  - margin-top: -112px (negate #__next padding-top)
  - @768px: margin-top: -96px
  - @550px: margin-top: -72px
```

Add `motion` page fade-in: `initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}`

### 2. Full Dark Section — Immersive Background

**DarkSection:**
- `position: relative`, `overflow: hidden`, `min-height: 100vh`
- `display: flex`, `align-items: center`
- `background: linear-gradient(180deg, colors.primary.darker 0%, colors.primary.main 50%, colors.primary.dark 100%)`
- `padding: spacing[16] spacing[8]`
- Tablet: `padding: spacing[12] spacing[6]`
- Mobile: `padding: spacing[10] spacing[4]`

**Cross-hatch texture overlay (::before):**
- SVG cross-hatch pattern at 2.5% opacity
- `position: absolute`, `inset: 0`, `pointer-events: none`

**Gold glow overlay:**
- `radial-gradient(ellipse 60% 50% at 30% 50%, rgba(174,151,81,0.05) 0%, transparent 70%)`
- `pointer-events: none`

### 3. Two-Column Layout

**Grid container:**
```
TwoColGrid = styled.div
  - display: grid
  - grid-template-columns: 1fr 1fr
  - gap: spacing[12]
  - max-width: 1100px
  - margin: 0 auto
  - position: relative
  - align-items: start
  - @tabletAndDown: grid-template-columns: 1fr, gap: spacing[8]
```

### 4. Left Column — Contact Information (on dark)

**Gold line accent:**
- 40px x 2px, `colors.complimentary.main`, `margin-bottom: spacing[6]`

**Heading:**
- `font-family: heading`, `clamp(fontSize.3xl, 4vw, fontSize.5xl)`, bold, white
- `line-height: tight`, `margin: 0 0 spacing[5]`
- Text: "Ready to elevate your operations?"

**Subtext:**
- `fontSize.lg`, `fontWeight.light`, `colors.neutral.gray300`
- `lineHeight.relaxed`, `margin: 0 0 spacing[10]`
- Text: "Partner with a team whose expertise was forged at the highest levels of the profession."

**Contact items (email, phone, offices):**
Each item:
- Label: `fontSize.xs`, `fontWeight.semibold`, `letterSpacing.widest`, uppercase, `colors.complimentary.main`, `margin-bottom: spacing[1]`
- Value: `fontSize.base`, white, links white with hover to `complimentary.light`
- `margin-bottom: spacing[5]` between items

**Contact data:**
- Email: info@bdcs.me
- Phone: +382 68 811 727 (Montenegro), +31 61 001 6808 (Netherlands)
- Offices: Podgorica, Montenegro / Sarajevo, Bosnia and Herzegovina

### 5. Right Column — White Form Card

**FormCard:**
- `background: colors.neutral.white`
- `border-radius: borderRadius.xl`
- `padding: spacing[8]`
- `box-shadow: shadows["2xl"]`

**Form fields (name, email, subject, message):**
- Label: `fontSize.sm`, `fontWeight.semibold`, `colors.primary.main`, `margin-bottom: spacing[2]`
- Input: `padding: spacing[3] spacing[4]`, `border: 1px solid colors.neutral.gray200`, `borderRadius.lg`
- Focus: `border-color: colors.accent.main`, `box-shadow: 0 0 0 3px accent.main + 22`
- Textarea: same as input + `min-height: 120px`, `resize: vertical`
- Field spacing: `margin-bottom: spacing[5]`

**Submit button (gold CTA):**
- Full width
- `background: linear-gradient(135deg, complimentary.main 0%, complimentary.light 100%)`
- `color: colors.primary.darker`
- `fontSize.sm`, `fontWeight.semibold`, `letterSpacing.wider`, uppercase
- `padding: spacing[3] spacing[8]`, `borderRadius.sm`, `min-height: 44px`
- Hover: lighter gradient + `box-shadow: 0 8px 24px rgba(174,151,81,0.3)` + `translateY(-1px)`
- Disabled: `colors.neutral.gray300` bg, `gray500` text, no shadow
- Motion: `whileHover={{ scale: 1.02 }}`, `whileTap={{ scale: 0.98 }}`

### 6. Form Logic — Preserve Existing Submission Flow

Keep the existing form logic:
- `react-hook-form` with `useForm<IFormInputs>`
- Fields: name (required), email (required + pattern), subject (required), message (required + minLength 10)
- Submit to `/api/submit` POST endpoint
- Loading state with `<Spinner />` in button
- Success triggers `<Dialog>` component
- Form reset on successful submit
- Error messages below each field

### 7. Animations

**Page wrapper:** fadeIn opacity 0 to 1

**Dark section content:** useRef + useInView
- Left column: staggerContainer with fadeUp children
- Gold line: scaleX from 0, delay 0.2
- Heading, subtext, contact items: fadeUp with stagger

**Form card:**
- fadeUp with slight delay (0.3s)

### 8. Caption / Fallback

Below the dark section, add a light strip with fallback text:
- `background: colors.neutral.white`
- `padding: spacing[6] spacing[8]`, `text-align: center`
- Text: "Having trouble? Reach us directly at info@bdcs.me"
- Link styled with `colors.accent.main`

## Required UI States
- **Form default:** Empty fields with placeholder text
- **Form focus:** Gold/accent border + glow ring
- **Form error:** Red error text below field
- **Form submitting:** Button shows spinner, disabled state
- **Form success:** Dialog modal appears, form resets
- **Input hover:** Subtle border color change

## Accessibility Checklist
- [ ] All form fields have associated `<label>` elements with `htmlFor`
- [ ] Error messages use `aria-describedby` or are adjacent to fields
- [ ] Submit button has clear disabled state
- [ ] Focus states visible on all inputs and button
- [ ] Color contrast: white text on dark gradient meets WCAG AAA
- [ ] Gold labels on dark: complimentary.main on primary = 4.8:1 (WCAG AA)
- [ ] Touch targets: submit button 44px+ height
- [ ] Form is keyboard navigable (Tab through fields)
- [ ] Contact links have descriptive text (email, phone with `tel:` href)

## Design Tokens Used
All from existing `lib/theme.ts` — no new tokens needed:
- **Colors:** `primary.main/dark/darker`, `complimentary.main/light`, `neutral.white/gray200-gray500`, `accent.main`
- **Typography:** Alexandria font, `fontSize.xs/sm/base/lg/3xl/5xl`, `fontWeight.light/semibold/bold`, `letterSpacing.tight/wider/widest`
- **Spacing:** `spacing[1-16]`
- **Shadows:** `shadows["2xl"]`
- **Border radius:** `borderRadius.sm/lg/xl`
- **Transitions:** `transitions.default`
- **Media queries:** `mobileAndDown`, `tabletAndDown`

## Testing Checklist
- [ ] Dark gradient renders correctly
- [ ] Two-column layout on desktop, stacked on tablet/mobile
- [ ] Form validation works (required fields, email pattern, message minLength)
- [ ] Form submission sends to /api/submit
- [ ] Success dialog appears after submission
- [ ] Form resets after successful submit
- [ ] Spinner shows during submission
- [ ] Contact links (email, phone) work correctly
- [ ] Scroll animations trigger once
- [ ] Responsive at 375px, 550px, 768px, 1100px, 1440px
- [ ] No horizontal overflow

---

*Generated by Design Variations plugin*
