/**
 * Button Component
 *
 * Reusable button with variants and animations
 * Supports primary, secondary, and accent styles
 */

import { motion } from "framer-motion";
import styled from "styled-components";
import {
  borderRadius,
  colors,
  shadows,
  transitions,
  typography,
} from "../lib/theme";

// ============================================================================
// TYPES
// ============================================================================

interface ButtonProps {
  variant?: "primary" | "secondary" | "accent" | "outline";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

/**
 * Base button with motion animations
 */
export const Button = styled(motion.button)<ButtonProps>`
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: ${typography.fontFamily.primary};
  font-weight: ${typography.fontWeight.semibold};
  text-align: center;
  white-space: nowrap;
  border-radius: ${borderRadius.lg};
  cursor: pointer;
  transition: ${transitions.default};
  border: 2px solid transparent;
  text-decoration: none;

  /* Prevent text selection on double click */
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  /* Size variants */
  ${({ size = "medium" }) => {
    switch (size) {
      case "small":
        return `
          padding: 0.5rem 1rem;
          font-size: ${typography.fontSize.sm};
          min-height: 36px;
        `;
      case "large":
        return `
          padding: 1rem 2rem;
          font-size: ${typography.fontSize.lg};
          min-height: 56px;
        `;
      case "medium":
      default:
        return `
          padding: 0.75rem 1.5rem;
          font-size: ${typography.fontSize.base};
          min-height: 44px;
        `;
    }
  }}

  /* Style variants */
  ${({ variant = "primary" }) => {
    switch (variant) {
      case "secondary":
        return `
          background-color: ${colors.secondary.main};
          color: ${colors.neutral.white};
          border-color: ${colors.secondary.main};
          
          &:hover:not(:disabled) {
            background-color: ${colors.secondary.light};
            border-color: ${colors.secondary.light};
            box-shadow: ${shadows.md};
          }
          
          &:active:not(:disabled) {
            background-color: ${colors.secondary.lighter};
          }
        `;

      case "accent":
        return `
          background-color: ${colors.accent.main};
          color: ${colors.neutral.white};
          border-color: ${colors.accent.main};
          
          &:hover:not(:disabled) {
            background-color: ${colors.accent.light};
            color: ${colors.neutral.white};
            border-color: ${colors.accent.light};
            box-shadow: ${shadows.accentGlow};
          }
          
          &:active:not(:disabled) {
            background-color: ${colors.accent.lighter};
          }
        `;

      case "outline":
        return `
          background-color: transparent;
          color: ${colors.primary.main};
          border-color: ${colors.primary.main};
          
          &:hover:not(:disabled) {
            background-color: rgba(1, 24, 73, 0.95);
            color: ${colors.neutral.white};
            box-shadow: ${shadows.md};
          }
          
          &:active:not(:disabled) {
            background-color: ${colors.primary.light};
          }
        `;

      case "primary":
      default:
        return `
          background-color: rgba(1, 24, 73, 0.95);
          color: ${colors.neutral.white};
          border-color: ${colors.primary.main};
          
          &:hover:not(:disabled) {
            background-color: rgba(1, 24, 73, 0.9);
            border-color: ${colors.primary.light};
            box-shadow: ${shadows.primaryGlow};
          }
          
          &:active:not(:disabled) {
            background-color: ${colors.primary.lighter};
          }
        `;
    }
  }}
  
  /* Full width option */
  ${({ fullWidth }) =>
    fullWidth &&
    `
    width: 100%;
  `}
  
  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Focus styles for accessibility */
  &:focus-visible {
    outline: 2px solid ${colors.accent.main};
    outline-offset: 2px;
  }
`;

/**
 * Default motion props for button hover/tap animations
 */
Button.defaultProps = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: "tween", duration: 0.2 },
};

// ============================================================================
// ICON BUTTON VARIANT
// ============================================================================

/**
 * Icon-only button (circular)
 */
export const IconButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${borderRadius.full};
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${colors.primary.main};
  transition: ${transitions.default};

  &:hover:not(:disabled) {
    background-color: ${colors.neutral.gray100};
    color: ${colors.primary.light};
  }

  &:active:not(:disabled) {
    background-color: ${colors.neutral.gray200};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${colors.accent.main};
    outline-offset: 2px;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

IconButton.defaultProps = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.9 },
  transition: { type: "spring", stiffness: 400, damping: 17 },
};
