# Design Memory

## Brand Tone
- **Adjectives:** Premium, Professional, Modern
- **Avoid:** Cluttered layouts, overly playful elements, generic corporate feel
- **Inspiration:** Apple — spacious, refined, confident

## Layout & Spacing
- **Density:** Comfortable (balanced whitespace, not minimal but not dense)
- **Hero:** Full-width dark sections for impact (min-height 92vh)
- **Section padding:** `spacing[24]` desktop, `spacing[16]` mobile
- **Grid:** Max-width 1200px container, responsive columns
- **Corner radius:** `sm` (2px) for CTAs, `lg` (8px) for icon containers

## Typography
- **Font family:** Alexandria, sans-serif
- **Headings:** Bold (700), tight line-height, tight letter-spacing
- **Section labels:** xs size, semibold, widest tracking, uppercase, gold color
- **Body:** Normal weight, relaxed line-height
- **Taglines:** Light weight (300), italic, wide letter-spacing

## Color
- **Primary:** #1A1849 (deep blue) — headings, hero backgrounds, stat values
- **Accent/Gold:** #695517 → #AE9751 — sparingly for emphasis: borders, labels, CTAs
- **Dark sections:** Gradient using primary.darker → primary.main → primary.dark
- **Light sections:** Alternate white and gray50
- **Stat values:** Dark primary text on light background (NOT gold)
- **Semantic:** success #10B981, warning #F59E0B, error #EF4444

## Navigation Pattern
- **Layout:** Logo left, nav links center, CTA button right
- **Active indicator:** 2px solid gold underline bar (scaleX animation from center)
- **Active typography:** semibold weight vs medium for inactive
- **CTA:** Accent-colored "Get in Touch" button, separated from nav links
- **CTA scrolled:** Adapts to complimentary.main background
- **Nav font:** fontSize.sm with letterSpacing.wide
- **Scroll blur:** blur(12px) saturate(180%), background rgba(1,24,73,0.97)
- **Scroll transition:** 0.35s ease-in-out
- **Desktop:** 4 nav links + CTA button (Contact removed from links)
- **Mobile:** All 5 links + CTA button at bottom of menu

## Interaction Patterns
- **Scroll animations:** useInView + staggered fadeUp (0.12s stagger, 0.6s duration)
- **Hero animations:** Sequential delays (0.1s → 0.9s)
- **Hover effects:** translateY(-1px) + shadow increase on CTAs
- **Nav hover:** Underline scaleX(1) with 0.25s ease-out transition
- **CTA hover:** Scale 1.03, lighter background + accentGlow shadow
- **Partner logos:** Grayscale → full color on hover
- **Link hover:** White → complimentary.light transition on dark backgrounds
- **Social icons:** Scale 1.12 on hover, 0.95 on tap, gold color
- **Easing:** [0.25, 0.46, 0.45, 0.94] for sections, [0.4, 0, 0.2, 1] for footer
- **Reduced motion:** Always respect prefers-reduced-motion

## Accessibility Rules
- **Focus:** 2px solid accent.main with 3px offset
- **Labels:** aria-label on all sections, aria-hidden on decorative elements
- **Touch targets:** 44px minimum
- **Contrast:** White on #1A1849 (14.7:1), meets WCAG AA

## Social & Contact Patterns
- **Social platforms:** LinkedIn, Instagram (inline SVG icons, 20x20px)
- **Social URLs:** LinkedIn → linkedin.com/company/bd-corporate-services/, Instagram → instagram.com/bd_corporate_services/
- **Email styling:** Gold accent color (complimentary.main) on dark backgrounds
- **Phone styling:** 2px gold left border (complimentary.dark) with left padding

## Dark Section Pattern (Hero & Footer)
- **Background:** linear-gradient(180deg, primary.darker → primary.main → primary.dark)
- **Texture:** SVG cross-hatch at 2.5% opacity overlay
- **Gold glow:** Radial gradient rgba(174,151,81,0.06) from top center
- **Gold top line:** Full-width 2px gradient (transparent → complimentary.main → complimentary.light → complimentary.main → transparent)
- **Bottom divider:** 1px solid rgba(174,151,81,0.15)

## Why Choose Us Page Patterns
- **Hero:** Immersive image background (chooseUs.webp) with dark overlay + dual gold radial glows + cross-plus texture
- **Advantages:** Alternating left/right editorial blocks (60/40 grid) on dark gradient + cross-hatch background
- **Numbers:** Large gold decorative numbers (01-04) at 12% opacity behind titles
- **Dividers:** Gold gradient horizontal rules (lighter→main→lighter) at 30% opacity between blocks
- **Closing:** Light white strip with gold line + CTA text before footer
- **Text on dark:** White titles, gray-300 descriptions

## About Page Patterns
- **Hero:** Immersive image background (about.webp) with dark gradient overlay, bottom-left editorial text alignment
- **Hero overlays:** Dark gradient (55%→94%), dual gold radial glows, gold cross-plus texture at 2.5%
- **Stats:** Large values (6xl) with gold vertical gradient dividers, generous padding (spacing[40])
- **MVV:** Full-viewport sections (min-height 100vh), editorial numbering (01/02/03) at 8% opacity, alternating white/gray50 backgrounds
- **Closing:** Dark gradient with cross-hatch texture, gold line accent, italic light-weight tagline in gray200

## Repo Conventions
- **Component structure:** Styled components defined in same file as component
- **Styling approach:** styled-components with theme tokens from lib/theme.ts
- **Animation library:** framer-motion (motion components, useInView, AnimatePresence)
- **Existing primitives:** Button, Card, Layout, Header, Footer, SectionTitle

---

*Updated by Design Variations plugin*
