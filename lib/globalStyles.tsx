import { createGlobalStyle } from "styled-components";
import { colors, typography } from "./theme";

/**
 * Global Styles
 *
 * CSS reset and base styles applied throughout the application
 * Includes modern CSS reset, typography defaults, and accessibility features
 */
export const GlobalStyles = createGlobalStyle`
  /* ============================================================================
     CSS RESET & BOX-SIZING
     ============================================================================ */
  
  /* Use a more-intuitive box-sizing model */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* Remove default margin and padding */
  * {
    margin: 0;
    padding: 0;
  }

  /* ============================================================================
     HTML & BODY
     ============================================================================ */
  
  /* Allow percentage-based heights and set base font */
  html {
    height: 100%;
    /* Prevent font size adjustment on orientation change (iOS) */
    -webkit-text-size-adjust: 100%;
    /* Smooth scrolling for anchor links */
    scroll-behavior: smooth;
  }

  body {
    height: 100%;
    font-family: ${typography.fontFamily.primary};
    font-size: ${typography.fontSize.base};
    font-weight: ${typography.fontWeight.normal};
    line-height: ${typography.lineHeight.loose};
    color: ${colors.secondary.main};
    background-color: ${colors.neutral.white};
    /* Improve text rendering */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  /* ============================================================================
     TYPOGRAPHY
     ============================================================================ */
  
  /* Heading defaults */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${typography.fontFamily.heading};
    font-weight: ${typography.fontWeight.bold};
    line-height: ${typography.lineHeight.tight};
    color: ${colors.primary.main};
    overflow-wrap: break-word;
  }

  h1 {
    font-size: ${typography.fontSize["5xl"]};
    
    @media (max-width: 768px) {
      font-size: ${typography.fontSize["4xl"]};
    }
    
    @media (max-width: 550px) {
      font-size: ${typography.fontSize["3xl"]};
    }
  }

  h2 {
    font-size: ${typography.fontSize["4xl"]};
    
    @media (max-width: 768px) {
      font-size: ${typography.fontSize["3xl"]};
    }
    
    @media (max-width: 550px) {
      font-size: ${typography.fontSize["2xl"]};
    }
  }

  h3 {
    font-size: ${typography.fontSize["3xl"]};
    
    @media (max-width: 768px) {
      font-size: ${typography.fontSize["2xl"]};
    }
  }

  h4 {
    font-size: ${typography.fontSize["2xl"]};
  }

  h5 {
    font-size: ${typography.fontSize.xl};
  }

  h6 {
    font-size: ${typography.fontSize.lg};
  }

  /* Paragraph and text defaults */
  p {
    overflow-wrap: break-word;
    margin-bottom: 1rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }

  /* Strong emphasis */
  strong, b {
    font-weight: ${typography.fontWeight.semibold};
    color: ${colors.primary.main};
  }

  /* Italic emphasis */
  em, i {
    font-style: italic;
  }

  /* Links */
  a {
    color: ${colors.accent.main};
    text-decoration: none;
    transition: color 0.2s ease-out;
    
    &:hover {
      color: ${colors.accent.light};
    }
    
    &:focus-visible {
      outline: 2px solid ${colors.accent.main};
      outline-offset: 2px;
      border-radius: 2px;
    }
  }

  /* ============================================================================
     MEDIA ELEMENTS
     ============================================================================ */
  
  /* Improve media defaults */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
    height: auto;
  }

  /* Remove border on images inside links */
  img {
    border-style: none;
  }

  /* ============================================================================
     FORM ELEMENTS
     ============================================================================ */
  
  /* Inherit typography for form elements */
  input, button, textarea, select {
    font: inherit;
    color: inherit;
  }

  /* Remove default button styles */
  button {
    background: none;
    border: none;
    cursor: pointer;
    
    &:focus-visible {
      outline: 2px solid ${colors.accent.main};
      outline-offset: 2px;
    }
  }

  /* Input focus styles */
  input, textarea, select {
    &:focus {
      outline: 2px solid ${colors.accent.main};
      outline-offset: 2px;
    }
  }

  /* ============================================================================
     LISTS
     ============================================================================ */
  
  /* Remove default list styles (can be re-added as needed) */
  ul, ol {
    list-style: none;
  }

  /* ============================================================================
     ACCESSIBILITY
     ============================================================================ */
  
  /* Focus styles for keyboard navigation */
  :focus-visible {
    outline: 2px solid ${colors.accent.main};
    outline-offset: 2px;
  }

  /* Hide elements visually but keep them accessible to screen readers */
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* Respect user's motion preferences */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* ============================================================================
     NEXT.JS ROOT
     ============================================================================ */
  
  /* Create a root stacking context and full-height layout */
  #__next {
    isolation: isolate;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* ============================================================================
     UTILITY CLASSES
     ============================================================================ */
  
  /* Container for max-width layouts */
  .container {
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
    
    @media (min-width: 768px) {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }

  /* Section spacing */
  .section {
    padding-top: 4rem;
    padding-bottom: 4rem;
    
    @media (min-width: 768px) {
      padding-top: 6rem;
      padding-bottom: 6rem;
    }
  }

  /* ============================================================================
     SCROLLBAR STYLING (Optional - for webkit browsers)
     ============================================================================ */
  
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.neutral.gray100};
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.primary.light};
    border-radius: ${typography.fontSize.xs};
    
    &:hover {
      background: ${colors.primary.main};
    }
  }
`;
