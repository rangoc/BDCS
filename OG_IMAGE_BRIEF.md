# OG Image Generation Brief

Generate 5 Open Graph images for the BDCS website. Every image uses the exact same template layout — only the text content changes.

---

## Canvas

- **Size:** 1200 x 630 px
- **Format:** PNG
- **Background:** Linear gradient from `#1A1849` (top-left) to `#11102F` (bottom-right)

---

## Template Layout (Pixel-Exact)

Every image follows this identical structure. Nothing moves between images — only the 3 text strings change.

```
+------------------------------------------------------------------+
|                                                                    |
|   [LOGO]  (top-left corner)                                       |
|   80px from left, 48px from top                                   |
|   Logo size: 120 x 48px, white on transparent                     |
|                                                                    |
|                                                                    |
|                                                                    |
|   [HEADLINE]                                                       |
|   80px from left, 220px from top                                  |
|   Alexandria Bold, 64px, white (#FFFFFF)                          |
|   Letter-spacing: -0.5px                                          |
|                                                                    |
|   [GOLD LINE]                                                      |
|   80px from left, 300px from top                                  |
|   Width: 64px, Height: 3px, Color: #AE9751                       |
|                                                                    |
|   [SUBTITLE]                                                       |
|   80px from left, 330px from top                                  |
|   Alexandria Regular, 28px, white (#FFFFFF), opacity 90%          |
|                                                                    |
|   [TAGLINE]                                                        |
|   80px from left, 375px from top                                  |
|   Alexandria Regular, 20px, light gold (#AE9751), opacity 80%    |
|   Max width: 700px (wrap if needed)                               |
|                                                                    |
|                                                        [WEBSITE]   |
|                                   1120px right-aligned, 582px top  |
|                          Alexandria Regular, 16px, #AE9751, 60%   |
|                                              Text: "www.bdcs.me"  |
+------------------------------------------------------------------+
```

### Constraints

- **All text left-aligned**, anchored at x=80px
- **No text may exceed x=1040px** (keeps 80px padding on both sides)
- **Headline max width:** 800px
- **Subtitle max width:** 700px
- **Tagline max width:** 700px — if text wraps, use 28px line-height
- **No icons, no illustrations, no photos** — text + logo + gold line only
- **Background is always the same gradient** — no variation between images

---

## Brand Assets

### Colors (Use Exactly)

| Element | Hex | Opacity |
|---------|-----|---------|
| Background gradient start | `#1A1849` | 100% |
| Background gradient end | `#11102F` | 100% |
| Headline text | `#FFFFFF` | 100% |
| Subtitle text | `#FFFFFF` | 90% |
| Tagline text | `#AE9751` | 80% |
| Gold accent line | `#AE9751` | 100% |
| Website URL text | `#AE9751` | 60% |
| Logo | `#FFFFFF` | 100% |

### Font

- **Family:** Alexandria
- **Headline:** Bold, 64px
- **Subtitle:** Regular, 28px
- **Tagline:** Regular, 20px
- **Website URL:** Regular, 16px

### Logo

White "BDCS" wordmark inside a thin white rectangular border. Use the logo from `public/logo.webp` rendered in white at 120x48px. Position: 80px from left, 48px from top.

---

## Content Per Image

Each row below is one image. Plug the 3 text values into the template above. Everything else stays identical.

### 1. `og-home.png`

| Field | Text |
|-------|------|
| Headline | BDCS |
| Subtitle | BD Corporate Services d.o.o. Podgorica |
| Tagline | Professional audit and accounting outsourcing firm |

### 2. `og-about.png`

| Field | Text |
|-------|------|
| Headline | About Us |
| Subtitle | Professional Audit & Accounting Outsourcing |
| Tagline | High quality services that go beyond cost reductions |

### 3. `og-team.png`

| Field | Text |
|-------|------|
| Headline | Our Team |
| Subtitle | Experienced Big 4 Professionals |
| Tagline | From junior to manager level, ready to support your audit needs |

### 4. `og-why-choose-us.png`

| Field | Text |
|-------|------|
| Headline | Why Choose Us |
| Subtitle | Professional Approach. Competitive Pricing. |
| Tagline | Personalised attention and national standards |

### 5. `og-contact.png`

| Field | Text |
|-------|------|
| Headline | Contact Us |
| Subtitle | Get in Touch |
| Tagline | Podgorica, Montenegro | Sarajevo, Bosnia and Herzegovina |

---

## Output

Save all 5 PNG files. Place them in `public/og/` directory.
