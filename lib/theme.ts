/**
 * Theme Configuration
 *
 * Centralized theme system containing:
 * - Color palette with primary, secondary, accent colors and their variations
 * - Typography scales for consistent text sizing
 * - Spacing system for layouts
 * - Shadow definitions for depth and elevation
 * - Breakpoints for responsive design
 */

// ============================================================================
// COLOR PALETTE
// ============================================================================

/**
 * Main color palette
 * Primary: Deep blue (#1A1849) - Professional, trustworthy
 * Secondary: Pure black (#000000) - Strong, elegant
 * Accent: Golden brown (#695517) - Sophisticated highlight
 * Complimentary: Light gold (#AE9751) - Warm, approachable
 */
export const colors = {
  // Primary colors
  primary: {
    main: "#1A1849",
    light: "#2D2865",
    lighter: "#403881",
    lightest: "#544A9D",
    dark: "#11102F",
    darker: "#0A0819",
  },

  // Secondary colors
  secondary: {
    main: "#000000",
    light: "#1A1A1A",
    lighter: "#333333",
    lightest: "#4D4D4D",
  },

  // Accent colors
  accent: {
    main: "#695517",
    light: "#846B2B",
    lighter: "#9F813F",
    lightest: "#BA9753",
    dark: "#4E3F11",
    darker: "#33290B",
  },

  // Complimentary colors
  complimentary: {
    main: "#AE9751",
    light: "#BEAA6E",
    lighter: "#CEBD8B",
    lightest: "#DED0A8",
    dark: "#8B7841",
    darker: "#685931",
  },

  // Neutral colors for backgrounds, borders, etc.
  neutral: {
    white: "#FFFFFF",
    gray50: "#F9FAFB",
    gray100: "#F3F4F6",
    gray200: "#E5E7EB",
    gray300: "#D1D5DB",
    gray400: "#9CA3AF",
    gray500: "#6B7280",
    gray600: "#4B5563",
    gray700: "#374151",
    gray800: "#1F2937",
    gray900: "#111827",
  },

  // Semantic colors
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

/**
 * Typography scale
 * Follows a modular scale for harmonious sizing
 */
export const typography = {
  // Font families
  fontFamily: {
    primary: "'Alexandria', sans-serif",
    heading: "'Alexandria', sans-serif",
  },

  // Font sizes (in rem)
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
    "7xl": "4.5rem", // 72px
  },

  // Font weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 1.8,
  },

  // Letter spacing
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
} as const;

// ============================================================================
// SPACING
// ============================================================================

/**
 * Spacing scale (in rem)
 * Base unit: 0.25rem (4px)
 */
export const spacing = {
  0: "0",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  32: "8rem", // 128px
  40: "10rem", // 160px
  48: "12rem", // 192px
  56: "14rem", // 224px
  64: "16rem", // 256px
} as const;

// ============================================================================
// SHADOWS
// ============================================================================

/**
 * Shadow system for depth and elevation
 * Subtle shadows for professional look
 */
export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",

  // Colored shadows for accent elements
  primaryGlow: "0 10px 40px -10px rgba(26, 24, 73, 0.3)",
  accentGlow: "0 10px 40px -10px rgba(105, 85, 23, 0.3)",
} as const;

// ============================================================================
// BREAKPOINTS
// ============================================================================

/**
 * Responsive breakpoints
 * Mobile-first approach
 */
export const breakpoints = {
  mobile: 375,
  mobileMax: 550,
  tablet: 768,
  tabletMax: 1100,
  laptop: 1024,
  laptopMax: 1500,
  desktop: 1440,
} as const;

/**
 * Media queries for styled-components
 */
export const mediaQueries = {
  mobileAndDown: `(max-width: ${breakpoints.mobileMax}px)`,
  tabletAndDown: `(max-width: ${breakpoints.tabletMax}px)`,
  laptopAndDown: `(max-width: ${breakpoints.laptopMax}px)`,
  tabletAndUp: `(min-width: ${breakpoints.tablet}px)`,
  laptopAndUp: `(min-width: ${breakpoints.laptop}px)`,
  desktopAndUp: `(min-width: ${breakpoints.desktop}px)`,
} as const;

// ============================================================================
// BORDER RADIUS
// ============================================================================

/**
 * Border radius values for consistent rounding
 */
export const borderRadius = {
  none: "0",
  sm: "0.125rem", // 2px
  base: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px",
} as const;

// ============================================================================
// TRANSITIONS
// ============================================================================

/**
 * Transition timing and durations
 */
export const transitions = {
  // Durations (in ms)
  duration: {
    fastest: 100,
    faster: 150,
    fast: 200,
    normal: 300,
    slow: 400,
    slower: 500,
    slowest: 600,
  },

  // Easing functions
  easing: {
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
  },

  // Common transition properties
  default: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
  fast: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "all 400ms cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

// ============================================================================
// Z-INDEX LAYERS
// ============================================================================

/**
 * Z-index scale for managing stacking contexts
 */
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
} as const;

// ============================================================================
// THEME OBJECT
// ============================================================================

/**
 * Complete theme object
 * Import this for full theme access
 */
export const theme = {
  colors,
  typography,
  spacing,
  shadows,
  breakpoints,
  mediaQueries,
  borderRadius,
  transitions,
  zIndex,
} as const;

export type Theme = typeof theme;
export default theme;
